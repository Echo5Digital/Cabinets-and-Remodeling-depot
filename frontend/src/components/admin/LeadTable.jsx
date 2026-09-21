'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useUpdateLead, useDeleteLead } from '@/hooks/useLeads'
import { toast } from 'sonner'
import { formatDate } from '@/lib/utils'
import { LEAD_STATUSES } from '@/lib/constants'
import { Eye, Trash2, Mail, Phone } from 'lucide-react'

function InfoChip({ icon: Icon, value, href }) {
  if (!value) return null
  const content = (
    <span className="inline-flex items-center gap-1.5 min-w-0 rounded-md border border-primary/10 bg-muted/30 px-2.5 py-1.5 text-sm">
      <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
      <span className="truncate">{value}</span>
    </span>
  )
  return href ? (
    <a href={href} className="hover:border-primary/30 transition-colors rounded-md">{content}</a>
  ) : content
}

const STATUS_COLORS = {
  NEW: 'bg-primary text-white',
  CONTACTED: 'bg-primary/75 text-white',
  QUALIFIED: 'bg-primary/55 text-white',
  PROPOSAL_SENT: 'bg-primary/85 text-white',
  WON: 'bg-white text-primary border border-primary font-semibold',
  LOST: 'bg-primary/10 text-primary/60',
}

function LeadDetailDialog({ lead, open, onClose }) {
  const [notes, setNotes] = useState(lead?.notes || '')
  const [status, setStatus] = useState(lead?.status || 'NEW')
  const { mutate: updateLead, isPending } = useUpdateLead()

  if (!lead) return null

  const detailRows = [
    { label: 'Service', value: lead.service },
    { label: 'Subject', value: lead.subject },
  ].filter((r) => r.value)

  const handleSave = () => {
    updateLead(
      { id: lead.id, status, notes },
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl w-[calc(100vw-2rem)] sm:w-full max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Lead Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="rounded-lg border border-primary/10 bg-muted/20 p-4">
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Customer</p>
              <span className="text-xs text-muted-foreground capitalize shrink-0">{lead.source || 'website'}</span>
            </div>
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="font-semibold text-base truncate">{lead.firstName} {lead.lastName}</p>
              <p className="text-xs text-muted-foreground shrink-0">{formatDate(lead.createdAt)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <InfoChip icon={Mail} value={lead.email} href={lead.email ? `mailto:${lead.email}` : undefined} />
              <InfoChip icon={Phone} value={lead.phone} href={lead.phone ? `tel:${lead.phone}` : undefined} />
            </div>
          </div>

          {(detailRows.length > 0) && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Selected Details</p>
              <div className="border border-primary/10 rounded-lg overflow-hidden divide-y divide-primary/10">
                {detailRows.map(({ label, value }, i) => (
                  <div key={label} className={`flex items-start px-3.5 py-2.5 gap-3 text-sm ${i % 2 === 1 ? 'bg-muted/20' : ''}`}>
                    <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide w-28 shrink-0 pt-0.5">{label}</span>
                    <span className="flex-1 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lead.message && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Message</p>
              <div className="bg-muted/20 border border-primary/10 rounded-lg p-3 text-sm whitespace-pre-wrap">{lead.message}</div>
            </div>
          )}

          <div className="space-y-4 pt-1 border-t border-primary/10">
            <div className="space-y-2 pt-4">
              <label className="text-sm font-medium">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LEAD_STATUSES.map((s) => (
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

            <div className="flex gap-2 pt-1">
              <Button onClick={handleSave} disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function LeadTable({ leads = [] }) {
  const [selectedLead, setSelectedLead] = useState(null)
  const { mutate: deleteLead } = useDeleteLead()

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this lead?')) return
    deleteLead(id, {
      onSuccess: () => toast.success('Lead deleted'),
      onError: () => toast.error('Failed to delete lead'),
    })
  }

  return (
    <>
      {/* Horizontal scroll wrapper for mobile */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="min-w-160 sm:min-w-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No leads yet.
                  </TableCell>
                </TableRow>
              )}
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">
                    <div>{lead.firstName} {lead.lastName}</div>
                    <div className="sm:hidden text-xs text-muted-foreground mt-0.5">{lead.email}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">{lead.email}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{lead.service || '—'}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[lead.status]}`}>
                      {lead.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {formatDate(lead.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setSelectedLead(lead)}>
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

      <LeadDetailDialog
        key={selectedLead?.id}
        lead={selectedLead}
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </>
  )
}
