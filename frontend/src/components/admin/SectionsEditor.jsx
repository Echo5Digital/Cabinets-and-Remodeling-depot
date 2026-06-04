'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'

function SectionItem({ section, index, total, onChange, onRemove, onMoveUp, onMoveDown }) {
  const update = (field, value) => onChange({ ...section, [field]: value })

  return (
    <div className="border rounded-lg p-4 space-y-3 bg-muted/30">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">Section #{index + 1}</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onMoveUp} disabled={index === 0}>
            <ChevronUp className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onMoveDown} disabled={index === total - 1}>
            <ChevronDown className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-destructive hover:text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Section Heading</Label>
        <Input
          value={section.heading || ''}
          onChange={(e) => update('heading', e.target.value)}
          placeholder="e.g. Our Process"
        />
      </div>
      <div className="space-y-2">
        <Label>Content / Body Text</Label>
        <Textarea
          value={section.body || ''}
          onChange={(e) => update('body', e.target.value)}
          placeholder="Section content..."
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label>Section Image URL (optional)</Label>
        <Input
          value={section.image || ''}
          onChange={(e) => update('image', e.target.value)}
          placeholder="https://res.cloudinary.com/..."
        />
      </div>
    </div>
  )
}

export function SectionsEditor({ sections = [], onChange }) {
  const [items, setItems] = useState(sections)

  const notify = (newItems) => {
    setItems(newItems)
    onChange(newItems)
  }

  const add = () => notify([...items, { heading: '', body: '', image: '' }])
  const remove = (i) => notify(items.filter((_, idx) => idx !== i))
  const update = (i, updated) => notify(items.map((item, idx) => (idx === i ? updated : item)))

  const moveUp = (i) => {
    if (i === 0) return
    const updated = [...items]
    ;[updated[i - 1], updated[i]] = [updated[i], updated[i - 1]]
    notify(updated)
  }

  const moveDown = (i) => {
    if (i === items.length - 1) return
    const updated = [...items]
    ;[updated[i], updated[i + 1]] = [updated[i + 1], updated[i]]
    notify(updated)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Content Sections</CardTitle>
        <CardDescription>Additional content sections that appear between the hero and FAQs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8 border border-dashed rounded-md">
            No sections yet. Click &quot;Add Section&quot; to add content blocks.
          </p>
        )}

        {items.map((section, i) => (
          <SectionItem
            key={i}
            section={section}
            index={i}
            total={items.length}
            onChange={(updated) => update(i, updated)}
            onRemove={() => remove(i)}
            onMoveUp={() => moveUp(i)}
            onMoveDown={() => moveDown(i)}
          />
        ))}

        <Button variant="outline" onClick={add} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Section
        </Button>
      </CardContent>
    </Card>
  )
}
