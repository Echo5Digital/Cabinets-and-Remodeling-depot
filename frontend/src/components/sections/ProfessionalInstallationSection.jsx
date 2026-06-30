'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function ProfessionalInstallationSection({ data }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const bgImage = data?.bgImage || '/cabinet_img.webp'
  const label = data?.label || 'Expert Installation'
  const heading = data?.heading || null  // null = use split heading
  const paragraphs = data?.paragraphs?.length ? data.paragraphs : null

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">

      {/* ── Full-bleed background image ── */}
      <Image
        src={bgImage}
        alt="Professional cabinet installation Tampa"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Desktop: left-white gradient so image shows on right half */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.78) 38%, rgba(255,255,255,0.42) 62%, rgba(255,255,255,0.12) 100%)',
        }}
      />
      {/* Mobile: full white wash so text is readable on single column */}
      <div
        className="absolute inset-0 md:hidden"
        style={{ background: 'rgba(255,255,255,0.92)' }}
      />

      <div className="relative z-10 container-custom">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── Left: content directly on white, no card ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Section label */}
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-primary/60 mb-3">
              {label}
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
              {heading ? (
                <span className="text-foreground">{heading}</span>
              ) : (
                <><span className="text-foreground">Professional Cabinet Installation</span>{' '}<span className="text-primary">Tampa</span></>
              )}
            </h2>

            {/* Decorative underline */}
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
              <div className="h-1 w-8 bg-primary rounded-full" />
              <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
            </div>

            {paragraphs ? (
              paragraphs.map((p, i) => (
                <p key={i} className="text-gray-700 text-base leading-relaxed mb-4">{p}</p>
              ))
            ) : (
              <>
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
              </>
            )}
          </motion.div>

          {/* ── Right: empty — image shows through on desktop ── */}
          <div className="hidden md:block" />

        </div>
      </div>
    </section>
  )
}
