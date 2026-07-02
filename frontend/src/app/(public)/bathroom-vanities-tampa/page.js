import { BathroomVanitiesPageClient } from '@/components/sections/BathroomVanitiesPageClient'

export const metadata = {
  title: 'Bathroom Vanities In Tampa | Bathroom Renovation Tampa',
  description:
    'Upgrade your space with 100% premium-quality Bathroom Vanities In Tampa. From stylish designs to expert Bathroom Renovation Tampa. We deliver durable and elegant solutions for every budget.',
  openGraph: {
    title: 'Bathroom Vanities In Tampa | Bathroom Renovation Tampa',
    description:
      'Upgrade your space with 100% premium-quality Bathroom Vanities In Tampa. From stylish designs to expert Bathroom Renovation Tampa. We deliver durable and elegant solutions for every budget.',
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
      description:
        'Cabinets & Remodeling Depot provides premium bathroom vanities, bathroom renovation, custom cabinetry, countertops, and remodeling services throughout Tampa Bay.',
      areaServed: [
        { '@type': 'City', name: 'Tampa' },
        { '@type': 'City', name: 'Valrico' },
        { '@type': 'City', name: 'Brandon' },
        { '@type': 'City', name: 'Riverview' },
        { '@type': 'City', name: 'Lithia' },
        { '@type': 'City', name: 'Apollo Beach' },
        { '@type': 'City', name: 'Plant City' },
        { '@type': 'City', name: 'Wesley Chapel' },
      ],
    },
    {
      '@type': 'Service',
      '@id': 'https://www.cabinetsandremodelingdepot.com/bathroom-vanities-tampa/#service',
      name: 'Bathroom Vanities Tampa',
      serviceType: 'Bathroom Vanities and Bathroom Renovation',
      provider: {
        '@id': 'https://www.cabinetsandremodelingdepot.com/#business',
      },
      areaServed: ['Tampa', 'Valrico', 'Brandon', 'Riverview', 'Lithia', 'Apollo Beach', 'Plant City', 'Wesley Chapel'],
      description:
        'Premium bathroom vanities and bathroom renovation services for Tampa homeowners. Single sink, double sink, floating, freestanding, and custom cabinet vanity options available at our Valrico showroom.',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/bathroom-vanities-tampa/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What types of bathroom vanities do you offer in Tampa?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We offer single sink, double sink, floating, freestanding, and custom cabinet-style bathroom vanities. Visit our Valrico showroom to explore options in person.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you provide bathroom renovation services in Tampa?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We provide complete bathroom renovation Tampa services including vanity installation, countertop replacement, and full bathroom remodeling.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you offer free estimates for bathroom vanity installation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We offer free estimates for bathroom vanity installation and bathroom renovation projects throughout Tampa Bay.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.cabinetsandremodelingdepot.com/bathroom-vanities-tampa/#breadcrumb',
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
          name: 'Bathroom Vanities In Tampa',
          item: 'https://www.cabinetsandremodelingdepot.com/bathroom-vanities-tampa/',
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/bathroom-vanities-tampa/',
      url: 'https://www.cabinetsandremodelingdepot.com/bathroom-vanities-tampa/',
      name: 'Bathroom Vanities In Tampa | Bathroom Renovation Tampa',
      description:
        'Premium bathroom vanities and bathroom renovation services for Tampa homeowners. Visit our Valrico showroom for a wide selection of styles and free estimates.',
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

export default function BathroomVanitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BathroomVanitiesPageClient />
    </>
  )
}
