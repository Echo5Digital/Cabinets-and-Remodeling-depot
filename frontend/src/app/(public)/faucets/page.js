import { FaucetsPageClient } from '@/components/sections/FaucetsPageClient'

export const metadata = {
  title: 'Faucets in Tampa | Kitchen & Bathroom Faucets',
  description:
    'Explore a wide selection of stylish Kitchen & Bathroom Faucets. Visit Cabinets and Remodeling Depot for top-quality Faucets in Tampa that enhance your home.',
  openGraph: {
    title: 'Faucets in Tampa | Kitchen & Bathroom Faucets',
    description:
      'Explore a wide selection of stylish Kitchen & Bathroom Faucets. Visit Cabinets and Remodeling Depot for top-quality Faucets in Tampa that enhance your home.',
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
      areaServed: [
        { '@type': 'City', name: 'Tampa' },
        { '@type': 'City', name: 'Valrico' },
        { '@type': 'City', name: 'Brandon' },
        { '@type': 'City', name: 'Riverview' },
        { '@type': 'City', name: 'Wesley Chapel' },
        { '@type': 'City', name: 'Apollo Beach' },
      ],
    },
    {
      '@type': 'Service',
      '@id': 'https://www.cabinetsandremodelingdepot.com/faucets/#service',
      name: 'Kitchen & Bathroom Faucets Tampa',
      serviceType: 'Faucet Supply and Installation',
      provider: { '@id': 'https://www.cabinetsandremodelingdepot.com/#business' },
      description:
        'Wide selection of kitchen faucets, bathroom faucets, shower faucets, kitchen sinks, bathroom sinks, and vanity faucets in Tampa, FL. Visit our Valrico showroom for affordable faucet options.',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.cabinetsandremodelingdepot.com/faucets/#breadcrumb',
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
          name: 'Kitchen Faucets in Tampa, FL',
          item: 'https://www.cabinetsandremodelingdepot.com/faucets/',
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/faucets/',
      url: 'https://www.cabinetsandremodelingdepot.com/faucets/',
      name: 'Faucets in Tampa | Kitchen & Bathroom Faucets',
      description:
        'Explore a wide selection of stylish Kitchen & Bathroom Faucets. Visit Cabinets and Remodeling Depot for top-quality Faucets in Tampa that enhance your home.',
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

export default function FaucetsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <FaucetsPageClient />
    </>
  )
}
