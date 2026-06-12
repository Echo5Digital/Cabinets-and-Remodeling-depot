'use client'

import { useState } from 'react'
import { usePageContent } from '@/hooks/usePageContent'
import { normalizeContent } from '@/lib/pageContent'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Star, Phone, MapPin,
  Wrench, Plus, Minus,
  Calendar, Tag, Settings2, LayoutGrid, CalendarDays, ShieldCheck,
  MessageSquare, Ruler,
  Droplets, AlertCircle, Flame, Clock,
  ChevronLeft, ChevronRight, Globe,
  Layers, PaintBucket, Home, ChefHat,
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
    text: "Complete kitchen transformation — new cabinets, countertops, and flooring. The team was professional, worked efficiently, and the end result is absolutely stunning. Couldn't be happier with the outcome!",
  },
  {
    name: 'Robert T.',
    location: 'Riverview, FL',
    initials: 'RT',
    rating: 5,
    time: '1 month ago',
    text: 'We completely remodeled our outdated kitchen and the difference is night and day. The team helped us plan every step, from cabinet selection to countertop and flooring choices. Highly recommend!',
  },
  {
    name: 'Maria S.',
    location: 'Tampa, FL',
    initials: 'MS',
    rating: 5,
    time: '3 weeks ago',
    text: 'Professional from start to finish. The kitchen remodel was completed on schedule and the quality of work exceeded our expectations. The new layout makes the space so much more functional.',
  },
  {
    name: 'David L.',
    location: 'Valrico, FL',
    initials: 'DL',
    rating: 5,
    time: '2 months ago',
    text: 'Outstanding experience. We worked with the team to plan a complete kitchen remodel and they coordinated everything — cabinets, granite countertops, and new flooring. The result is exactly what we envisioned.',
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
    question: 'How much does a kitchen remodel cost in Tampa Bay?',
    answer:
      'Kitchen remodeling costs depend on the scope of the project — cabinet replacement, countertop material, flooring type, layout changes, and appliances all affect the total. The best way to get accurate pricing is to visit the showroom or schedule a free estimate with our team.',
  },
  {
    question: 'How long does a kitchen remodel take?',
    answer:
      'The timeline depends on the scope of work. A cabinet and countertop replacement can often be completed within 1–2 weeks. Full kitchen remodels that include layout changes, plumbing, or electrical work may take longer. We provide timelines during your free estimate.',
  },
  {
    question: 'Do you handle the full kitchen remodel or just parts of it?',
    answer:
      'Cabinets & Remodeling Depot can handle full kitchen remodels including cabinets, countertops, flooring, and backsplash. We can also do partial updates if you only want to replace certain elements. We work with you to plan the right scope for your goals.',
  },
  {
    question: 'What countertop options are available for my kitchen remodel?',
    answer:
      'We offer quartz, granite, quartzite, marble, and porcelain countertops. Each material has different characteristics for durability, maintenance, and style. Visit our Valrico showroom to compare options in person before making a decision.',
  },
  {
    question: 'Do you install kitchen flooring as well?',
    answer:
      'Yes. Cabinets & Remodeling Depot offers flooring installation including luxury vinyl plank (LVP), tile, hardwood, and laminate. Coordinating flooring with your new cabinets and countertops is one of the most impactful things you can do for your kitchen.',
  },
  {
    question: 'Can you help with kitchen layout planning?',
    answer:
      'Yes. Our team works with homeowners to understand the existing kitchen layout and plan for improvements that maximize storage, workflow, and aesthetics. Visit the showroom to discuss your project.',
  },
  {
    question: 'Do you offer free estimates for kitchen remodeling?',
    answer:
      'Yes. Call (813) 651-2333 or visit our Valrico showroom to request a free kitchen remodeling estimate.',
  },
  {
    question: 'What areas do you serve for kitchen remodeling?',
    answer:
      'We serve Tampa, Brandon, Riverview, Valrico, Lithia, FishHawk, Bloomingdale, Carrollwood, Westchase, Temple Terrace, Wesley Chapel, Lutz, South Tampa, and surrounding communities from our Valrico showroom.',
  },
]

// ── Main Component ────────────────────────────────────────────────────────────
const REVIEW_MAX_CHARS = 140

export function KitchenRemodelingPageClient() {
  // ── API-driven content with hardcoded fallbacks ─────────────────────────
  const { data: page } = usePageContent('kitchen-remodeling')
  const apiContent = page?.content ? normalizeContent(page.content) : null
  const heroSection = apiContent?.sections?.find((s) => s.type === 'hero')
  const faqSection  = apiContent?.sections?.find((s) => s.type === 'faq')
  const ctaSection  = apiContent?.sections?.find((s) => s.type === 'cta')

  const heroTitle    = heroSection?.title    || 'Kitchen Remodeling Tampa Bay Homeowners Love'
  const heroSubtitle = heroSection?.subtitle || null
  const ctaHeading   = ctaSection?.heading   || 'Get Your Free Kitchen Remodeling Estimate Today'
  const ctaLink      = ctaSection?.buttonLink || '/contact'
  const faqs         = faqSection?.items?.length ? faqSection.items : DEFAULT_FAQS
  const schemaJson   = page?.content?.schema || null
  // ────────────────────────────────────────────────────────────────────────

  const [openFaq, setOpenFaq] = useState(0)
  const [reviewIdx, setReviewIdx] = useState(0)
  const [reviewExpanded, setReviewExpanded] = useState(false)

  const goToReview = (i) => { setReviewIdx(i); setReviewExpanded(false) }
  const prevReview = () => goToReview(reviewIdx === 0 ? REVIEWS.length - 1 : reviewIdx - 1)
  const nextReview = () => goToReview(reviewIdx === REVIEWS.length - 1 ? 0 : reviewIdx + 1)

  return (
    <>
      <JsonLd schema={schemaJson} />
      {/* ═══════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex flex-col min-h-[90vh] md:min-h-screen overflow-hidden">

        <div className="absolute inset-0">
          <Image
            src="/kitchen-bg.webp"
            alt="Kitchen remodeling background"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.40) 65%, rgba(0,0,0,0.18) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 flex-1 flex items-center py-24 md:py-28 lg:py-32">
          <div className="container-custom w-full">
            <div className="max-w-xl lg:max-w-2xl">

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xs uppercase tracking-[0.18em] font-semibold text-white/60 mb-4"
              >
                Kitchen Remodeling
              </motion.p>

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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.22 }}
                className="rounded-xl p-4 sm:p-5 mb-7 space-y-2.5"
                style={{ background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(4px)' }}
              >
                <p className="text-white/90 text-sm sm:text-[0.95rem] leading-relaxed">
                  Ready to transform your kitchen into the heart of your home? From full renovations to targeted upgrades, we handle it all.
                </p>
                <p className="text-white/80 text-sm sm:text-[0.95rem] leading-relaxed">
                  Cabinets &amp; Remodeling Depot helps Tampa Bay homeowners remodel kitchens with quality cabinets, countertops, flooring, and backsplash — all coordinated from one trusted local team.
                </p>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                  Serving Tampa, Brandon, Riverview, Valrico, Lithia, FishHawk, Bloomingdale, South Tampa, Westchase, Carrollwood, Temple Terrace, Wesley Chapel, Lutz, and nearby communities from our Valrico showroom.
                </p>
              </motion.div>

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

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.48 }}
                className="mt-7 pt-6 border-t border-white/15"
              >
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-3 lg:gap-x-0">
                  {[
                    { Icon: ChefHat,    title: 'Full Kitchen Remodels',    sub: 'Start to Finish'              },
                    { Icon: Settings2,  title: 'Expert Coordination',      sub: 'Cabinets, Tops & Floors'      },
                    { Icon: Wrench,     title: 'Professional Installation', sub: 'Local Experts'               },
                    { Icon: MapPin,     title: 'Serving Tampa Bay',        sub: 'From Our Valrico Showroom'    },
                  ].map(({ Icon, title, sub }, i, arr) => (
                    <div
                      key={title}
                      className={`flex items-center gap-3 lg:px-4 ${
                        i === 0 ? 'lg:pl-0' : ''
                      } ${
                        i === arr.length - 1 ? 'lg:pr-0' : 'lg:border-r lg:border-white/20'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
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
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-gray-100">
              {[
                {
                  Icon: LayoutGrid,
                  title: 'Full Remodels',
                  desc: 'Cabinets, countertops, flooring, backsplash & layout',
                },
                {
                  Icon: MapPin,
                  title: 'Serving Tampa Bay',
                  desc: 'Tampa, Brandon, Riverview, Valrico, Lithia, FishHawk & More',
                },
                {
                  Icon: CalendarDays,
                  title: 'Coordinated Process',
                  desc: 'One team managing all remodeling elements',
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
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 flex-shrink-0">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-[0.95rem] sm:text-base lg:text-[1.05rem] leading-snug mb-2">
                    {title}
                  </h3>
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
          KITCHEN REMODELING SERVICES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          <FadeIn className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              Complete Kitchen Remodeling{' '}
              <br className="hidden md:block" />
              Under One Roof
            </h2>
          </FadeIn>

          <FadeIn
            delay={0.1}
            className="max-w-4xl mx-auto mb-12 md:mb-14 space-y-4 text-gray-700 text-base sm:text-[1.05rem] leading-relaxed"
          >
            <p>
              Your kitchen is the most-used room in your home. It is where meals are prepared, conversations happen, and families gather. When it no longer works the way you need it to, a remodel can completely change how you experience the space.
            </p>
            <p>
              At Cabinets &amp; Remodeling Depot, we handle{' '}
              <strong className="text-gray-900 font-semibold">full kitchen remodels</strong> and{' '}
              <strong className="text-gray-900 font-semibold">targeted upgrades</strong> for Tampa Bay homeowners. Whether you want to replace just the cabinets and countertops, or gut the entire kitchen for a fresh start, we can coordinate the project from start to finish.
            </p>
            <p>
              Visit our{' '}
              <strong className="text-gray-900 font-semibold">Valrico showroom</strong> to compare materials, styles, and finishes in person. Our team brings together expertise in{' '}
              <strong className="text-gray-900 font-semibold">
                cabinets, countertops, flooring, backsplash, and full remodeling
              </strong>{' '}
              so you do not have to manage multiple contractors.
            </p>
          </FadeIn>

          {/* ── 5 Service cards ────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {[
              {
                name: 'Full Kitchen Renovation',
                src: '/kitchen-bg.webp',
                desc: 'Complete kitchen transformation including layout changes, new cabinets, countertops, flooring, and backsplash.',
              },
              {
                name: 'Cabinet Replacement',
                src: '/cabinet_img.webp',
                desc: 'Replace outdated or damaged cabinets with new in-stock or custom options that fit your style and budget.',
              },
              {
                name: 'Countertop Upgrade',
                src: '/countertop_bg.webp',
                desc: 'New quartz, granite, quartzite, marble, or porcelain countertops fabricated and installed for your kitchen.',
              },
              {
                name: 'Kitchen Flooring',
                src: '/porcelain.webp',
                desc: 'LVP, tile, hardwood, or laminate flooring to complete your kitchen remodel and tie the whole space together.',
              },
              {
                name: 'Backsplash & Finishing',
                src: '/kitchen_countertops_marble.webp',
                desc: 'Tile backsplash installation and finishing touches that bring the entire kitchen design together.',
              },
            ].map(({ name, src, desc }, i, arr) => (
              <FadeIn
                key={name}
                delay={i * 0.08}
                className={i === arr.length - 1 ? 'col-span-2 sm:col-span-1' : ''}
              >
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden h-full flex flex-col group cursor-default">
                  <div className="aspect-[4/3] relative overflow-hidden flex-shrink-0">
                    <Image
                      src={src}
                      alt={name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  </div>
                  <div className="p-3 sm:p-4 text-center flex-1 flex flex-col justify-start">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-[0.95rem] mb-1.5">
                      {name}
                    </h3>
                    <p className="text-muted-foreground text-[0.7rem] sm:text-xs leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-10">
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold px-8">
              <Link href="/contact">Visit Our Valrico Showroom</Link>
            </Button>
          </FadeIn>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          KITCHEN REMODELING FOR TAMPA BAY HOMES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden">

        <Image
          src="/Budget-kitchen-remodel-Tampa-featuring-affordable-upgrades-and-modern-finishes.jpg"
          alt="Kitchen remodeling project in Tampa Bay home"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.93) 45%, rgba(255,255,255,0.70) 70%, rgba(255,255,255,0.30) 100%)',
          }}
        />

        <div className="relative z-10 container-custom">
          <div className="max-w-xl lg:max-w-2xl">
            <FadeIn>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-tight mb-8">
                <span className="text-primary">Kitchen Remodeling</span>{' '}
                <span className="text-gray-900">for Tampa Bay Homes</span>
              </h2>

              <ul className="space-y-5">
                {[
                  'Tampa Bay homes vary widely in age, size, and layout. Whether you have a galley kitchen in a 1970s ranch home or an open-concept kitchen in a newer build, there are remodeling approaches that work for every situation.',
                  'For older kitchens, replacing dated cabinets and countertops is one of the highest-value improvements you can make. New materials and finishes can completely modernize the space.',
                  'For newer homes that want an upgrade, coordinating cabinets, countertops, and flooring creates a cohesive, polished look that adds significant value and enjoyment.',
                  'For kitchen resale value, updated cabinets, quality countertops, and consistent flooring are three of the most impactful improvements buyers notice.',
                  'For budget-conscious remodels, we can help you prioritize where to invest and where to save without compromising the overall result.',
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
          REMODEL SCOPE COMPARISON TABLE — desktop only
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="hidden md:block section-padding bg-white">
        <div className="container-custom">
          <FadeIn className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight">
              What Level of Remodel Is Right for You?
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {['Remodel Type', 'What It Includes', 'Best For', 'Impact', 'Timeline'].map((col) => (
                      <th
                        key={col}
                        className="px-5 py-4 text-left text-[0.7rem] font-bold uppercase tracking-widest text-gray-500"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      type: 'Surface Refresh',
                      includes: 'New countertops + hardware + backsplash',
                      bestFor: 'Budget updates, rental properties',
                      impact: 'Moderate',
                      timeline: 'Shortest',
                    },
                    {
                      type: 'Cabinet Replacement',
                      includes: 'New cabinets + countertops',
                      bestFor: 'Outdated kitchens needing a full visual update',
                      impact: 'High',
                      timeline: '1–2 weeks',
                    },
                    {
                      type: 'Kitchen Upgrade',
                      includes: 'Cabinets + countertops + flooring',
                      bestFor: 'Complete aesthetic refresh, resale prep',
                      impact: 'Very High',
                      timeline: '2–3 weeks',
                    },
                    {
                      type: 'Full Kitchen Remodel',
                      includes: 'All of the above + layout changes',
                      bestFor: 'Maximizing functionality and resale value',
                      impact: 'Transformative',
                      timeline: 'Custom timeline',
                    },
                  ].map((row, i, arr) => (
                    <tr
                      key={row.type}
                      className={`${i !== arr.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-primary/[0.02] transition-colors`}
                    >
                      <td className="px-5 py-5 font-bold text-primary text-sm">{row.type}</td>
                      <td className="px-5 py-5 text-[#4a7fa5] text-sm leading-snug">{row.includes}</td>
                      <td className="px-5 py-5 text-[#4a7fa5] text-sm leading-snug">{row.bestFor}</td>
                      <td className="px-5 py-5 text-[#4a7fa5] text-sm">{row.impact}</td>
                      <td className="px-5 py-5 text-[#4a7fa5] text-sm">{row.timeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 text-center">
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Not sure what scope makes sense for your budget and goals? Visit our Valrico showroom and talk with our team.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHY CHOOSE CABINETS & REMODELING DEPOT
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden">

        <div className="absolute inset-0">
          <Image
            src="/kitchen_countertops_marble.webp"
            alt="Kitchen remodeling background"
            fill
            className="object-cover object-center"
            sizes="100vw"
            style={{ opacity: 0.5 }}
          />
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
                Icon: ChefHat,
                title: 'One-Stop Kitchen Remodeling',
                body: 'Managing multiple contractors for a kitchen remodel is stressful and often leads to coordination problems. We handle cabinets, countertops, flooring, and backsplash under one roof, keeping your project organized and on schedule.',
              },
              {
                Icon: MapPin,
                title: 'A Real Local Showroom',
                body: 'Kitchen materials look different in person than online. At our Valrico showroom, you can compare cabinet finishes, countertop slabs, and flooring options side by side before making any decisions.',
              },
              {
                Icon: Tag,
                title: 'Competitive Pricing',
                body: 'We work to reduce the middleman markup on cabinets and countertops by sourcing materials directly. More of your remodeling budget goes toward quality materials and professional installation.',
              },
              {
                Icon: Layers,
                title: 'Coordinated Design',
                body: 'Cabinets, countertops, and flooring need to work together visually. Our team helps you coordinate materials, colors, and finishes so every element of your kitchen remodel looks intentional.',
              },
              {
                Icon: Wrench,
                title: 'Professional Installation',
                body: 'Quality materials require quality installation. Our experienced installation team handles every detail — from cabinet leveling to countertop seaming — to ensure the best possible result.',
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

          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight mb-4">
              Our Simple <span className="text-primary">4-Step Process</span>
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
              <div className="h-1 w-8 bg-primary rounded-full" />
              <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-primary/20 z-0" />

            {[
              {
                num: '1',
                Icon: MessageSquare,
                title: 'Consultation & Planning',
                desc: 'Call us or visit our Valrico showroom. We discuss your kitchen goals, layout, budget, and timeline to develop a remodeling plan that works for you.',
              },
              {
                num: '2',
                Icon: Ruler,
                title: 'Measurement & Selection',
                desc: 'We measure your kitchen and work with you to select the right cabinets, countertop material, flooring, and finishes that coordinate together.',
              },
              {
                num: '3',
                Icon: PaintBucket,
                title: 'Material Preparation',
                desc: 'Cabinets are prepared for installation, countertops are fabricated to your exact specifications, and materials are staged and ready.',
              },
              {
                num: '4',
                Icon: Wrench,
                title: 'Installation',
                desc: 'Our team installs all elements efficiently and correctly — cabinets first, then countertops, then flooring and finishing touches.',
              },
            ].map(({ num, Icon, title, desc }, i) => (
              <FadeIn key={num} delay={i * 0.12} className="relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-5 shadow-md ring-4 ring-white">
                    <span className="text-white font-extrabold text-xl leading-none">{num}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs sm:text-sm mb-3 leading-snug">
                    {title}
                  </h3>
                  <p className="text-[#4a7fa5] text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5} className="text-center mt-12">
            <p className="text-gray-600 text-sm sm:text-base">
              Ready to start? Call{' '}
              <a href="tel:+18136512333" className="text-primary font-bold hover:underline">
                (813) 651-2333
              </a>{' '}
              or{' '}
              <Link href="/contact" className="text-primary font-bold hover:underline">
                request a free kitchen remodeling estimate
              </Link>
              .
            </p>
          </FadeIn>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICE AREA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#F8F3ED]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 md:items-stretch">

            <FadeIn className="flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-5">
                <span className="text-primary">Kitchen Remodeling</span>{' '}
                <span className="text-gray-900">Across Tampa Bay</span>
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-2">
                Cabinets &amp; Remodeling Depot serves Tampa Bay from our showroom in Valrico, Florida.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
                We regularly help homeowners in:
              </p>

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
          KITCHEN MAINTENANCE TIPS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">

          <FadeIn className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight">
              How to Protect Your{' '}
              <span className="text-primary">Kitchen Investment</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                Icon: Droplets,
                title: 'Daily Cabinet Cleaning',
                body: 'Wipe cabinet surfaces with a damp cloth and mild soap. Avoid excessive moisture near hinges and edges. Dry surfaces promptly after cleaning.',
              },
              {
                Icon: AlertCircle,
                title: 'Protect Countertop Surfaces',
                body: 'Use cutting boards to protect countertops from scratches. Wipe up spills quickly — especially acidic liquids like coffee, wine, and citrus on natural stone.',
              },
              {
                Icon: Flame,
                title: 'Use Trivets for Hot Pans',
                body: 'Always use trivets or hot pads before placing hot pots, pans, or appliances on countertop surfaces to prevent heat damage.',
              },
              {
                Icon: ShieldCheck,
                title: 'Seal Natural Stone Countertops',
                body: 'Granite, quartzite, and marble countertops should be sealed periodically as recommended. Quartz and porcelain surfaces do not require sealing.',
              },
              {
                Icon: Clock,
                title: 'Regular Floor Maintenance',
                body: 'Sweep or vacuum kitchen floors regularly to prevent scratches from grit and debris. Use appropriate cleaners for your specific flooring material.',
              },
              {
                Icon: Droplets,
                title: 'Manage Kitchen Humidity',
                body: 'Use exhaust fans when cooking to reduce moisture and steam. Excessive humidity can affect cabinet finishes, countertop seals, and flooring over time.',
              },
            ].map(({ Icon, title, body }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-4 flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base sm:text-[1.05rem] mb-2 leading-snug">
                    {title}
                  </h3>
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
          TESTIMONIALS — carousel
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

            <FadeIn x={-30} y={0} className="relative rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[460px] md:min-h-[500px]">
              <Image
                src="/img_01bg.jpeg"
                alt=""
                fill
                aria-hidden="true"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0">
                <Image
                  src="/Testimonials_sec-1.webp"
                  alt="Professional kitchen remodeling expert"
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

            <FadeIn x={30} y={0} delay={0.15}>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="text-gray-900">What Tampa Homeowners </span>
                <span className="text-primary">Are Saying</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Real reviews from homeowners who transformed their kitchens with us.
              </p>

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
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex gap-0.5">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <GoogleIcon />
                        </div>
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
              Have questions about kitchen remodeling in Tampa? We&apos;ve got answers.
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
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
                          <div className="px-4 sm:px-5 pb-5 pl-16 text-muted-foreground leading-relaxed text-sm sm:text-base">
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

            <FadeIn x={-30} y={0}>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-tight mb-5">
                Get Your{' '}
                <span className="text-primary">Free Kitchen Remodeling Estimate</span>{' '}
                Today
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-2">
                Whether you are planning a full kitchen remodel or want to start with cabinets and countertops, Cabinets &amp; Remodeling Depot can help you plan and execute the right project.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                Visit our Valrico showroom to compare options in person — or call us to schedule a free estimate.
              </p>

              <div className="space-y-0 divide-y divide-gray-200 border-t border-b border-gray-200">
                <div className="flex items-center gap-4 py-5">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-gray-400 mb-0.5">Call Us</p>
                    <a href={`tel:${COMPANY_PHONE}`} className="text-primary font-bold text-base sm:text-lg hover:underline">
                      {COMPANY_PHONE}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 py-5">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-gray-400 mb-0.5">Visit Our Showroom</p>
                    <p className="text-gray-800 font-medium text-sm sm:text-base leading-snug">{COMPANY_ADDRESS}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-5">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-gray-400 mb-1">Service Area</p>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      Tampa, Brandon, Riverview, Valrico, Lithia, FishHawk, Plant City, Wesley Chapel, Lutz, Carrollwood, Temple Terrace, South Tampa, Westchase &amp; more.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} x={30} y={0}>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  Book Free Consultation
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Fill out the form and we&apos;ll contact you within 1 business day.
                </p>
                <ConsultationForm serviceName="Kitchen Remodeling" />
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

    </>
  )
}
