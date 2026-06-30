'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FAQSection } from '@/components/sections/FAQSection'
import {
  MapPin,
  Calendar,
  Building2,
  Wrench,
  ShieldCheck,
  Palette,
  CheckCircle,
  Check,
  ArrowRight,
  ClipboardList,
  Hammer,
  MessageSquare,
  Settings2,
  ChevronRight,
  Star,
  Phone,
  X,
} from 'lucide-react'
import { usePageContent } from '@/hooks/usePageContent'
import { UnderConstruction } from '@/components/common/UnderConstruction'
import { normalizeContent, mergeWithPageDefaults } from '@/lib/pageContent'

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
function SectionLabel({ children }) {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">
      <span className="w-6 h-px bg-primary inline-block" />
      {children}
      <span className="w-6 h-px bg-primary inline-block" />
    </p>
  )
}

/* ─── Data ───────────────────────────────────────────────────────────────────── */
const TRUST_ITEMS = [
  { icon: Calendar,  label: 'Free Estimates' },
  { icon: Building2, label: 'Valrico Showroom' },
  { icon: Wrench,    label: 'Professional Installation' },
  { icon: MapPin,    label: 'Serving Tampa Bay' },
]

const WHY_CHOOSE = [
  {
    icon: Building2,
    title: 'Local Valrico Showroom',
    description: 'Compare flooring materials, colors, and textures in person before making important renovation decisions.',
  },
  {
    icon: Wrench,
    title: 'Professional Installation',
    description: 'Our experienced team ensures flooring is installed with precision and attention to detail.',
  },
  {
    icon: Palette,
    title: 'Personalized Design Guidance',
    description: 'We help homeowners choose flooring solutions that fit their lifestyle, budget, and long-term goals.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Materials',
    description: "Select from durable flooring products designed to perform well in busy households and Florida's climate.",
  },
  {
    icon: Settings2,
    title: 'One-Stop Remodeling Solutions',
    description: 'Coordinate flooring updates alongside kitchen remodeling, bathroom renovations, cabinetry, and countertops.',
  },
]

const FLOORING_OPTIONS = [
  {
    image: '/wood-flooring-750x469.jpg',
    alt: 'Hardwood flooring Tampa',
    title: 'Hardwood Flooring',
    href: '/flooring-in-tampa/wood-flooring',
    description:
      'Hardwood flooring Tampa homeowners choose continues to be a popular option because of its timeless appearance, natural character, and long-term value. Hardwood works especially well in living rooms, dining rooms, and bedrooms.',
  },
  {
    image: '/engineered-wood-flooring-768x480-1.jpg',
    alt: 'Laminate flooring Tampa',
    title: 'Laminate Flooring',
    href: '/flooring-in-tampa/laminate-flooring-in-tampa',
    description:
      'Laminate flooring Tampa homeowners appreciate offers an affordable and durable alternative to traditional hardwood while providing attractive wood-look finishes and easy maintenance.',
  },
  {
    image: '/Flooring-samples.jpg',
    alt: 'Tile flooring Tampa',
    title: 'Tile Flooring',
    href: '/flooring-in-tampa',
    description:
      'Tile flooring Tampa homeowners frequently select is ideal for kitchens, bathrooms, laundry rooms, and high-moisture environments. Tile provides excellent durability and easy cleaning.',
  },
  {
    image: '/flooring-1.jpg',
    alt: 'Waterproof flooring Tampa',
    title: 'Waterproof Flooring',
    href: '/flooring-in-tampa',
    description:
      'Waterproof flooring solutions are ideal for active households, helping protect against spills, moisture, and everyday wear while maintaining a modern appearance.',
  },
  {
    image: '/flooring-2.jpg',
    alt: 'Whole-home flooring solutions Tampa',
    title: 'Whole-Home Flooring Solutions',
    href: '/flooring-in-tampa',
    description:
      'For homeowners planning larger renovations, we provide flooring options that create consistency and flow throughout the entire home.',
  },
]

const GALLERY = [
  { src: '/wood-flooring-750x469.jpg',              alt: 'Wide-plank hardwood flooring Tampa living room' },
  { src: '/engineered-wood-flooring-768x480-1.jpg', alt: 'Modern wood-look flooring open concept home Tampa' },
  { src: '/Flooring-samples.jpg',                   alt: 'Tile flooring designs kitchen Tampa' },
  { src: '/flooring-1.jpg',                         alt: 'Waterproof luxury flooring Tampa home' },
  { src: '/flooring-2.jpg',                         alt: 'Whole-home flooring renovation Tampa Bay' },
]

const INSPIRATION_STYLES = [
  'Wide-Plank Hardwood Flooring',
  'Modern Wood-Look Flooring',
  'Waterproof Luxury Flooring',
  'Contemporary Open Concept Interiors',
  'Tile Flooring Designs',
  'Whole-Home Flooring Renovations',
]

const BENEFITS = [
  { image: '/improved-home-value.jpeg',       label: 'Improved Home Value' },
  { image: '/easier-maintenance.jpeg',        label: 'Easier Cleaning & Maintenance' },
  { image: '/better-durability.jpeg',         label: 'Better Durability' },
  { image: '/modernized-interior-design.jpeg',label: 'Modernized Interior Design' },
  { image: '/moisture-resistance.jpeg',       label: 'Moisture Resistance' },
  { image: '/increased-comfort.jpeg',         label: 'Increased Comfort' },
  { image: '/enhanced-visual-appeal.jpeg',    label: 'Enhanced Visual Appeal' },
  { image: '/better-flow-btw-rooms.jpeg',     label: 'Better Flow Between Rooms' },
]

const PROCESS_STEPS = [
  {
    step: '01',
    icon: MessageSquare,
    title: 'Consultation',
    description: 'We discuss your goals, design preferences, budget, and project timeline.',
  },
  {
    step: '02',
    icon: Building2,
    title: 'Flooring Selection',
    description: 'Visit our showroom to compare materials, colors, textures, and flooring styles.',
  },
  {
    step: '03',
    icon: ClipboardList,
    title: 'Measurement & Planning',
    description: 'Our team evaluates the space and develops a detailed installation plan.',
  },
  {
    step: '04',
    icon: Hammer,
    title: 'Professional Installation',
    description: 'We install your flooring with attention to detail, craftsmanship, and long-term performance.',
  },
  {
    step: '05',
    icon: CheckCircle,
    title: 'Final Inspection',
    description: 'Before project completion, we review every detail to ensure your satisfaction.',
  },
]

const SERVICE_AREAS = [
  'Tampa', 'Valrico', 'Brandon', 'Riverview',
  'Lithia', 'Apollo Beach', 'Plant City', 'Wesley Chapel',
]

const SHOWROOM_COMPARE = [
  'Hardwood flooring options',
  'Laminate flooring selections',
  'Tile flooring styles',
  'Waterproof flooring products',
  'Flooring textures and finishes',
  'Cabinet and countertop pairings',
]

const FAQS = [
  {
    question: 'What flooring works best for Florida homes?',
    answer:
      'Tile, waterproof flooring, and laminate flooring are all popular choices because of their durability and moisture resistance. Hardwood remains a popular option for living areas and bedrooms.',
  },
  {
    question: 'Do you offer hardwood flooring Tampa homeowners can view in person?',
    answer:
      'Yes. Our Valrico showroom features hardwood flooring options alongside laminate, tile, and waterproof flooring selections.',
  },
  {
    question: 'Do you provide flooring installation services?',
    answer:
      'Absolutely. We provide professional flooring installation for kitchens, bathrooms, living areas, bedrooms, and full-home renovations.',
  },
  {
    question: 'Can I compare flooring materials before purchasing?',
    answer:
      'Yes. Our showroom allows homeowners to compare flooring colors, textures, finishes, and material options directly before making final decisions.',
  },
  {
    question: 'How long does flooring installation take?',
    answer:
      'Project timelines vary depending on the size of the space, flooring material selected, and project complexity. We provide clear timelines before work begins.',
  },
]

/* ─── Flip card transforms ───────────────────────────────────────────────────── */
const FLIP_TRANSFORM = [
  'rotateY(180deg)',   // 0 — flip left
  'rotateX(-180deg)', // 1 — flip up
  'rotateY(-180deg)', // 2 — flip right
  'rotateX(180deg)',  // 3 — flip down
  'rotateY(180deg)',  // 4 — flip left
]

const BACK_INIT = [
  'rotateY(180deg)',  // 0
  'rotateX(180deg)', // 1
  'rotateY(180deg)', // 2
  'rotateX(180deg)', // 3
  'rotateY(180deg)', // 4
]

/* ─── Shared serif class ─────────────────────────────────────────────────────── */
const serif = 'font-[family-name:var(--font-playfair)]'

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function FlooringPageClient() {
  const [flippedCard, setFlippedCard] = useState(null)
  const { data: pageData, isError, isLoading } = usePageContent('flooring-in-tampa')
  if (isLoading) return null
  if (isError) return <UnderConstruction />
  const sections = mergeWithPageDefaults('flooring-in-tampa', normalizeContent(pageData?.content).sections)
  const whyChooseSec = sections.find(s => s.id === 'fl-why-choose')
  const optionsSec   = sections.find(s => s.id === 'fl-options')
  const stylesSec    = sections.find(s => s.id === 'fl-styles')
  const gallerySec   = sections.find(s => s.id === 'fl-gallery')
  const processSec   = sections.find(s => s.id === 'fl-process')
  const areasSec     = sections.find(s => s.id === 'fl-areas')
  const faqSec       = sections.find(s => s.id === 'fl-faq')

  const whyChooseItems = whyChooseSec?.items?.length
    ? whyChooseSec.items.map((item, i) => ({
        icon: WHY_CHOOSE[i]?.icon || Building2,
        title: item.title || WHY_CHOOSE[i]?.title,
        description: item.description || WHY_CHOOSE[i]?.description,
      }))
    : WHY_CHOOSE

  const flooringOptions = optionsSec?.items?.length
    ? optionsSec.items.map((item, i) => ({
        image: item.image || FLOORING_OPTIONS[i]?.image,
        alt: item.title || FLOORING_OPTIONS[i]?.alt,
        title: item.title || FLOORING_OPTIONS[i]?.title,
        href: item.link || item.href || FLOORING_OPTIONS[i]?.href,
        description: item.description || FLOORING_OPTIONS[i]?.description,
      }))
    : FLOORING_OPTIONS

  const inspirationStyles = stylesSec?.areas?.length ? stylesSec.areas : INSPIRATION_STYLES

  const galleryImages = gallerySec?.items?.length
    ? gallerySec.items.map((item, i) => ({
        src: item.image || GALLERY[i]?.src,
        alt: item.title || GALLERY[i]?.alt,
      }))
    : GALLERY

  const _processItems = processSec?.steps?.length ? processSec.steps : processSec?.items
  const processSteps = _processItems?.length
    ? _processItems.map((step, i) => ({
        step: step.step || PROCESS_STEPS[i]?.step,
        icon: PROCESS_STEPS[i]?.icon || MessageSquare,
        title: step.title || PROCESS_STEPS[i]?.title,
        description: step.description || PROCESS_STEPS[i]?.description,
      }))
    : PROCESS_STEPS

  const serviceAreas = areasSec?.areas?.length ? areasSec.areas : SERVICE_AREAS
  const faqs = faqSec?.items?.length ? faqSec.items : FAQS

  const heroSec    = sections.find(s => s.id === 'fl-hero')
  const partnerSec = sections.find(s => s.id === 'fl-partner')
  const ctaSec     = sections.find(s => s.id === 'fl-cta')

  const heroTitle       = heroSec?.title       || 'Flooring Tampa'
  const heroSubtitle    = heroSec?.subtitle    || 'Hardwood, Tile & Laminate Flooring Solutions'
  const heroDescription = heroSec?.description || 'Upgrade your home with hardwood, laminate, tile, and professionally installed flooring solutions designed for beauty, durability, and everyday living.'
  const heroBg          = heroSec?.backgroundImage || '/flooring-hero.webp'
  const heroCtaText     = heroSec?.ctaText     || 'Visit Our Valrico Showroom'
  const heroCtaLink     = heroSec?.ctaLink     || '/contact'
  const partnerHeading    = partnerSec?.heading || 'Your Trusted Flooring Partner in Tampa Bay'
  const partnerBg         = partnerSec?.bgImage  || '/flooring-tampa-2.jpg'
  const partnerParagraphs = partnerSec?.paragraphs?.length ? partnerSec.paragraphs : [
    "Flooring changes the way a home feels almost immediately. It affects everything from lighting and comfort to maintenance and long-term durability. At Cabinets & Remodeling Depot, we help homeowners throughout Tampa Bay choose flooring solutions that not only look beautiful but also fit the way their homes are actually used.",
    "Whether you're replacing outdated flooring, renovating a single room, or planning a complete home update, our team provides practical flooring guidance, material selection support, and professional installation services from our Valrico showroom.",
    "Every home has different needs. Some homeowners prioritize durability for pets and children, while others focus on style, comfort, or low-maintenance materials. Our goal is to help you find flooring that performs well while complementing your home's overall design.",
  ]
  const ctaHeading  = ctaSec?.heading || 'Start Your Flooring Project Today'
  const ctaBody     = ctaSec?.body    || "Whether you're replacing flooring in a single room or updating your entire home, Cabinets & Remodeling Depot is here to help. Visit our Valrico showroom to compare flooring materials, explore design options, and work with a team committed to creating beautiful, durable spaces built around your lifestyle and budget."
  const ctaBg       = ctaSec?.bgImage  || '/flooring-2.jpg'
  const ctaText     = ctaSec?.ctaText  || 'Request Flooring Pricing'
  const ctaLink     = ctaSec?.ctaLink  || '/contact'

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. HERO — full viewport, flooring background
             Mirrors the bathroom remodeling page hero layout & overlay
      ════════════════════════════════════════════════════════════════════ */}
      <section id="flooring-hero" className="relative flex flex-col min-h-[90vh] md:min-h-screen overflow-hidden">

        {/* ── Background image — no dark wash on right, text-contrast scrim on left ── */}
        <div className="absolute inset-0">
          <Image
            src={heroBg}
            alt="Flooring Tampa Bay – Hardwood, Tile and Laminate"
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
          3. YOUR TRUSTED FLOORING PARTNER IN TAMPA BAY
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-28">

        {/* Background image */}
        <Image
          src={partnerBg}
          alt="Your trusted flooring partner Tampa Bay"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Uniform dark overlay — balanced contrast across both columns */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.30) 100%)',
          }}
        />

        {/* Content */}
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── LEFT: label + heading + rule + desktop CTA ── */}
            <FadeIn className="flex flex-col gap-5">

              {/* Section label — gold flanking lines */}
              <div
                className="flex items-center gap-3"
                style={{ filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.80))' }}
              >
                <span className="w-8 h-px bg-gold shrink-0" />
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
                  Your Trusted Partner
                </p>
                <span className="w-8 h-px bg-gold shrink-0" />
              </div>

              {/* Heading */}
              <h2
                className={`text-3xl sm:text-4xl md:text-[2.7rem] font-extrabold text-white leading-[1.1] ${serif}`}
                style={{
                  textShadow:
                    '0 0 28px rgba(0,0,0,0.95), 0 2px 10px rgba(0,0,0,0.90), 0 4px 24px rgba(0,0,0,0.75)',
                }}
              >
                {partnerHeading}
              </h2>

              {/* Rule */}
              <div className="w-14 h-0.5 bg-white/25" />

              {/* CTA — desktop only */}
              <div className="hidden lg:block pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-widest text-sm h-12 px-8 rounded-lg transition-colors shadow-lg"
                >
                  Visit Our Showroom
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </FadeIn>

            {/* ── RIGHT: body text + mobile CTA ── */}
            <FadeIn delay={0.14} className="flex flex-col gap-6">

              <div
                className="space-y-4 text-white/90 text-base leading-[1.82]"
                style={{
                  textShadow:
                    '0 0 18px rgba(0,0,0,0.92), 0 1px 6px rgba(0,0,0,0.85)',
                }}
              >
                {partnerParagraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {/* CTA — mobile only */}
              <div className="lg:hidden">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-widest text-sm h-12 px-8 rounded-lg transition-colors shadow-lg"
                >
                  Visit Our Showroom
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </FadeIn>

          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. FLOORING OPTIONS AVAILABLE — flip cards
      ════════════════════════════════════════════════════════════════════ */}
      <section id="flooring-options" className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-12">
            <SectionLabel>Flooring Options Available</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 max-w-2xl mx-auto leading-tight ${serif}`}>
              Find the Right Flooring{' '}
              <span className="text-primary">for Your Home</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {flooringOptions.map(({ image, alt, title, description, href }, i) => (
              <FadeIn key={title} delay={0} className="w-full">
                <div
                  className="relative w-full rounded-2xl pb-[100%] xl:pb-[150%]"
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
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
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
                          href={href}
                          className="inline-flex items-center gap-1.5 bg-white text-primary text-[11px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap shadow-sm"
                        >
                          Learn More <ChevronRight className="w-3 h-3" />
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
          5. EXPLORE FLOORING OPTIONS IN PERSON — 2-col, full-bleed bg
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/flooring-tampa.jpg"
            alt="Explore flooring options at our Valrico showroom Tampa Bay"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Left-heavy gradient: darker behind the text column, fades right so the image breathes */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.52) 40%, rgba(0,0,0,0.28) 72%, rgba(0,0,0,0.18) 100%)',
            }}
          />
          {/* Subtle bottom vignette to ground the section */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.30) 0%, transparent 25%)' }}
          />
        </div>

        <div className="relative z-10 container-custom max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── LEFT: label + heading + body + CTA ── */}
            <FadeIn className="flex flex-col gap-6">

              {/* Section label */}
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-white/60 shrink-0" />
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white">
                  Visit Our Showroom
                </p>
                <span className="w-8 h-px bg-white/60 shrink-0" />
              </div>

              {/* Heading */}
              <h2
                className={`text-3xl sm:text-4xl md:text-[2.6rem] font-extrabold text-white leading-[1.1] ${serif}`}
                style={{ textShadow: '0 2px 24px rgba(0,0,0,0.85), 0 1px 6px rgba(0,0,0,0.70)' }}
              >
                Explore Flooring Options{' '}
                <span className="text-primary">in Person</span>
              </h2>

              {/* Accent bar */}
              <div className="w-14 h-1 bg-primary rounded-full" />

              {/* Body */}
              <div
                className="space-y-4 text-white text-base leading-[1.82]"
                style={{ textShadow: '0 1px 10px rgba(0,0,0,0.85), 0 0 20px rgba(0,0,0,0.60)' }}
              >
                <p>
                  Choosing flooring online can be difficult. Colors look different under various
                  lighting conditions, textures are hard to evaluate through photos, and materials
                  that appear similar often perform very differently over time.
                </p>
                <p>
                  Our Valrico showroom allows homeowners to compare flooring materials firsthand
                  while speaking directly with professionals who understand how different products
                  perform in Florida homes.
                </p>
                <p>
                  Many homeowners discover that seeing flooring in person makes the decision-making
                  process significantly easier and more confident.
                </p>
              </div>

              {/* CTA */}
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm h-12 px-8 rounded-lg transition-colors shadow-lg shadow-black/40"
                >
                  Visit Our Valrico Showroom
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </FadeIn>

            {/* ── RIGHT: solid-tinted checklist card ── */}
            <FadeIn delay={0.14}>
              <div className="rounded-2xl p-7 sm:p-8 flex flex-col gap-5 border border-white/20 bg-black/50 backdrop-blur-sm">

                {/* Card header */}
                <div>
                  <p className="text-white/55 font-bold uppercase tracking-[0.16em] text-[11px] mb-2.5">
                    What You Can Compare
                  </p>
                  <h3 className={`text-white text-xl sm:text-2xl font-extrabold leading-snug ${serif}`}>
                    See Every Option{' '}
                    <span className="text-gold">Before You Decide</span>
                  </h3>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/20" />

                {/* Checklist */}
                <ul className="space-y-3">
                  {SHOWROOM_COMPARE.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white text-sm font-medium">
                      <span className="w-6 h-6 rounded-full bg-white/15 border border-white/35 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                <div className="h-px bg-white/20" />

                {/* Footer note */}
                <p className="text-white/60 text-xs leading-relaxed">
                  Bring your room dimensions and ideas — our team will help you find
                  the perfect flooring match for your home and lifestyle.
                </p>

              </div>
            </FadeIn>

          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. FLOORING DESIGN INSPIRATION — styles + gallery
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-warm-gray">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-8">
            <SectionLabel>Flooring Design Inspiration</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 ${serif}`}>
              Visualize Your Ideal Space
            </h2>
            <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
              Whether you prefer warm natural wood tones, sleek contemporary finishes, or durable
              waterproof solutions, exploring different flooring styles can help you visualize your
              ideal space.
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
          <FadeIn delay={0.12}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {galleryImages.map(({ src, alt }, i) => (
                <div
                  key={i}
                  className="relative aspect-4/5 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group"
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.18} className="text-center mt-8">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-sm h-12 px-8 rounded-lg transition-colors"
            >
              View More Inspiration
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          7. BENEFITS OF NEW FLOORING — image card grid
             Styled after "Enhance Your Renovation" on the bathroom page
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-10">
            <SectionLabel>Benefits of New Flooring</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 ${serif}`}>
              Why Upgrade Your{' '}
              <span className="text-primary">Flooring</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
              Upgrading flooring can improve both the appearance and functionality of your home.
              New flooring often becomes one of the most noticeable improvements homeowners make
              during a renovation project.
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {BENEFITS.map(({ image, label }, i) => (
              <FadeIn key={label} delay={i * 0.05}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-md cursor-default">
                  {/* Photo */}
                  <Image
                    src={image}
                    alt={label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  {/* Gradient overlay — always present, deepens on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                  {/* Primary accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <p className={`text-white font-bold text-sm sm:text-base leading-tight drop-shadow-md ${serif}`}>
                      {label}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          8. OUR FLOORING INSTALLATION PROCESS — 5 numbered steps
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-warm-gray">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-14">
            <SectionLabel>Our Flooring Installation Process</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 ${serif}`}>
              How We Bring Your{' '}
              <span className="text-primary">Flooring Vision to Life</span>
            </h2>
          </FadeIn>

          <div className="relative">
            {/* Connector line (desktop only) */}
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
          9. SERVING HOMEOWNERS THROUGHOUT TAMPA BAY — areas + map
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left — text + area grid */}
            <FadeIn>
              <SectionLabel>Our Service Area</SectionLabel>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5 ${serif}`}>
                Serving Homeowners Throughout{' '}
                <span className="text-primary">Tampa Bay</span>
              </h2>
              <div className="space-y-3 text-gray-600 text-base leading-relaxed mb-6">
                <p>
                  Cabinets &amp; Remodeling Depot proudly provides flooring installation and
                  renovation services throughout Tampa Bay, including Tampa, Valrico, Brandon,
                  Riverview, Lithia, Apollo Beach, Plant City, Wesley Chapel, and surrounding
                  communities.
                </p>
                <p>
                  Whether you&rsquo;re searching for flooring near me Tampa or planning a complete
                  flooring upgrade, our team is ready to help transform your space.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6 sm:gap-x-8">
                {serviceAreas.map((area) => (
                  <span key={area} className="flex items-center gap-2.5 text-gray-700 text-sm font-medium">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-3 h-3 text-primary" />
                    </span>
                    {area}
                  </span>
                ))}
                <span className="flex items-center gap-2 text-primary text-sm font-semibold col-span-2 mt-1">
                  <MapPin className="w-4 h-4 shrink-0" />
                  And all surrounding communities
                </span>
              </div>
            </FadeIn>

            {/* Right — Google Map */}
            <FadeIn delay={0.12}>
              <div className="relative w-full h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <iframe
                  src="https://maps.google.com/maps?cid=18201794426186346316&output=embed&hl=en-US&t=k"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cabinets & Remodeling Depot — 106 S St Cloud Ave, Valrico, FL 33594"
                />
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          10. FREQUENTLY ASKED QUESTIONS
      ════════════════════════════════════════════════════════════════════ */}
      <FAQSection faqs={faqs} title="Frequently Asked Questions" />

      {/* ════════════════════════════════════════════════════════════════════
          11. START YOUR FLOORING PROJECT TODAY — final CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-32 overflow-hidden">

        {/* Background photo — light cream overlay */}
        <div className="absolute inset-0">
          <Image
            src={ctaBg}
            alt="Start your flooring project Tampa Bay"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Cream wash — strong enough for text legibility, light enough to show image */}
          <div className="absolute inset-0 bg-white/78" />
        </div>

        <div className="relative z-10 container-custom max-w-3xl text-center px-4">
          <FadeIn>

            {/* Gold section label with long flanking lines */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-gold" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold whitespace-nowrap">
                Tampa Bay Flooring Experts
              </p>
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-gold" />
            </div>

            {/* Heading */}
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-5 ${serif}`}>
              {ctaHeading}
            </h2>

            {/* Body */}
            <p className="text-gray-800 font-medium text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              {ctaBody}
            </p>

            <div className="flex justify-center">
              <Link
                href={ctaLink}
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-sm h-14 px-8 rounded-lg transition-colors whitespace-nowrap"
              >
                {ctaText}
              </Link>
            </div>

          </FadeIn>
        </div>

      </section>

    </>
  )
}
