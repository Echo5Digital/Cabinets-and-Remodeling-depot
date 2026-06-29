import { Router } from 'express'
import {
  getAllTemplates,
  createTemplate,
  deleteTemplate,
} from '../controllers/templates.controller.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

router.get('/', authenticate, getAllTemplates)
router.post('/', authenticate, createTemplate)
router.delete('/:id', authenticate, deleteTemplate)

export default router
