'use client'

import { useState } from 'react'
import { useGallery } from '@/hooks/useGallery'
import { GalleryUploader } from '@/components/admin/GalleryUploader'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { GALLERY_CATEGORIES } from '@/lib/constants'

export default function AdminGalleryPage() {
  const [categoryFilter, setCategoryFilter] = useState('')

  const { data, isLoading, refetch } = useGallery({
    limit: 100,
    ...(categoryFilter && categoryFilter !== 'ALL' ? { category: categoryFilter } : {}),
  })

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gallery</h1>
          <p className="text-muted-foreground mt-1">Upload and manage gallery images by category</p>
        </div>
        <div className="w-40">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter category" />
            </SelectTrigger>
            <SelectContent>
              {GALLERY_CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      ) : (
        <GalleryUploader images={data?.data || []} onRefresh={refetch} />
      )}
    </div>
  )
}
