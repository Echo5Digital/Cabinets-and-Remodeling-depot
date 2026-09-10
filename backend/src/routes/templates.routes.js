import { Router } from 'express'
import {
  getAllTemplates,
  createTemplate,
  deleteTemplate,
} from '../controllers/templates.controller.js'
import { authenticate, requireRole } from '../middleware/auth.js'

const router = Router()

const requireSuperAdmin = requireRole('SUPER_ADMIN')

router.get('/', authenticate, requireSuperAdmin, getAllTemplates)
router.post('/', authenticate, requireSuperAdmin, createTemplate)
router.delete('/:id', authenticate, requireSuperAdmin, deleteTemplate)

export default router
