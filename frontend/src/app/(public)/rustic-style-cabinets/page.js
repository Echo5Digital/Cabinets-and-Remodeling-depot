import { RusticStyleCabinetsPageClient } from '@/components/sections/RusticStyleCabinetsPageClient'

export const metadata = {
  title: 'Rustic Style Cabinets - Cabinets And Remodeling Depot',
  description:
    'Explore rustic kitchen cabinets crafted from natural wood with warm, distressed finishes and rugged character. Visit our Valrico showroom for a free estimate today.',
  openGraph: {
    title: 'Rustic Style Cabinets - Cabinets And Remodeling Depot',
    description:
      'Explore rustic kitchen cabinets crafted from natural wood with warm, distressed finishes and rugged character. Visit our Valrico showroom for a free estimate today.',
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
      '@id': 'https://www.cabinetsandremodelingdepot.com/rustic-style-cabinets/#service',
      name: 'Rustic Style Kitchen Cabinets',
      serviceType: 'Kitchen Cabinet Installation',
      provider: { '@id': 'https://www.cabinetsandremodelingdepot.com/#business' },
      description:
        'Rustic kitchen cabinets made from natural wood with rough-hewn or distressed finishes, featuring knots, burls, and grain patterns for a warm, cozy kitchen atmosphere.',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/rustic-style-cabinets/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are some popular finishes for rustic style kitchen cabinets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Popular finishes for rustic style kitchen cabinets include distressed finishes, weathered finishes, and finishes that highlight the natural grain and texture of the wood. These finishes can give the cabinets a vintage, aged appearance.',
          },
        },
        {
          '@type': 'Question',
          name: 'What hardware is typically used for rustic style kitchen cabinets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Rustic style kitchen cabinets often feature hardware that is made from wrought iron, bronze, or other materials that have a rustic appearance. This can include knobs, handles, and hinges that have an antique or handmade look.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I incorporate rustic style kitchen cabinets into my kitchen design?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'There are many ways to incorporate rustic style kitchen cabinets into your kitchen design. You can pair them with natural stone countertops, copper or bronze fixtures, and other elements that have a rustic feel. You can also use a muted color palette with warm, earthy tones to complement the natural wood grain of the cabinets.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.cabinetsandremodelingdepot.com/rustic-style-cabinets/#breadcrumb',
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
          name: 'Rustic Style Cabinets',
          item: 'https://www.cabinetsandremodelingdepot.com/rustic-style-cabinets/',
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/rustic-style-cabinets/',
      url: 'https://www.cabinetsandremodelingdepot.com/rustic-style-cabinets/',
      name: 'Rustic Style Cabinets - Cabinets And Remodeling Depot',
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

export default function RusticStyleCabinetsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <RusticStyleCabinetsPageClient />
    </>
  )
}
