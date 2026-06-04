'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { HeroEditor } from './HeroEditor'
import { FAQEditor } from './FAQEditor'
import { CTAEditor } from './CTAEditor'
import { SEOEditor } from './SEOEditor'
import { SectionsEditor } from './SectionsEditor'
import { Save, Eye, AlertCircle } from 'lucide-react'

export function PageContentEditor({ content, onSave, isSaving, slug }) {
  const [draft, setDraft] = useState(content || {})
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    setDraft(content || {})
    setIsDirty(false)
  }, [content])

  const updateSection = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }))
    setIsDirty(true)
  }

  const handleSave = () => {
    onSave(draft)
    setIsDirty(false)
  }

  return (
    <div className="space-y-6">
      {isDirty && (
        <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          You have unsaved changes. Click &quot;Save Changes&quot; to publish them.
        </div>
      )}

      <Tabs defaultValue="hero" className="space-y-4">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="cta">CTA</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="mt-4">
          <HeroEditor
            data={draft.hero}
            onChange={(v) => updateSection('hero', v)}
          />
        </TabsContent>

        <TabsContent value="sections" className="mt-4">
          <SectionsEditor
            sections={draft.sections || []}
            onChange={(v) => updateSection('sections', v)}
          />
        </TabsContent>

        <TabsContent value="faq" className="mt-4">
          <FAQEditor
            faqs={draft.faq || draft.faqs || []}
            onChange={(v) => updateSection('faq', v)}
          />
        </TabsContent>

        <TabsContent value="cta" className="mt-4">
          <CTAEditor
            data={draft.cta}
            onChange={(v) => updateSection('cta', v)}
          />
        </TabsContent>

        <TabsContent value="seo" className="mt-4">
          <SEOEditor
            data={draft.seo}
            onChange={(v) => updateSection('seo', v)}
          />
        </TabsContent>
      </Tabs>

      <div className="flex items-center gap-3 pt-4 border-t">
        <Button
          onClick={handleSave}
          disabled={isSaving || !isDirty}
          size="lg"
          className="min-w-[160px]"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>

        {slug && (
          <Button variant="outline" size="lg" asChild>
            <a href={`/${slug === 'home' ? '' : slug}`} target="_blank" rel="noopener noreferrer">
              <Eye className="w-4 h-4 mr-2" />
              Preview Page
            </a>
          </Button>
        )}

        {!isDirty && (
          <p className="text-sm text-muted-foreground ml-2">All changes saved.</p>
        )}
      </div>
    </div>
  )
}
