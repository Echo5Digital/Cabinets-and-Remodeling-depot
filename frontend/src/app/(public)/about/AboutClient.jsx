'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  MapPin,
  Calendar,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Palette,
  Wrench,
  ShieldCheck,
  DollarSign,
  Users,
  Store,
  ClipboardList,
  Hammer,
} from 'lucide-react'
import { usePageContent } from '@/hooks/usePageContent'
import { UnderConstruction } from '@/components/common/UnderConstruction'
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

/* ─── Section label ──────────────────────────────────────────────────────────── */
function SectionLabel({ children, light = false }) {
  return (
    <p className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] mb-3 ${light ? 'text-white/80' : 'text-primary'}`}>
      <span className={`w-6 h-px inline-block ${light ? 'bg-white/60' : 'bg-primary'}`} />
      {children}
      <span className={`w-6 h-px inline-block ${light ? 'bg-white/60' : 'bg-primary'}`} />
    </p>
  )
}

/* ─── Shared serif class ─────────────────────────────────────────────────────── */
const serif = 'font-[family-name:var(--font-playfair)]'

/* ─── Static data ────────────────────────────────────────────────────────────── */
const WHY_CHOOSE = [
  {
    icon: Calendar,
    title: '20+ Years of Experience',
    description: 'Since 2005, we\'ve proudly served Tampa Bay homeowners with trusted remodeling expertise, quality workmanship, and dependable service.',
  },
  {
    icon: Store,
    title: 'One-Stop Remodeling Solution',
    description: 'From cabinets and countertops to flooring and complete renovations, everything you need for your remodeling project is available in one convenient showroom.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Products You Can Trust',
    description: 'We carefully select premium materials and products designed for durability, beauty, and long-term performance.',
  },
  {
    icon: Wrench,
    title: 'Expert Design & Installation',
    description: 'Our experienced professionals combine thoughtful design with precise installation to ensure exceptional results from start to finish.',
  },
  {
    icon: Users,
    title: 'Customer-First Approach',
    description: 'Every remodeling project begins by listening to your ideas, understanding your goals, and creating solutions tailored to your lifestyle.',
  },
  {
    icon: DollarSign,
    title: 'Competitive Pricing & Great Value',
    description: 'We believe exceptional remodeling should offer lasting value. Our team provides honest recommendations and quality solutions to fit a variety of budgets.',
  },
]

const PROCESS_STEPS = [
  {
    step: '1',
    icon: MessageSquare,
    title: 'Consult',
    description: 'We begin with a personalized consultation to understand your vision, discuss your goals, and evaluate your space.',
  },
  {
    step: '2',
    icon: Palette,
    title: 'Design',
    description: 'Our design specialists help you select cabinetry, countertops, flooring, finishes, and layouts that complement your home\'s style and your daily needs.',
  },
  {
    step: '3',
    icon: ClipboardList,
    title: 'Plan',
    description: 'Once your selections are finalized, we develop a detailed project plan, timeline, and installation schedule to ensure a smooth remodeling experience.',
  },
  {
    step: '4',
    icon: Hammer,
    title: 'Build',
    description: 'Our skilled craftsmen complete every phase of your project with precision, professionalism, and close attention to detail.',
  },
  {
    step: '5',
    icon: CheckCircle,
    title: 'Enjoy',
    description: 'The final result is a beautifully finished space designed to enhance your home\'s comfort, functionality, and value for years to come.',
  },
]

const HOURS = [
  { day: 'Monday – Friday', hours: '10:00 AM – 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM – 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
]

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function AboutClient() {
  const { data: pageData, isError, isLoading } = usePageContent('about')
  if (isLoading) return null
  if (isError) return <UnderConstruction />

  const sections = mergeWithPageDefaults('about', normalizeContent(pageData?.content).sections)
  const heroSec = sections.find(s => s.id === 'about-hero')
  const ctaSec  = sections.find(s => s.id === 'about-cta')

  const heroTitle    = heroSec?.title    || 'Building Beautiful Homes Since 2005'
  const heroSubtitle = heroSec?.subtitle || 'About Cabinets & Remodeling Depot'
  const heroBg       = heroSec?.backgroundImage || '/kitchen-remodeling-hero.webp'

  const ctaHeading = ctaSec?.heading || 'Ready to Transform Your Home?'
  const ctaBody    = ctaSec?.body    || 'Your dream home starts with the right team. Whether you\'re planning a kitchen remodel, bathroom renovation, new flooring, or custom cabinetry, Cabinets & Remodeling Depot is here to bring your vision to life with expert craftsmanship and personalized service.'

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. HERO — full viewport, background image
             Mirrors Kitchen Cabinets page hero layout & overlay
      ════════════════════════════════════════════════════════════════════ */}
      <section id="about-hero" className="relative flex flex-col min-h-[75vh] md:min-h-[80vh] overflow-hidden">

        {/* Background image — no dark wash on right, text-contrast scrim on left */}
        <div className="absolute inset-0">
          <Image
            src={heroBg}
            alt="Cabinets & Remodeling Depot Tampa Bay — Building Beautiful Homes Since 2005"
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

        {/* Main content */}
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
                  Serving Tampa Bay Since 2005
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className={`font-extrabold leading-[1.08] mb-5 ${serif}`}
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.72), 0 1px 6px rgba(0,0,0,0.62)' }}
              >
                <span className="block text-white text-3xl sm:text-4xl md:text-[3.1rem] lg:text-[3.5rem]">
                  Building Beautiful Homes
                </span>
                <span className="block text-gold text-2xl sm:text-[1.7rem] md:text-[2.5rem] lg:text-[2.8rem] mt-1.5 leading-[1.1]">
                  Since 2005
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
                For over two decades, Cabinets &amp; Remodeling Depot has helped homeowners across
                Tampa Bay transform their kitchens, bathrooms, and living spaces with exceptional
                craftsmanship, premium materials, and personalized remodeling solutions. From custom
                cabinetry and countertops to complete home renovations, we&apos;re committed to
                delivering spaces that are as functional as they are beautiful.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/94 text-gray-900 hover:text-primary font-bold uppercase tracking-widest text-sm h-12 px-9 rounded-lg transition-all duration-300 whitespace-nowrap shadow-xl shadow-black/30"
                >
                  Visit Our Showroom
                </Link>
                <a
                  href="tel:+18136512333"
                  className="inline-flex items-center justify-center gap-2 border border-primary/65 text-white hover:bg-primary/10 font-semibold uppercase tracking-widest text-sm h-12 px-9 rounded-lg transition-all duration-300 whitespace-nowrap backdrop-blur-sm"
                >
                  <Phone className="w-4 h-4 shrink-0 text-primary/80" />
                  Call (813) 651-2333
                </a>
              </motion.div>

            </motion.div>
          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. OUR STORY — 2-col layout with image
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — text */}
            <FadeIn>
              <SectionLabel>Our Story</SectionLabel>
              <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4 ${serif}`}>
                A Passion for Quality.{' '}
                <span className="text-primary">A Commitment to You.</span>
              </h2>
              <div className="w-14 h-1 bg-primary rounded-full mb-7" />
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Founded in 2005, Cabinets &amp; Remodeling Depot began with a simple vision: to
                  provide homeowners with high-quality cabinetry and remodeling solutions backed by
                  honest service and expert craftsmanship.
                </p>
                <p>
                  What started as a cabinet-focused business has grown into a trusted, full-service
                  remodeling company serving homeowners throughout Tampa Bay. Over the years, we&apos;ve
                  expanded our expertise to include kitchen remodeling, bathroom remodeling, custom
                  cabinetry, countertops, flooring, and complete renovation solutions—all under one
                  roof.
                </p>
                <p>
                  We believe remodeling should be an exciting experience, not a stressful one.
                  That&apos;s why our team works closely with every client, guiding them from the
                  initial consultation and design phase to material selection and professional
                  installation. Every detail matters, and every project is completed with the same
                  level of care and attention we would give our own homes.
                </p>
                <p>
                  Whether you&apos;re updating a single room or transforming your entire home, our
                  goal remains the same: delivering beautiful spaces built to last.
                </p>
              </div>
            </FadeIn>

            {/* Right — image */}
            <FadeIn delay={0.15} className="lg:sticky lg:top-28">
              <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/gti.webp"
                  alt="Cabinets & Remodeling Depot showroom Tampa Bay"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-4 shadow-lg">
                  <p className="text-primary font-extrabold text-2xl leading-none">20+</p>
                  <p className="text-gray-700 text-xs font-semibold uppercase tracking-wide mt-1">Years of Experience</p>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. WHY HOMEOWNERS CHOOSE US — 6-card grid
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#F5F0E8] border-y border-[#E8DFD0]">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-12">
            <SectionLabel>Why Homeowners Choose Us</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 ${serif}`}>
              The Cabinets &amp; Remodeling Depot Difference
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE.map(({ icon: Icon, title, description }, i) => (
              <FadeIn key={title} delay={i * 0.07}>
                <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow duration-200 h-full group">
                  <div className="w-12 h-12 rounded-full bg-primary/8 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/12 group-hover:border-primary/40 transition-colors duration-200">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className={`font-bold text-gray-900 text-base sm:text-lg mb-2 leading-snug ${serif}`}>
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. OUR PROCESS — 5 numbered steps with connecting line
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-14">
            <SectionLabel>Our Process</SectionLabel>
            <h2 className={`text-3xl sm:text-4xl font-extrabold text-gray-900 ${serif}`}>
              How We Bring Your{' '}
              <span className="text-primary">Vision to Life</span>
            </h2>
          </FadeIn>

          <div className="relative">
            {/* Connecting line — desktop only */}
            <div className="hidden lg:block absolute top-9 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
              {PROCESS_STEPS.map(({ step, icon: Icon, title, description }, i) => (
                <FadeIn key={step} delay={i * 0.09}>
                  <div className="relative z-10 flex flex-col items-center text-center gap-4">
                    <div className="relative">
                      <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-primary shadow-lg shadow-primary/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-primary text-primary text-[10px] font-extrabold flex items-center justify-center leading-none">
                        {step}
                      </span>
                    </div>
                    <div>
                      <h3 className={`font-bold text-gray-900 text-base mb-1.5 ${serif}`}>{title}</h3>
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
          5. VISIT OUR SHOWROOM — dark full-bleed section
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/cabinet-instock.webp"
            alt="Visit our Valrico showroom"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 container-custom max-w-7xl">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">

            {/* Left — main info (3 cols) */}
            <div className="lg:col-span-3">
              <FadeIn>
                <SectionLabel light>Visit Our Showroom</SectionLabel>
                <h2 className={`text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4 ${serif}`}>
                  Experience Quality in Person
                </h2>
                <div className="w-14 h-1 bg-primary rounded-full mb-6" />
                <div className="space-y-4 text-white/80 text-sm sm:text-base leading-relaxed mb-8">
                  <p>
                    Experience the quality of our products in person. Visit our Valrico showroom to
                    explore an extensive selection of kitchen cabinets, bathroom vanities,
                    countertops, flooring, hardware, and design inspiration. Our knowledgeable team
                    is here to answer your questions, help you compare materials, and guide you
                    toward the perfect solution for your home.
                  </p>
                  <p>
                    Whether you&apos;re planning a complete remodel or simply gathering ideas, our
                    showroom is the perfect place to begin your journey.
                  </p>
                </div>

                <Link
                  href="https://maps.google.com/?q=106+S+St+Cloud+Ave+Valrico+FL+33594"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm h-12 px-8 rounded-lg transition-colors shadow-lg shadow-primary/30"
                >
                  Get Directions
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </FadeIn>
            </div>

            {/* Right — contact details (2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* Address */}
              <FadeIn delay={0.1}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5 sm:p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-primary/30 border border-primary/50 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Showroom Address</p>
                      <p className="text-white font-semibold text-sm leading-relaxed">
                        106 S St Cloud Ave<br />Valrico, FL 33594
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-primary/30 border border-primary/50 flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Phone</p>
                      <a href="tel:+18136512333" className="text-white font-semibold text-sm hover:text-primary transition-colors">
                        (813) 651-2333
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/30 border border-primary/50 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Email</p>
                      <a href="mailto:sales@cabinetsandremodelingdepot.com" className="text-white font-semibold text-sm hover:text-primary transition-colors break-all">
                        sales@cabinetsandremodelingdepot.com
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Hours */}
              <FadeIn delay={0.18}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-primary" />
                    <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Hours of Operation</p>
                  </div>
                  <div className="space-y-3">
                    {HOURS.map(({ day, hours }) => (
                      <div key={day} className="flex items-center justify-between gap-4">
                        <span className="text-white/80 text-sm font-medium">{day}</span>
                        <span className={`text-sm font-bold ${hours === 'Closed' ? 'text-white/40' : 'text-white'}`}>{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. FINAL CTA — light overlay
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/kitchen_cabinet_remodeling-01.webp"
            alt="Ready to transform your home"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/80" />
        </div>

        <div className="relative z-10 container-custom max-w-3xl text-center px-4">
          <FadeIn>
            {/* Gold label */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="flex-1 max-w-[3.75rem] sm:max-w-[5.625rem] h-px bg-primary" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary whitespace-nowrap">
                Tampa Bay Remodeling Experts
              </p>
              <span className="flex-1 max-w-[3.75rem] sm:max-w-[5.625rem] h-px bg-primary" />
            </div>

            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-5 ${serif}`}>
              {ctaHeading}
            </h2>

            <p className="text-gray-700 font-medium text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              {ctaBody}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm h-13 px-9 rounded-lg transition-colors shadow-lg shadow-primary/30 whitespace-nowrap"
              >
                Schedule a Consultation
              </Link>
              <a
                href="tel:+18136512333"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-sm h-13 px-9 rounded-lg transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 shrink-0" />
                Call Us Today
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
