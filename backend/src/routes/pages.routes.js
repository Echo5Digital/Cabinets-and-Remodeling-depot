import { Router } from 'express'
import {
  getAllPages,
  getPageBySlug,
  updatePageContent,
  previewPageBySlug,
  getPageRevisions,
  restorePageRevision,
} from '../controllers/pages.controller.js'
import { authenticate, requireRole } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { updatePageContentSchema } from '../validation/page.schema.js'

const router = Router()

const requireSuperAdmin = requireRole('SUPER_ADMIN')

// ── Public routes ─────────────────────────────────────────────────────────────
router.get('/', getAllPages)

// ── Admin routes (defined before /:slug to avoid conflicts) ──────────────────
router.get('/admin/preview/:slug', authenticate, requireSuperAdmin, previewPageBySlug)
router.get('/admin/:slug/revisions', authenticate, requireSuperAdmin, getPageRevisions)
router.post('/admin/:slug/revisions/:revisionId/restore', authenticate, requireSuperAdmin, restorePageRevision)
router.put('/admin/:slug', authenticate, requireSuperAdmin, validate(updatePageContentSchema), updatePageContent)

// ── Public slug route (catch-all — must remain last) ─────────────────────────
router.get('/:slug', getPageBySlug)

export default router
