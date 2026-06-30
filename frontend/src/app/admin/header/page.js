'use client'

import { useState, useEffect } from 'react'
import { useSettings, useUpdateSettings } from '@/hooks/useSettings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Save, ChevronDown } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

const DEFAULT_NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/showroom-gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const DEFAULT_NAV_SERVICE_ITEMS = [
  { title: 'Countertops', href: '/countertops-tampa' },
  { title: 'Kitchen Cabinets', href: '/kitchen-cabinets-tampa' },
  { title: 'Kitchen Remodeling', href: '/kitchen-remodeling-tampa' },
  { title: 'Flooring', href: '/flooring-in-tampa' },
  { title: 'Bathroom Remodeling', href: '/bathroom-remodeling-tampa' },
]

function HeaderPreview({ navLinks, serviceItems }) {
  return (
    <div className="border rounded-lg shadow-sm bg-white overflow-x-auto">
      {/* Desktop preview */}
      <div className="min-w-[640px] px-6 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="shrink-0">
          <Image
            src="/Logo1.jpg"
            alt="Logo"
            width={140}
            height={44}
            className="h-11 w-auto object-contain"
          />
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-0.5 flex-wrap">
          {navLinks.map((link, i) => (
            <span
              key={i}
              className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#810E29] font-montserrat whitespace-nowrap"
            >
              {link.label || `Link ${i + 1}`}
            </span>
          ))}
          {/* Services dropdown indicator */}
          <span className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#810E29] font-montserrat flex items-center gap-1 whitespace-nowrap">
            Services
            <ChevronDown className="w-3 h-3" />
          </span>
        </nav>

        {/* CTA */}
        <span className="shrink-0 text-[11px] font-bold border border-[#810E29] text-[#810E29] rounded-full px-4 py-1.5 uppercase tracking-widest whitespace-nowrap font-montserrat">
          Get Free Estimate
        </span>
      </div>

      {/* Mobile hint */}
      <div className="border-t bg-gray-50 px-4 py-2 flex items-center gap-2 min-w-[640px]">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">Mobile:</span>
        <div className="flex items-center gap-1 flex-wrap">
          {navLinks.map((link, i) => (
            <span key={i} className="text-[10px] bg-primary/10 text-primary rounded px-2 py-0.5 font-semibold">
              {link.label || `Link ${i + 1}`}
            </span>
          ))}
          <span className="text-[10px] bg-primary/10 text-primary rounded px-2 py-0.5 font-semibold">
            Services ▾
          </span>
        </div>
      </div>
    </div>
  )
}

export default function AdminHeaderPage() {
  const { data: settings, isLoading } = useSettings()
  const { mutate: updateSettings, isPending } = useUpdateSettings()

  const [form, setForm] = useState({
    navLinks: DEFAULT_NAV_LINKS,
    navServiceItems: DEFAULT_NAV_SERVICE_ITEMS,
  })

  useEffect(() => {
    if (settings) {
      setForm({
        navLinks:
          Array.isArray(settings.navLinks) && settings.navLinks.length
            ? settings.navLinks
            : DEFAULT_NAV_LINKS,
        navServiceItems:
          Array.isArray(settings.navServiceItems) && settings.navServiceItems.length
            ? settings.navServiceItems
            : DEFAULT_NAV_SERVICE_ITEMS,
      })
    }
  }, [settings])

  const updateNavLink = (idx, field, val) =>
    setForm((prev) => ({
      ...prev,
      navLinks: prev.navLinks.map((item, i) => (i === idx ? { ...item, [field]: val } : item)),
    }))

  const updateNavServiceItem = (idx, field, val) =>
    setForm((prev) => ({
      ...prev,
      navServiceItems: prev.navServiceItems.map((item, i) =>
        i === idx ? { ...item, [field]: val } : item
      ),
    }))

  const handleSave = () => {
    const settingsArray = [
      { key: 'navLinks', value: form.navLinks },
      { key: 'navServiceItems', value: form.navServiceItems },
    ]
    updateSettings(settingsArray, {
      onSuccess: () => toast.success('Header settings saved'),
      onError: () => toast.error('Failed to save header settings'),
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-4xl">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page heading */}
      <div>
        <h1 className="text-3xl font-bold">Header</h1>
        <p className="text-muted-foreground mt-1">
          Edit header navigation links. Changes save directly to the live site.
        </p>
      </div>

      {/* TOP: Live Preview */}
      <div>
        <p className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
          Live Preview
        </p>
        <HeaderPreview navLinks={form.navLinks} serviceItems={form.navServiceItems} />
        <p className="text-xs text-muted-foreground mt-2">
          Preview updates as you edit. Scroll right on small screens to see the full header.
        </p>
      </div>

      {/* BOTTOM: Edit Fields */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Navigation Links</CardTitle>
          <CardDescription>
            Edit the display labels and destination URLs for each navigation item.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Top-level nav links */}
          <div>
            <p className="text-sm font-semibold mb-3">Top Navigation Links</p>
            <div className="hidden sm:grid sm:grid-cols-2 gap-3 px-1 pb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Display Label</span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Destination URL</span>
            </div>
            <div className="divide-y">
              {form.navLinks.map((item, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-3">
                  <div className="space-y-1">
                    <Label className="sm:hidden text-xs text-muted-foreground">Display Label</Label>
                    <Input
                      value={item.label}
                      onChange={(e) => updateNavLink(i, 'label', e.target.value)}
                      placeholder="Display Label"
                      aria-label={`Nav link ${i + 1} label`}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="sm:hidden text-xs text-muted-foreground">Destination URL</Label>
                    <Input
                      value={item.href}
                      onChange={(e) => updateNavLink(i, 'href', e.target.value)}
                      placeholder="/page-url"
                      aria-label={`Nav link ${i + 1} URL`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services dropdown items */}
          <div>
            <p className="text-sm font-semibold mb-1">Services Dropdown Items</p>
            <p className="text-xs text-muted-foreground mb-3">
              These appear in the Services dropdown menu in the header.
            </p>
            <div className="hidden sm:grid sm:grid-cols-2 gap-3 px-1 pb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Display Name</span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Destination URL</span>
            </div>
            <div className="divide-y">
              {form.navServiceItems.map((item, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-3">
                  <div className="space-y-1">
                    <Label className="sm:hidden text-xs text-muted-foreground">Display Name</Label>
                    <Input
                      value={item.title}
                      onChange={(e) => updateNavServiceItem(i, 'title', e.target.value)}
                      placeholder="Service Name"
                      aria-label={`Service item ${i + 1} name`}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="sm:hidden text-xs text-muted-foreground">Destination URL</Label>
                    <Input
                      value={item.href}
                      onChange={(e) => updateNavServiceItem(i, 'href', e.target.value)}
                      placeholder="/service-url"
                      aria-label={`Service item ${i + 1} URL`}
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
