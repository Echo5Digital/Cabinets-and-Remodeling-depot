'use client'

import { useState } from 'react'
import { useLeads } from '@/hooks/useLeads'
import { LeadTable } from '@/components/admin/LeadTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'
import { LEAD_STATUSES } from '@/lib/constants'

export default function AdminLeadsPage() {
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useLeads({
    page,
    limit: 20,
    ...(status && { status }),
    ...(search && { search }),
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leads</h1>
        <p className="text-muted-foreground mt-1">Customer inquiries submitted through the website</p>
      </div>

      {/* Status Summary */}
      {data?.statusCounts && (
        <div className="flex flex-wrap gap-2">
          {LEAD_STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => setStatus(status === s.value ? '' : s.value)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                status === s.value ? 'bg-primary text-white border-primary' : 'bg-background border-border hover:bg-muted'
              }`}
            >
              {s.label}
              <span className="bg-black/10 rounded-full px-1.5 py-0.5 tabular-nums">
                {data.statusCounts[s.value] || 0}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, phone..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="pl-9"
          />
        </div>
        {status && (
          <Button variant="outline" onClick={() => setStatus('')}>
            Clear Filter
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <LeadTable leads={data?.data || []} />
        )}
      </div>

      {/* Pagination */}
      {data?.pagination && data.pagination.pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {((page - 1) * 20) + 1}–{Math.min(page * 20, data.pagination.total)} of {data.pagination.total} leads
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={page >= data.pagination.pages}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
