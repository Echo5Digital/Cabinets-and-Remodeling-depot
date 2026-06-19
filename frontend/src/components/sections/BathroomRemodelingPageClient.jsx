'use client'

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
    <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-olive mb-3">
      <span className="w-6 h-px bg-olive inline-block" />
      {children}
      <span className="w-6 h-px bg-olive inline-block" />
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
    image: '/bathroom-remodel-2.jpg',
    alt: 'Bathroom design and planning Tampa Bay',
    title: 'Bathroom Design & Planning',
    body: 'Every successful bathroom renovation starts with thoughtful planning. We work closely with homeowners to understand their goals, evaluate existing layouts, and develop designs that balance comfort, efficiency, and visual appeal.',
  },
  {
    image: '/bathroom-remodel-3.jpg',
    alt: 'Custom bathroom vanities Tampa',
    title: 'Custom Bathroom Vanities',
    body: "Our showroom features bathroom vanities Tampa homeowners can compare in person. Whether you're looking for a modern floating vanity, a traditional cabinet-style vanity, or additional storage solutions, we help you find options that fit your space and style.",
  },
  {
    image: '/freepik__quartz-vs-granite-for-bathroom-countertops-which-s__53320.webp',
    alt: 'Quartz and granite bathroom countertops Tampa',
    title: 'Bathroom Countertops & Surfaces',
    body: 'We offer bathroom countertops Tampa homeowners can customize using premium materials such as quartz and granite. These surfaces provide durability, easy maintenance, and timeless beauty.',
  },
  {
    image: '/bathroom-remodel-5.jpg',
    alt: 'Bathroom faucets and fixtures Tampa Valrico showroom',
    title: 'Faucets & Fixture Selections',
    body: 'Our showroom includes bathroom faucets Tampa Valrico showroom visitors can compare alongside vanities and countertop materials to create a cohesive design throughout the space.',
  },
  {
    image: '/bathroom-remodel-6.jpg',
    alt: 'Shower and bath upgrades Tampa',
    title: 'Shower & Bath Upgrades',
    body: 'From updated shower systems to bathtub replacements, we help homeowners create bathrooms that feel more comfortable, modern, and functional.',
  },
  {
    image: '/bathroom-remodel-1.jpg',
    alt: 'Bathroom storage and organization solutions',
    title: 'Storage & Organization Solutions',
    body: 'Smart storage solutions help maximize available space while keeping bathrooms organized and clutter-free.',
  },
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
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. HERO — full viewport, bathroom-02.webp background
             Mirrors the home page HeroSection layout & overlay approach
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative flex flex-col min-h-[90vh] md:min-h-screen overflow-hidden">

        {/* ── Background image — fully visible, no dark wash ────────── */}
        <div className="absolute inset-0">
          <Image
            src="/bathroom-02.webp"
            alt="Bathroom remodeling Tampa Bay"
            fill
            priority
            className="object-cover object-right"
            sizes="100vw"
          />

          {/* Single feather-light left scrim — only enough for text contrast.
              Right half stays 100 % clear so the bathroom photo shines. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.22) 35%, rgba(0,0,0,0.06) 60%, rgba(0,0,0,0.00) 80%)',
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
              className="max-w-xl lg:max-w-2xl"
            >
              {/* Gold italic serif script */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`text-xl sm:text-2xl italic text-gold-light mb-3 ${serif}`}
                style={{ textShadow: '0 0 16px rgba(0,0,0,0.95), 0 0 32px rgba(0,0,0,0.85), 0 2px 6px rgba(0,0,0,0.95)' }}
              >
                Beautiful. Functional. Built for You.
              </motion.p>

              {/* Location badge */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="inline-flex items-center gap-2 mb-5"
              >
                <MapPin className="w-4 h-4 text-white shrink-0" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.7))' }} />
                <span
                  className="text-xs font-bold uppercase tracking-[0.18em] text-white"
                  style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8), 0 0 3px rgba(0,0,0,0.6)' }}
                >
                  Serving Tampa Bay from Our Valrico Showroom
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className={`text-3xl sm:text-4xl md:text-[3rem] lg:text-[3.5rem] font-extrabold text-white leading-[1.1] mb-4 ${serif}`}
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 1px 6px rgba(0,0,0,0.7)' }}
              >
                Bathroom Remodeling Tampa –{' '}
                <span className="text-gold-light">Custom Vanities &amp; Renovation Solutions</span>
              </motion.h1>

              {/* Gold accent divider */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.22 }}
                className="flex items-center gap-3 mb-5"
              >
                <div className="h-0.75 w-10 rounded-full bg-gold" />
                <div className="h-px w-24 rounded-full bg-white/40" />
              </motion.div>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.28 }}
                className="text-white text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-lg"
                style={{ textShadow: '0 1px 10px rgba(0,0,0,0.75), 0 0 4px rgba(0,0,0,0.5)' }}
              >
                Transform your bathroom with custom vanities, premium countertops, modern fixtures,
                and professional renovation solutions designed around your lifestyle.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.38 }}
                className="flex flex-col sm:flex-row gap-3 mb-7"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white hover:bg-white/15 font-bold uppercase tracking-widest text-sm h-14 px-7 rounded-lg transition-colors whitespace-nowrap"
                  style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
                >
                  Visit Our Valrico Showroom
                </Link>
                <a
                  href="tel:+18136512333"
                  className="inline-flex items-center justify-center gap-2 bg-olive hover:bg-olive-mid text-white font-bold uppercase tracking-widest text-sm h-14 px-8 rounded-lg transition-colors shadow-xl shadow-black/40 whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  (813) 651-2333
                </a>
              </motion.div>

              {/* Trust items — inline, pipe-separated, no background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center flex-wrap gap-y-2"
              >
                {TRUST_ITEMS.map(({ icon: Icon, label }, i) => (
                  <span key={label} className="inline-flex items-center">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white"
                      style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
                    >
                      <Icon
                        className="w-4 h-4 text-white shrink-0"
                        style={{ filter: 'drop-shadow(0 0 3px rgba(201,169,110,0.9))' }}
                      />
                      {label}
                    </span>
                    {i < TRUST_ITEMS.length - 1 && (
                      <span className="mx-3 text-white/40 font-light select-none">|</span>
                    )}
                  </span>
                ))}
              </motion.div>

            </motion.div>
          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. TRUSTED PARTNER — image left | text right
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container-custom max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — bathroom image */}
            <FadeIn className="relative">
              <div className="relative w-full aspect-4/3 lg:aspect-5/4 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/bathroom-remodeling-2.jpg"
                  alt="Your trusted bathroom remodeling partner Tampa Bay"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-2xl bg-olive/8 -z-10 hidden lg:block" />
            </FadeIn>

            {/* Right — text */}
            <FadeIn delay={0.12} className="flex flex-col gap-5">
              <div>
                <SectionLabel>Your Trusted</SectionLabel>
                <h2 className={`text-3xl sm:text-4xl md:text-[2.6rem] font-extrabold text-gray-900 leading-tight ${serif}`}>
                  Bathroom Remodeling Partner{' '}
                  <span className="text-olive">in Tampa Bay</span>
                </h2>
              </div>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
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
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-olive hover:bg-olive-mid text-white font-bold uppercase tracking-widest text-sm h-12 px-7 rounded-lg transition-colors shadow-md shadow-olive/20"
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
          3. WHY HOMEOWNERS CHOOSE — horizontal feature bar with dividers
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-white border-y border-gray-100">
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
                  <div className="w-13 h-13 rounded-full border border-olive/25 bg-olive-light/50 flex items-center justify-center mb-4 group-hover:border-olive/50 group-hover:bg-olive-light transition-colors duration-200">
                    <Icon className="w-5 h-5 text-olive" strokeWidth={1.5} />
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
          4. COMPREHENSIVE SERVICES — image cards (3-col grid)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-12">
            <SectionLabel>What We Offer</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 max-w-2xl mx-auto leading-tight ${serif}`}>
              Comprehensive Bathroom Remodeling{' '}
              <span className="text-olive">Services</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ image, alt, title, body }, i) => (
              <FadeIn key={title} delay={i * 0.07}>
                <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="relative w-full aspect-4/3 overflow-hidden">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <h3 className={`font-bold text-gray-900 text-lg leading-snug ${serif}`}>{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{body}</p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-olive font-semibold text-sm hover:gap-2.5 transition-all duration-200 mt-auto"
                    >
                      Learn More <ChevronRight className="w-4 h-4" />
                    </Link>
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
                  className="inline-flex items-center gap-2 bg-white border border-olive/20 text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm hover:border-olive hover:text-olive transition-colors cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-olive shrink-0" />
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
              className="inline-flex items-center gap-2 border-2 border-olive text-olive hover:bg-olive hover:text-white font-bold uppercase tracking-widest text-sm h-12 px-8 rounded-lg transition-colors"
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
                  <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-olive opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              <span className="text-olive">Bathroom Vision to Life</span>
            </h2>
          </FadeIn>

          <div className="relative">

            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-9 left-[8%] right-[8%] h-px bg-linear-to-r from-transparent via-olive/25 to-transparent z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
              {PROCESS_STEPS.map(({ step, icon: Icon, title, description }, i) => (
                <FadeIn key={step} delay={i * 0.09}>
                  <div className="relative z-10 flex flex-col items-center text-center gap-4">

                    {/* Step circle */}
                    <div className="relative">
                      <div className="w-18 h-18 rounded-full bg-olive shadow-lg shadow-olive/20 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      {/* Step number badge */}
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-olive text-olive text-[10px] font-extrabold flex items-center justify-center leading-none">
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
                <span className="text-olive">Tampa Bay</span>
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
                    <span className="w-5 h-5 rounded-full bg-olive-light flex items-center justify-center shrink-0">
                      <MapPin className="w-3 h-3 text-olive" />
                    </span>
                    {area}
                  </span>
                ))}

                {/* "And all surrounding…" spans full width */}
                <span className="flex items-center gap-2 text-olive text-sm font-semibold col-span-2 mt-1">
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
                  className="inline-flex items-center justify-center gap-2 bg-olive hover:bg-olive-mid text-white font-bold uppercase tracking-widest text-xs h-11 px-5 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
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
          9. FAQ — olive accent variant on white background
      ════════════════════════════════════════════════════════════════════ */}
      <FAQSection faqs={FAQS} title="Frequently Asked Questions" variant="olive" />

      {/* ════════════════════════════════════════════════════════════════════
          10. FINAL CTA — dark olive gradient
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">

        {/* Background photo + olive gradient overlay */}
        <div className="absolute inset-0">
          <Image
            src="/bathroom-remodel-5.jpg"
            alt="Start your bathroom remodeling project Tampa Bay"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 olive-gradient opacity-92" />
        </div>

        <div className="relative z-10 container-custom max-w-3xl text-center">
          <FadeIn>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/70 mb-4">
              <span className="w-6 h-px bg-white/50 inline-block" />
              Tampa Bay Bathroom Experts
              <span className="w-6 h-px bg-white/50 inline-block" />
            </p>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5 ${serif}`}>
              Start Your Bathroom Remodeling{' '}
              <span className="text-gold-light">Project Today</span>
            </h2>
            <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-9 max-w-2xl mx-auto">
              Whether you&rsquo;re updating an outdated bathroom, improving storage, or planning a
              complete renovation, Cabinets &amp; Remodeling Depot is here to help. Visit our
              Valrico showroom to explore bathroom vanities, countertops, faucets, and design options
              while working with a team committed to creating beautiful, functional bathrooms tailored
              to your needs and lifestyle.
            </p>
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-olive hover:bg-white/90 font-bold uppercase tracking-widest text-sm h-14 px-10 rounded-lg transition-colors shadow-lg"
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
