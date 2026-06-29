import { Router } from 'express'
import {
  getAllPages,
  getPageBySlug,
  updatePageContent,
  previewPageBySlug,
  getPageRevisions,
  restorePageRevision,
} from '../controllers/pages.controller.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { updatePageContentSchema } from '../validation/page.schema.js'

const router = Router()

// ── Public routes ─────────────────────────────────────────────────────────────
router.get('/', getAllPages)

// ── Admin routes (defined before /:slug to avoid conflicts) ──────────────────
router.get('/admin/preview/:slug', authenticate, previewPageBySlug)
router.get('/admin/:slug/revisions', authenticate, getPageRevisions)
router.post('/admin/:slug/revisions/:revisionId/restore', authenticate, restorePageRevision)
router.put('/admin/:slug', authenticate, validate(updatePageContentSchema), updatePageContent)

// ── Public slug route (catch-all — must remain last) ─────────────────────────
router.get('/:slug', getPageBySlug)

export default router
