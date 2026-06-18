import dynamic from 'next/dynamic'
const TilesPageClient = dynamic(
  () => import('@/components/sections/TilesPageClient').then(m => ({ default: m.TilesPageClient })),
  { loading: () => <div className="min-h-screen" /> }
)

export const metadata = {
  title: 'Tile Flooring Tampa Bay | Ceramic & Porcelain Tile Installation | Cabinets & Remodeling Depot',
  description:
    'Premium ceramic and porcelain tile flooring installation in Tampa Bay. Kitchen tiles, bathroom tiles, large-format tiles, and more. Expert installation from our Valrico showroom.',
  openGraph: {
    title: 'Tile Flooring Tampa Bay | Ceramic & Porcelain Tile Installation | Cabinets & Remodeling Depot',
    description:
      'Beautiful tile flooring for Tampa Bay homes and businesses. Ceramic, porcelain, and stone tile installed by local professionals. Free estimates available.',
  },
}

export default function TilesPage() {
  return <TilesPageClient />
}
