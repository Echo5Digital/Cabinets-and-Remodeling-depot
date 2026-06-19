'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ImageLightbox } from '@/components/common/ImageLightbox'
import {
  Package,
  Wrench,
  Building2,
  CheckCircle,
  Check,
  ArrowRight,
  ClipboardList,
  Hammer,
  MessageSquare,
  Settings2,
  Clock,
  ShoppingBag,
  ZoomIn,
  Plus,
  Minus,
  MapPin,
  Calendar,
  Star,
  Phone,
} from 'lucide-react'

/* ─── Fade-in animation wrapper ────────────────────────────────────────────── */
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

/* ─── Section label component ───────────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">
      <span className="w-6 h-px bg-primary inline-block" />
      {children}
      <span className="w-6 h-px bg-primary inline-block" />
    </p>
  )
}

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const TRUST_ITEMS = [
  { icon: Package,   line1: 'In-Stock',        line2: 'Inventory Available' },
  { icon: Check,     line1: 'Affordable',       line2: 'Cabinet Options' },
  { icon: Wrench,    line1: 'Professional',     line2: 'Installation' },
  { icon: Building2, line1: 'Valrico',          line2: 'Showroom' },
]

const CABINET_OPTIONS = [
  {
    image: '/instock-cabinets-1.jpg',
    alt: 'Stock cabinets Tampa',
    title: 'Stock Cabinets',
    description:
      'Stock cabinets are a popular solution for homeowners who want quality cabinetry without long lead times. Available in standard sizes and styles, ideal for faster remodeling projects.',
  },
  {
    image: '/Custom-Cabinets-and-Countertops-for-Tampa-2.jpg',
    alt: 'Semi-custom cabinets Tampa',
    title: 'Semi-Custom Cabinets',
    description:
      'Semi-custom cabinets offer additional flexibility in finishes, storage features, and configurations while maintaining a more manageable budget than fully custom options.',
  },
  {
    image: '/instock-cabinets-2.jpg',
    alt: 'Ready-to-install cabinets Tampa',
    title: 'Ready-to-Install Cabinets',
    description:
      'Ready-to-install cabinets provide homeowners with an efficient way to upgrade their kitchen while reducing project timelines and simplifying the remodeling process.',
  },
  {
    image: '/cabinet_remodeling_kitchen-03.webp',
    alt: 'Cabinet replacement solutions Tampa',
    title: 'Cabinet Replacement Solutions',
    description:
      "Replacing outdated cabinets can dramatically improve a kitchen's appearance and functionality without requiring a complete renovation.",
  },
]

const WHY_CHOOSE = [
  {
    icon: Building2,
    title: 'Local Valrico Showroom',
    description:
      'Explore cabinet styles, finishes, and design options in person before making important remodeling decisions.',
  },
  {
    icon: Package,
    title: 'In-Stock & Ready-to-Install Options',
    description: 'Reduce wait times and move your project forward more efficiently.',
  },
  {
    icon: Wrench,
    title: 'Professional Installation Services',
    description:
      'Our experienced team ensures cabinets are installed with precision and attention to detail.',
  },
  {
    icon: Settings2,
    title: 'Personalized Design Guidance',
    description:
      'We help homeowners select cabinet solutions that align with their goals, lifestyle, and budget.',
  },
  {
    icon: ShoppingBag,
    title: 'One-Stop Remodeling Support',
    description:
      'From cabinets and countertops to flooring and renovation planning, we help simplify the remodeling process.',
  },
]

const INSPIRATION_STYLES = [
  'White Shaker Cabinets',
  'Modern Flat-Panel Cabinets',
  'Transitional Kitchen Designs',
  'Traditional Raised-Panel Cabinets',
  'Two-Tone Cabinet Combinations',
  'Contemporary Storage Solutions',
]

const PROCESS_STEPS = [
  {
    step: '01',
    icon: Building2,
    title: 'Visit Our Showroom',
    description: 'Explore cabinet displays, finishes, and design ideas in person.',
  },
  {
    step: '02',
    icon: ClipboardList,
    title: 'Compare Cabinet Options',
    description: 'Review stock, semi-custom, and ready-to-install solutions.',
  },
  {
    step: '03',
    icon: MessageSquare,
    title: 'Receive Design Guidance',
    description: 'Work with our team to select cabinetry that fits your space and budget.',
  },
  {
    step: '04',
    icon: Hammer,
    title: 'Schedule Installation',
    description: 'Coordinate professional installation and project planning.',
  },
  {
    step: '05',
    icon: CheckCircle,
    title: 'Enjoy Your Updated Kitchen',
    description:
      'Experience a kitchen that feels more functional, organized, and visually appealing.',
  },
]

const FAQS = [
  {
    question: 'Do you offer in-stock cabinets Tampa homeowners can purchase quickly?',
    answer:
      'Yes. We provide a wide selection of in-stock cabinets available for faster remodeling timelines.',
  },
  {
    question: 'Are ready-to-install cabinets durable?',
    answer:
      'Absolutely. Many modern ready-to-install cabinets offer strong construction, reliable hardware, and long-lasting finishes.',
  },
  {
    question: 'Can I view cabinet styles in person before purchasing?',
    answer:
      'Yes. Our Valrico showroom allows homeowners to compare cabinet finishes, storage features, and design combinations firsthand.',
  },
  {
    question: 'Do you provide quick cabinet installation Tampa services?',
    answer:
      'Yes. We offer professional cabinet installation services throughout Tampa Bay and surrounding communities.',
  },
  {
    question: "What's the difference between stock and semi-custom cabinets?",
    answer:
      'Stock cabinets come in standard sizes and configurations, while semi-custom cabinets offer greater flexibility in finishes, storage features, and design options.',
  },
]

const CABINET_IMAGES = [
  { src: '/kitchen-remodel.webp',                            alt: 'Kitchen remodel with new cabinets Tampa' },
  { src: '/kitchen-remodel-2.webp',                          alt: 'Modern kitchen cabinet remodel Tampa Bay' },
  { src: '/kitchen_cabinet_4.jpg',                           alt: 'Custom kitchen cabinets Tampa showroom' },
  { src: '/kitchen_cabinet_5.jpg',                           alt: 'Affordable kitchen cabinets Tampa' },
  { src: '/kitchen-cabinet-2.jpg',                           alt: 'White shaker cabinets Tampa installation' },
  { src: '/kitchen-cabinet-3.jpg',                           alt: 'In-stock kitchen cabinets Tampa Bay' },
  { src: '/instock-cabinets-1.jpg',                          alt: 'In-stock cabinets available in Valrico showroom' },
  { src: '/Custom-Cabinets-and-Countertops-for-Tampa-2.jpg', alt: 'Semi-custom cabinets and countertops Tampa' },
]

/* ═══════════════════════════════════════════════════════════════════════════════
   FAQ ACCORDION (inline, for split layout)
══════════════════════════════════════════════════════════════════════════════ */
function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className={`border rounded-lg overflow-hidden transition-shadow duration-200 ${
              isOpen ? 'border-primary/30 shadow-sm' : 'border-gray-200'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="w-full flex items-start gap-3 px-4 py-4 text-left cursor-pointer"
              aria-expanded={isOpen}
            >
              <span
                className={`shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  isOpen ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </span>
              <span
                className={`font-semibold text-sm md:text-base leading-snug ${
                  isOpen ? 'text-primary' : 'text-gray-800'
                }`}
              >
                {faq.question}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pl-4 pr-4 pb-4 text-gray-500 leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Shared serif class ─────────────────────────────────────────────────────── */
const serif = 'font-[family-name:var(--font-playfair)]'

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function CabinetsPageClient() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. HERO — full viewport, cabinets background
             Mirrors the bathroom remodeling page hero layout & overlay
      ════════════════════════════════════════════════════════════════════ */}
      <section id="cabinets-hero" className="relative flex flex-col min-h-[90vh] md:min-h-screen overflow-hidden">

        {/* ── Background image — no dark wash on right, text-contrast scrim on left ── */}
        <div className="absolute inset-0">
          <Image
            src="/instock-cabinets-hero.webp"
            alt="In-stock cabinets Tampa Affordable & Ready-to-Install Cabinet Solutions"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />

          {/* Feather-light left scrim — enough for text contrast, right half stays clear */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.48) 35%, rgba(0,0,0,0.18) 62%, rgba(0,0,0,0.00) 82%)',
            }}
          />
        </div>

        {/* ── Main content ─────────────────────────────────────────────── */}
        <div className="relative z-10 flex-1 flex items-center py-20 sm:py-24 md:py-32">
          <div className="container-custom w-full">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-lg lg:max-w-xl xl:max-w-2xl lg:pl-6 xl:pl-10"
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
                  Serving Tampa Bay from Our Valrico Showroom
                </span>
              </motion.div>

              {/* H1 — 2-line luxury headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className={`font-extrabold leading-[1.08] mb-5 ${serif}`}
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.72), 0 1px 6px rgba(0,0,0,0.62)' }}
              >
                <span className="block text-white text-3xl sm:text-4xl md:text-[3.1rem] lg:text-[3.5rem]">
                  In-Stock Cabinets Tampa
                </span>
                <span className="block text-gold text-2xl sm:text-[1.7rem] md:text-[2.5rem] lg:text-[2.8rem] mt-1.5 leading-[1.1]">
                  Affordable &amp; Ready-to-Install Cabinet Solutions
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
                className="text-white/90 text-sm sm:text-base lg:text-[1.05rem] leading-[1.78] mb-9 max-w-[440px]"
                style={{ textShadow: '0 1px 10px rgba(0,0,0,0.75), 0 0 20px rgba(0,0,0,0.60)' }}
              >
                Explore quality in-stock kitchen cabinets, affordable cabinet options, and
                professional installation services from our Valrico showroom.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
                className="flex flex-col sm:flex-row gap-3 mb-8"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/94 text-gray-900 hover:text-primary font-bold uppercase tracking-widest text-sm h-12 px-9 rounded-lg transition-all duration-300 whitespace-nowrap shadow-xl shadow-black/30"
                >
                  Request Cabinet Pricing
                </Link>
                <a
                  href="tel:+18136512333"
                  className="inline-flex items-center justify-center gap-2 border border-primary/65 text-white hover:bg-primary/10 font-semibold uppercase tracking-widest text-sm h-12 px-9 rounded-lg transition-all duration-300 whitespace-nowrap backdrop-blur-sm"
                >
                  <Phone className="w-4 h-4 shrink-0 text-primary/80" />
                  Call (813) 651-2333
                </a>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.46 }}
                className="flex items-center flex-wrap gap-y-2.5"
              >
                {[
                  { icon: Calendar, label: 'Free Estimates' },
                  { icon: MapPin,   label: 'Local Tampa Experts' },
                  { icon: Star,     label: '5-Star Rated' },
                ].map(({ icon: Icon, label }, i, arr) => (
                  <span key={label} className="inline-flex items-center">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/85"
                      style={{ textShadow: '0 1px 8px rgba(0,0,0,0.88), 0 0 16px rgba(0,0,0,0.72)' }}
                    >
                      <Icon className="w-3.5 h-3.5 text-gold shrink-0" style={{ filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.8))' }} />
                      {label}
                    </span>
                    {i < arr.length - 1 && (
                      <span className="mx-3 text-white/30 select-none">·</span>
                    )}
                  </span>
                ))}
              </motion.div>

            </motion.div>
          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. AFFORDABLE CABINET SOLUTIONS WITHOUT THE LONG WAIT
             image left | text right
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-gray-50 overflow-hidden">
        <div className="container-custom max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left — image */}
            <FadeIn className="relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/Budget-kitchen-remodel-Tampa-featuring-affordable-upgrades-and-modern-finishes.jpg"
                  alt="Affordable in-stock cabinets Tampa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-2xl bg-primary/10 -z-10 hidden lg:block" />
            </FadeIn>

            {/* Right — text */}
            <FadeIn delay={0.1} className="flex flex-col gap-4">
              <div>
                <SectionLabel>Affordable Cabinet Solutions</SectionLabel>
                <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-extrabold text-gray-900 leading-tight">
                  Affordable Cabinet Solutions{' '}
                  <span className="text-primary">Without the Long Wait</span>
                </h2>
              </div>
              <div className="space-y-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Kitchen remodeling projects don&rsquo;t always require lengthy manufacturing
                  timelines or expensive custom orders. Many homeowners simply want quality
                  cabinetry that looks great, functions efficiently, and can be installed quickly.
                  At Cabinets &amp; Remodeling Depot, we offer in-stock cabinets Tampa homeowners
                  can rely on for faster renovations, practical budgets, and lasting performance.
                </p>
                <p>
                  Whether you&rsquo;re replacing outdated cabinets, preparing a home for sale,
                  or updating your kitchen to better suit your family&rsquo;s needs, our team
                  helps you find affordable cabinet solutions that balance style, durability,
                  and value.
                </p>
              </div>
              <div className="pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-xs h-11 px-6 rounded-lg transition-colors shadow-md shadow-primary/20"
                >
                  Visit Our Showroom
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. READY-TO-INSTALL CABINETS — VIEW IN PERSON
             text left | image right
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-white overflow-hidden">
        <div className="container-custom max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left — text */}
            <FadeIn className="flex flex-col gap-4">
              <div>
                <SectionLabel>Valrico Showroom</SectionLabel>
                <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-extrabold text-gray-900 leading-tight">
                  Ready-to-Install Cabinets Tampa{' '}
                  <span className="text-primary">Homeowners Can View in Person</span>
                </h2>
              </div>
              <div className="space-y-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Online photos only tell part of the story. Cabinet finishes, construction quality,
                  storage features, and color variations often look very different in person.
                </p>
                <p>
                  That&rsquo;s why many homeowners searching for stock kitchen cabinets Tampa
                  Valrico showroom options visit us to compare products firsthand.
                </p>
                <p className="font-medium text-gray-700">At our showroom, you can explore:</p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2">
                {[
                  'Cabinet colors and finishes',
                  'Shaker, traditional, and modern door styles',
                  'Soft-close cabinet features',
                  'Storage and organization solutions',
                  'Kitchen layout ideas',
                  'Countertop and flooring combinations',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Seeing cabinets in person helps homeowners make confident decisions while ensuring
                the final design fits both their space and lifestyle.
              </p>
            </FadeIn>

            {/* Right — image */}
            <FadeIn delay={0.1} className="relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/Kitchen-Cabinet-Showroom-Tampa.jpg"
                  alt="Visit our Valrico showroom to view in-stock cabinets Tampa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-3 -left-3 w-24 h-24 rounded-2xl bg-primary/10 -z-10 hidden lg:block" />
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. CABINET OPTIONS AVAILABLE — 4 image cards
      ════════════════════════════════════════════════════════════════════ */}
      <section id="cabinet-options" className="py-14 md:py-20 bg-gray-50">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-10">
            <SectionLabel>What We Offer</SectionLabel>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Cabinet Options <span className="text-primary">Available</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CABINET_OPTIONS.map(({ image, alt, title, description }, i) => (
              <FadeIn key={title} delay={i * 0.07}>
                <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  {/* Card image */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />
                  </div>
                  {/* Card content */}
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <h3 className="font-bold text-gray-900 text-base leading-snug">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. AFFORDABLE CABINETS WITHOUT SACRIFICING QUALITY
             text left | image right
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-white overflow-hidden">
        <div className="container-custom max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left — text */}
            <FadeIn className="flex flex-col gap-4">
              <div>
                <SectionLabel>Quality Without Compromise</SectionLabel>
                <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-extrabold text-gray-900 leading-tight">
                  Affordable Cabinets Tampa{' '}
                  <span className="text-primary">Without Sacrificing Quality</span>
                </h2>
              </div>
              <div className="space-y-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Affordable cabinetry should still feel durable, functional, and professionally finished.
                </p>
                <p>
                  Many homeowners assume budget cabinets Tampa projects automatically mean lower
                  quality, but modern in-stock cabinet solutions often deliver excellent durability,
                  attractive finishes, and reliable performance.
                </p>
                <p className="font-medium text-gray-700">
                  Our team helps homeowners compare options based on:
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-x-5 gap-y-2">
                {[
                  'Kitchen layout',
                  'Storage requirements',
                  'Budget expectations',
                  'Remodeling timeline',
                  'Design preferences',
                  'Long-term durability',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We focus on helping clients choose cabinetry that offers the right balance of
                value and performance.
              </p>
            </FadeIn>

            {/* Right — image */}
            <FadeIn delay={0.1} className="relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/kitchen_cabinet_5.jpg"
                  alt="Affordable quality cabinets Tampa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-2xl bg-primary/10 -z-10 hidden lg:block" />
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. QUICK CABINET INSTALLATION TAMPA SERVICES
             image left | text right
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-gray-50 overflow-hidden">
        <div className="container-custom max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left — image */}
            <FadeIn className="relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/kitchen_cabinet_remodeling-01.webp"
                  alt="Quick cabinet installation Tampa services"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-2xl bg-primary/10 -z-10 hidden lg:block" />
            </FadeIn>

            {/* Right — text */}
            <FadeIn delay={0.1} className="flex flex-col gap-4">
              <div>
                <SectionLabel>Professional Installation</SectionLabel>
                <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-extrabold text-gray-900 leading-tight">
                  Quick Cabinet Installation{' '}
                  <span className="text-primary">Tampa Services</span>
                </h2>
              </div>
              <div className="space-y-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Fast cabinet availability only delivers results when installation is handled properly.
                </p>
                <p>
                  Our quick cabinet installation Tampa services help homeowners complete projects
                  efficiently while maintaining professional installation standards.
                </p>
                <p className="font-medium text-gray-700">Services include:</p>
              </div>
              <ul className="grid grid-cols-2 gap-x-5 gap-y-2">
                {[
                  'In-stock cabinet installation',
                  'Kitchen cabinet replacement',
                  'Layout planning',
                  'Countertop coordination',
                  'Remodeling support',
                  'Installation guidance',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Even small cabinet upgrades can significantly improve kitchen functionality and
                everyday convenience.
              </p>
              <div className="pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-xs h-11 px-6 rounded-lg transition-colors shadow-md shadow-primary/20"
                >
                  Request Cabinet Pricing
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          7. WHY HOMEOWNERS CHOOSE — 5 icon cards
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-10">
            <SectionLabel>Why Homeowners Choose</SectionLabel>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
              Cabinets &amp; Remodeling Depot
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {WHY_CHOOSE.map(({ icon: Icon, title, description }, i) => (
              <FadeIn key={title} delay={i * 0.07}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center gap-3 h-full hover:shadow-md hover:border-primary/20 transition-all duration-200">
                  <div className="w-12 h-12 rounded-full border-2 border-primary/20 bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1.5 leading-snug">{title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          8. KITCHEN CABINET INSPIRATION — gallery grid + button
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-8">
            <SectionLabel>Kitchen Cabinet Inspiration</SectionLabel>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Kitchen Cabinet{' '}
              <span className="text-primary">Inspiration</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-4">
              Whether you&rsquo;re drawn to clean modern designs or timeless traditional styles,
              exploring different cabinet options can help you visualize your ideal kitchen.
            </p>
            <p className="text-gray-700 text-sm font-semibold mb-3">Popular styles include:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {INSPIRATION_STYLES.map((style) => (
                <span
                  key={style}
                  className="inline-flex items-center gap-1.5 bg-white border border-primary/20 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm"
                >
                  <Check className="w-3 h-3 text-primary shrink-0" />
                  {style}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Gallery grid */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {CABINET_IMAGES.map(({ src, alt }, i) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm cursor-pointer group hover:shadow-md transition-shadow duration-200"
                  onClick={() => setLightboxIndex(i)}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-400"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6" />
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="text-center mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-xs h-11 px-8 rounded-lg transition-colors"
            >
              View More Cabinet Inspiration
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </FadeIn>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          9. OUR CABINET SELECTION PROCESS — 5 numbered steps
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-12">
            <SectionLabel>Our Cabinet Selection Process</SectionLabel>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
              How We Help You{' '}
              <span className="text-primary">Find the Right Cabinets</span>
            </h2>
          </FadeIn>

          <div className="relative">
            {/* Connecting line — desktop only */}
            <div className="hidden lg:block absolute top-8 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
              {PROCESS_STEPS.map(({ step, icon: Icon, title, description }, i) => (
                <FadeIn key={step} delay={i * 0.09}>
                  <div className="relative z-10 flex flex-col items-center text-center gap-3">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-primary shadow-md shadow-primary/30 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-primary text-primary text-[10px] font-extrabold flex items-center justify-center leading-none">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          10. FAQ + SIDE CTA PANEL
              left: accordion | right: image card with CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="container-custom max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-start">

            {/* Left — FAQ accordion (3/5 width) */}
            <FadeIn className="lg:col-span-3 flex flex-col gap-6">
              <div>
                <SectionLabel>Have Questions?</SectionLabel>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
                  Frequently Asked{' '}
                  <span className="text-primary">Questions</span>
                </h2>
              </div>
              <FAQAccordion faqs={FAQS} />
            </FadeIn>

            {/* Right — CTA image card (2/5 width) */}
            <FadeIn delay={0.12} className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl min-h-105 flex flex-col justify-end">
                {/* Background image */}
                <Image
                  src="/Modern-kitchen-renovation-Tampa-completed-project.jpg"
                  alt="Visit our Valrico cabinet showroom today"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/10" />

                {/* CTA content */}
                <div className="relative z-10 p-6 flex flex-col gap-4">
                  <div>
                    <p className="italic text-white/80 text-base font-medium leading-tight mb-1">
                      Visit Our Valrico
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                      Cabinet Showroom{' '}
                      <span className="text-white/80">Today</span>
                    </h3>
                  </div>
                  <p className="text-white/75 text-sm leading-relaxed">
                    Whether you&rsquo;re replacing outdated cabinets, planning a renovation, or
                    searching for affordable ready-to-install solutions, our team is here to help.
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-xs h-11 px-6 rounded-lg transition-colors shadow-md"
                    >
                      Visit Our Showroom
                    </Link>
                    <div className="flex gap-2">
                      <Link
                        href="/contact"
                        className="flex-1 inline-flex items-center justify-center gap-1 border border-white/50 text-white hover:bg-white/10 font-bold uppercase tracking-wider text-[10px] h-10 px-3 rounded-lg transition-colors text-center"
                      >
                        Request Cabinet Pricing
                      </Link>
                      <Link
                        href="/contact"
                        className="flex-1 inline-flex items-center justify-center gap-1 border border-white/50 text-white hover:bg-white/10 font-bold uppercase tracking-wider text-[10px] h-10 px-3 rounded-lg transition-colors text-center"
                      >
                        Free Consultation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Lightbox */}
      <ImageLightbox
        images={CABINET_IMAGES}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((i) => Math.max(0, i - 1))}
        onNext={() => setLightboxIndex((i) => Math.min(CABINET_IMAGES.length - 1, i + 1))}
      />
    </>
  )
}
