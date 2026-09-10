const BASE_URL = process.env.CATALOG_PLATFORM_API_URL
const SERVICE_KEY = process.env.CATALOG_PLATFORM_SERVICE_KEY

class CatalogPlatformError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Service-Key': SERVICE_KEY,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new CatalogPlatformError(data.error || 'Catalog platform request failed.', res.status)
  }
  return data
}

// ── Leads (quote requests) ──────────────────────────────────────────────
export function listCatalogLeads({ status, page, limit } = {}) {
  const params = new URLSearchParams()
  if (status) params.set('status', status)
  if (page) params.set('page', page)
  if (limit) params.set('limit', limit)
  const qs = params.toString()
  return request(`/api/leads${qs ? `?${qs}` : ''}`)
}

export function getCatalogLeadStats() {
  return request('/api/leads/stats')
}

export function getCatalogLead(id) {
  return request(`/api/leads/${id}`)
}

export function updateCatalogLead(id, updates) {
  return request(`/api/leads/${id}`, { method: 'PATCH', body: updates })
}

export function deleteCatalogLead(id) {
  return request(`/api/leads/${id}`, { method: 'DELETE' })
}

// ── Planner leads ────────────────────────────────────────────────────────
export function listCatalogPlannerLeads({ page, limit, status, q } = {}) {
  const params = new URLSearchParams()
  if (page) params.set('page', page)
  if (limit) params.set('limit', limit)
  if (status) params.set('status', status)
  if (q) params.set('q', q)
  const qs = params.toString()
  return request(`/api/admin/planner-leads${qs ? `?${qs}` : ''}`)
}

export function getCatalogPlannerLead(id) {
  return request(`/api/admin/planner-leads/${id}`)
}

export function updateCatalogPlannerLead(id, status) {
  return request('/api/admin/planner-leads', { method: 'PATCH', body: { id, status } })
}

export { CatalogPlatformError }
