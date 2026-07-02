'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Phone, ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'

/* ─── Fade-in wrapper ───────────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = '', y = 24 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Category section with full-width image + label ───────────────────────── */
function CategorySection({ label, image, imageAlt, bg = 'bg-white' }) {
  return (
    <section className={`py-14 md:py-20 ${bg}`}>
      <div className="container-custom max-w-5xl">
        <FadeIn className="mb-8">
          <div className="flex items-center gap-4">
            <div className="h-0.5 w-10 bg-primary shrink-0" />
            <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-gray-900">
              {label}
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="relative w-full rounded-2xl overflow-hidden shadow-md group">
            <Image
              src={image}
              alt={imageAlt}
              width={1200}
              height={700}
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 1024px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-5 text-white font-bold text-base font-playfair drop-shadow-md">
              {label}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function FaucetsPageClient() {
  return (
    <>
      {/* ── Page Header (burgundy banner with breadcrumb) ─────────────────── */}
      <PageHeader
        title="Kitchen Faucets in Tampa, FL"
        subtitle="Home / Kitchen Faucets in Tampa, FL"
      />

      {/* ════════════════════════════════════════════════════════════════════
          INTRO — Company label + main pitch
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
                Cabinets &amp; Remodeling Depot
              </p>
              <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
                AFFORDABLE FAUCETS IN VALRICO &amp; TAMPA, FL
              </h2>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-6">
                Quality — Service — Value
              </p>
              <h3 className="font-playfair text-lg sm:text-xl font-bold text-gray-900 mb-4">
                High-Quality Kitchen Faucets &amp; Bathroom Faucets Tampa
              </h3>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Faucets are a necessity in the kitchen or bathroom. It is known that the heart of
                  every household is the kitchen, and another important place would be the bathroom,
                  where you can shed off all your daily stress with long and comforting showers. With
                  the modernization of almost everything around you, leaving the faucets with the
                  traditional hot and cold handles may not look appealing in a modern home. Cabinets
                  and Remodeling Depot provides you with the Best Faucets in Tampa.
                </p>
                <p>
                  However, depending on the style of your house, we carry the style you are looking
                  for. Cabinets &amp; Remodeling Depot offers different shapes and sizes for all
                  sinks and faucets, and we try to appeal to as many people as possible.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
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
                  src="/faucets-fixtures.jpg"
                  alt="Faucets in Tampa, FL"
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
          KITCHEN FAUCETS
      ════════════════════════════════════════════════════════════════════ */}
      <CategorySection
        label="Kitchen Faucets"
        image="/kitchen-faucets.png"
        imageAlt="Kitchen Faucets in Tampa"
        bg="bg-[#F5F0E8]"
      />

      {/* ════════════════════════════════════════════════════════════════════
          BATHROOM FAUCETS
      ════════════════════════════════════════════════════════════════════ */}
      <CategorySection
        label="Bathroom Faucets"
        image="/bathroom-faucets.png"
        imageAlt="Bathroom Faucets in Tampa"
        bg="bg-white"
      />

      {/* ════════════════════════════════════════════════════════════════════
          OPTIONS TEXT — plenty of options section
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#F5F0E8]">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <FadeIn delay={0.08}>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/modern-faucet-collections.jpeg"
                  alt="Modern faucet collections Tampa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

            <FadeIn className="flex flex-col gap-5">
              <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                You Have Plenty Of Options To Choose From
              </h2>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Living in the 21st century, where the designs of Kitchen Remodeling and Bathroom
                  Renovation have evolved to a great extent, it might be shameful to have a fancy
                  bathroom and kitchen without proper taps. The material and design of your faucets
                  can have a great influence on the overall design of your bathroom and kitchen. You
                  can choose from a wide range of faucets, such as wall-mounted faucets,
                  single-lever faucets, double-lever faucets, bath filler faucets, and many more.
                  When choosing a shower faucet and sink faucet, there are certain components that
                  you need to check. Such as the water pressure, the model of the tap, the mixer
                  type, and the material.
                </p>
                <p>
                  Kitchen faucets and bathroom faucets should match the vibe of your home. In case
                  you are not sure about the type of faucet that you should opt for, Cabinets &amp;
                  Remodeling Depot can provide you with the ultimate solution regarding faucets.
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

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SHOWER FAUCETS
      ════════════════════════════════════════════════════════════════════ */}
      <CategorySection
        label="Shower Faucets"
        image="/shower-faucets.png"
        imageAlt="Shower Faucets in Tampa"
        bg="bg-white"
      />

      {/* ════════════════════════════════════════════════════════════════════
          KITCHEN SINKS
      ════════════════════════════════════════════════════════════════════ */}
      <CategorySection
        label="Kitchen Sinks"
        image="/kitchen-sinks.png"
        imageAlt="Kitchen Sinks in Tampa"
        bg="bg-[#F5F0E8]"
      />

      {/* ════════════════════════════════════════════════════════════════════
          BATHROOM SINKS
      ════════════════════════════════════════════════════════════════════ */}
      <CategorySection
        label="Bathroom Sinks"
        image="/bathroom-sinks.png"
        imageAlt="Bathroom Sinks in Tampa"
        bg="bg-white"
      />

      {/* ════════════════════════════════════════════════════════════════════
          VANITY
      ════════════════════════════════════════════════════════════════════ */}
      <CategorySection
        label="Vanity"
        image="/vanity.png"
        imageAlt="Vanity Faucets in Tampa"
        bg="bg-[#F5F0E8]"
      />

      {/* ════════════════════════════════════════════════════════════════════
          BOTTOM CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="container-custom max-w-4xl text-center">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-3">
              Tampa Bay Faucet Experts
            </p>
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Call us today at 813-651-2333 or visit our showroom for more ideas.
            </h2>
            <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Cabinets &amp; Remodeling Depot is your one-stop shop for all kitchen and bathroom
              faucets in Tampa. Visit our showroom in Valrico, FL to explore our full collection
              and speak with our knowledgeable staff.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 text-primary font-bold uppercase tracking-widest text-sm h-13 px-9 rounded-lg transition-colors shadow-lg whitespace-nowrap"
              >
                Request Free Estimate
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
    </>
  )
}
