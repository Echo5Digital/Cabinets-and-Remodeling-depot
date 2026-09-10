'use client'

import { useState, useEffect, useRef } from 'react'
import { useCatalogPlannerLeads } from '@/hooks/useCatalogPlatform'
import { CatalogPlannerTable } from '@/components/admin/CatalogPlannerTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Search } from 'lucide-react'

const PAGE_SIZE = 20

const STATUS_FILTERS = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'closed', label: 'Closed' },
]

export default function AdminCatalogPlannerPage() {
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState(1)
  const debounceRef = useRef(null)

  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 400)
    return () => clearTimeout(debounceRef.current)
  }, [search])

  const { data, isLoading, isError } = useCatalogPlannerLeads({
    page,
    limit: PAGE_SIZE,
    ...(status && { status }),
    ...(debouncedSearch && { q: debouncedSearch }),
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Catalog Planner</h1>
        <p className="text-muted-foreground mt-1">Kitchen designs saved by customers through the cabinet catalog planner tool</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, phone, project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s.value}
              onClick={() => { setStatus(status === s.value ? '' : s.value); setPage(1) }}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                status === s.value ? 'bg-primary text-white border-primary' : 'bg-background border-border hover:bg-muted'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {isError && (
        <div className="border border-destructive/30 bg-destructive/5 rounded-lg p-4 text-sm text-destructive">
          Couldn&apos;t load planner leads. The Cabinet Catalog Platform integration may be unavailable right now.
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
          <CatalogPlannerTable leads={data?.data || []} />
        )}
      </div>

      {/* Pagination */}
      {data?.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, data.total)} of {data.total} planner leads
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)} disabled={page >= data.totalPages}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
