import { ContemporaryStyleCabinetsPageClient } from '@/components/sections/ContemporaryStyleCabinetsPageClient'

export const metadata = {
  title: 'Contemporary Style Cabinets - Cabinets And Remodeling Depot',
  description:
    'Explore contemporary style kitchen cabinets featuring clean lines, minimalist designs, and sleek finishes. Visit our Valrico showroom for a free estimate today.',
  openGraph: {
    title: 'Contemporary Style Cabinets - Cabinets And Remodeling Depot',
    description:
      'Explore contemporary style kitchen cabinets featuring clean lines, minimalist designs, and sleek finishes. Visit our Valrico showroom for a free estimate today.',
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
      '@id': 'https://www.cabinetsandremodelingdepot.com/contemporary-style-cabinets/#service',
      name: 'Contemporary Style Kitchen Cabinets',
      serviceType: 'Kitchen Cabinet Installation',
      provider: { '@id': 'https://www.cabinetsandremodelingdepot.com/#business' },
      description:
        'Contemporary kitchen cabinets with clean lines, minimalist designs, sleek finishes, and innovative storage solutions for Tampa Bay homeowners.',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/contemporary-style-cabinets/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are contemporary style kitchen cabinets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Contemporary kitchen cabinets feature clean lines, minimalist designs, and sleek finishes. They incorporate modern materials like metal, glass, or composites, bold colors, and innovative storage solutions like pull-out drawers and lazy susans.',
          },
        },
        {
          '@type': 'Question',
          name: 'What materials are used in contemporary cabinets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Unlike traditional wood cabinets, contemporary cabinets often feature materials like metal, glass, or composite materials, which provide a modern look and feel while being highly durable.',
          },
        },
        {
          '@type': 'Question',
          name: 'What colors are popular for contemporary kitchen cabinets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Contemporary cabinets often incorporate bold colors and high-gloss or matte finishes, as well as neutral tones like white, gray, and black that give them a modern, edgy vibe.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do contemporary cabinets have built-in storage features?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Contemporary cabinets prioritize functionality with pull-out drawers, lazy susans, and other space-saving solutions, as well as options for built-in appliances like microwaves and dishwashers.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I see contemporary cabinets in person before purchasing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. Visit our showroom in Valrico, FL to explore our full selection of contemporary style kitchen cabinets and speak with our knowledgeable staff.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.cabinetsandremodelingdepot.com/contemporary-style-cabinets/#breadcrumb',
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
          name: 'Contemporary Style Cabinets',
          item: 'https://www.cabinetsandremodelingdepot.com/contemporary-style-cabinets/',
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/contemporary-style-cabinets/',
      url: 'https://www.cabinetsandremodelingdepot.com/contemporary-style-cabinets/',
      name: 'Contemporary Style Cabinets - Cabinets And Remodeling Depot',
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

export default function ContemporaryStyleCabinetsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ContemporaryStyleCabinetsPageClient />
    </>
  )
}
