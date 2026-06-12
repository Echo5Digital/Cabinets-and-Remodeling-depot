'use client'

import { useState, Fragment } from 'react'
import { Button } from '@/components/ui/button'
import { SectionCard } from './SectionCard'
import { AddSectionDialog } from './AddSectionDialog'
import { getSectionDefaults } from '@/lib/pageContent'
import { Plus, LayoutTemplate } from 'lucide-react'

export function PageBuilderPanel({ sections = [], onChange }) {
  const [addOpen, setAddOpen] = useState(false)
  const [insertAt, setInsertAt] = useState(null)

  const moveUp = (idx) => {
    if (idx === 0) return
    const next = [...sections]
    ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
    onChange(next)
  }

  const moveDown = (idx) => {
    if (idx === sections.length - 1) return
    const next = [...sections]
    ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
    onChange(next)
  }

  const remove = (idx) => onChange(sections.filter((_, i) => i !== idx))

  const update = (idx, updated) =>
    onChange(sections.map((s, i) => (i === idx ? updated : s)))

  const openAddDialog = (at) => {
    setInsertAt(at)
    setAddOpen(true)
  }

  const addSection = (type) => {
    const defaults = getSectionDefaults(type)
    const newSection = { id: crypto.randomUUID(), type, ...defaults }
    const next = [...sections]
    const position = insertAt !== null ? insertAt : sections.length
    next.splice(position, 0, newSection)
    onChange(next)
    setAddOpen(false)
    setInsertAt(null)
  }

  return (
    <div className="space-y-0">
      {sections.length === 0 && (
        <div className="border-2 border-dashed rounded-lg py-14 flex flex-col items-center gap-3 text-center text-muted-foreground">
          <LayoutTemplate className="w-8 h-8 opacity-40" />
          <div>
            <p className="text-sm font-medium">No sections yet</p>
            <p className="text-xs mt-0.5">
              Click &quot;Add Section&quot; to start building the page
            </p>
          </div>
        </div>
      )}

      {sections.map((section, idx) => (
        <Fragment key={section.id}>
          {/* Add-between divider (shown between sections) */}
          {idx > 0 && (
            <div className="flex justify-center py-1 group/divider">
              <button
                type="button"
                onClick={() => openAddDialog(idx)}
                className="flex items-center gap-1 h-6 px-3 text-xs text-muted-foreground border border-dashed rounded-full opacity-0 group-hover/divider:opacity-100 hover:opacity-100 hover:border-primary/50 hover:text-primary focus:opacity-100 transition-opacity bg-background"
              >
                <Plus className="w-3 h-3" />
                Add section here
              </button>
            </div>
          )}

          <SectionCard
            section={section}
            index={idx}
            total={sections.length}
            onChange={(updated) => update(idx, updated)}
            onMoveUp={() => moveUp(idx)}
            onMoveDown={() => moveDown(idx)}
            onRemove={() => remove(idx)}
          />
        </Fragment>
      ))}

      {/* Add at end */}
      <div className="pt-2">
        <Button
          variant="outline"
          className="w-full border-dashed"
          onClick={() => openAddDialog(sections.length)}
          type="button"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Section
        </Button>
      </div>

      <AddSectionDialog
        open={addOpen}
        onOpenChange={(open) => {
          setAddOpen(open)
          if (!open) setInsertAt(null)
        }}
        onAdd={addSection}
      />
    </div>
  )
}
