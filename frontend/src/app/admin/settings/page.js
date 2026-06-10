'use client'

import { useState, useEffect, useRef } from 'react'
import { useSettings, useUpdateSettings, useUploadSettingImage } from '@/hooks/useSettings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Save, Upload } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminSettingsPage() {
  const { data: settings, isLoading } = useSettings()
  const { mutate: updateSettings, isPending } = useUpdateSettings()
  const { mutate: uploadImage, isPending: isUploading } = useUploadSettingImage()

  const blogListingRef = useRef()
  const blogPostRef = useRef()

  const [bannerPreviews, setBannerPreviews] = useState({
    blogListingBannerImage: '',
    blogDefaultBannerImage: '',
  })

  useEffect(() => {
    if (settings) {
      setBannerPreviews({
        blogListingBannerImage: settings.blogListingBannerImage || '',
        blogDefaultBannerImage: settings.blogDefaultBannerImage || '',
      })
    }
  }, [settings])

  const handleBannerUpload = (key, file) => {
    if (!file) return
    const preview = URL.createObjectURL(file)
    setBannerPreviews((prev) => ({ ...prev, [key]: preview }))
    uploadImage(
      { key, file, group: 'banners' },
      {
        onSuccess: () => toast.success('Banner image updated!'),
        onError: () => {
          toast.error('Failed to upload image')
          setBannerPreviews((prev) => ({ ...prev, [key]: settings?.[key] || '' }))
        },
      }
    )
  }

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
  })

  useEffect(() => {
    if (settings) {
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
      }))
    }
  }, [settings])

  const handleSave = () => {
    const settingsArray = Object.entries(form).map(([key, value]) => ({
      key,
      value,
    }))

    updateSettings(settingsArray, {
      onSuccess: () => toast.success('Settings saved successfully'),
      onError: () => toast.error('Failed to save settings'),
    })
  }

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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input {...f('companyName')} placeholder="Cabinets & Remodeling Depot" />
              </div>
              <div className="space-y-2">
                <Label>Tagline</Label>
                <Input {...f('tagline')} placeholder="Tampa Bay's Premier Remodeling Company" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input {...f('phone')} placeholder="(813) 555-0100" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input {...f('email')} placeholder="info@company.com" type="email" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input {...f('address')} placeholder="123 Main Street, Valrico, FL 33594" />
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

        {/* Page Banners */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Page Banners</CardTitle>
            <CardDescription>Hero background images for blog pages. Defaults to the site's standard banner if not set.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Blog Listing Banner */}
            <div className="space-y-3">
              <Label>Blog Listing Page Banner</Label>
              <p className="text-xs text-muted-foreground">Shown on the /blog page behind the "Remodeling Tips & Ideas" heading.</p>
              {bannerPreviews.blogListingBannerImage && (
                <img
                  src={bannerPreviews.blogListingBannerImage}
                  alt="Blog listing banner"
                  className="w-full max-h-40 object-cover rounded-md border"
                />
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isUploading}
                onClick={() => blogListingRef.current?.click()}
              >
                <Upload className="w-3.5 h-3.5 mr-2" />
                {bannerPreviews.blogListingBannerImage ? 'Change Image' : 'Upload Image'}
              </Button>
              <input
                ref={blogListingRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleBannerUpload('blogListingBannerImage', e.target.files?.[0])}
              />
            </div>

            <div className="border-t pt-6 space-y-3">
              <Label>Blog Post Default Banner</Label>
              <p className="text-xs text-muted-foreground">Used as the banner on individual blog posts that don't have their own cover image.</p>
              {bannerPreviews.blogDefaultBannerImage && (
                <img
                  src={bannerPreviews.blogDefaultBannerImage}
                  alt="Blog post default banner"
                  className="w-full max-h-40 object-cover rounded-md border"
                />
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isUploading}
                onClick={() => blogPostRef.current?.click()}
              >
                <Upload className="w-3.5 h-3.5 mr-2" />
                {bannerPreviews.blogDefaultBannerImage ? 'Change Image' : 'Upload Image'}
              </Button>
              <input
                ref={blogPostRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleBannerUpload('blogDefaultBannerImage', e.target.files?.[0])}
              />
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
