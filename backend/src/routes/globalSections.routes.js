import { Router } from 'express'
import {
  getAllGlobalSections,
  getAllGlobalSectionsAdmin,
  createGlobalSection,
  updateGlobalSection,
  deleteGlobalSection,
} from '../controllers/globalSections.controller.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

// Public — needed for frontend rendering of linked sections
router.get('/', getAllGlobalSections)

// Admin
router.get('/admin', authenticate, getAllGlobalSectionsAdmin)
router.post('/', authenticate, createGlobalSection)
router.put('/:id', authenticate, updateGlobalSection)
router.delete('/:id', authenticate, deleteGlobalSection)

export default router
