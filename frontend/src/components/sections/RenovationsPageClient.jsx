'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'
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

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    image: '/kitchen-remodeling-hero.webp',
    alt: 'Kitchen remodel Tampa Bay',
    title: 'Kitchen Remodel',
    href: '/kitchen-remodeling-tampa',
    description:
      'Gorgeous, maintenance-free countertop installation, stylish backsplashes, cabinet solutions, and even more possibilities are on the menu.',
  },
  {
    image: '/bathroom-remodeling-hero.jpg',
    alt: 'Bathroom remodel Tampa Bay',
    title: 'Bathroom Remodel',
    href: '/bathroom-remodeling-tampa',
    description:
      'Transform your tired old bathroom with beautiful tiles, stunning vanity tops, and a stylish tub surround. We can even convert your little-used bathtub into a gorgeous new shower.',
  },
  {
    image: '/Kitchen-Cabinet-Showroom-Tampa.jpg',
    alt: 'Design inspiration Tampa Bay showroom',
    title: 'Design Inspiration',
    href: '/showroom-gallery',
    description:
      'Let us show you what Cabinets & Remodeling Depot — combined with a little imagination — can do for your home.',
  },
]

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function RenovationsPageClient() {
  return (
    <>
      {/* ── Page Header ───────────────────────────────────────────────────── */}
      <PageHeader
        title="Renovations"
        subtitle="Home / Renovations"
      />

      {/* ════════════════════════════════════════════════════════════════════
          1. INTRO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1">
                Cabinets &amp; Remodeling Depot
              </p>
              <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                Renovations
              </h2>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                The Company You Can Trust
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-5 text-gray-600 text-base sm:text-lg leading-[1.82]">
              <p>
                Are you getting tired of the same old kitchen and bathroom style? Is it time to
                change things up? The team at Cabinets &amp; Remodeling Depot will work with you
                to design your dream kitchen renovation and bathroom remodel project, and our
                installation professionals will complete the process! We can complete your project
                with minimal demolition so there is next to no mess, which means less disruption
                for your life.
              </p>
              <p>
                We are truly one-stop shopping for your kitchen renovation and bathroom remodel
                project. Our designers will work with you to determine your vision for your home,
                not just the latest trend that may not fit your style. We can transform your
                kitchen and bathroom into a refreshing, comfortable area or an impressive
                showplace. Not only will we make your home beautiful, but also functional.
              </p>
              <p>
                We will install maintenance-free countertops and provide expert cabinet solutions
                to make your kitchen a joy to work in, without spending a lot of time cleaning.
                The best part is all this can be accomplished quickly, affordably, and with little
                disruption to your busy lifestyle.
              </p>
              <p>
                Our professionals at Cabinets &amp; Remodeling Depot are excited to work with you
                to convert the worn-out areas of your home into stylish, new areas that make you
                want to have people over! Working side-by-side with you, and with a little
                imagination, our team will help make your dream a reality at an affordable price.
              </p>
              <p>
                Contact us for help with your kitchen renovation or bathroom remodeling project
                today. We are available for in-home or virtual consultations. Let us help make
                your property someplace you can&apos;t wait to come home to!
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. SERVICE CARDS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-warm-gray">
        <div className="container-custom max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {SERVICES.map(({ image, alt, title, href, description }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
                  {/* Card image */}
                  <div className="relative aspect-4/3 w-full shrink-0">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">
                      The Company You Can Trust
                    </p>
                    <h3 className="font-playfair text-xl font-extrabold text-gray-900 mb-3 leading-snug">
                      {title}
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-5 flex-1">
                      {description}
                    </p>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:gap-3 transition-all duration-200"
                    >
                      Learn More <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. BOTTOM CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/cabinet_img.webp"
            alt="Renovations Tampa Bay background"
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
                Tampa Bay Renovation Experts
              </p>
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-gold" />
            </div>
            <p className="font-playfair text-gray-900 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-6">
              Ready to transform your home? Contact us today for a free consultation and let us
              bring your vision to life.
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
