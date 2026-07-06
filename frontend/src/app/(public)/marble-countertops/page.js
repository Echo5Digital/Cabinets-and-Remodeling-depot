import { MarblePageClient } from '@/components/sections/MarblePageClient'
import { api } from '@/lib/api'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/marble-countertops')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Marble Countertops Tampa Bay | Luxury Stone Fabrication & Installation | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Explore timeless marble countertops in Tampa Bay. Graceful veining, classic elegance, and professional installation from our Valrico showroom.',
    }
  } catch {
    return { title: 'Marble Countertops Tampa Bay | Luxury Stone Fabrication & Installation | Cabinets & Remodeling Depot' }
  }
}

export default function MarbleCountertopsPage() {
  return <MarblePageClient />
}
