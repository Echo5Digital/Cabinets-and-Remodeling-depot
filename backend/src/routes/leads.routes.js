import { Router } from 'express'
import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from '../controllers/leads.controller.js'
import { authenticate, requireRole } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { leadRateLimiter } from '../middleware/rateLimiter.js'
import { createLeadSchema, updateLeadSchema } from '../validation/lead.schema.js'

const router = Router()

const requireAdmin = requireRole('SUPER_ADMIN', 'ADMIN')

// Public
router.post('/', leadRateLimiter, validate(createLeadSchema), createLead)

// Admin
router.get('/', authenticate, requireAdmin, getAllLeads)
router.get('/:id', authenticate, requireAdmin, getLeadById)
router.put('/:id', authenticate, requireAdmin, validate(updateLeadSchema), updateLead)
router.delete('/:id', authenticate, requireAdmin, deleteLead)

export default router
