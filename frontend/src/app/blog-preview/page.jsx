'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, User, ChevronRight, X, AlertTriangle } from 'lucide-react'

export default function BlogPreviewPage() {
  const [data, setData] = useState(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('blogPreview')
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setData(JSON.parse(stored))
    } catch {
      // ignore parse errors
    }
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-center px-4">
        <AlertTriangle className="w-8 h-8 text-muted-foreground" />
        <p className="text-muted-foreground">No preview data found.</p>
        <p className="text-sm text-muted-foreground">Open this page from the blog editor using the &ldquo;Open Preview&rdquo; button.</p>
      </div>
    )
  }

  const { title, coverImage, publishedAt, body, defaultBanner } = data

  const textContent = (body || '').replace(/<[^>]*>/g, '').trim()
  const wordCount = textContent.split(/\s+/).filter(Boolean).length
  const readTime = Math.max(1, Math.round(wordCount / 200))

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null

  return (
    <>
      {/* Preview banner */}
      <div className="sticky top-0 z-50 bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between">
        <span className="text-xs font-medium text-amber-800">
          Preview — reflects current unsaved editor content
        </span>
        <button
          onClick={() => window.close()}
          className="flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Close
        </button>
      </div>

      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <img
          src={coverImage || defaultBanner || '/contact-no-1 (1).jpg'}
          alt={title || 'Preview'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 container-custom h-full flex flex-col justify-center gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight uppercase max-w-2xl">
            {title || <span className="italic opacity-60">No title yet…</span>}
          </h1>

          <nav className="flex items-center gap-1.5 text-sm text-white/80 shrink-0" aria-label="Breadcrumb">
            <span>Home</span>
            <ChevronRight className="h-3.5 w-3.5 text-white/50" />
            <span>Blog</span>
            <ChevronRight className="h-3.5 w-3.5 text-white/50" />
            <span className="text-white/60 line-clamp-1 max-w-48">{title || '—'}</span>
          </nav>
        </div>
      </div>

      {/* Article body */}
      <article className="section-padding">
        <div className="container-custom max-w-4xl">

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              Cabinet and Remodeling Depot
            </span>
            {formattedDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {readTime} min read
            </span>
          </div>

          {/* Body */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      </article>
    </>
  )
}
