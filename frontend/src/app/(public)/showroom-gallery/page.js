import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { GalleryPageClient } from './GalleryPageClient'

export const metadata = {
  title: 'Project Gallery | Cabinets & Remodeling Depot',
  description: 'Browse our gallery of kitchen and bathroom remodeling projects, custom cabinets, countertops, and flooring installations throughout Tampa Bay.',
}

async function prefetchPage() {
  try {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({
      queryKey: ['page', 'showroom-gallery'],
      queryFn: async () => {
        const { data } = await api.get('/pages/showroom-gallery')
        return data.data
      },
    })
    return dehydrate(queryClient)
  } catch { return null }
}

export default async function GalleryPage() {
  const dehydratedState = await prefetchPage()
  return (
    <HydrationBoundary state={dehydratedState}>
      <GalleryPageClient />
    </HydrationBoundary>
  )
}
