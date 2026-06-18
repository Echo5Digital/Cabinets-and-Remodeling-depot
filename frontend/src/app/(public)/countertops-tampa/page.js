import dynamic from 'next/dynamic'
const CountertopsPageClient = dynamic(
  () => import('@/components/sections/CountertopsPageClient').then(m => ({ default: m.CountertopsPageClient })),
  { loading: () => <div className="min-h-screen" /> }
)

export const metadata = {
  title: 'Countertops Tampa | Granite & Quartz Countertops | Cabinets & Remodeling Depot',
  description:
    'Looking for countertops in Tampa? Visit our Valrico showroom for granite countertops Tampa homeowners trust, custom fabrication, quartz countertops, and professional countertop installation services.',
  openGraph: {
    title: 'Countertops Tampa | Granite & Quartz Countertops | Cabinets & Remodeling Depot',
    description:
      'Premium granite and quartz countertops in Tampa Bay. In-house fabrication, expert installation, and a huge showroom selection. Free estimates available.',
  },
}

export default function CountertopsPage() {
  return <CountertopsPageClient />
}
