'use client'

import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { BlogForm } from '@/components/admin/BlogForm'
import { useUpdateBlog } from '@/hooks/useBlogs'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronLeft } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function EditBlogPage() {
  const { id } = useParams()
  const router = useRouter()
  const { mutate: updateBlog, isPending } = useUpdateBlog()

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog-by-id', id],
    queryFn: async () => {
      const { data } = await api.get(`/blogs/${id}`)
      return data.data
    },
    enabled: !!id,
  })

  const handleSubmit = (formData) => {
    updateBlog({ id, formData }, {
      onSuccess: () => {
        toast.success('Blog post updated!')
        router.push('/admin/blogs')
      },
      onError: (err) => toast.error(err.response?.data?.error || 'Failed to update'),
    })
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/blogs"><ChevronLeft className="w-4 h-4 mr-1" />Blog Posts</Link>
        </Button>
        <h1 className="text-2xl font-bold">Edit Blog Post</h1>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : blog ? (
        <BlogForm initialData={blog} onSubmit={handleSubmit} isPending={isPending} />
      ) : (
        <p className="text-muted-foreground">Blog post not found.</p>
      )}
    </div>
  )
}
