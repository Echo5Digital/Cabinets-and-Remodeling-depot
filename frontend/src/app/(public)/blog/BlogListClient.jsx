'use client'

import { useState } from 'react'
import { useBlogs } from '@/hooks/useBlogs'
import { BlogGrid } from '@/components/sections/BlogGrid'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Returns an array of page numbers and '...' ellipsis strings for pagination.
 * Always shows first, last, current, and the pages immediately around current.
 */
function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, current])
  if (current > 1) pages.add(current - 1)
  if (current < total) pages.add(current + 1)
  return Array.from(pages)
    .sort((a, b) => a - b)
    .reduce((acc, p, i, arr) => {
      if (i > 0 && p - arr[i - 1] > 1) acc.push('...')
      acc.push(p)
      return acc
    }, [])
}

export function BlogListClient() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useBlogs({ page, limit: 9, isPublished: true })

  const blogs = data?.data || []
  const totalPages = data?.pagination?.pages || 1

  const goToPage = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <PageHeader title="Remodeling Tips & Ideas" subtitle="Expert advice, inspiration, and guides for your next home remodeling project." />

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
                <div className="flex items-center justify-center gap-1 mt-10 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => goToPage(page - 1)}
                  >
                    ← Previous
                  </Button>

                  {getPageNumbers(page, totalPages).map((p, i) =>
                    p === '...' ? (
                      <span
                        key={`ellipsis-${i}`}
                        className="px-2 text-muted-foreground select-none"
                      >
                        …
                      </span>
                    ) : (
                      <Button
                        key={p}
                        size="sm"
                        variant={p === page ? 'default' : 'outline'}
                        onClick={() => goToPage(p)}
                      >
                        {p}
                      </Button>
                    )
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => goToPage(page + 1)}
                  >
                    Next →
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
