import { api } from '@/lib/api'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cabinetsremodelingdepot.com'

function safeDate(value) {
  const d = new Date(value)
  return isNaN(d.getTime()) ? new Date() : d
}

export default async function sitemap() {
  const staticPages = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/showroom-gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    // Kitchen
    { url: `${BASE_URL}/kitchen-remodeling-tampa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/kitchen-cabinets-tampa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/kitchen-cabinets-types`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/shaker-kitchen-cabinets`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/raised-panel-kitchen-cabinets`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/slab-kitchen-cabinets`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/glass-front-kitchen-cabinets`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contemporary-style-cabinets`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/industrial-style-cabinets`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/transitional-style-cabinets`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    // Bathroom
    { url: `${BASE_URL}/bathroom-remodeling-tampa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/bathroom-vanities-tampa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // Countertops
    { url: `${BASE_URL}/countertops-tampa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/granite-countertops`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/marble-countertops`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/quartz-countertops`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/quartzite-countertops`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/porcelain-countertops`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // Flooring
    { url: `${BASE_URL}/flooring-in-tampa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/flooring-in-tampa/wood-flooring`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/flooring-in-tampa/tiles-in-tampa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/flooring-in-tampa/laminate-flooring-in-tampa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/wood-flooring`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tiles-in-tampa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/laminate-flooring-in-tampa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    // Other
    { url: `${BASE_URL}/faucets`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  let projectUrls = []
  let blogUrls = []

  try {
    const [projectsRes, blogsRes] = await Promise.all([
      api.get('/projects?limit=100&published=true'),
      api.get('/blogs?limit=100&published=true'),
    ])

    projectUrls = (projectsRes.data?.data || []).map((project) => ({
      url: `${BASE_URL}/projects/${project.slug}`,
      lastModified: safeDate(project.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    blogUrls = (blogsRes.data?.data || []).map((blog) => ({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: safeDate(blog.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  } catch {
    // Silently fail — sitemap still returns static pages
  }

  return [...staticPages, ...projectUrls, ...blogUrls]
}
