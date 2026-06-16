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
    // Build keywords string from primary + secondary
    const keywordParts = [
      blog.primaryKeyword,
      blog.secondaryKeywords,
    ].filter(Boolean).join(', ')

    return {
      ...(blog.metaTitle        && { title: blog.metaTitle }),
      ...(blog.metaDescription  && { description: blog.metaDescription }),
      ...(keywordParts          && { keywords: keywordParts }),
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

  const blog = queryClient.getQueryData(['blog', slug])

  return (
    <>
      {blog?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: blog.schema }}
        />
      )}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogPostClient slug={slug} />
      </HydrationBoundary>
    </>
  )
}
