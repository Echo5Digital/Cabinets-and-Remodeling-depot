import User from '../models/User.js'
import { hashPassword, revokeAllUserTokens } from '../services/auth.service.js'

/**
 * GET /api/users (super admin)
 */
export async function getAllUsers(req, res, next) {
  try {
    const users = await User.find().sort({ createdAt: -1 })
    res.json({ success: true, data: users })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/users (super admin)
 */
export async function createUser(req, res, next) {
  try {
    const { email, password, name, role } = req.body

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(409).json({ success: false, error: 'A user with this email already exists.' })
    }

    const hashedPassword = await hashPassword(password)
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role: role || 'ADMIN',
    })

    res.status(201).json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
}

/**
 * PATCH /api/users/:id (super admin)
 */
export async function updateUser(req, res, next) {
  try {
    const { id } = req.params
    const { name, password, role, isActive } = req.body

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' })
    }

    const isSelf = req.user.id === user.id
    if (isSelf && (role === 'ADMIN' || isActive === false)) {
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
 * DELETE /api/users/:id (super admin)
 */
export async function deleteUser(req, res, next) {
  try {
    const { id } = req.params

    if (req.user.id === id) {
      return res.status(400).json({ success: false, error: 'You cannot delete your own account.' })
    }

    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' })
    }

    await revokeAllUserTokens(id)

    res.json({ success: true, message: 'User deleted.' })
  } catch (err) {
    next(err)
  }
}
