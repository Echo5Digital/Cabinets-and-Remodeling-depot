'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Monitor,
  AlignLeft,
  LayoutGrid,
  HelpCircle,
  Megaphone,
  BarChart2,
  Briefcase,
  ListOrdered,
  MessageSquare,
} from 'lucide-react'

const SECTION_TYPES = [
  {
    type: 'hero',
    label: 'Hero',
    description: 'Full-width banner with headline, subtitle, background image, and CTA buttons',
    icon: Monitor,
  },
  {
    type: 'text',
    label: 'Text',
    description: 'Heading, body text, and optional image (left / right / full layout)',
    icon: AlignLeft,
  },
  {
    type: 'features',
    label: 'Features',
    description: 'Grid of feature cards with icon, title, and description',
    icon: LayoutGrid,
  },
  {
    type: 'faq',
    label: 'FAQ',
    description: 'Accordion of questions and answers',
    icon: HelpCircle,
  },
  {
    type: 'cta',
    label: 'Call to Action',
    description: 'Banner with heading, subheading, and a button link',
    icon: Megaphone,
  },
  {
    type: 'stats',
    label: 'Stats',
    description: 'Row of key numbers / metrics (e.g. 15+ Years, 500+ Projects)',
    icon: BarChart2,
  },
  {
    type: 'services',
    label: 'Services',
    description: 'Cards for services offered with icons, descriptions, and links',
    icon: Briefcase,
  },
  {
    type: 'process',
    label: 'Process',
    description: 'Numbered steps for how the service works',
    icon: ListOrdered,
  },
  {
    type: 'testimonials',
    label: 'Testimonials',
    description: 'Client reviews with name, location, star rating, and quote',
    icon: MessageSquare,
  },
]

export function AddSectionDialog({ open, onOpenChange, onAdd }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Section</DialogTitle>
          <DialogDescription>
            Choose a section type to add to the page. It will be inserted at the bottom.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
          {SECTION_TYPES.map(({ type, label, description, icon: Icon }) => (
            <button
              key={type}
              type="button"
              onClick={() => onAdd(type)}
              className="flex items-start gap-3 p-3.5 border rounded-lg text-left hover:border-primary hover:bg-primary/5 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-tight">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{description}</p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
