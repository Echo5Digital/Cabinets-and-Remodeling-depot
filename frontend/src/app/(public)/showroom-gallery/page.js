import dynamic from 'next/dynamic'
const GalleryPageClient = dynamic(
  () => import('./GalleryPageClient').then(m => ({ default: m.GalleryPageClient })),
  { loading: () => <div className="min-h-screen" /> }
)

export const metadata = {
  title: 'Project Gallery | Cabinets & Remodeling Depot',
  description: 'Browse our gallery of kitchen and bathroom remodeling projects, custom cabinets, countertops, and flooring installations throughout Tampa Bay.',
}

export default function GalleryPage() {
  return <GalleryPageClient />
}
