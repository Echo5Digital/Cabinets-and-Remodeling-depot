'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Phone, Calendar } from 'lucide-react'
import { COMPANY_PHONE, COMPANY_PHONE_DISPLAY } from '@/lib/constants'

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

const IMAGES = [
  { src: '/cabinet-raised.webp',                          alt: 'Raised panel kitchen cabinet close-up' },
  { src: '/kitchencabinet3.jpg',                          alt: 'Raised panel cabinet kitchen installation' },
  { src: '/kitchencabinet4.jpg',                          alt: 'Raised panel cabinets in kitchen' },
  { src: '/kitchen-cabinet-2.jpg',                        alt: 'Raised panel kitchen cabinet design' },
  { src: '/kitchen-cabinet-3.jpg',                        alt: 'Raised panel cabinet detail' },
  { src: '/Custom-Cabinets-and-Countertops-for-Tampa-2.jpg', alt: 'Custom raised panel cabinet installation Tampa' },
]

export function RaisedPanelPageClient() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex flex-col min-h-[90vh] md:min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/cabinet-raised.webp"
            alt="Raised panel kitchen cabinets hero"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.44) 32%, rgba(0,0,0,0.14) 60%, rgba(0,0,0,0.00) 80%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 30%)' }} />
        </div>

        <div className="relative z-10 flex-1 flex items-center py-20 sm:py-24 md:py-32">
          <div className="container-custom w-full">
            <div className="max-w-lg lg:max-w-xl xl:max-w-2xl lg:pl-6 xl:pl-10">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-xs uppercase tracking-[0.18em] font-bold text-white/60 mb-4"
              >
                Kitchen Cabinets
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="font-playfair font-extrabold leading-[1.08] mb-5"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.72), 0 1px 6px rgba(0,0,0,0.62)' }}
              >
                <span className="block text-white text-3xl sm:text-4xl md:text-[3.1rem] lg:text-[3.5rem]">Classic Elegance with</span>
                <span className="block text-gold text-2xl sm:text-[1.7rem] md:text-[2.5rem] lg:text-[2.8rem] mt-1.5 leading-[1.1]">Raised Panel Cabinets</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.20 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="h-0.75 w-12 rounded-full bg-gold" />
                <div className="h-px w-20 rounded-full bg-white/30" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/94 text-gray-900 hover:text-primary font-bold uppercase tracking-widest text-sm h-12 px-9 rounded-lg transition-all duration-300 whitespace-nowrap shadow-xl shadow-black/30"
                >
                  <Calendar className="h-4 w-4 shrink-0" />
                  Get Free Estimate
                </Link>
                <a
                  href={`tel:${COMPANY_PHONE}`}
                  className="inline-flex items-center justify-center gap-2 border border-primary/65 text-white hover:bg-primary/10 font-semibold uppercase tracking-widest text-sm h-12 px-9 rounded-lg transition-all duration-300 whitespace-nowrap backdrop-blur-sm"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary/80" />
                  Call {COMPANY_PHONE_DISPLAY}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Text Section ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <p className="text-gray-600 text-base sm:text-lg leading-[1.82]">
              Rich in character and timeless appeal, Raised Panel cabinets bring depth, detail, and refined craftsmanship to any kitchen. Their sculpted center panels and decorative profiles create a warm, inviting atmosphere, making them an excellent choice for traditional, transitional, and luxury-inspired interiors. Available in a variety of wood species, finishes, and colors, these cabinets offer enduring beauty that never goes out of style.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Image Gallery ── */}
      <section className="py-16 md:py-20 bg-warm-gray">
        <div className="container-custom max-w-7xl">
          <FadeIn className="mb-10">
            <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-gray-900">
              Signature Raised Panel Collection
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {IMAGES.map(({ src, alt }, i) => (
              <FadeIn key={src} delay={i * 0.07}>
                <div className="relative aspect-4/5 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom Line ── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/cabinet_img.webp" alt="Raised panel cabinets background" fill className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-white/80" />
        </div>
        <div className="relative z-10 container-custom max-w-3xl text-center px-4">
          <FadeIn>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-gold" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold whitespace-nowrap">Tampa Bay Cabinet Experts</p>
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-gold" />
            </div>
            <p className="font-playfair text-gray-900 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-6">
              Every cabinet is thoughtfully crafted and professionally installed to showcase exceptional craftsmanship, lasting quality, and timeless elegance in every detail.
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
