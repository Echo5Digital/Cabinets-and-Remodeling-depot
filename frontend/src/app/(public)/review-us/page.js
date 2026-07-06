import { ReviewUsPageClient } from '@/components/sections/ReviewUsPageClient'
import { api } from '@/lib/api'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/review-us')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Share Your Experience With Us - Cabinets And Remodeling Depot',
      description: seo.metaDescription || 'Leave a review for Cabinets & Remodeling Depot. Share your experience with our kitchen remodeling, bathroom renovation, and cabinet services in Tampa, Valrico, FL.',
    }
  } catch {
    return { title: 'Share Your Experience With Us - Cabinets And Remodeling Depot' }
  }
}

export default function ReviewUsPage() {
  return <ReviewUsPageClient />
}
