import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { TermsClient } from './TermsClient'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/terms')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Terms of Service | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Terms of Service for Cabinets & Remodeling Depot.',
      alternates: { canonical: '/terms' },
    }
  } catch {
    return {
      title: 'Terms of Service | Cabinets & Remodeling Depot',
      alternates: { canonical: '/terms' },
    }
  }
}

async function prefetchPage() {
  try {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({
      queryKey: ['page', 'terms'],
      queryFn: async () => {
        const { data } = await api.get('/pages/terms')
        return data.data
      },
    })
    return dehydrate(queryClient)
  } catch { return null }
}

export default async function TermsPage() {
  const dehydratedState = await prefetchPage()
  return (
    <HydrationBoundary state={dehydratedState}>
      <TermsClient />
    </HydrationBoundary>
  )
}
