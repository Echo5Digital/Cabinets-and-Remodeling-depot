import { TransitionalStyleCabinetsPageClient } from '@/components/sections/TransitionalStyleCabinetsPageClient'

export const metadata = {
  title: 'Transitional Style Cabinets - Cabinets And Remodeling Depot',
  description:
    'Explore transitional style kitchen cabinets that blend traditional warmth with contemporary clean lines. Visit our Valrico showroom for a free estimate today.',
  openGraph: {
    title: 'Transitional Style Cabinets - Cabinets And Remodeling Depot',
    description:
      'Explore transitional style kitchen cabinets that blend traditional warmth with contemporary clean lines. Visit our Valrico showroom for a free estimate today.',
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
      '@id': 'https://www.cabinetsandremodelingdepot.com/transitional-style-cabinets/#service',
      name: 'Transitional Style Kitchen Cabinets',
      serviceType: 'Kitchen Cabinet Installation',
      provider: { '@id': 'https://www.cabinetsandremodelingdepot.com/#business' },
      description:
        'Transitional kitchen cabinets blending traditional and contemporary styles with clean lines, natural materials, and versatile finishes for Tampa Bay homeowners.',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/transitional-style-cabinets/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do transitional style kitchen cabinets differ from traditional or contemporary styles?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Transitional style kitchen cabinets incorporate elements of both traditional and contemporary design, whereas traditional style cabinets tend to be more ornate and formal, and contemporary style cabinets are more minimalistic and often feature bold colors or textures.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can transitional style kitchen cabinets work with any type of kitchen design?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes, transitional style kitchen cabinets can work with any type of kitchen design, whether it's a modern or traditional space. The key is to strike a balance between the traditional and contemporary elements to create a cohesive look.",
          },
        },
        {
          '@type': 'Question',
          name: 'What are some benefits of transitional style kitchen cabinets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Transitional style kitchen cabinets offer the best of both worlds, combining classic and modern design elements to create a timeless look that is both functional and stylish. They can also work well with a variety of kitchen styles and are versatile enough to accommodate changing tastes and trends.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.cabinetsandremodelingdepot.com/transitional-style-cabinets/#breadcrumb',
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
          name: 'Transitional Style Cabinets',
          item: 'https://www.cabinetsandremodelingdepot.com/transitional-style-cabinets/',
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/transitional-style-cabinets/',
      url: 'https://www.cabinetsandremodelingdepot.com/transitional-style-cabinets/',
      name: 'Transitional Style Cabinets - Cabinets And Remodeling Depot',
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

export default function TransitionalStyleCabinetsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <TransitionalStyleCabinetsPageClient />
    </>
  )
}
