'use client'

import { useState } from 'react'
import { useBlogs } from '@/hooks/useBlogs'
import { BlogGrid } from '@/components/sections/BlogGrid'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function BlogListClient() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useBlogs({ page, limit: 9, isPublished: true })

  const blogs = data?.data || []
  const totalPages = data?.pagination?.pages || 1

  return (
    <>
      <PageHeader
        title="Remodeling Tips & Ideas"
        subtitle="Expert advice, design inspiration, and home improvement guides from our team."
      />

      <section className="section-padding">
        <div className="container-custom">

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-xl" />
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No articles yet. Check back soon!
            </div>
          ) : (
            <>
              <BlogGrid blogs={blogs} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                    Previous
                  </Button>
                  <span className="flex items-center px-4 text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
