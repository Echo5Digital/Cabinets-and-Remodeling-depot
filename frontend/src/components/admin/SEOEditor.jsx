'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function SEOEditor({ data = {}, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  const titleLength = (data.metaTitle || '').length
  const descLength = (data.metaDescription || '').length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">SEO Settings</CardTitle>
        <CardDescription>
          Control how this page appears in search engine results (Google, Bing, etc.)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Meta Title</Label>
            <Badge variant={titleLength > 70 ? 'destructive' : titleLength > 50 ? 'secondary' : 'outline'}>
              {titleLength}/70
            </Badge>
          </div>
          <Input
            value={data.metaTitle || ''}
            onChange={(e) => update('metaTitle', e.target.value)}
            placeholder="Kitchen Remodeling Tampa | Cabinets & Remodeling Depot"
            maxLength={70}
          />
          <p className="text-xs text-muted-foreground">
            Recommended: 50–70 characters. Appears as the page title in Google results.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Meta Description</Label>
            <Badge variant={descLength > 160 ? 'destructive' : descLength > 120 ? 'secondary' : 'outline'}>
              {descLength}/160
            </Badge>
          </div>
          <Textarea
            value={data.metaDescription || ''}
            onChange={(e) => update('metaDescription', e.target.value)}
            placeholder="Expert kitchen remodeling in Tampa Bay. Free in-home estimates for custom cabinets, countertops, and full renovations."
            maxLength={160}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            Recommended: 120–160 characters. The description snippet shown in search results.
          </p>
        </div>

        <div className="space-y-2">
          <Label>OG Image URL (for social sharing)</Label>
          <Input
            value={data.ogImage || ''}
            onChange={(e) => update('ogImage', e.target.value)}
            placeholder="https://res.cloudinary.com/..."
          />
          {data.ogImage && (
            <img
              src={data.ogImage}
              alt="OG Preview"
              className="mt-2 h-32 w-full object-cover rounded border"
            />
          )}
          <p className="text-xs text-muted-foreground">
            Recommended size: 1200×630px. Used when the page is shared on Facebook, Twitter, etc.
          </p>
        </div>

        <div className="space-y-2">
          <Label>Keywords (optional)</Label>
          <Input
            value={data.keywords || ''}
            onChange={(e) => update('keywords', e.target.value)}
            placeholder="kitchen remodeling Tampa, custom cabinets Valrico, bathroom renovation"
          />
          <p className="text-xs text-muted-foreground">
            Comma-separated keywords. Modern SEO focuses on content quality but keywords help organize pages.
          </p>
        </div>

        {/* Search Preview */}
        {(data.metaTitle || data.metaDescription) && (
          <div className="mt-4 border rounded-lg p-4 bg-white">
            <p className="text-xs text-muted-foreground mb-2 font-medium">Google Preview:</p>
            <div className="space-y-1">
              <div className="text-base text-blue-700 font-medium truncate">
                {data.metaTitle || 'Page Title'}
              </div>
              <div className="text-xs text-green-700">
                {typeof window !== 'undefined' ? window.location.hostname : 'yourdomain.com'} › ...
              </div>
              <div className="text-sm text-slate-600 line-clamp-2">
                {data.metaDescription || 'Page description will appear here.'}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
