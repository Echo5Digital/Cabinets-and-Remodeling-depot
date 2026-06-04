'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function ProfessionalInstallationSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="relative py-20 md:py-28 overflow-hidden">
      {/* ── Background image ── */}
      <Image
        src="/cabinet_img.webp"
        alt="Professional cabinet installation Tampa"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient: image visible on left, fades to white on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-white/50 to-white md:from-transparent md:via-white/40 md:to-white" />

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
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-10">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                <span className="text-foreground">Professional Cabinet Installation</span>{' '}
                <span className="text-primary">Tampa</span>
              </h2>

              <p className="text-muted-foreground text-base leading-relaxed mb-4">
                Great cabinets deserve proper installation. Our experienced cabinet installation Tampa
                team focuses on precision, alignment, functionality, and clean finishing details that
                help your kitchen look polished and complete.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-4">
                We work closely with homeowners throughout the remodeling process, helping coordinate
                cabinetry, countertops, and layout updates while minimizing unnecessary delays or
                confusion.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
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
