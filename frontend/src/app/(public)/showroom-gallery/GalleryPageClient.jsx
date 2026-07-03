'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useGallery } from '@/hooks/useGallery'
import { GalleryGrid } from '@/components/sections/GalleryGrid'
import { TransformationSection } from '@/components/sections/TransformationSection'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ArrowRight,
  Star,
  Package,
  Wrench,
  Palette,
  ThumbsUp,
  MapPin,
  Clock,
  Quote,
} from 'lucide-react'
import { COMPANY_PHONE, COMPANY_PHONE_DISPLAY } from '@/lib/constants'

// ── Fade-in helper ─────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── 1. Hero Banner ─────────────────────────────────────────────────────────────
function GalleryHero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden min-h-[58vh] sm:min-h-[64vh]">
      {/* Background image */}
      <Image
        src="/cabinet-remodeling-shop.webp"
        alt="Cabinets & Remodeling Depot showroom gallery"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Layered overlay */}
      <div className="absolute inset-0 bg-black/55" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-custom text-center max-w-4xl px-4">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs sm:text-sm uppercase tracking-[0.22em] font-semibold text-white/70 mb-4"
        >
          Inspiration. Quality. Craftsmanship.
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
        >
          Our Project Gallery
        </motion.h1>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/80 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8"
        >
          Discover a collection of beautifully completed kitchen remodels, bathroom
          renovations, custom cabinetry, premium flooring, and countertop installations
          across Tampa and the surrounding areas. Every project showcases our dedication
          to exceptional craftsmanship, thoughtful design, and lasting quality.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link
            href="#gallery"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold uppercase tracking-widest text-sm px-8 py-3.5 rounded-sm hover:bg-primary/90 transition-colors duration-200 shadow-lg shadow-black/30"
          >
            View Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-white/65 text-white font-bold uppercase tracking-widest text-sm px-8 py-3.5 rounded-sm hover:bg-white hover:text-gray-900 transition-colors duration-200"
          >
            Book Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ── 2. Intro — "Real Projects. Real Results." ──────────────────────────────────
function GalleryIntro() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  return (
    <section ref={ref} className="section-padding" style={{ backgroundColor: '#F8F3ED' }}>
      <div className="container-custom max-w-4xl text-center">
        {/* Label with lines */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="h-px w-10 bg-primary/40" />
          <p className="text-xs uppercase tracking-[0.22em] font-bold text-primary">
            Real Projects. Real Results.
          </p>
          <div className="h-px w-10 bg-primary/40" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight"
        >
          Transforming Houses Into{' '}
          <span className="text-primary">Dream Homes</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 text-gray-600 leading-relaxed text-base sm:text-[17px]"
        >
          <p>
            Every home has a story, and every project in our gallery reflects our passion
            for creating beautiful, functional spaces tailored to our clients&apos;
            lifestyles. From elegant kitchens and luxurious bathrooms to custom cabinetry
            and premium flooring, our portfolio showcases the quality, precision, and
            attention to detail that define every remodel we complete.
          </p>
          <p>
            Browse our gallery for inspiration and imagine what&apos;s possible for your
            own home.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ── 3. Gallery section with filter ────────────────────────────────────────────
function GallerySection({ images, isPending, isError, refetch }) {
  return (
    <section id="gallery" className="pb-12 md:pb-20 bg-white">
      <div className="container-custom">

        {/* Section heading */}
        <FadeIn className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.22em] font-bold text-primary/60 mb-3">
            Gallery Categories
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Explore Our Finest Work
          </h2>
        </FadeIn>

        {isPending ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg break-inside-avoid" />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="mb-4">Unable to load gallery. Please check back shortly.</p>
            <button
              onClick={() => refetch()}
              className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors text-sm font-medium"
            >
              Try again
            </button>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            Gallery coming soon. Check back soon!
          </div>
        ) : (
          <GalleryGrid images={images} showFilter />
        )}
      </div>
    </section>
  )
}

// ── 4. Before & After wrapper ──────────────────────────────────────────────────
// Renders the existing TransformationSection with gallery-specific copy.
function BeforeAfterSection() {
  return (
    <div>
      <TransformationSection
        bgColor="#ffffff"
        data={{
          label: 'Before & After Transformations',
          heading: 'See the Incredible Difference Expert Remodeling Can Make',
          description:
            'Our before-and-after projects highlight how outdated spaces are transformed into modern, functional, and beautiful living environments through expert planning, quality materials, and skilled craftsmanship.',
        }}
      />

    </div>
  )
}

// ── 5. Why Choose Our Work ─────────────────────────────────────────────────────
const WHY_CHOOSE_ITEMS = [
  {
    icon: Package,
    title: 'Premium Materials',
    desc: 'We carefully select high-quality materials from trusted manufacturers to ensure beauty, durability, and long-lasting performance.',
  },
  {
    icon: Wrench,
    title: 'Expert Craftsmanship',
    desc: 'Our experienced remodeling professionals take pride in delivering exceptional workmanship with precision and attention to every detail.',
  },
  {
    icon: Palette,
    title: 'Custom Solutions',
    desc: "Every remodeling project is uniquely designed to complement your home's style, needs, and personal vision.",
  },
  {
    icon: ThumbsUp,
    title: 'Satisfaction Guaranteed',
    desc: 'Your satisfaction is our highest priority. We work closely with you from concept to completion to ensure outstanding results.',
  },
  {
    icon: MapPin,
    title: 'Local & Trusted',
    desc: 'Proudly serving homeowners throughout Tampa and nearby communities with honest service, quality craftsmanship, and dependable remodeling solutions.',
  },
  {
    icon: Clock,
    title: 'On-Time Project Completion',
    desc: 'We respect your schedule and strive to complete every project efficiently without compromising quality.',
  },
]

function WhyChooseWork() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 })
  return (
    <section ref={ref} className="py-16 md:py-24 border-y border-[#E8DFD0]" style={{ backgroundColor: '#F5F0E8' }}>
      <div className="container-custom max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] mb-3 text-primary">
            <span className="w-6 h-px inline-block bg-primary" />
            Why Choose Our Work
            <span className="w-6 h-px inline-block bg-primary" />
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Quality You Can See. Results You Can Trust.
          </h2>
        </motion.div>

        {/* Hairline-divided icon grid — matches About page exactly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#E8DFD0]">
          {WHY_CHOOSE_ITEMS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex flex-col items-center text-center px-6 py-8 gap-4 bg-warm-gray group hover:bg-white transition-colors duration-200 h-full"
            >
              {/* Circle icon */}
              <div className="w-16 h-16 rounded-full border-2 border-primary/20 bg-white flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors duration-200 shadow-sm">
                <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-200" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">{title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ── 6. Single Testimonial ──────────────────────────────────────────────────────
const GALLERY_REVIEWS = [
  {
    name: 'Maria G.',
    location: 'Brandon, FL',
    initials: 'MG',
    color: 'bg-rose-100 text-rose-700',
    rating: 5,
    project: 'Kitchen Remodel',
    text: 'Cabinets & Remodeling Depot completely transformed our outdated kitchen. The team was professional, responsive, and the finished result exceeded everything we imagined. We couldn\'t be happier with our new space!',
  },
  {
    name: 'James T.',
    location: 'Valrico, FL',
    initials: 'JT',
    color: 'bg-blue-100 text-blue-700',
    rating: 5,
    project: 'Bathroom Renovation',
    text: 'We had our master bathroom completely remodeled and the quality of work exceeded our expectations. The project was completed on time and within budget. Highly recommend this team to anyone in the Tampa Bay area!',
  },
  {
    name: 'Sandra P.',
    location: 'Tampa, FL',
    initials: 'SP',
    color: 'bg-amber-100 text-amber-700',
    rating: 5,
    project: 'Quartz Countertops',
    text: 'The quartz countertops they installed are absolutely gorgeous. The team was knowledgeable, helped us pick the perfect design, and the installation was flawless. Our kitchen looks like it belongs in a magazine!',
  },
  {
    name: 'Robert D.',
    location: 'Riverview, FL',
    initials: 'RD',
    color: 'bg-green-100 text-green-700',
    rating: 5,
    project: 'Custom Cabinets',
    text: 'From the first consultation to the final walkthrough, the experience was seamless. The custom cabinets fit perfectly and the craftsmanship is top notch. Our whole family loves the new look of our home.',
  },
  {
    name: 'Lisa M.',
    location: 'Plant City, FL',
    initials: 'LM',
    color: 'bg-purple-100 text-purple-700',
    rating: 5,
    project: 'Flooring Installation',
    text: 'We replaced all the flooring in our home and the results are stunning. The crew was clean, efficient, and respectful of our space. The price was fair and the quality is exceptional. Absolutely love it!',
  },
  {
    name: 'Carlos R.',
    location: 'Tampa, FL',
    initials: 'CR',
    color: 'bg-teal-100 text-teal-700',
    rating: 5,
    project: 'Full Kitchen & Bath',
    text: 'We did a full remodel covering the kitchen and two bathrooms. The team coordinated everything perfectly. Communication was excellent throughout. The showroom made picking materials so easy. 10/10 would recommend!',
  },
]

function ReviewCard({ review, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="h-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300"
    >
      {/* Top row: stars + quote icon */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex gap-0.5">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
        </div>
        <Quote className="h-7 w-7 text-primary/20 shrink-0" />
      </div>

      {/* Review text — grows to fill available space, wraps naturally */}
      <p className="text-gray-600 leading-relaxed text-sm italic grow whitespace-normal wrap-break-word">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Project tag */}
      <span className="shrink-0 self-start text-xs font-semibold uppercase tracking-wider text-primary/70 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
        {review.project}
      </span>

      {/* Attribution */}
      <div className="shrink-0 flex items-center gap-3 pt-2 border-t border-gray-100">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${review.color}`}>
          {review.initials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-gray-800 text-sm truncate">{review.name}</p>
          <p className="text-xs text-gray-400 truncate">{review.location}</p>
        </div>
      </div>
    </motion.div>
  )
}

function GalleryTestimonial() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 })
  return (
    <section ref={ref} className="section-padding" style={{ backgroundColor: '#F8F3ED' }}>
      <div className="container-custom">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-primary/30" />
            <p className="text-xs uppercase tracking-[0.22em] font-bold text-primary">
              Client Reviews
            </p>
            <div className="h-px w-10 bg-primary/30" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Hundreds of happy homeowners throughout Tampa Bay trust us with their remodeling projects.
          </p>
          {/* Star summary */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">5.0</span>
            <span className="text-sm text-gray-400">· 100+ verified reviews</span>
          </div>
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory sm:hidden">
          {GALLERY_REVIEWS.map((review, i) => (
            <div key={review.name} className="snap-start shrink-0 w-[78vw] flex flex-col">
              <ReviewCard review={review} index={i} inView={inView} />
            </div>
          ))}
        </div>

        {/* sm+: grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GALLERY_REVIEWS.map((review, i) => (
            <div key={review.name} className="flex flex-col">
              <ReviewCard review={review} index={i} inView={inView} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ── 7. Final CTA ───────────────────────────────────────────────────────────────
function GalleryCTA() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section ref={ref} className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <Image
        src="/about-cta.webp"
        alt="Start your remodeling project"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 container-custom text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto space-y-5"
        >
          {/* Label with lines */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-10 bg-white/30" />
            <p className="text-xs uppercase tracking-[0.22em] font-semibold text-white/65">
              Ready to Start Your Project?
            </p>
            <div className="h-px w-10 bg-white/30" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Let&apos;s Create a Space You&apos;ll Love for Years to Come.
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold uppercase tracking-widest text-sm px-8 py-3.5 rounded-sm hover:bg-primary/90 transition-colors duration-200 shadow-lg shadow-black/30"
            >
              Get Free Estimate
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${COMPANY_PHONE}`}
              className="text-white/85 hover:text-white transition-colors font-medium text-base"
            >
              {COMPANY_PHONE_DISPLAY}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Main page export ───────────────────────────────────────────────────────────
export function GalleryPageClient() {
  const { data, isPending, isError, refetch } = useGallery({ limit: 100 })
  const images = data?.data || []

  return (
    <>
      <GalleryHero />
      <GalleryIntro />
      <GallerySection images={images} isPending={isPending} isError={isError} refetch={refetch} />
      <WhyChooseWork />
      <BeforeAfterSection />
      <GalleryTestimonial />
      <GalleryCTA />
    </>
  )
}
