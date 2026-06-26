import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { AboutClient } from './AboutClient'

export const metadata = {
  title: 'About Us | Cabinets & Remodeling Depot',
  description:
    "Learn about Cabinets & Remodeling Depot — Tampa Bay's trusted remodeling contractor for kitchen cabinets, bathroom vanities, countertops, and flooring.",
  openGraph: {
    title: 'About Us | Cabinets & Remodeling Depot',
    description:
      "Learn about Cabinets & Remodeling Depot — Tampa Bay's trusted remodeling contractor for kitchen cabinets, bathroom vanities, countertops, and flooring.",
  },
}

async function prefetchPage() {
  try {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({
      queryKey: ['page', 'about'],
      queryFn: async () => {
        const { data } = await api.get('/pages/about')
        return data.data
      },
    })
    return dehydrate(queryClient)
  } catch { return null }
}

export default async function AboutPage() {
  const dehydratedState = await prefetchPage()
  return (
    <HydrationBoundary state={dehydratedState}>
      <AboutClient />
    </HydrationBoundary>
  )
}
