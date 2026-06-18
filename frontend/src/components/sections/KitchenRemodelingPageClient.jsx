'use client'

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
  Check,
  ArrowRight,
  ClipboardList,
  Hammer,
  Search,
  MessageSquare,
  Settings2,
  ChevronRight,
  Quote,
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
    name: 'James T.',
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

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function KitchenRemodelingPageClient() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. HERO — split: left text | right kitchen image
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-105 sm:min-h-120 md:min-h-135 overflow-hidden flex items-center">

        {/* Background kitchen photo */}
        <Image
          src="/kitchen-remodeling-banner-new2.webp"
          alt="Kitchen remodeling Tampa Bay"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Gradient: fully opaque white on left → transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/97 to-white/10 lg:from-white lg:via-white/90 lg:to-transparent" />
        {/* Extra overlay for small screens so text is always readable */}
        <div className="absolute inset-0 bg-white/50 lg:hidden" />

        {/* Content */}
        <div className="relative z-10 w-full flex items-center py-14 md:py-20">
          <div className="container-custom max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-xl xl:max-w-2xl"
            >
              {/* Pre-headline */}
              <div className="inline-flex items-center gap-2 mb-5">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Serving Tampa Bay from Our Valrico Showroom
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-4xl sm:text-5xl md:text-[3.4rem] lg:text-[3.8rem] font-extrabold text-gray-900 leading-[1.08] mb-5">
                Kitchen Remodeling{' '}
                <span className="text-primary">in Tampa Bay</span>
              </h1>

              {/* Subheadline */}
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
                Transform your kitchen with custom cabinetry, premium countertops, and professional
                remodeling solutions tailored to your style, needs, and budget.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8">
                {TRUST_ITEMS.map(({ icon: Icon, label }, i) => (
                  <span key={label} className="flex items-center gap-1.5 text-gray-700 text-sm font-medium">
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    {label}
                    {i < TRUST_ITEMS.length - 1 && (
                      <span className="ml-4 hidden sm:inline w-px h-4 bg-gray-300" />
                    )}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm h-14 px-8 rounded-lg transition-colors shadow-md shadow-primary/25"
                >
                  Get a Free Estimate
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-sm h-14 px-8 rounded-lg transition-colors bg-white/80"
                >
                  Visit Our Showroom
                </Link>
              </div>
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

            {/* Left — kitchen image */}
            <FadeIn className="relative">
              <div className="relative w-full aspect-[4/3] lg:aspect-[5/4] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/Modern-kitchen-renovation-Tampa-completed-project.jpg"
                  alt="Your trusted kitchen remodeling partner Tampa Bay"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-2xl bg-primary/10 -z-10 hidden lg:block" />
            </FadeIn>

            {/* Right — text */}
            <FadeIn delay={0.12} className="flex flex-col gap-5">
              <div>
                <SectionLabel>Your Trusted</SectionLabel>
                <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-extrabold text-gray-900 leading-tight">
                  Kitchen Remodeling Partner{' '}
                  <span className="text-primary">in Tampa Bay</span>
                </h2>
              </div>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
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
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm h-12 px-7 rounded-lg transition-colors shadow-md shadow-primary/25"
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
          3. WHY HOMEOWNERS CHOOSE — 5 horizontal cards
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-12">
            <SectionLabel>Why Homeowners Choose</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Cabinets &amp; Remodeling Depot
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {WHY_CHOOSE.map(({ icon: Icon, title, description }, i) => (
              <FadeIn key={title} delay={i * 0.07}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center gap-4 h-full hover:shadow-md hover:border-primary/20 transition-shadow duration-200">
                  {/* Icon ring */}
                  <div className="w-14 h-14 rounded-full border-2 border-primary/20 bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base mb-2 leading-snug">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. COMPREHENSIVE SERVICES — image cards
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-12">
            <SectionLabel>Comprehensive Kitchen Remodeling Services</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 max-w-2xl mx-auto leading-tight">
              Everything You Need for Your{' '}
              <span className="text-primary">Dream Kitchen</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(({ image, alt, title, description, href }, i) => (
              <FadeIn key={title} delay={i * 0.07}>
                <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <h3 className="font-bold text-gray-900 text-lg leading-snug">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">{description}</p>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-2.5 transition-all duration-200 mt-auto"
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
          5. KITCHEN DESIGN INSPIRATION — image gallery
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-10">
            <SectionLabel>Kitchen Design Inspiration</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              See What&apos;s Possible for Your Kitchen
            </h2>
          </FadeIn>

          {/* Gallery row */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {GALLERY.map(({ src, alt }, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
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
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-14">
            <SectionLabel>Our Kitchen Remodeling Process</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              How We Bring Your{' '}
              <span className="text-primary">Kitchen Vision to Life</span>
            </h2>
          </FadeIn>

          {/* Steps */}
          <div className="relative">

            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-9 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
              {PROCESS_STEPS.map(({ step, icon: Icon, title, description }, i) => (
                <FadeIn key={step} delay={i * 0.09}>
                  <div className="relative z-10 flex flex-col items-center text-center gap-4">

                    {/* Step circle */}
                    <div className="relative">
                      <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center">
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
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left — service areas + map */}
            <FadeIn>
              <SectionLabel>Our Service Area</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
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
              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-7">
                {SERVICE_AREAS.map((area) => (
                  <span key={area} className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
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
          9. FINAL CTA — dark brand background
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/kitchen_cabinet_remodeling-01.webp"
            alt="Start your kitchen remodeling project Tampa Bay"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 brand-gradient opacity-90" />
        </div>

        <div className="relative z-10 container-custom max-w-3xl text-center">
          <FadeIn>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/70 mb-4">
              <span className="w-6 h-px bg-white/50 inline-block" />
              Tampa Bay Kitchen Experts
              <span className="w-6 h-px bg-white/50 inline-block" />
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
              Start Your Kitchen Remodeling{' '}
              <span className="text-white/80">Project Today</span>
            </h2>
            <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-9 max-w-2xl mx-auto">
              If you&rsquo;re planning a kitchen remodel in Tampa or considering a complete kitchen
              renovation, Cabinets &amp; Remodeling Depot is here to help. Visit our Valrico
              showroom, explore quality products, and work with a team committed to delivering
              beautiful, functional results tailored to your home and lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary hover:bg-white/90 font-bold uppercase tracking-widest text-sm h-14 px-9 rounded-lg transition-colors shadow-lg"
              >
                Visit Our Showroom
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary font-bold uppercase tracking-widest text-sm h-14 px-9 rounded-lg transition-colors"
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
