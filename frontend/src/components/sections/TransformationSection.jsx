'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// ─── Slide data ────────────────────────────────────────────────────────────────
const SLIDES = [
  { before: '/old.jpeg',  after: '/new.jpg'   },
  { before: '/old1.jpg',  after: '/new1.jpeg' },
  { before: '/old2.jpg',  after: '/new2.jpg'  },
  { before: '/old3.jpg',  after: '/new3.jpeg' },
]

const AUTO_ADVANCE_MS = 6000
const DRAG_RESUME_MS  = 800

export function TransformationSection({ data }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [sliderPos,   setSliderPos]   = useState(50)

  const containerRef   = useRef(null)
  const dragging       = useRef(false)
  const pausedRef      = useRef(false)
  const resumeTimerRef = useRef(null)
  const activeIndexRef = useRef(0)

  useEffect(() => { activeIndexRef.current = activeIndex }, [activeIndex])

  const label       = data?.label       || 'Before & After'
  const heading     = data?.heading     || null
  const description = data?.description || 'Drag the slider to see the dramatic difference our expert remodeling makes.'

  // ── Navigation ────────────────────────────────────────────────────────────────
  const goToSlide = useCallback((nextIndex) => {
    setActiveIndex(nextIndex)
    setSliderPos(50)
  }, [])

  const goNext = useCallback(() => {
    goToSlide((activeIndexRef.current + 1) % SLIDES.length)
  }, [goToSlide])

  const goPrev = useCallback(() => {
    goToSlide((activeIndexRef.current - 1 + SLIDES.length) % SLIDES.length)
  }, [goToSlide])

  // ── Auto-advance ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!inView) return
    const id = setTimeout(() => {
      if (!pausedRef.current) goToSlide((activeIndexRef.current + 1) % SLIDES.length)
    }, AUTO_ADVANCE_MS)
    return () => clearTimeout(id)
  }, [inView, activeIndex, goToSlide])

  // ── Comparison drag ───────────────────────────────────────────────────────────
  const clamp = (v) => Math.min(Math.max(v, 0), 100)

  const updateFromClientX = useCallback((clientX) => {
    if (!containerRef.current) return
    const { left, width } = containerRef.current.getBoundingClientRect()
    setSliderPos(clamp(((clientX - left) / width) * 100))
  }, [])

  const pauseAutoAdvance = () => {
    pausedRef.current = true
    clearTimeout(resumeTimerRef.current)
  }
  const scheduleResume = () => {
    clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => { pausedRef.current = false }, DRAG_RESUME_MS)
  }

  const onMouseDown  = (e) => { dragging.current = true;  pauseAutoAdvance(); updateFromClientX(e.clientX) }
  const onMouseMove  = (e) => { if (dragging.current) updateFromClientX(e.clientX) }
  const onMouseUp    = ()  => { dragging.current = false; scheduleResume() }
  const onTouchStart = (e) => { dragging.current = true;  pauseAutoAdvance(); updateFromClientX(e.touches[0].clientX) }
  const onTouchMove  = (e) => { if (dragging.current) updateFromClientX(e.touches[0].clientX) }
  const onTouchEnd   = ()  => { dragging.current = false; scheduleResume() }

  return (
    <section ref={ref} className="relative section-padding overflow-hidden bg-[#F8F3ED]">
      <div className="relative z-10 container-custom">

        {/* ── Heading ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-primary/60 mb-3">
            {label}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {heading ? heading : <>See Our <span className="text-primary">Transformations</span></>}
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
            <div className="h-1 w-8 bg-primary rounded-full" />
            <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
          </div>
          <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* ── Carousel ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* ── Row: [← arrow]  [viewport]  [→ arrow] ── */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5">

            {/* Left arrow — outside the card */}
            <button
              onClick={goPrev}
              aria-label="Previous transformation"
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-primary border border-primary/15 shadow-md flex items-center justify-center transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-lg active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Viewport: clips the sliding track */}
            <div className="flex-1 min-w-0 overflow-hidden rounded-2xl shadow-2xl">
              {/*
                Track: 4× viewport width.
                Each card is 25% of track = 100% of viewport.
                translateX(-25% × index) brings each card into view.
              */}
              <div
                className="flex h-64 sm:h-80 md:h-[460px] lg:h-[500px]"
                style={{
                  width: `${SLIDES.length * 100}%`,
                  transform: `translateX(-${activeIndex * (100 / SLIDES.length)}%)`,
                  transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  willChange: 'transform',
                }}
              >
                {SLIDES.map((slide, i) => (
                  <div
                    key={i}
                    style={{ width: `${100 / SLIDES.length}%` }}
                    className="relative flex-shrink-0 h-full"
                  >
                    {/*
                      Comparison container.
                      Interactive only on the active slide — the ref and all
                      event handlers are conditionally attached so that:
                      • off-screen slides stay frozen at 50/50
                      • there is never a stale ref
                    */}
                    <div
                      ref={i === activeIndex ? containerRef : null}
                      className={`relative w-full h-full select-none ${
                        i === activeIndex ? 'cursor-ew-resize' : ''
                      }`}
                      style={{ touchAction: i === activeIndex ? 'none' : 'auto' }}
                      onMouseDown={i === activeIndex ? onMouseDown  : undefined}
                      onMouseMove={i === activeIndex ? onMouseMove  : undefined}
                      onMouseUp  ={i === activeIndex ? onMouseUp    : undefined}
                      onMouseLeave={i === activeIndex ? onMouseUp   : undefined}
                      onTouchStart={i === activeIndex ? onTouchStart : undefined}
                      onTouchMove ={i === activeIndex ? onTouchMove  : undefined}
                      onTouchEnd  ={i === activeIndex ? onTouchEnd   : undefined}
                    >
                      {/* BEFORE image (full, behind) */}
                      <div className="absolute inset-0">
                        <Image
                          src={slide.before}
                          alt="Before remodeling"
                          fill
                          className="object-cover"
                          priority={i <= 1}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 960px"
                          draggable={false}
                        />
                        <span className="absolute bottom-4 right-4 bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow">
                          Before
                        </span>
                      </div>

                      {/* AFTER image (clipped from left, on top) */}
                      <div
                        className="absolute inset-0 z-10"
                        style={{
                          clipPath: `inset(0 ${
                            i === activeIndex ? (100 - sliderPos) : 50
                          }% 0 0)`,
                        }}
                      >
                        <Image
                          src={slide.after}
                          alt="After remodeling"
                          fill
                          className="object-cover"
                          priority={i <= 1}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 960px"
                          draggable={false}
                        />
                        <span className="absolute bottom-4 left-4 bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow">
                          After
                        </span>
                      </div>

                      {/* Divider line */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-white z-20 shadow-lg"
                        style={{
                          left: `${i === activeIndex ? sliderPos : 50}%`,
                        }}
                      />

                      {/* Drag handle — only on the active slide */}
                      {i === activeIndex && (
                        <div
                          className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-xl border-2 border-white"
                          style={{ left: `${sliderPos}%` }}
                        >
                          <ChevronLeft className="w-3.5 h-3.5 text-white" />
                          <ChevronRight className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right arrow — outside the card */}
            <button
              onClick={goNext}
              aria-label="Next transformation"
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-primary border border-primary/15 shadow-md flex items-center justify-center transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-lg active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* ── Bottom row: counter + dots ──────────────────────────────────── */}
          <div className="flex items-center justify-between mt-5 px-1">

            {/* Slide counter */}
            <span className="text-sm font-medium text-primary/50 tabular-nums select-none">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(SLIDES.length).padStart(2, '0')}
            </span>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-6 bg-primary'
                      : 'w-2.5 bg-primary/25 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            {/* Empty spacer to balance the counter */}
            <span className="text-sm opacity-0 select-none tabular-nums">
              00 / 00
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
