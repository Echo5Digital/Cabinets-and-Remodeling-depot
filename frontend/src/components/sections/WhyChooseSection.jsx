'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const FEATURES = [
  'Experienced remodeling professionals',
  'Local Valrico showroom',
  'Affordable and custom cabinet options',
  'In-stock cabinetry available',
  'Personalized project support',
  'Professional installation services',
  'One-stop remodeling solutions',
]

export function WhyChooseSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      {/* ── Background pattern image ── */}
      <Image
        src="/img_01bg.png"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        aria-hidden="true"
      />
      {/* #811121 overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(129, 17, 33, 0.88)' }} />

      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Why Homeowners Choose Cabinets &amp; Remodeling Depot
          </h2>
          <p className="text-white/75 text-base md:text-lg text-center max-w-3xl mx-auto mb-8">
            Homeowners across Tampa Bay continue to choose Cabinets &amp; Remodeling Depot because
            we focus on honest service, quality workmanship, and practical remodeling guidance.
          </p>

          <p className="text-white font-semibold mb-5">What sets us apart:</p>

          {/* ── Grid: row 1 → cards 01-03 + circular image, row 2 → cards 04-07 ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

            {/* Cards 01–03 */}
            {FEATURES.slice(0, 3).map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 shadow-lg"
              >
                <p className="text-4xl font-extrabold text-gray-200 mb-3 leading-none">
                  {String(i + 1).padStart(2, '0')}.
                </p>
                <p className="text-primary font-semibold text-sm leading-snug">{feature}</p>
              </motion.div>
            ))}

            {/* Circular image — 4th slot, row 1, desktop only */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="hidden md:flex items-center justify-center"
            >
              <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-white/80 shadow-2xl">
                <Image
                  src="/bathroom_remodeling.png"
                  alt="Professional remodeling expert"
                  fill
                  className="object-cover object-top"
                  sizes="176px"
                />
              </div>
            </motion.div>

            {/* Cards 04–07 (4 items fill the full second row) */}
            {FEATURES.slice(3).map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (i + 4) * 0.08 }}
                className="bg-white rounded-2xl p-5 shadow-lg"
              >
                <p className="text-4xl font-extrabold text-gray-200 mb-3 leading-none">
                  {String(i + 4).padStart(2, '0')}.
                </p>
                <p className="text-primary font-semibold text-sm leading-snug">{feature}</p>
              </motion.div>
            ))}
          </div>

          {/* Closing note */}
          <p className="text-white/75 text-sm md:text-base">
            We believe remodeling should feel organized, transparent, and tailored to your
            home&mdash;not rushed or overly complicated.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
