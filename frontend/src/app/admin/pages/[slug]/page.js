'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  usePreviewPageContent,
  useUpdatePageContent,
  useUpdatePageStatus,
  useRenamePageSlug,
} from '@/hooks/usePageContent'
import { PageContentEditor } from '@/components/admin/PageContentEditor'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, AlertTriangle, Pencil, Check, X, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

function SlugEditor({ slug }) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(slug)
  const [error, setError] = useState('')
  const { mutate: renameSlug, isPending } = useRenamePageSlug(slug)

  const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

  const handleOpen = () => {
    setValue(slug)
    setError('')
    setEditing(true)
  }

  const handleCancel = () => {
    setEditing(false)
    setError('')
  }

  const handleConfirm = () => {
    const trimmed = value.trim()
    if (trimmed === slug) { setEditing(false); return }
    if (!trimmed) { setError('Slug cannot be empty.'); return }
    if (!SLUG_RE.test(trimmed)) {
      setError('Only lowercase letters, numbers, and hyphens allowed (e.g. my-page).')
      return
    }
    setError('')
    renameSlug(trimmed, {
      onSuccess: () => {
        toast.success(`Slug changed to "/${trimmed}". Redirecting…`)
        setEditing(false)
        router.replace(`/admin/pages/${trimmed}`)
      },
      onError: (err) => {
        const msg = err.response?.data?.error || 'Failed to rename slug. Please try again.'
        setError(msg)
        toast.error(msg)
      },
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleConfirm()
    if (e.key === 'Escape') handleCancel()
  }

  if (!editing) {
    return (
      <span className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-sm">/{slug === 'home' ? '' : slug}</span>
        <button
          type="button"
          onClick={handleOpen}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary border border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/70 transition-colors px-2 py-0.5 rounded-full"
          title="Change slug"
        >
          <Pencil className="w-3 h-3" />
          Change
        </button>
      </span>
    )
  }

  return (
    <span className="flex flex-col gap-1 w-full">
      <span className="flex items-center gap-1.5 flex-wrap">
        <span className="text-muted-foreground text-sm font-mono">/</span>
        <Input
          autoFocus
          value={value}
          onChange={(e) => { setValue(e.target.value.toLowerCase()); setError('') }}
          onKeyDown={handleKeyDown}
          disabled={isPending}
          className="h-7 text-sm font-mono w-48 sm:w-64 px-2"
          placeholder="new-slug"
        />
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isPending}
          className="inline-flex items-center justify-center w-7 h-7 rounded border border-green-300 bg-green-50 text-green-700 hover:bg-green-100 disabled:opacity-50 transition-colors"
          title="Confirm"
        >
          {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          disabled={isPending}
          className="inline-flex items-center justify-center w-7 h-7 rounded border border-border bg-background text-muted-foreground hover:bg-muted disabled:opacity-50 transition-colors"
          title="Cancel"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </span>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </span>
  )
}

export default function AdminPageEditorPage() {
  const { slug } = useParams()
  const { data: page, isLoading, error } = usePreviewPageContent(slug)
  const { mutate: updateContent, isPending } = useUpdatePageContent(slug)
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdatePageStatus(slug)

  const handleSave = (updatedContent, onSaveError) => {
    updateContent(updatedContent, {
      onSuccess: () => {
        const isLive = page?.status !== 'draft'
        toast.success(isLive ? 'Page content updated! Changes are now live.' : 'Draft saved.', {
          duration: 4000,
        })
      },
      onError: (err) => {
        onSaveError?.()
        const message = err.response?.data?.error || 'Failed to save. Please try again.'
        toast.error(message)
      },
    })
  }

  const handleStatusChange = (newStatus) => {
    updateStatus(newStatus, {
      onSuccess: () => {
        toast.success(newStatus === 'published' ? 'Page published! Now live.' : 'Page set to draft. Hidden from public.')
      },
      onError: () => {
        toast.error('Failed to update status. Please try again.')
      },
    })
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/pages">
            <ChevronLeft className="w-4 h-4 mr-1" />
            All Pages
          </Link>
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
          <Skeleton className="h-150 w-full" />
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 text-destructive bg-destructive/10 rounded-lg p-4">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <div>
            <p className="font-medium">Page not found</p>
            <p className="text-sm">The page &quot;{slug}&quot; does not exist in the database.</p>
          </div>
        </div>
      )}

      {page && !isLoading && (
        <>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold wrap-break-word">Editing: {page.title}</h1>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm flex-wrap">
              <span>URL:</span>
              <SlugEditor slug={slug} />
              {!slug.includes(' ') && (
                <span className="text-muted-foreground hidden sm:inline">
                  {page.status !== 'draft' ? '— Changes go live instantly after saving.' : '— Draft mode: not visible to public.'}
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-xs sm:hidden">
              {page.status !== 'draft' ? 'Changes go live instantly after saving.' : 'Draft: not visible to public.'}
            </p>
          </div>

          <PageContentEditor
            content={page.content}
            onSave={handleSave}
            isSaving={isPending || isUpdatingStatus}
            slug={slug}
            status={page.status ?? 'published'}
            onStatusChange={handleStatusChange}
          />
        </>
      )}
    </div>
  )
}
