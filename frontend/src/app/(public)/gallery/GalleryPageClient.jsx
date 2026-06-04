'use client'

import { useGallery } from '@/hooks/useGallery'
import { GalleryGrid } from '@/components/sections/GalleryGrid'
import { PageHeader } from '@/components/common/PageHeader'
import { Skeleton } from '@/components/ui/skeleton'

export function GalleryPageClient() {
  const { data, isLoading } = useGallery({ limit: 100 })
  const images = data?.data || []

  return (
    <>
      <PageHeader
        title="Our Project Gallery"
        subtitle="Browse inspiring transformations from our portfolio of completed remodeling projects throughout Tampa Bay."
      />

      <section className="section-padding">
        <div className="container-custom">
          {isLoading ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg break-inside-avoid" />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              Gallery coming soon. Check back soon!
            </div>
          ) : (
            <GalleryGrid images={images} showFilter />
          )}
        </div>
      </section>
    </>
  )
}
