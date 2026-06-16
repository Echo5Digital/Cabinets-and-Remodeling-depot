'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle2, Navigation, Phone } from 'lucide-react'

const FEATURES = [
  'Experienced remodeling professionals',
  'Local Valrico showroom',
  'Affordable and custom cabinet options',
  'In-stock cabinetry available',
  'Personalized project support',
  'Professional installation services',
  'One-stop remodeling solutions',
]

export function WhyChooseSection({ data }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const heading = data && data.heading ? data.heading : "Why Homeowners Choose Cabinets & Remodeling Depot"
  const body = data && data.body ? data.body : "Homeowners across Tampa Bay continue to choose Cabinets & Remodeling Depot because we focus on honest service, quality workmanship, and practical remodeling guidance."
  const features = data && data.features && data.features.length ? data.features : FEATURES
  const closingText = data && data.closingText ? data.closingText : "We believe remodeling should feel organized, transparent, and tailored to your home—not rushed or overly complicated."
  const bgImage = data && data.bgImage ? data.bgImage : '/cabinet-remodeling-shop.webp'
  const address = data && data.address ? data.address : "106 S St Cloud Ave, Valrico, FL 33594"
  const phone = data && data.phone ? data.phone : "+1 813-651-2333"
  const rawDigits = (data && data.phone ? data.phone : "8136512333").replace(/\D/g, "")
  const phoneHref = "tel:+" + (rawDigits.length === 11 ? rawDigits : "1" + rawDigits)
  const email = data && data.email ? data.email : "sales@cabinetsandremodelingdepot.com"
  const hours = data && data.hours ? data.hours : "Mon \u2013 Fri: 10:00AM \u2013 6:00PM\nSat: 10:00AM \u2013 4:00PM\nSun: Closed"
  const mapLink = data && data.mapLink ? data.mapLink : "https://maps.google.com/?q=106+S+St+Cloud+Ave+Valrico+FL+33594"

  return (
    <section ref={ref} className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">

        {/* ── Panel 1 — Dark primary (Why Choose Us) ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-primary px-8 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20 flex flex-col justify-between"
        >
          <div>
            {/* Label + rule */}
            <p className="text-xs uppercase tracking-[0.22em] font-bold text-white/50 mb-2">
              Why Choose Us
            </p>
            <div className="w-10 h-[2px] bg-white/25 mb-8" />

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase leading-tight mb-5">
              {heading}
            </h2>

            <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-8">
              {body}
            </p>

            <ul className="space-y-4 mb-6">
              {features.map((text, i) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: -14 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-white/60 shrink-0" />
                  <span className="text-white/90 font-medium text-base leading-snug">{text}</span>
                </motion.li>
              ))}
            </ul>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8">
              {closingText}
            </p>
          </div>

          <div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 border-2 border-white/60 text-white font-bold text-xs sm:text-sm uppercase tracking-widest px-7 py-3.5 rounded-sm hover:bg-white hover:text-primary transition-colors duration-200"
            >
              Learn More About Us
              <span className="text-base leading-none">›</span>
            </Link>
          </div>
        </motion.div>

        {/* ── Panel 2 — Showroom image with overlay card ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative flex flex-col justify-end px-8 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20 min-h-80 sm:min-h-100 md:min-h-0"
        >
          {/* Background image */}
          <Image
            src={bgImage}
            alt="Cabinets & Remodeling Depot Valrico showroom exterior"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 60vw"
          />

          {/* Overlay — light tint overall, stronger vignette only at bottom for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.15) 100%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10">

            {/* Come See Us — italic script label */}
            <div className="flex items-center gap-3 mb-3">
              <p
                className="text-white/85 text-lg font-medium italic tracking-wide"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Come See Us
              </p>
              <div className="flex-1 h-px bg-white/25" />
            </div>

            {/* Star divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-6 bg-white/25" />
              <span className="text-primary text-sm">★</span>
              <div className="flex-1 h-px bg-white/25" />
            </div>

            {/* Heading */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase leading-tight mb-2">
              Visit Our Valrico Showroom
            </h3>
            <p className="text-white/60 text-xs font-bold uppercase tracking-[0.18em] mb-7">
              See our quality. Plan your dream.
            </p>

            {/* Contact details — plain text, no box */}
            <div className="space-y-5 mb-8">
              {/* Address */}
              <div className="border-b border-white/15 pb-4">
                <p className="text-[0.6rem] uppercase tracking-[0.16em] font-bold text-white/45 mb-1">Address</p>
                <p className="text-white font-semibold text-sm leading-snug">
                  {address}
                </p>
              </div>

              {/* Phone */}
              <div className="border-b border-white/15 pb-4">
                <p className="text-[0.6rem] uppercase tracking-[0.16em] font-bold text-white/45 mb-1">Phone</p>
                <a
                  href={phoneHref}
                  className="text-white font-semibold text-sm hover:text-primary transition-colors"
                >{phone}
                </a>
              </div>

              {/* Email */}
              <div className="border-b border-white/15 pb-4">
                <p className="text-[0.6rem] uppercase tracking-[0.16em] font-bold text-white/45 mb-1">Email</p>
                <a
                  href={`mailto:${email}`}
                  className="text-white font-semibold text-sm hover:text-primary transition-colors break-all"
                >{email}
                </a>
              </div>

              {/* Hours */}
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.16em] font-bold text-white/45 mb-1">Hours</p>
                <p className="text-white font-semibold text-sm leading-relaxed whitespace-pre-wrap">
                  {hours}
                </p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-bold text-xs sm:text-sm uppercase tracking-widest px-6 py-3.5 rounded-sm hover:bg-primary/90 transition-colors duration-200"
              >
                <Navigation className="h-4 w-4 shrink-0" />
                Directions
              </a>
              <a
                href={phoneHref}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-white/55 text-white font-bold text-xs sm:text-sm uppercase tracking-widest px-6 py-3.5 rounded-sm hover:bg-white hover:text-gray-900 transition-colors duration-200"
              >
                <Phone className="h-4 w-4 shrink-0" />
                Call Now
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
