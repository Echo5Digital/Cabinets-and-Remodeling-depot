'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ImageLightbox } from '@/components/common/ImageLightbox'
import { FAQSection } from '@/components/sections/FAQSection'
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
  ShoppingBag,
  ZoomIn,
  MapPin,
  Calendar,
  Star,
  Phone,
  ChevronRight,
  X,
} from 'lucide-react'
import { usePageContent } from '@/hooks/usePageContent'
import { normalizeContent, mergeWithPageDefaults } from '@/lib/pageContent'

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
    question: 'Do you offer kitchen cabinets Tampa homeowners can purchase quickly?',
    answer:
      'Yes. We provide a wide selection of kitchen cabinets available for faster remodeling timelines.',
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


/* ─── Flip card transforms ───────────────────────────────────────────────────── */
const FLIP_TRANSFORM = [
  'rotateY(180deg)',   // 0 — flip left
  'rotateX(-180deg)', // 1 — flip up
  'rotateY(-180deg)', // 2 — flip right
  'rotateX(180deg)',  // 3 — flip down
]

const BACK_INIT = [
  'rotateY(180deg)',  // 0
  'rotateX(180deg)', // 1
  'rotateY(180deg)', // 2
  'rotateX(180deg)', // 3
]

/* ─── Shared serif class ─────────────────────────────────────────────────────── */
const serif = 'font-[family-name:var(--font-playfair)]'

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function CabinetsPageClient() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [flippedCard, setFlippedCard] = useState(null)
  const { data: pageData } = usePageContent('kitchen-cabinets-tampa')
  const sections = mergeWithPageDefaults('kitchen-cabinets-tampa', normalizeContent(pageData?.content).sections)
  const whyChooseSec = sections.find(s => s.id === 'cab-why-choose')
  const optionsSec   = sections.find(s => s.id === 'cab-options')
  const stylesSec    = sections.find(s => s.id === 'cab-styles')
  const gallerySec   = sections.find(s => s.id === 'cab-gallery')
  const processSec   = sections.find(s => s.id === 'cab-process')
  const faqSec       = sections.find(s => s.id === 'cab-faq')

  const whyChooseItems = whyChooseSec?.items?.length
    ? whyChooseSec.items.map((item, i) => ({
        icon: WHY_CHOOSE[i]?.icon || Building2,
        title: item.title || WHY_CHOOSE[i]?.title,
        description: item.description || WHY_CHOOSE[i]?.description,
      }))
    : WHY_CHOOSE

  const cabinetOptions = optionsSec?.items?.length
    ? optionsSec.items.map((item, i) => ({
        image: item.image || CABINET_OPTIONS[i]?.image,
        alt: item.title || CABINET_OPTIONS[i]?.alt,
        title: item.title || CABINET_OPTIONS[i]?.title,
        description: item.description || CABINET_OPTIONS[i]?.description,
      }))
    : CABINET_OPTIONS

  const inspirationStyles = stylesSec?.areas?.length ? stylesSec.areas : INSPIRATION_STYLES

  const cabinetImages = gallerySec?.items?.length
    ? gallerySec.items.map((item, i) => ({
        src: item.image || CABINET_IMAGES[i]?.src,
        alt: item.title || CABINET_IMAGES[i]?.alt,
      }))
    : CABINET_IMAGES

  const _processItems = processSec?.steps?.length ? processSec.steps : processSec?.items
  const processSteps = _processItems?.length
    ? _processItems.map((step, i) => ({
        step: step.step || PROCESS_STEPS[i]?.step,
        icon: PROCESS_STEPS[i]?.icon || MessageSquare,
        title: step.title || PROCESS_STEPS[i]?.title,
        description: step.description || PROCESS_STEPS[i]?.description,
      }))
    : PROCESS_STEPS

  const faqs = faqSec?.items?.length ? faqSec.items : FAQS

  const heroSec = sections.find(s => s.id === 'cab-hero')
  const ctaSec  = sections.find(s => s.id === 'cab-cta')

  const heroTitle       = heroSec?.title       || 'Kitchen Cabinets Tampa'
  const heroSubtitle    = heroSec?.subtitle    || 'Affordable & Ready-to-Install Cabinet Solutions'
  const heroDescription = heroSec?.description || 'Explore quality in-stock kitchen cabinets, affordable cabinet options, and professional installation services from our Valrico showroom.'
  const heroBg          = heroSec?.backgroundImage || '/instock-cabinets-hero.webp'
  const heroCtaText     = heroSec?.ctaText     || 'Request Cabinet Pricing'
  const heroCtaLink     = heroSec?.ctaLink     || '/contact'
  const ctaHeading  = ctaSec?.heading || 'Start Your Cabinet Project Today'
  const ctaBody     = ctaSec?.body    || "Whether you're replacing outdated cabinets, preparing a home for sale, or planning a complete kitchen renovation, Cabinets & Remodeling Depot is here to help. Visit our Valrico showroom to explore kitchen cabinet options and work with a team committed to affordable, quality results."
  const ctaBg       = ctaSec?.bgImage  || '/Modern-kitchen-renovation-Tampa-completed-project.jpg'
  const ctaText     = ctaSec?.ctaText  || 'Schedule a Free Consultation'
  const ctaLink     = ctaSec?.ctaLink  || '/contact'

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
            src={heroBg}
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
                  {heroTitle}
                </span>
                <span className="block text-gold text-2xl sm:text-[1.7rem] md:text-[2.5rem] lg:text-[2.8rem] mt-1.5 leading-[1.1]">
                  {heroSubtitle}
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
                {heroDescription}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
                className="flex flex-col sm:flex-row gap-3 mb-8"
              >
                <Link
                  href={heroCtaLink}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/94 text-gray-900 hover:text-primary font-bold uppercase tracking-widest text-sm h-12 px-9 rounded-lg transition-all duration-300 whitespace-nowrap shadow-xl shadow-black/30"
                >
                  {heroCtaText}
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
          2. WHY HOMEOWNERS CHOOSE — horizontal feature bar with dividers
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-[#F5F0E8] border-y border-[#E8DFD0]">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-10">
            <SectionLabel>Why Homeowners Choose</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 ${serif}`}>
              Cabinets &amp; Remodeling Depot
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
              {whyChooseItems.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex-1 flex flex-col items-center text-center px-5 py-8 sm:py-6 group"
                >
                  <div className="w-13 h-13 rounded-full border border-primary/25 bg-primary/8 flex items-center justify-center mb-4 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-200">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className={`font-bold text-gray-900 text-sm sm:text-base mb-1.5 leading-snug ${serif}`}>
                    {title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. AFFORDABLE CABINET SOLUTIONS WITHOUT THE LONG WAIT
             full-bleed background image | text left
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-24 overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/kitchen-cabinet-ins.jpg"
            alt="Affordable kitchen cabinets Tampa"
            fill
            className="object-cover object-bottom"
            sizes="100vw"
          />
          {/* Light gradient — solid white on left for text, fades to reveal image on right */}
          <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/80 to-white/30 lg:to-white/10" />
        </div>

        <div className="relative z-10 container-custom max-w-7xl">
          <FadeIn delay={0.1} className="max-w-xl flex flex-col gap-4">

            <div>
              <SectionLabel>Affordable Cabinet Solutions</SectionLabel>
              <h2 className={`text-2xl sm:text-3xl md:text-[2.2rem] font-extrabold text-gray-900 leading-tight ${serif}`}>
                Affordable Cabinet Solutions{' '}
                <span className="text-primary">Without the Long Wait</span>
              </h2>
            </div>

            <div className="space-y-3 text-gray-600 text-sm sm:text-base leading-relaxed">
              <p>
                Kitchen remodeling projects don&rsquo;t always require lengthy manufacturing
                timelines or expensive custom orders. Many homeowners simply want quality
                cabinetry that looks great, functions efficiently, and can be installed quickly.
                At Cabinets &amp; Remodeling Depot, we offer kitchen cabinets Tampa homeowners
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

      </section>

      {/* ════════════════════════════════════════════════════════════════════
          KITCHEN CABINET STYLES
             4-card grid, matching countertop material cards
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom max-w-7xl">

          {/* Header — centered */}
          <FadeIn className="text-center mb-10">
            <div className="flex justify-center">
              <SectionLabel>Cabinet Styles</SectionLabel>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold text-gray-900 leading-tight mb-4 ${serif}`}>
              Kitchen Cabinet{' '}
              <span className="text-primary">Styles We Carry</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              From clean Shaker profiles to glass-front display cabinets, explore our most popular door styles, all available for fast installation throughout Tampa Bay.
            </p>
          </FadeIn>

          {/* Cards grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                name: 'Shaker',
                src: '/cabinet-shaker.jpg',
                href: '/contact',
                desc: 'Clean recessed panels and timeless lines, the most versatile style for modern and traditional kitchens.',
              },
              {
                name: 'Slab / Flat Panel',
                src: '/cabinet-slab.jpg',
                href: '/contact',
                desc: 'Smooth, frameless fronts with a minimalist edge, perfect for contemporary and European-inspired spaces.',
              },
              {
                name: 'Raised Panel',
                src: '/cabinet-raised.webp',
                href: '/contact',
                desc: 'A classic raised center panel that adds depth and elegance to any traditional kitchen design.',
              },
              {
                name: 'Glass-Front',
                src: '/cabinet-glass.jpg',
                href: '/contact',
                desc: 'Display dishware and add visual openness with glass-insert doors that brighten any kitchen.',
              },
            ].map(({ name, src, desc, href }, i) => (
              <FadeIn key={name} delay={i * 0.08}>
                <Link
                  href={href}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden h-full flex flex-col group"
                >
                  <div className="aspect-[4/3] relative overflow-hidden flex-shrink-0">
                    <Image
                      src={src}
                      alt={`${name} kitchen cabinets Tampa`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-3 sm:p-4 text-center flex-1 flex flex-col justify-start">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-[0.95rem] mb-1.5">{name}</h3>
                    <p className="text-muted-foreground text-[0.7rem] sm:text-xs leading-relaxed">{desc}</p>
                    <div className="mt-2.5 flex justify-center">
                      <span className="inline-flex items-center gap-1 text-primary text-[0.72rem] font-semibold opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. READY-TO-INSTALL CABINETS — VIEW IN PERSON
             centered editorial layout, 3-col cards
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-warm-gray">
        <div className="container-custom max-w-4xl">

          {/* Header — centered */}
          <FadeIn className="text-center mb-8">
            <div className="flex justify-center">
              <SectionLabel>Valrico Showroom</SectionLabel>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-5 ${serif}`}>
              Ready-to-Install Cabinets Tampa{' '}
              <span className="text-primary">Homeowners Can View in Person</span>
            </h2>
            {/* Dot divider */}
            <div className="flex items-center justify-center gap-3">
              <span className="w-16 sm:w-24 h-px bg-[#E8DFD0]" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
              <span className="w-16 sm:w-24 h-px bg-[#E8DFD0]" />
            </div>
          </FadeIn>

          {/* Body paragraphs — centered, constrained */}
          <FadeIn className="text-center max-w-2xl mx-auto space-y-3 text-gray-600 text-sm sm:text-base leading-relaxed mb-7">
            <p>
              Online photos only tell part of the story. Cabinet finishes, construction quality,
              storage features, and color variations often look very different in person.
            </p>
            <p>
              That&rsquo;s why many homeowners searching for stock kitchen cabinets Tampa
              Valrico showroom options visit us to compare products firsthand.
            </p>
            <p className="text-gray-700">
              At our showroom, <strong>you can explore:</strong>
            </p>
          </FadeIn>

          {/* Checklist — 3-column card grid */}
          <FadeIn delay={0.1} className="mb-4">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                'Cabinet colors and finishes',
                'Shaker, traditional, and modern door styles',
                'Soft-close cabinet features',
                'Storage and organization solutions',
                'Kitchen layout ideas',
                'Countertop and flooring combinations',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 bg-white border border-[#E8DFD0] rounded-2xl px-4 py-4 shadow-sm"
                >
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </span>
                  <span className="text-sm font-medium text-gray-700 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Closing paragraph — full-width card with icon */}
          <FadeIn delay={0.2}>
            <div className="flex items-start gap-4 bg-white border border-[#E8DFD0] rounded-2xl px-5 py-4 shadow-sm">
              <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Package className="w-5 h-5 text-primary" />
              </span>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Seeing cabinets in person helps homeowners make confident decisions while ensuring
                the final design fits both their space and lifestyle.
              </p>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. CABINET OPTIONS AVAILABLE — flip cards
      ════════════════════════════════════════════════════════════════════ */}
      <section id="cabinet-options" className="py-14 md:py-20 bg-white">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-10">
            <SectionLabel>What We Offer</SectionLabel>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight ${serif}`}>
              Cabinet Options <span className="text-primary">Available</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cabinetOptions.map(({ image, alt, title, description }, i) => (
              <FadeIn key={title} delay={0} className="w-full">
                <div
                  className="relative w-full rounded-2xl pb-[100%]"
                  style={{ perspective: '1200px' }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: flippedCard === i ? FLIP_TRANSFORM[i] : 'rotateY(0deg)',
                      transition: 'transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)',
                    }}
                  >
                    {/* ── FRONT FACE ── */}
                    <div
                      className="absolute inset-0 rounded-2xl overflow-hidden shadow-md"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <Image
                        src={image}
                        alt={alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-black/10" />
                      <div className="absolute inset-0 flex items-center justify-center px-5 pb-14">
                        <h3
                          className={`text-white text-xl sm:text-2xl font-extrabold text-center leading-snug ${serif}`}
                          style={{ textShadow: '0 2px 14px rgba(0,0,0,0.85), 0 0 30px rgba(0,0,0,0.6)' }}
                        >
                          {title}
                        </h3>
                      </div>
                      <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                        <button
                          onClick={() => setFlippedCard(i)}
                          className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/28 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-full border border-white/35 transition-all duration-200 hover:border-white/60 hover:scale-105"
                        >
                          Learn More <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{i + 1}</span>
                      </div>
                    </div>

                    {/* ── BACK FACE ── */}
                    <div
                      className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-primary flex flex-col p-5 sm:p-6"
                      style={{ backfaceVisibility: 'hidden', transform: BACK_INIT[i] }}
                    >
                      <p className="text-white text-sm leading-relaxed font-medium">
                        {description}
                      </p>
                      <div className="mt-auto shrink-0 flex items-center justify-between gap-3">
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 bg-white text-primary text-[11px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap shadow-sm"
                        >
                          Get a Quote <ChevronRight className="w-3 h-3" />
                        </Link>
                        <button
                          onClick={() => setFlippedCard(null)}
                          className="inline-flex items-center gap-1 text-white/80 hover:text-white text-[11px] font-semibold uppercase tracking-wide transition-colors shrink-0"
                        >
                          <X className="w-3.5 h-3.5" /> Close
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. AFFORDABLE CABINETS WITHOUT SACRIFICING QUALITY
             full-bleed background image | text left
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-24 overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/kitchen_cabinet_5.jpg"
            alt="Affordable quality cabinets Tampa"
            fill
            className="object-cover object-right"
            sizes="100vw"
          />
            {/* Subtle dark scrim so image reads clearly on the right */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 container-custom max-w-7xl">
          <FadeIn className="max-w-lg">

            {/* White card — crisp text against the background image */}
            <div className="flex flex-col gap-4 bg-white/92 backdrop-blur-sm rounded-2xl p-7 sm:p-9 shadow-lg">

              <div>
                <SectionLabel>Quality Without Compromise</SectionLabel>
                <h2 className={`text-2xl sm:text-3xl md:text-[2.2rem] font-extrabold text-gray-900 leading-tight ${serif}`}>
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
                  quality, but modern kitchen cabinet solutions often deliver excellent durability,
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

            </div>
          </FadeIn>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. KITCHEN CABINET INSPIRATION — gallery grid + button
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-8">
            <SectionLabel>Kitchen Cabinet Inspiration</SectionLabel>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 ${serif}`}>
              Kitchen Cabinet{' '}
              <span className="text-primary">Inspiration</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
              Whether you&rsquo;re drawn to clean modern designs or timeless traditional styles,
              exploring different cabinet options can help you visualize your ideal kitchen.
            </p>
          </FadeIn>

          {/* Popular styles — pill tags */}
          <FadeIn delay={0.08}>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {inspirationStyles.map((style) => (
                <span
                  key={style}
                  className="inline-flex items-center gap-2 bg-white border border-primary/20 text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm hover:border-primary hover:text-primary transition-colors cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {style}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Gallery grid */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {cabinetImages.map(({ src, alt }, i) => (
                <div
                  key={src}
                  className="relative aspect-4/5 rounded-xl overflow-hidden shadow-sm cursor-pointer group hover:shadow-md transition-shadow duration-200"
                  onClick={() => setLightboxIndex(i)}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
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
              href="/gallery"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-sm h-12 px-8 rounded-lg transition-colors"
            >
              View More Cabinet Inspiration
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          7. QUICK CABINET INSTALLATION TAMPA SERVICES
             full-bleed background image | text left
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-24 overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/kitchen_cabinet_remodeling-01.webp"
            alt="Quick cabinet installation Tampa services"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Light gradient — solid white on left for text, fades to reveal image on right */}
          <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/80 to-white/30 lg:to-white/10" />
        </div>

        <div className="relative z-10 container-custom max-w-7xl">
          <FadeIn className="max-w-xl flex flex-col gap-4">

            <div>
              <SectionLabel>Professional Installation</SectionLabel>
              <h2 className={`text-2xl sm:text-3xl md:text-[2.2rem] font-extrabold text-gray-900 leading-tight ${serif}`}>
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

      </section>

      {/* ════════════════════════════════════════════════════════════════════
          9. OUR CABINET SELECTION PROCESS — 5 numbered steps
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-warm-gray">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-12">
            <SectionLabel>Our Cabinet Selection Process</SectionLabel>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 ${serif}`}>
              How We Help You{' '}
              <span className="text-primary">Find the Right Cabinets</span>
            </h2>
          </FadeIn>

          <div className="relative">
            {/* Connecting line — desktop only */}
            <div className="hidden lg:block absolute top-9 left-[8%] right-[8%] h-px bg-linear-to-r from-transparent via-primary/25 to-transparent z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
              {processSteps.map(({ step, icon: Icon, title, description }, i) => (
                <FadeIn key={step} delay={i * 0.09}>
                  <div className="relative z-10 flex flex-col items-center text-center gap-4">
                    <div className="relative">
                      <div className="w-18 h-18 rounded-full bg-primary shadow-lg shadow-primary/20 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-primary text-primary text-[10px] font-extrabold flex items-center justify-center leading-none">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base mb-1.5">{title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          10. FAQ — primary accent on white background
      ════════════════════════════════════════════════════════════════════ */}
      <FAQSection faqs={faqs} title="Frequently Asked Questions" />

      {/* ════════════════════════════════════════════════════════════════════
          11. FINAL CTA — light overlay, dark text, gold accents
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-32 overflow-hidden">

        {/* Background photo — light cream overlay for legibility */}
        <div className="absolute inset-0">
          <Image
            src={ctaBg}
            alt="Start your cabinet project Tampa Bay"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/78" />
        </div>

        <div className="relative z-10 container-custom max-w-3xl text-center px-4">
          <FadeIn>

            {/* Gold section label with flanking lines */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="flex-1 max-w-[60px] sm:max-w-[90px] h-px bg-gold" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold whitespace-nowrap">
                Tampa Bay Cabinet Experts
              </p>
              <span className="flex-1 max-w-[60px] sm:max-w-[90px] h-px bg-gold" />
            </div>

            {/* Heading */}
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-5 ${serif}`}>
              {ctaHeading}
            </h2>

            {/* Body */}
            <p className="text-gray-800 font-medium text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              {ctaBody}
            </p>

            {/* CTA button */}
            <div className="flex justify-center">
              <Link
                href={ctaLink}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/85 text-white font-bold uppercase tracking-widest text-sm h-14 px-10 rounded-lg transition-colors shadow-lg whitespace-nowrap"
              >
                {ctaText}
              </Link>
            </div>

          </FadeIn>
        </div>

      </section>

      {/* Lightbox */}
      <ImageLightbox
        images={cabinetImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((i) => Math.max(0, i - 1))}
        onNext={() => setLightboxIndex((i) => Math.min(cabinetImages.length - 1, i + 1))}
      />
    </>
  )
}
