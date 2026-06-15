'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImageLightbox } from '@/components/common/ImageLightbox'

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const CABINET_IMAGES = [
  { src: '/ca1.png', alt: 'In-Stock Cabinet Style 1' },
  { src: '/ca2.png', alt: 'In-Stock Cabinet Style 2' },
  { src: '/ca4.png', alt: 'In-Stock Cabinet Style 4' },
  { src: '/ca5.png', alt: 'In-Stock Cabinet Style 5' },
  { src: '/ca6.png', alt: 'In-Stock Cabinet Style 6' },
  { src: '/ca8.png', alt: 'In-Stock Cabinet Style 8' },
  { src: '/ca9.png', alt: 'In-Stock Cabinet Style 9' },
]

const FEATURES = [
  'We offer strong and sturdy frames',
  'Better storage',
  'Strong adjustable shelves',
  'Dependable hinges',
  'Excellent alignment',
  'Moisture resistant cabinets',
]

export function CabinetsPageClient() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <>
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section className="relative h-56 sm:h-72 md:h-80 overflow-hidden bg-gray-900">
        <Image
          src="/Cabinet-Slide-650x350-1.jpg"
          alt="In-Stock Cabinets in Tampa, FL"
          fill
          className="object-cover object-top opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/70 text-xs sm:text-sm mb-3 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            {' / '}
            In-Stock Cabinets in Tampa, FL
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-wide drop-shadow-lg">
            In-Stock Cabinets In Tampa, FL
          </h1>
        </div>
      </section>

      {/* ── Framed Heading ───────────────────────────────────────────────── */}
      <section className="pt-10 pb-4 md:pt-14 md:pb-6 bg-white">
        <div className="container-custom max-w-4xl text-center">
          <div className="border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="flex justify-center mb-4">
              <Image
                src="/cabinet_fav.jpg"
                alt="Cabinets & Remodeling Depot"
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wide text-gray-900 mb-1">
              Affordable In-Stock Cabinets In Valrico &amp; Tampa, FL
            </h2>
            <p className="text-sm text-muted-foreground uppercase tracking-widest mt-2">
              Tampa, Florida
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <section className="pt-6 pb-10 md:pt-8 md:pb-14 bg-white">
        <div className="container-custom max-w-4xl">

          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Cabinets &amp; Remodeling Depot Offers The Best In-Stock Cabinets With Free Estimates
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-5 text-gray-700 text-base leading-relaxed mb-8">
            <p>
              At Cabinets &amp; Remodeling Depot we carry elegant Kitchen designs from our new in-stock
              Aristokraft cabinets, which provides our customers with exceptional cabinets at a great
              value. Stop by to see our in-stock cabinets that are stocked at our showroom and check
              them out for yourself or call us at 813-651-5333 for a free estimate!
            </p>
            <p>
              Cabinets &amp; Remodeling Depot has the best Kitchen cabinets in the greater Tampa area.
              We only offer the BEST brands with cabinets that are crafted with long lasting materials
              and beautiful finishes. You must stop by and see our outstanding cabinets, its best that
              you see our cabinets in person.
            </p>
            <p>
              In addition, Cabinets &amp; Remodeling Depot also offers custom cabinets for our customers
              who want to personalize their cabinets. We offer the best deals in Tampa, Valrico Florida
              for custom cabinets, so be sure to check us out!
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="mb-6">
            <p className="text-gray-700 text-base font-medium mb-4">
              Here are the reasons why Cabinet &amp; Remodeling Depot have cabinets that are worth buying:
            </p>
            <ul className="space-y-3">
              {FEATURES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700 text-base">
                  <span className="text-primary font-bold text-lg leading-tight mt-0.5 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-gray-700 text-base leading-relaxed">
              Cabinets And Remodeling Depot provides you with the best in-stock cabinets in Tampa.
            </p>
          </FadeIn>

        </div>
      </section>

      {/* ── Cabinet Image Gallery ────────────────────────────────────────── */}
      <section className="pb-8 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {CABINET_IMAGES.map(({ src, alt }, i) => (
              <FadeIn key={src} delay={i * 0.05}>
                <div
                  className="aspect-square relative overflow-hidden rounded-lg shadow-sm cursor-pointer group"
                  onClick={() => setLightboxIndex(i)}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 14vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────────────────── */}
      <section className="pt-6 pb-14 md:pt-8 md:pb-20 bg-white">
        <div className="container-custom text-center">
          <FadeIn>
            <Button
              asChild
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 font-bold rounded-full px-14 uppercase tracking-widest text-base h-14"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </FadeIn>
        </div>
      </section>

      <ImageLightbox
        images={CABINET_IMAGES}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((i) => Math.max(0, i - 1))}
        onNext={() => setLightboxIndex((i) => Math.min(CABINET_IMAGES.length - 1, i + 1))}
      />
    </>
  )
}
