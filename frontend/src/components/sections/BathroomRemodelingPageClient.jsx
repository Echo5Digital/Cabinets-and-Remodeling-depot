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
  Star,
  ShieldCheck,
  Palette,
  CheckCircle,
  ArrowRight,
  ClipboardList,
  Hammer,
  MessageSquare,
  Settings2,
  ChevronRight,
  Phone,
  X,
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

/* ─── Section label ─────────────────────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary mb-3">
      <span className="w-6 h-px bg-primary inline-block" />
      {children}
      <span className="w-6 h-px bg-primary inline-block" />
    </p>
  )
}

/* ─── Shared serif class ─────────────────────────────────────────────────────── */
const serif = 'font-[family-name:var(--font-playfair)]'

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const TRUST_ITEMS = [
  { icon: Calendar,  label: 'Free Estimates' },
  { icon: Building2, label: 'Valrico Showroom' },
  { icon: Wrench,    label: 'Professional Installation' },
  { icon: Star,      label: '5-Star Rated' },
]

const WHY_CHOOSE = [
  {
    icon: Building2,
    title: 'Local Valrico Showroom',
    description:
      'Explore vanities, countertops, faucets, and design options in person before making important remodeling decisions.',
  },
  {
    icon: Settings2,
    title: 'Complete Bathroom Remodeling Solutions',
    description:
      'From vanity upgrades to full bathroom renovations, we provide comprehensive remodeling services tailored to your space.',
  },
  {
    icon: Wrench,
    title: 'Professional Installation',
    description:
      'Our experienced team ensures every component is installed with precision and attention to detail.',
  },
  {
    icon: Palette,
    title: 'Personalized Design Guidance',
    description:
      'We help homeowners create bathrooms that reflect their style while improving functionality and organization.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Products',
    description:
      'Choose from trusted materials, modern finishes, and durable products designed for everyday use.',
  },
]

const SERVICES = [
  {
    image: '/bathroom-designing.webp',
    alt: 'Bathroom design and planning Tampa Bay',
    title: 'Bathroom Design & Planning',
    body: 'Every successful bathroom renovation starts with thoughtful planning. We work closely with homeowners to understand their goals, evaluate existing layouts, and develop designs that balance comfort, efficiency, and visual appeal.',
  },
  {
    image: '/custom-bathroom-vanity.jpg',
    alt: 'Custom bathroom vanities Tampa',
    title: 'Custom Bathroom Vanities',
    body: "Our showroom features bathroom vanities Tampa homeowners can compare in person. Whether you're looking for a modern floating vanity, a traditional cabinet-style vanity, or additional storage solutions, we help you find options that fit your space and style.",
  },
  {
    image: '/bathroom-surfaces.webp',
    alt: 'Quartz and granite bathroom countertops Tampa',
    title: 'Bathroom Countertops & Surfaces',
    body: 'We offer bathroom countertops Tampa homeowners can customize using premium materials such as quartz and granite. These surfaces provide durability, easy maintenance, and timeless beauty.',
  },
  {
    image: '/faucets-fixtures.jpg',
    alt: 'Bathroom faucets and fixtures Tampa Valrico showroom',
    title: 'Faucets & Fixture Selections',
    body: 'Our showroom includes bathroom faucets Tampa Valrico showroom visitors can compare alongside vanities and countertop materials to create a cohesive design throughout the space.',
  },
  {
    image: '/shower-upgrade.jpg',
    alt: 'Shower and bath upgrades Tampa',
    title: 'Shower & Bath Upgrades',
    body: 'From updated shower systems to bathtub replacements, we help homeowners create bathrooms that feel more comfortable, modern, and functional.',
  },
  {
    image: '/storage-solution.webp',
    alt: 'Bathroom storage and organization solutions',
    title: 'Storage & Organization Solutions',
    body: 'Smart storage solutions help maximize available space while keeping bathrooms organized and clutter-free.',
  },
]

/* Flip transform applied to inner wrapper when card is flipped */
const FLIP_TRANSFORM = [
  'rotateY(180deg)',   // 0 — flip left
  'rotateX(-180deg)', // 1 — flip up
  'rotateY(-180deg)', // 2 — flip right
  'rotateY(180deg)',  // 3 — flip left
  'rotateX(180deg)',  // 4 — flip down
  'rotateY(-180deg)', // 5 — flip right
]

/* Initial transform of the back face so it starts hidden */
const BACK_INIT = [
  'rotateY(180deg)',  // 0 — Y-axis
  'rotateX(180deg)', // 1 — X-axis
  'rotateY(180deg)', // 2 — Y-axis
  'rotateY(180deg)', // 3 — Y-axis
  'rotateX(180deg)', // 4 — X-axis
  'rotateY(180deg)', // 5 — Y-axis
]

const INSPIRATION_STYLES = [
  'Spa-Inspired Bathrooms',
  'Modern Bathroom Designs',
  'Walk-In Showers',
  'Double Vanity Layouts',
  'Contemporary Bathroom Renovations',
  'Guest Bathroom Updates',
]

const GALLERY = [
  { src: '/bathroom-remodel-1.jpg',    alt: 'Luxury bathroom vanity Tampa' },
  { src: '/bathroom-remodeling-2.jpg', alt: 'Modern bathroom renovation Tampa Bay' },
  { src: '/bathroom-remodel-3.jpg',    alt: 'Walk-in shower bathroom Tampa' },
  { src: '/bathroom-remodel-4.jpg',    alt: 'Modern bathroom countertops Tampa' },
  { src: '/bathroom-remodeling-3.jpg', alt: 'Bathroom renovation Valrico Tampa Bay' },
  { src: '/bathroom-remodel-5.jpg',    alt: 'Custom bathroom renovation Tampa Bay' },
  { src: '/bathroom-remodel-2.jpg',    alt: 'Elegant tile work bathroom Tampa' },
  { src: '/bathroom-remodel-6.jpg',    alt: 'Spa-inspired bathroom remodel Tampa' },
]

const POPULAR_UPGRADES = [
  { title: 'Custom Bathroom Vanities',   image: '/custom-bathroom-vanities.jpeg' },
  { title: 'Quartz Countertops',         image: '/quartz-countertopz.jpeg' },
  { title: 'Modern Faucet Collections',  image: '/modern-faucet-collections.jpeg' },
  { title: 'Walk-In Showers',            image: '/walk-in-showers.jpeg' },
  { title: 'Tile Flooring',              image: '/tile-flooring.jpeg' },
  { title: 'Improved Lighting',          image: '/improved-lighting.jpeg' },
  { title: 'Storage Enhancements',       image: '/storage-enhancement.jpeg' },
  { title: 'Double Sink Vanities',       image: '/double-sink-vanities.jpeg' },
]

const PROCESS_STEPS = [
  {
    step: '01',
    icon: MessageSquare,
    title: 'Consultation',
    description: 'We begin by discussing your goals, design preferences, and budget.',
  },
  {
    step: '02',
    icon: Building2,
    title: 'Design & Material Selection',
    description:
      'Visit our Valrico showroom to compare vanities, countertops, faucets, and finishes while finalizing your remodeling plan.',
  },
  {
    step: '03',
    icon: ClipboardList,
    title: 'Planning & Scheduling',
    description:
      'Our team develops a clear project scope and timeline so you know exactly what to expect.',
  },
  {
    step: '04',
    icon: Hammer,
    title: 'Professional Installation',
    description:
      'We complete your bathroom remodel with careful attention to craftsmanship, quality, and efficiency.',
  },
  {
    step: '05',
    icon: CheckCircle,
    title: 'Final Walkthrough',
    description: 'Before project completion, we review every detail to ensure your satisfaction.',
  },
]

const SERVICE_AREAS = [
  'Tampa', 'Apollo Beach', 'Valrico', 'Plant City',
  'Brandon', 'Wesley Chapel', 'Riverview', 'Lithia',
]

const FAQS = [
  {
    question: 'Do you offer complete bathroom remodeling Tampa services?',
    answer:
      'Yes. We provide full bathroom remodeling services including vanities, countertops, fixtures, storage solutions, and renovation support.',
  },
  {
    question: 'Can I visit your showroom before starting my renovation?',
    answer:
      'Absolutely. Our Valrico showroom allows homeowners to compare bathroom vanities, faucets, countertops, and finishes in person.',
  },
  {
    question: 'Do you offer bathroom countertops Tampa homeowners can customize?',
    answer:
      'Yes. We provide quartz and granite bathroom countertop options along with custom vanity top solutions.',
  },
  {
    question: 'Do you help with bathroom fixture and faucet selection?',
    answer:
      'Yes. We help homeowners coordinate bathroom faucets, fixtures, vanities, and countertop materials for a more cohesive bathroom design.',
  },
  {
    question: 'How long does a bathroom renovation typically take?',
    answer:
      'Project timelines vary depending on the scope of work. Smaller updates may take a few weeks, while complete bathroom renovations can require additional time. We provide clear timelines before work begins.',
  },
]

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function BathroomRemodelingPageClient() {
  const [flippedCard, setFlippedCard] = useState(null)

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. HERO — premium luxury bathroom hero
             Soft overlay, full bathroom visible, strong CTA hierarchy
      ════════════════════════════════════════════════════════════════════ */}
      <section id="bathroom-hero" className="relative flex flex-col min-h-[90vh] md:min-h-screen overflow-hidden">

        {/* ── Background — object-center shows full bathroom incl. bathtub ── */}
        <div className="absolute inset-0">
          <Image
            src="/bathroom-02.webp"
            alt="Luxury bathroom remodeling Tampa Bay"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />

          {/* Softer left-to-right gradient — lets the image breathe more */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.40) 28%, rgba(0,0,0,0.10) 56%, rgba(0,0,0,0.00) 76%)',
            }}
          />
          {/* Subtle bottom vignette to ground the hero */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.26) 0%, transparent 28%)' }}
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

              {/* ── Location badge pill ─────────────────────────────── */}
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

              {/* ── H1 — 2-line luxury headline ─────────────────────── */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className={`font-extrabold leading-[1.08] mb-5 ${serif}`}
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.72), 0 1px 6px rgba(0,0,0,0.62)' }}
              >
                <span className="block text-white text-3xl sm:text-4xl md:text-[3.1rem] lg:text-[3.5rem]">
                  Bathroom Remodeling Tampa
                </span>
                <span className="block text-gold text-2xl sm:text-[1.7rem] md:text-[2.5rem] lg:text-[2.8rem] mt-1.5 leading-[1.1]">
                  Custom Vanities &amp; Luxury Renovations
                </span>
              </motion.h1>

              {/* ── Gold accent divider ──────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.20 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-0.75 w-12 rounded-full bg-gold" />
                <div className="h-px w-20 rounded-full bg-white/30" />
              </motion.div>

              {/* ── Sub-headline ─────────────────────────────────────── */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.26 }}
                className="text-white/90 text-sm sm:text-base lg:text-[1.05rem] leading-[1.78] mb-9 max-w-[440px]"
                style={{ textShadow: '0 1px 10px rgba(0,0,0,0.75), 0 0 20px rgba(0,0,0,0.60)' }}
              >
                Transform your bathroom with custom vanities, premium countertops, modern fixtures,
                and professional renovation solutions designed around your lifestyle.
              </motion.p>

              {/* ── CTA buttons ─────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
                className="flex flex-col sm:flex-row gap-3 mb-8"
              >
                {/* Primary — solid white, strong contrast */}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/94 text-gray-900 hover:text-primary font-bold uppercase tracking-widest text-sm h-12 px-9 rounded-lg transition-all duration-300 whitespace-nowrap shadow-xl shadow-black/30"
                >
                  Schedule a Free Consultation
                </Link>
                {/* Secondary — light maroon-border glass */}
                <a
                  href="tel:+18136512333"
                  className="inline-flex items-center justify-center gap-2 border border-primary/65 text-white hover:bg-primary/10 font-semibold uppercase tracking-widest text-sm h-12 px-9 rounded-lg transition-all duration-300 whitespace-nowrap backdrop-blur-sm"
                >
                  <Phone className="w-4 h-4 shrink-0 text-primary/80" />
                  Call (813) 651-2333
                </a>
              </motion.div>

              {/* ── Simplified trust indicators ──────────────────────── */}
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
              {WHY_CHOOSE.map(({ icon: Icon, title, description }) => (
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
          3. TRUSTED PARTNER — light gradient background, 2-col layout
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-28">

        {/* ── Background image ── */}
        <Image
          src="/bathroom-remodeling-design-2.jpg"
          alt="Luxury bathroom remodeling design"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* ── Overlay — light enough to show image, directional for text areas ── */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.40) 50%, rgba(0,0,0,0.28) 100%)' }}
        />

        {/* ── Content ── */}
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── LEFT — label + heading ── */}
            <FadeIn className="flex flex-col gap-5">

              {/* Label */}
              <div className="flex items-center gap-3" style={{ filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.80))' }}>
                <span className="w-8 h-px bg-gold shrink-0" />
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
                  Your Trusted
                </p>
                <span className="w-8 h-px bg-gold shrink-0" />
              </div>

              {/* Heading */}
              <h2
                className={`text-3xl sm:text-4xl md:text-[2.7rem] font-extrabold text-white leading-[1.1] ${serif}`}
                style={{ textShadow: '0 0 28px rgba(0,0,0,0.95), 0 2px 10px rgba(0,0,0,0.90), 0 4px 24px rgba(0,0,0,0.75)' }}
              >
                Bathroom Remodeling Partner{' '}
                <span className="text-gold">in Tampa Bay</span>
              </h2>

              {/* Rule */}
              <div className="w-14 h-0.5 bg-white/25" />

              {/* CTA — desktop only in left col */}
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

            {/* ── RIGHT — body text + mobile CTA ── */}
            <FadeIn delay={0.14} className="flex flex-col gap-6">

              <div className="space-y-4 text-white/90 text-base leading-[1.82]" style={{ textShadow: '0 0 18px rgba(0,0,0,0.92), 0 1px 6px rgba(0,0,0,0.85)' }}>
                <p>
                  A well-designed bathroom should feel comfortable, functional, and easy to maintain.
                  For many homeowners, older bathrooms often feel cramped, outdated, or no longer
                  practical for everyday routines. At Cabinets &amp; Remodeling Depot, we help
                  homeowners throughout Tampa Bay create bathrooms that balance style, storage, and
                  long-term functionality without making the remodeling process overwhelming.
                </p>
                <p>
                  Whether you&rsquo;re planning a complete bathroom remodeling Tampa project,
                  replacing outdated vanities, upgrading countertops, or selecting new fixtures, our
                  team provides personalized guidance from our Valrico showroom. Every renovation is
                  designed around your goals, lifestyle, and budget.
                </p>
              </div>

              {/* CTA — mobile only, below text */}
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
          4. COMPREHENSIVE SERVICES — flip cards (3-col grid)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-12">
            <SectionLabel>What We Offer</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 max-w-2xl mx-auto leading-tight ${serif}`}>
              Comprehensive Bathroom Remodeling{' '}
              <span className="text-primary">Services</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ image, alt, title, body }, i) => (
              <FadeIn key={title} delay={0} className="w-full">
                {/* Perspective container — padding-bottom hack for reliable 4:3 aspect ratio
                    when all children are absolute (aspectRatio alone fails on some browsers) */}
                <div
                  className="relative w-full rounded-2xl"
                  style={{ perspective: '1200px', paddingBottom: '75%' }}
                >
                  {/* Flip inner */}
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
                      {/* Background image */}
                      <Image
                        src={image}
                        alt={alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Gradient overlay — darker at bottom for text contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

                      {/* Title — centered */}
                      <div className="absolute inset-0 flex items-center justify-center px-5 pb-14">
                        <h3
                          className={`text-white text-xl sm:text-2xl font-extrabold text-center leading-snug ${serif}`}
                          style={{ textShadow: '0 2px 14px rgba(0,0,0,0.85), 0 0 30px rgba(0,0,0,0.6)' }}
                        >
                          {title}
                        </h3>
                      </div>

                      {/* Learn More — bottom center */}
                      <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                        <button
                          onClick={() => setFlippedCard(i)}
                          className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/28 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-full border border-white/35 transition-all duration-200 hover:border-white/60 hover:scale-105"
                        >
                          Learn More <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Top-left index badge */}
                      <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{i + 1}</span>
                      </div>
                    </div>

                    {/* ── BACK FACE ── */}
                    <div
                      className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-primary flex flex-col justify-between p-6 sm:p-7"
                      style={{ backfaceVisibility: 'hidden', transform: BACK_INIT[i] }}
                    >
                      {/* Body */}
                      <p className="text-white text-sm sm:text-[15px] leading-relaxed font-medium">
                        {body}
                      </p>

                      {/* Bottom actions */}
                      <div className="flex items-center justify-between gap-3">
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
          5. BATHROOM DESIGN INSPIRATION — styles + masonry gallery
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-warm-gray">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-8">
            <SectionLabel>Bathroom Design Inspiration</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 ${serif}`}>
              Find Your Bathroom Style
            </h2>
            <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
              Whether you prefer modern simplicity or timeless elegance, exploring different design
              styles can help bring your vision to life.
            </p>
          </FadeIn>

          {/* Popular styles — pill tags */}
          <FadeIn delay={0.08}>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {INSPIRATION_STYLES.map((style) => (
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

          {/* Aligned grid gallery — uniform aspect ratio so all rows line up */}
          <FadeIn delay={0.12}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {GALLERY.map(({ src, alt }, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group"
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
          6. POPULAR BATHROOM UPGRADES — 2 × 4 image card grid
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-10">
            <SectionLabel>Enhance Your Renovation</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 ${serif}`}>
              Popular Bathroom Upgrades
            </h2>
            <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
              Many homeowners choose to enhance their bathroom remodel with upgrades that improve
              both appearance and functionality.
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {POPULAR_UPGRADES.map(({ title, image }, i) => (
              <FadeIn key={title} delay={i * 0.05}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-md cursor-default">
                  {/* Photo */}
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-107"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  {/* Gradient overlay — always present, deepens on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                  {/* Olive accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <p className={`text-white font-bold text-sm sm:text-base leading-tight drop-shadow-md ${serif}`}>
                      {title}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          7. PROCESS — 5 numbered steps with connector line
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-warm-gray">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-14">
            <SectionLabel>Our Bathroom Remodeling Process</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 ${serif}`}>
              How We Bring Your{' '}
              <span className="text-primary">Bathroom Vision to Life</span>
            </h2>
          </FadeIn>

          <div className="relative">

            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-9 left-[8%] right-[8%] h-px bg-linear-to-r from-transparent via-primary/25 to-transparent z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
              {PROCESS_STEPS.map(({ step, icon: Icon, title, description }, i) => (
                <FadeIn key={step} delay={i * 0.09}>
                  <div className="relative z-10 flex flex-col items-center text-center gap-4">

                    {/* Step circle */}
                    <div className="relative">
                      <div className="w-18 h-18 rounded-full bg-primary shadow-lg shadow-primary/20 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      {/* Step number badge */}
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
          8. SERVICE AREAS — text left | image + card right
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* ── Left: heading + body + checklist + map ── */}
            <FadeIn className="flex flex-col">
              <SectionLabel>Our Service Area</SectionLabel>

              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4 ${serif}`}>
                Serving Homeowners Throughout{' '}
                <span className="text-primary">Tampa Bay</span>
              </h2>

              {/* Body paragraphs — .body-text-protected stops browser auto-link recoloring */}
              <div className="body-text-protected space-y-3 mb-6 text-gray-600 text-base leading-relaxed">
                <p>
                  Cabinets &amp; Remodeling Depot proudly provides bathroom remodeling and
                  renovation services throughout Tampa Bay, including Tampa, Valrico, Brandon,
                  Riverview, Lithia, Apollo Beach, Plant City, Wesley Chapel, and surrounding
                  communities.
                </p>
                <p>
                  Whether you&rsquo;re searching for a trusted bathroom remodeling contractor in
                  Tampa or planning a bathroom renovation near Valrico, our team is ready to help
                  transform your space.
                </p>
              </div>

              {/* Area list — 2-column grid with location pins */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6 sm:gap-x-8">
                {SERVICE_AREAS.map((area) => (
                  <span
                    key={area}
                    className="flex items-center gap-2.5 text-gray-700 text-sm font-medium"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-3 h-3 text-primary" />
                    </span>
                    {area}
                  </span>
                ))}

                {/* "And all surrounding…" spans full width */}
                <span className="flex items-center gap-2 text-primary text-sm font-semibold col-span-2 mt-1">
                  <MapPin className="w-4 h-4 shrink-0" />
                  And all surrounding communities
                </span>
              </div>

              {/* Google Map — responsive height */}
              <div className="relative w-full h-52 sm:h-60 rounded-xl overflow-hidden shadow-md border border-gray-200 flex-shrink-0">
                <iframe
                  src="https://maps.google.com/maps?cid=18201794426186346316&output=embed&hl=en-US&t=k"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                    display: 'block',
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cabinets & Remodeling Depot — 106 S St Cloud Ave, Valrico, FL 33594"
                />
              </div>
            </FadeIn>

            {/* ── Right: tall portrait image + CTA card ── */}
            <FadeIn delay={0.12} className="flex flex-col gap-5 w-full">

              {/* Portrait image — fills more vertical space than the old 4/3 */}
              <div className="relative w-full overflow-hidden rounded-2xl shadow-xl" style={{ aspectRatio: '4/5' }}>
                <Image
                  src="/bathroom-remodeling-3.jpg"
                  alt="Bathroom remodeling service area Tampa Bay"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* CTA card — balances vertical height against the left map */}
              <div className="bg-warm-gray rounded-2xl p-5 sm:p-6 border border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className={`text-gray-900 font-bold text-base sm:text-lg leading-snug mb-1 ${serif}`}>
                    Ready to Transform Your Bathroom?
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Visit our Valrico showroom or call for a free consultation.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/80 text-white font-bold uppercase tracking-widest text-xs h-11 px-5 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
                >
                  Free Estimate
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          9. FAQ — maroon primary accent on white background
      ════════════════════════════════════════════════════════════════════ */}
      <FAQSection faqs={FAQS} title="Frequently Asked Questions" />

      {/* ════════════════════════════════════════════════════════════════════
          10. FINAL CTA — light overlay, dark text, gold accents
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-32 overflow-hidden">

        {/* Background photo — bright bathroom image, light cream overlay */}
        <div className="absolute inset-0">
          <Image
            src="/start-bathroom-remodel.jpeg"
            alt="Start your bathroom remodeling project Tampa Bay"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Cream wash — strong enough for full text legibility, light enough to show image */}
          <div className="absolute inset-0 bg-white/78" />
        </div>

        <div className="relative z-10 container-custom max-w-3xl text-center px-4">
          <FadeIn>

            {/* Gold section label with long flanking lines */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="flex-1 max-w-[60px] sm:max-w-[90px] h-px bg-gold" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold whitespace-nowrap">
                Tampa Bay Bathroom Experts
              </p>
              <span className="flex-1 max-w-[60px] sm:max-w-[90px] h-px bg-gold" />
            </div>

            {/* Heading */}
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-5 ${serif}`}>
              Start Your Bathroom Remodeling{' '}
              <span className="text-primary">Project Today</span>
            </h2>

            {/* Body */}
            <p className="text-gray-800 font-medium text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Whether you&rsquo;re updating an outdated bathroom, improving storage, or planning a
              complete renovation, Cabinets &amp; Remodeling Depot is here to help. Visit our
              Valrico showroom to explore bathroom vanities, countertops, faucets, and design options
              while working with a team committed to creating beautiful, functional bathrooms tailored
              to your needs and lifestyle.
            </p>

            {/* Gold CTA button */}
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/85 text-white font-bold uppercase tracking-widest text-sm h-14 px-10 rounded-lg transition-colors shadow-lg whitespace-nowrap"
              >
                Schedule a Free Consultation
              </Link>
            </div>

          </FadeIn>
        </div>

      </section>

    </>
  )
}
