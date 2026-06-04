import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { BlogPostClient } from './BlogPostClient'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = await params
  try {
    const { data } = await api.get(`/blogs/${slug}`)
    const blog = data?.data
    return {
      title: blog.metaTitle || `${blog.title} | Cabinets & Remodeling Depot`,
      description: blog.metaDescription || blog.excerpt,
      openGraph: blog.coverImage ? { images: [blog.coverImage] } : undefined,
    }
  } catch {
    return { title: 'Blog Post | Cabinets & Remodeling Depot' }
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const queryClient = getQueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: ['blog', slug],
      queryFn: async () => {
        const { data } = await api.get(`/blogs/${slug}`)
        return data.data
      },
    })
  } catch {
    notFound()
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogPostClient slug={slug} />
    </HydrationBoundary>
  )
}
