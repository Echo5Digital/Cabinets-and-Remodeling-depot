'use client'

import { useState } from 'react'
import { usePageContent } from '@/hooks/usePageContent'
import { normalizeContent } from '@/lib/pageContent'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Star, Phone, MapPin, Layers,
  Wrench, Plus, Minus,
  Calendar, Tag, Settings2, LayoutGrid, CalendarDays, ShieldCheck,
  MessageSquare, Ruler, Scissors,
  Droplets, AlertCircle, Flame, Clock,
  ChevronLeft, ChevronRight, Globe,
  Home, Gem, Landmark, Sparkles, Mountain, Users, Eye,
} from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ConsultationForm } from '@/components/forms/ConsultationForm'
import { COMPANY_PHONE, COMPANY_ADDRESS } from '@/lib/constants'
import { JsonLd } from '@/components/common/JsonLd'

// ── Fade-in animation wrapper ──────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '', x = 0, y = 24 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Data ───────────────────────────────────────────────────────────────────────



const REVIEWS = [
  {
    name: 'Jennifer M.',
    location: 'Brandon, FL',
    initials: 'JM',
    rating: 5,
    time: '2 weeks ago',
    text: "The team did an amazing job on our kitchen countertops. The quartz they helped us select looks absolutely stunning. The install was quick and professional — couldn't be happier!",
  },
  {
    name: 'Robert T.',
    location: 'Riverview, FL',
    initials: 'RT',
    rating: 5,
    time: '1 month ago',
    text: 'We replaced old laminate with granite and the transformation is incredible. The showroom has so many options and the staff was very knowledgeable. Highly recommend!',
  },
  {
    name: 'Maria S.',
    location: 'Tampa, FL',
    initials: 'MS',
    rating: 5,
    time: '3 weeks ago',
    text: 'Professional from start to finish. The measurement was precise, fabrication was fast, and the installation team was courteous and tidy. My marble bathroom countertop is exactly what I envisioned.',
  },
  {
    name: 'David L.',
    location: 'Valrico, FL',
    initials: 'DL',
    rating: 5,
    time: '2 months ago',
    text: 'Outstanding experience. We visited the showroom and were able to compare quartz, granite, and quartzite side by side. They helped us choose the right material for our budget and lifestyle. The installation was flawless.',
  },
]

// ── Google icon SVG ────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

const DEFAULT_FAQS = [
  {
    question: 'How much do countertops cost in Tampa Bay?',
    answer:
      'Countertop pricing depends on the material, square footage, edge style, sink cutouts, and installation needs. Granite, quartz, porcelain, quartzite, and marble all have different price ranges. The best way to get accurate pricing is to visit the showroom or schedule a free estimate.',
  },
  {
    question: 'Is quartz better than granite?',
    answer:
      'Quartz is better if you want low maintenance and no sealing. Granite is better if you want natural stone, unique patterns, and stronger heat resistance. Both are excellent options for Tampa Bay kitchens.',
  },
  {
    question: 'How long does countertop installation take?',
    answer:
      'Many countertop projects are completed within 7–14 business days after final measurement and material selection. A standard installation can often be completed in one day, depending on project size and complexity.',
  },
  {
    question: 'Do you remove old countertops?',
    answer:
      'Yes, old countertop removal can be part of the installation process. Confirm this during your estimate so the team can include it in the project scope.',
  },
  {
    question: 'Do you install bathroom countertops too?',
    answer:
      'Yes. Cabinets & Remodeling Depot installs kitchen countertops, bathroom vanity tops, islands, laundry room countertops, and more.',
  },
  {
    question: 'What is the easiest countertop to maintain?',
    answer:
      'Quartz and porcelain are usually the easiest to maintain because they do not require sealing. They are strong choices for busy homes.',
  },
  {
    question: 'What countertop is best for outdoor kitchens in Tampa Bay?',
    answer:
      'Porcelain, granite, and quartzite are strong outdoor countertop options because they handle heat and sunlight better than quartz. Quartz is usually better for indoor use.',
  },
  {
    question: 'Do you offer free estimates?',
    answer:
      'Yes. Call (813) 651-2333 or visit the Valrico showroom to request a free countertop estimate.',
  },
]

// ── Main Component ────────────────────────────────────────────────────────────
const REVIEW_MAX_CHARS = 140

export function CountertopsPageClient() {
  // ── API-driven content with hardcoded fallbacks ─────────────────────────
  const { data: page } = usePageContent('countertops')
  const apiContent = page?.content ? normalizeContent(page.content) : null
  const heroSection = apiContent?.sections?.find((s) => s.type === 'hero')
  const faqSection  = apiContent?.sections?.find((s) => s.type === 'faq')

  const heroTitle    = heroSection?.title    || 'Countertops Tampa Bay Homeowners Love'
  const heroSubtitle = heroSection?.subtitle || null
  const faqs         = DEFAULT_FAQS
  const schemaJson   = page?.content?.schema || null
  // ────────────────────────────────────────────────────────────────────────

  const [openFaq, setOpenFaq] = useState(0)
  const [reviewIdx, setReviewIdx] = useState(0)
  const [reviewExpanded, setReviewExpanded] = useState(false)
  const [activeRow, setActiveRow] = useState('Quartz')

  const goToReview = (i) => { setReviewIdx(i); setReviewExpanded(false) }
  const prevReview = () => goToReview(reviewIdx === 0 ? REVIEWS.length - 1 : reviewIdx - 1)
  const nextReview = () => goToReview(reviewIdx === REVIEWS.length - 1 ? 0 : reviewIdx + 1)

  return (
    <>
      <JsonLd schema={schemaJson} />
      {/* ═══════════════════════════════════════════════════════════════════
          HERO — full-width background with content overlay
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex flex-col min-h-[90vh] md:min-h-screen overflow-hidden">

        {/* ── Background: real countertop photo ── */}
        <div className="absolute inset-0">
          <Image
            src="/countertop_bg.webp"
            alt="Countertop background"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Directional dark overlay: enough contrast for text, lets photo show right */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.62) 40%, rgba(0,0,0,0.38) 65%, rgba(0,0,0,0.15) 100%)',
            }}
          />
        </div>

        {/* ── Main content ─────────────────────────────────────────────── */}
        <div className="relative z-10 flex-1 flex items-center py-24 md:py-28 lg:py-32">
          <div className="container-custom w-full">
            <div className="max-w-xl lg:max-w-2xl">

              {/* Label */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xs uppercase tracking-[0.18em] font-semibold text-white/60 mb-4"
              >
                Countertop Remodeling
              </motion.p>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="text-[2rem] sm:text-[2.6rem] lg:text-[3.2rem] font-extrabold leading-[1.13] mb-5"
              >
                <span className="block" style={{ color: '#c9334e' }}>
                  {heroTitle}
                </span>
                {heroSubtitle && (
                  <span className="block text-white font-normal mt-1">
                    {heroSubtitle}
                  </span>
                )}
              </motion.h1>

              {/* Description card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.22 }}
                className="rounded-xl p-4 sm:p-5 mb-7 space-y-2.5"
                style={{ background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(4px)' }}
              >
                <p className="text-white/90 text-sm sm:text-[0.95rem] leading-relaxed">
                  Looking for beautiful, durable countertops in Tampa Bay without paying inflated
                  showroom prices?
                </p>
                <p className="text-white/80 text-sm sm:text-[0.95rem] leading-relaxed">
                  Cabinets &amp; Remodeling Depot helps homeowners upgrade kitchens, bathrooms,
                  islands, vanities, and outdoor spaces with custom-fabricated countertops at
                  wholesale-friendly pricing.
                </p>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                  Serving Tampa, Brandon, Riverview, Valrico, Lithia, FishHawk, Bloomingdale,
                  South Tampa, Westchase, Carrollwood, Temple Terrace, Wesley Chapel, Lutz, and
                  nearby communities from our Valrico showroom.
                </p>
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 font-bold text-sm tracking-wide px-7 h-12 uppercase"
                >
                  <Link href="/contact">
                    <Calendar className="mr-2 h-4 w-4" />
                    Get Free Estimate
                  </Link>
                </Button>
                <a
                  href={`tel:${COMPANY_PHONE}`}
                  className="flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white rounded-md px-7 h-12 text-sm font-bold uppercase tracking-wide hover:bg-white/20 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Call {COMPANY_PHONE}
                </a>
              </motion.div>

              {/* ── 4 Trust badges — right under the CTA buttons ─────────── */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.48 }}
                className="mt-7 pt-6 border-t border-white/15"
              >
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-3 lg:gap-x-0">
                  {[
                    { Icon: Tag,       title: 'Wholesale Pricing',        sub: 'Direct Importing'         },
                    { Icon: Settings2, title: 'Custom Fabrication',       sub: 'In-House'                 },
                    { Icon: Wrench,    title: 'Professional Installation', sub: 'Local Experts'            },
                    { Icon: MapPin,    title: 'Serving Tampa Bay',         sub: 'From Our Valrico Showroom'},
                  ].map(({ Icon, title, sub }, i, arr) => (
                    <div
                      key={title}
                      className={`flex items-center gap-3 lg:px-4 ${
                        i === 0 ? 'lg:pl-0' : ''
                      } ${
                        i === arr.length - 1 ? 'lg:pr-0' : 'lg:border-r lg:border-white/20'
                      }`}
                    >
                      {/* Icon box */}
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      {/* Text */}
                      <div className="min-w-0">
                        <p className="text-white font-bold text-xs sm:text-sm leading-snug">{title}</p>
                        <p className="text-white/50 text-[0.65rem] sm:text-xs leading-tight mt-0.5">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>

      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          5-CARD FLOATING STRIP
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-20 -mt-10 sm:-mt-14 px-4 sm:px-6 lg:px-8 pb-0">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* gap-px + bg-gray-100 parent = 1px hairline dividers between all cells */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-gray-100">
              {[
                {
                  Icon: LayoutGrid,
                  title: 'Premium Materials',
                  desc: 'Quartz, Granite, Quartzite, Marble & Porcelain',
                },
                {
                  Icon: MapPin,
                  title: 'Serving Tampa Bay',
                  desc: 'Tampa, Brandon, Riverview, Valrico, Lithia, FishHawk & More',
                },
                {
                  Icon: CalendarDays,
                  title: 'Fast Turnaround',
                  desc: 'Most projects completed in 7–14 business days',
                },
                {
                  Icon: Tag,
                  title: 'Free Estimates',
                  desc: 'Visit our showroom or call (813) 651-2333',
                },
                {
                  Icon: ShieldCheck,
                  title: 'Local & Trusted',
                  desc: 'Family-owned. Quality you can count on',
                },
              ].map(({ Icon, title, desc }, i, arr) => (
                <div
                  key={title}
                  className={`bg-white flex flex-col items-center text-center px-5 sm:px-6 py-8 sm:py-9 lg:py-11 hover:bg-primary/[0.03] transition-colors ${
                    i === arr.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                >
                  {/* Icon container */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 flex-shrink-0">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  {/* Title */}
                  <h3 className="font-bold text-gray-900 text-[0.95rem] sm:text-base lg:text-[1.05rem] leading-snug mb-2">
                    {title}
                  </h3>
                  {/* Description */}
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          COUNTERTOP MATERIALS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          {/* ── Heading ─────────────────────────────────────────────────── */}
          <FadeIn className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              Beautiful Countertops Without the{' '}
              <br className="hidden md:block" />
              Overpriced Retail Markup
            </h2>
          </FadeIn>

          {/* ── Description paragraphs ──────────────────────────────────── */}
          <FadeIn
            delay={0.1}
            className="max-w-4xl mx-auto mb-12 md:mb-14 space-y-4 text-gray-700 text-base sm:text-[1.05rem] leading-relaxed"
          >
            <p>
              Your countertops are one of the first things people notice in your kitchen or
              bathroom. They also take daily abuse from hot pans, water, coffee, spills, kids,
              guests, and everyday cooking. That is why choosing the right material matters.
            </p>
            <p>
              At Cabinets &amp; Remodeling Depot, we help Tampa Bay homeowners choose countertops
              that fit the way they actually live. Some families want low-maintenance{' '}
              <strong className="text-gray-900 font-semibold">quartz</strong>. Some want the
              natural beauty of{' '}
              <strong className="text-gray-900 font-semibold">granite</strong>. Others want the
              luxury look of{' '}
              <strong className="text-gray-900 font-semibold">marble</strong>, the strength of{' '}
              <strong className="text-gray-900 font-semibold">quartzite</strong>, or the sleek
              modern style of{' '}
              <strong className="text-gray-900 font-semibold">porcelain</strong>.
            </p>
            <p>
              Our difference is simple: we import materials directly, offer strong pricing, and
              provide professional fabrication and installation. You can visit our{' '}
              <strong className="text-gray-900 font-semibold">Valrico showroom</strong>, compare
              materials in person, and work with a team that understands{' '}
              <strong className="text-gray-900 font-semibold">
                kitchens, bathrooms, cabinets, flooring, and full remodeling projects
              </strong>
              .
            </p>
          </FadeIn>

          {/* ── 5 Material cards ────────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {[
              {
                name: 'Quartz',
                src: '/quartz.webp',
                href: '/contact',
                desc: 'Low maintenance, non-porous, and available in dozens of colors and finishes.',
              },
              {
                name: 'Granite',
                src: '/granite.webp',
                href: '/contact',
                desc: 'Natural stone with unique veining patterns and exceptional long-term durability.',
              },
              {
                name: 'Quartzite',
                src: '/quartzite.webp',
                href: '/contact',
                desc: 'Marble-like beauty with incredible strength and natural heat resistance.',
              },
              {
                name: 'Marble',
                src: '/marble.webp',
                href: '/contact',
                desc: 'Timeless elegance that adds luxury and sophistication to any kitchen or bath.',
              },
              {
                name: 'Porcelain',
                src: '/porcelain.webp',
                href: '/contact',
                desc: 'Sleek, ultra-durable, and perfect for modern indoor and outdoor applications.',
              },
            ].map(({ name, src, desc, href }, i, arr) => (
              <FadeIn
                key={name}
                delay={i * 0.08}
                className={i === arr.length - 1 ? 'col-span-2 sm:col-span-1' : ''}
              >
                <Link href={href} className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden h-full flex flex-col group">

                  {/* Photo */}
                  <div className="aspect-[4/3] relative overflow-hidden flex-shrink-0">
                    <Image
                      src={src}
                      alt={`${name} countertop`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  </div>

                  {/* Card text */}
                  <div className="p-3 sm:p-4 text-center flex-1 flex flex-col justify-start">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-[0.95rem] mb-1.5">
                      {name} Countertops
                    </h3>
                    <p className="text-muted-foreground text-[0.7rem] sm:text-xs leading-relaxed">
                      {desc}
                    </p>
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

          {/* ── CTA ─────────────────────────────────────────────────────── */}
          <FadeIn className="text-center mt-10">
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold px-8">
              <Link href="/contact">Visit Our Valrico Showroom</Link>
            </Button>
          </FadeIn>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BEST COUNTERTOPS FOR TAMPA BAY HOMES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden">

        {/* Background image */}
        <Image
          src="/kitchen_countertops_marble.webp"
          alt="Kitchen with marble countertops in Tampa Bay home"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Overlay — heavier on left where text sits, fades right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.93) 45%, rgba(255,255,255,0.70) 70%, rgba(255,255,255,0.30) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 container-custom">
          <div className="max-w-xl lg:max-w-2xl">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-tight mb-8">
                <span className="text-primary">Best Countertops</span>{' '}
                <span className="text-gray-900">for Tampa Bay Homes</span>
              </h2>

              <ul className="space-y-5">
                {[
                  'Tampa Bay homes need countertops that can handle more than just daily cooking. Heat, humidity, sunlight, outdoor kitchens, and busy family lifestyles all matter.',
                  'For indoor kitchens, quartz and granite are both excellent choices. Quartz is easier to maintain, while granite gives you natural character and better heat resistance.',
                  'For outdoor kitchens in Tampa Bay, porcelain, granite, and quartzite are usually better choices than quartz because prolonged UV exposure can affect quartz over time.',
                  'For bathrooms, quartz, marble, and porcelain are all strong choices depending on the look and maintenance level you want.',
                  'For resale value, quartz, granite, and quartzite are all strong options because buyers recognize them as premium surfaces.',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex-shrink-0 mt-0.5 text-primary font-bold text-base leading-snug">{'>>'}</span>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          MATERIAL COMPARISON TABLE — modern, interactive, mobile-responsive
      ═══════════════════════════════════════════════════════════════════ */}
      {(() => {
        const MATERIALS = [
          {
            material: 'Quartz',    src: '/quartz.webp',    href: '/contact',
            badge: { label: 'POPULAR',    icon: Star,        cls: 'bg-blue-50 text-blue-600 border-blue-200'     },
            bestForIcon: Home,     bestFor: 'Busy kitchens, families, bathrooms',
            maintenance: 'Very low',        mScore: 1,
            lookIcon: Sparkles,    look: 'Modern, consistent, marble-look options',
            heat: 'Moderate',               hScore: 2,
          },
          {
            material: 'Granite',   src: '/granite.webp',   href: '/contact',
            badge: null,
            bestForIcon: Tag,      bestFor: 'Natural kitchens, resale value, traditional style',
            maintenance: 'Low to moderate', mScore: 2,
            lookIcon: Mountain,    look: 'Unique natural stone',
            heat: 'High',                   hScore: 3,
          },
          {
            material: 'Quartzite', src: '/quartzite.webp', href: '/contact',
            badge: { label: 'LUXURY',     icon: Gem,         cls: 'bg-purple-50 text-purple-600 border-purple-200' },
            bestForIcon: Globe,    bestFor: 'Luxury kitchens, islands, outdoor spaces',
            maintenance: 'Moderate',        mScore: 3,
            lookIcon: Gem,         look: 'Marble-like natural stone',
            heat: 'High',                   hScore: 3,
          },
          {
            material: 'Marble',    src: '/marble.webp',    href: '/contact',
            badge: { label: 'LUXURY',     icon: Gem,         cls: 'bg-purple-50 text-purple-600 border-purple-200' },
            bestForIcon: Droplets, bestFor: 'Luxury bathrooms, statement islands, baking areas',
            maintenance: 'High',            mScore: 4,
            lookIcon: Landmark,    look: 'Classic, elegant, soft veining',
            heat: 'Moderate',               hScore: 2,
          },
          {
            material: 'Porcelain', src: '/porcelain.webp', href: '/contact',
            badge: { label: 'BEST VALUE', icon: ShieldCheck, cls: 'bg-green-50 text-green-600 border-green-200'   },
            bestForIcon: Flame,    bestFor: 'Outdoor kitchens, modern spaces, low maintenance',
            maintenance: 'Very low',        mScore: 1,
            lookIcon: LayoutGrid,  look: 'Sleek, versatile, large-format',
            heat: 'Very high',              hScore: 4,
          },
        ]

        const mDotColor  = (s) => s <= 1 ? 'bg-green-500' : s === 2 ? 'bg-lime-500' : s === 3 ? 'bg-amber-400' : 'bg-orange-500'
        const mTextColor = (s) => s <= 1 ? 'text-green-600' : s === 2 ? 'text-lime-600' : s === 3 ? 'text-amber-500' : 'text-orange-500'

        const TABLE_HEADERS = [
          { label: 'Material',        icon: Layers   },
          { label: 'Best For',        icon: Users    },
          { label: 'Maintenance',     icon: Droplets },
          { label: 'Look',            icon: Eye      },
          { label: 'Heat Resistance', icon: Flame    },
          { label: 'Explore',         icon: null     },
        ]

        return (
          <section className="section-padding bg-white">
            <div className="container-custom">
              <FadeIn className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight">
                  Which Countertop Material Is Right for You?
                </h2>
              </FadeIn>

              {/* ── Desktop table (md+) ──────────────────────────────────── */}
              <FadeIn delay={0.1} className="hidden md:block">
                <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-900 border-b border-gray-800">
                        {TABLE_HEADERS.map(({ label, icon: Icon }) => (
                          <th key={label} className="px-4 py-4 text-left">
                            <div className="flex items-center gap-1.5">
                              {Icon && <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white whitespace-nowrap">
                                {label}
                              </span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {MATERIALS.map((row, i, arr) => {
                        const isActive = activeRow === row.material
                        const BestForIcon = row.bestForIcon
                        const LookIcon = row.lookIcon
                        return (
                          <tr
                            key={row.material}
                            onClick={() => setActiveRow(isActive ? null : row.material)}
                            style={isActive ? { boxShadow: 'inset 0 0 0 2px hsl(346 81% 28% / 0.3)' } : {}}
                            className={[
                              'cursor-pointer transition-all duration-200',
                              i !== arr.length - 1 ? 'border-b border-gray-100' : '',
                              isActive ? 'bg-primary/[0.03]' : 'hover:bg-gray-50',
                            ].join(' ')}
                          >
                            {/* Material — image + badge + name */}
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3 min-w-[165px]">
                                <div className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden ring-2 ring-gray-100">
                                  <Image
                                    src={row.src}
                                    alt={`${row.material} countertop`}
                                    fill
                                    className="object-cover"
                                    sizes="64px"
                                  />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  <span className={`font-bold text-sm leading-none transition-colors ${isActive ? 'text-primary' : 'text-gray-800'}`}>
                                    {row.material}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Best For */}
                            <td className="px-4 py-4">
                              <div className="flex items-start gap-2 max-w-[185px]">
                                <BestForIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-600 text-xs leading-snug">{row.bestFor}</span>
                              </div>
                            </td>

                            {/* Maintenance — dot indicators */}
                            <td className="px-4 py-4">
                              <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: 5 }).map((_, j) => (
                                    <span
                                      key={j}
                                      className={`w-2.5 h-2.5 rounded-full transition-colors ${j < row.mScore ? 'bg-primary' : 'bg-gray-200'}`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs font-semibold text-primary">
                                  {row.maintenance}
                                </span>
                              </div>
                            </td>

                            {/* Look */}
                            <td className="px-4 py-4">
                              <div className="flex items-start gap-2 max-w-[175px]">
                                <LookIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-600 text-xs leading-snug">{row.look}</span>
                              </div>
                            </td>

                            {/* Heat Resistance — flame icons */}
                            <td className="px-4 py-4">
                              <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-0.5">
                                  {Array.from({ length: 4 }).map((_, j) => (
                                    <Flame
                                      key={j}
                                      className={`w-4 h-4 ${j < row.hScore ? 'text-primary' : 'text-gray-200'}`}
                                      fill={j < row.hScore ? 'currentColor' : 'none'}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs font-semibold text-primary">{row.heat}</span>
                              </div>
                            </td>

                            {/* Explore */}
                            <td className="px-4 py-4">
                              <Link
                                href={row.href}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-900 text-white hover:bg-primary transition-colors duration-200"
                                aria-label={`Explore ${row.material} countertops`}
                              >
                                <ChevronRight className="w-4 h-4" />
                              </Link>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>

                  {/* Footer note */}
                  <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 text-center">
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      Still not sure? Visit our Valrico showroom and compare side by side before making a decision.
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* ── Mobile cards (<md) ────────────────────────────────────── */}
              <div className="md:hidden space-y-4">
                {MATERIALS.map((row, i) => {
                  const isActive = activeRow === row.material
                  const BestForIcon = row.bestForIcon
                  const LookIcon = row.lookIcon
                  return (
                    <FadeIn key={row.material} delay={i * 0.07}>
                      <div
                        onClick={() => setActiveRow(isActive ? null : row.material)}
                        className={[
                          'rounded-2xl border overflow-hidden shadow-sm cursor-pointer transition-all duration-200',
                          isActive ? 'border-primary/40 ring-2 ring-primary/20' : 'border-gray-200 hover:border-gray-300 hover:shadow-md',
                        ].join(' ')}
                      >
                        {/* Image with badge + name + explore button overlay */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                          <Image
                            src={row.src}
                            alt={`${row.material} countertop`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                          <div className="absolute bottom-3 left-4 right-3 flex items-end justify-between gap-2">
                            <div className="flex flex-col gap-1.5">
                              <span className="text-white font-bold text-lg drop-shadow leading-tight">{row.material}</span>
                            </div>
                            <Link
                              href={row.href}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-900/80 text-white hover:bg-primary transition-colors duration-200 flex-shrink-0"
                              aria-label={`Explore ${row.material} countertops`}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>

                        {/* Properties */}
                        <div className="p-4 space-y-3 bg-white">
                          <div className="flex items-start gap-2">
                            <BestForIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="text-[0.62rem] font-bold uppercase tracking-widest text-gray-400 block mb-0.5">Best For</span>
                              <span className="text-gray-700 text-sm leading-snug">{row.bestFor}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Droplets className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-[0.62rem] font-bold uppercase tracking-widest text-gray-400">Maintenance</span>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, j) => (
                                <span key={j} className={`w-2 h-2 rounded-full ${j < row.mScore ? 'bg-primary' : 'bg-gray-200'}`} />
                              ))}
                            </div>
                            <span className="text-xs font-semibold text-primary">{row.maintenance}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <LookIcon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="text-[0.62rem] font-bold uppercase tracking-widest text-gray-400 block mb-0.5">Look</span>
                              <span className="text-gray-700 text-sm leading-snug">{row.look}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Flame className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-[0.62rem] font-bold uppercase tracking-widest text-gray-400">Heat Resist.</span>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 4 }).map((_, j) => (
                                <Flame key={j} className={`w-3.5 h-3.5 ${j < row.hScore ? 'text-primary' : 'text-gray-200'}`} fill={j < row.hScore ? 'currentColor' : 'none'} />
                              ))}
                            </div>
                            <span className="text-xs font-semibold text-primary">{row.heat}</span>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  )
                })}

                <p className="text-center text-muted-foreground text-xs sm:text-sm pt-2">
                  Still not sure? Visit our Valrico showroom and compare side by side before making a decision.
                </p>
              </div>

            </div>
          </section>
        )
      })()}

      {/* ═══════════════════════════════════════════════════════════════════
          WHY CHOOSE CABINETS & REMODELING DEPOT
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden">

        {/* Background image at 50% opacity */}
        <div className="absolute inset-0">
          <Image
            src="/cntrtop_img.jpg"
            alt="Countertop background"
            fill
            className="object-cover object-center"
            sizes="100vw"
            style={{ opacity: 0.5 }}
          />
          {/* Dark scrim to keep text readable */}
          <div className="absolute inset-0 bg-gray-900/55" />
        </div>

        <div className="relative z-10 container-custom">

          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-tight text-white">
              Why Choose{' '}
              <span className="text-primary" style={{ color: '#e05a72' }}>Cabinets &amp; Remodeling Depot?</span>
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {[
              {
                Icon: Tag,
                title: 'Wholesale Pricing Through Direct Importing',
                body: 'Many countertop retailers buy through multiple distributors before materials reach the customer. Each step adds cost. Cabinets & Remodeling Depot works to reduce that markup by sourcing materials directly and passing savings to homeowners.',
              },
              {
                Icon: MapPin,
                title: 'A Real Local Showroom',
                body: 'Pictures online help, but countertops need to be seen in person. At our Valrico showroom, you can compare colors, patterns, edge profiles, and materials before making a final decision.',
              },
              {
                Icon: Settings2,
                title: 'Custom Fabrication',
                body: 'Your countertop is measured, cut, edged, and finished for your specific kitchen or bathroom. We do not believe in one-size-fits-all countertop work.',
              },
              {
                Icon: Layers,
                title: 'One-Stop Kitchen and Bathroom Remodeling',
                body: 'Countertops often connect with cabinets, backsplash, flooring, sinks, and full remodeling work. We can help coordinate the entire project instead of making you manage multiple contractors.',
              },
              {
                Icon: Wrench,
                title: 'Professional Installation',
                body: 'Good countertops can look bad if they are installed poorly. Proper measurement, leveling, seam placement, sink cutouts, and finishing matter. Our team focuses on doing the work correctly from start to finish.',
              },
            ].map(({ Icon, title, body }, i, arr) => (
              <FadeIn
                key={title}
                delay={i * 0.1}
                x={i === arr.length - 1 ? 0 : i % 2 === 0 ? -60 : 60}
                y={i === arr.length - 1 ? 40 : 0}
                className={i === arr.length - 1 ? 'sm:col-span-2 sm:max-w-xl sm:mx-auto w-full' : ''}
              >
                <div
                  className="rounded-2xl p-6 sm:p-7 border border-white/15 hover:border-white/30 transition-all h-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base sm:text-lg mb-2 leading-snug">
                        {title}
                      </h3>
                      <p className="text-white/75 text-sm sm:text-base leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4-STEP PROCESS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          {/* Heading */}
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight mb-4">
              Our Simple <span className="text-primary">4-Step Process</span>
            </h2>
            {/* Decorative underline */}
            <div className="flex items-center justify-center gap-2">
              <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
              <div className="h-1 w-8 bg-primary rounded-full" />
              <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
            </div>
          </FadeIn>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative">
            {/* Connecting line — desktop only */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-primary/20 z-0" />

            {[
              {
                num: '1',
                Icon: MessageSquare,
                title: 'Consultation & Material Selection',
                desc: 'Call us or visit our Valrico showroom. We help you compare quartz, granite, quartzite, marble, and porcelain based on your style, budget, and daily use.',
              },
              {
                num: '2',
                Icon: Ruler,
                title: 'Measurement',
                desc: 'Once your layout is ready, we measure your kitchen, bathroom, island, or vanity area. This includes sink cutouts, cooktop openings, edges, seams, and overhangs.',
              },
              {
                num: '3',
                Icon: Scissors,
                title: 'Fabrication',
                desc: 'Your selected material is cut and finished to match the exact measurements of your space.',
              },
              {
                num: '4',
                Icon: Wrench,
                title: 'Installation',
                desc: 'Our installation team installs the countertops, checks the fit, secures the surface, finishes seams, and cleans the area.',
              },
            ].map(({ num, Icon, title, desc }, i) => (
              <FadeIn key={num} delay={i * 0.12} className="relative z-10">
                <div className="flex flex-col items-center text-center">
                  {/* Number circle */}
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-5 shadow-md ring-4 ring-white">
                    <span className="text-white font-extrabold text-xl leading-none">{num}</span>
                  </div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  {/* Title */}
                  <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs sm:text-sm mb-3 leading-snug">
                    {title}
                  </h3>
                  {/* Description */}
                  <p className="text-[#4a7fa5] text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Footer note */}
          <FadeIn delay={0.5} className="text-center mt-12">
            <p className="text-gray-600 text-sm sm:text-base">
              Ready to start? Call{' '}
              <a href="tel:+18136512333" className="text-primary font-bold hover:underline">
                (813) 651-2333
              </a>{' '}
              or{' '}
              <Link href="/contact" className="text-primary font-bold hover:underline">
                request a free countertop estimate
              </Link>
              .
            </p>
          </FadeIn>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          COUNTERTOP INSTALLATION ACROSS TAMPA BAY
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#F8F3ED]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 md:items-stretch">

            {/* Left: heading + paragraphs + pills + note */}
            <FadeIn className="flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-5">
                <span className="text-primary">Countertop Installation</span>{' '}
                <span className="text-gray-900">Across Tampa Bay</span>
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-2">
                Cabinets &amp; Remodeling Depot serves Tampa Bay from our showroom in Valrico, Florida.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
                We regularly help homeowners in:
              </p>

              {/* City pills — 4 per row on sm+, 2 on mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2.5 mb-7">
                {[
                  'Tampa', 'South Tampa', 'Brandon', 'Riverview',
                  'Valrico', 'Lithia', 'FishHawk', 'Bloomingdale',
                  'Carrollwood', 'Westchase', 'Temple Terrace', 'Wesley Chapel',
                  'Lutz',
                ].map((city) => (
                  <span
                    key={city}
                    className="flex items-center gap-1.5 bg-primary/5 border border-primary/15 text-primary font-medium text-xs sm:text-sm px-3 py-2 rounded-full hover:bg-primary/10 transition-colors whitespace-nowrap"
                  >
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    {city}
                  </span>
                ))}
              </div>

              <p className="text-gray-500 text-sm">
                If you are not sure whether we serve your area, call{' '}
                <a href="tel:+18136512333" className="text-primary font-bold hover:underline">
                  (813) 651-2333
                </a>{' '}
                and we will confirm.
              </p>
            </FadeIn>

            {/* Right: Google Map — stretches to match left column height */}
            <FadeIn delay={0.2} className="min-h-[340px] sm:min-h-[400px]">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 w-full h-full min-h-[340px] sm:min-h-[400px]">
                <iframe
                  src="https://maps.google.com/maps?cid=18201794426186346316&output=embed&hl=en-US"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
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

      {/* ═══════════════════════════════════════════════════════════════════
          COUNTERTOP CARE TIPS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">

          <FadeIn className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight">
              How to Keep Your Countertops{' '}
              <span className="text-primary">Looking New</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                Icon: Droplets,
                title: 'Daily Cleaning',
                body: 'Use warm water, mild dish soap, and a soft cloth for everyday cleaning. Dry the surface to avoid water spots, especially on darker stone.',
              },
              {
                Icon: AlertCircle,
                title: 'Avoid Harsh Chemicals',
                body: 'Avoid bleach, ammonia, vinegar, lemon juice, and abrasive scrubbers — especially on natural stone like granite, marble, and quartzite.',
              },
              {
                Icon: Scissors,
                title: 'Use Cutting Boards',
                body: 'Even strong countertops can be damaged by repeated knife use. Cutting boards protect both your countertops and your knives.',
              },
              {
                Icon: Flame,
                title: 'Use Trivets for Hot Pans',
                body: 'Quartz can be damaged by direct high heat. Granite, quartzite, and porcelain handle heat better, but trivets are still recommended.',
              },
              {
                Icon: ShieldCheck,
                title: 'Seal Natural Stone',
                body: 'Granite, quartzite, and marble should be sealed when recommended. Quartz and porcelain do not need sealing.',
              },
              {
                Icon: Clock,
                title: 'Clean Spills Quickly',
                body: 'Wine, coffee, oil, citrus, and dark liquids should be wiped up quickly — especially on marble and natural stone.',
              },
            ].map(({ Icon, title, body }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-4 flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  {/* Title */}
                  <h3 className="font-bold text-gray-900 text-base sm:text-[1.05rem] mb-2 leading-snug">
                    {title}
                  </h3>
                  {/* Body */}
                  <p className="text-[#4a7fa5] text-sm sm:text-base leading-relaxed flex-1">
                    {body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS — carousel style (matches home page)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ── Left: blueprint bg + technician photo ── */}
            <FadeIn x={-30} y={0} className="relative rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[460px] md:min-h-[500px]">
              {/* Blueprint / pattern background */}
              <Image
                src="/img_01bg.jpeg"
                alt=""
                fill
                aria-hidden="true"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Technician photo */}
              <div className="absolute inset-0">
                <Image
                  src="/Testimonials_sec-1.webp"
                  alt="Professional countertop installation expert"
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

            {/* ── Right: heading + review carousel ── */}
            <FadeIn x={30} y={0} delay={0.15}>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="text-gray-900">What Tampa Homeowners </span>
                <span className="text-primary">Are Saying</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Real reviews from homeowners who upgraded their kitchens and bathrooms with us.
              </p>

              {/* Review card */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-7 min-h-[190px]">
                <AnimatePresence mode="wait">
                  {(() => {
                    const review = REVIEWS[reviewIdx]
                    const isLong = review.text.length > REVIEW_MAX_CHARS
                    const displayText =
                      isLong && !reviewExpanded
                        ? review.text.slice(0, REVIEW_MAX_CHARS) + '…'
                        : review.text
                    return (
                      <motion.div
                        key={reviewIdx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Stars + Google logo */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex gap-0.5">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <GoogleIcon />
                        </div>

                        {/* Review text */}
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-5">
                          &ldquo;{displayText}&rdquo;
                          {isLong && (
                            <button
                              onClick={() => setReviewExpanded(!reviewExpanded)}
                              className="ml-1 text-primary font-medium text-sm hover:underline focus:outline-none"
                            >
                              {reviewExpanded ? 'Show less' : 'Read more'}
                            </button>
                          )}
                        </p>

                        {/* Reviewer info */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {review.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                            <p className="text-xs text-muted-foreground">{review.time}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })()}
                </AnimatePresence>
              </div>

              {/* Navigation: prev | dots | next */}
              <div className="flex items-center gap-4 mt-5">
                <button
                  onClick={prevReview}
                  aria-label="Previous review"
                  className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center shrink-0"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2 items-center">
                  {REVIEWS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToReview(i)}
                      aria-label={`Go to review ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        i === reviewIdx
                          ? 'w-6 h-2.5 bg-primary'
                          : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextReview}
                  aria-label="Next review"
                  className="w-10 h-10 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center shrink-0"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked{' '}
              <span className="text-primary">Questions</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Have questions about countertop installation in Tampa? We&apos;ve got answers.
            </p>
          </FadeIn>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <FadeIn key={i} delay={i * 0.04}>
                  <div
                    className={`border rounded-xl overflow-hidden bg-white transition-shadow ${
                      isOpen ? 'border-primary/30 shadow-sm' : 'border-gray-200'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="w-full flex items-center gap-4 px-4 sm:px-5 py-4 text-left cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          isOpen ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </span>
                      <span
                        className={`font-semibold text-sm sm:text-base leading-snug ${
                          isOpen ? 'text-primary' : 'text-gray-800'
                        }`}
                      >
                        {faq.question}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-5 pb-5 pl-4 sm:pl-16 text-muted-foreground leading-relaxed text-sm sm:text-base">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA + FORM
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#F8F3ED]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* ── Left: heading + contact info rows ── */}
            <FadeIn x={-30} y={0}>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-tight mb-5">
                Get Your{' '}
                <span className="text-primary">Free Countertop Estimate</span>{' '}
                Today
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-2">
                If you are planning a kitchen upgrade, bathroom renovation, new island, vanity
                countertop, or full remodel, Cabinets &amp; Remodeling Depot can help you choose
                the right material and get the project done correctly.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                Visit our Valrico showroom to compare quartz, granite, quartzite, marble, and
                porcelain in person — or call us to schedule a free estimate.
              </p>

              {/* Contact rows */}
              <div className="space-y-0 divide-y divide-gray-200 border-t border-b border-gray-200">

                {/* Call Us */}
                <div className="flex items-center gap-4 py-5">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-gray-400 mb-0.5">
                      Call Us
                    </p>
                    <a
                      href={`tel:${COMPANY_PHONE}`}
                      className="text-primary font-bold text-base sm:text-lg hover:underline"
                    >
                      {COMPANY_PHONE}
                    </a>
                  </div>
                </div>

                {/* Visit Our Showroom */}
                <div className="flex items-center gap-4 py-5">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-gray-400 mb-0.5">
                      Visit Our Showroom
                    </p>
                    <p className="text-gray-800 font-medium text-sm sm:text-base leading-snug">
                      {COMPANY_ADDRESS}
                    </p>
                  </div>
                </div>

                {/* Service Area */}
                <div className="flex items-start gap-4 py-5">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-gray-400 mb-1">
                      Service Area
                    </p>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      Tampa, Brandon, Riverview, Valrico, Lithia, FishHawk, Plant City, Wesley
                      Chapel, Lutz, Carrollwood, Temple Terrace, South Tampa, Westchase &amp; more.
                    </p>
                  </div>
                </div>

              </div>
            </FadeIn>

            {/* ── Right: form card ── */}
            <FadeIn delay={0.2} x={30} y={0}>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  Book Free Consultation
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Fill out the form and we&apos;ll contact you within 1 business day.
                </p>
                <ConsultationForm serviceName="Countertops" />
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

    </>
  )
}
