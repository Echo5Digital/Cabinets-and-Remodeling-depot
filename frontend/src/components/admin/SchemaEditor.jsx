'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, Check, X } from 'lucide-react'

export function SchemaEditor({ value, onChange }) {
  const [error, setError] = useState(null)

  const handleChange = (raw) => {
    onChange(raw)
    if (!raw.trim()) {
      setError(null)
      return
    }
    try {
      JSON.parse(raw)
      setError(null)
    } catch (e) {
      setError(e.message)
    }
  }

  const isValid = value?.trim() && !error

  return (
    <div className="space-y-3">
      {/* Header */}
      <div>
        <Label htmlFor="schema-textarea" className="text-sm font-medium">
          JSON-LD Structured Data
        </Label>
        <p className="text-xs text-muted-foreground mt-0.5">
          Paste valid JSON-LD here. It is injected as a{' '}
          <code className="bg-muted px-1 rounded text-[10px]">
            &lt;script type=&quot;application/ld+json&quot;&gt;
          </code>{' '}
          tag in the page{' '}
          <code className="bg-muted px-1 rounded text-[10px]">&lt;head&gt;</code>,
          helping search engines understand your content.{' '}
          <a
            href="https://schema.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            schema.org reference ↗
          </a>
        </p>
      </div>

      {/* Textarea */}
      <Textarea
        id="schema-textarea"
        value={value || ''}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "LocalBusiness",\n  "name": "Cabinets & Remodeling Depot"\n}'}
        rows={14}
        className={[
          'font-mono text-xs resize-y',
          error ? 'border-destructive focus-visible:ring-destructive' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        spellCheck={false}
      />

      {/* Validation row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {error && (
            <span className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span className="truncate max-w-65">{error}</span>
            </span>
          )}
          {isValid && (
            <span className="text-xs text-green-600 flex items-center gap-1">
              <Check className="w-3 h-3" />
              Valid JSON
            </span>
          )}
          {!value?.trim() && (
            <span className="text-xs text-muted-foreground">No schema set</span>
          )}
        </div>

        {value?.trim() && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive shrink-0"
            onClick={() => {
              onChange('')
              setError(null)
            }}
            type="button"
          >
            <X className="w-3.5 h-3.5 mr-1.5" />
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}
