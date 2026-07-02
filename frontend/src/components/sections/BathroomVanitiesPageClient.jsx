'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Phone, ArrowRight, MapPin, CheckCircle } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'

/* ─── Fade-in wrapper ───────────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const serif = 'font-[family-name:var(--font-playfair)]'

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function BathroomVanitiesPageClient() {
  return (
    <>
      {/* ── Page Header (burgundy banner with breadcrumb) ─────────────────── */}
      <PageHeader
        title="Bathroom Vanities In Tampa"
        subtitle="Home / Bathroom Vanities in Tampa, FL"
      />

      {/* ════════════════════════════════════════════════════════════════════
          1. INTRO — BATHROOM VANITIES definition block
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
                Bathroom Vanities
              </p>
              <h2 className={`text-2xl sm:text-3xl font-extrabold text-gray-900 mb-5 leading-tight ${serif}`}>
                BATHROOM VANITIES
              </h2>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Bathroom vanities are pieces of furniture that serve as a functional and aesthetic
                  centerpiece in a bathroom. They typically include a sink and storage space for
                  bathroom essentials such as towels, toiletries, and cleaning supplies.
                </p>
                <p>
                  Bathroom vanities come in a variety of sizes, styles, and materials to fit any
                  bathroom design scheme, from modern and minimalist to traditional and ornate. The
                  vanity countertop is an important component, as it provides a surface for the sink
                  and often serves as a focal point in the bathroom.
                </p>
                <p>
                  Choosing the right bathroom vanity can enhance the overall look and functionality
                  of the bathroom and add value to your home.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/custom-bathroom-vanity.jpg"
                  alt="Bathroom Vanities In Tampa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. PREMIUM VANITIES — main pitch section
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#F5F0E8]">
        <div className="container-custom max-w-5xl">

          <FadeIn className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">
              Cabinets &amp; Remodeling Depot
            </p>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 ${serif}`}>
              PREMIUM BATHROOM VANITIES IN TAMPA
            </h2>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest">
              Quality — Service — Value
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <FadeIn delay={0.08}>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/bathroom-remodeling-design-2.jpg"
                  alt="Bathroom Renovation Tampa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.14} className="flex flex-col gap-5">
              <h3 className={`text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight ${serif}`}>
                Transform Your Space With Expert Bathroom Renovation In Tampa
              </h3>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Looking for the perfect bathroom vanity to complete your Bathroom Renovation Tampa?
                  Look no further than our store in Valrico, FL. With a wide selection of vanities to
                  choose from, you&apos;re sure to find one that fits your style and budget.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm h-12 px-7 rounded-lg transition-colors shadow-md whitespace-nowrap"
                >
                  Free Estimate
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+18136512333"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-sm h-12 px-7 rounded-lg transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" />
                  (813) 651-2333
                </a>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. VISIT OUR STORE
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <FadeIn className="flex flex-col gap-5">
              <h2 className={`text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight ${serif}`}>
                Visit Our Store in Valrico, FL
              </h2>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Our store is conveniently located in Valrico, FL, and serves customers throughout
                  the Tampa, FL area. Whether you&apos;re in Tampa, Brandon, Riverview, or any other
                  nearby location, our store is just a short drive away.
                </p>
                <p>
                  Come and visit us to see our selection of bathroom vanities in person, and our
                  friendly and knowledgeable staff will be happy to assist you in finding the perfect
                  vanity for your needs.
                </p>
              </div>

              {/* Location highlights */}
              <ul className="space-y-2.5">
                {['Tampa', 'Brandon', 'Riverview', 'Valrico', 'Wesley Chapel', 'Apollo Beach'].map((city) => (
                  <li key={city} className="flex items-center gap-2.5 text-gray-700 text-sm font-medium">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-3 h-3 text-primary" />
                    </span>
                    {city}
                  </li>
                ))}
              </ul>

              <div className="pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm h-12 px-7 rounded-lg transition-colors shadow-md"
                >
                  Visit Our Store in Valrico, FL
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/bathroom-remodel-1.jpg"
                  alt="Bathroom Vanities In Tampa showroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. WIDE SELECTION — image pair + text
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#F5F0E8]">
        <div className="container-custom max-w-5xl">

          <FadeIn className="text-center mb-10">
            <h2 className={`text-2xl sm:text-3xl font-extrabold text-gray-900 ${serif}`}>
              Wide Selection of Bathroom Vanities
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <FadeIn delay={0.06}>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
                <Image
                  src="/custom-bathroom-vanities.jpeg"
                  alt="Bathroom Vanities In Tampa"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <p className={`absolute bottom-4 left-4 text-white font-bold text-base ${serif}`}>
                  Bathroom Vanities In Tampa
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md group">
                <Image
                  src="/bathroom-remodeling-design.webp"
                  alt="Bathroom Renovation Tampa"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <p className={`absolute bottom-4 left-4 text-white font-bold text-base ${serif}`}>
                  Bathroom Renovation Tampa
                </p>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. COMPETITIVE PRICING
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <FadeIn delay={0.08}>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/double-sink-vanities.jpeg"
                  alt="Bathroom Vanities competitive pricing Tampa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

            <FadeIn className="flex flex-col gap-5">
              <h2 className={`text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight ${serif}`}>
                Competitive Pricing and Delivery Options
              </h2>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  We understand that buying Bathroom Vanities In Tampa can be a significant
                  investment, which is why we offer competitive pricing on all our products.
                </p>
                <p>
                  Additionally, we offer delivery and shipping options for customers who are unable
                  to visit our store in person. Our goal is to make the process of buying a bathroom
                  vanity as convenient and affordable as possible for our customers.
                </p>
              </div>
              <ul className="space-y-2.5 mt-1">
                {[
                  'Competitive pricing on all vanities',
                  'Delivery and shipping options available',
                  'Wide selection of styles and finishes',
                  'Expert staff to help you choose',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-gray-700 text-sm font-medium">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. CTA — Contact / Free Estimate
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-primary">
        <div className="container-custom max-w-4xl text-center">
          <FadeIn>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight ${serif}`}>
              Contact Us Today For Free Bathroom Estimates
            </h2>
            <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              If you&apos;re interested in getting a free estimate for your Bathroom Renovation Tampa
              project, we&apos;d be happy to help! At Cabinets &amp; Remodeling Depot, we offer free
              Bathroom Remodel Contractors Tampa estimates to all of our customers in Valrico and
              Tampa, FL.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-primary font-bold uppercase tracking-widest text-sm h-13 px-9 rounded-lg transition-colors shadow-lg whitespace-nowrap"
              >
                Free Estimate
              </Link>
              <a
                href="tel:+18136512333"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white/10 font-bold uppercase tracking-widest text-sm h-13 px-9 rounded-lg transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                Call Today! 813-651-2333
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          7. CLOSING CONTENT
      ════════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <FadeIn className="flex flex-col gap-5">
              <h2 className={`text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight ${serif}`}>
                Your Local Bathroom Vanity Experts in Tampa
              </h2>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Our store is conveniently located in Valrico, FL, and serves customers throughout
                  the Tampa, FL area. Whether you&apos;re in Tampa, Brandon, Riverview, or any other
                  nearby location, our store is just a short drive away.
                </p>
                <p>
                  Come and visit us to see our selection of bathroom vanities in person, and our
                  friendly and knowledgeable staff will be happy to assist you in finding the perfect
                  vanity for your needs. Cabinets And Remodeling Depot provides you with the best
                  Bathroom Vanities In Tampa.
                </p>
                <p>
                  So why wait? Contact us today to schedule your free bathroom estimate and take the
                  first step toward creating the bathroom of your dreams.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-sm h-12 px-7 rounded-lg transition-colors shadow-md whitespace-nowrap"
                >
                  Free Estimate
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+18136512333"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-sm h-12 px-7 rounded-lg transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" />
                  813-651-2333
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/bathroom-remodel-3.jpg"
                  alt="Bathroom vanities Tampa Bay showroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

          </div>
        </div>
      </section>
    </>
  )
}
