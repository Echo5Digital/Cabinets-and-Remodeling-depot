'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function HeroEditor({ data = {}, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Hero Section</CardTitle>
          <CardDescription>The main banner displayed at the top of the page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Hero Title</Label>
            <Input
              value={data.title || ''}
              onChange={(e) => update('title', e.target.value)}
              placeholder="e.g. Kitchen Remodeling Tampa"
            />
          </div>

          <div className="space-y-2">
            <Label>Hero Subtitle</Label>
            <Textarea
              value={data.subtitle || ''}
              onChange={(e) => update('subtitle', e.target.value)}
              placeholder="Supporting text below the title"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Background Image URL</Label>
            <Input
              value={data.backgroundImage || ''}
              onChange={(e) => update('backgroundImage', e.target.value)}
              placeholder="https://res.cloudinary.com/..."
            />
            {data.backgroundImage && (
              <img
                src={data.backgroundImage}
                alt="Preview"
                className="mt-2 h-32 w-full object-cover rounded-md border"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>CTA Button Text</Label>
              <Input
                value={data.ctaText || ''}
                onChange={(e) => update('ctaText', e.target.value)}
                placeholder="Get Free Estimate"
              />
            </div>
            <div className="space-y-2">
              <Label>CTA Button Link</Label>
              <Input
                value={data.ctaLink || ''}
                onChange={(e) => update('ctaLink', e.target.value)}
                placeholder="/contact"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Secondary CTA Text</Label>
              <Input
                value={data.secondaryCtaText || ''}
                onChange={(e) => update('secondaryCtaText', e.target.value)}
                placeholder="View Our Work"
              />
            </div>
            <div className="space-y-2">
              <Label>Secondary CTA Link</Label>
              <Input
                value={data.secondaryCtaLink || ''}
                onChange={(e) => update('secondaryCtaLink', e.target.value)}
                placeholder="/projects"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
