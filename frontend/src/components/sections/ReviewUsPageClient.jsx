'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PageHeader } from '@/components/common/PageHeader'

/* ─── Fade-in wrapper ───────────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = '', y = 24 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Facebook SVG icon ─────────────────────────────────────────────────────── */
function FacebookIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}

/* ─── Google SVG icon ───────────────────────────────────────────────────────── */
function GoogleIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function ReviewUsPageClient() {
  return (
    <>
      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <PageHeader
        title="Share Your Experience With Us"
        subtitle="Home / Share Your Experience With Us"
      />

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-3xl">

          {/* Company label */}
          <FadeIn>
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1">
                Cabinets &amp; Remodeling Depot
              </p>
              <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                Thanks For Buying
              </h2>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Quality — Service — Value
              </p>
            </div>
          </FadeIn>

          {/* Body text */}
          <FadeIn delay={0.08}>
            <div className="space-y-5 text-gray-600 text-base sm:text-lg leading-[1.82] text-center">
              <p>
                We would appreciate it if you left a review of our service of Home Renovation,
                Kitchen Remodeling, and Bathroom Renovation Tampa, by buying experience with us,
                so others can benefit from your experience with us.
              </p>
              <p>
                We are always looking to provide our customers with the best experience possible.
                It would mean a great value to us if you left us feedback describing your
                experience with Cabinets Remodeling Depot in the Tampa, Valrico, FL area.
              </p>
            </div>
          </FadeIn>

          {/* "Take Only A Few Minutes!!" callout */}
          <FadeIn delay={0.14}>
            <p className="text-center font-playfair text-xl sm:text-2xl font-bold text-gray-900 mt-10 mb-10">
              Take Only A Few Minutes!!
            </p>
          </FadeIn>

          {/* Leave a Review heading */}
          <FadeIn delay={0.18}>
            <h3 className="text-center font-playfair text-xl sm:text-2xl font-extrabold text-gray-900 mb-8">
              Leave a Review
            </h3>
          </FadeIn>

          {/* Review buttons */}
          <FadeIn delay={0.22}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

              {/* Facebook */}
              <Link
                href="https://www.facebook.com/Cabinet-Remodeling-Depot-110660367297551"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <FacebookIcon className="w-6 h-6 shrink-0" />
                Review us on Facebook
              </Link>

              {/* Google */}
              <Link
                href="https://www.google.com/maps/place/Cabinet+%26+Remodeling+Depot/@27.9371019,-82.2367728,15z/data=!4m5!3m4!1s0x0:0xfc99c397e785af4c!8m2!3d27.9371019!4d-82.2367728"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm sm:text-base px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <GoogleIcon className="w-6 h-6 shrink-0" />
                Review us on Google
              </Link>

            </div>
          </FadeIn>

        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/cabinet_img.webp"
            alt="Cabinets and Remodeling Depot showroom"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/80" />
        </div>
        <div className="relative z-10 container-custom max-w-3xl text-center px-4">
          <FadeIn>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-gold" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold whitespace-nowrap">
                Tampa Bay Cabinet Experts
              </p>
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-gold" />
            </div>
            <p className="font-playfair text-gray-900 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-6">
              Your feedback helps us deliver the best kitchen and bathroom remodeling experience
              in Tampa Bay.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/85 text-white font-bold uppercase tracking-widest text-sm h-14 px-10 rounded-lg transition-colors shadow-lg whitespace-nowrap"
            >
              Request Free Estimate
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
