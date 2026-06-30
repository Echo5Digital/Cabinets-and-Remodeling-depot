'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useBlogs, useDeleteBlog } from '@/hooks/useBlogs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'

const PAGE_SIZE = 20

export default function AdminBlogsPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useBlogs({ limit: PAGE_SIZE, page })
  const { mutate: deleteBlog } = useDeleteBlog()

  const pagination = data?.pagination
  const totalPages = pagination?.pages ?? 1

  const handleDelete = (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    deleteBlog(id, {
      onSuccess: () => toast.success('Blog post deleted'),
      onError: () => toast.error('Failed to delete'),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">Manage your blog articles</p>
        </div>
        <Button asChild>
          <Link href="/admin/blogs/new">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden overflow-x-auto">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(!data?.data || data.data.length === 0) && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No blog posts yet. <Link href="/admin/blogs/new" className="text-primary underline">Create your first post</Link>
                  </TableCell>
                </TableRow>
              )}
              {data?.data?.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{blog.title}</p>
                      <p className="text-xs text-muted-foreground">{blog.readTime ? `${blog.readTime} min read` : ''}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={blog.isPublished ? 'default' : 'secondary'}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{formatDate(blog.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/admin/blogs/${blog.id}`}><Edit className="w-3.5 h-3.5" /></Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(blog.id, blog.title)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>
            Page {page} of {totalPages}
            {pagination?.total != null && (
              <span className="ml-1">({pagination.total} total)</span>
            )}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            {/* Page number pills — show up to 5 around current page */}
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...')
                  acc.push(p)
                  return acc
                }, [])
                .map((item, idx) =>
                  item === '...' ? (
                    <span key={`ellipsis-${idx}`} className="px-1">…</span>
                  ) : (
                    <Button
                      key={item}
                      variant={item === page ? 'default' : 'outline'}
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setPage(item)}
                    >
                      {item}
                    </Button>
                  )
                )}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
