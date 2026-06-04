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

export function ServiceAreasSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="bg-primary py-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-white font-semibold text-lg mb-6">
            We proudly serve homeowners across:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {AREAS.map((area) => (
              <div
                key={area}
                className="flex items-center gap-2 border border-white/60 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
              >
                <MapPin className="w-4 h-4 shrink-0" />
                {area}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
