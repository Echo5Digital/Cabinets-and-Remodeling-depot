'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'

export function HeroSection({ data = {}, compact = false }) {
  const {
    title = 'Kitchen Cabinets Tampa – Quality Cabinets & Professional Installation',
    subtitle = 'Transform your kitchen with beautifully crafted cabinetry designed for the way you live. At Cabinets & Remodeling Depot, we help homeowners throughout Tampa Bay find stylish, functional, and affordable kitchen solutions without the stress that often comes with remodeling projects.',
    description = "From custom designs to in-stock cabinets Tampa homeowners can install quickly, our team provides expert guidance, quality materials, and dependable cabinet installation Tampa services all from our Valrico showroom. Whether you're updating a single kitchen or planning a full remodel, we're here to help make the process simpler, smoother, and more practical from start to finish.",
    backgroundImage = '',
    ctaText = 'Visit Our Showroom',
    ctaLink = '/contact',
    videoSrc = '',
  } = data

  // ── Compact layout (used by inner pages / service pages) ──────────────────
  if (compact) {
    return (
      <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-primary" />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-3xl leading-tight"
          >
            {title}
          </motion.h1>
        </div>
      </section>
    )
  }

  // Split title at em-dash for two-tone rendering
  const dashIndex = title.indexOf(' – ')
  const titleBold  = dashIndex !== -1 ? title.slice(0, dashIndex) : title
  const titleLight = dashIndex !== -1 ? title.slice(dashIndex + 3) : ''

  // ── Full layout (home page) — full-width video/image background ───────────
  return (
    <section className="relative flex flex-col min-h-[90vh] md:min-h-screen overflow-hidden">

      {/* ── Background media ─────────────────────────────────────────────── */}
      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : backgroundImage ? (
          <Image
            src={backgroundImage}
            alt={title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-primary" />
        )}

        {/* Directional overlay — moderate left for text, opens up on the right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.50) 40%, rgba(0,0,0,0.22) 65%, rgba(0,0,0,0.04) 100%)',
          }}
        />
        {/* Subtle bottom vignette */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.30) 0%, transparent 32%)' }}
        />
      </div>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center py-16 sm:py-20 md:py-24">
        <div className="container-custom w-full">
          <div className="max-w-2xl lg:max-w-3xl">

            {/* Section label */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm uppercase tracking-[0.18em] font-semibold text-white/80 mb-2 sm:mb-5"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
            >
              Serving Tampa Bay From Our Valrico Showroom
            </motion.p>

            {/* H1 — two-tone */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.8rem] xl:text-[3.2rem] font-extrabold leading-[1.12] mb-3 sm:mb-6"
              style={{ textShadow: '0 2px 16px rgba(0,0,0,0.65), 0 1px 4px rgba(0,0,0,0.5)' }}
            >
              <span className="block" style={{ color: '#e0455e' }}>{titleBold}</span>
              {titleLight && (
                <span className="block text-white font-normal mt-1 leading-snug">{titleLight}</span>
              )}
            </motion.h1>

            {/* Accent divider */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="flex items-center gap-3 mb-3 sm:mb-7"
            >
              <div className="h-[3px] w-10 rounded-full bg-primary" />
              <div className="h-px w-24 rounded-full bg-white/35" />
            </motion.div>

            {/* Subtitle + description — clean text, no card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28 }}
              className="space-y-2 sm:space-y-4 mb-5 sm:mb-9"
            >
              {subtitle && (
                <p
                  className="text-white text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed line-clamp-3 xl:line-clamp-none"
                  style={{ textShadow: '0 1px 8px rgba(0,0,0,0.55)' }}
                >
                  {subtitle}
                </p>
              )}
              {description && (
                <p
                  className="hidden 2xl:block text-white/80 text-lg xl:text-xl leading-relaxed"
                  style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
                >
                  {description}
                </p>
              )}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-7"
            >
              {ctaText && (
                <Button
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 font-bold text-sm sm:text-base tracking-wide px-8 sm:px-10 h-12 sm:h-14 uppercase shadow-lg shadow-black/30"
                  asChild
                >
                  <Link href={ctaLink}>{ctaText}</Link>
                </Button>
              )}
              <a
                href="tel:+18136512333"
                className="flex items-center justify-center gap-2.5 border border-white/30 text-white rounded-md px-7 sm:px-9 h-12 sm:h-14 text-sm sm:text-base font-semibold uppercase tracking-wide hover:bg-white/10 transition-colors"
                style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(6px)' }}
              >
                <Phone className="h-5 w-5" />
                Call (813) 651-2333
              </a>
            </motion.div>

            {/* Trust chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.52 }}
              className="flex flex-wrap gap-3"
            >
              {['Free Estimates', 'In-Stock Cabinets', '5-Star Rated'].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/90 border border-white/25 rounded-full px-4 py-2"
                  style={{ background: 'rgba(0,0,0,0.28)', backdropFilter: 'blur(6px)' }}
                >
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  {label}
                </span>
              ))}
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  )
}
