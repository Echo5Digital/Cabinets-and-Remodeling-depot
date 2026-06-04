export default function robots() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cabinetsremodelingdepot.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
