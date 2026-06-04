import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import RefreshToken from '../models/RefreshToken.js'

/**
 * Hash a plain text password.
 */
export async function hashPassword(password) {
  return bcrypt.hash(password, 12)
}

/**
 * Compare plain text password to hash.
 */
export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash)
}

/**
 * Generate access token (short-lived, 15min).
 */
export function generateAccessToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
  )
}

/**
 * Generate refresh token (long-lived, 7d).
 */
export function generateRefreshToken(user) {
  return jwt.sign(
    { sub: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  )
}

/**
 * Generate both tokens and persist refresh token to MongoDB.
 */
export async function generateTokenPair(user) {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  // Calculate expiry (7 days)
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)

  // Save refresh token to MongoDB
  await RefreshToken.create({
    token: refreshToken,
    userId: user.id,
    expiresAt,
  })

  return { accessToken, refreshToken }
}

/**
 * Verify a refresh token and rotate it (delete old, create new).
 * Returns new token pair or throws on invalid token.
 */
export async function rotateRefreshToken(incomingToken) {
  let decoded
  try {
    decoded = jwt.verify(incomingToken, process.env.JWT_REFRESH_SECRET)
  } catch {
    throw Object.assign(new Error('Invalid or expired refresh token.'), { statusCode: 401 })
  }

  // Check token exists in DB and is not expired
  const storedToken = await RefreshToken.findOne({ token: incomingToken }).populate('userId')

  if (!storedToken || storedToken.expiresAt < new Date()) {
    // Token reuse detected or expired — revoke all tokens for this user
    if (decoded.sub) {
      await RefreshToken.deleteMany({ userId: decoded.sub })
    }
    throw Object.assign(new Error('Refresh token invalid or expired.'), { statusCode: 401 })
  }

  const user = storedToken.userId // populated User document

  if (!user.isActive) {
    throw Object.assign(new Error('Account is deactivated.'), { statusCode: 401 })
  }

  // Delete the old token (rotation)
  await RefreshToken.deleteOne({ token: incomingToken })

  // Generate and return new token pair
  return generateTokenPair(user)
}

/**
 * Revoke a specific refresh token (on logout).
 */
export async function revokeRefreshToken(token) {
  try {
    await RefreshToken.deleteOne({ token })
  } catch {
    // Token may not exist — that's fine
  }
}

/**
 * Revoke ALL refresh tokens for a user (security measure).
 */
export async function revokeAllUserTokens(userId) {
  await RefreshToken.deleteMany({ userId })
}
