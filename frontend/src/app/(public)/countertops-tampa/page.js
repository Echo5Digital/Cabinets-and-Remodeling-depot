import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { CountertopsPageClient } from '@/components/sections/CountertopsPageClient'

export const metadata = {
  title: 'Countertops Tampa | Granite & Quartz Countertops | Cabinets & Remodeling Depot',
  description:
    'Looking for countertops in Tampa? Visit our Valrico showroom for granite countertops Tampa homeowners trust, custom fabrication, quartz countertops, and professional countertop installation services.',
  openGraph: {
    title: 'Countertops Tampa | Granite & Quartz Countertops | Cabinets & Remodeling Depot',
    description:
      'Premium granite and quartz countertops in Tampa Bay. In-house fabrication, expert installation, and a huge showroom selection. Free estimates available.',
  },
}

async function prefetchPage() {
  try {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({
      queryKey: ['page', 'countertops-tampa'],
      queryFn: async () => {
        const { data } = await api.get('/pages/countertops-tampa')
        return data.data
      },
    })
    return dehydrate(queryClient)
  } catch { return null }
}

export default async function CountertopsPage() {
  const dehydratedState = await prefetchPage()
  return (
    <HydrationBoundary state={dehydratedState}>
      <CountertopsPageClient />
    </HydrationBoundary>
  )
}
