import { Router } from 'express'
import {
  getAllGlobalSections,
  getAllGlobalSectionsAdmin,
  createGlobalSection,
  updateGlobalSection,
  deleteGlobalSection,
} from '../controllers/globalSections.controller.js'
import { authenticate, requireRole } from '../middleware/auth.js'

const router = Router()

const requireSuperAdmin = requireRole('SUPER_ADMIN')

// Public — needed for frontend rendering of linked sections
router.get('/', getAllGlobalSections)

// Admin
router.get('/admin', authenticate, requireSuperAdmin, getAllGlobalSectionsAdmin)
router.post('/', authenticate, requireSuperAdmin, createGlobalSection)
router.put('/:id', authenticate, requireSuperAdmin, updateGlobalSection)
router.delete('/:id', authenticate, requireSuperAdmin, deleteGlobalSection)

export default router
