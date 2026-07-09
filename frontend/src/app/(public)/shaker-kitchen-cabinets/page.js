import { ShakerPageClient } from '@/components/sections/ShakerPageClient'
import { api } from '@/lib/api'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/shaker-kitchen-cabinets')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Shaker Kitchen Cabinets Tampa Bay | Custom Installation | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Discover timeless Shaker kitchen cabinets in Tampa Bay. Clean recessed panels, versatile finishes, and professional installation from our Valrico showroom. Request a free estimate today.',
      alternates: { canonical: '/shaker-kitchen-cabinets' },
    }
  } catch {
    return {
      title: 'Shaker Kitchen Cabinets Tampa Bay | Custom Installation | Cabinets & Remodeling Depot',
      alternates: { canonical: '/shaker-kitchen-cabinets' },
    }
  }
}

export default function ShakerKitchenCabinetsPage() {
  return <ShakerPageClient />
}
