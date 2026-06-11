'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CalendarDays, Phone, Gem, Award, Wrench, ShieldCheck, Laptop } from 'lucide-react'

const TRUST_ITEMS = [
  { Icon: Gem,          label: 'Lowest Price' },
  { Icon: Award,        label: 'Premium Quality' },
  { Icon: Wrench,       label: 'Professional Installation' },
  { Icon: ShieldCheck,  label: 'Financing Options Available' },
]

export function PreFooterSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <div ref={ref}>

      {/* ── Top CTA band ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="bg-primary"
      >
        <div className="container-custom py-7 md:py-9">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">

            {/* Left: icon + text */}
            <div className="flex items-center gap-5">
              <div className="shrink-0 hidden sm:flex items-center justify-center w-16 h-16 rounded-full border-2 border-white/25">
                <Laptop className="h-8 w-8 text-white/80" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-xl md:text-2xl leading-snug mb-1 text-center md:text-left">
                  Ready to Start Your Project?
                </h3>
                <p className="text-white/75 text-sm md:text-base leading-snug text-center md:text-left">
                  Get a free quote and expert design inspiration from our team&mdash;let&apos;s build!
                </p>
              </div>
            </div>

            {/* Right: CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2.5 bg-white text-primary font-bold text-xs sm:text-sm uppercase tracking-widest px-7 py-3.5 rounded hover:bg-white/90 transition-colors duration-200 whitespace-nowrap"
              >
                <CalendarDays className="h-5 w-5 shrink-0" />
                Schedule a Visit
              </Link>
              <a
                href="tel:+18136512333"
                className="flex items-center justify-center gap-2.5 border-2 border-white/80 text-white font-bold text-xs sm:text-sm uppercase tracking-widest px-7 py-3.5 rounded hover:bg-white/10 transition-colors duration-200 whitespace-nowrap"
              >
                <Phone className="h-5 w-5 shrink-0" />
                Call (813) 651-2333
              </a>
            </div>

          </div>
        </div>
      </motion.div>

      {/* ── Bottom trust + payment strip ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white border-t border-gray-100"
      >
        <div className="container-custom py-4 md:py-5">
          {/* Stack vertically on mobile, side-by-side on lg+ */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            {/* Trust items — 2-col grid on mobile, single row on lg */}
            <div className="grid grid-cols-2 lg:flex lg:items-center lg:divide-x lg:divide-gray-200 gap-3 lg:gap-0">
              {TRUST_ITEMS.map(({ Icon, label }, i) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 ${
                    i === 0 ? 'lg:pr-5' : 'lg:px-5'
                  }`}
                >
                  <Icon className="h-5 w-5 text-primary shrink-0" strokeWidth={1.5} />
                  <span className="text-gray-700 font-bold text-[0.68rem] sm:text-xs uppercase tracking-wide leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Payment logos — always in a single row, left-aligned on mobile */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Visa */}
              <span className="inline-flex items-center justify-center border border-gray-200 rounded px-2.5 py-1.5 bg-white h-8">
                <span style={{ color: '#1A1F71', fontWeight: 900, fontStyle: 'italic', fontSize: '15px', letterSpacing: '-0.5px', lineHeight: 1 }}>
                  VISA
                </span>
              </span>

              {/* Mastercard */}
              <span className="inline-flex items-center justify-center border border-gray-200 rounded px-2 py-1.5 bg-white h-8 gap-0">
                <span className="w-5 h-5 rounded-full bg-red-600 -mr-2 shrink-0" />
                <span className="w-5 h-5 rounded-full shrink-0" style={{ backgroundColor: '#F79E1B', opacity: 0.92 }} />
              </span>

              {/* Discover */}
              <span className="inline-flex items-center justify-center border border-gray-200 rounded px-2 py-1.5 bg-white h-8">
                <span style={{ fontWeight: 800, fontSize: '11px', letterSpacing: '0.3px', lineHeight: 1 }}>
                  <span style={{ color: '#231F20' }}>DIS</span>
                  <span style={{ color: '#F76F20' }}>COVER</span>
                </span>
              </span>

              {/* Amex */}
              <span
                className="inline-flex items-center justify-center border border-blue-300 rounded px-2 py-1.5 h-8"
                style={{ backgroundColor: '#2E77BC' }}
              >
                <span style={{ color: '#fff', fontWeight: 800, fontSize: '8.5px', letterSpacing: '0.2px', lineHeight: 1.2, textAlign: 'center' }}>
                  AMERICAN<br />EXPRESS
                </span>
              </span>
            </div>

          </div>
        </div>
      </motion.div>

    </div>
  )
}
