'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useTemplates, useDeleteTemplate } from '@/hooks/useTemplates'
import { Bookmark, Trash2, Search, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

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

export default function TemplatesPage() {
  const { data: templates, isLoading, error } = useTemplates()
  const { mutate: remove } = useDeleteTemplate()
  const [search, setSearch] = useState('')

  const filtered = (templates || []).filter((t) => {
    const q = search.toLowerCase()
    return (
      t.name.toLowerCase().includes(q) ||
      (t.description || '').toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    )
  })

  const handleDelete = (tpl) => {
    if (!window.confirm(`Delete template "${tpl.name}"? This cannot be undone.`)) return
    remove(tpl.id, {
      onSuccess: () => toast.success(`"${tpl.name}" deleted.`),
      onError: () => toast.error('Failed to delete template.'),
    })
  }

  const sectionTypes = (tpl) => {
    if (!Array.isArray(tpl.sections)) return []
    return [...new Set(tpl.sections.map((s) => s.type))]
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Section Templates</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Saved templates from the page editor. Use the{' '}
          <Bookmark className="w-3.5 h-3.5 inline-block" /> button on any section to save it as a template.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search templates…"
          className="pl-9"
        />
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => <Skeleton key={n} className="h-36" />)}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-destructive bg-destructive/10 rounded-lg p-4">
          <AlertCircle className="w-5 h-5 shrink-0" />
          Failed to load templates.
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="border-2 border-dashed rounded-lg py-16 text-center text-muted-foreground">
          <Bookmark className="w-8 h-8 mx-auto mb-3 opacity-30" />
          {search ? (
            <p className="text-sm">No templates match &ldquo;{search}&rdquo;.</p>
          ) : (
            <>
              <p className="text-sm font-medium">No templates saved yet</p>
              <p className="text-xs mt-1">
                In the page editor, hover a section and click{' '}
                <Bookmark className="w-3 h-3 inline-block" /> to save it as a template.
              </p>
            </>
          )}
        </div>
      )}

      {!isLoading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tpl) => (
            <Card key={tpl.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4 flex flex-col gap-3 h-full">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm leading-snug">{tpl.name}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0 -mt-0.5 -mr-1"
                      onClick={() => handleDelete(tpl)}
                      type="button"
                      title="Delete template"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  {tpl.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{tpl.description}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {sectionTypes(tpl).map((type) => (
                    <span
                      key={type}
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${SECTION_COLORS[type] || 'bg-gray-100 text-gray-700'}`}
                    >
                      {type}
                    </span>
                  ))}
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 capitalize">{tpl.category}</Badge>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {new Date(tpl.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
