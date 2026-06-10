'use client'

import { useState } from 'react'
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
  Layers, Home,
} from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ConsultationForm } from '@/components/forms/ConsultationForm'
import { COMPANY_PHONE, COMPANY_ADDRESS } from '@/lib/constants'

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
    text: "We had LVP flooring installed throughout our home and the results are stunning. The installation was fast, clean, and professional. The team helped us pick the perfect color and the whole house looks completely transformed!",
  },
  {
    name: 'Robert T.',
    location: 'Riverview, FL',
    initials: 'RT',
    rating: 5,
    time: '1 month ago',
    text: 'Beautiful tile flooring in our kitchen and bathrooms. The installation was precise — every tile is perfectly level and the grout lines are clean. Very happy with the quality of work and would definitely recommend.',
  },
  {
    name: 'Maria S.',
    location: 'Tampa, FL',
    initials: 'MS',
    rating: 5,
    time: '3 weeks ago',
    text: 'Replaced old carpet and dated tile throughout the house with new LVP flooring. The team was professional, worked quickly, and cleaned up thoroughly each day. The finished product looks incredible.',
  },
  {
    name: 'David L.',
    location: 'Valrico, FL',
    initials: 'DL',
    rating: 5,
    time: '2 months ago',
    text: 'Outstanding flooring installation. We went with large-format tile for the main living areas and LVP for the bedrooms. They helped us coordinate the transition strips and the whole house flows together beautifully.',
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

const faqs = [
  {
    question: 'What types of flooring do you install?',
    answer:
      'Cabinets & Remodeling Depot installs luxury vinyl plank (LVP), tile, hardwood, and laminate flooring. We can help you choose the right material based on your lifestyle, budget, and the rooms being floored.',
  },
  {
    question: 'Is LVP flooring good for Florida homes?',
    answer:
      'Yes. Luxury vinyl plank (LVP) is one of the most popular flooring choices in Florida because it is 100% waterproof, comfortable underfoot, and available in a wide range of wood-look and stone-look styles. It handles Florida humidity very well.',
  },
  {
    question: 'What is the best flooring for kitchens and bathrooms?',
    answer:
      'For kitchens and bathrooms, tile and LVP are both excellent choices because they are waterproof and easy to clean. Tile is more durable and heat-resistant. LVP is warmer underfoot and easier to install. Both are popular choices in Tampa Bay homes.',
  },
  {
    question: 'Can you install flooring over existing floors?',
    answer:
      'In some cases, new flooring can be installed over existing floors depending on the height, condition, and type of the existing surface. Our team will evaluate your floor during the estimate and recommend the best approach.',
  },
  {
    question: 'Do you remove old flooring?',
    answer:
      'Yes, old flooring removal can be included in your project scope. This applies to tile, carpet, laminate, and hardwood. Confirm during your estimate so we can plan accordingly.',
  },
  {
    question: 'How long does flooring installation take?',
    answer:
      'A standard flooring installation for a typical home takes 2–5 days depending on square footage, flooring type, and subfloor preparation needed. Tile installations may take longer due to setting and grout curing time.',
  },
  {
    question: 'What is the difference between LVP and laminate?',
    answer:
      'LVP (luxury vinyl plank) is 100% waterproof and can be used in kitchens and bathrooms. Laminate is water-resistant but not waterproof and should generally not be used in high-moisture areas. LVP is usually the better choice for Florida homes.',
  },
  {
    question: 'Do you offer free estimates for flooring installation?',
    answer:
      'Yes. Call (813) 651-2333 or visit our Valrico showroom to request a free flooring estimate.',
  },
]

// ── Main Component ────────────────────────────────────────────────────────────
const REVIEW_MAX_CHARS = 140

export function FlooringPageClient() {
  const [openFaq, setOpenFaq] = useState(0)
  const [reviewIdx, setReviewIdx] = useState(0)
  const [reviewExpanded, setReviewExpanded] = useState(false)

  const goToReview = (i) => { setReviewIdx(i); setReviewExpanded(false) }
  const prevReview = () => goToReview(reviewIdx === 0 ? REVIEWS.length - 1 : reviewIdx - 1)
  const nextReview = () => goToReview(reviewIdx === REVIEWS.length - 1 ? 0 : reviewIdx + 1)

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex flex-col min-h-[90vh] md:min-h-screen overflow-hidden">

        <div className="absolute inset-0">
          <Image
            src="/kitchen-bg.webp"
            alt="Flooring installation background"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.68) 40%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.20) 100%)',
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
                Flooring Installation
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="text-[2rem] sm:text-[2.6rem] lg:text-[3.2rem] font-extrabold leading-[1.13] mb-5"
              >
                <span className="block" style={{ color: '#c9334e' }}>
                  Flooring Tampa Bay<br className="hidden sm:block" /> Homeowners Love
                </span>
                <span className="block text-white font-normal mt-1">
                  LVP, Tile, Hardwood &amp; More
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.22 }}
                className="rounded-xl p-4 sm:p-5 mb-7 space-y-2.5"
                style={{ background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(4px)' }}
              >
                <p className="text-white/90 text-sm sm:text-[0.95rem] leading-relaxed">
                  Looking for beautiful, durable flooring in Tampa Bay that handles Florida&apos;s heat and humidity without breaking the budget?
                </p>
                <p className="text-white/80 text-sm sm:text-[0.95rem] leading-relaxed">
                  Cabinets &amp; Remodeling Depot helps Tampa Bay homeowners upgrade their floors with luxury vinyl plank, tile, hardwood, and laminate — professionally installed from our Valrico showroom.
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
                    { Icon: Layers,     title: 'Multiple Materials',       sub: 'LVP, Tile, Hardwood & More'   },
                    { Icon: Tag,        title: 'Wholesale Pricing',        sub: 'Direct Importing'             },
                    { Icon: Wrench,     title: 'Expert Installation',      sub: 'Local Professionals'          },
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
                  title: 'Wide Selection',
                  desc: 'LVP, tile, hardwood, laminate & stone flooring options',
                },
                {
                  Icon: MapPin,
                  title: 'Serving Tampa Bay',
                  desc: 'Tampa, Brandon, Riverview, Valrico, Lithia, FishHawk & More',
                },
                {
                  Icon: CalendarDays,
                  title: 'Fast Installation',
                  desc: 'Most flooring projects completed in 2–5 days',
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
          FLOORING MATERIALS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          <FadeIn className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              Beautiful Floors Without the{' '}
              <br className="hidden md:block" />
              Overpriced Retail Markup
            </h2>
          </FadeIn>

          <FadeIn
            delay={0.1}
            className="max-w-4xl mx-auto mb-12 md:mb-14 space-y-4 text-gray-700 text-base sm:text-[1.05rem] leading-relaxed"
          >
            <p>
              Your floors are the foundation of every room. They set the tone for your entire home — and they take more daily wear than almost any other surface. Choosing the right flooring material for your Tampa Bay home matters.
            </p>
            <p>
              At Cabinets &amp; Remodeling Depot, we help homeowners choose and install flooring that fits how they actually live. Some families want the low-maintenance durability of{' '}
              <strong className="text-gray-900 font-semibold">luxury vinyl plank</strong>. Others prefer the classic beauty of{' '}
              <strong className="text-gray-900 font-semibold">hardwood</strong>, the design versatility of{' '}
              <strong className="text-gray-900 font-semibold">tile</strong>, or the budget-friendly look of{' '}
              <strong className="text-gray-900 font-semibold">laminate</strong>.
            </p>
            <p>
              Visit our{' '}
              <strong className="text-gray-900 font-semibold">Valrico showroom</strong> to compare flooring materials and see samples in person. Our team can also help coordinate your floors with new{' '}
              <strong className="text-gray-900 font-semibold">
                cabinets, countertops, and full kitchen or bathroom remodeling projects
              </strong>
              .
            </p>
          </FadeIn>

          {/* ── 5 Flooring type cards ────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {[
              {
                name: 'Luxury Vinyl Plank',
                src: '/quartzite.webp',
                desc: '100% waterproof, durable, and available in dozens of wood-look and stone-look styles. Perfect for Florida homes.',
              },
              {
                name: 'Hardwood',
                src: '/marble.webp',
                desc: 'Classic natural wood flooring that adds warmth and character. Available in solid and engineered options.',
              },
              {
                name: 'Tile',
                src: '/porcelain.webp',
                desc: 'Ceramic and porcelain tile in a huge range of sizes, colors, and textures. Ideal for kitchens, bathrooms, and living areas.',
              },
              {
                name: 'Laminate',
                src: '/quartz.webp',
                desc: 'Budget-friendly wood-look flooring that is durable and easy to maintain. Great for bedrooms and living areas.',
              },
              {
                name: 'Stone & Large Format',
                src: '/granite.webp',
                desc: 'Natural stone and large-format porcelain tile for a high-end look in living rooms, kitchens, and outdoor spaces.',
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
                      alt={`${name} flooring`}
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
          BEST FLOORING FOR TAMPA BAY HOMES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden">

        <Image
          src="/kitchen_countertops_marble.webp"
          alt="Flooring in Tampa Bay home"
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
                <span className="text-primary">Best Flooring</span>{' '}
                <span className="text-gray-900">for Tampa Bay Homes</span>
              </h2>

              <ul className="space-y-5">
                {[
                  'Florida\'s climate presents unique flooring challenges. High humidity, heat, and the occasional water intrusion mean you need flooring materials that can hold up to these conditions year after year.',
                  'For main living areas, luxury vinyl plank (LVP) is the most popular choice in Tampa Bay homes because it is 100% waterproof, comfortable, and available in beautiful wood-look styles that complement any décor.',
                  'For kitchens and bathrooms, tile and LVP are both excellent choices. Tile is more heat and scratch resistant. LVP is warmer underfoot and quicker to install.',
                  'For bedrooms, hardwood, LVP, and laminate are all strong choices depending on your budget and maintenance preferences.',
                  'For resale value, updated flooring is one of the most visible improvements buyers notice. Consistent flooring throughout the home creates a clean, move-in ready look.',
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
          FLOORING COMPARISON TABLE — desktop only
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="hidden md:block section-padding bg-white">
        <div className="container-custom">
          <FadeIn className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight">
              Which Flooring Material Is Right for You?
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {['Material', 'Best For', 'Waterproof', 'Maintenance', 'Florida Suitability'].map((col) => (
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
                      material: 'Luxury Vinyl Plank',
                      bestFor: 'Any room, families, pets, high-traffic areas',
                      waterproof: '100% Waterproof',
                      maintenance: 'Very Low',
                      florida: 'Excellent',
                    },
                    {
                      material: 'Tile',
                      bestFor: 'Kitchens, bathrooms, living areas, outdoor',
                      waterproof: '100% Waterproof',
                      maintenance: 'Low',
                      florida: 'Excellent',
                    },
                    {
                      material: 'Hardwood',
                      bestFor: 'Bedrooms, living rooms, classic look',
                      waterproof: 'Not Waterproof',
                      maintenance: 'Moderate',
                      florida: 'Good (engineered)',
                    },
                    {
                      material: 'Laminate',
                      bestFor: 'Bedrooms, low-traffic areas, budget-friendly',
                      waterproof: 'Water-Resistant Only',
                      maintenance: 'Low',
                      florida: 'Moderate',
                    },
                    {
                      material: 'Stone / Large Format',
                      bestFor: 'Main living areas, kitchens, outdoor spaces',
                      waterproof: '100% Waterproof',
                      maintenance: 'Low to Moderate',
                      florida: 'Excellent',
                    },
                  ].map((row, i, arr) => (
                    <tr
                      key={row.material}
                      className={`${i !== arr.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-primary/[0.02] transition-colors`}
                    >
                      <td className="px-5 py-5 font-bold text-primary text-sm">{row.material}</td>
                      <td className="px-5 py-5 text-[#4a7fa5] text-sm leading-snug">{row.bestFor}</td>
                      <td className="px-5 py-5 text-[#4a7fa5] text-sm">{row.waterproof}</td>
                      <td className="px-5 py-5 text-[#4a7fa5] text-sm">{row.maintenance}</td>
                      <td className="px-5 py-5 text-[#4a7fa5] text-sm">{row.florida}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 text-center">
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Still not sure? Visit our Valrico showroom and compare flooring materials in person before making a decision.
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
            src="/cntrtop_img.jpg"
            alt="Flooring installation background"
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
                Icon: Tag,
                title: 'Wholesale Pricing Through Direct Importing',
                body: 'Many flooring retailers mark up prices significantly. Cabinets & Remodeling Depot works to reduce that markup by importing materials directly and passing the savings to Tampa Bay homeowners.',
              },
              {
                Icon: MapPin,
                title: 'A Real Local Showroom',
                body: 'Flooring looks different in person than it does in online photos. At our Valrico showroom, you can see and feel the actual samples before making a decision for your home.',
              },
              {
                Icon: Settings2,
                title: 'Wide Selection of Materials',
                body: 'We carry LVP, tile, hardwood, and laminate in a wide range of styles and price points. Whether you need waterproof flooring for a bathroom or hardwood for a bedroom, we have options that work.',
              },
              {
                Icon: Layers,
                title: 'One-Stop Home Remodeling',
                body: 'Flooring often connects with cabinet upgrades, countertop installation, and full remodeling work. We can help coordinate the entire project under one team instead of managing multiple contractors.',
              },
              {
                Icon: Wrench,
                title: 'Professional Installation',
                body: 'Even great flooring can look bad if it is installed poorly. Proper subfloor preparation, expansion gaps, and transition strips matter. Our installation team focuses on doing the work correctly.',
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
                title: 'Consultation & Material Selection',
                desc: 'Call us or visit our Valrico showroom. We help you compare LVP, tile, hardwood, and laminate based on your rooms, lifestyle, budget, and style.',
              },
              {
                num: '2',
                Icon: Ruler,
                title: 'Measurement',
                desc: 'We measure each room carefully to calculate exact square footage, including doorways, closets, and transitions between materials.',
              },
              {
                num: '3',
                Icon: Home,
                title: 'Subfloor Preparation',
                desc: 'We inspect and prepare the subfloor — leveling, cleaning, and addressing any moisture or structural issues before installation begins.',
              },
              {
                num: '4',
                Icon: Wrench,
                title: 'Installation',
                desc: 'Flooring is installed with care for expansion gaps, pattern alignment, and clean transitions. The area is cleaned upon completion.',
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
                request a free flooring estimate
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
                <span className="text-primary">Flooring Installation</span>{' '}
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
          FLOORING CARE TIPS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">

          <FadeIn className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight">
              How to Keep Your Floors{' '}
              <span className="text-primary">Looking New</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                Icon: Droplets,
                title: 'Daily Sweeping & Mopping',
                body: 'Sweep or vacuum floors regularly to remove grit and debris that can scratch the surface. Damp mop with appropriate cleaners — avoid excessive water on hardwood and laminate.',
              },
              {
                Icon: AlertCircle,
                title: 'Use Appropriate Cleaners',
                body: 'Each flooring type requires specific cleaners. Avoid bleach and harsh chemicals on LVP, hardwood, and laminate. Use pH-neutral cleaners for tile and grout to preserve the sealer.',
              },
              {
                Icon: Flame,
                title: 'Protect from Furniture Scratches',
                body: 'Use felt pads under furniture legs to prevent scratches on hardwood, LVP, and laminate floors. Avoid dragging heavy furniture across the floor.',
              },
              {
                Icon: Droplets,
                title: 'Clean Spills Immediately',
                body: 'Wipe up water, juice, and other liquids quickly — especially on hardwood and laminate flooring. Prolonged moisture exposure can cause swelling and damage over time.',
              },
              {
                Icon: ShieldCheck,
                title: 'Use Entry Mats',
                body: 'Place entry mats at exterior doors to trap dirt, sand, and moisture before they reach your finished floors. This simple step significantly extends the life of your flooring.',
              },
              {
                Icon: Clock,
                title: 'Seal Tile Grout Annually',
                body: 'Grout lines in tile floors should be sealed once a year to protect against staining and moisture absorption. Sealed grout is much easier to keep clean over the long term.',
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
                  alt="Professional flooring installation expert"
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
                Real reviews from homeowners who upgraded their floors with us.
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
              Have questions about flooring installation in Tampa? We&apos;ve got answers.
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
                <span className="text-primary">Free Flooring Estimate</span>{' '}
                Today
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-2">
                Whether you are replacing old carpet with LVP, updating tile in your kitchen, or installing hardwood throughout your home, Cabinets &amp; Remodeling Depot can help.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                Visit our Valrico showroom to compare flooring materials in person — or call us to schedule a free estimate.
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
                <ConsultationForm serviceName="Flooring" />
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

    </>
  )
}
