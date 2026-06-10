import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { ContactPageClient } from './ContactPageClient'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/contact')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Contact Us - Cabinets And Remodeling Depot',
      description: seo.metaDescription || 'For assistance, call +1 813-651-2333 or visit us at 106 S St Cloud Ave, Valrico, FL 33594. Open Mon–Fri: 10AM–6PM, Sat: 10AM–4PM. Your remodeling needs, our priority!',
    }
  } catch {
    return { title: 'Contact Us - Cabinets And Remodeling Depot' }
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
