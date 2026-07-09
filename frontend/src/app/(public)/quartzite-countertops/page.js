import { QuartzitePageClient } from '@/components/sections/QuartzitePageClient'
import { api } from '@/lib/api'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/quartzite-countertops')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Quartzite Countertops Tampa Bay | Natural Stone Fabrication & Installation | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Discover quartzite countertops in Tampa Bay. Marble-like beauty with exceptional strength and heat resistance. Custom fabrication and professional installation from our Valrico showroom.',
      alternates: { canonical: '/quartzite-countertops' },
    }
  } catch {
    return {
      title: 'Quartzite Countertops Tampa Bay | Natural Stone Fabrication & Installation | Cabinets & Remodeling Depot',
      alternates: { canonical: '/quartzite-countertops' },
    }
  }
}

export default function QuartziteCountertopsPage() {
  return <QuartzitePageClient />
}
