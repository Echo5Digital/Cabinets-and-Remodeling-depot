import { RenovationsPageClient } from '@/components/sections/RenovationsPageClient'
import { api } from '@/lib/api'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/renovations')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Renovations - Cabinets And Remodeling Depot',
      description: seo.metaDescription || 'Kitchen and bathroom renovation services in Tampa Bay. From cabinet solutions and countertop installation to complete bathroom remodels — all with minimal disruption. Visit our Valrico showroom for a free estimate.',
      alternates: { canonical: '/renovations' },
    }
  } catch {
    return {
      title: 'Renovations - Cabinets And Remodeling Depot',
      alternates: { canonical: '/renovations' },
    }
  }
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://www.cabinetsandremodelingdepot.com/#business',
      name: 'Cabinets & Remodeling Depot',
      url: 'https://www.cabinetsandremodelingdepot.com/',
      telephone: '+18136512333',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '106 S St Cloud Ave',
        addressLocality: 'Valrico',
        addressRegion: 'FL',
        postalCode: '33594',
        addressCountry: 'US',
      },
    },
    {
      '@type': 'Service',
      '@id': 'https://www.cabinetsandremodelingdepot.com/renovations/#service',
      name: 'Home Renovations',
      serviceType: 'Kitchen and Bathroom Renovation',
      provider: { '@id': 'https://www.cabinetsandremodelingdepot.com/#business' },
      description:
        'Complete kitchen and bathroom renovation services in Tampa Bay including countertop installation, cabinet solutions, bathroom remodeling, and design consultation with minimal disruption.',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.cabinetsandremodelingdepot.com/renovations/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.cabinetsandremodelingdepot.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Renovations',
          item: 'https://www.cabinetsandremodelingdepot.com/renovations/',
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/renovations/',
      url: 'https://www.cabinetsandremodelingdepot.com/renovations/',
      name: 'Renovations - Cabinets And Remodeling Depot',
      isPartOf: { '@id': 'https://www.cabinetsandremodelingdepot.com/#website' },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.cabinetsandremodelingdepot.com/#website',
      url: 'https://www.cabinetsandremodelingdepot.com/',
      name: 'Cabinets & Remodeling Depot',
      publisher: { '@id': 'https://www.cabinetsandremodelingdepot.com/#business' },
    },
  ],
}

export default function RenovationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <RenovationsPageClient />
    </>
  )
}
