'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Sparkles, LayoutGrid, Palette, Box, ArrowRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CATALOG_URL = 'https://cabinet-catalog-platform.vercel.app/catalog/design'
const SESSION_KEY = 'designKitchenPopupSeen'
const SHOW_DELAY_MS = 2500

const FEATURES = [
  { icon: LayoutGrid, label: 'Pick your layout' },
  { icon: Palette, label: 'Choose finishes' },
  { icon: Box, label: 'Preview design' },
]

export function DesignKitchenPopup() {
  const [open, setOpen] = useState(false)
  const ctaRef = useRef(null)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  const handleOpenChange = (next) => {
    setOpen(next)
    if (!next) sessionStorage.setItem(SESSION_KEY, '1')
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-sm sm:max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            ctaRef.current?.focus()
          }}
        >
          {/* ── Image header with brand-tinted wash instead of a flat black scrim ── */}
          <div className="relative h-40 sm:h-48 w-full">
            <Image
              src="/cabinet-remodeling-catalog.webp"
              alt="Design your dream kitchen tool"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 448px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/0 to-transparent" />

            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-primary shadow-sm ring-1 ring-black/5">
              <Sparkles className="w-3.5 h-3.5" />
              Free Design Tool
            </span>

            <DialogPrimitive.Close
              className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm text-foreground/70 shadow-sm ring-1 ring-black/5 transition-colors hover:bg-white hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </DialogPrimitive.Close>
          </div>

          <div className="px-6 sm:px-8 pb-7 sm:pb-8 pt-5 text-center">
            <DialogPrimitive.Title className="text-2xl sm:text-[1.75rem] font-bold leading-tight tracking-tight">
              <span className="text-foreground">Design Your</span>{' '}
              <span className="text-primary">Kitchen, Yourself</span>
            </DialogPrimitive.Title>

            <DialogPrimitive.Description className="mt-2.5 text-sm text-muted-foreground leading-relaxed max-w-[26rem] mx-auto">
              See your dream kitchen come to life in 3D before you commit to a
              single thing&mdash;free, no obligation.
            </DialogPrimitive.Description>

            {/* Feature row — brand-tinted chips instead of flat gray */}
            <div className="mt-6 grid grid-cols-3 gap-2.5">
              {FEATURES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-xl bg-primary/[0.06] px-2 py-3.5 ring-1 ring-primary/10"
                >
                  <Icon className="w-4.5 h-4.5 text-primary" strokeWidth={1.75} />
                  <span className="text-[0.7rem] sm:text-xs font-semibold text-foreground/80 leading-tight text-center">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3">
              <Button
                asChild
                size="lg"
                className="w-full font-bold tracking-wide rounded-full h-12 text-[0.9rem] group"
                onClick={() => handleOpenChange(false)}
              >
                <Link
                  ref={ctaRef}
                  href={CATALOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Designing Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
