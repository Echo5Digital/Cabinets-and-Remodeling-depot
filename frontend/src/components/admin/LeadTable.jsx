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
import { Eye, Trash2 } from 'lucide-react'

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
      <DialogContent className="max-w-xl w-[calc(100vw-2rem)] sm:w-full">
        <DialogHeader>
          <DialogTitle>Lead Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p className="font-medium">{lead.firstName} {lead.lastName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <a href={`mailto:${lead.email}`} className="font-medium text-primary hover:underline break-all">{lead.email}</a>
            </div>
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">{lead.phone || '—'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Service</p>
              <p className="font-medium">{lead.service || '—'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Subject</p>
              <p className="font-medium">{lead.subject || '—'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Source</p>
              <p className="font-medium">{lead.source || 'website'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Submitted</p>
              <p className="font-medium">{formatDate(lead.createdAt)}</p>
            </div>
          </div>

          <div>
            <p className="text-muted-foreground text-sm mb-1">Message</p>
            <div className="bg-primary/5 border border-primary/10 rounded-md p-3 text-sm whitespace-pre-wrap">{lead.message}</div>
          </div>

          <div className="space-y-2">
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

          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave} disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
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
        lead={selectedLead}
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </>
  )
}
