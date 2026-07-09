import { QuartzPageClient } from '@/components/sections/QuartzPageClient'
import { api } from '@/lib/api'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/quartz-countertops')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Quartz Countertops Tampa Bay | Custom Fabrication & Installation | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Discover premium quartz countertops in Tampa Bay. Low maintenance, non-porous, and available in dozens of colors and finishes. Custom fabrication and professional installation from our Valrico showroom.',
      alternates: { canonical: '/quartz-countertops' },
    }
  } catch {
    return {
      title: 'Quartz Countertops Tampa Bay | Custom Fabrication & Installation | Cabinets & Remodeling Depot',
      alternates: { canonical: '/quartz-countertops' },
    }
  }
}

export default function QuartzCountertopsPage() {
  return <QuartzPageClient />
}
