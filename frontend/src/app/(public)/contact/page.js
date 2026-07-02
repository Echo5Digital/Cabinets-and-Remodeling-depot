import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { ContactPageClient } from './ContactPageClient'
import { JsonLd } from '@/components/common/JsonLd'

export async function generateMetadata() {
  try {
    const { data } = await api.get('/pages/contact')
    const seo = data?.data?.content?.seo || {}
    return {
      title: seo.metaTitle || 'Contact Us - Cabinets And Remodeling Depot',
      description: seo.metaDescription || 'For assistance, call +1 813-651-2333 or visit us at 106 S St Cloud Ave, Valrico, FL 33594. Open Mon–Fri: 10AM–6PM, Sat: 10AM–4PM. Your remodeling needs, our priority!',
    }
  } catch {
    return { title: 'Contact Us - Cabinets And Remodeling Depot' }
  }
}

const CONTACT_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.cabinetsandremodelingdepot.com/contact/#contactpage",
      "url": "https://www.cabinetsandremodelingdepot.com/contact/",
      "name": "Contact Cabinets & Remodeling Depot",
      "description": "Contact Cabinets & Remodeling Depot for kitchen remodeling, bathroom remodeling, cabinets, countertops, flooring, and complete home renovation services throughout Tampa Bay.",
      "mainEntity": { "@id": "https://www.cabinetsandremodelingdepot.com/#business" }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.cabinetsandremodelingdepot.com/#business",
      "name": "Cabinets & Remodeling Depot",
      "url": "https://www.cabinetsandremodelingdepot.com/",
      "telephone": "+18136512333",
      "email": "sales@cabinetsandremodelingdepot.com",
      "priceRange": "$$",
      "image": "https://www.cabinetsandremodelingdepot.com/wp-content/uploads/showroom.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "106 S St Cloud Ave",
        "addressLocality": "Valrico",
        "addressRegion": "FL",
        "postalCode": "33594",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+18136512333",
        "email": "sales@cabinetsandremodelingdepot.com",
        "contactType": "customer service",
        "areaServed": "US",
        "availableLanguage": "English"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
          "opens": "10:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "10:00",
          "closes": "16:00"
        }
      ],
      "areaServed": [
        { "@type": "City", "name": "Valrico" },
        { "@type": "City", "name": "Tampa" },
        { "@type": "City", "name": "Brandon" },
        { "@type": "City", "name": "Riverview" },
        { "@type": "City", "name": "FishHawk" },
        { "@type": "City", "name": "Lithia" },
        { "@type": "City", "name": "Plant City" }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.cabinetsandremodelingdepot.com/contact/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you offer free estimates?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. We provide complimentary consultations and project estimates for homeowners throughout the Tampa Bay area." }
        },
        {
          "@type": "Question",
          "name": "Do I need an appointment to visit the showroom?",
          "acceptedAnswer": { "@type": "Answer", "text": "Walk-ins are welcome, but scheduling an appointment allows us to dedicate time to your project and provide personalized assistance." }
        },
        {
          "@type": "Question",
          "name": "What areas do you serve?",
          "acceptedAnswer": { "@type": "Answer", "text": "We proudly serve Valrico, Tampa, Brandon, Riverview, FishHawk, Lithia, Plant City, and many surrounding communities." }
        },
        {
          "@type": "Question",
          "name": "Do you provide complete remodeling services?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. We offer kitchen remodeling, bathroom remodeling, cabinets, countertops, flooring, and complete home remodeling solutions." }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.cabinetsandremodelingdepot.com/contact/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.cabinetsandremodelingdepot.com/" },
        { "@type": "ListItem", "position": 2, "name": "Contact Us", "item": "https://www.cabinetsandremodelingdepot.com/contact/" }
      ]
    }
  ]
})

export default async function ContactPage() {
  const queryClient = getQueryClient()
  let schema = ''
  try {
    const { data } = await api.get('/pages/contact')
    schema = data?.data?.content?.schema || CONTACT_SCHEMA
    await queryClient.prefetchQuery({
      queryKey: ['page', 'contact'],
      queryFn: async () => {
        const { data: d } = await api.get('/pages/contact')
        return d.data
      },
    })
  } catch {
    schema = CONTACT_SCHEMA
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JsonLd schema={schema} />
      <ContactPageClient />
    </HydrationBoundary>
  )
}
