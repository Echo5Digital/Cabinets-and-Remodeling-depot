'use client'

import { useState } from 'react'
import { useCatalogLeads, useCatalogLeadStats } from '@/hooks/useCatalogPlatform'
import { CatalogLeadTable } from '@/components/admin/CatalogLeadTable'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const PAGE_SIZE = 20

const STATUS_FILTERS = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'closed', label: 'Closed' },
  { value: 'lost', label: 'Lost' },
]

export default function AdminCatalogLeadsPage() {
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)

  const { data: stats } = useCatalogLeadStats()
  const { data, isLoading, isError } = useCatalogLeads({
    page,
    limit: PAGE_SIZE,
    ...(status && { status }),
  })

  const totalPages = data?.limit ? Math.ceil((data.total || 0) / data.limit) : 1

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Catalog Leads</h1>
        <p className="text-muted-foreground mt-1">Quote requests submitted through the cabinet catalog platform</p>
      </div>

      {/* Status Summary */}
      {stats?.by_status && (
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s.value}
              onClick={() => { setStatus(status === s.value ? '' : s.value); setPage(1) }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                status === s.value ? 'bg-primary text-white border-primary' : 'bg-background border-border hover:bg-muted'
              }`}
            >
              {s.label}
              <span className="bg-black/10 rounded-full px-1.5 py-0.5 tabular-nums">
                {stats.by_status[s.value] || 0}
              </span>
            </button>
          ))}
        </div>
      )}

      {status && (
        <div>
          <Button variant="outline" size="sm" onClick={() => { setStatus(''); setPage(1) }}>
            Clear Filter
          </Button>
        </div>
      )}

      {isError && (
        <div className="border border-destructive/30 bg-destructive/5 rounded-lg p-4 text-sm text-destructive">
          Couldn&apos;t load catalog leads. The Cabinet Catalog Platform integration may be unavailable right now.
        </div>
      )}

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <CatalogLeadTable leads={data?.data || []} />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, data?.total || 0)} of {data?.total || 0} leads
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
