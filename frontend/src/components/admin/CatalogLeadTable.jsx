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
import { Eye, Trash2, Mail, Phone, MapPin, Building2, ImageIcon, ListChecks } from 'lucide-react'

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

// Parses the structured project_description text produced by the AI kitchen
// design tool (source: 'design_ai') into labeled fields, mirroring the parser
// on the Cabinet Catalog Platform's own leads admin page. Also understands the
// AI bathroom design tool's format (source: 'design_ai_bathroom'), which uses
// different field labels (Bathroom Type / Vanity Finish / Vanity Faucet / etc.)
// on the same "Label: value | Label: value" line structure.
function parseDesignDescription(text) {
  if (!text) return null
  const lines = text.split('\n')
  const f = {}
  let inItems = false
  const itemLines = []

  // Generic "Label: value | Label: value" splitter used by both kitchen and
  // bathroom description lines — returns { Label: value, ... } for the line.
  function splitLabeledPairs(line) {
    const pairs = {}
    line.split(' | ').forEach((part) => {
      const idx = part.indexOf(': ')
      if (idx === -1) return
      pairs[part.slice(0, idx).trim()] = part.slice(idx + 2).trim()
    })
    return pairs
  }

  for (const line of lines) {
    if (line.startsWith('AI Kitchen Design — ')) {
      f.conceptName = line.replace('AI Kitchen Design — ', '').trim()
      inItems = false
    } else if (line.startsWith('AI Bathroom Design — ')) {
      f.conceptName = line.replace('AI Bathroom Design — ', '').trim()
      inItems = false
    } else if (line.startsWith('Style: ')) {
      // Kitchen: "Style: {cabinet_style} | Layout: {layout} | Budget Style: {budget_style}"
      inItems = false
      const p = splitLabeledPairs(line)
      if (p['Style']) f.style = p['Style']
      if (p['Layout']) f.layout = p['Layout']
      if (p['Budget Style']) f.budgetStyle = p['Budget Style']
    } else if (line.startsWith('Bathroom Type: ')) {
      // Bathroom: "Bathroom Type: {type} | Style: {layout/style} | Budget Style: {budget_style}"
      inItems = false
      const p = splitLabeledPairs(line)
      if (p['Bathroom Type']) f.bathroomType = p['Bathroom Type']
      if (p['Style']) f.style = p['Style']
      if (p['Budget Style']) f.budgetStyle = p['Budget Style']
    } else if (line.startsWith('Upper: ')) {
      inItems = false
      const p = splitLabeledPairs(line)
      if (p['Upper']) f.upperColor = p['Upper']
      if (p['Lower']) f.lowerColor = p['Lower']
      if (p['Countertop']) f.countertop = p['Countertop']
      if (p['Flooring']) f.flooring = p['Flooring']
    } else if (line.startsWith('Vanity Finish: ')) {
      // Bathroom: "Vanity Finish: {finish} | Countertop: {countertop} | Flooring: {flooring}"
      inItems = false
      const p = splitLabeledPairs(line)
      if (p['Vanity Finish']) f.vanityFinish = p['Vanity Finish']
      if (p['Countertop']) f.countertop = p['Countertop']
      if (p['Flooring']) f.flooring = p['Flooring']
    } else if (line.startsWith('Vanity Faucet: ')) {
      // Bathroom: "Vanity Faucet: {style} | Shower Faucet: {style} | Faucet Color: {color}"
      inItems = false
      const p = splitLabeledPairs(line)
      if (p['Vanity Faucet']) f.vanityFaucet = p['Vanity Faucet']
      if (p['Shower Faucet']) f.showerFaucet = p['Shower Faucet']
      if (p['Faucet Color']) f.faucetColor = p['Faucet Color']
    } else if (line.startsWith('Project Type: ')) {
      inItems = false
      f.projectType = line.replace('Project Type: ', '').trim()
    } else if (line.startsWith('Enhancements: ')) {
      inItems = false
      f.enhancements = line.replace('Enhancements: ', '').trim()
    } else if (line.startsWith('Address: ')) {
      inItems = false
      f.address = line.replace('Address: ', '').trim()
    } else if (line.startsWith('Items Requested:')) {
      inItems = true
    } else if (line.startsWith('Comments: ')) {
      inItems = false
      f.comments = line.replace('Comments: ', '').trim()
    } else if (line.startsWith('Render URL: ')) {
      inItems = false
      f.renderUrl = line.replace('Render URL: ', '').trim()
    } else if (inItems && line.trim()) {
      itemLines.push(line.trim())
    }
  }

  f.itemsList = itemLines
  return f
}

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

function DesignDetails({ description, beforeImageUrl }) {
  const [imgError, setImgError] = useState(false)
  const d = parseDesignDescription(description)
  if (!d) return null

  const isBathroom = !!d.bathroomType

  const detailRows = (isBathroom
    ? [
        { label: 'Concept', value: d.conceptName },
        { label: 'Bathroom Type', value: d.bathroomType },
        { label: 'Style / Layout', value: d.style },
        { label: 'Budget Style', value: d.budgetStyle },
        { label: 'Vanity Finish', value: d.vanityFinish },
        { label: 'Countertop', value: d.countertop },
        { label: 'Flooring', value: d.flooring },
        { label: 'Vanity Faucet', value: d.vanityFaucet },
        { label: 'Shower Faucet', value: d.showerFaucet },
        { label: 'Faucet Color', value: d.faucetColor },
        { label: 'Enhancements', value: d.enhancements },
        { label: 'Address', value: d.address },
      ]
    : [
        { label: 'Concept', value: d.conceptName },
        { label: 'Project Type', value: d.projectType },
        { label: 'Layout', value: d.layout },
        { label: 'Cabinet Style', value: d.style },
        { label: 'Budget Style', value: d.budgetStyle },
        { label: 'Upper Cabinets', value: d.upperColor },
        { label: 'Lower Cabinets', value: d.lowerColor },
        { label: 'Countertop', value: d.countertop },
        { label: 'Flooring', value: d.flooring },
        { label: 'Address', value: d.address },
      ]
  ).filter((r) => r.value)

  const imageUrl = d.renderUrl || beforeImageUrl

  return (
    <div className="space-y-4">
      {imageUrl && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" />
            {d.renderUrl ? 'AI Generated Image' : 'Before Photo'}
          </p>
          <div className="rounded-lg overflow-hidden border border-primary/10 bg-muted/30">
            {imgError ? (
              <div className="flex flex-col items-center justify-center py-6 px-4 text-center gap-1.5">
                <p className="text-xs text-muted-foreground">Render URL has expired (DALL·E links expire after 1 hour).</p>
                <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                  Try opening directly ↗
                </a>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt="AI kitchen design render"
                className="w-full object-cover"
                style={{ maxHeight: 260 }}
                onError={() => setImgError(true)}
              />
            )}
          </div>
        </div>
      )}

      {(detailRows.length > 0 || d.itemsList?.length > 0 || d.comments) && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1.5">
            <ListChecks className="w-3.5 h-3.5" />
            Selected Details
          </p>
          <div className="border border-primary/10 rounded-lg overflow-hidden divide-y divide-primary/10">
            {detailRows.map(({ label, value }, i) => (
              <div key={label} className={`flex items-start px-3.5 py-2.5 gap-3 text-sm ${i % 2 === 1 ? 'bg-muted/20' : ''}`}>
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide w-32 shrink-0 pt-0.5">{label}</span>
                <span className="flex-1 font-medium">{value}</span>
              </div>
            ))}
            {d.itemsList?.length > 0 && (
              <div className={`flex items-start px-3.5 py-2.5 gap-3 text-sm ${detailRows.length % 2 === 1 ? 'bg-muted/20' : ''}`}>
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide w-32 shrink-0 pt-0.5">Items Needed</span>
                <ul className="flex-1 space-y-0.5">
                  {d.itemsList.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {d.comments && (
              <div className="flex items-start px-3.5 py-2.5 gap-3 text-sm">
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide w-32 shrink-0 pt-0.5">Comments</span>
                <span className="flex-1 italic">{d.comments}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
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
    <div className="space-y-5">
      <div className="rounded-lg border border-primary/10 bg-muted/20 p-4">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Customer</p>
          {lead.source && (
            <span className="text-xs text-muted-foreground capitalize shrink-0">{lead.source.replace(/_/g, ' ')}</span>
          )}
        </div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <p className="font-semibold text-base truncate">{lead.name || '—'}</p>
          <p className="text-xs text-muted-foreground shrink-0">{formatDate(lead.created_at)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <InfoChip icon={Mail} value={lead.email} href={lead.email ? `mailto:${lead.email}` : undefined} />
          <InfoChip icon={Phone} value={lead.phone} href={lead.phone ? `tel:${lead.phone}` : undefined} />
          <InfoChip icon={Building2} value={lead.company} />
        </div>
      </div>

      {(lead.source === 'design_ai' || lead.source === 'design_ai_bathroom') && lead.project_description ? (
        <DesignDetails description={lead.project_description} beforeImageUrl={lead.before_image_url} />
      ) : lead.project_description ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Project Description</p>
          <div className="bg-muted/20 border border-primary/10 rounded-lg p-3 text-sm whitespace-pre-wrap">{lead.project_description}</div>
        </div>
      ) : null}

      {lead.items?.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Items ({lead.items.length})</p>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {lead.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 border border-primary/10 rounded-lg p-2 text-sm">
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

      <div className="space-y-4 pt-1 border-t border-primary/10">
        <div className="space-y-2 pt-4">
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

        <div className="flex gap-2 pt-1">
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}

function CatalogLeadDetailDialog({ leadId, open, onClose }) {
  const { data: lead, isLoading } = useCatalogLead(leadId)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl w-[calc(100vw-2rem)] sm:w-full max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Quote Request Details</DialogTitle>
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
