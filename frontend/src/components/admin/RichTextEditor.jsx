'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { useEffect } from 'react'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const EDITOR_STYLES = `
  .tiptap-editor { outline: none; min-height: 100px; padding: 0.5rem 0.75rem; font-size: 0.875rem; line-height: 1.6; }
  .tiptap-editor h2 { font-size: 1.125rem; font-weight: 700; margin: 0.5rem 0 0.25rem; }
  .tiptap-editor h3 { font-size: 1rem; font-weight: 600; margin: 0.5rem 0 0.25rem; }
  .tiptap-editor p { margin: 0.2rem 0; }
  .tiptap-editor ul { list-style-type: disc; padding-left: 1.5rem; margin: 0.25rem 0; }
  .tiptap-editor ol { list-style-type: decimal; padding-left: 1.5rem; margin: 0.25rem 0; }
  .tiptap-editor strong { font-weight: 700; }
  .tiptap-editor em { font-style: italic; }
  .tiptap-editor u { text-decoration: underline; }
`

function ToolBtn({ onClick, active, title, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        'p-1.5 rounded text-sm hover:bg-muted transition-colors',
        active ? 'bg-muted text-foreground' : 'text-muted-foreground'
      )}
    >
      <Icon className="w-3.5 h-3.5" />
    </button>
  )
}

export function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
    ],
    content: value || '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: { class: 'tiptap-editor' },
    },
  })

  // Sync incoming value changes (e.g. external reset)
  useEffect(() => {
    if (!editor || editor.isDestroyed) return
    const current = editor.getHTML()
    if (value !== current) {
      editor.commands.setContent(value || '', false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  if (!editor) return null

  return (
    <>
      <style>{EDITOR_STYLES}</style>
      <div className="border rounded-md overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 p-1 border-b bg-muted/20">
          <ToolBtn
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Bold"
            icon={Bold}
          />
          <ToolBtn
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="Italic"
            icon={Italic}
          />
          <ToolBtn
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
            title="Underline"
            icon={UnderlineIcon}
          />
          <div className="w-px h-4 bg-border mx-0.5" />
          <ToolBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            title="Large heading"
            icon={Heading2}
          />
          <ToolBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive('heading', { level: 3 })}
            title="Medium heading"
            icon={Heading3}
          />
          <ToolBtn
            onClick={() => editor.chain().focus().setParagraph().run()}
            active={editor.isActive('paragraph')}
            title="Normal text"
            icon={AlignLeft}
          />
          <div className="w-px h-4 bg-border mx-0.5" />
          <ToolBtn
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Bullet list"
            icon={List}
          />
          <ToolBtn
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Numbered list"
            icon={ListOrdered}
          />
        </div>

        {/* Editable area */}
        <EditorContent editor={editor} />
      </div>
    </>
  )
}
