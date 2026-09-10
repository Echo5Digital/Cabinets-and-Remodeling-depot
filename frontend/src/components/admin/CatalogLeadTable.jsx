'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCatalogLead, useUpdateCatalogLead, useDeleteCatalogLead } from '@/hooks/useCatalogPlatform'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { formatDate } from '@/lib/utils'
import { Eye, Trash2 } from 'lucide-react'

const CATALOG_LEAD_STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'closed', label: 'Closed' },
  { value: 'lost', label: 'Lost' },
]

const STATUS_COLORS = {
  new: 'bg-primary text-white',
  contacted: 'bg-primary/75 text-white',
  quoted: 'bg-primary/55 text-white',
  closed: 'bg-white text-primary border border-primary font-semibold',
  lost: 'bg-primary/10 text-primary/60',
}

function CatalogLeadDetailForm({ lead, onClose }) {
  const [notes, setNotes] = useState(lead.internal_notes || '')
  const [status, setStatus] = useState(lead.status || 'new')
  const { mutate: updateLead, isPending } = useUpdateCatalogLead()

  const handleSave = () => {
    updateLead(
      { id: lead.id, status, internal_notes: notes },
      {
        onSuccess: () => {
          toast.success('Lead updated')
          onClose()
        },
        onError: () => toast.error('Failed to update lead'),
      }
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Name</p>
          <p className="font-medium">{lead.name || '—'}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Email</p>
          <a href={`mailto:${lead.email}`} className="font-medium text-primary hover:underline break-all">{lead.email || '—'}</a>
        </div>
        <div>
          <p className="text-muted-foreground">Phone</p>
          <p className="font-medium">{lead.phone || '—'}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Company</p>
          <p className="font-medium">{lead.company || '—'}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Source</p>
          <p className="font-medium">{lead.source || '—'}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Submitted</p>
          <p className="font-medium">{formatDate(lead.created_at)}</p>
        </div>
      </div>

      {lead.project_description && (
        <div>
          <p className="text-muted-foreground text-sm mb-1">Project Description</p>
          <div className="bg-primary/5 border border-primary/10 rounded-md p-3 text-sm whitespace-pre-wrap">{lead.project_description}</div>
        </div>
      )}

      {lead.items?.length > 0 && (
        <div>
          <p className="text-muted-foreground text-sm mb-2">Items ({lead.items.length})</p>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {lead.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 border rounded-md p-2 text-sm">
                {item.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image_url} alt={item.product_name} className="w-10 h-10 rounded object-cover shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="font-medium truncate">{item.product_name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.finish_name ? `${item.finish_name} · ` : ''}Qty {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATALOG_LEAD_STATUSES.map((s) => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Internal Notes</label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes about this lead..."
          rows={3}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={handleSave} disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
      </div>
    </div>
  )
}

function CatalogLeadDetailDialog({ leadId, open, onClose }) {
  const { data: lead, isLoading } = useCatalogLead(leadId)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl w-[calc(100vw-2rem)] sm:w-full">
        <DialogHeader>
          <DialogTitle>Catalog Lead Details</DialogTitle>
        </DialogHeader>
        {isLoading || !lead ? (
          <div className="space-y-3 py-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        ) : (
          <CatalogLeadDetailForm key={lead.id} lead={lead} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export function CatalogLeadTable({ leads = [] }) {
  const [selectedLeadId, setSelectedLeadId] = useState(null)
  const { mutate: deleteLead } = useDeleteCatalogLead()

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this lead?')) return
    deleteLead(id, {
      onSuccess: () => toast.success('Lead deleted'),
      onError: () => toast.error('Failed to delete lead'),
    })
  }

  return (
    <>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="min-w-160 sm:min-w-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No catalog leads yet.
                  </TableCell>
                </TableRow>
              )}
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">
                    <div>{lead.name}</div>
                    <div className="sm:hidden text-xs text-muted-foreground mt-0.5">{lead.email}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">{lead.email}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{lead.company || '—'}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${STATUS_COLORS[lead.status] || 'bg-muted'}`}>
                      {lead.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {formatDate(lead.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setSelectedLeadId(lead.id)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(lead.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <CatalogLeadDetailDialog
        leadId={selectedLeadId}
        open={!!selectedLeadId}
        onClose={() => setSelectedLeadId(null)}
      />
    </>
  )
}
