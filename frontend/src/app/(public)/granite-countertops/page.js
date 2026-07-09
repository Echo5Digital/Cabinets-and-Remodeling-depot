import { GranitePageClient } from '@/components/sections/GranitePageClient'
import { api } from '@/lib/api'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/granite-countertops')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Granite Countertops Tampa Bay | Natural Stone Fabrication & Installation | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Explore natural granite countertops in Tampa Bay. Unique veining patterns, exceptional durability, and professional installation from our Valrico showroom.',
      alternates: { canonical: '/granite-countertops' },
    }
  } catch {
    return {
      title: 'Granite Countertops Tampa Bay | Natural Stone Fabrication & Installation | Cabinets & Remodeling Depot',
      alternates: { canonical: '/granite-countertops' },
    }
  }
}

export default function GraniteCountertopsPage() {
  return <GranitePageClient />
}
