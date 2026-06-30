'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Phone, MapPin, Clock } from 'lucide-react'
import { useSettings } from '@/hooks/useSettings'
import { ContactForm } from '@/components/forms/ContactForm'
import { COMPANY_PHONE_DISPLAY, COMPANY_ADDRESS } from '@/lib/constants'

const MAP_URL =
  'https://maps.google.com/maps?cid=18201794426186346316&output=embed&hl=en-US&t=k'

export function ContactPageClient() {
  const { data: settings } = useSettings()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const phone = settings?.phone || COMPANY_PHONE_DISPLAY
  const phoneHref = `tel:+1${phone.replace(/\D/g, '').slice(-10)}`
  const address = settings?.address || COMPANY_ADDRESS

  const infoItems = [
    {
      icon: MapPin,
      label: 'Location',
      lines: [address],
    },
    {
      icon: Clock,
      label: 'Work Time',
      lines: ['Mon-Fri 10:00AM - 6:00PM', 'Sat 10:00AM - 4:00PM'],
    },
    {
      icon: Phone,
      label: 'Phone Number',
      lines: [phone],
      href: phoneHref,
    },
  ]

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="section-padding bg-gray-900">
        <div className="container-custom text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">Contact Us</h1>
            <p className="text-white/50 text-sm tracking-wide">
              Home&nbsp;/&nbsp;Contact Us
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Info Bar ── */}
      <div className="relative py-10 md:py-16">
        {/* Split background */}
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-primary" />
          <div className="w-1/2 bg-gray-500" />
        </div>

        {/* White floating card — fixed side margins so background stays visible */}
        <div className="relative mx-4 sm:mx-8 lg:mx-20 xl:mx-32">
          <div className="bg-white shadow-xl py-10 md:py-14 px-6 md:px-10">

            {/* Card header */}
            <div className="text-center mb-8 md:mb-12">
              {/* Diamond icon with phone inside */}
              <div className="flex items-center justify-center mb-5">
                <div className="w-11 h-11 bg-primary rotate-45 flex items-center justify-center shadow-md">
                  <Phone className="h-5 w-5 text-white -rotate-45" />
                </div>
              </div>
              <div className="inline-block border-2 border-gray-200 px-10 py-3 mb-4">
                <h2 className="text-xl md:text-2xl font-bold tracking-[0.25em] uppercase text-foreground">
                  Contact Info
                </h2>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-10 bg-primary/40" />
                <p className="text-primary text-sm font-medium tracking-wide">
                  Quality · Service · Value.
                </p>
                <div className="h-px w-10 bg-primary/40" />
              </div>
            </div>

            {/* 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {infoItems.map(({ icon: Icon, label, lines, href }) => (
                <div
                  key={label}
                  className="flex flex-col py-6 md:py-4 md:px-8"
                >
                  {/* Icon + label on same row */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <Icon className="h-5 w-5 text-primary shrink-0" />
                    <p className="font-bold text-gray-800 text-sm md:text-base uppercase tracking-wider">{label}</p>
                  </div>
                  {/* Horizontal rule */}
                  <div className="h-px bg-gray-200 mb-3" />
                  {/* Value text */}
                  {lines.map((line, i) =>
                    href && i === 0 ? (
                      <a
                        key={i}
                        href={href}
                        className="text-gray-600 text-sm md:text-base hover:text-primary transition-colors wrap-break-word"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={i} className="text-gray-600 text-sm md:text-base leading-relaxed wrap-break-word">{line}</p>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Free Estimates + Form ── */}
      <section ref={ref} className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 shadow-xl rounded-2xl overflow-hidden">

            {/* Left: info panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="bg-white px-8 md:px-12 py-12 flex flex-col justify-center"
            >
              {/* logo_fav */}
              <div className="relative w-20 h-20 overflow-hidden mb-6 shrink-0">
                <Image
                  src="/logo_fav.png"
                  alt="Cabinets & Remodeling Depot"
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>

              <span className="inline-block w-fit border-2 border-primary text-primary text-xs font-bold tracking-[0.2em] uppercase px-5 py-2 mb-5">
                Free Estimates
              </span>

              <p className="text-muted-foreground text-sm tracking-wide mb-4">
                Quality · Service · Value.
              </p>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
                It is now too easy to get a Free Estimate
              </h2>

              <p className="text-muted-foreground text-sm leading-relaxed">
                Please fill up the form and get a free estimate
              </p>
            </motion.div>

            {/* Right: dark form panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="bg-gray-900 px-8 md:px-12 py-12"
            >
              <ContactForm source="contact-page" dark />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Google Map ── */}
      <div className="w-full">
        <iframe
          src={MAP_URL}
          width="100%"
          height="450"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Cabinets & Remodeling Depot — 106 S St Cloud Ave, Valrico, FL 33594"
        />
      </div>
    </>
  )
}
