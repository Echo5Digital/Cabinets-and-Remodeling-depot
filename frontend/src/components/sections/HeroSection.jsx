'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

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

  // Split title at em-dash for bold / light-weight two-tone rendering
  const dashIndex = title.indexOf(' – ')
  const titleBold  = dashIndex !== -1 ? title.slice(0, dashIndex) : title
  const titleLight = dashIndex !== -1 ? title.slice(dashIndex + 3) : ''

  // ── Full split layout (home page) ─────────────────────────────────────────
  return (
    <section className="flex flex-col md:flex-row w-full md:min-h-screen">

      {/* ── LEFT: content panel ─────────────────────────────────────────── */}
      <div className="w-full md:w-1/2 bg-primary flex items-center py-20 md:py-24 lg:py-32">
        <div className="w-full px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-4xl sm:text-5xl leading-tight mb-6 text-white"
            >
              {/* Bold first part */}
              <span className="font-bold block">{titleBold}</span>

              {/* Light second part */}
              {titleLight && (
                <span className="font-normal block mt-1">
                  {titleLight}
                </span>
              )}
            </motion.h1>

            {/* Paragraph 1 */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-sm sm:text-base text-white/85 mb-4 leading-relaxed"
              >
                {subtitle}
              </motion.p>
            )}

            {/* Paragraph 2 */}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-sm sm:text-base text-white/85 mb-8 leading-relaxed"
              >
                {description}
              </motion.p>
            )}

            {/* CTA button */}
            {ctaText && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold text-base px-8 h-12 w-full sm:w-auto"
                  asChild
                >
                  <Link href={ctaLink}>{ctaText}</Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT: video / image panel (hidden on mobile) ───────────────── */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
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
            className="object-cover"
            priority
            sizes="50vw"
          />
        ) : (
          /* Fallback gradient when no video or image is provided */
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/40" />
        )}
      </div>

    </section>
  )
}
