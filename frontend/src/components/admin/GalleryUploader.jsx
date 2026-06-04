'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useUploadGalleryImages, useDeleteGalleryImage, useUpdateGalleryImage } from '@/hooks/useGallery'
import { toast } from 'sonner'
import { Upload, Trash2, X, Loader2 } from 'lucide-react'
import { GALLERY_CATEGORIES } from '@/lib/constants'

export function GalleryUploader({ images = [], onRefresh }) {
  const fileInputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [category, setCategory] = useState('GENERAL')
  const [uploadQueue, setUploadQueue] = useState([])

  const { mutate: uploadImages, isPending } = useUploadGalleryImages()
  const { mutate: deleteImage } = useDeleteGalleryImage()
  const { mutate: updateImage } = useUpdateGalleryImage()

  const handleFiles = (files) => {
    if (!files.length) return

    const formData = new FormData()
    Array.from(files).forEach((file) => formData.append('images', file))
    formData.append('category', category)

    uploadImages(formData, {
      onSuccess: () => {
        toast.success(`${files.length} image(s) uploaded successfully`)
        setUploadQueue([])
        if (onRefresh) onRefresh()
      },
      onError: (err) => {
        toast.error(err.response?.data?.error || 'Upload failed')
      },
    })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleDelete = (id) => {
    if (!confirm('Delete this image?')) return
    deleteImage(id, {
      onSuccess: () => toast.success('Image deleted'),
      onError: () => toast.error('Failed to delete image'),
    })
  }

  const handleCategoryChange = (id, newCategory) => {
    updateImage({ id, category: newCategory }, {
      onSuccess: () => toast.success('Category updated'),
    })
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-48">
            <Label className="mb-2 block">Upload Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GALLERY_CATEGORIES.filter(c => c.value !== 'ALL').map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label className="mb-2 block invisible">Upload</Label>
            <Button onClick={() => fileInputRef.current?.click()} disabled={isPending}>
              <Upload className="w-4 h-4 mr-2" />
              {isPending ? 'Uploading...' : 'Select Images'}
            </Button>
          </div>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {isPending ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Uploading to Cloudinary...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm font-medium">Drag & drop images here</p>
              <p className="text-xs text-muted-foreground">or click &quot;Select Images&quot; above</p>
              <p className="text-xs text-muted-foreground">JPG, PNG, WebP — max 10MB each</p>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Gallery Grid */}
      {images.length > 0 && (
        <div>
          <h3 className="font-medium mb-3">Uploaded Images ({images.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {images.map((image) => (
              <div key={image.id} className="group relative aspect-square rounded-lg overflow-hidden border bg-muted">
                <img
                  src={image.url}
                  alt={image.alt || 'Gallery image'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                  <Select
                    value={image.category}
                    onValueChange={(v) => handleCategoryChange(image.id, v)}
                  >
                    <SelectTrigger className="h-6 text-xs bg-white/90">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {GALLERY_CATEGORIES.filter(c => c.value !== 'ALL').map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-7 w-7"
                    onClick={() => handleDelete(image.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                  <span className="text-xs text-white">{image.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
