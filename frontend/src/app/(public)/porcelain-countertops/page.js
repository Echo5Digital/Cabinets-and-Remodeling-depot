import { PorcelainPageClient } from '@/components/sections/PorcelainPageClient'
import { api } from '@/lib/api'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/porcelain-countertops')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Porcelain Countertops Tampa Bay | Contemporary Fabrication & Installation | Cabinets & Remodeling Depot',
      description: seo.metaDescription || 'Discover sleek porcelain countertops in Tampa Bay. Heat, stain, and scratch resistant with versatile designs for kitchens, bathrooms, and outdoor spaces. Custom fabrication from our Valrico showroom.',
      alternates: { canonical: '/porcelain-countertops' },
    }
  } catch {
    return {
      title: 'Porcelain Countertops Tampa Bay | Contemporary Fabrication & Installation | Cabinets & Remodeling Depot',
      alternates: { canonical: '/porcelain-countertops' },
    }
  }
}

export default function PorcelainCountertopsPage() {
  return <PorcelainPageClient />
}
