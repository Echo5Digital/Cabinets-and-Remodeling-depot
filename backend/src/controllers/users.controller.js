import User from '../models/User.js'
import { hashPassword, revokeAllUserTokens } from '../services/auth.service.js'
import { createCatalogUser, updateCatalogUser, deleteCatalogUser } from '../services/catalogPlatform.service.js'

/**
 * Mirror a user create/update to the Cabinet Catalog Platform.
 *
 * This is intentionally best-effort: a Catalog Platform outage must never
 * block or roll back the Depot's own (source-of-truth) write. Failures are
 * recorded on the user document so the admin UI can surface a "sync failed"
 * state and offer a manual retry.
 */
async function syncUserToCatalog(user) {
  try {
    if (!user.catalogPlatformUserId) {
      if (!user._pendingPlainPassword) {
        throw new Error('A password is required to create this user on the Catalog Platform. Set a new password and retry.')
      }
      const created = await createCatalogUser({
        email: user.email,
        password: user._pendingPlainPassword,
        name: user.name,
        role: user.role,
      })
      user.catalogPlatformUserId = created.user.id
    } else {
      const updates = { name: user.name, role: user.role, isActive: user.isActive }
      if (user._pendingPlainPassword) updates.password = user._pendingPlainPassword
      await updateCatalogUser(user.catalogPlatformUserId, updates)
    }

    user.catalogSyncStatus = 'SYNCED'
    user.catalogSyncError = null
    await user.save()
  } catch (err) {
    user.catalogSyncStatus = 'FAILED'
    user.catalogSyncError = err.message || 'Catalog platform sync failed.'
    await user.save()
  }
}

/**
 * GET /api/users (super admin, admin)
 *
 * Restricted ADMIN callers cannot see SUPER_ADMIN accounts at all.
 */
export async function getAllUsers(req, res, next) {
  try {
    const filter = req.user.role === 'ADMIN' ? { role: { $ne: 'SUPER_ADMIN' } } : {}
    const users = await User.find(filter).sort({ createdAt: -1 })
    res.json({ success: true, data: users })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/users (super admin, admin)
 *
 * Restricted ADMIN callers cannot create SUPER_ADMIN accounts.
 */
export async function createUser(req, res, next) {
  try {
    const { email, password, name, role } = req.body

    if (req.user.role === 'ADMIN' && role === 'SUPER_ADMIN') {
      return res.status(403).json({ success: false, error: 'You cannot create a Super Admin account.' })
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(409).json({ success: false, error: 'A user with this email already exists.' })
    }

    const hashedPassword = await hashPassword(password)
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role: role || 'STAFF',
      catalogSyncStatus: 'PENDING',
    })

    user._pendingPlainPassword = password
    await syncUserToCatalog(user)

    res.status(201).json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
}

/**
 * PATCH /api/users/:id (super admin, admin)
 *
 * Restricted ADMIN callers cannot view, modify, or promote anyone to/from
 * SUPER_ADMIN — that account tier is invisible and untouchable to them.
 */
export async function updateUser(req, res, next) {
  try {
    const { id } = req.params
    const { name, password, role, isActive } = req.body

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' })
    }

    if (req.user.role === 'ADMIN' && (user.role === 'SUPER_ADMIN' || role === 'SUPER_ADMIN')) {
      return res.status(403).json({ success: false, error: 'You cannot modify a Super Admin account.' })
    }

    const isSelf = req.user.id === user.id
    if (isSelf && ((role !== undefined && role !== 'SUPER_ADMIN') || isActive === false)) {
      return res.status(400).json({
        success: false,
        error: 'You cannot remove your own super admin access or deactivate your own account.',
      })
    }

    if (name !== undefined) user.name = name
    if (role !== undefined) user.role = role
    if (isActive !== undefined) user.isActive = isActive
    if (password) user.password = await hashPassword(password)

    const hasChanges = name !== undefined || role !== undefined || isActive !== undefined || !!password
    if (hasChanges) user.catalogSyncStatus = 'PENDING'

    await user.save()

    // Role/deactivation/password changes invalidate existing sessions for this user.
    if (role !== undefined || isActive === false || password) {
      await revokeAllUserTokens(user.id)
    }

    if (hasChanges) {
      user._pendingPlainPassword = password || undefined
      await syncUserToCatalog(user)
    }

    res.json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
}

/**
 * DELETE /api/users/:id (super admin, admin)
 *
 * Restricted ADMIN callers cannot delete SUPER_ADMIN accounts.
 */
export async function deleteUser(req, res, next) {
  try {
    const { id } = req.params

    if (req.user.id === id) {
      return res.status(400).json({ success: false, error: 'You cannot delete your own account.' })
    }

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' })
    }

    if (req.user.role === 'ADMIN' && user.role === 'SUPER_ADMIN') {
      return res.status(403).json({ success: false, error: 'You cannot delete a Super Admin account.' })
    }

    // Attempt the Catalog Platform delete before removing the local record —
    // once the local user is gone there's nowhere to persist a "FAILED" status
    // for a retry. A failure here does not block the local delete; it's
    // reported back so the admin can clean up the Catalog Platform manually.
    let catalogSyncFailed = false
    if (user.catalogPlatformUserId) {
      try {
        await deleteCatalogUser(user.catalogPlatformUserId)
      } catch (err) {
        catalogSyncFailed = true
      }
    }

    await user.deleteOne()
    await revokeAllUserTokens(id)

    res.json({
      success: true,
      message: catalogSyncFailed
        ? 'User deleted. Could not remove the linked Catalog Platform account — please remove it there manually.'
        : 'User deleted.',
      catalogSyncFailed,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/users/:id/retry-sync (super admin, admin)
 *
 * Re-attempts mirroring this user to the Catalog Platform after a previous
 * create/update sync failure.
 */
export async function retrySyncUser(req, res, next) {
  try {
    const { id } = req.params
    const { password } = req.body

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' })
    }

    if (req.user.role === 'ADMIN' && user.role === 'SUPER_ADMIN') {
      return res.status(403).json({ success: false, error: 'You cannot modify a Super Admin account.' })
    }

    // A never-synced user's original plaintext password was never stored —
    // creating it on the Catalog Platform for the first time needs a fresh
    // one supplied here. Retrying an already-linked user's update doesn't.
    if (!user.catalogPlatformUserId) {
      if (!password) {
        return res.status(400).json({
          success: false,
          error: 'This user was never created on the Catalog Platform. Provide a password to retry.',
        })
      }
      user.password = await hashPassword(password)
      await user.save()
      user._pendingPlainPassword = password
    }

    await syncUserToCatalog(user)

    res.json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/users/catalog-webhook (Catalog Platform service key, not admin JWT)
 *
 * Receives user.created / user.updated / user.deleted events from the
 * Catalog Platform so a user managed there also reflects here. Matches an
 * existing Depot user by catalogPlatformUserId first, falling back to email
 * for first-time linkage (e.g. an account that existed on the Catalog
 * Platform before this sync was wired up).
 *
 * Deliberately never touches the Depot user's password — a password set on
 * the Catalog Platform is a different login story than the Depot's own
 * bcrypt hash, and silently overwriting it from an inbound webhook would be
 * a serious security surprise. Depot passwords only ever change via the
 * Depot's own Users page.
 *
 * A "user.deleted" event does not delete the Depot account — that's a
 * destructive, hard-to-reverse action this endpoint should not take
 * unilaterally. It only clears the linkage and flags the account so a human
 * admin decides what to do next.
 */
export async function handleCatalogUserWebhook(req, res, next) {
  try {
    const { event, catalogPlatformUserId, email, name, role, isActive } = req.body

    let user = await User.findOne({ catalogPlatformUserId })
    if (!user && email) {
      user = await User.findOne({ email: email.toLowerCase() })
    }

    if (event === 'user.deleted') {
      if (user) {
        user.catalogPlatformUserId = null
        user.catalogSyncStatus = 'FAILED'
        user.catalogSyncError = 'This user was deleted on the Catalog Platform. Re-link or remove manually.'
        await user.save()
      }
      return res.json({ success: true })
    }

    if (!user) {
      // No matching Depot account exists yet for a Catalog-Platform-originated
      // user — there's nothing in the Depot's own User model to create here
      // without a password, so we only acknowledge and leave it unlinked.
      return res.json({ success: true, linked: false })
    }

    user.catalogPlatformUserId = catalogPlatformUserId
    if (name !== undefined) user.name = name
    // A webhook-driven role change is never trusted to grant Super Admin —
    // that tier can only be assigned by a Depot Super Admin, from the Depot's
    // own Users page.
    if (role !== undefined && role !== 'SUPER_ADMIN' && user.role !== 'SUPER_ADMIN') user.role = role
    if (isActive !== undefined) user.isActive = isActive
    user.catalogSyncStatus = 'SYNCED'
    user.catalogSyncError = null
    await user.save()

    res.json({ success: true, linked: true })
  } catch (err) {
    next(err)
  }
}
