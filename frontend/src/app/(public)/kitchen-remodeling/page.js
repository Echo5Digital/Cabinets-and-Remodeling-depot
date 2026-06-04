import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { ServicePageClient } from '@/components/sections/ServicePageClient'

const SLUG = 'kitchen-remodeling'

export async function generateMetadata() {
  try {
    const { data } = await api.get(`/pages/${SLUG}`)
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Kitchen Remodeling Tampa Bay | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Expert kitchen remodeling in Tampa Bay. Custom cabinets, countertops, flooring & full kitchen renovations. Free estimates. Licensed & insured.',
      openGraph: seo.ogImage ? { images: [seo.ogImage] } : undefined,
    }
  } catch {
    return { title: 'Kitchen Remodeling | Cabinets & Remodeling Depot' }
  }
}

export default async function KitchenRemodelingPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['page', SLUG],
    queryFn: async () => {
      const { data } = await api.get(`/pages/${SLUG}`)
      return data.data
    },
  }).catch(() => {})

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ServicePageClient slug={SLUG} serviceName="Kitchen Remodeling" />
    </HydrationBoundary>
  )
}
