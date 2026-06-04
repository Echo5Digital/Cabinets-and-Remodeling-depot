'use client'

import { useState, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useBlogCategories } from '@/hooks/useBlogs'
import {
  Bold, Italic, UnderlineIcon, Link2, List, ListOrdered,
  Heading2, Heading3, Quote, Undo, Redo, Upload
} from 'lucide-react'

function ToolbarButton({ onClick, active, title, children }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      title={title}
      className={`p-1.5 rounded text-sm transition-colors ${
        active ? 'bg-primary text-white' : 'hover:bg-muted'
      }`}
    >
      {children}
    </button>
  )
}

export function BlogForm({ initialData = {}, onSubmit, isPending }) {
  const [title, setTitle] = useState(initialData.title || '')
  const [excerpt, setExcerpt] = useState(initialData.excerpt || '')
  const [categoryId, setCategoryId] = useState(initialData.categoryId || '')
  const [authorName, setAuthorName] = useState(initialData.authorName || 'Admin')
  const [isPublished, setIsPublished] = useState(initialData.isPublished || false)
  const [isFeatured, setIsFeatured] = useState(initialData.isFeatured || false)
  const [metaTitle, setMetaTitle] = useState(initialData.metaTitle || '')
  const [metaDescription, setMetaDescription] = useState(initialData.metaDescription || '')
  const [coverFile, setCoverFile] = useState(null)
  const [coverPreview, setCoverPreview] = useState(initialData.coverImage || '')
  const fileRef = useRef()

  const { data: categories } = useBlogCategories()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Write your blog post content here...' }),
    ],
    content: initialData.body || '',
    editorProps: {
      attributes: { class: 'tiptap-editor' },
    },
  })

  const handleCoverChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!editor) return

    const formData = new FormData()
    formData.append('title', title)
    formData.append('excerpt', excerpt)
    formData.append('body', editor.getHTML())
    if (categoryId) formData.append('categoryId', categoryId)
    formData.append('authorName', authorName)
    formData.append('isPublished', isPublished)
    formData.append('isFeatured', isFeatured)
    if (metaTitle) formData.append('metaTitle', metaTitle)
    if (metaDescription) formData.append('metaDescription', metaDescription)
    if (coverFile) formData.append('coverImage', coverFile)

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-2">
            <Label>Title *</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Excerpt *</Label>
            <Textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary shown in blog listings (1-2 sentences)"
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Content *</Label>
            {editor && (
              <div className="border rounded-md overflow-hidden">
                {/* Toolbar */}
                <div className="flex flex-wrap gap-0.5 p-2 border-b bg-muted/30">
                  <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
                    <Bold className="w-3.5 h-3.5" />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
                    <Italic className="w-3.5 h-3.5" />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
                    <UnderlineIcon className="w-3.5 h-3.5" />
                  </ToolbarButton>
                  <div className="w-px h-5 bg-border mx-1 self-center" />
                  <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
                    <Heading2 className="w-3.5 h-3.5" />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">
                    <Heading3 className="w-3.5 h-3.5" />
                  </ToolbarButton>
                  <div className="w-px h-5 bg-border mx-1 self-center" />
                  <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
                    <List className="w-3.5 h-3.5" />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List">
                    <ListOrdered className="w-3.5 h-3.5" />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Quote">
                    <Quote className="w-3.5 h-3.5" />
                  </ToolbarButton>
                  <div className="w-px h-5 bg-border mx-1 self-center" />
                  <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
                    <Undo className="w-3.5 h-3.5" />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
                    <Redo className="w-3.5 h-3.5" />
                  </ToolbarButton>
                </div>
                <div className="p-4 min-h-[300px]">
                  <EditorContent editor={editor} />
                </div>
              </div>
            )}
          </div>

          {/* SEO */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-medium text-sm">SEO Settings</h3>
            <div className="space-y-2">
              <Label>Meta Title</Label>
              <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="SEO title (60-70 chars)" maxLength={70} />
            </div>
            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="SEO description (120-160 chars)" maxLength={160} rows={2} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish Status */}
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-sm">Publish Settings</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="published">Published</Label>
              <Switch id="published" checked={isPublished} onCheckedChange={setIsPublished} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="featured">Featured</Label>
              <Switch id="featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
            </div>
          </div>

          {/* Cover Image */}
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-sm">Cover Image</h3>
            {coverPreview && (
              <img src={coverPreview} alt="Cover" className="w-full aspect-video object-cover rounded-md" />
            )}
            <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => fileRef.current?.click()}>
              <Upload className="w-3.5 h-3.5 mr-2" />
              {coverPreview ? 'Change Image' : 'Upload Cover'}
            </Button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
          </div>

          {/* Category */}
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-sm">Category</h3>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Uncategorized</SelectItem>
                {categories?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Author */}
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-sm">Author</h3>
            <Input value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Author name" />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <Button type="submit" disabled={isPending} size="lg">
          {isPending ? 'Saving...' : initialData.id ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  )
}
