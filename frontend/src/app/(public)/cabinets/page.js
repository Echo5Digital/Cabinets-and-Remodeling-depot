import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { ServicePageClient } from '@/components/sections/ServicePageClient'

const SLUG = 'cabinets'

export async function generateMetadata() {
  try {
    const { data } = await api.get(`/pages/${SLUG}`)
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Custom Cabinets Tampa Bay | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Custom and stock cabinets for kitchens and bathrooms in Tampa Bay. Expert installation, wide selection of styles and finishes. Free estimates.',
      openGraph: seo.ogImage ? { images: [seo.ogImage] } : undefined,
    }
  } catch {
    return { title: 'Custom Cabinets | Cabinets & Remodeling Depot' }
  }
}

export default async function CabinetsPage() {
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
      <ServicePageClient slug={SLUG} serviceName="Custom Cabinets" />
    </HydrationBoundary>
  )
}
