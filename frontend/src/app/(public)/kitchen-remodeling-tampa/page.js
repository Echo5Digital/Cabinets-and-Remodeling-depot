import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { KitchenRemodelingPageClient } from '@/components/sections/KitchenRemodelingPageClient'

export const metadata = {
  title: 'Kitchen Remodeling in Tampa Bay | Cabinets & Remodeling Depot',
  description:
    'Planning a kitchen remodel Tampa homeowners trust? Visit our Valrico showroom for full renovations, cabinets & countertops. Book free consultation.',
  openGraph: {
    title: 'Kitchen Remodeling in Tampa Bay | Cabinets & Remodeling Depot',
    description:
      'Custom kitchen remodeling in Tampa Bay — cabinetry, countertops, flooring, and professional installation. Visit our Valrico showroom for a free estimate.',
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
        'Cabinets & Remodeling Depot provides kitchen remodeling, cabinetry, countertops, and renovation services for homeowners throughout Tampa Bay.',
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
      '@id': 'https://www.cabinetsandremodelingdepot.com/kitchen-remodeling-tampa/#service',
      name: 'Kitchen Remodeling in Tampa Bay',
      serviceType: 'Kitchen Remodeling and Renovation',
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
        'Professional kitchen remodeling services including kitchen design, cabinetry, countertops, flooring, material selection, renovation planning, and installation for homeowners throughout Tampa Bay.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Kitchen Remodeling Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Kitchen Design & Planning' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Kitchen Cabinet Installation' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Countertop Installation' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Kitchen Flooring Installation' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Complete Kitchen Renovation' },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/kitchen-remodeling-tampa/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much does a kitchen remodel cost in Tampa?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The cost of a kitchen remodel depends on factors such as project size, material selections, cabinetry, countertops, and installation requirements. We provide free estimates and personalized recommendations based on your goals and budget.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does a kitchen renovation take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Project timelines vary depending on the scope of work. Smaller updates may take a few weeks, while complete kitchen renovations can require additional time. We provide clear timelines before work begins.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you help with kitchen design?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Our team assists homeowners with kitchen layouts, cabinet selections, material choices, and design planning to create a space that balances functionality and style.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why should I visit your Valrico showroom?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our showroom allows homeowners to compare cabinet styles, countertop materials, colors, and finishes in person while receiving expert guidance from our team.',
          },
        },
        {
          '@type': 'Question',
          name: 'What areas do you serve?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We serve homeowners throughout Tampa Bay, including Tampa, Valrico, Brandon, Riverview, Lithia, Apollo Beach, Wesley Chapel, Plant City, and surrounding communities.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.cabinetsandremodelingdepot.com/kitchen-remodeling-tampa/#breadcrumb',
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
          name: 'Kitchen Remodeling',
          item: 'https://www.cabinetsandremodelingdepot.com/kitchen-remodeling/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Kitchen Remodeling Tampa Bay',
          item: 'https://www.cabinetsandremodelingdepot.com/kitchen-remodeling-tampa/',
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/kitchen-remodeling-tampa/',
      url: 'https://www.cabinetsandremodelingdepot.com/kitchen-remodeling-tampa/',
      name: 'Kitchen Remodeling in Tampa Bay',
      description:
        'Professional kitchen remodeling services including custom cabinets, countertops, flooring, design planning, and complete kitchen renovations throughout Tampa Bay.',
      isPartOf: {
        '@id': 'https://www.cabinetsandremodelingdepot.com/#website',
      },
      about: {
        '@id': 'https://www.cabinetsandremodelingdepot.com/kitchen-remodeling-tampa/#service',
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

async function prefetchPage() {
  try {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({
      queryKey: ['page', 'kitchen-remodeling-tampa'],
      queryFn: async () => {
        const { data } = await api.get('/pages/kitchen-remodeling-tampa')
        return data.data
      },
    })
    return dehydrate(queryClient)
  } catch { return null }
}

export default async function KitchenRemodelingPage() {
  const dehydratedState = await prefetchPage()
  return (
    <HydrationBoundary state={dehydratedState}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <KitchenRemodelingPageClient />
    </HydrationBoundary>
  )
}
