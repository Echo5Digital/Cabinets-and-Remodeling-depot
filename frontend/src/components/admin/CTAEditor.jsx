'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function CTAEditor({ data = {}, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Call to Action Section</CardTitle>
        <CardDescription>The banner at the bottom of the page encouraging visitors to contact you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Heading</Label>
          <Input
            value={data.heading || ''}
            onChange={(e) => update('heading', e.target.value)}
            placeholder="Ready to Transform Your Kitchen?"
          />
        </div>
        <div className="space-y-2">
          <Label>Subheading</Label>
          <Textarea
            value={data.subheading || ''}
            onChange={(e) => update('subheading', e.target.value)}
            placeholder="Schedule a free in-home consultation..."
            rows={3}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Button Text</Label>
            <Input
              value={data.buttonText || ''}
              onChange={(e) => update('buttonText', e.target.value)}
              placeholder="Get Free Estimate"
            />
          </div>
          <div className="space-y-2">
            <Label>Button Link</Label>
            <Input
              value={data.buttonLink || ''}
              onChange={(e) => update('buttonLink', e.target.value)}
              placeholder="/contact"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Background Image URL (optional)</Label>
          <Input
            value={data.backgroundImage || ''}
            onChange={(e) => update('backgroundImage', e.target.value)}
            placeholder="https://res.cloudinary.com/..."
          />
        </div>
      </CardContent>
    </Card>
  )
}
