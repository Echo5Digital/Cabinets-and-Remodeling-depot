'use client'

import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Users, Briefcase, BookOpen, Image, TrendingUp } from 'lucide-react'

function StatCard({ title, value, description, icon: Icon, color }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value ?? '—'}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
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

export function DashboardStats() {
  const { data: leadsData, isLoading: leadsLoading } = useQuery({
    queryKey: ['leads-stats'],
    queryFn: async () => {
      const { data } = await api.get('/leads?limit=1')
      return data
    },
  })

  const { data: projectsData, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects-stats'],
    queryFn: async () => {
      const { data } = await api.get('/projects?limit=1&published=false')
      return data
    },
  })

  const { data: blogsData, isLoading: blogsLoading } = useQuery({
    queryKey: ['blogs-stats'],
    queryFn: async () => {
      const { data } = await api.get('/blogs?limit=1&published=false')
      return data
    },
  })

  const { data: galleryData, isLoading: galleryLoading } = useQuery({
    queryKey: ['gallery-stats'],
    queryFn: async () => {
      const { data } = await api.get('/gallery?limit=1')
      return data
    },
  })

  const isLoading = leadsLoading || projectsLoading || blogsLoading || galleryLoading

  const newLeadsCount = leadsData?.statusCounts?.NEW ?? 0

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="New Leads"
        value={newLeadsCount}
        description={`${leadsData?.pagination?.total ?? 0} total leads`}
        icon={Users}
        color="bg-blue-500"
      />
      <StatCard
        title="Projects"
        value={projectsData?.pagination?.total ?? 0}
        description="Total projects"
        icon={Briefcase}
        color="bg-primary"
      />
      <StatCard
        title="Blog Posts"
        value={blogsData?.pagination?.total ?? 0}
        description="Total articles"
        icon={BookOpen}
        color="bg-green-600"
      />
      <StatCard
        title="Gallery Images"
        value={galleryData?.pagination?.total ?? 0}
        description="Total images"
        icon={Image}
        color="bg-purple-600"
      />
    </div>
  )
}
