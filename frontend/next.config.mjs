/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/gallery', destination: '/showroom-gallery', permanent: true },
      { source: '/countertops', destination: '/countertops-tampa', permanent: true },
      { source: '/cabinets', destination: '/in-stock-cabinets', permanent: true },
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
