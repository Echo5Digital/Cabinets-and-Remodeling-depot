import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { HomeClient } from './HomeClient'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/home')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Kitchen Cabinets Tampa | Cabinet Installation & Showroom Tampa',
      description: seo.metaDescription || 'Looking for kitchen cabinets in Tampa? Visit our Valrico showroom for affordable cabinets, in-stock kitchen cabinets, and professional cabinet installation Tampa homeowners trust.',
      alternates: { canonical: '/' },
    }
  } catch {
    return {
      title: 'Kitchen Cabinets Tampa | Cabinet Installation & Showroom Tampa',
      alternates: { canonical: '/' },
    }
  }
}

async function prefetchPage() {
  try {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({
      queryKey: ['page', 'home'],
      queryFn: async () => {
        const { data } = await api.get('/pages/home')
        return data.data
      },
    })
    return dehydrate(queryClient)
  } catch {
    return null
  }
}

export default async function HomePage() {
  const dehydratedState = await prefetchPage()

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeClient />
    </HydrationBoundary>
  )
}
