import { SlabPageClient } from '@/components/sections/SlabPageClient'
import { api } from '@/lib/api'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/slab-kitchen-cabinets')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Slab & Flat Panel Kitchen Cabinets Tampa Bay | Custom Installation | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Explore sleek Slab and Flat Panel kitchen cabinets in Tampa Bay. Minimalist modern design with professional installation from our Valrico showroom. Request a free estimate today.',
    }
  } catch {
    return { title: 'Slab & Flat Panel Kitchen Cabinets Tampa Bay | Custom Installation | Cabinets & Remodeling Depot' }
  }
}

export default function SlabKitchenCabinetsPage() {
  return <SlabPageClient />
}
