import { KitchenCabinetsTypesPageClient } from '@/components/sections/KitchenCabinetsTypesPageClient'

export const metadata = {
  title: 'Kitchen Cabinets Types - Cabinets And Remodeling Depot',
  description:
    'Explore the different types of kitchen cabinets including glass-front, beadboard, flat-front, plywood, and natural wood cabinets. Find the perfect style for your kitchen at our Valrico showroom.',
  openGraph: {
    title: 'Kitchen Cabinets Types - Cabinets And Remodeling Depot',
    description:
      'Explore the different types of kitchen cabinets including glass-front, beadboard, flat-front, plywood, and natural wood cabinets. Find the perfect style for your kitchen at our Valrico showroom.',
  },
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
      '@id': 'https://www.cabinetsandremodelingdepot.com/kitchen-cabinets-types/#service',
      name: 'Kitchen Cabinet Types',
      serviceType: 'Kitchen Cabinet Installation',
      provider: { '@id': 'https://www.cabinetsandremodelingdepot.com/#business' },
      description:
        'Comprehensive guide to kitchen cabinet types including glass-front, beadboard, flat-front, plywood, and natural wood cabinets for Tampa Bay homeowners.',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.cabinetsandremodelingdepot.com/kitchen-cabinets-types/#breadcrumb',
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
          name: 'Kitchen Cabinets Types',
          item: 'https://www.cabinetsandremodelingdepot.com/kitchen-cabinets-types/',
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/kitchen-cabinets-types/',
      url: 'https://www.cabinetsandremodelingdepot.com/kitchen-cabinets-types/',
      name: 'Kitchen Cabinets Types - Cabinets And Remodeling Depot',
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

export default function KitchenCabinetsTypesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <KitchenCabinetsTypesPageClient />
    </>
  )
}
