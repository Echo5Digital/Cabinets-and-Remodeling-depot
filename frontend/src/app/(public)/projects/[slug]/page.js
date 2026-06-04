import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { ProjectDetailClient } from './ProjectDetailClient'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = await params
  try {
    const { data } = await api.get(`/projects/${slug}`)
    const project = data?.data
    return {
      title: `${project.title} | Cabinets & Remodeling Depot`,
      description: project.description,
      openGraph: project.coverImage ? { images: [project.coverImage] } : undefined,
    }
  } catch {
    return { title: 'Project | Cabinets & Remodeling Depot' }
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const queryClient = getQueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: ['project', slug],
      queryFn: async () => {
        const { data } = await api.get(`/projects/${slug}`)
        return data.data
      },
    })
  } catch {
    notFound()
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectDetailClient slug={slug} />
    </HydrationBoundary>
  )
}
