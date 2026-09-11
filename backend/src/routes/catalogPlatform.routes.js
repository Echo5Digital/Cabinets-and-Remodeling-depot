import { Router } from 'express'
import {
  getCatalogLeads,
  getCatalogLeadsStats,
  getCatalogLeadById,
  patchCatalogLead,
  removeCatalogLead,
  getCatalogPlannerLeads,
  getCatalogPlannerLeadById,
  patchCatalogPlannerLead,
} from '../controllers/catalogPlatform.controller.js'
import { authenticate, requireRole } from '../middleware/auth.js'

const router = Router()

const requireAdmin = requireRole('SUPER_ADMIN', 'ADMIN', 'STAFF')

// All routes are admin-only — proxy to the Cabinet Catalog Platform's leads/planner APIs.
router.get('/leads/stats', authenticate, requireAdmin, getCatalogLeadsStats)
router.get('/leads/:id', authenticate, requireAdmin, getCatalogLeadById)
router.patch('/leads/:id', authenticate, requireAdmin, patchCatalogLead)
router.delete('/leads/:id', authenticate, requireAdmin, removeCatalogLead)
router.get('/leads', authenticate, requireAdmin, getCatalogLeads)

router.get('/planner/:id', authenticate, requireAdmin, getCatalogPlannerLeadById)
router.patch('/planner/:id', authenticate, requireAdmin, patchCatalogPlannerLead)
router.get('/planner', authenticate, requireAdmin, getCatalogPlannerLeads)

export default router
