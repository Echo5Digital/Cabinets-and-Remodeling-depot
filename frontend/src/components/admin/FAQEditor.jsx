'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown } from 'lucide-react'

export function FAQEditor({ faqs = [], onChange }) {
  const [items, setItems] = useState(faqs)

  const notify = (newItems) => {
    setItems(newItems)
    onChange(newItems)
  }

  const add = () => {
    notify([...items, { question: '', answer: '' }])
  }

  const remove = (index) => {
    notify(items.filter((_, i) => i !== index))
  }

  const update = (index, field, value) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    )
    notify(updated)
  }

  const moveUp = (index) => {
    if (index === 0) return
    const updated = [...items]
    ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    notify(updated)
  }

  const moveDown = (index) => {
    if (index === items.length - 1) return
    const updated = [...items]
    ;[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
    notify(updated)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Frequently Asked Questions</CardTitle>
          <CardDescription>
            Add questions and answers. These will appear in the FAQ accordion on the page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8 border border-dashed rounded-md">
              No FAQs yet. Click &quot;Add FAQ&quot; to get started.
            </p>
          )}

          {items.map((faq, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3 bg-muted/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">FAQ #{index + 1}</span>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveUp(index)} disabled={index === 0}>
                    <ChevronUp className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveDown(index)} disabled={index === items.length - 1}>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive hover:text-destructive"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Input
                  placeholder="Question"
                  value={faq.question}
                  onChange={(e) => update(index, 'question', e.target.value)}
                />
                <Textarea
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) => update(index, 'answer', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={add} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add FAQ
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
