import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { AboutClient } from './AboutClient'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/about')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'About Us | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Learn about Cabinets & Remodeling Depot — Tampa Bay\'s trusted remodeling contractor with over 15 years of experience.',
      openGraph: seo.ogImage ? { images: [seo.ogImage] } : undefined,
    }
  } catch {
    return { title: 'About Us | Cabinets & Remodeling Depot' }
  }
}

export default async function AboutPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['page', 'about'],
    queryFn: async () => {
      const { data } = await api.get('/pages/about')
      return data.data
    },
  }).catch(() => {})

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AboutClient />
    </HydrationBoundary>
  )
}
