'use client'

import { useState, useRef, useCallback } from 'react'
import { useEditor, EditorContent, ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import { Node, Extension } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle, Color } from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useSettings } from '@/hooks/useSettings'
import { useUploadBlogImage } from '@/hooks/useBlogs'
import {
  Bold, Italic, UnderlineIcon, Strikethrough,
  List, ListOrdered, Quote, Undo, Redo, Upload, Image as ImageIcon,
  Heading1, Heading2, Heading3,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Link2Off, Code2, Minus,
  ImageUp, Palette, X,
  Eye,
  MoveVertical,
} from 'lucide-react'

// ─── FontSize extension (piggybacks on the existing TextStyle mark) ──────────
const FontSize = Extension.create({
  name: 'fontSize',
  addGlobalAttributes() {
    return [{
      types: ['textStyle'],
      attributes: {
        fontSize: {
          default: null,
          parseHTML: el => el.style.fontSize || null,
          renderHTML: attrs => attrs.fontSize ? { style: `font-size: ${attrs.fontSize}` } : {},
        },
      },
    }]
  },
  addCommands() {
    return {
      setFontSize:   size => ({ chain }) => chain().setMark('textStyle', { fontSize: size }).run(),
      unsetFontSize: ()   => ({ chain }) => chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
    }
  },
})

// Preset sizes — index 2 ('1rem') is the "default / clear" step
const FONT_SIZES = ['0.75rem', '0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '1.875rem', '2.25rem', '3rem']
const FS_DEFAULT_IDX = 2

// ─── Clickable image node view (hover-to-replace) ────────────────────────────
function ClickableImageView({ node, updateAttributes }) {
  const fileInputRef = useRef()
  const { mutateAsync: uploadImage } = useUploadBlogImage()
  const [uploading, setUploading] = useState(false)

  const { src, alt, title, class: className } = node.attrs

  const handleOverlayInteract = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!uploading) fileInputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = '' // allow same file re-selection after failure
    setUploading(true)
    try {
      const url = await uploadImage(file)
      updateAttributes({ src: url }) // partial update — class/alt/title preserved
    } catch {
      // silent — toast.error() can be wired here
    } finally {
      setUploading(false)
    }
  }

  const alignments = [
    { id: 'full',   Icon: AlignJustify, label: 'Full Width' },
    { id: 'left',   Icon: AlignLeft,    label: 'Float Left'  },
    { id: 'center', Icon: AlignCenter,  label: 'Center'      },
    { id: 'right',  Icon: AlignRight,   label: 'Float Right' },
  ]

  return (
    <NodeViewWrapper as="span" className="clickable-image-wrapper">
      <span className="clickable-image-inner">
        <img
          src={src}
          alt={alt ?? ''}
          title={title ?? undefined}
          className={className ?? undefined}
          draggable="false"
        />
        <span className={`clickable-image-overlay${uploading ? ' clickable-image-overlay--uploading' : ''}`}>
          {uploading ? (
            <span className="clickable-image-spinner" aria-label="Uploading…" />
          ) : (
            <>
              {/* Replace image — centre click zone */}
              <span
                className="clickable-image-upload-target"
                onMouseDown={handleOverlayInteract}
                onClick={handleOverlayInteract}
                title="Click to replace image"
              >
                <ImageUp className="clickable-image-icon" aria-hidden="true" />
              </span>

              {/* Alignment bar — slides up from bottom on hover */}
              <span className="clickable-image-align-bar">
                {alignments.map(({ id, Icon, label }) => (
                  <button
                    key={id}
                    type="button"
                    title={label}
                    onMouseDown={(e) => { e.preventDefault(); e.stopPropagation() }}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateAttributes({ class: `img-align-${id}` }) }}
                    className={`clickable-image-align-btn${className === `img-align-${id}` ? ' active' : ''}`}
                  >
                    <Icon className="w-3 h-3" />
                  </button>
                ))}
              </span>
            </>
          )}
        </span>
      </span>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </NodeViewWrapper>
  )
}

// ─── TipTap image extension with class attribute support ─────────────────────
const AlignableImage = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        parseHTML: (el) => el.getAttribute('class'),
        renderHTML: (attrs) => (attrs.class ? { class: attrs.class } : {}),
      },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(ClickableImageView)
  },
})

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
function ToolbarButton({ onClick, active, title, children, disabled }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); if (!disabled) onClick() }}
      title={title}
      disabled={disabled}
      className={`p-1.5 rounded text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-foreground/70 hover:bg-muted hover:text-foreground'
      }`}
    >
      {children}
    </button>
  )
}

// ─── Toolbar separator ────────────────────────────────────────────────────────
function Sep() {
  return <div className="w-px h-5 bg-border mx-0.5 self-center shrink-0" />
}

// ─── Image insertion panel ────────────────────────────────────────────────────
const LAYOUTS = [
  { count: 1, label: 'Single' },
  { count: 2, label: 'Side by Side' },
  { count: 3, label: '3 Images' },
]

const ALIGNMENTS = [
  { id: 'full',   label: 'Full Width' },
  { id: 'left',   label: 'Left' },
  { id: 'center', label: 'Center' },
  { id: 'right',  label: 'Right' },
]

function ImagePanel({ editor, onClose }) {
  const [layout, setLayout] = useState(1)
  const [alignment, setAlignment] = useState('full')
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
    setAlignment('full')
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
        editor.chain().focus().setImage({ src: urls[0], alt: '', class: `img-align-${alignment}` }).run()
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
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border hover:bg-muted'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Alignment selector — single image only */}
      {layout === 1 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground shrink-0">Align:</span>
          {ALIGNMENTS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setAlignment(id)}
              className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                alignment === id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:bg-muted'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

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

// ─── Link input row ───────────────────────────────────────────────────────────
function LinkPanel({ editor, onClose }) {
  const existing = editor.getAttributes('link').href || ''
  const [url, setUrl] = useState(existing)

  const apply = () => {
    const trimmed = url.trim()
    if (!trimmed) {
      editor.chain().focus().unsetLink().run()
    } else {
      const href = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`
      editor.chain().focus().setLink({ href, target: '_blank' }).run()
    }
    onClose()
  }

  const remove = () => {
    editor.chain().focus().unsetLink().run()
    onClose()
  }

  return (
    <div className="border-b bg-muted/20 px-3 py-2 flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground shrink-0">Link URL:</span>
      <input
        autoFocus
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); apply() } if (e.key === 'Escape') onClose() }}
        placeholder="https://example.com"
        className="flex-1 min-w-0 text-xs border rounded px-2 py-1 bg-background outline-none focus:ring-1 focus:ring-primary"
      />
      <button type="button" onClick={apply} className="px-2.5 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
        Apply
      </button>
      {existing && (
        <button type="button" onClick={remove} className="px-2.5 py-1 text-xs border rounded hover:bg-muted transition-colors">
          Remove
        </button>
      )}
      <button type="button" onClick={onClose} className="px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
        Cancel
      </button>
    </div>
  )
}

// ─── Selection bubble menu ────────────────────────────────────────────────────
// 8 per row × 2 rows = 16 swatches. Row 1 uses theme/neutral tones (Brand first).
const BUBBLE_COLORS = [
  // ── Row 1: Theme & neutrals ──────────────────────────────────────────────
  { label: 'Default', value: null              },  // clear color
  { label: 'Brand',   value: 'hsl(346 81% 28%)' }, // theme primary crimson
  { label: 'Crimson', value: '#be123c'          },
  { label: 'Dark',    value: '#111827'          },
  { label: 'Slate',   value: '#475569'          },
  { label: 'Gray',    value: '#6b7280'          },
  { label: 'Muted',   value: '#9ca3af'          },
  { label: 'Light',   value: '#e5e7eb'          },
  // ── Row 2: Color spectrum ────────────────────────────────────────────────
  { label: 'Red',     value: '#dc2626'          },
  { label: 'Orange',  value: '#ea580c'          },
  { label: 'Amber',   value: '#d97706'          },
  { label: 'Yellow',  value: '#ca8a04'          },
  { label: 'Green',   value: '#16a34a'          },
  { label: 'Teal',    value: '#0d9488'          },
  { label: 'Blue',    value: '#2563eb'          },
  { label: 'Purple',  value: '#9333ea'          },
]

function BubbleBtn({ onClick, active, title, children, style }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      style={style}
      className={`bubble-menu-btn${active ? ' bubble-menu-btn--active' : ''}`}
    >
      {children}
    </button>
  )
}

function BubbleSep() {
  return <span className="bubble-menu-sep" />
}

function SelectionBubbleMenu({ editor }) {
  const [mode, setMode] = useState('default') // 'default' | 'link' | 'color'
  const [linkUrl, setLinkUrl] = useState('')

  const openLink = () => {
    setLinkUrl(editor.getAttributes('link').href || '')
    setMode('link')
  }

  const applyLink = () => {
    const trimmed = linkUrl.trim()
    if (!trimmed) {
      editor.chain().focus().unsetLink().run()
    } else {
      const href = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`
      editor.chain().focus().setLink({ href, target: '_blank' }).run()
    }
    setMode('default')
  }

  const shouldShow = ({ state }) => {
    const { selection } = state
    if (selection.empty) return false
    // Don't show for node selections (images, etc.)
    if ('node' in selection && selection.node) return false
    return true
  }

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        duration: 120,
        placement: 'top',
        maxWidth: 'none',
        onHide: () => setMode('default'),
      }}
      className="bubble-menu"
    >
      {mode === 'link' ? (
        <div className="bubble-menu-link-row">
          <input
            autoFocus
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); applyLink() }
              if (e.key === 'Escape') setMode('default')
            }}
            placeholder="https://example.com"
            className="bubble-menu-link-input"
          />
          <button type="button" className="bubble-menu-link-apply" onClick={applyLink}>Apply</button>
          {editor.isActive('link') && (
            <button type="button" className="bubble-menu-link-remove" onClick={() => { editor.chain().focus().unsetLink().run(); setMode('default') }}>Remove</button>
          )}
          <button type="button" className="bubble-menu-link-cancel" onClick={() => setMode('default')}>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : mode === 'color' ? (
        <div className="bubble-menu-color-panel">
          <div className="bubble-menu-color-header">
            <span className="bubble-menu-color-title">Text Color</span>
            <button
              type="button"
              className="bubble-menu-color-close"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setMode('default')}
              title="Back"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="bubble-menu-color-grid">
            {BUBBLE_COLORS.map(({ label, value }) => {
              const active = value
                ? editor.isActive('textStyle', { color: value })
                : !editor.getAttributes('textStyle').color
              return (
                <button
                  key={label}
                  type="button"
                  title={label}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    if (!value) editor.chain().focus().unsetColor().run()
                    else editor.chain().focus().setColor(value).run()
                    setMode('default')
                  }}
                  className={`bubble-menu-color-dot${active ? ' bubble-menu-color-dot--active' : ''}${!value ? ' bubble-menu-color-dot--clear' : ''}`}
                  style={value ? { background: value } : undefined}
                />
              )
            })}
          </div>
        </div>
      ) : (
        <div className="bubble-menu-default-row">
          {/* Inline formatting */}
          <BubbleBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
            <Bold className="w-4 h-4" />
          </BubbleBtn>
          <BubbleBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
            <Italic className="w-4 h-4" />
          </BubbleBtn>
          <BubbleBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
            <UnderlineIcon className="w-4 h-4" />
          </BubbleBtn>
          <BubbleBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
            <Strikethrough className="w-4 h-4" />
          </BubbleBtn>

          <BubbleSep />

          {/* Font size */}
          <BubbleBtn
            onClick={() => {
              const cur = editor.getAttributes('textStyle').fontSize
              const idx = cur ? FONT_SIZES.indexOf(cur) : FS_DEFAULT_IDX
              const next = FONT_SIZES[Math.max(0, (idx === -1 ? FS_DEFAULT_IDX : idx) - 1)]
              if (next === '1rem') editor.chain().focus().unsetFontSize().run()
              else editor.chain().focus().setFontSize(next).run()
            }}
            title="Decrease Text Size"
          >
            <span className="text-[11px] font-bold leading-none select-none">A−</span>
          </BubbleBtn>
          <BubbleBtn
            onClick={() => {
              const cur = editor.getAttributes('textStyle').fontSize
              const idx = cur ? FONT_SIZES.indexOf(cur) : FS_DEFAULT_IDX
              const next = FONT_SIZES[Math.min(FONT_SIZES.length - 1, (idx === -1 ? FS_DEFAULT_IDX : idx) + 1)]
              editor.chain().focus().setFontSize(next).run()
            }}
            title="Increase Text Size"
          >
            <span className="text-[11px] font-bold leading-none select-none">A+</span>
          </BubbleBtn>

          <BubbleSep />

          {/* Headings */}
          <BubbleBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
            <Heading2 className="w-4 h-4" />
          </BubbleBtn>
          <BubbleBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">
            <Heading3 className="w-4 h-4" />
          </BubbleBtn>

          <BubbleSep />

          {/* Inline code */}
          <BubbleBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Inline Code">
            <Code2 className="w-4 h-4" />
          </BubbleBtn>

          {/* Link */}
          <BubbleBtn onClick={openLink} active={editor.isActive('link')} title="Add / Edit Link">
            <LinkIcon className="w-4 h-4" />
          </BubbleBtn>
          {editor.isActive('link') && (
            <BubbleBtn onClick={() => editor.chain().focus().unsetLink().run()} title="Remove Link">
              <Link2Off className="w-4 h-4" />
            </BubbleBtn>
          )}

          <BubbleSep />

          {/* Text color */}
          <BubbleBtn onClick={() => setMode('color')} title="Text Color">
            <span className="bubble-palette-wrap">
              <Palette className="w-4 h-4" />
              <span
                className="bubble-color-bar"
                style={{
                  background: editor.getAttributes('textStyle')?.color || 'transparent',
                  opacity: editor.getAttributes('textStyle')?.color ? 1 : 0,
                }}
              />
            </span>
          </BubbleBtn>
        </div>
      )}
    </BubbleMenu>
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
  const [panel, setPanel] = useState(null) // 'image' | 'link' | null

  const coverRef = useRef()
  const thumbnailRef = useRef()

  const togglePanel = useCallback((name) => {
    setPanel((prev) => (prev === name ? null : name))
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      FontSize,
      AlignableImage,
      ImageGrid,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Write your blog post content here...' }),
    ],
    content: initialData.body || '',
    editorProps: {
      attributes: { class: 'tiptap-editor blog-content' },
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
    formData.append('metaTitle', metaTitle)
    formData.append('metaDescription', metaDescription)
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
              <div className="border rounded-lg overflow-hidden shadow-sm">

                {/* ── Toolbar ─────────────────────────────────────────── */}
                <div className="bg-muted/30 border-b">
                  {/* Scrollable button row */}
                  <div className="flex items-center gap-0.5 px-2 py-1.5 overflow-x-auto scrollbar-none">

                    {/* Inline formatting */}
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold (Ctrl+B)">
                      <Bold className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic (Ctrl+I)">
                      <Italic className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline (Ctrl+U)">
                      <UnderlineIcon className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
                      <Strikethrough className="w-4 h-4" />
                    </ToolbarButton>

                    <Sep />

                    {/* Font Size */}
                    <ToolbarButton
                      title="Decrease Text Size"
                      onClick={() => {
                        const cur = editor.getAttributes('textStyle').fontSize
                        const idx = cur ? FONT_SIZES.indexOf(cur) : FS_DEFAULT_IDX
                        const next = FONT_SIZES[Math.max(0, (idx === -1 ? FS_DEFAULT_IDX : idx) - 1)]
                        if (next === '1rem') editor.chain().focus().unsetFontSize().run()
                        else editor.chain().focus().setFontSize(next).run()
                      }}
                    >
                      <span className="text-[11px] font-bold leading-none select-none">A−</span>
                    </ToolbarButton>
                    <ToolbarButton
                      title="Increase Text Size"
                      onClick={() => {
                        const cur = editor.getAttributes('textStyle').fontSize
                        const idx = cur ? FONT_SIZES.indexOf(cur) : FS_DEFAULT_IDX
                        const next = FONT_SIZES[Math.min(FONT_SIZES.length - 1, (idx === -1 ? FS_DEFAULT_IDX : idx) + 1)]
                        editor.chain().focus().setFontSize(next).run()
                      }}
                    >
                      <span className="text-[11px] font-bold leading-none select-none">A+</span>
                    </ToolbarButton>

                    <Sep />

                    {/* Headings */}
                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1">
                      <Heading1 className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
                      <Heading2 className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">
                      <Heading3 className="w-4 h-4" />
                    </ToolbarButton>

                    <Sep />

                    {/* Alignment */}
                    <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align Left">
                      <AlignLeft className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align Center">
                      <AlignCenter className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align Right">
                      <AlignRight className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })} title="Justify">
                      <AlignJustify className="w-4 h-4" />
                    </ToolbarButton>

                    <Sep />

                    {/* Lists */}
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
                      <List className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List">
                      <ListOrdered className="w-4 h-4" />
                    </ToolbarButton>

                    <Sep />

                    {/* Block elements */}
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
                      <Quote className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code Block">
                      <Code2 className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
                      <Minus className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().insertContent('<p></p>').run()} title="Add Empty Line (spacer)">
                      <MoveVertical className="w-4 h-4" />
                    </ToolbarButton>

                    <Sep />

                    {/* Link */}
                    <ToolbarButton
                      onClick={() => togglePanel('link')}
                      active={panel === 'link' || editor.isActive('link')}
                      title="Insert / Edit Link"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </ToolbarButton>
                    {editor.isActive('link') && (
                      <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} title="Remove Link">
                        <Link2Off className="w-4 h-4" />
                      </ToolbarButton>
                    )}

                    {/* Image */}
                    <ToolbarButton onClick={() => togglePanel('image')} active={panel === 'image'} title="Insert Image">
                      <ImageIcon className="w-4 h-4" />
                    </ToolbarButton>

                    <Sep />

                    {/* History */}
                    <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo (Ctrl+Z)">
                      <Undo className="w-4 h-4" />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo (Ctrl+Y)">
                      <Redo className="w-4 h-4" />
                    </ToolbarButton>
                  </div>
                </div>

                {/* ── Sub-panels ──────────────────────────────────────── */}
                {panel === 'link' && (
                  <LinkPanel editor={editor} onClose={() => setPanel(null)} />
                )}
                {panel === 'image' && (
                  <ImagePanel editor={editor} onClose={() => setPanel(null)} />
                )}

                {/* ── Editable area ────────────────────────────────────── */}
                <div className="p-4 min-h-80">
                  <SelectionBubbleMenu editor={editor} />
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
              <p className="text-xs text-muted-foreground mt-0.5">Image shown on the blog listing card. Falls back to Cover Image if not set.</p>
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

          {/* Preview in new tab */}
          {editor && (
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-medium text-sm">Preview</h3>
              <p className="text-xs text-muted-foreground">
                See exactly how this post will look when published.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  localStorage.setItem('blogPreview', JSON.stringify({
                    title,
                    coverImage: coverPreview,
                    publishedAt,
                    body: editor.getHTML(),
                    defaultBanner,
                  }))
                  window.open('/blog-preview', '_blank')
                }}
              >
                <Eye className="w-3.5 h-3.5 mr-2" />
                Open Preview
              </Button>
            </div>
          )}
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
