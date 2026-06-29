'use client'

import { useState } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSaveTemplate } from '@/hooks/useTemplates'
import { Bookmark } from 'lucide-react'
import { toast } from 'sonner'

const CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'hero', label: 'Hero Sections' },
  { value: 'cta', label: 'Call to Action' },
  { value: 'content', label: 'Content Blocks' },
  { value: 'faq', label: 'FAQ' },
  { value: 'testimonials', label: 'Testimonials' },
  { value: 'features', label: 'Features & Services' },
  { value: 'footer', label: 'Footer & Pre-Footer' },
]

/**
 * Dialog to save a single section as a reusable template.
 * @param {object} section - The section object to save
 * @param {boolean} open
 * @param {function} onOpenChange
 */
export function SaveTemplateDialog({ section, open, onOpenChange }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('general')
  const { mutate: save, isPending } = useSaveTemplate()

  const handleSave = () => {
    if (!name.trim()) return
    save(
      {
        name: name.trim(),
        description: description.trim() || null,
        category,
        sections: [section],
      },
      {
        onSuccess: () => {
          toast.success(`Template "${name}" saved.`)
          onOpenChange(false)
          setName('')
          setDescription('')
          setCategory('general')
        },
        onError: () => {
          toast.error('Failed to save template. Please try again.')
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bookmark className="w-4 h-4" />
            Save as Template
          </DialogTitle>
          <DialogDescription>
            Save this section as a reusable template to insert on any page.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Template Name *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Kitchen Hero Section"
              maxLength={100}
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Description (optional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of what this template is used for"
              rows={2}
              maxLength={300}
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!name.trim() || isPending} type="button">
              <Bookmark className="w-3.5 h-3.5 mr-1.5" />
              {isPending ? 'Saving…' : 'Save Template'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
