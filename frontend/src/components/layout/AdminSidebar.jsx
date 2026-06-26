'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Image,
  BookOpen,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { COMPANY_NAME } from '@/lib/constants'

const NAV_ITEMS = [
  {
    group: 'Content',
    items: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
      { label: 'Pages', href: '/admin/pages', icon: FileText },
      { label: 'Projects', href: '/admin/projects', icon: Briefcase },
      { label: 'Gallery', href: '/admin/gallery', icon: Image },
      { label: 'Blog Posts', href: '/admin/blogs', icon: BookOpen },
    ],
  },
  {
    group: 'Business',
    items: [
      { label: 'Leads', href: '/admin/leads', icon: Users },
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
]

function SidebarContent({ collapsed, setMobileOpen, isActive, user, handleLogout }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn('flex items-center h-16 px-4 border-b', collapsed ? 'justify-center' : 'gap-3')}>
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
          <Home className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <span className="font-semibold text-sm leading-tight">Admin Panel</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {NAV_ITEMS.map((group) => (
          <div key={group.group} className="mb-6">
            {!collapsed && (
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-2">
                {group.group}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors',
                        collapsed ? 'justify-center' : '',
                        active
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User / Logout */}
      <div className={cn('border-t p-3', collapsed ? 'items-center' : '')}>
        {!collapsed && user && (
          <div className="px-2 mb-2">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className={cn('w-full text-muted-foreground hover:text-destructive', collapsed ? 'justify-center' : 'justify-start gap-2')}
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  )
}

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out successfully')
    router.push('/admin/login')
  }

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-64 max-w-[85vw] bg-background border-r z-50 md:hidden"
            >
              <SidebarContent
                collapsed={collapsed}
                setMobileOpen={setMobileOpen}
                isActive={isActive}
                user={user}
                handleLogout={handleLogout}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden md:flex flex-col h-full border-r bg-background transition-all duration-300 shrink-0',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <SidebarContent
          collapsed={collapsed}
          setMobileOpen={setMobileOpen}
          isActive={isActive}
          user={user}
          handleLogout={handleLogout}
        />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>
    </>
  )
}
