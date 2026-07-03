import { TraditionalStyleCabinetsPageClient } from '@/components/sections/TraditionalStyleCabinetsPageClient'

export const metadata = {
  title: 'Traditional Style Cabinets - Cabinets And Remodeling Depot',
  description:
    'Explore traditional kitchen cabinets featuring raised panel doors, decorative moldings, and classic wood finishes. Visit our Valrico showroom for a free estimate today.',
  openGraph: {
    title: 'Traditional Style Cabinets - Cabinets And Remodeling Depot',
    description:
      'Explore traditional kitchen cabinets featuring raised panel doors, decorative moldings, and classic wood finishes. Visit our Valrico showroom for a free estimate today.',
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
      '@id': 'https://www.cabinetsandremodelingdepot.com/traditional-style-cabinets/#service',
      name: 'Traditional Style Kitchen Cabinets',
      serviceType: 'Kitchen Cabinet Installation',
      provider: { '@id': 'https://www.cabinetsandremodelingdepot.com/#business' },
      description:
        'Traditional kitchen cabinets crafted from wood with raised panel doors, decorative moldings, ornate hardware, and timeless finishes for Tampa Bay homeowners.',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/traditional-style-cabinets/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Are traditional style kitchen cabinets more expensive than other styles?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Traditional style kitchen cabinets can be more expensive than other styles, especially if they are made from high-quality wood and have ornate details. However, there are also affordable options available, such as cabinets made from engineered wood with a traditional look.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I care for traditional style kitchen cabinets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To care for traditional style kitchen cabinets, wipe them down regularly with a damp cloth and mild soap. Avoid using abrasive cleaners or scrubbers, as they can damage the wood and finish. You can also use a furniture polish specifically designed for wood to help protect and maintain the finish.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are traditional style kitchen cabinets still popular?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, traditional style kitchen cabinets are still popular, especially in homes with a classic or traditional design aesthetic. However, there has been a trend towards more modern and minimalist designs in recent years.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can traditional style kitchen cabinets be customized?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, traditional style kitchen cabinets can be customized to fit your specific needs and preferences. You can choose different wood types, finishes, and hardware options to create a unique look for your kitchen. You can also work with a cabinet maker to create custom sizes and configurations that fit your space perfectly.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.cabinetsandremodelingdepot.com/traditional-style-cabinets/#breadcrumb',
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
          name: 'Traditional Style Cabinets',
          item: 'https://www.cabinetsandremodelingdepot.com/traditional-style-cabinets/',
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/traditional-style-cabinets/',
      url: 'https://www.cabinetsandremodelingdepot.com/traditional-style-cabinets/',
      name: 'Traditional Style Cabinets - Cabinets And Remodeling Depot',
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

export default function TraditionalStyleCabinetsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <TraditionalStyleCabinetsPageClient />
    </>
  )
}
