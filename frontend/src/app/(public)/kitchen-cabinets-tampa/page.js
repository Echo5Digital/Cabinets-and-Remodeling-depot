import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { CabinetsPageClient } from '@/components/sections/CabinetsPageClient'

export const metadata = {
  title: 'Kitchen Cabinets Tampa | Cabinets And Remodeling Depot',
  description:
    'Instantly enhance your space with in stock cabinets in Tampa. Cabinets And Remodeling Depot offers ready to install solutions for a swift and stylish upgrade.',
  openGraph: {
    title: 'Kitchen Cabinets Tampa | Cabinets And Remodeling Depot',
    description:
      'Instantly enhance your space with in stock cabinets in Tampa. Cabinets And Remodeling Depot offers ready to install solutions for a swift and stylish upgrade.',
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.cabinetsandremodelingdepot.com/#business",
      "name": "Cabinets & Remodeling Depot",
      "url": "https://www.cabinetsandremodelingdepot.com/",
      "telephone": "+18136512333",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "106 S St Cloud Ave",
        "addressLocality": "Valrico",
        "addressRegion": "FL",
        "postalCode": "33594",
        "addressCountry": "US"
      },
      "description": "Cabinets & Remodeling Depot provides kitchen cabinets, cabinet installation, and remodeling solutions for homeowners throughout Tampa Bay.",
      "areaServed": [
        {"@type":"City","name":"Tampa"},
        {"@type":"City","name":"Valrico"},
        {"@type":"City","name":"Brandon"},
        {"@type":"City","name":"Riverview"},
        {"@type":"City","name":"Lithia"},
        {"@type":"City","name":"Apollo Beach"},
        {"@type":"City","name":"Plant City"},
        {"@type":"City","name":"Wesley Chapel"}
      ]
    },
    {
      "@type": "Service",
      "@id": "https://www.cabinetsandremodelingdepot.com/kitchen-cabinets-tampa/#service",
      "name": "Kitchen Cabinets Tampa",
      "serviceType": "Kitchen Cabinet Sales and Installation",
      "provider": {
        "@id": "https://www.cabinetsandremodelingdepot.com/#business"
      },
      "areaServed": [
        "Tampa",
        "Valrico",
        "Brandon",
        "Riverview",
        "Lithia",
        "Apollo Beach",
        "Plant City",
        "Wesley Chapel"
      ],
      "description": "Affordable kitchen cabinets, ready-to-install cabinets, semi-custom cabinetry, cabinet replacement services, and professional cabinet installation for homeowners throughout Tampa Bay.",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Cabinet Products & Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kitchen Cabinets" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ready-to-Install Cabinets" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Stock Kitchen Cabinets" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Semi-Custom Cabinets" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cabinet Replacement" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kitchen Cabinet Installation" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cabinet Design Consultation" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kitchen Remodeling Support" } }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.cabinetsandremodelingdepot.com/kitchen-cabinets-tampa/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you offer kitchen cabinets Tampa homeowners can purchase quickly?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We provide a wide selection of kitchen cabinets available for faster remodeling timelines."
          }
        },
        {
          "@type": "Question",
          "name": "Are ready-to-install cabinets durable?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Many modern ready-to-install cabinets offer strong construction, reliable hardware, and long-lasting finishes."
          }
        },
        {
          "@type": "Question",
          "name": "Can I view cabinet styles in person before purchasing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Our Valrico showroom allows homeowners to compare cabinet finishes, storage features, and design combinations firsthand."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide quick cabinet installation Tampa services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We offer professional cabinet installation services throughout Tampa Bay and surrounding communities."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between stock and semi-custom cabinets?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Stock cabinets come in standard sizes and configurations, while semi-custom cabinets offer greater flexibility in finishes, storage features, and design options."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.cabinetsandremodelingdepot.com/kitchen-cabinets-tampa/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.cabinetsandremodelingdepot.com/" },
        { "@type": "ListItem", "position": 2, "name": "Cabinets", "item": "https://www.cabinetsandremodelingdepot.com/cabinets/" },
        { "@type": "ListItem", "position": 3, "name": "Kitchen Cabinets Tampa", "item": "https://www.cabinetsandremodelingdepot.com/kitchen-cabinets-tampa/" }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.cabinetsandremodelingdepot.com/kitchen-cabinets-tampa/",
      "url": "https://www.cabinetsandremodelingdepot.com/kitchen-cabinets-tampa/",
      "name": "Kitchen Cabinets Tampa | Affordable & Ready-to-Install Cabinet Solutions",
      "description": "Explore affordable kitchen cabinets, ready-to-install cabinets, stock kitchen cabinets, cabinet replacement options, and professional installation services throughout Tampa Bay.",
      "isPartOf": {
        "@id": "https://www.cabinetsandremodelingdepot.com/#website"
      },
      "about": {
        "@id": "https://www.cabinetsandremodelingdepot.com/kitchen-cabinets-tampa/#service"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.cabinetsandremodelingdepot.com/#website",
      "url": "https://www.cabinetsandremodelingdepot.com/",
      "name": "Cabinets & Remodeling Depot",
      "publisher": {
        "@id": "https://www.cabinetsandremodelingdepot.com/#business"
      }
    }
  ]
}

async function prefetchPage() {
  try {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({
      queryKey: ['page', 'kitchen-cabinets-tampa'],
      queryFn: async () => {
        const { data } = await api.get('/pages/kitchen-cabinets-tampa')
        return data.data
      },
    })
    return dehydrate(queryClient)
  } catch { return null }
}

export default async function CabinetsPage() {
  const dehydratedState = await prefetchPage()
  return (
    <HydrationBoundary state={dehydratedState}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CabinetsPageClient />
    </HydrationBoundary>
  )
}
