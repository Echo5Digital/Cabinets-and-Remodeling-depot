import dynamic from 'next/dynamic'
const AboutClient = dynamic(
  () => import('./AboutClient').then(m => ({ default: m.AboutClient })),
  { loading: () => <div className="min-h-screen" /> }
)

export const metadata = {
  title: 'About Us | Cabinets & Remodeling Depot',
  description:
    "Learn about Cabinets & Remodeling Depot — Tampa Bay's trusted remodeling contractor for kitchen cabinets, bathroom vanities, countertops, and flooring.",
  openGraph: {
    title: 'About Us | Cabinets & Remodeling Depot',
    description:
      "Learn about Cabinets & Remodeling Depot — Tampa Bay's trusted remodeling contractor for kitchen cabinets, bathroom vanities, countertops, and flooring.",
  },
}

export default function AboutPage() {
  return <AboutClient />
}
