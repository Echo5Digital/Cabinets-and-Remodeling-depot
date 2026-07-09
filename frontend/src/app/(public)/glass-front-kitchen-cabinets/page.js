import { GlassFrontPageClient } from '@/components/sections/GlassFrontPageClient'
import { api } from '@/lib/api'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/glass-front-kitchen-cabinets')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Glass-Front Kitchen Cabinets Tampa Bay | Custom Installation | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Explore elegant Glass-Front kitchen cabinets in Tampa Bay. Showcase your dinnerware with beautiful glass-insert doors, professionally installed from our Valrico showroom. Request a free estimate today.',
      alternates: { canonical: '/glass-front-kitchen-cabinets' },
    }
  } catch {
    return {
      title: 'Glass-Front Kitchen Cabinets Tampa Bay | Custom Installation | Cabinets & Remodeling Depot',
      alternates: { canonical: '/glass-front-kitchen-cabinets' },
    }
  }
}

export default function GlassFrontKitchenCabinetsPage() {
  return <GlassFrontPageClient />
}
