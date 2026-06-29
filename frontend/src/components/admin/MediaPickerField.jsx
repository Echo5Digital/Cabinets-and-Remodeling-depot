'use client'

import { useState, useRef, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useUploadMedia } from '@/hooks/useMedia'
import { useGallery } from '@/hooks/useGallery'
import { Upload, Images, X, Check, ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

const CATEGORIES = [
  { value: '', label: 'All' },
  { value: 'KITCHEN', label: 'Kitchen' },
  { value: 'BATHROOM', label: 'Bathroom' },
  { value: 'CABINETS', label: 'Cabinets' },
  { value: 'COUNTERTOPS', label: 'Countertops' },
  { value: 'FLOORING', label: 'Flooring' },
  { value: 'GENERAL', label: 'General' },
]

/**
 * Drop-in replacement for the plain ImageField URL input.
 * Provides: image preview, "Upload" button (→ Cloudinary + Gallery DB),
 * "Library" button (pick from existing gallery), and a manual URL fallback input.
 *
 * @param {string}   label    - Field label shown above the preview
 * @param {string}   value    - Current image URL
 * @param {function} onChange - Called with the new URL string
 * @param {string}   hint     - Optional hint text shown below the URL input
 */
export function MediaPickerField({ label, value, onChange, hint }) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('upload')
  const [dragOver, setDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [objectUrl, setObjectUrl] = useState(null)
  const [category, setCategory] = useState('')
  const fileInputRef = useRef(null)

  const { mutate: upload, isPending: isUploading } = useUploadMedia()
  const { data: galleryData, isLoading: isGalleryLoading } = useGallery(
    category ? { category } : {}
  )
  const images = galleryData?.data || []

  // ── File selection ───────────────────────────────────────────────────────────

  const handleFileSelect = useCallback((file) => {
    if (!file) return
    if (objectUrl) URL.revokeObjectURL(objectUrl)
    setSelectedFile(file)
    setObjectUrl(URL.createObjectURL(file))
  }, [objectUrl])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFileSelect(file)
  }, [handleFileSelect])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback(() => setDragOver(false), [])

  // ── Actions ──────────────────────────────────────────────────────────────────

  const handleUpload = () => {
    if (!selectedFile) return
    upload(selectedFile, {
      onSuccess: (result) => {
        onChange(result.url)
        toast.success('Image uploaded successfully.')
        closeDialog()
      },
      onError: () => {
        toast.error('Upload failed. Please try again.')
      },
    })
  }

  const handlePickFromLibrary = (img) => {
    onChange(img.url)
    closeDialog()
  }

  const closeDialog = () => {
    setOpen(false)
    setSelectedFile(null)
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl)
      setObjectUrl(null)
    }
  }

  const openUpload = () => { setTab('upload'); setOpen(true) }
  const openLibrary = () => { setTab('library'); setOpen(true) }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-1.5">
      {label && <Label className="text-xs font-medium">{label}</Label>}

      {/* Preview / placeholder */}
      <div className="relative rounded-lg border overflow-hidden bg-muted/30">
        {value ? (
          <div className="relative h-28">
            <img src={value} alt="Selected" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-1.5 right-1.5 p-1 rounded-full bg-background/80 hover:bg-background border shadow-sm transition-colors"
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="h-20 flex items-center justify-center gap-2 text-muted-foreground">
            <ImageIcon className="w-5 h-5" />
            <span className="text-sm">No image selected</span>
          </div>
        )}
      </div>

      {/* Upload / Library buttons */}
      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" className="flex-1" onClick={openUpload}>
          <Upload className="w-3.5 h-3.5 mr-1.5" />
          Upload
        </Button>
        <Button type="button" variant="outline" size="sm" className="flex-1" onClick={openLibrary}>
          <Images className="w-3.5 h-3.5 mr-1.5" />
          Library
        </Button>
      </div>

      {/* Manual URL input */}
      <Input
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste image URL…"
        className="text-xs"
      />

      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}

      {/* ── Dialog ────────────────────────────────────────────────────────────── */}
      <Dialog open={open} onOpenChange={(v) => { if (!v) closeDialog(); else setOpen(true) }}>
        <DialogContent className="w-full max-w-2xl mx-4 sm:mx-auto flex flex-col max-h-[90vh]">
          <DialogHeader className="pb-3 shrink-0">
            <DialogTitle>Select Image</DialogTitle>
          </DialogHeader>

          {/* Tab switcher */}
          <div className="flex gap-1 p-1 bg-muted rounded-lg mb-3 shrink-0">
            <button
              type="button"
              className={`flex-1 text-sm py-1.5 px-3 rounded-md transition-colors ${
                tab === 'upload'
                  ? 'bg-background shadow-sm font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setTab('upload')}
            >
              Upload New
            </button>
            <button
              type="button"
              className={`flex-1 text-sm py-1.5 px-3 rounded-md transition-colors ${
                tab === 'library'
                  ? 'bg-background shadow-sm font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setTab('library')}
            >
              Library
            </button>
          </div>

          {/* ── Upload tab ────────────────────────────────────────────────────── */}
          {tab === 'upload' && (
            <div className="space-y-4">
              {/* Drop zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors select-none ${
                  dragOver
                    ? 'border-primary bg-primary/5'
                    : 'border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/30'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files?.[0])}
                />
                {selectedFile && objectUrl ? (
                  <div className="space-y-2">
                    <img
                      src={objectUrl}
                      alt="Preview"
                      className="max-h-40 mx-auto rounded object-contain"
                    />
                    <p className="text-sm text-muted-foreground">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Click or drag to replace
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                    <p className="text-sm font-medium">Click to select or drag &amp; drop</p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG, WebP, GIF · max 10 MB
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={closeDialog}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                >
                  {isUploading ? 'Uploading…' : 'Upload'}
                </Button>
              </div>
            </div>
          )}

          {/* ── Library tab ───────────────────────────────────────────────────── */}
          {tab === 'library' && (
            <div className="flex flex-col flex-1 min-h-0 gap-3">
              {/* Category filter pills */}
              <div className="flex flex-wrap gap-1.5 shrink-0">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCategory(c.value)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                      category === c.value
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Image grid */}
              <div className="flex-1 overflow-y-auto">
                {isGalleryLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <Skeleton key={i} className="aspect-square rounded-lg" />
                    ))}
                  </div>
                ) : images.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-12">
                    No images found.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {images.map((img) => (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => handlePickFromLibrary(img)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors hover:border-primary/70 ${
                          value === img.url ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.alt || ''}
                          className="w-full h-full object-cover"
                        />
                        {value === img.url && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <Check className="w-5 h-5 text-primary drop-shadow" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
