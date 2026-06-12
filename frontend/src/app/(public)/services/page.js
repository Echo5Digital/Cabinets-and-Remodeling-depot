import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { ServicesPageClient } from './ServicesPageClient'
import { JsonLd } from '@/components/common/JsonLd'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/services')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Our Services | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Full-service remodeling company in Tampa Bay. Kitchen remodeling, bathroom renovations, custom cabinets, countertops, and flooring.',
    }
  } catch {
    return { title: 'Our Services | Cabinets & Remodeling Depot' }
  }
}

export default async function ServicesPage() {
  const queryClient = getQueryClient()
  let schema = ''
  try {
    const { data } = await api.get('/pages/services')
    schema = data?.data?.content?.schema || ''
    await queryClient.prefetchQuery({
      queryKey: ['page', 'services'],
      queryFn: async () => {
        const { data: d } = await api.get('/pages/services')
        return d.data
      },
    })
  } catch {}

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JsonLd schema={schema} />
      <ServicesPageClient />
    </HydrationBoundary>
  )
}
