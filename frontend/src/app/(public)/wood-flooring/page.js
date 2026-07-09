import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { WoodenFlooringPageClient } from '@/components/sections/WoodenFlooringPageClient'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/wood-flooring')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Wooden Flooring Tampa | Wood Floor Installation | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Cabinets & Remodeling Depot offers affordable wood flooring installation in Tampa and Valrico, FL. Visit our showroom or call for a free in-home estimate.',
      alternates: { canonical: '/wood-flooring' },
    }
  } catch {
    return {
      title: 'Wooden Flooring Tampa | Wood Floor Installation | Cabinets & Remodeling Depot',
      alternates: { canonical: '/wood-flooring' },
    }
  }
}

async function prefetchPage() {
  try {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({
      queryKey: ['page', 'wood-flooring'],
      queryFn: async () => {
        const { data } = await api.get('/pages/wood-flooring')
        return data.data
      },
    })
    return dehydrate(queryClient)
  } catch { return null }
}

export default async function WoodenFlooringPage() {
  const dehydratedState = await prefetchPage()
  return (
    <HydrationBoundary state={dehydratedState}>
      <WoodenFlooringPageClient />
    </HydrationBoundary>
  )
}
