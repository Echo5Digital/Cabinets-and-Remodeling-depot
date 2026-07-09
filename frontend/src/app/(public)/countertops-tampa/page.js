import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { CountertopsPageClient } from '@/components/sections/CountertopsPageClient'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/countertops-tampa')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Countertops Tampa | Granite & Quartz Countertops | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Looking for countertops in Tampa? Visit our Valrico showroom for granite countertops Tampa homeowners trust, custom fabrication, quartz countertops, and professional countertop installation services.',
      alternates: { canonical: '/countertops-tampa' },
    }
  } catch {
    return {
      title: 'Countertops Tampa | Granite & Quartz Countertops | Cabinets & Remodeling Depot',
      alternates: { canonical: '/countertops-tampa' },
    }
  }
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
