import User from '../models/User.js'
import {
  comparePassword,
  generateTokenPair,
  rotateRefreshToken,
  revokeRefreshToken,
} from '../services/auth.service.js'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
}

/**
 * POST /api/auth/login
 */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' })
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' })
    }

    const { accessToken, refreshToken } = await generateTokenPair(user)

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)

    res.json({
      success: true,
      data: {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/auth/logout
 */
export async function logout(req, res, next) {
  try {
    const token = req.cookies?.refreshToken
    if (token) {
      await revokeRefreshToken(token)
    }

    res.clearCookie('refreshToken', { ...COOKIE_OPTIONS, maxAge: 0 })
    res.json({ success: true, message: 'Logged out successfully.' })
  } catch (err) {
    next(err)
  }
}

/**
 * POST /api/auth/refresh
 */
export async function refresh(req, res, next) {
  try {
    const token = req.cookies?.refreshToken
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No refresh token provided.',
      })
    }

    const { accessToken, refreshToken } = await rotateRefreshToken(token)

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)

    res.json({
      success: true,
      data: { accessToken },
    })
  } catch (err) {
    if (err.statusCode === 401) {
      res.clearCookie('refreshToken', { ...COOKIE_OPTIONS, maxAge: 0 })
      return res.status(401).json({ success: false, error: err.message })
    }
    next(err)
  }
}

/**
 * GET /api/auth/me
 */
export async function me(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select('email name role createdAt')
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' })
    }
    res.json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
}
