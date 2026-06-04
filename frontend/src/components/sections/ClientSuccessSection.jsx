'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Maria G.',
    location: 'Brandon, FL',
    initials: 'MG',
    rating: 5,
    time: '2 weeks ago',
    text: 'They transformed our outdated kitchen into a stunning modern space. The attention to detail was incredible, and the team was professional from start to finish. Our new cabinets are absolutely beautiful!',
  },
  {
    name: 'James T.',
    location: 'Valrico, FL',
    initials: 'JT',
    rating: 5,
    time: '1 month ago',
    text: 'We had our master bathroom completely remodeled. The quality of work exceeded our expectations. The project was completed on time and within budget. Highly recommend Cabinets & Remodeling Depot!',
  },
  {
    name: 'Sandra P.',
    location: 'Tampa, FL',
    initials: 'SP',
    rating: 5,
    time: '3 weeks ago',
    text: 'The quartz countertops they installed are gorgeous. The team was knowledgeable and helped us pick the perfect design. Our kitchen has been completely transformed. Worth every penny!',
  },
  {
    name: 'Robert M.',
    location: 'Riverview, FL',
    initials: 'RM',
    rating: 5,
    time: '2 months ago',
    text: 'Outstanding service from start to finish. The cabinet installation was flawless and the team cleaned up after themselves every day. Our kitchen looks like it belongs in a magazine now.',
  },
]

export function ClientSuccessSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? REVIEWS.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === REVIEWS.length - 1 ? 0 : c + 1))
  const review = REVIEWS[current]

  return (
    <section ref={ref} className="section-padding bg-stone-50">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: image with accent background ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Decorative offset block */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl bg-primary/15 -z-10" />
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/Testimonials_sec-1.webp"
                alt="Professional remodeling expert at work"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* ── Right: heading + review carousel ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Client </span>
              <span className="text-primary">Success Stories</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Discover how our Valrico showroom transforms Tampa Bay homes with custom cabinets,
              countertops, and professional remodeling services.
            </p>

            {/* Review card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 min-h-[220px] relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Stars + badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
                      Google Review
                    </span>
                  </div>

                  {/* Review text */}
                  <p className="text-foreground text-sm md:text-base leading-relaxed mb-6 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  {/* Reviewer info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {review.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {review.location} &middot; {review.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={prev}
                aria-label="Previous review"
                className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center shrink-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to review ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? 'w-6 h-2.5 bg-primary'
                        : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next review"
                className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center shrink-0"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
