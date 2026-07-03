import { ModernStyleCabinetsPageClient } from '@/components/sections/ModernStyleCabinetsPageClient'

export const metadata = {
  title: 'Modern Style Cabinets - Cabinets And Remodeling Depot',
  description:
    'Explore modern kitchen cabinets featuring sleek slab doors, clean lines, and minimalist design. Available in a wide range of materials and finishes. Visit our Valrico showroom for a free estimate today.',
  openGraph: {
    title: 'Modern Style Cabinets - Cabinets And Remodeling Depot',
    description:
      'Explore modern kitchen cabinets featuring sleek slab doors, clean lines, and minimalist design. Available in a wide range of materials and finishes. Visit our Valrico showroom for a free estimate today.',
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
      '@id': 'https://www.cabinetsandremodelingdepot.com/modern-style-cabinets/#service',
      name: 'Modern Style Kitchen Cabinets',
      serviceType: 'Kitchen Cabinet Installation',
      provider: { '@id': 'https://www.cabinetsandremodelingdepot.com/#business' },
      description:
        'Modern kitchen cabinets with sleek slab doors, clean lines, and minimalist design available in wood, metal, and glass in a wide range of colors and finishes for Tampa Bay homeowners.',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/modern-style-cabinets/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are some popular modern kitchen cabinet styles?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Some popular modern kitchen cabinet styles include flat-panel cabinets, slab cabinets, Shaker-style cabinets, glass-front cabinets, and open-shelving cabinets.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I incorporate modern kitchen cabinets into my kitchen design?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'There are many ways to incorporate modern kitchen cabinets into your kitchen design. Consider pairing flat-panel cabinets with sleek stainless steel appliances and minimalist hardware for a contemporary look, or using slab cabinets with bold, colorful countertops for a more dramatic effect. Mixing and matching different styles of modern cabinets can also create a unique, personalized look.',
          },
        },
        {
          '@type': 'Question',
          name: 'What hardware is popular for modern kitchen cabinets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Minimalist hardware, such as simple knobs or pulls in brushed nickel or black, is popular for modern kitchen cabinets. Some modern kitchens may also use no hardware at all, with cabinets featuring touch-latch or push-open mechanisms instead.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.cabinetsandremodelingdepot.com/modern-style-cabinets/#breadcrumb',
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
          name: 'Modern Style Cabinets',
          item: 'https://www.cabinetsandremodelingdepot.com/modern-style-cabinets/',
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/modern-style-cabinets/',
      url: 'https://www.cabinetsandremodelingdepot.com/modern-style-cabinets/',
      name: 'Modern Style Cabinets - Cabinets And Remodeling Depot',
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

export default function ModernStyleCabinetsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ModernStyleCabinetsPageClient />
    </>
  )
}
