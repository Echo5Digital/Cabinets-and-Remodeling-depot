'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  ArrowRight,
  CheckCircle,
  Gift,
  Store,
  Shield,
  Star,
  MessageCircle,
  ThumbsUp,
  ChevronDown,
} from 'lucide-react'
import { useState } from 'react'
import { useSettings } from '@/hooks/useSettings'
import { ContactForm } from '@/components/forms/ContactForm'
import { COMPANY_PHONE_DISPLAY, COMPANY_ADDRESS } from '@/lib/constants'

const MAP_URL =
  'https://maps.google.com/maps?cid=18201794426186346316&output=embed&hl=en-US&t=k'

/* ─── Fade-in animation wrapper ─────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Section label ──────────────────────────────────────────────────────────── */
function SectionLabel({ children, light = false }) {
  return (
    <p className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] mb-3 ${light ? 'text-white/80' : 'text-primary'}`}>
      <span className={`w-6 h-px inline-block ${light ? 'bg-white/60' : 'bg-primary'}`} />
      {children}
      <span className={`w-6 h-px inline-block ${light ? 'bg-white/60' : 'bg-primary'}`} />
    </p>
  )
}

/* ─── Shared serif class ─────────────────────────────────────────────────────── */
const serif = 'font-[family-name:var(--font-playfair)]'

/* ─── Static data ────────────────────────────────────────────────────────────── */
const HOURS = [
  { day: 'Monday – Friday', hours: '10:00 AM – 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM – 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
]

const WHY_CONTACT = [
  {
    icon: Gift,
    title: 'Free Design Consultation',
    description: 'Receive personalized recommendations based on your home, style, and budget.',
  },
  {
    icon: Store,
    title: 'One-Stop Remodeling Showroom',
    description: 'Cabinets, countertops, flooring, bathrooms, kitchens, and more—all under one roof.',
  },
  {
    icon: Shield,
    title: 'Experienced Remodeling Professionals',
    description: 'Serving Tampa Bay homeowners since 2005 with trusted craftsmanship and exceptional service.',
  },
  {
    icon: Star,
    title: 'Premium Products',
    description: 'Choose from quality materials designed for lasting beauty and performance.',
  },
  {
    icon: MessageCircle,
    title: 'Honest Guidance',
    description: 'No pressure. No guesswork. Just experienced professionals helping you make informed decisions.',
  },
  {
    icon: ThumbsUp,
    title: 'Customer Satisfaction',
    description: 'We\'re committed to delivering remodeling solutions that exceed expectations from consultation to completion.',
  },
]

const PROCESS_STEPS = [
  {
    step: '1',
    icon: CheckCircle,
    title: 'Submit your estimate request.',
  },
  {
    step: '2',
    icon: Phone,
    title: 'Our team contacts you to discuss your project.',
  },
  {
    step: '3',
    icon: Store,
    title: 'Visit our showroom or schedule an on-site consultation.',
  },
  {
    step: '4',
    icon: ArrowRight,
    title: 'Receive your customized remodeling plan and estimate.',
  },
  {
    step: '5',
    icon: Star,
    title: 'Begin transforming your home with confidence.',
  },
]

const FAQS = [
  {
    question: 'Do you offer free estimates?',
    answer: 'Yes. We provide complimentary consultations and project estimates for homeowners throughout the Tampa Bay area.',
  },
  {
    question: 'Do I need an appointment to visit the showroom?',
    answer: 'Walk-ins are welcome, but scheduling an appointment allows us to dedicate time to your project and provide personalized assistance.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We proudly serve Valrico, Tampa, Brandon, Riverview, FishHawk, Lithia, Plant City, and many surrounding communities.',
  },
  {
    question: 'Do you provide complete remodeling services?',
    answer: 'Yes. We offer kitchen remodeling, bathroom remodeling, cabinets, countertops, flooring, and complete home remodeling solutions.',
  },
]

/* ─── FAQ Item ───────────────────────────────────────────────────────────────── */
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-b border-gray-200 last:border-b-0 ${open ? 'bg-white' : ''}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors"
      >
        <span className={`font-semibold text-sm sm:text-base leading-snug transition-colors ${open ? 'text-gray-900 font-bold' : 'text-gray-900'} ${serif}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${open ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <ChevronDown
            className={`w-4 h-4 transition-all duration-300 ${open ? 'rotate-180 text-white' : 'text-gray-500'}`}
          />
        </div>
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function ContactPageClient() {
  const { data: settings } = useSettings()

  const phone = settings?.phone || COMPANY_PHONE_DISPLAY
  const phoneHref = `tel:+1${phone.replace(/\D/g, '').slice(-10)}`
  const address = settings?.address || COMPANY_ADDRESS

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. HERO — full viewport, background image
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative flex flex-col min-h-[75vh] md:min-h-[80vh] overflow-hidden">

        {/* Background image with gradient scrim */}
        <div className="absolute inset-0">
          <Image
            src="/cabinet-contact.webp"
            alt="Cabinets & Remodeling Depot — Contact Us"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.52) 38%, rgba(0,0,0,0.22) 65%, rgba(0,0,0,0.04) 85%)',
            }}
          />
        </div>

        {/* Main content */}
        <div className="relative z-10 flex-1 flex items-center py-20 sm:py-24 md:py-32">
          <div className="container-custom w-full">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-lg lg:max-w-2xl lg:pl-6 xl:pl-10"
            >
              {/* Location badge pill */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06 }}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-7 border border-white/20"
                style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}
              >
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0" style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.7))' }} />
                <span
                  className="text-white text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em]"
                  style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
                >
                  Serving Tampa Bay Since 2005
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className={`font-extrabold leading-[1.08] mb-5 ${serif}`}
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.72), 0 1px 6px rgba(0,0,0,0.62)' }}
              >
                <span className="block text-white text-3xl sm:text-4xl md:text-[3.1rem] lg:text-[3.5rem]">
                  Let&apos;s Bring Your
                </span>
                <span className="block text-gold text-2xl sm:text-[1.7rem] md:text-[2.5rem] lg:text-[2.8rem] mt-1.5 leading-[1.1]">
                  Dream Home to Life
                </span>
              </motion.h1>

              {/* Gold accent divider */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.20 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-0.75 w-12 rounded-full bg-gold" />
                <div className="h-px w-20 rounded-full bg-white/30" />
              </motion.div>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.26 }}
                className="text-white/90 text-sm sm:text-base lg:text-[1.05rem] leading-[1.78] mb-9 max-w-120"
                style={{ textShadow: '0 1px 10px rgba(0,0,0,0.75), 0 0 20px rgba(0,0,0,0.60)' }}
              >
                Whether you&apos;re planning a kitchen remodel, bathroom renovation, custom cabinetry,
                new countertops, or flooring installation, our experienced team is here to help.
                Visit our showroom, request a free estimate, or contact us today to start your
                remodeling journey.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="#estimate-form"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm h-12 px-9 rounded-lg transition-all duration-300 whitespace-nowrap shadow-xl shadow-black/30"
                >
                  Get Free Estimate
                </a>
                <a
                  href="#showroom"
                  className="inline-flex items-center justify-center gap-2 border border-white/40 text-white hover:bg-white/10 font-semibold uppercase tracking-widest text-sm h-12 px-9 rounded-lg transition-all duration-300 whitespace-nowrap backdrop-blur-sm"
                >
                  Visit Our Showroom
                </a>
              </motion.div>

            </motion.div>
          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. FREE ESTIMATE FORM
      ════════════════════════════════════════════════════════════════════ */}
      <section id="estimate-form" className="bg-white overflow-hidden">

        <div className="grid lg:grid-cols-[5fr_7fr] min-h-[640px]">

          {/* Left panel — maroon */}
          <FadeIn className="bg-primary flex flex-col justify-center px-8 sm:px-10 md:px-12 lg:px-14 py-14 md:py-20">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/60 mb-5">
              <span className="w-5 h-px bg-white/40 inline-block" />
              Free Estimates
              <span className="w-5 h-px bg-white/40 inline-block" />
            </p>

            <h2 className={`text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-white leading-tight mb-5 ${serif}`}>
              Tell Us About<br />Your Project
            </h2>

            <div className="w-12 h-0.5 bg-white/30 mb-7" />

            <p className="text-white/75 text-sm sm:text-[0.95rem] leading-[1.8] mb-10">
              Ready to transform your home? Fill out the form and one of our remodeling
              specialists will contact you to discuss your project and schedule your
              free consultation.
            </p>

            {/* Trust badges */}
            <div className="flex flex-col gap-3.5">
              {[
                { icon: CheckCircle, text: 'Free consultation — no obligation' },
                { icon: Shield,      text: 'Serving Tampa Bay since 2005' },
                { icon: ThumbsUp,    text: '100% customer satisfaction' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-white/50 shrink-0" strokeWidth={1.8} />
                  <span className="text-white/80 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Right panel — form */}
          <FadeIn delay={0.12} className="flex flex-col justify-center px-7 sm:px-10 md:px-14 lg:px-16 py-14 md:py-20 bg-white">
            <ContactForm source="contact-page" />
          </FadeIn>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. VISIT OUR SHOWROOM — dark full-bleed section
      ════════════════════════════════════════════════════════════════════ */}
      <section id="showroom" className="relative py-16 md:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/contact-cabinet.webp"
            alt="Visit our Valrico showroom"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/78" />
        </div>

        <div className="relative z-10 container-custom max-w-7xl">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">

            {/* Left — main info (3 cols) */}
            <div className="lg:col-span-3">
              <FadeIn>
                <SectionLabel light>Visit Our Showroom</SectionLabel>
                <h2 className={`text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4 ${serif}`}>
                  See the Quality Before You Decide
                </h2>
                <div className="w-14 h-1 bg-primary rounded-full mb-6" />
                <div className="space-y-4 text-white/80 text-sm sm:text-base leading-relaxed mb-8">
                  <p>
                    There&apos;s no better way to explore your remodeling options than by visiting our
                    showroom. Browse kitchen cabinets, bathroom vanities, countertops, flooring,
                    hardware, and design displays while speaking with our experienced remodeling
                    specialists.
                  </p>
                  <p>
                    Whether you&apos;re gathering inspiration or ready to begin your project, we&apos;re here
                    to help you make confident decisions.
                  </p>
                </div>

                <Link
                  href="https://maps.google.com/?q=106+S+St+Cloud+Ave+Valrico+FL+33594"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm h-12 px-8 rounded-lg transition-colors shadow-lg shadow-primary/30"
                >
                  Get Directions
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </FadeIn>
            </div>

            {/* Right — showroom details (2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* Address, Phone, Email */}
              <FadeIn delay={0.1}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5 sm:p-6">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">
                    Showroom Information
                  </p>

                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Address</p>
                      <p className="text-white font-semibold text-sm leading-relaxed">
                        106 S St Cloud Ave<br />Valrico, FL 33594
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Phone</p>
                      <a href="tel:+18136512333" className="text-white font-semibold text-sm hover:text-gold transition-colors">
                        (813) 651-2333
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Email</p>
                      <a href="mailto:sales@cabinetsandremodelingdepot.com" className="text-white font-semibold text-sm hover:text-gold transition-colors break-all">
                        sales@cabinetsandremodelingdepot.com
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Hours */}
              <FadeIn delay={0.18}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-white/60" />
                    <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Business Hours</p>
                  </div>
                  <div className="space-y-3">
                    {HOURS.map(({ day, hours }) => (
                      <div key={day} className="flex items-center justify-between gap-4">
                        <span className="text-white/80 text-sm font-medium">{day}</span>
                        <span className={`text-sm font-bold ${hours === 'Closed' ? 'text-white/40' : 'text-white'}`}>{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. GOOGLE MAP — full-width, minimal wrapper
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="container-custom max-w-7xl py-14 md:py-20">

          <FadeIn className="text-center mb-8">
            <SectionLabel>Find Us Easily</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight ${serif}`}>
              Conveniently Located in Valrico
            </h2>
            <div className="w-14 h-1 bg-gray-300 rounded-full mx-auto mt-4 mb-4" />
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Our showroom proudly serves homeowners throughout Tampa and the surrounding communities.
              Use the interactive map below for directions, then stop by to explore our products and
              meet with our remodeling experts.
            </p>
          </FadeIn>

        </div>

        <FadeIn>
          <iframe
            src={MAP_URL}
            width="100%"
            height="460"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Cabinets & Remodeling Depot — 106 S St Cloud Ave, Valrico, FL 33594"
          />
        </FadeIn>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. WHY CONTACT US — 6-card grid on white
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-12">
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 ${serif}`}>
              Why Contact Cabinets &amp; Remodeling Depot?
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CONTACT.map(({ icon: Icon, title, description }, i) => (
              <FadeIn key={title} delay={i * 0.07}>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-7 hover:border-gray-300 hover:shadow-md transition-all duration-200 h-full group">
                  {/* Diamond icon */}
                  <div className="w-12 h-12 relative flex items-center justify-center mb-5">
                    <div className="w-10 h-10 bg-gold rotate-45 absolute" />
                    <Icon className="w-4.5 h-4.5 text-white relative z-10 -rotate-0" strokeWidth={1.8} />
                  </div>
                  <h3 className={`font-bold text-gray-900 text-base sm:text-lg mb-2 leading-snug ${serif}`}>
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. WHAT HAPPENS NEXT — 5-step process on warm-gray
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-warm-gray border-y border-[#E8DFD0]">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-14">
            <SectionLabel>What Happens Next</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 ${serif}`}>
              Your Path to a <span className="text-primary">Beautiful Home</span>
            </h2>
          </FadeIn>

          <div className="relative">
            {/* Connecting line — desktop only */}
            <div className="hidden lg:block absolute top-9 left-[8%] right-[8%] h-px bg-linear-to-r from-transparent via-gray-300 to-transparent z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
              {PROCESS_STEPS.map(({ step, icon: Icon, title }, i) => (
                <FadeIn key={step} delay={i * 0.09}>
                  <div className="relative z-10 flex flex-col items-center text-center gap-4">
                    <div className="relative">
                      {/* Outlined circle instead of filled */}
                      <div className="w-18 h-18 rounded-full bg-white border-2 border-primary shadow-md flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-extrabold flex items-center justify-center leading-none shadow">
                        {step}
                      </span>
                    </div>
                    <div>
                      <h3 className={`font-bold text-gray-900 text-sm sm:text-base leading-snug ${serif}`}>
                        {title}
                      </h3>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          7. FAQs — clean accordion on white
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-3xl">

          <FadeIn className="text-center mb-12">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 ${serif}`}>
              Frequently Asked Questions
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-200">
              {FAQS.map((faq) => (
                <div key={faq.question} className="px-6 bg-white">
                  <FaqItem question={faq.question} answer={faq.answer} />
                </div>
              ))}
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          8. FINAL CTA — dark overlay
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/kitchen_cabinet_remodeling-01.webp"
            alt="Ready to start your remodeling project"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 container-custom max-w-3xl text-center px-4">
          <FadeIn>
            {/* Label */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-white/40" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70 whitespace-nowrap">
                Tampa Bay Remodeling Experts
              </p>
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-white/40" />
            </div>

            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5 ${serif}`}
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              Ready to <span className="text-primary">Start Your Remodeling</span> Project?
            </h2>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Your dream home begins with a conversation. Contact Cabinets &amp; Remodeling Depot
              today to schedule your free consultation, visit our showroom, or request a
              personalized estimate.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#estimate-form"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm h-13 px-9 rounded-lg transition-colors shadow-lg shadow-black/30 whitespace-nowrap"
              >
                Request Free Estimate
              </a>
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white hover:bg-white/10 font-bold uppercase tracking-widest text-sm h-13 px-9 rounded-lg transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 shrink-0" />
                Call (813) 651-2333
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
