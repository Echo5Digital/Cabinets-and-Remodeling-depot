import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { ServicePageClient } from '@/components/sections/ServicePageClient'

const SLUG = 'flooring'

export async function generateMetadata() {
  try {
    const { data } = await api.get(`/pages/${SLUG}`)
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Flooring Installation Tampa Bay | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Premium flooring installation in Tampa Bay. Hardwood, tile, LVP, laminate and more. Expert installation with warranty. Free estimates.',
      openGraph: seo.ogImage ? { images: [seo.ogImage] } : undefined,
    }
  } catch {
    return { title: 'Flooring | Cabinets & Remodeling Depot' }
  }
}

export default async function FlooringPage() {
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
      <ServicePageClient slug={SLUG} serviceName="Flooring" />
    </HydrationBoundary>
  )
}
