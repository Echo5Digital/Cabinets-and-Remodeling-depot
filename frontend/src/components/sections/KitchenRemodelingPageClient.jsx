'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FAQSection } from '@/components/sections/FAQSection'
import { Card, CardContent } from '@/components/ui/card'
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
  Search,
  MessageSquare,
  Settings2,
  ChevronRight,
  Quote,
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
    description: 'Explore cabinets, countertops, finishes, and design options in person before making important decisions.',
  },
  {
    icon: Settings2,
    title: 'Complete Remodeling Solutions',
    description: 'From cabinetry and countertops to flooring and finishing touches, we provide comprehensive kitchen renovation services.',
  },
  {
    icon: Wrench,
    title: 'Professional Installation',
    description: 'Our experienced team ensures every component is installed with precision and attention to detail.',
  },
  {
    icon: Palette,
    title: 'Personalized Design Guidance',
    description: 'We help homeowners create kitchens that reflect their style while maximizing storage, workflow, and comfort.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Products',
    description: 'Choose from trusted materials, modern designs, and durable finishes built to withstand daily use.',
  },
]

const SERVICES = [
  {
    image: '/07_img.jpg',
    alt: 'Kitchen design and planning Tampa Bay',
    title: 'Kitchen Design & Planning',
    href: '/contact',
    description: 'Thoughtful planning that balances aesthetics, functionality, and your lifestyle needs.',
    paragraphs: [
      'Every successful kitchen remodel starts with thoughtful planning. Our team works closely with homeowners to understand their goals, evaluate the existing space, and develop a design that balances aesthetics with functionality.',
      "Whether you're seeking a contemporary kitchen, a timeless traditional style, or a completely customized layout, we help bring your ideas to life.",
    ],
  },
  {
    image: '/1_img.jpg',
    alt: 'Cabinet solutions Tampa Bay',
    title: 'Cabinet Solutions',
    href: '/in-stock-cabinets',
    description: 'Stock, semi-custom, and custom cabinetry to fit your style, budget, and storage needs.',
    paragraphs: [
      'Cabinets play a major role in both the appearance and functionality of your kitchen. We offer a variety of options, including stock, semi-custom, and custom cabinetry to fit different budgets and design preferences.',
      'Our design team can help you select cabinet styles, finishes, storage features, and organizational solutions that maximize efficiency while enhancing visual appeal.',
    ],
  },
  {
    image: '/03_img.webp',
    alt: 'Countertops and surfaces Tampa Bay',
    title: 'Countertops & Surfaces',
    href: '/countertops-tampa',
    description: 'Premium quartz, granite, and other surfaces that elevate the look and performance of your kitchen.',
    paragraphs: [
      'The right countertop can transform the look and performance of your kitchen. We offer a variety of premium materials, including quartz, granite, and other popular surfaces that combine durability with style.',
      'Our team helps homeowners select options that complement their cabinetry and withstand the demands of everyday use.',
    ],
  },
  {
    image: '/2_img.webp',
    alt: 'Flooring and finishing details Tampa Bay',
    title: 'Flooring & Finishing Details',
    href: '/flooring-in-tampa',
    description: 'Flooring, backsplashes, hardware, and finishing elements that create a cohesive, polished look.',
    paragraphs: [
      'A complete kitchen renovation goes beyond cabinets and countertops. We help homeowners choose flooring, backsplashes, hardware, and finishing elements that create a cohesive, polished look throughout the space.',
    ],
  },
]

const GALLERY = [
  { src: '/kitchen-remodel.webp',               alt: 'Modern kitchen remodel Tampa Bay' },
  { src: '/kitchen-remodel-2.webp',              alt: 'Kitchen renovation Tampa' },
  { src: '/Modern-kitchen-renovation-Tampa-completed-project.jpg', alt: 'Completed kitchen renovation Tampa' },
  { src: '/kitchen_cabinet_remodeling-01.webp',  alt: 'Kitchen cabinet remodeling Tampa' },
  { src: '/kitchen_countertops_marble.webp',     alt: 'Marble countertops kitchen Tampa' },
]

const KITCHEN_STYLES = [
  'Modern Kitchen Designs',
  'Shaker Cabinet Kitchens',
  'Open-Concept Layouts',
  'Quartz Countertop Kitchens',
  'Contemporary Kitchen Renovations',
  'Classic Traditional Kitchens',
]

const PROCESS_STEPS = [
  {
    step: '01',
    icon: MessageSquare,
    title: 'Consultation',
    description: 'We begin by discussing your goals, budget, and design preferences.',
  },
  {
    step: '02',
    icon: Search,
    title: 'Design & Material Selection',
    description: 'Visit our Valrico showroom to explore cabinets, countertops, and finishes while finalizing your plan.',
  },
  {
    step: '03',
    icon: ClipboardList,
    title: 'Project Planning',
    description: 'Our team develops a detailed project scope and timeline so you know exactly what to expect.',
  },
  {
    step: '04',
    icon: Hammer,
    title: 'Professional Installation',
    description: 'We complete your kitchen remodel with careful attention to craftsmanship, quality, and efficiency.',
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

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    location: 'Riverview, FL',
    quote: 'We finally redid our kitchen after 12 years putting it off. Went into the Valrico showroom with no idea what we wanted and they were so patient, spent over an hour going through cabinet styles and countertop samples with us. Ended up with white shaker cabinets and quartz countertops and I obsess over it every single morning. The crew was in and out in a week and left everything spotless.',
  },
  {
    name: 'Carlos B.',
    location: 'Brandon, FL',
    quote: "Got quotes from three places before coming here. Best price, no pressure, and they actually listened. The semi-custom cabinets look completely custom, you'd never know the difference. There was one small issue during install and they fixed it the same day without us having to follow up. Kitchen looks amazing, added real value to the house.",
  },
  {
    name: 'Michelle R.',
    location: 'Valrico, FL',
    quote: 'We redid the kitchen before listing our home and honestly it changed everything. They helped us pick finishes that photograph well without going over budget. Whole project was done in under two weeks. Our realtor said it was one of the best kitchen updates she had seen at that price point. We ended up not even selling because we fell back in love with the house!',
  },
]

const FAQS = [
  {
    question: 'How much does a kitchen remodel cost in Tampa?',
    answer: 'The cost of a kitchen remodel depends on factors such as project size, material selections, cabinetry, countertops, and installation requirements. We provide free estimates and personalized recommendations based on your goals and budget.',
  },
  {
    question: 'How long does a kitchen renovation take?',
    answer: 'Project timelines vary depending on the scope of work. Smaller updates may take a few weeks, while complete kitchen renovations can require additional time. We provide clear timelines before work begins.',
  },
  {
    question: 'Do you help with kitchen design?',
    answer: 'Yes. Our team assists homeowners with kitchen layouts, cabinet selections, material choices, and design planning to create a space that balances functionality and style.',
  },
  {
    question: 'Why should I visit your Valrico showroom?',
    answer: 'Our showroom allows homeowners to compare cabinet styles, countertop materials, colors, and finishes in person while receiving expert guidance from our team.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We serve homeowners throughout Tampa Bay, including Tampa, Valrico, Brandon, Riverview, Lithia, Apollo Beach, Wesley Chapel, and surrounding communities.',
  },
]

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
export function KitchenRemodelingPageClient() {
  const [flippedCard, setFlippedCard] = useState(null)

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. HERO — full viewport, kitchen background
             Mirrors the bathroom remodeling page hero layout & overlay
      ════════════════════════════════════════════════════════════════════ */}
      <section id="kitchen-hero" className="relative flex flex-col min-h-[90vh] md:min-h-screen overflow-hidden">

        {/* ── Background image — fully visible, no dark wash on right ── */}
        <div className="absolute inset-0">
          <Image
            src="/kitchen-remodeling-hero.webp"
            alt="Kitchen remodeling Tampa Bay"
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
                  Kitchen Remodeling Tampa
                </span>
                <span className="block text-gold text-2xl sm:text-[1.7rem] md:text-[2.5rem] lg:text-[2.8rem] mt-1.5 leading-[1.1]">
                  Custom Cabinetry &amp; Countertop Renovations
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
                Transform your kitchen with custom cabinetry, premium countertops, and professional
                remodeling solutions tailored to your style, needs, and budget.
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
                  Get a Free Estimate
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
          3. TRUSTED PARTNER — full-bleed background image | dark-left gradient
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-36 overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/cabinet-instock.webp"
            alt="Your trusted kitchen remodeling partner Tampa Bay"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Dark-left gradient: text lives on the dark side, image reveals on the right */}
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 container-custom max-w-7xl">
          <FadeIn delay={0.12} className="max-w-xl">

            {/* Frosted pill badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-white/85 text-xs font-semibold uppercase tracking-widest">Your Trusted Partner</span>
            </div>

            {/* Heading */}
            <h2 className={`text-4xl sm:text-5xl md:text-[3.25rem] font-extrabold text-white leading-tight mb-5 ${serif}`}>
              Kitchen Remodeling{' '}
              <span className="text-primary">in Tampa Bay</span>
            </h2>

            {/* Accent bar */}
            <div className="w-14 h-1 bg-primary rounded-full mb-7" />

            {/* Body */}
            <div className="space-y-4 text-white/80 text-base leading-relaxed mb-9">
              <p>
                A kitchen is more than just a place to cook. It&rsquo;s where families gather,
                meals are shared, and memories are made. Whether you&rsquo;re updating an
                outdated layout or planning a complete kitchen renovation, our team provides
                personalized solutions designed around your lifestyle, needs, and budget.
              </p>
              <p>
                We proudly serve homeowners across Tampa, Valrico, Brandon, Riverview, Lithia,
                Apollo Beach, Wesley Chapel, and surrounding communities with professional
                kitchen remodeling services that enhance both beauty and functionality.
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm h-12 px-8 rounded-lg transition-colors shadow-lg shadow-primary/30"
            >
              Visit Our Showroom
              <ArrowRight className="w-4 h-4" />
            </Link>

          </FadeIn>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. COMPREHENSIVE SERVICES — flip cards
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-12">
            <SectionLabel>Comprehensive Kitchen Remodeling Services</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 max-w-2xl mx-auto leading-tight ${serif}`}>
              Everything You Need for Your{' '}
              <span className="text-primary">Dream Kitchen</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(({ image, alt, title, paragraphs, href }, i) => (
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
                        {paragraphs[0]}
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
          5. KITCHEN DESIGN INSPIRATION — styles + gallery
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-warm-gray">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-8">
            <SectionLabel>Kitchen Design Inspiration</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 ${serif}`}>
              Find Your Kitchen Style
            </h2>
            <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
              Whether you prefer a modern open layout or a timeless traditional kitchen, exploring
              different design styles can help bring your vision to life.
            </p>
          </FadeIn>

          {/* Popular styles — pill tags */}
          <FadeIn delay={0.08}>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {KITCHEN_STYLES.map((style) => (
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
              {GALLERY.map(({ src, alt }, i) => (
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

          <FadeIn delay={0.2} className="text-center mt-8">
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
          6. PROCESS — 5 numbered steps with connector line
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-warm-gray">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-14">
            <SectionLabel>Our Kitchen Remodeling Process</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 ${serif}`}>
              How We Bring Your{' '}
              <span className="text-primary">Kitchen Vision to Life</span>
            </h2>
          </FadeIn>

          {/* Steps */}
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
          7. SERVICE AREAS + TESTIMONIALS — 2-col
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left — service areas + map */}
            <FadeIn>
              <SectionLabel>Our Service Area</SectionLabel>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5 ${serif}`}>
                Serving Homeowners Throughout{' '}
                <span className="text-primary">Tampa Bay</span>
              </h2>
              <div className="space-y-3 text-gray-600 text-base leading-relaxed mb-6">
                <p>
                  Cabinets &amp; Remodeling Depot proudly provides kitchen remodeling and kitchen
                  renovation services throughout Tampa Bay, including Tampa, Valrico, Brandon,
                  Riverview, Lithia, Apollo Beach, Plant City, Wesley Chapel, and nearby communities.
                </p>
                <p>
                  Whether you&rsquo;re searching for a trusted kitchen remodeling contractor in
                  Tampa or planning a kitchen renovation near Valrico, our team is ready to help
                  transform your space.
                </p>
              </div>

              {/* Area checklist — 2 columns */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-7 sm:gap-x-8">
                {SERVICE_AREAS.map((area) => (
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

              {/* Google Map */}
              <div className="relative w-full h-52 rounded-xl overflow-hidden shadow-md border border-gray-200">
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

            {/* Right — testimonials */}
            <FadeIn delay={0.12}>
              <SectionLabel>Client Reviews</SectionLabel>
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6 ${serif}`}>
                What Homeowners{' '}
                <span className="text-primary">Are Saying</span>
              </h2>

              <div className="space-y-4">
                {TESTIMONIALS.map(({ name, location, quote }, i) => (
                  <Card key={name} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5 flex flex-col gap-4">
                      {/* Stars + Quote icon */}
                      <div className="flex items-start justify-between">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star key={s} className="w-4 h-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <Quote className="w-5 h-5 text-primary/30 shrink-0" />
                      </div>
                      {/* Quote text */}
                      <p className="text-muted-foreground text-sm leading-relaxed italic grow">
                        &ldquo;{quote}&rdquo;
                      </p>
                      {/* Profile */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-primary font-bold text-sm">{name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{name}</p>
                          <p className="text-xs text-muted-foreground">{location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          8. FAQ — shared FAQSection (same design as homepage)
      ════════════════════════════════════════════════════════════════════ */}
      <FAQSection faqs={FAQS} title="Frequently Asked Questions" />

      {/* ════════════════════════════════════════════════════════════════════
          9. FINAL CTA — light overlay, gold accents
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-32 overflow-hidden">

        {/* Background photo — light cream overlay */}
        <div className="absolute inset-0">
          <Image
            src="/kitchen_cabinet_remodeling-01.webp"
            alt="Start your kitchen remodeling project Tampa Bay"
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
                Tampa Bay Kitchen Experts
              </p>
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-gold" />
            </div>

            {/* Heading */}
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-5 ${serif}`}>
              Start Your Kitchen Remodeling{' '}
              <span className="text-primary">Project Today</span>
            </h2>

            {/* Body */}
            <p className="text-gray-800 font-medium text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              If you&rsquo;re planning a kitchen remodel in Tampa or considering a complete kitchen
              renovation, Cabinets &amp; Remodeling Depot is here to help. Visit our Valrico
              showroom, explore quality products, and work with a team committed to delivering
              beautiful, functional results tailored to your home and lifestyle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/85 text-white font-bold uppercase tracking-widest text-sm h-14 px-9 rounded-lg transition-colors shadow-lg whitespace-nowrap"
              >
                Visit Our Showroom
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-sm h-14 px-9 rounded-lg transition-colors whitespace-nowrap"
              >
                Request a Free Estimate
              </Link>
            </div>

          </FadeIn>
        </div>

      </section>

    </>
  )
}
