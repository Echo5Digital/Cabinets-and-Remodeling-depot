'use client'

import { useState, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Node } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useSettings } from '@/hooks/useSettings'
import { useUploadBlogImage } from '@/hooks/useBlogs'
import {
  Bold, Italic, UnderlineIcon, List, ListOrdered,
  Heading2, Heading3, Quote, Undo, Redo, Upload, Image as ImageIcon,
} from 'lucide-react'

// ─── Custom TipTap node: image grid ─────────────────────────────────────────
const ImageGrid = Node.create({
  name: 'imageGrid',
  group: 'block',
  content: 'image+',

  addAttributes() {
    return {
      columns: {
        default: 2,
        parseHTML: (el) => parseInt(el.getAttribute('data-columns') || '2'),
        renderHTML: (attrs) => ({ 'data-columns': attrs.columns }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-img-grid]' }]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      {
        'data-img-grid': '',
        'data-columns': node.attrs.columns,
        class: `blog-img-grid blog-img-grid--${node.attrs.columns}`,
        ...HTMLAttributes,
      },
      0,
    ]
  },
})

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// ─── Toolbar button ───────────────────────────────────────────────────────────
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

// ─── Image insertion panel ────────────────────────────────────────────────────
const LAYOUTS = [
  { count: 1, label: 'Single' },
  { count: 2, label: 'Side by Side' },
  { count: 3, label: '3 Images' },
]

function ImagePanel({ editor, onClose }) {
  const [layout, setLayout] = useState(1)
  const [slots, setSlots] = useState([null, null, null])
  const [uploading, setUploading] = useState(false)
  const ref0 = useRef()
  const ref1 = useRef()
  const ref2 = useRef()
  const inputRefs = [ref0, ref1, ref2]
  const { mutateAsync: uploadImage } = useUploadBlogImage()

  const handleLayoutChange = (count) => {
    setLayout(count)
    setSlots([null, null, null])
  }

  const handleSlotFile = (index, file) => {
    if (!file) return
    setSlots((prev) => {
      const next = [...prev]
      next[index] = file
      return next
    })
  }

  const allFilled = slots.slice(0, layout).every(Boolean)

  const handleInsert = async () => {
    if (!allFilled || uploading) return
    setUploading(true)
    try {
      const urls = await Promise.all(slots.slice(0, layout).map((f) => uploadImage(f)))

      if (layout === 1) {
        editor.chain().focus().setImage({ src: urls[0], alt: '' }).run()
      } else {
        editor.chain().focus().insertContent({
          type: 'imageGrid',
          attrs: { columns: layout },
          content: urls.map((src) => ({ type: 'image', attrs: { src, alt: '' } })),
        }).run()
      }
      onClose()
    } catch {
      // silent — could add toast here
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="border-b bg-muted/20 p-3 space-y-3">
      {/* Layout selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground shrink-0">Layout:</span>
        {LAYOUTS.map(({ count, label }) => (
          <button
            key={count}
            type="button"
            onClick={() => handleLayoutChange(count)}
            className={`px-2.5 py-1 text-xs rounded border transition-colors ${
              layout === count
                ? 'bg-primary text-white border-primary'
                : 'border-border hover:bg-muted'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Image slots */}
      <div
        className={`grid gap-2 ${
          layout === 1 ? 'grid-cols-1 max-w-[180px]' :
          layout === 2 ? 'grid-cols-2' :
          'grid-cols-2 sm:grid-cols-3'
        }`}
      >
        {Array.from({ length: layout }).map((_, i) => {
          const file = slots[i]
          return (
            <div key={i}>
              {file ? (
                <div className="relative group cursor-pointer" onClick={() => inputRefs[i].current?.click()}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="w-full h-20 object-cover rounded border"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded flex items-center justify-center text-white text-xs transition-opacity">
                    Change
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => inputRefs[i].current?.click()}
                  className="w-full h-20 border-2 border-dashed rounded flex flex-col items-center justify-center text-muted-foreground hover:bg-muted transition-colors gap-1"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span className="text-xs">Add Image</span>
                </button>
              )}
              <input
                ref={inputRefs[i]}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleSlotFile(i, e.target.files[0])}
              />
            </div>
          )
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          size="sm"
          onClick={handleInsert}
          disabled={!allFilled || uploading}
        >
          {uploading ? 'Uploading…' : 'Insert'}
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

// ─── Main form ────────────────────────────────────────────────────────────────
export function BlogForm({ initialData = {}, onSubmit, isPending }) {
  const { data: settings } = useSettings()
  const defaultBanner = settings?.blogDefaultBannerImage || '/contact-no-1 (1).jpg'

  const [title, setTitle] = useState(initialData.title || '')
  const [isPublished, setIsPublished] = useState(initialData.isPublished || false)
  const [isFeatured, setIsFeatured] = useState(initialData.isFeatured || false)
  const [metaTitle, setMetaTitle] = useState(initialData.metaTitle || '')
  const [metaDescription, setMetaDescription] = useState(initialData.metaDescription || '')
  const [schema, setSchema] = useState(initialData.schema || '')
  const [coverFile, setCoverFile] = useState(null)
  const [coverPreview, setCoverPreview] = useState(initialData.coverImage || '')
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(initialData.thumbnailImage || '')
  const [publishedAt, setPublishedAt] = useState(
    initialData.publishedAt ? new Date(initialData.publishedAt).toISOString().split('T')[0] : ''
  )
  const [imgPanel, setImgPanel] = useState(false)

  const coverRef = useRef()
  const thumbnailRef = useRef()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TiptapImage,
      ImageGrid,
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

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setThumbnailFile(file)
    setThumbnailPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!editor) return

    const plainText = editor.getText().trim()
    const excerpt = plainText.length > 220
      ? plainText.slice(0, 220).replace(/\s+\S*$/, '') + '…'
      : plainText

    const formData = new FormData()
    formData.append('title', title)
    formData.append('excerpt', excerpt)
    formData.append('body', editor.getHTML())
    formData.append('authorName', 'Cabinet and Remodeling Depot')
    formData.append('isPublished', isPublished)
    formData.append('isFeatured', isFeatured)
    if (metaTitle) formData.append('metaTitle', metaTitle)
    if (metaDescription) formData.append('metaDescription', metaDescription)
    if (schema) formData.append('schema', schema)
    if (coverFile) formData.append('coverImage', coverFile)
    if (thumbnailFile) formData.append('thumbnailImage', thumbnailFile)
    if (publishedAt) formData.append('publishedAt', publishedAt)

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
                  <ToolbarButton onClick={() => setImgPanel((v) => !v)} active={imgPanel} title="Insert Image">
                    <ImageIcon className="w-3.5 h-3.5" />
                  </ToolbarButton>
                  <div className="w-px h-5 bg-border mx-1 self-center" />
                  <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
                    <Undo className="w-3.5 h-3.5" />
                  </ToolbarButton>
                  <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
                    <Redo className="w-3.5 h-3.5" />
                  </ToolbarButton>
                </div>

                {/* Image insertion panel */}
                {imgPanel && (
                  <ImagePanel
                    editor={editor}
                    onClose={() => setImgPanel(false)}
                  />
                )}

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
              <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="SEO title (60-70 chars recommended)" />
            </div>
            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="SEO description (120-160 chars recommended)" rows={2} />
            </div>
          </div>

          {/* Schema Markup */}
          <div className="border rounded-lg p-4 space-y-3">
            <div>
              <h3 className="font-medium text-sm">Schema Markup</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Optional JSON-LD structured data for this post. Rendered as a{' '}
                <code className="text-xs bg-muted px-1 rounded">{'<script type="application/ld+json">'}</code> tag.
              </p>
            </div>
            <Textarea
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "Your blog title"\n}`}
              rows={6}
              className="font-mono text-xs"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish Settings */}
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
            <div className="space-y-1.5">
              <Label htmlFor="publishedAt">Published Date</Label>
              <Input
                id="publishedAt"
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
              />
            </div>
          </div>

          {/* Cover Image — post hero banner */}
          <div className="border rounded-lg p-4 space-y-3">
            <div>
              <h3 className="font-medium text-sm">Cover Image</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Hero banner displayed at the top of the blog post page.</p>
            </div>
            <img src={coverPreview || defaultBanner} alt="Cover" className="w-full aspect-video object-cover rounded-md" />
            {coverFile && (
              <p className="text-xs text-muted-foreground">{coverFile.name} · {formatFileSize(coverFile.size)}</p>
            )}
            <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => coverRef.current?.click()}>
              <Upload className="w-3.5 h-3.5 mr-2" />
              {coverPreview ? 'Change Image' : 'Upload Custom Image'}
            </Button>
            <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
          </div>

          {/* Card Thumbnail — blog listing grid */}
          <div className="border rounded-lg p-4 space-y-3">
            <div>
              <h3 className="font-medium text-sm">Card Thumbnail</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Image shown on the blog listing card. If not set, falls back to the Cover Image.</p>
            </div>
            {thumbnailPreview && (
              <img src={thumbnailPreview} alt="Thumbnail" className="w-full aspect-video object-cover rounded-md" />
            )}
            {thumbnailFile && (
              <p className="text-xs text-muted-foreground">{thumbnailFile.name} · {formatFileSize(thumbnailFile.size)}</p>
            )}
            <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => thumbnailRef.current?.click()}>
              <Upload className="w-3.5 h-3.5 mr-2" />
              {thumbnailPreview ? 'Change Image' : 'Upload Image'}
            </Button>
            <input ref={thumbnailRef} type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
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
