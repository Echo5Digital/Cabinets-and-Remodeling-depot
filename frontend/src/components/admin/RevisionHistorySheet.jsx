'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { usePageRevisions, useRestoreRevision } from '@/hooks/usePageRevisions'
import { History, RotateCcw, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function RevisionHistorySheet({ slug, open, onOpenChange }) {
  const { data: revisions, isLoading, error } = usePageRevisions(open ? slug : null)
  const { mutate: restore, isPending: isRestoring } = useRestoreRevision(slug)
  const [confirmId, setConfirmId] = useState(null)

  const handleRestore = (revisionId) => {
    if (confirmId !== revisionId) {
      setConfirmId(revisionId)
      return
    }
    restore(revisionId, {
      onSuccess: () => {
        toast.success('Revision restored. The editor has been refreshed.')
        onOpenChange(false)
        setConfirmId(null)
      },
      onError: () => {
        toast.error('Failed to restore revision. Please try again.')
        setConfirmId(null)
      },
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <History className="w-4 h-4" />
            Revision History
          </SheetTitle>
          <SheetDescription>
            Up to 20 saved revisions. Restoring a revision saves the current state first.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-2">
          {isLoading && (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="border rounded-lg p-3 space-y-1.5">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-lg">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              Failed to load revisions.
            </div>
          )}

          {!isLoading && !error && revisions?.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-12">
              <History className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p>No revisions yet.</p>
              <p className="text-xs mt-1">Revisions are saved automatically each time you save the page.</p>
            </div>
          )}

          {!isLoading && revisions?.map((rev, idx) => (
            <div
              key={rev.id}
              className="border rounded-lg p-3 bg-card hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {idx === 0 ? 'Latest save' : `Save #${revisions.length - idx}`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDate(rev.createdAt)}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {confirmId === rev.id ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-amber-600 font-medium hidden sm:block">Confirm?</span>
                      <Button
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => handleRestore(rev.id)}
                        disabled={isRestoring}
                      >
                        {isRestoring ? '…' : 'Yes'}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs"
                        onClick={() => setConfirmId(null)}
                        disabled={isRestoring}
                      >
                        No
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2 text-xs"
                      onClick={() => handleRestore(rev.id)}
                    >
                      <RotateCcw className="w-3 h-3 sm:mr-1" />
                      <span className="hidden sm:inline">Restore</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
