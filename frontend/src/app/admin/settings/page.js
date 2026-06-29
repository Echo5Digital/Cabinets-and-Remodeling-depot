'use client'

import { useState, useEffect } from 'react'
import { useSettings, useUpdateSettings } from '@/hooks/useSettings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Save } from 'lucide-react'
import { toast } from 'sonner'

// ── Default navigation data (mirrors constants.js + Footer.jsx hardcoded arrays) ─
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

export default function AdminSettingsPage() {
  const { data: settings, isLoading } = useSettings()
  const { mutate: updateSettings, isPending } = useUpdateSettings()

  const [form, setForm] = useState({
    companyName: '',
    tagline: '',
    phone: '',
    email: '',
    address: '',
    facebook: '',
    instagram: '',
    youtube: '',
    googleAnalyticsId: '',
    googleMapsEmbedUrl: '',
    siteMetaTitle: '',
    siteMetaDescription: '',
    navLinks: DEFAULT_NAV_LINKS,
    navServiceItems: DEFAULT_NAV_SERVICE_ITEMS,
    footerLinks: DEFAULT_FOOTER_LINKS,
    footerServices: DEFAULT_FOOTER_SERVICES,
  })

  useEffect(() => {
    if (settings) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((prev) => ({
        ...prev,
        companyName: settings.companyName || '',
        tagline: settings.tagline || '',
        phone: settings.phone || '',
        email: settings.email || '',
        address: settings.address || '',
        facebook: settings.facebook || '',
        instagram: settings.instagram || '',
        youtube: settings.youtube || '',
        googleAnalyticsId: settings.googleAnalyticsId || '',
        googleMapsEmbedUrl: settings.googleMapsEmbedUrl || '',
        siteMetaTitle: settings.siteMetaTitle || '',
        siteMetaDescription: settings.siteMetaDescription || '',
        navLinks: Array.isArray(settings.navLinks) && settings.navLinks.length
          ? settings.navLinks
          : DEFAULT_NAV_LINKS,
        navServiceItems: Array.isArray(settings.navServiceItems) && settings.navServiceItems.length
          ? settings.navServiceItems
          : DEFAULT_NAV_SERVICE_ITEMS,
        footerLinks: Array.isArray(settings.footerLinks) && settings.footerLinks.length
          ? settings.footerLinks
          : DEFAULT_FOOTER_LINKS,
        footerServices: Array.isArray(settings.footerServices) && settings.footerServices.length
          ? settings.footerServices
          : DEFAULT_FOOTER_SERVICES,
      }))
    }
  }, [settings])

  const handleSave = () => {
    const settingsArray = Object.entries(form).map(([key, value]) => ({ key, value }))
    updateSettings(settingsArray, {
      onSuccess: () => toast.success('Settings saved successfully'),
      onError: () => toast.error('Failed to save settings'),
    })
  }

  // ── Array field helpers ───────────────────────────────────────────────────
  const updateNavLink = (idx, field, val) =>
    setForm((prev) => ({
      ...prev,
      navLinks: prev.navLinks.map((item, i) => (i === idx ? { ...item, [field]: val } : item)),
    }))

  const updateNavServiceItem = (idx, field, val) =>
    setForm((prev) => ({
      ...prev,
      navServiceItems: prev.navServiceItems.map((item, i) => (i === idx ? { ...item, [field]: val } : item)),
    }))

  const updateFooterLink = (idx, field, val) =>
    setForm((prev) => ({
      ...prev,
      footerLinks: prev.footerLinks.map((item, i) => (i === idx ? { ...item, [field]: val } : item)),
    }))

  const updateFooterService = (idx, field, val) =>
    setForm((prev) => ({
      ...prev,
      footerServices: prev.footerServices.map((item, i) => (i === idx ? { ...item, [field]: val } : item)),
    }))

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  const f = (key) => ({
    value: form[key] || '',
    onChange: (e) => setForm((prev) => ({ ...prev, [key]: e.target.value })),
  })

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage global site information and integrations</p>
      </div>

      <div className="space-y-6">
        {/* Company Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Company Information</CardTitle>
            <CardDescription>Used throughout the website and email templates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input {...f('companyName')} placeholder="Cabinets & Remodeling Depot" />
              </div>
              <div className="space-y-2">
                <Label>Tagline</Label>
                <Input {...f('tagline')} placeholder="Tampa Bay's Premier Remodeling Company" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input {...f('phone')} placeholder="+1 813-651-2333" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input {...f('email')} placeholder="sales@cabinetsandremodelingdepot.com" type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input {...f('address')} placeholder="106 S St Cloud Ave, Valrico, FL 33594" />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Social Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Facebook URL</Label>
              <Input {...f('facebook')} placeholder="https://facebook.com/yourpage" />
            </div>
            <div className="space-y-2">
              <Label>Instagram URL</Label>
              <Input {...f('instagram')} placeholder="https://instagram.com/yourhandle" />
            </div>
            <div className="space-y-2">
              <Label>YouTube URL</Label>
              <Input {...f('youtube')} placeholder="https://youtube.com/yourchannel" />
            </div>
          </CardContent>
        </Card>

        {/* SEO */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Default SEO</CardTitle>
            <CardDescription>Used as fallback when individual pages don&apos;t have SEO set</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Meta Title</Label>
              <Input {...f('siteMetaTitle')} placeholder="Company Name | City Remodeling" />
            </div>
            <div className="space-y-2">
              <Label>Default Meta Description</Label>
              <Textarea {...f('siteMetaDescription')} placeholder="Site-wide default description..." rows={3} />
            </div>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Integrations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Google Analytics ID</Label>
              <Input {...f('googleAnalyticsId')} placeholder="G-XXXXXXXXXX" />
            </div>
            <div className="space-y-2">
              <Label>Google Maps Embed URL</Label>
              <Input {...f('googleMapsEmbedUrl')} placeholder="https://maps.google.com/maps?..." />
            </div>
          </CardContent>
        </Card>

        {/* ── Header Navigation ────────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Header Navigation</CardTitle>
            <CardDescription>
              Edit the display labels and destination URLs for each navigation link. Logos cannot be changed here.
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
                    <Input
                      value={item.label}
                      onChange={(e) => updateNavLink(i, 'label', e.target.value)}
                      placeholder="Display Label"
                      aria-label={`Nav link ${i + 1} label`}
                    />
                    <Input
                      value={item.href}
                      onChange={(e) => updateNavLink(i, 'href', e.target.value)}
                      placeholder="/page-url"
                      aria-label={`Nav link ${i + 1} URL`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Services dropdown items */}
            <div>
              <p className="text-sm font-semibold mb-1">Services Dropdown Items</p>
              <p className="text-xs text-muted-foreground mb-3">These appear in the Services dropdown menu.</p>
              <div className="hidden sm:grid sm:grid-cols-2 gap-3 px-1 pb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Display Name</span>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Destination URL</span>
              </div>
              <div className="divide-y">
                {form.navServiceItems.map((item, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-3">
                    <Input
                      value={item.title}
                      onChange={(e) => updateNavServiceItem(i, 'title', e.target.value)}
                      placeholder="Service Name"
                      aria-label={`Service item ${i + 1} name`}
                    />
                    <Input
                      value={item.href}
                      onChange={(e) => updateNavServiceItem(i, 'href', e.target.value)}
                      placeholder="/service-url"
                      aria-label={`Service item ${i + 1} URL`}
                    />
                  </div>
                ))}
              </div>
            </div>

          </CardContent>
        </Card>

        {/* ── Footer Links ─────────────────────────────────────────────────── */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Footer Links</CardTitle>
            <CardDescription>
              Edit the links shown in the footer&apos;s &quot;Useful Links&quot; and &quot;Our Services&quot; columns. Logos cannot be changed here.
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
                    <Input
                      value={item.label}
                      onChange={(e) => updateFooterLink(i, 'label', e.target.value)}
                      placeholder="Display Label"
                      aria-label={`Footer link ${i + 1} label`}
                    />
                    <Input
                      value={item.href}
                      onChange={(e) => updateFooterLink(i, 'href', e.target.value)}
                      placeholder="/page-url"
                      aria-label={`Footer link ${i + 1} URL`}
                    />
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
                    <Input
                      value={item.label}
                      onChange={(e) => updateFooterService(i, 'label', e.target.value)}
                      placeholder="Display Label"
                      aria-label={`Footer service ${i + 1} label`}
                    />
                    <Input
                      value={item.href}
                      onChange={(e) => updateFooterService(i, 'href', e.target.value)}
                      placeholder="/service-url"
                      aria-label={`Footer service ${i + 1} URL`}
                    />
                  </div>
                ))}
              </div>
            </div>

          </CardContent>
        </Card>

      </div>

      <div className="pt-4 border-t">
        <Button onClick={handleSave} disabled={isPending} size="lg">
          <Save className="w-4 h-4 mr-2" />
          {isPending ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  )
}
