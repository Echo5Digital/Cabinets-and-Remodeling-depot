'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PROJECT_CATEGORIES } from '@/lib/constants'
import { Upload } from 'lucide-react'

export function ProjectForm({ initialData = {}, onSubmit, isPending }) {
  const [title, setTitle] = useState(initialData.title || '')
  const [category, setCategory] = useState(initialData.category || '')
  const [description, setDescription] = useState(initialData.description || '')
  const [body, setBody] = useState(initialData.body || '')
  const [location, setLocation] = useState(initialData.location || '')
  const [completedAt, setCompletedAt] = useState(initialData.completedAt ? initialData.completedAt.split('T')[0] : '')
  const [isFeatured, setIsFeatured] = useState(initialData.isFeatured || false)
  const [isPublished, setIsPublished] = useState(initialData.isPublished !== false)
  const [coverFile, setCoverFile] = useState(null)
  const [coverPreview, setCoverPreview] = useState(initialData.coverImage || '')
  const fileRef = useRef()

  const handleCoverChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('category', category)
    formData.append('description', description)
    if (body) formData.append('body', body)
    if (location) formData.append('location', location)
    if (completedAt) formData.append('completedAt', completedAt)
    formData.append('isFeatured', isFeatured)
    formData.append('isPublished', isPublished)
    if (coverFile) formData.append('coverImage', coverFile)
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-2">
            <Label>Project Title *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Modern Kitchen Renovation - Tampa" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {PROJECT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Tampa, FL" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Short Description *</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief project overview (shown in listings)" rows={3} required />
          </div>

          <div className="space-y-2">
            <Label>Full Description</Label>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Detailed project description (shown on project detail page)" rows={6} />
          </div>

          <div className="space-y-2">
            <Label>Completion Date</Label>
            <Input type="date" value={completedAt} onChange={(e) => setCompletedAt(e.target.value)} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-sm">Settings</h3>
            <div className="flex items-center justify-between">
              <Label>Published</Label>
              <Switch checked={isPublished} onCheckedChange={setIsPublished} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Featured</Label>
              <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
            </div>
          </div>

          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-sm">Cover Image {!initialData.id && '*'}</h3>
            {coverPreview && (
              <img src={coverPreview} alt="Cover" className="w-full aspect-video object-cover rounded-md" />
            )}
            <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => fileRef.current?.click()}>
              <Upload className="w-3.5 h-3.5 mr-2" />
              {coverPreview ? 'Change Cover' : 'Upload Cover'}
            </Button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <Button type="submit" disabled={isPending} size="lg">
          {isPending ? 'Saving...' : initialData.id ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  )
}
