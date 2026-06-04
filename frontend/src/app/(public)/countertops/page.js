import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { ServicePageClient } from '@/components/sections/ServicePageClient'

const SLUG = 'countertops'

export async function generateMetadata() {
  try {
    const { data } = await api.get(`/pages/${SLUG}`)
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Countertops Tampa Bay | Quartz & Granite | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Premium quartz and granite countertops in Tampa Bay. Large selection, expert fabrication and installation. Free estimates.',
      openGraph: seo.ogImage ? { images: [seo.ogImage] } : undefined,
    }
  } catch {
    return { title: 'Countertops | Cabinets & Remodeling Depot' }
  }
}

export default async function CountertopsPage() {
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
      <ServicePageClient slug={SLUG} serviceName="Countertops" />
    </HydrationBoundary>
  )
}
