import { DashboardStats } from '@/components/admin/DashboardStats'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { FileText, Briefcase, Image, BookOpen, Users, Settings, ArrowRight } from 'lucide-react'

export const metadata = { title: 'Dashboard' }

const QUICK_LINKS = [
  { title: 'Edit Pages', description: 'Update hero, content, FAQs, and SEO for any page', href: '/admin/pages', icon: FileText, color: 'text-primary bg-primary/10' },
  { title: 'Manage Projects', description: 'Add and edit completed remodeling projects', href: '/admin/projects', icon: Briefcase, color: 'text-primary bg-primary/10' },
  { title: 'Gallery', description: 'Upload and organize gallery images by category', href: '/admin/gallery', icon: Image, color: 'text-primary bg-primary/10' },
  { title: 'Blog Posts', description: 'Create and publish blog articles', href: '/admin/blogs', icon: BookOpen, color: 'text-primary bg-primary/10' },
  { title: 'View Leads', description: 'Review and respond to customer inquiries', href: '/admin/leads', icon: Users, color: 'text-primary bg-primary/10' },
  { title: 'Settings', description: 'Update company info, contact details, and social links', href: '/admin/settings', icon: Settings, color: 'text-primary bg-primary/10' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s an overview of your website.</p>
      </div>

      <DashboardStats />

      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-lg ${link.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                    <CardTitle className="text-base">{link.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{link.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
