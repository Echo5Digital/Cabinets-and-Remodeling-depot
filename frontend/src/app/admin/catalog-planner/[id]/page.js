'use client'

import { useParams, useRouter } from 'next/navigation'
import { useCatalogPlannerLead } from '@/hooks/useCatalogPlatform'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/lib/utils'
import { ArrowLeft, ExternalLink } from 'lucide-react'

const CATALOG_PLATFORM_URL = 'https://cabinet-catalog-platform.vercel.app'

export default function CatalogPlannerDesignPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: lead, isLoading, isError } = useCatalogPlannerLead(id)

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => router.push('/admin/catalog-planner')}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Catalog Planner
        </button>
        <h1 className="text-3xl font-bold">{lead?.project_name || 'Kitchen Design'}</h1>
        {lead && (
          <p className="text-muted-foreground mt-1">
            Saved {formatDate(lead.created_at)} by {lead.customer_name}
          </p>
        )}
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      )}

      {isError && (
        <div className="border border-destructive/30 bg-destructive/5 rounded-lg p-4 text-sm text-destructive">
          Couldn&apos;t load this design. The Cabinet Catalog Platform integration may be unavailable right now.
        </div>
      )}

      {!isLoading && !isError && lead && (
        <div className="border rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Email</p>
              <a href={`mailto:${lead.customer_email}`} className="font-medium text-primary hover:underline break-all">
                {lead.customer_email || '—'}
              </a>
            </div>
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">{lead.customer_phone || '—'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Address</p>
              <p className="font-medium">{lead.customer_address || '—'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Cabinet Style</p>
              <p className="font-medium">{lead.cabinet_style || '—'}</p>
            </div>
          </div>

          {lead.ai_image_url && (
            <div>
              <p className="text-muted-foreground text-sm mb-2">AI Rendered Preview</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lead.ai_image_url} alt="AI rendered kitchen design" className="rounded-md border w-full max-w-xl object-cover" />
            </div>
          )}

          {lead.scene_json ? (
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                The full interactive 2D/3D design viewer runs on the Cabinet Catalog Platform.
              </p>
              <Button asChild className="gap-2">
                <a
                  href={`${CATALOG_PLATFORM_URL}/admin/planner/${lead.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open 2D/3D Design Viewer
                </a>
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground pt-2 border-t">
              No saved 2D/3D design snapshot is available for this lead (it was created before design snapshots were captured).
            </p>
          )}
        </div>
      )}
    </div>
  )
}
