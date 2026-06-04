import { AdminSidebar } from '@/components/layout/AdminSidebar'

export const metadata = {
  title: { default: 'Admin', template: '%s | Admin — Cabinets & Remodeling Depot' },
}

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  )
}
