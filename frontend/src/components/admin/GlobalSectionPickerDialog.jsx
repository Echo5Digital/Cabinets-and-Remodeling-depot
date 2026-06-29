'use client'

import { useState, useMemo } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useGlobalSections, useCreateGlobalSection } from '@/hooks/useGlobalSections'
import { Globe, Search, AlertCircle, Plus } from 'lucide-react'
import { toast } from 'sonner'

const SECTION_COLORS = {
  hero:            'bg-purple-100 text-purple-700',
  text:            'bg-blue-100 text-blue-700',
  features:        'bg-green-100 text-green-700',
  faq:             'bg-yellow-100 text-yellow-700',
  cta:             'bg-red-100 text-red-700',
  'pre-footer':    'bg-neutral-100 text-neutral-700',
  partners:        'bg-zinc-100 text-zinc-700',
}

/**
 * Dialog shown when admin clicks "Make Global" on a section.
 * Options:
 *  A) Save current section data as a new global section (enters key + title).
 *  B) Link to an existing global section (pick from list).
 *
 * @param {object} section - The section being made global
 * @param {boolean} open
 * @param {function} onOpenChange
 * @param {function} onLink - called with { globalKey } when linked
 */
export function GlobalSectionManagerDialog({ section, open, onOpenChange, onLink }) {
  const [tab, setTab] = useState('new')
  const [key, setKey] = useState('')
  const [title, setTitle] = useState('')
  const [search, setSearch] = useState('')
  const { data: existing, isLoading } = useGlobalSections()
  const { mutate: create, isPending: isCreating } = useCreateGlobalSection()

  const filtered = useMemo(() => {
    if (!existing) return []
    const q = search.toLowerCase()
    return existing.filter(
      (s) =>
        s.key.includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.sectionType.includes(q)
    )
  }, [existing, search])

  const handleCreate = () => {
    if (!key.trim() || !title.trim()) return
    const cleanKey = key.trim().toLowerCase().replace(/\s+/g, '-')
    create(
      { key: cleanKey, title: title.trim(), sectionType: section.type, data: section },
      {
        onSuccess: () => {
          toast.success(`Global section "${title}" created.`)
          onLink({ globalKey: cleanKey })
          onOpenChange(false)
          setKey('')
          setTitle('')
        },
        onError: (err) => {
          const msg = err.response?.data?.error || 'Failed to create global section.'
          toast.error(msg)
        },
      }
    )
  }

  const handleLink = (gs) => {
    onLink({ globalKey: gs.key })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-lg mx-4 sm:mx-auto flex flex-col max-h-[90vh]">
        <DialogHeader className="pb-3">
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Make Section Global
          </DialogTitle>
          <DialogDescription>
            Global sections are shared site-wide. Editing the global section updates all pages that use it.
          </DialogDescription>
        </DialogHeader>

        {/* Tab switcher */}
        <div className="flex gap-1 p-1 bg-muted rounded-lg mb-3">
          <button
            type="button"
            className={`flex-1 text-sm py-1.5 px-3 rounded-md transition-colors ${tab === 'new' ? 'bg-background shadow-sm font-medium' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setTab('new')}
          >
            Create New
          </button>
          <button
            type="button"
            className={`flex-1 text-sm py-1.5 px-3 rounded-md transition-colors ${tab === 'existing' ? 'bg-background shadow-sm font-medium' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setTab('existing')}
          >
            Link Existing
          </button>
        </div>

        {/* Tab: Create new global section */}
        {tab === 'new' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Global Key *</Label>
              <Input
                value={key}
                onChange={(e) => setKey(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                placeholder="e.g. pre-footer-main"
                autoFocus
              />
              <p className="text-xs text-muted-foreground">Unique identifier — use lowercase with hyphens.</p>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Display Title *</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Main Pre-Footer CTA"
              />
            </div>
            <div className="p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
              Current section data (<strong>{section?.type}</strong>) will be saved as the global section content.
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)} type="button">Cancel</Button>
              <Button onClick={handleCreate} disabled={!key.trim() || !title.trim() || isCreating} type="button">
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                {isCreating ? 'Creating…' : 'Create & Link'}
              </Button>
            </div>
          </div>
        )}

        {/* Tab: Link to existing */}
        {tab === 'existing' && (
          <div className="flex flex-col gap-3 flex-1 min-h-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search global sections…" className="pl-9" />
            </div>
            <div className="flex-1 overflow-y-auto space-y-2">
              {isLoading && <Skeleton className="h-16 w-full" />}
              {!isLoading && filtered.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">No global sections found.</p>
              )}
              {!isLoading && filtered.map((gs) => (
                <button
                  key={gs.id}
                  type="button"
                  onClick={() => handleLink(gs)}
                  className="w-full text-left border rounded-lg p-3 hover:border-primary/50 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{gs.title}</p>
                      <p className="text-xs text-muted-foreground font-mono">{gs.key}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${SECTION_COLORS[gs.sectionType] || 'bg-gray-100 text-gray-700'}`}>
                      {gs.sectionType}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
