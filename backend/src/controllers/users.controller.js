import User from '../models/User.js'
import { hashPassword, revokeAllUserTokens } from '../services/auth.service.js'

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
    })

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

    await user.save()

    // Role/deactivation/password changes invalidate existing sessions for this user.
    if (role !== undefined || isActive === false || password) {
      await revokeAllUserTokens(user.id)
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

    await user.deleteOne()
    await revokeAllUserTokens(id)

    res.json({ success: true, message: 'User deleted.' })
  } catch (err) {
    next(err)
  }
}
