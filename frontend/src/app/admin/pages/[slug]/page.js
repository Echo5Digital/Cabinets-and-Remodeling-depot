'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { usePageContent, useUpdatePageContent } from '@/hooks/usePageContent'
import { PageContentEditor } from '@/components/admin/PageContentEditor'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ChevronLeft, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminPageEditorPage() {
  const { slug } = useParams()
  const { data: page, isLoading, error } = usePageContent(slug)
  const { mutate: updateContent, isPending } = useUpdatePageContent(slug)

  const handleSave = (updatedContent) => {
    updateContent(updatedContent, {
      onSuccess: () => {
        toast.success('Page content updated! Changes are now live.', {
          duration: 4000,
        })
      },
      onError: (err) => {
        const message = err.response?.data?.error || 'Failed to save. Please try again.'
        toast.error(message)
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
          <Skeleton className="h-[600px] w-full" />
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 text-destructive bg-destructive/10 rounded-lg p-4">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">Page not found</p>
            <p className="text-sm">The page &quot;{slug}&quot; does not exist in the database.</p>
          </div>
        </div>
      )}

      {page && !isLoading && (
        <>
          <div>
            <h1 className="text-3xl font-bold">Editing: {page.title}</h1>
            <p className="text-muted-foreground mt-1">
              URL: <span className="font-mono text-sm">/{slug === 'home' ? '' : slug}</span>
              {' — '}
              Changes go live instantly after saving.
            </p>
          </div>

          <PageContentEditor
            content={page.content}
            onSave={handleSave}
            isSaving={isPending}
            slug={slug}
          />
        </>
      )}
    </div>
  )
}
