import {
  listCatalogLeads,
  getCatalogLeadStats,
  getCatalogLead,
  updateCatalogLead,
  deleteCatalogLead,
  listCatalogPlannerLeads,
  getCatalogPlannerLead,
  updateCatalogPlannerLead,
  CatalogPlatformError,
} from '../services/catalogPlatform.service.js'

function handleCatalogError(err, res, next) {
  if (err instanceof CatalogPlatformError) {
    return res.status(err.statusCode).json({ success: false, error: err.message })
  }
  next(err)
}

// ── Leads (quote requests) ──────────────────────────────────────────────

/**
 * GET /api/catalog-leads (admin)
 */
export async function getCatalogLeads(req, res, next) {
  try {
    const { status, page, limit } = req.query
    const data = await listCatalogLeads({ status, page, limit })
    res.json({ success: true, data: data.leads, total: data.total, page: data.page, limit: data.limit })
  } catch (err) {
    handleCatalogError(err, res, next)
  }
}

/**
 * GET /api/catalog-leads/stats (admin)
 */
export async function getCatalogLeadsStats(req, res, next) {
  try {
    const data = await getCatalogLeadStats()
    res.json({ success: true, data })
  } catch (err) {
    handleCatalogError(err, res, next)
  }
}

/**
 * GET /api/catalog-leads/:id (admin)
 */
export async function getCatalogLeadById(req, res, next) {
  try {
    const data = await getCatalogLead(req.params.id)
    res.json({ success: true, data: data.lead })
  } catch (err) {
    handleCatalogError(err, res, next)
  }
}

/**
 * PATCH /api/catalog-leads/:id (admin)
 */
export async function patchCatalogLead(req, res, next) {
  try {
    const { status, assigned_to, internal_notes } = req.body
    const updates = {}
    if (status !== undefined) updates.status = status
    if (assigned_to !== undefined) updates.assigned_to = assigned_to
    if (internal_notes !== undefined) updates.internal_notes = internal_notes

    const data = await updateCatalogLead(req.params.id, updates)
    res.json({ success: true, data: data.lead })
  } catch (err) {
    handleCatalogError(err, res, next)
  }
}

/**
 * DELETE /api/catalog-leads/:id (admin)
 */
export async function removeCatalogLead(req, res, next) {
  try {
    await deleteCatalogLead(req.params.id)
    res.json({ success: true, message: 'Lead deleted.' })
  } catch (err) {
    handleCatalogError(err, res, next)
  }
}

// ── Planner leads ────────────────────────────────────────────────────────

/**
 * GET /api/catalog-planner (admin)
 */
export async function getCatalogPlannerLeads(req, res, next) {
  try {
    const { page, limit, status, q } = req.query
    const data = await listCatalogPlannerLeads({ page, limit, status, q })
    res.json({
      success: true,
      data: data.leads,
      total: data.total,
      page: data.page,
      limit: data.limit,
      totalPages: data.totalPages,
    })
  } catch (err) {
    handleCatalogError(err, res, next)
  }
}

/**
 * GET /api/catalog-planner/:id (admin)
 */
export async function getCatalogPlannerLeadById(req, res, next) {
  try {
    const data = await getCatalogPlannerLead(req.params.id)
    res.json({ success: true, data: data.lead })
  } catch (err) {
    handleCatalogError(err, res, next)
  }
}

/**
 * PATCH /api/catalog-planner/:id (admin)
 */
export async function patchCatalogPlannerLead(req, res, next) {
  try {
    const { status } = req.body
    await updateCatalogPlannerLead(req.params.id, status)
    res.json({ success: true })
  } catch (err) {
    handleCatalogError(err, res, next)
  }
}
