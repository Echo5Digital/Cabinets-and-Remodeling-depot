import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { TermsClient } from './TermsClient'

export const metadata = {
  title: 'Terms of Service | Cabinets & Remodeling Depot',
  description: 'Terms of Service for Cabinets & Remodeling Depot.',
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
