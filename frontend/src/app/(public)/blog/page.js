import dynamic from 'next/dynamic'
const BlogListClient = dynamic(
  () => import('./BlogListClient').then(m => ({ default: m.BlogListClient })),
  { loading: () => <div className="min-h-screen" /> }
)

export const metadata = {
  title: 'Our Blogs - Cabinet and Remodeling Depot',
  description: 'Explore our blog library featuring cabinet makeovers, remodeling advice, and home improvement ideas from Cabinet and Remodeling Depot experts.',
}

export default function BlogPage() {
  return <BlogListClient />
}
