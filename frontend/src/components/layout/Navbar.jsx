'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, Phone, ChefHat, Droplets, Layout, Layers, Grid3X3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { NAV_LINKS, COMPANY_PHONE, COMPANY_PHONE_DISPLAY } from '@/lib/constants'

const SERVICE_ICONS = {
  ChefHat,
  Droplets,
  Layout,
  Layers,
  Grid3X3,
}

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

  const linkActiveColor = scrolled ? 'text-white' : 'text-[#810E29]'
  const linkInactiveColor = scrolled ? 'text-white/80' : 'text-[#810E29]'
  const linkHoverColor = scrolled ? 'hover:text-white' : 'hover:text-[#810E29]'
  const hamburgerColor = scrolled
    ? 'text-white hover:bg-white/15'
    : 'text-[#810E29] hover:bg-[#810E29]/10'

  return (
    <>
      {/* ── Full-width fixed header ── */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'bg-primary shadow-lg' : 'bg-white'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
          <div className="flex items-center justify-between h-20 md:h-24">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/Logo1.jpg"
                alt="Cabinets & Remodeling Depot"
                width={220}
                height={70}
                className="h-14 md:h-18 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav — centered between logo and CTA */}
            <nav className="hidden lg:flex items-center gap-2">
              {NAV_LINKS.filter((link) => !link.hidden).map((link) => {
                if (link.children) {
                  return (
                    <div key={link.href} className="relative">
                      <button
                        className={cn(
                          'flex items-center gap-1 px-4 py-2 text-base font-semibold uppercase tracking-wide transition-colors',
                          linkHoverColor,
                          pathname.startsWith('/kitchen') ||
                          pathname.startsWith('/bathroom') ||
                          pathname.startsWith('/cabinets') ||
                          pathname.startsWith('/countertops') ||
                          pathname.startsWith('/flooring') ||
                          pathname === '/services'
                            ? linkActiveColor
                            : linkInactiveColor
                        )}
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                        onClick={() => setServicesOpen(!servicesOpen)}
                      >
                        {link.label}
                        <ChevronDown
                          className={cn(
                            'w-3.5 h-3.5 transition-transform duration-200',
                            servicesOpen && 'rotate-180'
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18 }}
                            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                          >
                            {/* Service items */}
                            {link.children.map((child) => {
                              const Icon = SERVICE_ICONS[child.icon]
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors group border-b border-gray-50 last:border-0"
                                >
                                  <span className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                    {Icon && <Icon className="w-4 h-4" />}
                                  </span>
                                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {child.title}
                                  </p>
                                </Link>
                              )
                            })}
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
                      'px-4 py-2 text-base font-semibold uppercase tracking-wide transition-colors',
                      linkHoverColor,
                      isActive(link.href) ? linkActiveColor : linkInactiveColor
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Right: CTA + hamburger */}
            <div className="flex items-center gap-3">
              <Button
                asChild
                size="default"
                className={cn(
                  'hidden md:flex bg-white text-primary hover:bg-white/90 font-bold rounded-full px-7 py-2.5 shadow-sm text-base tracking-wide uppercase',
                  !scrolled && 'border border-[#810E29]'
                )}
              >
                <Link href="/contact">Get Free Estimate</Link>
              </Button>

              {/* Hamburger — tablet & mobile */}
              <button
                className={cn('lg:hidden p-2 rounded-md transition-colors', hamburgerColor)}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer — height matches the fixed header */}
      <div className="h-20 md:h-24" />

      {/* ── Mobile / tablet drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-72 max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-4 py-3 bg-primary border-b border-white/10">
                <Image
                  src="/Logo1.jpg"
                  alt="Cabinets & Remodeling Depot"
                  width={140}
                  height={46}
                  className="h-10 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-md hover:bg-white/15 text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {NAV_LINKS.filter((link) => !link.hidden).map((link) => {
                  if (link.children) {
                    return (
                      <div key={link.href}>
                        <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {link.label}
                        </p>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3 py-2 text-sm text-muted-foreground rounded-md hover:bg-muted hover:text-foreground transition-colors uppercase tracking-wide"
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
                        'block px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wide transition-colors',
                        isActive(link.href)
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted'
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>

              {/* Bottom CTA */}
              <div className="p-4 border-t space-y-3">
                <a
                  href={`tel:${COMPANY_PHONE}`}
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  {COMPANY_PHONE_DISPLAY}
                </a>
                <Button className="w-full rounded-full uppercase tracking-wide font-bold" asChild>
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    Get Free Estimate
                  </Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
