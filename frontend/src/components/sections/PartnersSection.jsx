'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const PARTNERS = Array.from({ length: 10 }, (_, i) => `/partner/${i + 1}.png`)
const SPEED = 55 // px per second

export function PartnersSection() {
  const [sectionRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const x = useMotionValue(0)
  const trackRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  // Auto-scroll: continuously shift x left; loop when one full set is scrolled past
  useAnimationFrame((_, delta) => {
    if (isDragging || !trackRef.current) return
    const halfWidth = trackRef.current.scrollWidth / 2
    let next = x.get() - (SPEED / 1000) * delta
    // loop forward
    if (next <= -halfWidth) next += halfWidth
    // handle if user dragged right past origin
    if (next > 0) next -= halfWidth
    x.set(next)
  })

  return (
    <section className="py-14 bg-gray-50" ref={sectionRef}>

      {/* Heading */}
      <div className="container-custom mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-primary/60 mb-3">
            Our Partners
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-2">
            Our <span className="text-primary">Trusted Partners</span>
          </h2>
          {/* Decorative underline */}
          <div className="flex items-center justify-center gap-2 mt-2 mb-1">
            <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
            <div className="h-1 w-8 bg-primary rounded-full" />
            <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
          </div>
          <p className="text-muted-foreground text-base md:text-lg mt-3">
            Brands we proudly work with to bring you quality products and materials.
          </p>
        </motion.div>
      </div>

      {/* Scrolling track — full bleed (no container) */}
      <div className="overflow-hidden select-none">
        <motion.div
          ref={trackRef}
          style={{ x }}
          drag="x"
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className="flex gap-6 cursor-grab active:cursor-grabbing w-max px-3 py-2"
        >
          {/* Duplicate logos for seamless infinite loop */}
          {[...PARTNERS, ...PARTNERS].map((src, i) => (
            <div
              key={i}
              className="shrink-0 w-36 h-20 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center px-4"
            >
              <Image
                src={src}
                alt={`Partner ${(i % PARTNERS.length) + 1}`}
                width={120}
                height={56}
                className="object-contain max-h-14 w-auto"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
