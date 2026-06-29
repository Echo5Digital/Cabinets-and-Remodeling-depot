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
import { Skeleton } from '@/components/ui/skeleton'
import { useTemplates } from '@/hooks/useTemplates'
import { Search, LayoutTemplate, AlertCircle } from 'lucide-react'

const SECTION_COLORS = {
  hero:            'bg-purple-100 text-purple-700',
  text:            'bg-blue-100 text-blue-700',
  features:        'bg-green-100 text-green-700',
  faq:             'bg-yellow-100 text-yellow-700',
  cta:             'bg-red-100 text-red-700',
  stats:           'bg-orange-100 text-orange-700',
  services:        'bg-cyan-100 text-cyan-700',
  process:         'bg-indigo-100 text-indigo-700',
  testimonials:    'bg-pink-100 text-pink-700',
  'feature-strip': 'bg-slate-100 text-slate-700',
  solutions:       'bg-teal-100 text-teal-700',
  showroom:        'bg-emerald-100 text-emerald-700',
  'service-areas': 'bg-sky-100 text-sky-700',
  affordable:      'bg-lime-100 text-lime-700',
  'how-it-works':  'bg-violet-100 text-violet-700',
  transformation:  'bg-fuchsia-100 text-fuchsia-700',
  installation:    'bg-amber-100 text-amber-700',
  'why-choose':    'bg-rose-100 text-rose-700',
  'start-project': 'bg-blue-100 text-blue-700',
  'pre-footer':    'bg-neutral-100 text-neutral-700',
  partners:        'bg-zinc-100 text-zinc-700',
}

/**
 * Dialog to browse and insert a saved template into the page.
 * @param {boolean} open
 * @param {function} onOpenChange
 * @param {function} onInsert - called with the sections array from the template
 */
export function TemplatePickerDialog({ open, onOpenChange, onInsert }) {
  const { data: templates, isLoading, error } = useTemplates()
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!templates) return []
    const q = search.toLowerCase()
    return templates.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        (t.description || '').toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    )
  }, [templates, search])

  const handleInsert = (template) => {
    onInsert(template.sections)
    onOpenChange(false)
    setSearch('')
  }

  const sectionTypes = (tpl) => {
    if (!Array.isArray(tpl.sections)) return []
    return [...new Set(tpl.sections.map((s) => s.type))]
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-2xl mx-4 sm:mx-auto flex flex-col max-h-[90vh]">
        <DialogHeader className="pb-3">
          <DialogTitle className="flex items-center gap-2">
            <LayoutTemplate className="w-4 h-4" />
            Insert from Template
          </DialogTitle>
          <DialogDescription>
            Choose a saved template to insert into the page.
          </DialogDescription>
        </DialogHeader>

        {/* Search */}
        <div className="relative pb-3 border-b">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates…"
            className="pl-9"
          />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="border rounded-lg p-4 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-lg">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              Failed to load templates.
            </div>
          )}

          {!isLoading && !error && filtered.length === 0 && (
            <div className="text-center text-muted-foreground text-sm py-12">
              <LayoutTemplate className="w-8 h-8 mx-auto mb-3 opacity-30" />
              {search ? (
                <p>No templates match &ldquo;{search}&rdquo;.</p>
              ) : (
                <>
                  <p>No templates saved yet.</p>
                  <p className="text-xs mt-1">Use &ldquo;Save as Template&rdquo; on any section to create one.</p>
                </>
              )}
            </div>
          )}

          {!isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => handleInsert(tpl)}
                  className="text-left border rounded-lg p-4 hover:border-primary/50 hover:bg-muted/30 transition-colors group"
                >
                  <p className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                    {tpl.name}
                  </p>
                  {tpl.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{tpl.description}</p>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {sectionTypes(tpl).map((type) => (
                      <span
                        key={type}
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${SECTION_COLORS[type] || 'bg-gray-100 text-gray-700'}`}
                      >
                        {type}
                      </span>
                    ))}
                    <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 capitalize">
                      {tpl.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
