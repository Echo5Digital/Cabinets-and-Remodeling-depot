'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { PageBuilderPanel } from './PageBuilderPanel'
import { SEOEditor } from './SEOEditor'
import { SchemaEditor } from './SchemaEditor'
import { normalizeContent, mergeWithPageDefaults } from '@/lib/pageContent'
import { Save, Eye, AlertCircle, CheckCircle2, LayoutTemplate, Search, Code2 } from 'lucide-react'

function PanelNumber({ n }) {
  return (
    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mr-3">
      {n}
    </span>
  )
}

export function PageContentEditor({ content, onSave, isSaving, slug }) {
  const [draft, setDraft] = useState(() => {
    const normalized = normalizeContent(content)
    return { ...normalized, sections: mergeWithPageDefaults(slug, normalized.sections) }
  })
  const [isDirty, setIsDirty] = useState(false)
  const [openPanels, setOpenPanels] = useState(['content', 'seo', 'schema'])

  useEffect(() => {
    const normalized = normalizeContent(content)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraft({ ...normalized, sections: mergeWithPageDefaults(slug, normalized.sections) })
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDirty(false)
  }, [content, slug])

  const updateSections = (sections) => {
    setDraft((p) => ({ ...p, sections }))
    setIsDirty(true)
  }

  const updateSeo = (seo) => {
    setDraft((p) => ({ ...p, seo }))
    setIsDirty(true)
  }

  const updateSchema = (schema) => {
    setDraft((p) => ({ ...p, schema }))
    setIsDirty(true)
  }

  const handleSave = () => {
    onSave(draft)
    setIsDirty(false)
  }

  return (
    <div className="space-y-0 pb-20 md:pb-4">
      {/* Save bar — fixed bottom on mobile, sticky top on desktop */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:relative md:bottom-auto md:left-auto md:right-auto md:sticky md:top-4 bg-background/95 backdrop-blur-sm border-t md:border md:rounded-lg flex items-center justify-between gap-3 px-4 py-3 shadow-md md:shadow-sm mb-4">
        <div className="flex items-center gap-2 text-sm min-w-0">
          {isDirty ? (
            <span className="flex items-center gap-1.5 text-amber-600">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Unsaved changes</span>
              <span className="sm:hidden text-xs">Unsaved</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-green-600">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline text-muted-foreground text-sm">All changes saved</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {slug && (
            <Button variant="outline" size="sm" asChild>
              <a href={`/${slug === 'home' ? '' : slug}`} target="_blank" rel="noopener noreferrer">
                <Eye className="w-4 h-4 sm:mr-1.5" />
                <span className="hidden sm:inline">Preview</span>
              </a>
            </Button>
          )}
          <Button onClick={handleSave} disabled={isSaving || !isDirty} size="sm" className="min-w-[110px]">
            <Save className="w-4 h-4 mr-1.5" />
            {isSaving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Three accordion panels */}
      <Accordion type="multiple" value={openPanels} onValueChange={setOpenPanels} className="space-y-3">

        {/* Panel 1 — Page Content */}
        <AccordionItem value="content" className="border rounded-lg overflow-hidden border-b-0 data-[state=open]:border-primary/30">
          <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-muted/40 bg-muted/20 [&[data-state=open]]:bg-muted/30">
            <div className="flex items-center text-left w-full mr-2">
              <PanelNumber n="1" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <LayoutTemplate className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-semibold text-sm">Page Content</span>
                  {draft.sections.length > 0 && (
                    <span className="text-xs text-muted-foreground font-normal">
                      ({draft.sections.length} section{draft.sections.length === 1 ? '' : 's'})
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-normal mt-0.5 hidden sm:block">
                  Add, edit, and reorder sections — Elementor-style
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <PageBuilderPanel sections={draft.sections} onChange={updateSections} />
          </AccordionContent>
        </AccordionItem>

        {/* Panel 2 — SEO */}
        <AccordionItem value="seo" className="border rounded-lg overflow-hidden border-b-0 data-[state=open]:border-primary/30">
          <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-muted/40 bg-muted/20 [&[data-state=open]]:bg-muted/30">
            <div className="flex items-center text-left w-full mr-2">
              <PanelNumber n="2" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Search className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-semibold text-sm">SEO</span>
                  {draft.seo?.metaTitle && (
                    <span className="text-xs text-muted-foreground font-normal truncate max-w-[160px] hidden sm:block">
                      {draft.seo.metaTitle}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-normal mt-0.5 hidden sm:block">
                  Meta title, description, OG image, keywords
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <SEOEditor data={draft.seo} onChange={updateSeo} />
          </AccordionContent>
        </AccordionItem>

        {/* Panel 3 — Page Schema */}
        <AccordionItem value="schema" className="border rounded-lg overflow-hidden border-b-0 data-[state=open]:border-primary/30">
          <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-muted/40 bg-muted/20 [&[data-state=open]]:bg-muted/30">
            <div className="flex items-center text-left w-full mr-2">
              <PanelNumber n="3" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Code2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-semibold text-sm">Page Schema</span>
                  {draft.schema?.trim() && (
                    <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-normal flex-shrink-0">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-normal mt-0.5 hidden sm:block">
                  JSON-LD structured data for search engines
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <SchemaEditor value={draft.schema} onChange={updateSchema} />
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  )
}
