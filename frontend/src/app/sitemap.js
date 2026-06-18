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
    { url: `${BASE_URL}/kitchen-remodeling-tampa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/bathroom-remodeling-tampa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/in-stock-cabinets`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/countertops-tampa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/flooring-in-tampa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/showroom-gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
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
