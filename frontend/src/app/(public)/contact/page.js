import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { ContactPageClient } from './ContactPageClient'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/contact')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Contact Us | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Contact Cabinets & Remodeling Depot for a free estimate on your kitchen remodeling, bathroom renovation, or cabinet project in Tampa Bay.',
    }
  } catch {
    return { title: 'Contact Us | Cabinets & Remodeling Depot' }
  }
}

export default async function ContactPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['page', 'contact'],
    queryFn: async () => {
      const { data } = await api.get('/pages/contact')
      return data.data
    },
  }).catch(() => {})

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ContactPageClient />
    </HydrationBoundary>
  )
}
