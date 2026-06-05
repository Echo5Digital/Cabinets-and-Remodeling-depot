'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function TransformationSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [sliderPos, setSliderPos] = useState(50) // percentage (0–100)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const clamp = (val) => Math.min(Math.max(val, 0), 100)

  const updateFromClientX = useCallback((clientX) => {
    if (!containerRef.current) return
    const { left, width } = containerRef.current.getBoundingClientRect()
    setSliderPos(clamp(((clientX - left) / width) * 100))
  }, [])

  // Mouse handlers
  const onMouseDown = (e) => { dragging.current = true; updateFromClientX(e.clientX) }
  const onMouseMove = (e) => { if (dragging.current) updateFromClientX(e.clientX) }
  const onMouseUp   = ()  => { dragging.current = false }

  // Touch handlers (mobile)
  const onTouchStart = (e) => { dragging.current = true; updateFromClientX(e.touches[0].clientX) }
  const onTouchMove  = (e) => { if (dragging.current) updateFromClientX(e.touches[0].clientX) }
  const onTouchEnd   = ()  => { dragging.current = false }

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">

      {/* Background image */}
      <Image
        src="/img_01bg.jpeg"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        aria-hidden="true"
      />
      {/* Light overlay */}
      <div className="absolute inset-0 bg-white/60" />

      <div className="relative z-10 container-custom">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            See Our <span className="text-primary">Transformations</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Drag the slider to see the dramatic difference our expert remodeling makes.
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div
            ref={containerRef}
            className="relative w-full h-72 sm:h-96 md:h-125 rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
            style={{ touchAction: 'none' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* ── BEFORE image (full width, behind) ── */}
            <div className="absolute inset-0">
              <Image
                src="/old.jpeg"
                alt="Before remodeling"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
                draggable={false}
              />
              {/* Before label */}
              <span className="absolute bottom-4 right-4 bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow">
                Before
              </span>
            </div>

            {/* ── AFTER image (clipped from right, on top) ── */}
            <div
              className="absolute inset-0 z-10"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <Image
                src="/new.jpg"
                alt="After remodeling"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
                draggable={false}
              />
              {/* After label */}
              <span className="absolute bottom-4 left-4 bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow">
                After
              </span>
            </div>

            {/* ── Divider line ── */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white z-20 shadow-lg"
              style={{ left: `${sliderPos}%` }}
            />

            {/* ── Draggable handle ── */}
            <div
              className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-xl border-2 border-white"
              style={{ left: `${sliderPos}%` }}
            >
              <ChevronLeft className="w-3.5 h-3.5 text-white" />
              <ChevronRight className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
