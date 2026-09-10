'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { useCatalogPlannerLead, useUpdateCatalogPlannerLead } from '@/hooks/useCatalogPlatform'
import { toast } from 'sonner'
import { formatDate } from '@/lib/utils'
import { Eye, Box } from 'lucide-react'

const PLANNER_STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'closed', label: 'Closed' },
]

const STATUS_COLORS = {
  new: 'bg-primary text-white',
  contacted: 'bg-primary/75 text-white',
  closed: 'bg-white text-primary border border-primary font-semibold',
}

function CatalogPlannerDrawer({ leadId, open, onClose }) {
  const { data: lead, isLoading } = useCatalogPlannerLead(leadId)
  const { mutate: updateStatus, isPending } = useUpdateCatalogPlannerLead()

  const items = lead?.items_json ? (Array.isArray(lead.items_json) ? lead.items_json : []) : []
  const settings = lead?.settings_json || {}

  const handleStatusChange = (status) => {
    updateStatus(
      { id: leadId, status },
      {
        onSuccess: () => toast.success('Status updated'),
        onError: () => toast.error('Failed to update status'),
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl w-[calc(100vw-2rem)] sm:w-full max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Planner Lead Details</DialogTitle>
        </DialogHeader>

        {isLoading || !lead ? (
          <div className="space-y-3 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-5 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">{lead.customer_name || '—'}</p>
              </div>
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
                <p className="text-muted-foreground">Project</p>
                <p className="font-medium">{lead.project_name || '—'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Submitted</p>
                <p className="font-medium">{formatDate(lead.created_at)}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-muted-foreground text-sm mb-2">Room & Layout</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Layout</p>
                  <p className="font-medium">{lead.layout || '—'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Width</p>
                  <p className="font-medium">{lead.room_width ? `${lead.room_width} ft` : '—'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Length</p>
                  <p className="font-medium">{lead.room_length ? `${lead.room_length} ft` : '—'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Height</p>
                  <p className="font-medium">{lead.room_height ? `${lead.room_height} ft` : '—'}</p>
                </div>
              </div>
            </div>

            {lead.cabinet_style && (
              <div className="border-t pt-4 text-sm">
                <p className="text-muted-foreground text-xs mb-1">Cabinet Style</p>
                <p className="font-medium">{lead.cabinet_style}</p>
              </div>
            )}

            {(settings.upperCabinetColor || settings.lowerCabinetColor || settings.selectedDoorStyle || settings.selectedHardware || settings.selectedCountertop || settings.selectedFlooring) && (
              <div className="border-t pt-4">
                <p className="text-muted-foreground text-sm mb-2">Materials & Finishes</p>
                <div className="space-y-1">
                  {[
                    { label: 'Upper Cabinets', value: settings.upperCabinetColor?.name },
                    { label: 'Lower Cabinets', value: settings.lowerCabinetColor?.name },
                    { label: 'Door Style', value: settings.selectedDoorStyle?.name },
                    { label: 'Hardware', value: settings.selectedHardware?.name },
                    { label: 'Countertop', value: settings.selectedCountertop?.name },
                    { label: 'Flooring', value: settings.selectedFlooring?.name },
                  ].filter(({ value }) => value).map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between text-sm py-1.5 border-b last:border-0">
                      <span className="text-muted-foreground text-xs">{label}</span>
                      <span className="font-medium text-xs text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {items.length > 0 && (
              <div className="border-t pt-4">
                <p className="text-muted-foreground text-sm mb-2">Cabinet & Fixture Summary ({items.length} items)</p>
                <div className="space-y-1 text-sm">
                  {Object.entries(
                    items.reduce((acc, item) => {
                      const cat = item.category || 'Cabinet'
                      acc[cat] = (acc[cat] || 0) + 1
                      return acc
                    }, {})
                  ).map(([cat, count]) => (
                    <div key={cat} className="flex items-center justify-between text-xs py-1.5 border-b last:border-0">
                      <span className="text-muted-foreground">{cat}</span>
                      <span className="font-semibold">{count} unit{count > 1 ? 's' : ''}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {lead.ai_image_url && (
              <div className="border-t pt-4">
                <p className="text-muted-foreground text-sm mb-2">AI Rendered Image</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lead.ai_image_url} alt="AI rendered kitchen design" className="rounded-md border w-full object-cover" />
              </div>
            )}

            {lead.notes && (
              <div className="border-t pt-4 text-sm">
                <p className="text-muted-foreground text-xs mb-1">Notes</p>
                <p className="whitespace-pre-wrap">{lead.notes}</p>
              </div>
            )}

            <div className="border-t pt-4 space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={lead.status} onValueChange={handleStatusChange} disabled={isPending}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PLANNER_STATUSES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {lead.scene_json && (
              <div className="pt-2">
                <Button asChild variant="outline" className="w-full gap-2">
                  <Link href={`/admin/catalog-planner/${lead.id}`}>
                    <Box className="w-4 h-4" />
                    View 2D/3D Design
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function CatalogPlannerTable({ leads = [] }) {
  const [selectedLeadId, setSelectedLeadId] = useState(null)

  return (
    <>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="min-w-160 sm:min-w-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No planner leads yet.
                  </TableCell>
                </TableRow>
              )}
              {leads.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedLeadId(lead.id)}
                >
                  <TableCell className="font-medium">
                    <div>{lead.customer_name}</div>
                    <div className="sm:hidden text-xs text-muted-foreground mt-0.5">{lead.customer_email}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">{lead.customer_email}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{lead.project_name || '—'}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${STATUS_COLORS[lead.status] || 'bg-muted'}`}>
                      {lead.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {formatDate(lead.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9"
                      onClick={(e) => { e.stopPropagation(); setSelectedLeadId(lead.id) }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <CatalogPlannerDrawer
        leadId={selectedLeadId}
        open={!!selectedLeadId}
        onClose={() => setSelectedLeadId(null)}
      />
    </>
  )
}
