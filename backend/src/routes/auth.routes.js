import { Router } from 'express'
import { login, logout, refresh, me } from '../controllers/auth.controller.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { authRateLimiter } from '../middleware/rateLimiter.js'
import { loginSchema } from '../validation/auth.schema.js'

const router = Router()

// Public routes
router.post('/login', authRateLimiter, validate(loginSchema), login)
router.post('/refresh', refresh)

// Protected routes
router.post('/logout', authenticate, logout)
router.get('/me', authenticate, me)

export default router
