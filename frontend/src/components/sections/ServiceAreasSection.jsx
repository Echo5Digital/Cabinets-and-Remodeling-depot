'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin } from 'lucide-react'

const AREAS = [
  'Tampa',
  'Brandon',
  'Riverview',
  'Valrico',
  'Apollo Beach',
  'Surrounding Tampa Bay Communities',
]

export function ServiceAreasSection({ data }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const areas = data?.areas?.length ? data.areas : AREAS
  const label = data?.label || 'Service Coverage'
  const heading = data?.heading || 'We proudly serve homeowners across:'

  return (
    <section ref={ref} className="bg-primary py-14">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-white/60 mb-2">
            {label}
          </p>
          <p className="text-white font-bold text-xl sm:text-2xl mb-6">
            {heading}
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {areas.map((area) => (
              <div
                key={area}
                className="flex items-center gap-1.5 bg-white/10 border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {area}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
