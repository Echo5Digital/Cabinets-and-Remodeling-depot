import { ShakerStyleCabinetsPageClient } from '@/components/sections/ShakerStyleCabinetsPageClient'

export const metadata = {
  title: 'Shaker Style Cabinets - Cabinets And Remodeling Depot',
  description:
    'Explore shaker style kitchen cabinets featuring clean lines, recessed panel doors, and timeless versatility. Visit our Valrico showroom for a free estimate today.',
  openGraph: {
    title: 'Shaker Style Cabinets - Cabinets And Remodeling Depot',
    description:
      'Explore shaker style kitchen cabinets featuring clean lines, recessed panel doors, and timeless versatility. Visit our Valrico showroom for a free estimate today.',
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
      '@id': 'https://www.cabinetsandremodelingdepot.com/shaker-style-cabinets/#service',
      name: 'Shaker Style Kitchen Cabinets',
      serviceType: 'Kitchen Cabinet Installation',
      provider: { '@id': 'https://www.cabinetsandremodelingdepot.com/#business' },
      description:
        'Shaker style kitchen cabinets with recessed panel doors, clean lines, and timeless versatility for Tampa Bay homeowners. Available in white, dove gray, brindle, and more.',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.cabinetsandremodelingdepot.com/shaker-style-cabinets/#breadcrumb',
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
          name: 'Shaker Style Cabinets',
          item: 'https://www.cabinetsandremodelingdepot.com/shaker-style-cabinets/',
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/shaker-style-cabinets/',
      url: 'https://www.cabinetsandremodelingdepot.com/shaker-style-cabinets/',
      name: 'Shaker Style Cabinets - Cabinets And Remodeling Depot',
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

export default function ShakerStyleCabinetsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ShakerStyleCabinetsPageClient />
    </>
  )
}
