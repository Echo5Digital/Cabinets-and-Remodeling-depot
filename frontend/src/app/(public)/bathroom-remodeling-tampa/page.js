import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { BathroomRemodelingPageClient } from '@/components/sections/BathroomRemodelingPageClient'

export const metadata = {
  title: 'Bathroom Remodeling In Tampa | Bathroom Remodel Contractors Tampa',
  description:
    'Transform your bathroom with custom vanities, premium countertops, modern fixtures, and professional renovation solutions. Visit our Valrico showroom. Free estimates available.',
  openGraph: {
    title: 'Bathroom Remodeling In Tampa | Bathroom Remodel Contractors Tampa',
    description:
      'Transform your bathroom with custom vanities, premium countertops, modern fixtures, and professional renovation solutions. Serving Tampa Bay from our Valrico showroom. Free estimates.',
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
        'Cabinets & Remodeling Depot provides bathroom remodeling, bathroom vanities, countertops, fixtures, and renovation services for homeowners throughout Tampa Bay.',
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
      '@id': 'https://www.cabinetsandremodelingdepot.com/bathroom-remodeling-tampa/#service',
      name: 'Bathroom Remodeling Tampa',
      serviceType: 'Bathroom Remodeling and Renovation',
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
        'Professional bathroom remodeling services including custom bathroom vanities, quartz and granite countertops, faucet selections, shower upgrades, storage solutions, and complete bathroom renovations throughout Tampa Bay.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Bathroom Remodeling Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Bathroom Design & Planning' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Custom Bathroom Vanities' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Bathroom Countertops' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Quartz Bathroom Countertops' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Granite Bathroom Countertops' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Bathroom Faucet Installation' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Shower & Bath Upgrades' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Bathroom Storage Solutions' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Complete Bathroom Renovation' },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/bathroom-remodeling-tampa/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do you offer complete bathroom remodeling Tampa services?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We provide full bathroom remodeling services including vanities, countertops, fixtures, storage solutions, and renovation support.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I visit your showroom before starting my renovation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. Our Valrico showroom allows homeowners to compare bathroom vanities, faucets, countertops, and finishes in person.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you offer bathroom countertops Tampa homeowners can customize?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We provide quartz and granite bathroom countertop options along with custom vanity top solutions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you help with bathroom fixture and faucet selection?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We help homeowners coordinate bathroom faucets, fixtures, vanities, and countertop materials for a cohesive bathroom design.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does a bathroom renovation typically take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Project timelines vary depending on the scope of work. Smaller updates may take a few weeks, while complete bathroom renovations can require additional time. We provide clear timelines before work begins.',
          },
        },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Popular Bathroom Design Styles',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Spa-Inspired Bathrooms' },
        { '@type': 'ListItem', position: 2, name: 'Modern Bathroom Designs' },
        { '@type': 'ListItem', position: 3, name: 'Walk-In Showers' },
        { '@type': 'ListItem', position: 4, name: 'Double Vanity Layouts' },
        { '@type': 'ListItem', position: 5, name: 'Contemporary Bathroom Renovations' },
        { '@type': 'ListItem', position: 6, name: 'Guest Bathroom Updates' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.cabinetsandremodelingdepot.com/bathroom-remodeling-tampa/#breadcrumb',
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
          name: 'Bathroom Remodeling',
          item: 'https://www.cabinetsandremodelingdepot.com/bathroom-remodeling/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Bathroom Remodeling Tampa',
          item: 'https://www.cabinetsandremodelingdepot.com/bathroom-remodeling-tampa/',
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.cabinetsandremodelingdepot.com/bathroom-remodeling-tampa/',
      url: 'https://www.cabinetsandremodelingdepot.com/bathroom-remodeling-tampa/',
      name: 'Bathroom Remodeling Tampa – Custom Vanities & Renovation Solutions',
      description:
        'Professional bathroom remodeling services including custom vanities, bathroom countertops, faucets, shower upgrades, storage solutions, and complete bathroom renovations throughout Tampa Bay.',
      isPartOf: {
        '@id': 'https://www.cabinetsandremodelingdepot.com/#website',
      },
      about: {
        '@id': 'https://www.cabinetsandremodelingdepot.com/bathroom-remodeling-tampa/#service',
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
      queryKey: ['page', 'bathroom-remodeling-tampa'],
      queryFn: async () => {
        const { data } = await api.get('/pages/bathroom-remodeling-tampa')
        return data.data
      },
    })
    return dehydrate(queryClient)
  } catch { return null }
}

export default async function BathroomRemodelingPage() {
  const dehydratedState = await prefetchPage()
  return (
    <HydrationBoundary state={dehydratedState}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BathroomRemodelingPageClient />
    </HydrationBoundary>
  )
}
