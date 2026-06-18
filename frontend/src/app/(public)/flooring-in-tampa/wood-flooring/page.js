import dynamic from 'next/dynamic'
const WoodenFlooringPageClient = dynamic(
  () => import('@/components/sections/WoodenFlooringPageClient').then(m => ({ default: m.WoodenFlooringPageClient })),
  { loading: () => <div className="min-h-screen" /> }
)

export const metadata = {
  title: 'Wooden Flooring Tampa | Wood Floor Installation | Cabinets & Remodeling Depot',
  description:
    'Cabinets & Remodeling Depot offers affordable wood flooring installation in Tampa and Valrico, FL. Visit our showroom or call for a free in-home estimate.',
  openGraph: {
    title: 'Wooden Flooring Tampa | Wood Floor Installation | Cabinets & Remodeling Depot',
    description:
      'Affordable wood flooring installation in Tampa and Valrico, FL. Free in-home estimates available. Visit our showroom today.',
  },
}

export default function WoodenFlooringPage() {
  return <WoodenFlooringPageClient />
}
