import dynamic from 'next/dynamic'
const FlooringPageClient = dynamic(
  () => import('@/components/sections/FlooringPageClient').then(m => ({ default: m.FlooringPageClient })),
  { loading: () => <div className="min-h-screen" /> }
)

export const metadata = {
  title: 'Flooring In Tampa | Flooring Stores Tampa',
  description:
    'We specialize in transforming living spaces with expert Flooring In Tampa, featuring a wide selection from our Flooring Stores Tampa.',
  openGraph: {
    title: 'Flooring In Tampa | Flooring Stores Tampa',
    description:
      'We specialize in transforming living spaces with expert Flooring In Tampa, featuring a wide selection from our Flooring Stores Tampa.',
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
        'Cabinets & Remodeling Depot provides hardwood flooring, laminate flooring, tile flooring, waterproof flooring, and professional flooring installation services throughout Tampa Bay.',
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
      '@id': 'https://www.cabinetsandremodelingdepot.com/flooring-tampa/#service',
      name: 'Flooring Tampa',
      serviceType: 'Flooring Installation and Flooring Solutions',
      provider: {
        '@id': 'https://www.cabinetsandremodelingdepot.com/#business',
      },
      areaServed: [
        'Tampa',
        'Valrico',
        'Brandon',
        'Riverview',
        'Lithia',
        'Apollo Beach',
        'Plant City',
        'Wesley Chapel',
      ],
      description:
        'Professional flooring installation services including hardwood flooring, laminate flooring, tile flooring, waterproof flooring, and whole-home flooring solutions for homeowners throughout Tampa Bay.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Flooring Products & Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hardwood Flooring Installation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Laminate Flooring Installation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tile Flooring Installation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Waterproof Flooring Installation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Whole Home Flooring Solutions' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Flooring Design Consultation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Flooring Material Selection' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Professional Flooring Installation' } },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/flooring-tampa/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What flooring works best for Florida homes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tile, waterproof flooring, and laminate flooring are popular choices because of their durability and moisture resistance. Hardwood remains a popular option for living areas and bedrooms.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you offer hardwood flooring Tampa homeowners can view in person?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Our Valrico showroom features hardwood flooring options alongside laminate, tile, and waterproof flooring selections.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you provide flooring installation services?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. We provide professional flooring installation for kitchens, bathrooms, living areas, bedrooms, and full-home renovations.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I compare flooring materials before purchasing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Our showroom allows homeowners to compare flooring colors, textures, finishes, and material options directly before making final decisions.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does flooring installation take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Project timelines vary depending on the size of the space, flooring material selected, and project complexity. We provide clear timelines before work begins.',
          },
        },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Popular Flooring Styles',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Wide-Plank Hardwood Flooring' },
        { '@type': 'ListItem', position: 2, name: 'Modern Wood-Look Flooring' },
        { '@type': 'ListItem', position: 3, name: 'Waterproof Luxury Flooring' },
        { '@type': 'ListItem', position: 4, name: 'Contemporary Open Concept Interiors' },
        { '@type': 'ListItem', position: 5, name: 'Tile Flooring Designs' },
        { '@type': 'ListItem', position: 6, name: 'Whole-Home Flooring Renovations' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.cabinetsandremodelingdepot.com/flooring-tampa/#breadcrumb',
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
          name: 'Flooring',
          item: 'https://www.cabinetsandremodelingdepot.com/flooring/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Flooring Tampa',
          item: 'https://www.cabinetsandremodelingdepot.com/flooring-tampa/',
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/flooring-tampa/',
      url: 'https://www.cabinetsandremodelingdepot.com/flooring-tampa/',
      name: 'Flooring Tampa Hardwood, Tile & Laminate Flooring Solutions',
      description:
        'Professional flooring solutions including hardwood flooring, laminate flooring, tile flooring, waterproof flooring, and installation services throughout Tampa Bay.',
      isPartOf: {
        '@id': 'https://www.cabinetsandremodelingdepot.com/#website',
      },
      about: {
        '@id': 'https://www.cabinetsandremodelingdepot.com/flooring-tampa/#service',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.cabinetsandremodelingdepot.com/#website',
      url: 'https://www.cabinetsandremodelingdepot.com/',
      name: 'Cabinets & Remodeling Depot',
      publisher: {
        '@id': 'https://www.cabinetsandremodelingdepot.com/#business',
      },
    },
  ],
}

export default function FlooringPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <FlooringPageClient />
    </>
  )
}
