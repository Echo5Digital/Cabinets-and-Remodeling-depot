'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  ChevronUp,
  ChevronDown,
  Trash2,
  Plus,
  Pencil,
  Check,
  X,
} from 'lucide-react'
import { SectionPreview } from './SectionPreview'
import { RichTextEditor } from './RichTextEditor'

// ── Type metadata ─────────────────────────────────────────────────────────────

const SECTION_LABELS = {
  hero:            'Hero',
  text:            'Text',
  features:        'Features',
  faq:             'FAQ',
  cta:             'Call to Action',
  stats:           'Stats',
  services:        'Services',
  process:         'Process',
  testimonials:    'Testimonials',
  'feature-strip': 'Feature Strip',
  solutions:       'Solutions',
  showroom:        'Showroom',
  'service-areas': 'Service Areas',
  affordable:      'Affordable',
  'how-it-works':  'How It Works',
  transformation:  'Transformation',
  installation:    'Installation',
  'why-choose':    'Why Choose Us',
  'start-project': 'Start Project',
  'pre-footer':    'Pre-Footer',
  partners:        'Partners',
}

const SECTION_COLORS = {
  hero:            'bg-purple-100 text-purple-700 border-purple-200',
  text:            'bg-blue-100 text-blue-700 border-blue-200',
  features:        'bg-green-100 text-green-700 border-green-200',
  faq:             'bg-yellow-100 text-yellow-700 border-yellow-200',
  cta:             'bg-red-100 text-red-700 border-red-200',
  stats:           'bg-orange-100 text-orange-700 border-orange-200',
  services:        'bg-cyan-100 text-cyan-700 border-cyan-200',
  process:         'bg-indigo-100 text-indigo-700 border-indigo-200',
  testimonials:    'bg-pink-100 text-pink-700 border-pink-200',
  'feature-strip': 'bg-slate-100 text-slate-700 border-slate-200',
  solutions:       'bg-teal-100 text-teal-700 border-teal-200',
  showroom:        'bg-emerald-100 text-emerald-700 border-emerald-200',
  'service-areas': 'bg-sky-100 text-sky-700 border-sky-200',
  affordable:      'bg-lime-100 text-lime-700 border-lime-200',
  'how-it-works':  'bg-violet-100 text-violet-700 border-violet-200',
  transformation:  'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
  installation:    'bg-amber-100 text-amber-700 border-amber-200',
  'why-choose':    'bg-rose-100 text-rose-700 border-rose-200',
  'start-project': 'bg-blue-100 text-blue-700 border-blue-200',
  'pre-footer':    'bg-neutral-100 text-neutral-700 border-neutral-200',
  partners:        'bg-zinc-100 text-zinc-700 border-zinc-200',
}

// ── Shared reusable array-item list ──────────────────────────────────────────

function ItemList({ items = [], onChange, renderItem, newItem, label }) {
  const add = () => onChange([...items, { ...newItem }])
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))
  const update = (i, updated) => onChange(items.map((item, idx) => (idx === i ? updated : item)))
  const moveUp = (i) => {
    if (i === 0) return
    const next = [...items]
    ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
    onChange(next)
  }
  const moveDown = (i) => {
    if (i === items.length - 1) return
    const next = [...items]
    ;[next[i], next[i + 1]] = [next[i + 1], next[i]]
    onChange(next)
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border rounded-md p-3 bg-background space-y-2">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-xs text-muted-foreground font-medium">
              {label} #{i + 1}
            </span>
            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveUp(i)} disabled={i === 0} type="button">
                <ChevronUp className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveDown(i)} disabled={i === items.length - 1} type="button">
                <ChevronDown className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => remove(i)}
                type="button"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
          {renderItem(item, (updated) => update(i, updated))}
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={add} className="w-full" type="button">
        <Plus className="w-3.5 h-3.5 mr-1.5" />
        Add {label}
      </Button>
    </div>
  )
}

// ── Section editor helpers ────────────────────────────────────────────────────

function Field({ label, children, hint }) {
  return (
    <div className="space-y-1.5">
      {label && <Label className="text-xs font-medium">{label}</Label>}
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

function ImageField({ label, value, onChange, hint }) {
  return (
    <Field label={label} hint={hint}>
      <Input value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="https://res.cloudinary.com/..." />
      {value && (
        <div className="relative mt-1.5">
          <img src={value} alt="Preview" className="h-28 w-full object-cover rounded border" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
            title="Remove image"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </Field>
  )
}

// ── Section-specific editors ──────────────────────────────────────────────────

function HeroSectionEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <Field label="Page Title">
        <Input value={data.title || ''} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Kitchen Remodeling Tampa" />
      </Field>
      <Field label="Subtitle (first paragraph)">
        <Textarea value={data.subtitle || ''} onChange={(e) => set('subtitle', e.target.value)} placeholder="Supporting text below the title" rows={3} />
      </Field>
      <Field label="Description (second paragraph)">
        <Textarea value={data.description || ''} onChange={(e) => set('description', e.target.value)} placeholder="Additional paragraph shown below the subtitle" rows={3} />
      </Field>
      <ImageField
        label="Background Image URL"
        value={data.backgroundImage}
        onChange={(v) => set('backgroundImage', v)}
        hint="Recommended: 1920×1080px. Use a Cloudinary URL."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Primary CTA Text">
          <Input value={data.ctaText || ''} onChange={(e) => set('ctaText', e.target.value)} placeholder="Get Free Estimate" />
        </Field>
        <Field label="Primary CTA Link">
          <Input value={data.ctaLink || ''} onChange={(e) => set('ctaLink', e.target.value)} placeholder="/contact" />
        </Field>
      </div>
    </div>
  )
}

function TextSectionEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <Field label="Heading">
        <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="e.g. Transform Your Kitchen" />
      </Field>
      <Field label="Body Text">
        <RichTextEditor value={data.body || ''} onChange={(v) => set('body', v)} />
      </Field>
      <ImageField
        label="Image URL (optional)"
        value={data.image}
        onChange={(v) => set('image', v)}
      />
      <Field label="Image Layout">
        <Select value={data.layout || 'full'} onValueChange={(v) => set('layout', v)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full width (no image columns)</SelectItem>
            <SelectItem value="left">Image left, text right</SelectItem>
            <SelectItem value="right">Text left, image right</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </div>
  )
}

function FeaturesSectionEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <Field label="Section Heading">
        <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="e.g. Why Choose Us" />
      </Field>
      <Field label="Subheading (optional)">
        <Input value={data.subheading || ''} onChange={(e) => set('subheading', e.target.value)} placeholder="Brief supporting line" />
      </Field>
      <div>
        <Label className="text-xs font-medium mb-2 block">Feature Items</Label>
        <ItemList
          items={data.items || []}
          onChange={(items) => set('items', items)}
          newItem={{ title: '', description: '', icon: '' }}
          label="Feature"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input value={item.title || ''} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" />
                <Input value={item.icon || ''} onChange={(e) => update({ ...item, icon: e.target.value })} placeholder="Icon name (e.g. shield)" />
              </div>
              <Textarea value={item.description || ''} onChange={(e) => update({ ...item, description: e.target.value })} placeholder="Description" rows={2} />
            </div>
          )}
        />
      </div>
    </div>
  )
}

function FAQSectionEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <Field label="Section Heading">
        <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="Frequently Asked Questions" />
      </Field>
      <div>
        <Label className="text-xs font-medium mb-2 block">Questions & Answers</Label>
        <ItemList
          items={data.items || []}
          onChange={(items) => set('items', items)}
          newItem={{ question: '', answer: '' }}
          label="FAQ"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <Input value={item.question || ''} onChange={(e) => update({ ...item, question: e.target.value })} placeholder="Question" />
              <Textarea value={item.answer || ''} onChange={(e) => update({ ...item, answer: e.target.value })} placeholder="Answer" rows={3} />
            </div>
          )}
        />
      </div>
    </div>
  )
}

function CTASectionEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <Field label="Heading">
        <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="Ready to Transform Your Space?" />
      </Field>
      <Field label="Subheading">
        <Textarea value={data.subheading || ''} onChange={(e) => set('subheading', e.target.value)} placeholder="Supporting text below the heading" rows={2} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Button Text">
          <Input value={data.buttonText || ''} onChange={(e) => set('buttonText', e.target.value)} placeholder="Get Free Estimate" />
        </Field>
        <Field label="Button Link">
          <Input value={data.buttonLink || ''} onChange={(e) => set('buttonLink', e.target.value)} placeholder="/contact" />
        </Field>
      </div>
      <ImageField
        label="Background Image URL (optional)"
        value={data.backgroundImage}
        onChange={(v) => set('backgroundImage', v)}
      />
    </div>
  )
}

function StatsSectionEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <Field label="Section Heading (optional)">
        <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="e.g. Our Track Record" />
      </Field>
      <div>
        <Label className="text-xs font-medium mb-2 block">Stats</Label>
        <ItemList
          items={data.items || []}
          onChange={(items) => set('items', items)}
          newItem={{ value: '', label: '' }}
          label="Stat"
          renderItem={(item, update) => (
            <div className="grid grid-cols-2 gap-2">
              <Input value={item.value || ''} onChange={(e) => update({ ...item, value: e.target.value })} placeholder="15+" />
              <Input value={item.label || ''} onChange={(e) => update({ ...item, label: e.target.value })} placeholder="Years Experience" />
            </div>
          )}
        />
      </div>
    </div>
  )
}

function ServicesSectionEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <Field label="Section Heading">
        <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="Our Services" />
      </Field>
      <div>
        <Label className="text-xs font-medium mb-2 block">Service Items</Label>
        <ItemList
          items={data.items || []}
          onChange={(items) => set('items', items)}
          newItem={{ title: '', description: '', icon: '', link: '', image: '' }}
          label="Service"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input value={item.title || ''} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title" />
                <Input value={item.icon || ''} onChange={(e) => update({ ...item, icon: e.target.value })} placeholder="Icon name" />
              </div>
              <Textarea value={item.description || ''} onChange={(e) => update({ ...item, description: e.target.value })} placeholder="Description" rows={2} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input value={item.link || ''} onChange={(e) => update({ ...item, link: e.target.value })} placeholder="Link (e.g. /kitchen-remodeling)" />
                <Input value={item.image || ''} onChange={(e) => update({ ...item, image: e.target.value })} placeholder="Image URL" />
              </div>
              {item.image && (
                <img src={item.image} alt="Preview" className="h-16 w-full object-cover rounded border" />
              )}
            </div>
          )}
        />
      </div>
    </div>
  )
}

function ProcessSectionEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  const steps = data.steps || []
  return (
    <div className="space-y-3">
      <Field label="Section Heading">
        <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="Our Process" />
      </Field>
      <div>
        <Label className="text-xs font-medium mb-2 block">Steps</Label>
        <ItemList
          items={steps}
          onChange={(items) =>
            set('steps', items.map((s, i) => ({ ...s, step: i + 1 })))
          }
          newItem={{ step: steps.length + 1, title: '', description: '' }}
          label="Step"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                  {item.step}
                </span>
                <Input value={item.title || ''} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Step title" className="flex-1" />
              </div>
              <Textarea value={item.description || ''} onChange={(e) => update({ ...item, description: e.target.value })} placeholder="Step description" rows={2} />
            </div>
          )}
        />
      </div>
    </div>
  )
}

function TestimonialsSectionEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <Field label="Section Heading">
        <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="What Our Clients Say" />
      </Field>
      <div>
        <Label className="text-xs font-medium mb-2 block">Reviews</Label>
        <ItemList
          items={data.items || []}
          onChange={(items) => set('items', items)}
          newItem={{ name: '', location: '', rating: 5, text: '', avatar: '' }}
          label="Review"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input value={item.name || ''} onChange={(e) => update({ ...item, name: e.target.value })} placeholder="Name (e.g. Sarah M.)" />
                <Input value={item.location || ''} onChange={(e) => update({ ...item, location: e.target.value })} placeholder="Location (e.g. Tampa, FL)" />
              </div>
              <div className="flex items-center gap-3">
                <Label className="text-xs whitespace-nowrap">Rating</Label>
                <Select
                  value={String(item.rating ?? 5)}
                  onValueChange={(v) => update({ ...item, rating: Number(v) })}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((n) => (
                      <SelectItem key={n} value={String(n)}>{n} ★</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Textarea value={item.text || ''} onChange={(e) => update({ ...item, text: e.target.value })} placeholder="Review text" rows={3} />
              <Input value={item.avatar || ''} onChange={(e) => update({ ...item, avatar: e.target.value })} placeholder="Avatar image URL (optional)" />
            </div>
          )}
        />
      </div>
    </div>
  )
}

// ── String-array list helper ──────────────────────────────────────────────────

function StringList({ items = [], onChange, label, placeholder }) {
  const add = () => onChange([...items, ''])
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))
  const update = (i, v) => onChange(items.map((item, idx) => (idx === i ? v : item)))
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <Input value={item} onChange={(e) => update(i, e.target.value)} placeholder={placeholder || `${label} text`} className="flex-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive shrink-0" onClick={() => remove(i)} type="button">
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={add} className="w-full" type="button">
        <Plus className="w-3.5 h-3.5 mr-1.5" />Add {label}
      </Button>
    </div>
  )
}

// ── New home-page section editors ─────────────────────────────────────────────

function FeatureStripEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <Label className="text-xs font-medium block">Feature Strip Items</Label>
      <ItemList
        items={data.items || []}
        onChange={(items) => set('items', items)}
        newItem={{ iconName: '', title: '', desc: '' }}
        label="Feature"
        renderItem={(item, update) => (
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Input value={item.title || ''} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Title (e.g. Wholesale Pricing)" />
              <Input value={item.iconName || ''} onChange={(e) => update({ ...item, iconName: e.target.value })} placeholder="Icon name (e.g. BadgePercent)" />
            </div>
            <Input value={item.desc || ''} onChange={(e) => update({ ...item, desc: e.target.value })} placeholder="Short description" />
          </div>
        )}
      />
    </div>
  )
}

function SolutionsEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Label (eyebrow text)">
          <Input value={data.label || ''} onChange={(e) => set('label', e.target.value)} placeholder="Our Services" />
        </Field>
        <Field label="Heading">
          <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="Complete Remodeling Solutions" />
        </Field>
      </div>
      <Field label="Description">
        <Textarea value={data.description || ''} onChange={(e) => set('description', e.target.value)} rows={2} placeholder="Intro paragraph" />
      </Field>
      <Field label="Closing Text">
        <Textarea value={data.closingText || ''} onChange={(e) => set('closingText', e.target.value)} rows={2} placeholder="Paragraph below the cards" />
      </Field>
      <div>
        <Label className="text-xs font-medium mb-2 block">Solution Items</Label>
        <ItemList
          items={data.items || []}
          onChange={(items) => set('items', items)}
          newItem={{ label: '', desc: '', image: '', href: '' }}
          label="Item"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input value={item.label || ''} onChange={(e) => update({ ...item, label: e.target.value })} placeholder="Card label" />
                <Input value={item.href || ''} onChange={(e) => update({ ...item, href: e.target.value })} placeholder="Link (e.g. /kitchen)" />
              </div>
              <Input value={item.desc || ''} onChange={(e) => update({ ...item, desc: e.target.value })} placeholder="Card description" />
              <Input value={item.image || ''} onChange={(e) => update({ ...item, image: e.target.value })} placeholder="Image URL" />
              {item.image && <img src={item.image} alt="" className="h-16 w-full object-cover rounded border" />}
            </div>
          )}
        />
      </div>
    </div>
  )
}

function ShowroomEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Label (eyebrow text)">
          <Input value={data.label || ''} onChange={(e) => set('label', e.target.value)} placeholder="Tampa Bay's Trusted Showroom" />
        </Field>
        <Field label="Heading">
          <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="Visit Our Showroom" />
        </Field>
      </div>
      <Field label="Body Text">
        <RichTextEditor value={data.body || ''} onChange={(v) => set('body', v)} />
      </Field>
      <ImageField label="Background Image URL" value={data.bgImage} onChange={(v) => set('bgImage', v)} />
    </div>
  )
}

function ServiceAreasEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Label (eyebrow text)">
          <Input value={data.label || ''} onChange={(e) => set('label', e.target.value)} placeholder="Service Coverage" />
        </Field>
        <Field label="Heading">
          <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="We proudly serve..." />
        </Field>
      </div>
      <div>
        <Label className="text-xs font-medium mb-2 block">Service Areas</Label>
        <StringList items={data.areas || []} onChange={(v) => set('areas', v)} label="Area" placeholder="e.g. Tampa" />
      </div>
    </div>
  )
}

function AffordableEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Label (eyebrow text)">
          <Input value={data.label || ''} onChange={(e) => set('label', e.target.value)} placeholder="Affordable Options" />
        </Field>
        <Field label="Heading">
          <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="Affordable Cabinets" />
        </Field>
      </div>
      <Field label="Body Text">
        <Textarea value={data.body || ''} onChange={(e) => set('body', e.target.value)} rows={3} placeholder="Description paragraph" />
      </Field>
      <ImageField label="Background Image URL" value={data.bgImage} onChange={(v) => set('bgImage', v)} />
      <div>
        <Label className="text-xs font-medium mb-2 block">Bullet Points</Label>
        <StringList items={data.items || []} onChange={(v) => set('items', v)} label="Item" placeholder="e.g. RTA cabinets starting at $99" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="CTA 1 Text">
          <Input value={data.cta1Text || ''} onChange={(e) => set('cta1Text', e.target.value)} placeholder="Visit Our Showroom" />
        </Field>
        <Field label="CTA 1 Link">
          <Input value={data.cta1Link || ''} onChange={(e) => set('cta1Link', e.target.value)} placeholder="/contact" />
        </Field>
        <Field label="CTA 2 Text">
          <Input value={data.cta2Text || ''} onChange={(e) => set('cta2Text', e.target.value)} placeholder="Request a Quote" />
        </Field>
        <Field label="CTA 2 Link">
          <Input value={data.cta2Link || ''} onChange={(e) => set('cta2Link', e.target.value)} placeholder="/contact" />
        </Field>
      </div>
    </div>
  )
}

function HowItWorksEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <Field label="Section Heading">
        <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="How It Works" />
      </Field>
      <div>
        <Label className="text-xs font-medium mb-2 block">Steps</Label>
        <ItemList
          items={data.steps || []}
          onChange={(items) => set('steps', items)}
          newItem={{ title: '', desc: '' }}
          label="Step"
          renderItem={(item, update) => (
            <div className="space-y-2">
              <Input value={item.title || ''} onChange={(e) => update({ ...item, title: e.target.value })} placeholder="Step title (e.g. Consult)" />
              <Textarea value={item.desc || ''} onChange={(e) => update({ ...item, desc: e.target.value })} rows={2} placeholder="Step description" />
            </div>
          )}
        />
      </div>
    </div>
  )
}

function TransformationEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Label (eyebrow text)">
          <Input value={data.label || ''} onChange={(e) => set('label', e.target.value)} placeholder="Before & After" />
        </Field>
        <Field label="Heading">
          <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="See Our Transformations" />
        </Field>
      </div>
      <Field label="Description">
        <Textarea value={data.description || ''} onChange={(e) => set('description', e.target.value)} rows={2} placeholder="e.g. Drag the slider to see the difference" />
      </Field>
      <ImageField label="Before Image URL" value={data.beforeImage} onChange={(v) => set('beforeImage', v)} />
      <ImageField label="After Image URL" value={data.afterImage} onChange={(v) => set('afterImage', v)} />
    </div>
  )
}

function InstallationEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Label (eyebrow text)">
          <Input value={data.label || ''} onChange={(e) => set('label', e.target.value)} placeholder="Expert Installation" />
        </Field>
        <Field label="Heading">
          <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="Professional Cabinet Installation" />
        </Field>
      </div>
      <ImageField label="Background Image URL" value={data.bgImage} onChange={(v) => set('bgImage', v)} />
      <div>
        <Label className="text-xs font-medium mb-2 block">Paragraphs</Label>
        <StringList items={data.paragraphs || []} onChange={(v) => set('paragraphs', v)} label="Paragraph" placeholder="Paragraph text" />
      </div>
    </div>
  )
}

function WhyChooseEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <Field label="Heading">
        <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="Why Homeowners Choose Us" />
      </Field>
      <Field label="Body Text">
        <Textarea value={data.body || ''} onChange={(e) => set('body', e.target.value)} rows={3} placeholder="Intro paragraph" />
      </Field>
      <div>
        <Label className="text-xs font-medium mb-2 block">Feature Bullet Points</Label>
        <StringList items={data.features || []} onChange={(v) => set('features', v)} label="Feature" placeholder="e.g. Free in-home consultation" />
      </div>
      <Field label="Closing Text">
        <Textarea value={data.closingText || ''} onChange={(e) => set('closingText', e.target.value)} rows={2} placeholder="Paragraph below the bullets" />
      </Field>
      <ImageField label="Background Image URL" value={data.bgImage} onChange={(v) => set('bgImage', v)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Address">
          <Input value={data.address || ''} onChange={(e) => set('address', e.target.value)} placeholder="106 S St Cloud Ave, Valrico, FL" />
        </Field>
        <Field label="Phone">
          <Input value={data.phone || ''} onChange={(e) => set('phone', e.target.value)} placeholder="+1 813-651-2333" />
        </Field>
        <Field label="Email">
          <Input value={data.email || ''} onChange={(e) => set('email', e.target.value)} placeholder="sales@example.com" />
        </Field>
        <Field label="Map Link">
          <Input value={data.mapLink || ''} onChange={(e) => set('mapLink', e.target.value)} placeholder="https://maps.google.com/..." />
        </Field>
      </div>
      <Field label="Business Hours">
        <Textarea value={data.hours || ''} onChange={(e) => set('hours', e.target.value)} rows={3} placeholder={'Mon – Fri: 10:00AM – 6:00PM\nSat: 10:00AM – 4:00PM\nSun: Closed'} />
      </Field>
    </div>
  )
}

function StartProjectEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <Field label="Heading">
        <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="Start Your Project Today" />
      </Field>
      <Field label="Body Text">
        <RichTextEditor value={data.body || ''} onChange={(v) => set('body', v)} />
      </Field>
      <ImageField label="Background Image URL" value={data.bgImage} onChange={(v) => set('bgImage', v)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="CTA Button Text">
          <Input value={data.ctaText || ''} onChange={(e) => set('ctaText', e.target.value)} placeholder="Visit Our Showroom" />
        </Field>
        <Field label="CTA Button Link">
          <Input value={data.ctaLink || ''} onChange={(e) => set('ctaLink', e.target.value)} placeholder="/contact" />
        </Field>
      </div>
    </div>
  )
}

function PreFooterEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <Field label="Heading">
        <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="Ready to Start Your Project?" />
      </Field>
      <Field label="Description">
        <Textarea value={data.description || ''} onChange={(e) => set('description', e.target.value)} rows={2} placeholder="Short supporting text" />
      </Field>
      <Field label="Phone Number (displayed prominently)">
        <Input value={data.phone || ''} onChange={(e) => set('phone', e.target.value)} placeholder="(813) 651-2333" />
      </Field>
      <div>
        <Label className="text-xs font-medium mb-2 block">Trust Badges</Label>
        <StringList items={data.trustItems || []} onChange={(v) => set('trustItems', v)} label="Badge" placeholder="e.g. Lowest Price" />
      </div>
    </div>
  )
}

function PartnersEditor({ data, onChange }) {
  const set = (k, v) => onChange({ ...data, [k]: v })
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Label (eyebrow text)">
          <Input value={data.label || ''} onChange={(e) => set('label', e.target.value)} placeholder="Our Partners" />
        </Field>
        <Field label="Heading">
          <Input value={data.heading || ''} onChange={(e) => set('heading', e.target.value)} placeholder="Our Trusted Partners" />
        </Field>
      </div>
      <Field label="Description">
        <Textarea value={data.description || ''} onChange={(e) => set('description', e.target.value)} rows={2} placeholder="Brands we proudly work with" />
      </Field>
      <div>
        <Label className="text-xs font-medium mb-2 block">Partner Logo URLs</Label>
        <StringList items={data.logos || []} onChange={(v) => set('logos', v)} label="Logo" placeholder="e.g. /partner/1.png" />
      </div>
    </div>
  )
}

// ── Router ────────────────────────────────────────────────────────────────────

function SectionEditorRouter({ section, onChange }) {
  const props = { data: section, onChange }
  switch (section.type) {
    case 'hero':            return <HeroSectionEditor {...props} />
    case 'text':            return <TextSectionEditor {...props} />
    case 'features':        return <FeaturesSectionEditor {...props} />
    case 'faq':             return <FAQSectionEditor {...props} />
    case 'cta':             return <CTASectionEditor {...props} />
    case 'stats':           return <StatsSectionEditor {...props} />
    case 'services':        return <ServicesSectionEditor {...props} />
    case 'process':         return <ProcessSectionEditor {...props} />
    case 'testimonials':    return <TestimonialsSectionEditor {...props} />
    case 'feature-strip':   return <FeatureStripEditor {...props} />
    case 'solutions':       return <SolutionsEditor {...props} />
    case 'showroom':        return <ShowroomEditor {...props} />
    case 'service-areas':   return <ServiceAreasEditor {...props} />
    case 'affordable':      return <AffordableEditor {...props} />
    case 'how-it-works':    return <HowItWorksEditor {...props} />
    case 'transformation':  return <TransformationEditor {...props} />
    case 'installation':    return <InstallationEditor {...props} />
    case 'why-choose':      return <WhyChooseEditor {...props} />
    case 'start-project':   return <StartProjectEditor {...props} />
    case 'pre-footer':      return <PreFooterEditor {...props} />
    case 'partners':        return <PartnersEditor {...props} />
    default:
      return (
        <p className="text-sm text-muted-foreground py-2">
          Unknown section type: <code className="bg-muted px-1 rounded">{section.type}</code>
        </p>
      )
  }
}

// ── Main SectionCard component ────────────────────────────────────────────────

export function SectionCard({ section, index, total, onChange, onMoveUp, onMoveDown, onRemove }) {
  const [isEditing, setIsEditing] = useState(false)

  const colorClass = SECTION_COLORS[section.type] || 'bg-gray-100 text-gray-700 border-gray-200'
  const label = SECTION_LABELS[section.type] || section.type

  const handleDelete = () => {
    if (window.confirm(`Delete this ${label} section?`)) onRemove()
  }

  return (
    <div className="relative group rounded-lg border overflow-hidden bg-card shadow-sm">

      {/* Visual preview */}
      <SectionPreview section={section} />

      {/* Desktop: semi-transparent overlay on hover (purely visual, no pointer events) */}
      <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors duration-150 pointer-events-none hidden md:block" />

      {/* Desktop: control bar — visible on group-hover */}
      <div className="absolute top-0 left-0 right-0 hidden md:flex items-center justify-between gap-2 px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-black/40 backdrop-blur-sm">
        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${colorClass}`}>
          {label}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="secondary"
            size="icon"
            className="h-7 w-7 bg-white/90 hover:bg-white text-foreground shadow-sm"
            onClick={onMoveUp}
            disabled={index === 0}
            type="button"
            title="Move up"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-7 w-7 bg-white/90 hover:bg-white text-foreground shadow-sm"
            onClick={onMoveDown}
            disabled={index === total - 1}
            type="button"
            title="Move down"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-7 w-7 bg-white/90 hover:bg-red-100 text-destructive shadow-sm"
            onClick={handleDelete}
            type="button"
            title="Delete section"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant={isEditing ? 'default' : 'secondary'}
            size="sm"
            className="h-7 px-3 text-xs shadow-sm"
            onClick={() => setIsEditing((e) => !e)}
            type="button"
          >
            {isEditing ? (
              <><X className="w-3 h-3 mr-1" />Close</>
            ) : (
              <><Pencil className="w-3 h-3 mr-1" />Edit</>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile: always-visible action bar */}
      <div className="md:hidden flex items-center justify-between gap-2 px-3 py-2 border-t bg-muted/10">
        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${colorClass}`}>
          {label}
        </span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onMoveUp} disabled={index === 0} type="button">
            <ChevronUp className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onMoveDown} disabled={index === total - 1} type="button">
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleDelete} type="button">
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            variant={isEditing ? 'default' : 'outline'}
            size="sm"
            className="h-8 px-3 text-xs"
            onClick={() => setIsEditing((e) => !e)}
            type="button"
          >
            {isEditing ? 'Close' : 'Edit'}
          </Button>
        </div>
      </div>

      {/* Edit drawer */}
      {isEditing && (
        <div className="border-t px-3 sm:px-4 pb-4 pt-3 bg-muted/20 space-y-4">
          <SectionEditorRouter section={section} onChange={onChange} />
          <div className="flex justify-end pt-1">
            <Button size="sm" onClick={() => setIsEditing(false)} type="button">
              <Check className="w-3.5 h-3.5 mr-1.5" />
              Done Editing
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
