import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { LaminateFlooringPageClient } from '@/components/sections/LaminateFlooringPageClient'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/laminate-flooring-in-tampa')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Laminate Flooring Tampa Bay | Affordable & Durable | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'High-quality laminate flooring installation in Tampa Bay. Durable, beautiful, and budget-friendly laminate options for every room. Expert installation from our Valrico showroom.',
      alternates: { canonical: '/laminate-flooring-in-tampa' },
    }
  } catch {
    return {
      title: 'Laminate Flooring Tampa Bay | Affordable & Durable | Cabinets & Remodeling Depot',
      alternates: { canonical: '/laminate-flooring-in-tampa' },
    }
  }
}

async function prefetchPage() {
  try {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({
      queryKey: ['page', 'laminate-flooring-in-tampa'],
      queryFn: async () => {
        const { data } = await api.get('/pages/laminate-flooring-in-tampa')
        return data.data
      },
    })
    return dehydrate(queryClient)
  } catch { return null }
}

export default async function LaminateFlooringPage() {
  const dehydratedState = await prefetchPage()
  return (
    <HydrationBoundary state={dehydratedState}>
      <LaminateFlooringPageClient />
    </HydrationBoundary>
  )
}
