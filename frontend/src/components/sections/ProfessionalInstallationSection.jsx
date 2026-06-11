'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function ProfessionalInstallationSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      {/* ── Background image ── */}
      <Image
        src="/cabinet_img.webp"
        alt="Professional cabinet installation Tampa"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Directional overlay: photo on left, white fades in on right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(0,0,0,0.08) 0%, rgba(255,255,255,0.55) 42%, rgba(255,255,255,0.96) 100%)',
        }}
      />

      <div className="relative z-10 container-custom">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: empty — lets the background image show through ── */}
          <div className="hidden md:block" />

          {/* ── Right: content card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-8 md:p-10">

              {/* Section label */}
              <p className="text-xs uppercase tracking-[0.18em] font-semibold text-primary/60 mb-3">
                Expert Installation
              </p>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                <span className="text-foreground">Professional Cabinet Installation</span>{' '}
                <span className="text-primary">Tampa</span>
              </h2>

              {/* Decorative underline */}
              <div className="flex items-center gap-2 mb-6">
                <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
                <div className="h-1 w-8 bg-primary rounded-full" />
                <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
              </div>

              <p className="text-gray-700 text-base leading-relaxed mb-4">
                Great cabinets deserve proper installation. Our experienced cabinet installation Tampa
                team focuses on precision, alignment, functionality, and clean finishing details that
                help your kitchen look polished and complete.
              </p>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                We work closely with homeowners throughout the remodeling process, helping coordinate
                cabinetry, countertops, and layout updates while minimizing unnecessary delays or
                confusion.
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                Every project is approached with attention to detail because we understand that a
                kitchen is more than another room&mdash;it&apos;s where daily life happens.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
