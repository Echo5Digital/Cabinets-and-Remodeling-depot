import { IndustrialStyleCabinetsPageClient } from '@/components/sections/IndustrialStyleCabinetsPageClient'

export const metadata = {
  title: 'Industrial Style Cabinets - Cabinets And Remodeling Depot',
  description:
    'Explore industrial style kitchen cabinets featuring raw materials, exposed hardware, and bold designs. Visit our Valrico showroom for a free estimate today.',
  openGraph: {
    title: 'Industrial Style Cabinets - Cabinets And Remodeling Depot',
    description:
      'Explore industrial style kitchen cabinets featuring raw materials, exposed hardware, and bold designs. Visit our Valrico showroom for a free estimate today.',
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
      '@id': 'https://www.cabinetsandremodelingdepot.com/industrial-style-cabinets/#service',
      name: 'Industrial Style Kitchen Cabinets',
      serviceType: 'Kitchen Cabinet Installation',
      provider: { '@id': 'https://www.cabinetsandremodelingdepot.com/#business' },
      description:
        'Industrial style kitchen cabinets featuring raw materials like metal and wood, exposed hardware, minimalist design, and bold finishes for Tampa Bay homeowners.',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/industrial-style-cabinets/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are some popular finishes for industrial style cabinets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Some popular finishes for industrial style cabinets include raw or brushed metal finishes, distressed wood finishes, matte black or dark finishes, and concrete-effect finishes.',
          },
        },
        {
          '@type': 'Question',
          name: 'What hardware is typically used for industrial style cabinets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Industrial style cabinets typically use hardware made of metal, such as iron, steel, or brass. Common hardware choices include exposed bolts or screws, pipe-style handles or pulls, and minimalist bar pulls or knobs.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I incorporate industrial style cabinets into my kitchen design?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To incorporate industrial style cabinets into your kitchen design, consider pairing them with other industrial elements, such as exposed brick or concrete walls, metal light fixtures, or a stainless steel countertop. You can also mix and match different materials and finishes to create a unique, personalized look.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.cabinetsandremodelingdepot.com/industrial-style-cabinets/#breadcrumb',
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
          name: 'Industrial Style Cabinets',
          item: 'https://www.cabinetsandremodelingdepot.com/industrial-style-cabinets/',
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/industrial-style-cabinets/',
      url: 'https://www.cabinetsandremodelingdepot.com/industrial-style-cabinets/',
      name: 'Industrial Style Cabinets - Cabinets And Remodeling Depot',
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

export default function IndustrialStyleCabinetsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <IndustrialStyleCabinetsPageClient />
    </>
  )
}
