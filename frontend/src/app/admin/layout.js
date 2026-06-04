import { AdminLayoutClient } from './AdminLayoutClient'

export const metadata = {
  title: { default: 'Admin', template: '%s | Admin — Cabinets & Remodeling Depot' },
}

export default function AdminLayout({ children }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
