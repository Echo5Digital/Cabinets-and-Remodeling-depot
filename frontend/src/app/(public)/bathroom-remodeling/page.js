import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { ServicePageClient } from '@/components/sections/ServicePageClient'

const SLUG = 'bathroom-remodeling'

export async function generateMetadata() {
  try {
    const { data } = await api.get(`/pages/${SLUG}`)
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Bathroom Remodeling Tampa Bay | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Transform your bathroom with expert remodeling services in Tampa Bay. Custom tile, vanities, showers & more. Free estimates.',
      openGraph: seo.ogImage ? { images: [seo.ogImage] } : undefined,
    }
  } catch {
    return { title: 'Bathroom Remodeling | Cabinets & Remodeling Depot' }
  }
}

export default async function BathroomRemodelingPage() {
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
      <ServicePageClient slug={SLUG} serviceName="Bathroom Remodeling" />
    </HydrationBoundary>
  )
}
