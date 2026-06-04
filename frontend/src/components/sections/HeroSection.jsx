'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function HeroSection({ data = {}, compact = false }) {
  const {
    title = 'Kitchen Cabinets Tampa – Quality Cabinets & Professional Installation',
    subtitle = 'Transform your kitchen with beautifully crafted cabinetry designed for the way you live. At Cabinets & Remodeling Depot, we help homeowners throughout Tampa Bay find stylish, functional, and affordable kitchen solutions without the stress that often comes with remodeling projects.',
    description = "From custom designs to in-stock cabinets Tampa homeowners can install quickly, our team provides expert guidance, quality materials, and dependable cabinet installation Tampa services all from our Valrico showroom. Whether you're updating a single kitchen or planning a full remodel, we're here to help make the process simpler, smoother, and more practical from start to finish.",
    backgroundImage = '',
    ctaText = 'Visit Our Showroom',
    ctaLink = '/contact',
  } = data

  const sectionClass = compact
    ? 'relative min-h-[350px] h-[50vh] flex items-center overflow-hidden'
    : 'relative flex items-center overflow-hidden min-h-[600px] h-auto md:h-[85vh] py-20 md:py-0'

  return (
    <section className={sectionClass}>
      {/* Background */}
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {title}
          </motion.h1>

          {/* Paragraph 1 */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-base sm:text-lg text-white/85 mb-4 leading-relaxed max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Paragraph 2 */}
          {!compact && description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-base sm:text-lg text-white/85 mb-8 leading-relaxed max-w-2xl"
            >
              {description}
            </motion.p>
          )}

          {/* CTA Button */}
          {ctaText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <Button
                size="lg"
                className="text-base px-8 h-12 w-full sm:w-auto"
                asChild
              >
                <Link href={ctaLink}>
                  {ctaText}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
    </section>
  )
}
