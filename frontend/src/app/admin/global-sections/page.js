'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { useGlobalSectionsAdmin, useCreateGlobalSection, useUpdateGlobalSection, useDeleteGlobalSection } from '@/hooks/useGlobalSections'
import { Globe, Plus, Trash2, Pencil, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

const SECTION_TYPES = [
  'hero', 'text', 'features', 'faq', 'cta', 'stats', 'services', 'process',
  'testimonials', 'feature-strip', 'solutions', 'showroom', 'service-areas',
  'affordable', 'how-it-works', 'transformation', 'installation',
  'why-choose', 'start-project', 'pre-footer', 'partners',
]

function CreateDialog({ open, onOpenChange }) {
  const [key, setKey] = useState('')
  const [title, setTitle] = useState('')
  const [sectionType, setSectionType] = useState('cta')
  const { mutate: create, isPending } = useCreateGlobalSection()

  const handleCreate = () => {
    if (!key.trim() || !title.trim()) return
    create(
      { key: key.trim().toLowerCase().replace(/\s+/g, '-'), title: title.trim(), sectionType },
      {
        onSuccess: () => {
          toast.success(`Global section "${title}" created.`)
          onOpenChange(false)
          setKey('')
          setTitle('')
          setSectionType('cta')
        },
        onError: (err) => {
          toast.error(err.response?.data?.error || 'Failed to create global section.')
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle>New Global Section</DialogTitle>
          <DialogDescription>Create a new site-wide reusable section.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Global Key *</Label>
            <Input
              value={key}
              onChange={(e) => setKey(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
              placeholder="e.g. main-pre-footer"
              autoFocus
            />
            <p className="text-xs text-muted-foreground">Unique identifier — lowercase with hyphens.</p>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Display Title *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Main Pre-Footer CTA" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Section Type</Label>
            <Select value={sectionType} onValueChange={setSectionType}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SECTION_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="outline" onClick={() => onOpenChange(false)} type="button">Cancel</Button>
            <Button onClick={handleCreate} disabled={!key.trim() || !title.trim() || isPending} type="button">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              {isPending ? 'Creating…' : 'Create'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function GlobalSectionsPage() {
  const { data: sections, isLoading, error } = useGlobalSectionsAdmin()
  const { mutate: update } = useUpdateGlobalSection()
  const { mutate: remove } = useDeleteGlobalSection()
  const [createOpen, setCreateOpen] = useState(false)

  const handleToggleActive = (gs) => {
    update(
      { id: gs.id, isActive: !gs.isActive },
      {
        onSuccess: () => toast.success(`"${gs.title}" ${!gs.isActive ? 'activated' : 'deactivated'}.`),
        onError: () => toast.error('Failed to update status.'),
      }
    )
  }

  const handleDelete = (gs) => {
    if (!window.confirm(`Delete global section "${gs.title}"? This cannot be undone.`)) return
    remove(gs.id, {
      onSuccess: () => toast.success(`"${gs.title}" deleted.`),
      onError: () => toast.error('Failed to delete.'),
    })
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Global Sections</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Reusable site-wide sections. Link any page section to a global section using the{' '}
            <Globe className="w-3.5 h-3.5 inline-block" /> button in the page editor.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)} type="button" className="shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          New Global Section
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => <Skeleton key={n} className="h-20 w-full" />)}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-destructive bg-destructive/10 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 shrink-0" />
          Failed to load global sections.
        </div>
      )}

      {!isLoading && sections?.length === 0 && (
        <div className="border-2 border-dashed rounded-lg py-16 text-center text-muted-foreground">
          <Globe className="w-8 h-8 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">No global sections yet</p>
          <p className="text-xs mt-1">Create one to start sharing sections across pages.</p>
        </div>
      )}

      {!isLoading && sections && sections.length > 0 && (
        <div className="space-y-3">
          {sections.map((gs) => (
            <Card key={gs.id} className={`transition-opacity ${!gs.isActive ? 'opacity-60' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">{gs.title}</span>
                      <Badge variant="outline" className="text-xs font-mono">{gs.key}</Badge>
                      <Badge className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-100">{gs.sectionType}</Badge>
                      {!gs.isActive && (
                        <Badge className="text-xs bg-gray-100 text-gray-500 hover:bg-gray-100">Inactive</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Updated {new Date(gs.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground hidden sm:block">{gs.isActive ? 'Active' : 'Inactive'}</span>
                      <Switch
                        checked={gs.isActive}
                        onCheckedChange={() => handleToggleActive(gs)}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(gs)}
                      type="button"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CreateDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  )
}
