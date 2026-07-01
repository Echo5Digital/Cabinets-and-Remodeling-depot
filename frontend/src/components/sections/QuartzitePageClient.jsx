'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Phone, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { COMPANY_PHONE, COMPANY_PHONE_DISPLAY } from '@/lib/constants'

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

function GalleryLightbox({ images, index, onClose, onPrev, onNext }) {
  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-4xl max-h-[88vh] aspect-4/3 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index].src}
              alt={images[index].alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </motion.div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-60 w-10 h-10 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/28 text-white transition-colors backdrop-blur-sm"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev() }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-60 w-10 h-10 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/28 text-white transition-colors backdrop-blur-sm"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext() }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-60 w-10 h-10 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/28 text-white transition-colors backdrop-blur-sm"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-xs font-medium tracking-widest">
            {index + 1} / {images.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const IMAGES = [
  { src: '/quartzite.webp',              alt: 'Quartzite countertop slab close-up' },
  { src: '/quartzitecountertops.jpg',    alt: 'Quartzite countertop kitchen showcase' },
  { src: '/quartz-countertopz.jpeg',        alt: 'Quartzite countertop kitchen installation' },
  { src: '/quartzitecountertops4.jpg',   alt: 'Natural quartzite surface detail' },
  { src: '/quartzitecountertops5.jpg',   alt: 'Quartzite countertop in kitchen' },
  { src: '/quartzitecountertops6.jpg',   alt: 'Quartzite stone texture detail' },
]

export function QuartzitePageClient() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openLightbox = (i) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length)
  const nextImage = () => setLightboxIndex((i) => (i + 1) % IMAGES.length)

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex flex-col min-h-[55vh] md:min-h-[65vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/quartzite.webp"
            alt="Quartzite countertop hero"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.44) 32%, rgba(0,0,0,0.14) 60%, rgba(0,0,0,0.00) 80%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 30%)' }} />
        </div>

        <div className="relative z-10 flex-1 flex items-center py-14 sm:py-16 md:py-20">
          <div className="container-custom w-full">
            <div className="max-w-lg lg:max-w-xl xl:max-w-2xl lg:pl-6 xl:pl-10">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-xs uppercase tracking-[0.18em] font-bold text-white/60 mb-4"
              >
                Countertop Materials
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="font-playfair font-extrabold leading-[1.08] mb-5"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.72), 0 1px 6px rgba(0,0,0,0.62)' }}
              >
                <span className="block text-white text-2xl sm:text-3xl md:text-[2.6rem] lg:text-[3.1rem]">Inspired by the Strength of</span>
                <span className="block text-gold text-2xl sm:text-[1.7rem] md:text-[2.5rem] lg:text-[2.8rem] mt-1.5 leading-[1.1]">Quartzite Countertops</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.20 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="h-0.75 w-12 rounded-full bg-gold" />
                <div className="h-px w-20 rounded-full bg-white/30" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/94 text-gray-900 hover:text-primary font-bold uppercase tracking-widest text-sm h-12 px-9 rounded-lg transition-all duration-300 whitespace-nowrap shadow-xl shadow-black/30"
                >
                  <Calendar className="h-4 w-4 shrink-0" />
                  Get Free Estimate
                </Link>
                <a
                  href={`tel:${COMPANY_PHONE}`}
                  className="inline-flex items-center justify-center gap-2 border border-primary/65 text-white hover:bg-primary/10 font-semibold uppercase tracking-widest text-sm h-12 px-9 rounded-lg transition-all duration-300 whitespace-nowrap backdrop-blur-sm"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary/80" />
                  Call {COMPANY_PHONE_DISPLAY}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Text Section ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <p className="text-gray-600 text-base sm:text-lg leading-[1.82]">
              Naturally elegant and exceptionally durable, quartzite countertops offer the perfect balance of beauty and resilience. With distinctive veining, rich textures, and timeless appeal, each slab is a unique work of nature that enhances both contemporary and traditional spaces. Designed to withstand everyday living while making a lasting impression, quartzite is an exceptional choice for refined interiors.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Image Gallery ── */}
      <section className="py-16 md:py-20 bg-warm-gray">
        <div className="container-custom max-w-7xl">
          <FadeIn className="mb-10">
            <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-gray-900">
              Signature Quartzite Collection
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {IMAGES.map(({ src, alt }, i) => (
              <FadeIn key={src} delay={i * 0.07}>
                <button
                  type="button"
                  onClick={() => openLightbox(i)}
                  className="relative w-full aspect-4/5 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={`View ${alt}`}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom Line ── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/countertops_2.jpg" alt="Quartzite countertop background" fill className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-white/80" />
        </div>
        <div className="relative z-10 container-custom max-w-3xl text-center px-4">
          <FadeIn>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-gold" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold whitespace-nowrap">Tampa Bay Countertop Experts</p>
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-gold" />
            </div>
            <p className="font-playfair text-gray-900 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-6">
              Every project is custom fabricated and professionally installed to highlight the remarkable beauty and lasting performance of every quartzite slab.
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

      {/* ── Lightbox ── */}
      <GalleryLightbox
        images={IMAGES}
        index={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </>
  )
}
