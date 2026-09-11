'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import api from '@/lib/api'
import { useCatalogLeadStats, useCatalogPlannerLeads } from '@/hooks/useCatalogPlatform'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Users, ClipboardList, Ruler, ArrowRight } from 'lucide-react'

function StatCard({ title, value, description, icon: Icon, color, href, breakdown }) {
  return (
    <Link href={href} className="block h-full group">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold">{value ?? '—'}</div>
              {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform mb-1" />
          </div>
          {breakdown && breakdown.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t">
              {breakdown.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-muted text-muted-foreground"
                >
                  {b.label}
                  <span className="tabular-nums">{b.value}</span>
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="w-8 h-8 rounded-lg" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-16 mb-1" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  )
}

export function BusinessDashboardStats() {
  const { data: leadsData, isLoading: leadsLoading } = useQuery({
    queryKey: ['leads-stats'],
    queryFn: async () => {
      const { data } = await api.get('/leads?limit=1')
      return data
    },
  })

  const { data: catalogStats, isLoading: catalogLoading } = useCatalogLeadStats()

  const { data: plannerData, isLoading: plannerLoading } = useCatalogPlannerLeads({ limit: 1 })

  const isLoading = leadsLoading || catalogLoading || plannerLoading

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  const newLeadsCount = leadsData?.statusCounts?.NEW ?? 0
  const totalLeads = leadsData?.pagination?.total ?? 0

  const totalCatalogLeads = Object.values(catalogStats?.by_status || {}).reduce((sum, n) => sum + (n || 0), 0)
  const newCatalogLeads = catalogStats?.by_status?.new ?? 0

  const totalPlannerLeads = plannerData?.total ?? 0

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        title="Leads"
        value={newLeadsCount}
        description={`${totalLeads} total leads`}
        icon={Users}
        color="bg-blue-500"
        href="/admin/leads"
        breakdown={[{ label: 'New', value: newLeadsCount }]}
      />
      <StatCard
        title="Catalog Leads"
        value={newCatalogLeads}
        description={`${totalCatalogLeads} total quote requests`}
        icon={ClipboardList}
        color="bg-primary"
        href="/admin/catalog-leads"
        breakdown={[{ label: 'New', value: newCatalogLeads }]}
      />
      <StatCard
        title="Catalog Planner"
        value={totalPlannerLeads}
        description="Saved kitchen designs"
        icon={Ruler}
        color="bg-purple-600"
        href="/admin/catalog-planner"
      />
    </div>
  )
}
