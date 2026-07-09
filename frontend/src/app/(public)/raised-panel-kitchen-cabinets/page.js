import { RaisedPanelPageClient } from '@/components/sections/RaisedPanelPageClient'
import { api } from '@/lib/api'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/raised-panel-kitchen-cabinets')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Raised Panel Kitchen Cabinets Tampa Bay | Custom Installation | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Discover classic Raised Panel kitchen cabinets in Tampa Bay. Sculpted profiles, rich finishes, and professional installation from our Valrico showroom. Request a free estimate today.',
      alternates: { canonical: '/raised-panel-kitchen-cabinets' },
    }
  } catch {
    return {
      title: 'Raised Panel Kitchen Cabinets Tampa Bay | Custom Installation | Cabinets & Remodeling Depot',
      alternates: { canonical: '/raised-panel-kitchen-cabinets' },
    }
  }
}

export default function RaisedPanelKitchenCabinetsPage() {
  return <RaisedPanelPageClient />
}
