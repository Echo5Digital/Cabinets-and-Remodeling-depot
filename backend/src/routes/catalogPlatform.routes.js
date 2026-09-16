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

// Catalog Planner is temporarily disabled feature-wide without removing the
// code — flip to true to re-expose these routes. Kept in sync with the
// frontend's SHOW_CATALOG_PLANNER (frontend/src/lib/constants.js).
const SHOW_CATALOG_PLANNER = false

function requireCatalogPlannerEnabled(req, res, next) {
  if (!SHOW_CATALOG_PLANNER) return res.status(404).json({ message: 'Not found' })
  next()
}

// All routes are admin-only — proxy to the Cabinet Catalog Platform's leads/planner APIs.
router.get('/leads/stats', authenticate, requireAdmin, getCatalogLeadsStats)
router.get('/leads/:id', authenticate, requireAdmin, getCatalogLeadById)
router.patch('/leads/:id', authenticate, requireAdmin, patchCatalogLead)
router.delete('/leads/:id', authenticate, requireAdmin, removeCatalogLead)
router.get('/leads', authenticate, requireAdmin, getCatalogLeads)

router.get('/planner/:id', authenticate, requireAdmin, requireCatalogPlannerEnabled, getCatalogPlannerLeadById)
router.patch('/planner/:id', authenticate, requireAdmin, requireCatalogPlannerEnabled, patchCatalogPlannerLead)
router.get('/planner', authenticate, requireAdmin, requireCatalogPlannerEnabled, getCatalogPlannerLeads)

export default router
