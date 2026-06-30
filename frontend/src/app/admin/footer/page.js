'use client'

import { useState, useEffect } from 'react'
import { useSettings, useUpdateSettings } from '@/hooks/useSettings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Save } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'
import { COMPANY_NAME, COMPANY_PHONE_DISPLAY, COMPANY_EMAIL, COMPANY_ADDRESS } from '@/lib/constants'

const DEFAULT_FOOTER_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/showroom-gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
]

const DEFAULT_FOOTER_SERVICES = [
  { label: 'Countertops', href: '/countertops-tampa' },
  { label: 'Kitchen Cabinets', href: '/kitchen-cabinets-tampa' },
  { label: 'Kitchen Remodeling', href: '/kitchen-remodeling-tampa' },
  { label: 'Flooring', href: '/flooring-in-tampa' },
  { label: 'Bathroom Remodeling', href: '/bathroom-remodeling-tampa' },
]

function FooterPreview({ footerLinks, footerServices, settings }) {
  const companyName = settings?.companyName || COMPANY_NAME
  const phone       = settings?.phone       || COMPANY_PHONE_DISPLAY
  const email       = settings?.email       || COMPANY_EMAIL
  const address     = settings?.address     || COMPANY_ADDRESS

  return (
    <div
      className="rounded-lg overflow-x-auto"
      style={{
        backgroundColor: '#0d0d0d',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    >
      <div className="min-w-[640px] p-6">
        <div className="grid grid-cols-4 gap-6 text-white/80 text-xs">

          {/* Col 1 — About */}
          <div>
            <div className="mb-3">
              <Image
                src="/Logo1.jpg"
                alt="Logo"
                width={120}
                height={38}
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="mb-3">
              <p className="text-[11px] font-bold text-white uppercase tracking-widest">
                ABOUT <span className="text-primary">US</span>
              </p>
              <div className="w-6 h-0.5 bg-primary mt-1.5 rounded-full" />
            </div>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Since 2005, designing &amp; supplying kitchen and bath cabinets in Tampa, FL.
            </p>
          </div>

          {/* Col 2 — Useful Links */}
          <div>
            <div className="mb-3">
              <p className="text-[11px] font-bold text-white uppercase tracking-widest">
                USEFUL <span className="text-primary">LINKS</span>
              </p>
              <div className="w-6 h-0.5 bg-primary mt-1.5 rounded-full" />
            </div>
            <ul className="space-y-1.5">
              {footerLinks.map((link, i) => (
                <li key={i} className="text-[11px] text-white/60">
                  {link.label || `Link ${i + 1}`}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Our Services */}
          <div>
            <div className="mb-3">
              <p className="text-[11px] font-bold text-white uppercase tracking-widest">
                OUR <span className="text-primary">SERVICES</span>
              </p>
              <div className="w-6 h-0.5 bg-primary mt-1.5 rounded-full" />
            </div>
            <ul className="space-y-1.5">
              {footerServices.map((link, i) => (
                <li key={i} className="text-[11px] text-white/60">
                  {link.label || `Service ${i + 1}`}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <div className="mb-3">
              <p className="text-[11px] font-bold text-white uppercase tracking-widest">
                CONTACT <span className="text-primary">HERE</span>
              </p>
              <div className="w-6 h-0.5 bg-primary mt-1.5 rounded-full" />
            </div>
            <ul className="space-y-1.5 text-[11px] text-white/60">
              <li><span className="text-white font-semibold">Address: </span>{address}</li>
              <li><span className="text-white font-semibold">Phone: </span>{phone}</li>
              <li><span className="text-white font-semibold">Mail: </span>{email}</li>
              <li>
                <span className="text-white font-semibold">Timing:</span>
                <div className="mt-0.5 space-y-0.5">
                  <p>Mon – Fri: 10:00AM – 6:00PM</p>
                  <p>Sat: 10:00AM – 4:00PM</p>
                  <p>Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-6 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-[10px] text-white/40">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <p className="text-[10px] text-white/40">
            Proudly serving Tampa Bay, Hillsborough, and Pinellas Counties
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AdminFooterPage() {
  const { data: settings, isLoading } = useSettings()
  const { mutate: updateSettings, isPending } = useUpdateSettings()

  const [form, setForm] = useState({
    footerLinks: DEFAULT_FOOTER_LINKS,
    footerServices: DEFAULT_FOOTER_SERVICES,
  })

  useEffect(() => {
    if (settings) {
      setForm({
        footerLinks:
          Array.isArray(settings.footerLinks) && settings.footerLinks.length
            ? settings.footerLinks
            : DEFAULT_FOOTER_LINKS,
        footerServices:
          Array.isArray(settings.footerServices) && settings.footerServices.length
            ? settings.footerServices
            : DEFAULT_FOOTER_SERVICES,
      })
    }
  }, [settings])

  const updateFooterLink = (idx, field, val) =>
    setForm((prev) => ({
      ...prev,
      footerLinks: prev.footerLinks.map((item, i) => (i === idx ? { ...item, [field]: val } : item)),
    }))

  const updateFooterService = (idx, field, val) =>
    setForm((prev) => ({
      ...prev,
      footerServices: prev.footerServices.map((item, i) =>
        i === idx ? { ...item, [field]: val } : item
      ),
    }))

  const handleSave = () => {
    const settingsArray = [
      { key: 'footerLinks', value: form.footerLinks },
      { key: 'footerServices', value: form.footerServices },
    ]
    updateSettings(settingsArray, {
      onSuccess: () => toast.success('Footer settings saved'),
      onError: () => toast.error('Failed to save footer settings'),
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-4xl">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page heading */}
      <div>
        <h1 className="text-3xl font-bold">Footer</h1>
        <p className="text-muted-foreground mt-1">
          Edit footer navigation links. Changes save directly to the live site.
        </p>
      </div>

      {/* TOP: Live Preview */}
      <div>
        <p className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
          Live Preview
        </p>
        <FooterPreview
          footerLinks={form.footerLinks}
          footerServices={form.footerServices}
          settings={settings}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Preview updates as you edit. Scroll right on small screens to see the full footer.
        </p>
      </div>

      {/* BOTTOM: Edit Fields */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Footer Links</CardTitle>
          <CardDescription>
            Edit the display labels and destination URLs shown in the footer columns.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Useful Links column */}
          <div>
            <p className="text-sm font-semibold mb-3">&ldquo;Useful Links&rdquo; Column</p>
            <div className="hidden sm:grid sm:grid-cols-2 gap-3 px-1 pb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Display Label</span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Destination URL</span>
            </div>
            <div className="divide-y">
              {form.footerLinks.map((item, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-3">
                  <div className="space-y-1">
                    <Label className="sm:hidden text-xs text-muted-foreground">Display Label</Label>
                    <Input
                      value={item.label}
                      onChange={(e) => updateFooterLink(i, 'label', e.target.value)}
                      placeholder="Display Label"
                      aria-label={`Footer link ${i + 1} label`}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="sm:hidden text-xs text-muted-foreground">Destination URL</Label>
                    <Input
                      value={item.href}
                      onChange={(e) => updateFooterLink(i, 'href', e.target.value)}
                      placeholder="/page-url"
                      aria-label={`Footer link ${i + 1} URL`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Our Services column */}
          <div>
            <p className="text-sm font-semibold mb-3">&ldquo;Our Services&rdquo; Column</p>
            <div className="hidden sm:grid sm:grid-cols-2 gap-3 px-1 pb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Display Label</span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Destination URL</span>
            </div>
            <div className="divide-y">
              {form.footerServices.map((item, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-3">
                  <div className="space-y-1">
                    <Label className="sm:hidden text-xs text-muted-foreground">Display Label</Label>
                    <Input
                      value={item.label}
                      onChange={(e) => updateFooterService(i, 'label', e.target.value)}
                      placeholder="Display Label"
                      aria-label={`Footer service ${i + 1} label`}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="sm:hidden text-xs text-muted-foreground">Destination URL</Label>
                    <Input
                      value={item.href}
                      onChange={(e) => updateFooterService(i, 'href', e.target.value)}
                      placeholder="/service-url"
                      aria-label={`Footer service ${i + 1} URL`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Save */}
      <div className="pt-4 border-t">
        <Button onClick={handleSave} disabled={isPending} size="lg">
          <Save className="w-4 h-4 mr-2" />
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}
