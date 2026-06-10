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
    text: "Our master bathroom remodel exceeded all expectations. New tile shower, vanity, and flooring — the team coordinated everything beautifully. The end result feels like a luxury spa. Absolutely love it!",
  },
  {
    name: 'Robert T.',
    location: 'Riverview, FL',
    initials: 'RT',
    rating: 5,
    time: '1 month ago',
    text: 'We completely remodeled our guest bathroom and the quality of work was outstanding. The tile installation is perfect and the new vanity really makes the room. Very happy with the whole experience.',
  },
  {
    name: 'Maria S.',
    location: 'Tampa, FL',
    initials: 'MS',
    rating: 5,
    time: '3 weeks ago',
    text: 'Professional bathroom renovation from start to finish. The team was clean, on schedule, and the results are stunning. Our walk-in shower is now the highlight of our home. Highly recommend!',
  },
  {
    name: 'David L.',
    location: 'Valrico, FL',
    initials: 'DL',
    rating: 5,
    time: '2 months ago',
    text: 'Outstanding experience. Full master bath remodel — new tile, vanity cabinets, countertop, and flooring. They helped us choose everything and the design really came together. Excellent craftsmanship.',
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
    question: 'How much does a bathroom remodel cost in Tampa Bay?',
    answer:
      'Bathroom remodeling costs vary significantly based on scope — a vanity and tile update is much different from a full master bath renovation with a custom shower, flooring, and new fixtures. The best way to get accurate pricing is to schedule a free estimate with our team.',
  },
  {
    question: 'How long does a bathroom remodel take?',
    answer:
      'A basic bathroom update (vanity, fixtures, and light tile work) can take 3–5 days. A full bathroom remodel with a custom tile shower, new flooring, and vanity installation typically takes 1–2 weeks depending on complexity.',
  },
  {
    question: 'Do you do custom tile showers?',
    answer:
      'Yes. We install custom tile showers including walk-in showers, shower/tub combos, and niche shelving. We carry a variety of tile options and can help you design a shower that fits the space and your style.',
  },
  {
    question: 'What vanity options do you offer?',
    answer:
      'We carry a range of bathroom vanity cabinets in single and double configurations, multiple sizes and finishes. We also provide vanity countertops in quartz, marble, and porcelain to complete the look.',
  },
  {
    question: 'Do you install bathroom flooring?',
    answer:
      'Yes. We offer bathroom flooring in tile, luxury vinyl plank (LVP), and other waterproof options suitable for bathrooms. Coordinating the floor tile with the shower and vanity creates a cohesive, polished look.',
  },
  {
    question: 'Can you handle a full master bathroom remodel?',
    answer:
      'Yes. Cabinets & Remodeling Depot can manage a full master bathroom renovation including demo, custom tile shower, double vanity, countertop, flooring, and finishing. We coordinate the entire project under one team.',
  },
  {
    question: 'What tile options are available for bathroom walls and floors?',
    answer:
      'We offer a wide selection of tile options in various sizes, colors, and textures including ceramic, porcelain, marble, and stone. Visit our Valrico showroom to see samples and plan your bathroom design.',
  },
  {
    question: 'Do you offer free estimates for bathroom remodeling?',
    answer:
      'Yes. Call (813) 651-2333 or visit our Valrico showroom to request a free bathroom remodeling estimate.',
  },
]

// ── Main Component ────────────────────────────────────────────────────────────
const REVIEW_MAX_CHARS = 140

export function BathroomRemodelingPageClient() {
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
            src="/bathroom_remodeling.png"
            alt="Bathroom remodeling background"
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
                Bathroom Remodeling
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="text-[2rem] sm:text-[2.6rem] lg:text-[3.2rem] font-extrabold leading-[1.13] mb-5"
              >
                <span className="block" style={{ color: '#c9334e' }}>
                  Bathroom Remodeling Tampa Bay<br className="hidden sm:block" /> Homeowners Love
                </span>
                <span className="block text-white font-normal mt-1">
                  Tile, Vanities &amp; Full Renovations
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
                  Transform your bathroom into a space you actually enjoy. From quick vanity updates to complete master bath renovations, we handle it all.
                </p>
                <p className="text-white/80 text-sm sm:text-[0.95rem] leading-relaxed">
                  Cabinets &amp; Remodeling Depot helps Tampa Bay homeowners remodel bathrooms with custom tile showers, vanity cabinets, countertops, and flooring — all coordinated from one trusted local team.
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
                    { Icon: Home,       title: 'Full Renovations',         sub: 'Start to Finish'             },
                    { Icon: Settings2,  title: 'Custom Tile & Vanity',     sub: 'Design & Installation'       },
                    { Icon: Wrench,     title: 'Expert Installation',      sub: 'Local Professionals'         },
                    { Icon: MapPin,     title: 'Serving Tampa Bay',        sub: 'From Our Valrico Showroom'   },
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
                  title: 'Full Renovations',
                  desc: 'Tile showers, vanities, countertops, flooring & more',
                },
                {
                  Icon: MapPin,
                  title: 'Serving Tampa Bay',
                  desc: 'Tampa, Brandon, Riverview, Valrico, Lithia, FishHawk & More',
                },
                {
                  Icon: CalendarDays,
                  title: 'Coordinated Process',
                  desc: 'All bathroom elements handled by one experienced team',
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
          BATHROOM REMODELING SERVICES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          <FadeIn className="text-center mb-8 md:mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              Complete Bathroom Remodeling{' '}
              <br className="hidden md:block" />
              Under One Roof
            </h2>
          </FadeIn>

          <FadeIn
            delay={0.1}
            className="max-w-4xl mx-auto mb-12 md:mb-14 space-y-4 text-gray-700 text-base sm:text-[1.05rem] leading-relaxed"
          >
            <p>
              Your bathroom should be a space you enjoy using every day. Whether it is a dated master bath that needs a full overhaul, or a guest bathroom that just needs fresh tile and a new vanity, the right remodel can make a real difference.
            </p>
            <p>
              At Cabinets &amp; Remodeling Depot, we handle{' '}
              <strong className="text-gray-900 font-semibold">full bathroom renovations</strong> and{' '}
              <strong className="text-gray-900 font-semibold">targeted updates</strong> for Tampa Bay homeowners. From custom tile showers to vanity cabinets, countertops, and flooring — we can coordinate the entire project from start to finish.
            </p>
            <p>
              Visit our{' '}
              <strong className="text-gray-900 font-semibold">Valrico showroom</strong> to browse tile options, vanity styles, and countertop materials in person. Our team brings expertise in{' '}
              <strong className="text-gray-900 font-semibold">
                tile, vanity cabinets, countertops, flooring, and full bathroom remodeling
              </strong>{' '}
              so you do not have to manage multiple contractors.
            </p>
          </FadeIn>

          {/* ── 5 Service cards ────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {[
              {
                name: 'Full Bath Renovation',
                src: '/bathroom_remodeling.png',
                desc: 'Complete bathroom transformation — tile, vanity, countertop, shower, and flooring all in one coordinated project.',
              },
              {
                name: 'Custom Tile Showers',
                src: '/porcelain.webp',
                desc: 'Walk-in showers, tub/shower combos, and custom tile work designed for your space and style.',
              },
              {
                name: 'Vanity Cabinets',
                src: '/cabinet_img.webp',
                desc: 'Single and double vanity cabinet installation with a wide range of styles, finishes, and sizes.',
              },
              {
                name: 'Countertops & Sinks',
                src: '/marble.webp',
                desc: 'Quartz, marble, and porcelain vanity tops in standard and custom sizes for any bathroom layout.',
              },
              {
                name: 'Bathroom Flooring',
                src: '/granite.webp',
                desc: 'Tile, LVP, and waterproof flooring options that complete the bathroom design and stand up to moisture.',
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
          BATHROOM REMODELING FOR TAMPA BAY HOMES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative section-padding overflow-hidden">

        <Image
          src="/bathroom_remodeling.png"
          alt="Bathroom remodeling in Tampa Bay home"
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
                <span className="text-primary">Bathroom Remodeling</span>{' '}
                <span className="text-gray-900">for Tampa Bay Homes</span>
              </h2>

              <ul className="space-y-5">
                {[
                  'Tampa Bay homes range from older builds with outdated bathrooms to newer homes where homeowners want to personalize and upgrade the space. A remodel can completely transform how you experience your bathroom daily.',
                  'For master bathrooms, a custom tile shower and updated vanity are two of the most impactful improvements. These upgrades also add significant resale value to your home.',
                  'For guest bathrooms, a new vanity, fresh tile, and updated flooring can modernize the entire space quickly and cost-effectively.',
                  'For older bathrooms with dated tile, a full tile replacement transforms the look of showers, floors, and walls in a way that is difficult to achieve with any other single upgrade.',
                  'For resale value, updated bathrooms are among the highest-return improvements buyers notice. Modern tile, vanities, and countertops signal a well-maintained, move-in ready home.',
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
              What Level of Bathroom Remodel Is Right for You?
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
                      type: 'Vanity Update',
                      includes: 'New vanity cabinet + countertop + fixtures',
                      bestFor: 'Quick refresh, guest bathrooms',
                      impact: 'Moderate',
                      timeline: '2–3 days',
                    },
                    {
                      type: 'Shower Upgrade',
                      includes: 'New tile shower or tub surround',
                      bestFor: 'Outdated showers, cracked grout, dated tile',
                      impact: 'High',
                      timeline: '4–7 days',
                    },
                    {
                      type: 'Full Guest Bath',
                      includes: 'Vanity + tile + flooring + fixtures',
                      bestFor: 'Complete guest or secondary bathroom update',
                      impact: 'Very High',
                      timeline: '1–1.5 weeks',
                    },
                    {
                      type: 'Master Bath Renovation',
                      includes: 'All of the above + custom shower + layout changes',
                      bestFor: 'Maximum functionality, luxury, and resale value',
                      impact: 'Transformative',
                      timeline: '1.5–3 weeks',
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
                  Not sure what scope is right for your bathroom? Visit our Valrico showroom and talk with our team.
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
            src="/estimate_bg.jpg"
            alt="Bathroom remodeling background"
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
                Icon: Home,
                title: 'One-Stop Bathroom Remodeling',
                body: 'Coordinating multiple contractors for a bathroom remodel creates unnecessary delays and communication problems. We handle tile, vanity cabinets, countertops, and flooring in one coordinated project.',
              },
              {
                Icon: MapPin,
                title: 'A Real Local Showroom',
                body: 'Tile patterns, vanity finishes, and countertop materials need to be seen in person. Visit our Valrico showroom to browse options and plan your bathroom design with samples in hand.',
              },
              {
                Icon: Tag,
                title: 'Competitive Pricing',
                body: 'We work to provide Tampa Bay homeowners with quality bathroom remodeling at competitive pricing. Visit our showroom or call for a free estimate to understand what your project will cost.',
              },
              {
                Icon: Layers,
                title: 'Coordinated Design',
                body: 'Tile, vanity, countertop, and flooring need to work together visually. Our team helps you coordinate materials so every element of your bathroom remodel looks thoughtfully designed.',
              },
              {
                Icon: Wrench,
                title: 'Experienced Installation',
                body: 'Bathroom tile installation, waterproofing, and vanity installation require experience to do correctly. Our team has the expertise to deliver lasting, high-quality results.',
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
                desc: 'Call us or visit our Valrico showroom. We discuss your bathroom goals, layout, budget, and timeline to plan a remodel that works for you.',
              },
              {
                num: '2',
                Icon: Ruler,
                title: 'Measurement & Design',
                desc: 'We measure the space and work with you to select tile, vanity, countertop, and flooring materials that coordinate beautifully.',
              },
              {
                num: '3',
                Icon: Droplets,
                title: 'Preparation',
                desc: 'Demo, waterproofing, and proper surface preparation are completed before any tile or vanity installation begins.',
              },
              {
                num: '4',
                Icon: Wrench,
                title: 'Installation',
                desc: 'Tile is set, vanity installed, countertop fitted, and flooring completed — all with careful attention to detail and cleanliness.',
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
                request a free bathroom remodeling estimate
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
                <span className="text-primary">Bathroom Remodeling</span>{' '}
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
          BATHROOM CARE TIPS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">

          <FadeIn className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight">
              How to Protect Your{' '}
              <span className="text-primary">Bathroom Remodel</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                Icon: Droplets,
                title: 'Keep Grout Clean',
                body: 'Clean tile grout regularly with a neutral pH cleaner and a soft brush. Avoid harsh acids or bleach on grout — these can degrade the sealer and cause discoloration over time.',
              },
              {
                Icon: ShieldCheck,
                title: 'Seal Grout Annually',
                body: 'Seal tile grout lines once a year to protect against moisture penetration, staining, and mold growth. Sealed grout stays cleaner and lasts significantly longer.',
              },
              {
                Icon: Droplets,
                title: 'Ventilate After Showers',
                body: 'Always run the exhaust fan during and after showers to reduce steam and humidity. Excess moisture is the leading cause of grout deterioration and mold in bathrooms.',
              },
              {
                Icon: AlertCircle,
                title: 'Protect Vanity Surfaces',
                body: 'Wipe up water, cosmetics, and hair products from vanity countertops quickly. Prolonged contact with certain products can stain or damage natural stone surfaces.',
              },
              {
                Icon: Clock,
                title: 'Address Leaks Immediately',
                body: 'Even small leaks around shower fixtures, faucets, or toilet bases can cause significant damage behind walls and under floors if left unaddressed.',
              },
              {
                Icon: Flame,
                title: 'Use Non-Abrasive Cleaners',
                body: 'Use soft cloths and non-abrasive cleaners on all bathroom surfaces — tile, vanity, countertop, and fixtures. Scratches and surface damage are much easier to prevent than repair.',
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
                  alt="Professional bathroom remodeling expert"
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
                Real reviews from homeowners who transformed their bathrooms with us.
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
              Have questions about bathroom remodeling in Tampa? We&apos;ve got answers.
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
                <span className="text-primary">Free Bathroom Remodeling Estimate</span>{' '}
                Today
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-2">
                Whether you are planning a full master bath renovation or want to start with a vanity upgrade and new tile, Cabinets &amp; Remodeling Depot can help you plan and execute the right project.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                Visit our Valrico showroom to browse tile, vanity, and countertop options in person — or call us to schedule a free estimate.
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
                <ConsultationForm serviceName="Bathroom Remodeling" />
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

    </>
  )
}
