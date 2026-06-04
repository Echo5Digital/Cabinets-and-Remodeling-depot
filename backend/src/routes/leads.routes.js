import { Router } from 'express'
import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from '../controllers/leads.controller.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { leadRateLimiter } from '../middleware/rateLimiter.js'
import { createLeadSchema, updateLeadSchema } from '../validation/lead.schema.js'

const router = Router()

// Public
router.post('/', leadRateLimiter, validate(createLeadSchema), createLead)

// Admin
router.get('/', authenticate, getAllLeads)
router.get('/:id', authenticate, getLeadById)
router.put('/:id', authenticate, validate(updateLeadSchema), updateLead)
router.delete('/:id', authenticate, deleteLead)

export default router
