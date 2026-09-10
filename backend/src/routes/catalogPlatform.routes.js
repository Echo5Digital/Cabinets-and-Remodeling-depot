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
import { authenticate } from '../middleware/auth.js'

const router = Router()

// All routes are admin-only — proxy to the Cabinet Catalog Platform's leads/planner APIs.
router.get('/leads/stats', authenticate, getCatalogLeadsStats)
router.get('/leads/:id', authenticate, getCatalogLeadById)
router.patch('/leads/:id', authenticate, patchCatalogLead)
router.delete('/leads/:id', authenticate, removeCatalogLead)
router.get('/leads', authenticate, getCatalogLeads)

router.get('/planner/:id', authenticate, getCatalogPlannerLeadById)
router.patch('/planner/:id', authenticate, patchCatalogPlannerLead)
router.get('/planner', authenticate, getCatalogPlannerLeads)

export default router
