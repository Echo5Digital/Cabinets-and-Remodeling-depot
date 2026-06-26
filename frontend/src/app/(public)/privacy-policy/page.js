import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { PrivacyPolicyClient } from './PrivacyPolicyClient'

export const metadata = {
  title: 'Privacy Policy | Cabinets & Remodeling Depot',
  description: 'Privacy Policy for Cabinets & Remodeling Depot.',
}

async function prefetchPage() {
  try {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({
      queryKey: ['page', 'privacy-policy'],
      queryFn: async () => {
        const { data } = await api.get('/pages/privacy-policy')
        return data.data
      },
    })
    return dehydrate(queryClient)
  } catch { return null }
}

export default async function PrivacyPolicyPage() {
  const dehydratedState = await prefetchPage()
  return (
    <HydrationBoundary state={dehydratedState}>
      <PrivacyPolicyClient />
    </HydrationBoundary>
  )
}
