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
  ShieldCheck,
  Palette,
  CheckCircle,
  Check,
  ArrowRight,
  ClipboardList,
  Hammer,
  MessageSquare,
  Settings2,
  Layers,
  Home,
  Droplets,
  TrendingUp,
  Sparkles,
  Eye,
  ChevronRight,
} from 'lucide-react'

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
  { icon: TrendingUp,  label: 'Improved Home Value' },
  { icon: Sparkles,    label: 'Easier Cleaning & Maintenance' },
  { icon: ShieldCheck, label: 'Better Durability' },
  { icon: Palette,     label: 'Modernized Interior Design' },
  { icon: Droplets,    label: 'Moisture Resistance' },
  { icon: Home,        label: 'Increased Comfort' },
  { icon: Eye,         label: 'Enhanced Visual Appeal' },
  { icon: Layers,      label: 'Better Flow Between Rooms' },
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

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function FlooringPageClient() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[440px] sm:min-h-[500px] md:min-h-[560px] overflow-hidden flex items-center">

        {/* Background photo */}
        <Image
          src="/flooring-in-tampa.jpg"
          alt="Flooring Tampa Bay – Hardwood, Tile and Laminate"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* White gradient: left solid → transparent right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/10 lg:from-white lg:via-white/90 lg:to-transparent" />
        {/* Extra soft overlay on small screens for readability */}
        <div className="absolute inset-0 bg-white/55 lg:hidden" />

        {/* Content */}
        <div className="relative z-10 w-full py-14 md:py-20">
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
              <h1 className="text-3xl sm:text-4xl md:text-[3rem] lg:text-[3.4rem] font-extrabold text-gray-900 leading-[1.1] mb-5">
                Flooring Tampa {' '}
                <span className="text-primary">Hardwood, Tile &amp; Laminate</span>{' '}
                Flooring Solutions
              </h1>

              {/* Subheadline */}
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
                Upgrade your home with hardwood, laminate, tile, and professionally installed
                flooring solutions designed for beauty, durability, and everyday living.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 mb-8">
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

              {/* CTA button */}
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm h-14 px-8 rounded-lg transition-colors shadow-md shadow-primary/25"
                >
                  Visit Our Valrico Showroom
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. YOUR TRUSTED FLOORING PARTNER IN TAMPA BAY
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container-custom max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — image */}
            <FadeIn className="relative">
              <div className="relative w-full aspect-4/3 lg:aspect-5/4 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/Flooring-samples.jpg"
                  alt="Your trusted flooring partner Tampa Bay"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-2xl bg-primary/10 -z-10 hidden lg:block" />
            </FadeIn>

            {/* Right — text */}
            <FadeIn delay={0.12} className="flex flex-col gap-5">
              <div>
                <SectionLabel>Your Trusted Flooring Partner</SectionLabel>
                <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-extrabold text-gray-900 leading-tight">
                  Your Trusted Flooring Partner{' '}
                  <span className="text-primary">in Tampa Bay</span>
                </h2>
              </div>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Flooring changes the way a home feels almost immediately. It affects everything
                  from lighting and comfort to maintenance and long-term durability. At Cabinets &amp;
                  Remodeling Depot, we help homeowners throughout Tampa Bay choose flooring solutions
                  that not only look beautiful but also fit the way their homes are actually used.
                </p>
                <p>
                  Whether you&rsquo;re replacing outdated flooring, renovating a single room, or
                  planning a complete home update, our team provides practical flooring guidance,
                  material selection support, and professional installation services from our Valrico
                  showroom.
                </p>
                <p>
                  Every home has different needs. Some homeowners prioritize durability for pets and
                  children, while others focus on style, comfort, or low-maintenance materials. Our
                  goal is to help you find flooring that performs well while complementing your
                  home&rsquo;s overall design.
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
          3. WHY HOMEOWNERS CHOOSE — 5 cards
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
          4. FLOORING OPTIONS AVAILABLE — image cards
      ════════════════════════════════════════════════════════════════════ */}
      <section id="flooring-options" className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-12">
            <SectionLabel>Flooring Options Available</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 max-w-2xl mx-auto leading-tight">
              Find the Right Flooring{' '}
              <span className="text-primary">for Your Home</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {FLOORING_OPTIONS.map(({ image, alt, title, description, href }, i) => (
              <FadeIn key={title} delay={i * 0.07}>
                <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="relative w-full aspect-4/3 overflow-hidden">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                    />
                  </div>
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
          5. EXPLORE FLOORING OPTIONS IN PERSON — split layout
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
        <div className="container-custom max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — text */}
            <FadeIn className="flex flex-col gap-5 order-2 lg:order-1">
              <div>
                <SectionLabel>Visit Our Showroom</SectionLabel>
                <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-extrabold text-gray-900 leading-tight">
                  Explore Flooring Options{' '}
                  <span className="text-primary">in Person</span>
                </h2>
              </div>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
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

              <div>
                <p className="font-bold text-gray-900 mb-3 text-base">You can compare:</p>
                <ul className="space-y-2">
                  {SHOWROOM_COMPARE.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-gray-700 text-sm font-medium">
                      <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm h-12 px-7 rounded-lg transition-colors shadow-md shadow-primary/25"
                >
                  Visit Our Valrico Showroom
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>

            {/* Right — image */}
            <FadeIn delay={0.12} className="relative order-1 lg:order-2">
              <div className="relative w-full aspect-4/3 lg:aspect-5/4 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/engineered-wood-flooring-768x480-1.jpg"
                  alt="Explore flooring options at our Valrico showroom Tampa Bay"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-28 h-28 rounded-2xl bg-primary/10 -z-10 hidden lg:block" />
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. FLOORING DESIGN INSPIRATION — Pinterest-style gallery
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-8">
            <SectionLabel>Flooring Design Inspiration</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Visualize Your Ideal Space
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
              Whether you prefer warm natural wood tones, sleek contemporary finishes, or durable
              waterproof solutions, exploring different flooring styles can help you visualize your
              ideal space.
            </p>
          </FadeIn>

          {/* Popular styles — pill tags */}
          <FadeIn delay={0.08}>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
              {INSPIRATION_STYLES.map((style) => (
                <span
                  key={style}
                  className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full"
                >
                  <Check className="w-3 h-3 shrink-0" />
                  {style}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Pinterest-style gallery */}
          <FadeIn delay={0.12}>
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

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          7. BENEFITS OF NEW FLOORING — icon grid
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-12">
            <SectionLabel>Benefits of New Flooring</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Why Upgrade Your{' '}
              <span className="text-primary">Flooring</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
              Upgrading flooring can improve both the appearance and functionality of your home.
              New flooring often becomes one of the most noticeable improvements homeowners make
              during a renovation project.
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
            {BENEFITS.map(({ icon: Icon, label }, i) => (
              <FadeIn key={label} delay={i * 0.06}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center gap-3 hover:shadow-md hover:border-primary/20 transition-shadow duration-200">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-semibold text-gray-800 text-sm leading-snug">{label}</p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          8. OUR FLOORING INSTALLATION PROCESS — 5 numbered steps
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-7xl">

          <FadeIn className="text-center mb-14">
            <SectionLabel>Our Flooring Installation Process</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              How We Bring Your{' '}
              <span className="text-primary">Flooring Vision to Life</span>
            </h2>
          </FadeIn>

          <div className="relative">
            {/* Connector line (desktop only) */}
            <div className="hidden lg:block absolute top-9 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
              {PROCESS_STEPS.map(({ step, icon: Icon, title, description }, i) => (
                <FadeIn key={step} delay={i * 0.09}>
                  <div className="relative z-10 flex flex-col items-center text-center gap-4">
                    <div className="relative">
                      <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center">
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
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left — text + area grid */}
            <FadeIn>
              <SectionLabel>Our Service Area</SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
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

              <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
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
      <FAQSection faqs={FAQS} title="Frequently Asked Questions" />

      {/* ════════════════════════════════════════════════════════════════════
          11. START YOUR FLOORING PROJECT TODAY — final CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">

        <div className="absolute inset-0">
          <Image
            src="/flooring-2.jpg"
            alt="Start your flooring project Tampa Bay"
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
              Tampa Bay Flooring Experts
              <span className="w-6 h-px bg-white/50 inline-block" />
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
              Start Your Flooring Project{' '}
              <span className="text-white/80">Today</span>
            </h2>
            <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-9 max-w-2xl mx-auto">
              Whether you&rsquo;re replacing flooring in a single room or updating your entire home,
              Cabinets &amp; Remodeling Depot is here to help. Visit our Valrico showroom to compare
              flooring materials, explore design options, and work with a team committed to creating
              beautiful, durable spaces built around your lifestyle and budget.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary hover:bg-white/90 font-bold uppercase tracking-widest text-sm h-14 px-8 rounded-lg transition-colors shadow-lg"
              >
                Visit Our Valrico Showroom
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary font-bold uppercase tracking-widest text-sm h-14 px-8 rounded-lg transition-colors"
              >
                Schedule a Free Flooring Consultation
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white hover:bg-white hover:text-primary font-bold uppercase tracking-widest text-sm h-14 px-8 rounded-lg transition-colors"
              >
                Request Flooring Pricing
              </Link>
            </div>
          </FadeIn>
        </div>

      </section>

    </>
  )
}
