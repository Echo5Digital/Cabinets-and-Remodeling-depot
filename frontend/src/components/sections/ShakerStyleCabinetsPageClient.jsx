'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronRight, CheckCircle2, XCircle } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'

/* ─── Fade-in wrapper ───────────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = '', y = 24 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const SERIES = [
  { label: 'Shaker White Cabinets' },
  { label: 'Shaker Dove Gray Cabinets' },
  { label: 'Shaker Brindle Cabinets' },
  { label: 'Raised Panel White Cabinets' },
  { label: 'Unfinished Beech Cabinets' },
  { label: 'Designer Series Cabinets' },
]

const IMAGES = [
  { src: '/cabinet-shaker.jpg',    alt: 'Shaker style kitchen cabinet close-up' },
  { src: '/shaker-cabinets-1.webp', alt: 'Shaker white cabinet kitchen installation' },
  { src: '/shaker-cabinets-2.webp', alt: 'Shaker dove gray cabinets in kitchen' },
  { src: '/shaker-cabinets-3.webp', alt: 'Shaker kitchen cabinet design' },
  { src: '/shaker-cabinets-4.webp', alt: 'Shaker style cabinet detail' },
  { src: '/shaker-cabinets-5.webp', alt: 'Custom shaker cabinet installation Tampa' },
]

const PROS = [
  '"Shaker has a chameleon-like quality; it\'s easy to style your own way. Mix it with a concrete worktop and it becomes a bit industrial; add a wooden worktop and it becomes more country."',
  'As with glass-front cabinets, it\'s quite acceptable to combine Shaker with flat-front styles.',
  'Because they\'re so popular, Shaker cabinets are widely available and can be reasonably priced.',
]

const CONS = [
  "You'll need to clean regularly to prevent dirt from collecting on the inset area.",
]

const OTHER_STYLES = [
  { label: 'Traditional Cabinets',   href: '/traditional-style-cabinets' },
  { label: 'Modern Cabinets',        href: '/modern-style-cabinets' },
  { label: 'Contemporary Cabinets',  href: '/contemporary-style-cabinets' },
  { label: 'Transitional Cabinets',  href: '/transitional-style-cabinets' },
  { label: 'Industrial Cabinets',    href: '/industrial-style-cabinets' },
]

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function ShakerStyleCabinetsPageClient() {
  return (
    <>
      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <PageHeader
        title="Shaker Style Cabinets"
        subtitle="Home / Shaker Style Cabinets"
      />

      {/* ════════════════════════════════════════════════════════════════════
          SERIES PILLS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-14 bg-warm-gray border-b border-[#E8DFD0]">
        <div className="container-custom max-w-5xl">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-3">
              {SERIES.map(({ label }) => (
                <span
                  key={label}
                  className="inline-flex items-center bg-white text-primary border border-primary/30 text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-sm"
                >
                  {label}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          INTRO — Company label + content
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1">
                Cabinets &amp; Remodeling Depot
              </p>
              <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                1. Shaker-Style Cabinets
              </h2>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Quality — Service — Value
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-5 text-gray-600 text-base sm:text-lg leading-[1.82]">
              <p>
                While many traditional styles have fallen from favor, Shaker-style cabinets have
                only gained in popularity, thanks to their minimalist but still distinctive look.
                Each Shaker-style door has five segments: vertical pieces on the sides called
                stiles, horizontal pieces on the top and bottom called rails, and a recessed panel
                in the middle. More-traditional cabinet styles often have raised center panels.
                This is &ldquo;a classic, simple look that never really goes out of style.&rdquo;
              </p>
            </div>
          </FadeIn>

          {/* Pros & Cons */}
          <FadeIn delay={0.14}>
            <div className="mt-10 grid sm:grid-cols-2 gap-6">

              {/* Pros */}
              <div className="bg-warm-gray rounded-2xl p-6 border border-[#E8DFD0]">
                <h3 className="font-playfair text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  Pros
                </h3>
                <ul className="space-y-3">
                  {PROS.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-gray-600 text-sm sm:text-base leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-playfair text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  Cons
                </h3>
                <ul className="space-y-3">
                  {CONS.map((con, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-gray-600 text-sm sm:text-base leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          IMAGE GALLERY
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-warm-gray">
        <div className="container-custom max-w-7xl">
          <FadeIn className="mb-10">
            <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-gray-900">
              Featured Shaker Designs
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {IMAGES.map(({ src, alt }, i) => (
              <FadeIn key={src} delay={i * 0.07}>
                <div className="relative aspect-4/5 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          EXPLORE OTHER STYLES
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-white border-y border-gray-100">
        <div className="container-custom max-w-4xl">
          <FadeIn className="text-center mb-8">
            <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-gray-900">
              Explore Our Other Kitchen Styles
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="flex flex-wrap justify-center gap-3">
              {OTHER_STYLES.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="inline-flex items-center gap-2 bg-warm-gray hover:bg-primary hover:text-white text-gray-800 text-sm font-semibold px-5 py-2.5 rounded-full border border-[#E8DFD0] hover:border-primary transition-all duration-200"
                >
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  {label}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          BOTTOM CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/cabinet_img.webp"
            alt="Shaker style cabinets background"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/80" />
        </div>
        <div className="relative z-10 container-custom max-w-3xl text-center px-4">
          <FadeIn>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-gold" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold whitespace-nowrap">
                Tampa Bay Cabinet Experts
              </p>
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-gold" />
            </div>
            <p className="font-playfair text-gray-900 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-6">
              Every cabinet is thoughtfully crafted and professionally installed to deliver
              timeless shaker style and lasting quality for your kitchen.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/85 text-white font-bold uppercase tracking-widest text-sm h-14 px-10 rounded-lg transition-colors shadow-lg whitespace-nowrap"
            >
              Request Free Estimate
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
