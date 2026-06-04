'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { NAV_LINKS, COMPANY_PHONE } from '@/lib/constants'

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [pathname])

  const isActive = (href) => pathname === href

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-primary shadow-lg'
            : 'bg-primary backdrop-blur-sm'
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <span className="text-primary font-bold text-sm">C&R</span>
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-sm leading-tight text-white">Cabinets &amp; Remodeling</p>
                <p className="text-xs text-white/70">Depot</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                if (link.children) {
                  return (
                    <div key={link.href} className="relative">
                      <button
                        className={cn(
                          'flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-white',
                          pathname.startsWith('/kitchen') || pathname.startsWith('/bathroom') || pathname.startsWith('/cabinets') || pathname.startsWith('/countertops') || pathname.startsWith('/flooring') || pathname === '/services'
                            ? 'text-white'
                            : 'text-white/85'
                        )}
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                        onClick={() => setServicesOpen(!servicesOpen)}
                      >
                        {link.label}
                        <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', servicesOpen && 'rotate-180')} />
                      </button>

                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border py-2 z-50"
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                          >
                            <Link
                              href="/services"
                              className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary border-b mb-1"
                            >
                              All Services
                            </Link>
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary"
                              >
                                {child.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-white',
                      isActive(link.href) ? 'text-white' : 'text-white/85'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <a
                href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`}
                className="hidden md:flex items-center gap-2 text-sm font-medium text-white/85 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                {COMPANY_PHONE}
              </a>
              <Button asChild size="sm" className="hidden md:flex bg-white text-primary hover:bg-white/90 font-semibold">
                <Link href="/contact">Free Estimate</Link>
              </Button>
              <button
                className="lg:hidden p-2 rounded-md hover:bg-white/10 text-white"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16 md:h-20" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-72 max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <p className="font-bold">Menu</p>
                <button onClick={() => setMobileOpen(false)} className="p-1 rounded-md hover:bg-muted">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {NAV_LINKS.map((link) => {
                  if (link.children) {
                    return (
                      <div key={link.href}>
                        <p className="px-3 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                          {link.label}
                        </p>
                        <Link href="/services" className="block px-3 py-2 text-sm rounded-md hover:bg-muted" onClick={() => setMobileOpen(false)}>
                          All Services
                        </Link>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3 py-2 text-sm text-muted-foreground rounded-md hover:bg-muted hover:text-foreground"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )
                  }
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        isActive(link.href) ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
              <div className="p-4 border-t space-y-3">
                <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} className="flex items-center gap-2 text-sm font-medium">
                  <Phone className="w-4 h-4 text-primary" />
                  {COMPANY_PHONE}
                </a>
                <Button className="w-full" asChild>
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>Get Free Estimate</Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
