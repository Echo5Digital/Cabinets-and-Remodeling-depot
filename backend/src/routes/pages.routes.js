import { Router } from 'express'
import { getAllPages, getPageBySlug, updatePageContent } from '../controllers/pages.controller.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { updatePageContentSchema } from '../validation/page.schema.js'

const router = Router()

// Public routes
router.get('/', getAllPages)
router.get('/:slug', getPageBySlug)

// Admin routes
router.put('/admin/:slug', authenticate, validate(updatePageContentSchema), updatePageContent)

export default router
