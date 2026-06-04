'use client'

import { useRouter } from 'next/navigation'
import { BlogForm } from '@/components/admin/BlogForm'
import { useCreateBlog } from '@/hooks/useBlogs'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function NewBlogPage() {
  const router = useRouter()
  const { mutate: createBlog, isPending } = useCreateBlog()

  const handleSubmit = (formData) => {
    createBlog(formData, {
      onSuccess: () => {
        toast.success('Blog post created!')
        router.push('/admin/blogs')
      },
      onError: (err) => toast.error(err.response?.data?.error || 'Failed to create post'),
    })
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/blogs"><ChevronLeft className="w-4 h-4 mr-1" />Blog Posts</Link>
        </Button>
        <h1 className="text-2xl font-bold">New Blog Post</h1>
      </div>
      <BlogForm onSubmit={handleSubmit} isPending={isPending} />
    </div>
  )
}
