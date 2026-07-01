/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Proxy /api/* → backend so browser requests are same-origin.
   * This makes the httpOnly refresh-token cookie first-party on the frontend
   * domain, which fixes the SameSite=Lax cross-domain issue in production.
   */
  async rewrites() {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ]
  },
  async redirects() {
    return [
      { source: '/gallery', destination: '/showroom-gallery', permanent: true },
      { source: '/countertops', destination: '/countertops-tampa', permanent: true },
      { source: '/cabinets',          destination: '/kitchen-cabinets-tampa', permanent: true },
      { source: '/in-stock-cabinets', destination: '/kitchen-cabinets-tampa', permanent: true },
      { source: '/kitchen-remodeling', destination: '/kitchen-remodeling-tampa', permanent: true },
      { source: '/flooring', destination: '/flooring-in-tampa', permanent: true },
      { source: '/flooring/:path*', destination: '/flooring-in-tampa/:path*', permanent: true },
      { source: '/bathroom-remodeling', destination: '/bathroom-remodeling-tampa', permanent: true },
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
