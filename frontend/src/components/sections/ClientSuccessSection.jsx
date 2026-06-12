'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Lei Cheng',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    initials: 'LC',
    avatarColor: '#8b6f47',
    rating: 5,
    time: '3 years ago',
    text: 'I used Cabinet and Remodeling Depot replaced my entire kitchen and master bathroom cabinets and countertop. They did a fantastic job! It had been a pleasure working with them. They help us select all the materials and styles and we are very satisfied.',
  },
  {
    name: 'R George',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    initials: 'RG',
    avatarColor: '#1a73a7',
    rating: 5,
    time: '3 years ago',
    text: 'We used cabinets & remodeling when we need to replace old carpet in the house. My experience was amazing as they are friendly and helpful with the whole process. Highly recommend!',
  },
  {
    name: 'Kishon Kuruvilla',
    photo: null,
    initials: 'K',
    avatarColor: '#00897b',
    rating: 5,
    time: '3 years ago',
    text: 'We have been purchasing kitchen cabinets from this shop for few years and their customer service has always been great and we really like coming here.',
  },
  {
    name: 'Ginger Wilkerson',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    initials: 'GW',
    avatarColor: '#558b2f',
    rating: 5,
    time: '3 years ago',
    text: 'We had a great experience with our quartz countertop purchase and install. From the start to finish, about 1.5 weeks and they look amazing!!',
  },
  {
    name: 'Oscar Herrera',
    photo: null,
    initials: 'O',
    avatarColor: '#5e35b1',
    rating: 5,
    time: '1 year ago',
    text: 'It was a great pleasure working with Marcos and his team at Cabinets and Remodeling Depot. They communicated well during the entire process, from the selection of the tiles for a bathroom remodel to the final clean up.',
  },
  {
    name: 'Michelle K',
    photo: null,
    initials: 'M',
    avatarColor: '#c2185b',
    rating: 5,
    time: '2 years ago',
    text: 'They did a great job on my floors and bathrooms. Marcos and team were great to work with.',
  },
  {
    name: 'Emile Nicholas',
    photo: null,
    initials: 'E',
    avatarColor: '#3949ab',
    rating: 5,
    time: '1 year ago',
    text: 'Excellent experience with our master bath remodel. Our general contractor Marcos was the consummate professional. He was able to meet our needs and expectations for our bath remodel. Would highly recommend him and his team.',
  },
]

function GoogleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

const MAX_CHARS = 140

export function ClientSuccessSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [current, setCurrent] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const goTo = (i) => { setCurrent(i); setExpanded(false) }
  const prev = () => goTo(current === 0 ? REVIEWS.length - 1 : current - 1)
  const next = () => goTo(current === REVIEWS.length - 1 ? 0 : current + 1)

  const review = REVIEWS[current]
  const isLong = review.text.length > MAX_CHARS
  const displayText = isLong && !expanded ? review.text.slice(0, MAX_CHARS) + '…' : review.text

  return (
    <section ref={ref} className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-stretch">

          {/* ── Left: heading + review carousel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-primary/60 mb-3">
              Customer Reviews
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-foreground">Client </span>
              <span className="text-primary">Success Stories</span>
            </h2>
            {/* Decorative underline */}
            <div className="flex items-center gap-2 mb-5">
              <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
              <div className="h-1 w-8 bg-primary rounded-full" />
              <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
            </div>
            <p className="text-gray-700 text-base leading-relaxed mb-8">
              Discover how our Valrico showroom transforms Tampa Bay homes with custom cabinets and countertops.
            </p>

            {/* Review card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-7 min-h-47.5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Stars + Google logo */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <GoogleIcon />
                  </div>

                  {/* Review text + Read more */}
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-5">
                    &ldquo;{displayText}&rdquo;
                    {isLong && (
                      <button
                        onClick={() => setExpanded(!expanded)}
                        className="ml-1 text-primary font-medium text-sm hover:underline focus:outline-none"
                      >
                        {expanded ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </p>

                  {/* Reviewer info */}
                  <div className="flex items-center gap-3">
                    {review.photo ? (
                      <img
                        src={review.photo}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                        style={{ backgroundColor: review.avatarColor }}
                      >
                        {review.initials}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-foreground text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.time}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation: prev | dots | next */}
            <div className="flex items-center gap-4 mt-5">
              <button
                onClick={prev}
                aria-label="Previous review"
                className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center shrink-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2 items-center">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
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

          {/* ── Right: Google Map ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative rounded-2xl overflow-hidden shadow-lg min-h-80 sm:min-h-120 md:min-h-0 md:self-stretch"
          >
            <iframe
              src="https://maps.google.com/maps?cid=18201794426186346316&output=embed&hl=en-US&t=k"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cabinets & Remodeling Depot — 106 S St Cloud Ave, Valrico, FL 33594"
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
