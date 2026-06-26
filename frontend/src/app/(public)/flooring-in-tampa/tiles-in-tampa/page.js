import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { TilesPageClient } from '@/components/sections/TilesPageClient'

export const metadata = {
  title: 'Tile Flooring Tampa Bay | Ceramic & Porcelain Tile Installation | Cabinets & Remodeling Depot',
  description:
    'Premium ceramic and porcelain tile flooring installation in Tampa Bay. Kitchen tiles, bathroom tiles, large-format tiles, and more. Expert installation from our Valrico showroom.',
  openGraph: {
    title: 'Tile Flooring Tampa Bay | Ceramic & Porcelain Tile Installation | Cabinets & Remodeling Depot',
    description:
      'Beautiful tile flooring for Tampa Bay homes and businesses. Ceramic, porcelain, and stone tile installed by local professionals. Free estimates available.',
  },
}

async function prefetchPage() {
  try {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({
      queryKey: ['page', 'tiles-in-tampa'],
      queryFn: async () => {
        const { data } = await api.get('/pages/tiles-in-tampa')
        return data.data
      },
    })
    return dehydrate(queryClient)
  } catch { return null }
}

export default async function TilesPage() {
  const dehydratedState = await prefetchPage()
  return (
    <HydrationBoundary state={dehydratedState}>
      <TilesPageClient />
    </HydrationBoundary>
  )
}
