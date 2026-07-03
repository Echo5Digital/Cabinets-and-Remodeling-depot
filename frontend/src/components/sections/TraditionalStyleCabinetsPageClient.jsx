'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronRight } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'

/* ─── Fade-in wrapper ───────────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = '', y = 24 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
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

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const IMAGES = [
  { src: '/cabinet-shaker.jpg',                              alt: 'Traditional style kitchen cabinet with raised panel doors' },
  { src: '/Custom-Cabinets-and-Countertops-for-Tampa-2.jpg', alt: 'Traditional kitchen cabinet installation Tampa' },
  { src: '/kitchen-cabinet-2.jpg',                           alt: 'Classic traditional cabinets in kitchen' },
]

const OTHER_STYLES = [
  { label: 'Modern Cabinets',             href: '/modern-style-cabinets' },
  { label: 'Contemporary Cabinets',       href: '/contemporary-style-cabinets' },
  { label: 'Transitional Cabinets',       href: '/transitional-style-cabinets' },
  { label: 'Rustic Cabinets',             href: '/rustic-style-cabinets' },
  { label: 'Industrial Style Cabinets',   href: '/industrial-style-cabinets' },
]

const FAQS = [
  {
    question: 'Are traditional style kitchen cabinets more expensive than other styles?',
    answer:
      'Traditional style kitchen cabinets can be more expensive than other styles, especially if they are made from high-quality wood and have ornate details. However, there are also affordable options available, such as cabinets made from engineered wood with a traditional look.',
  },
  {
    question: 'How do I care for traditional style kitchen cabinets?',
    answer:
      'To care for traditional style kitchen cabinets, wipe them down regularly with a damp cloth and mild soap. Avoid using abrasive cleaners or scrubbers, as they can damage the wood and finish. You can also use a furniture polish specifically designed for wood to help protect and maintain the finish.',
  },
  {
    question: 'Are traditional style kitchen cabinets still popular?',
    answer:
      'Yes, traditional style kitchen cabinets are still popular, especially in homes with a classic or traditional design aesthetic. However, there has been a trend towards more modern and minimalist designs in recent years.',
  },
  {
    question: 'Can traditional style kitchen cabinets be customized?',
    answer:
      'Yes, traditional style kitchen cabinets can be customized to fit your specific needs and preferences. You can choose different wood types, finishes, and hardware options to create a unique look for your kitchen. You can also work with a cabinet maker to create custom sizes and configurations that fit your space perfectly.',
  },
]

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function TraditionalStyleCabinetsPageClient() {
  return (
    <>
      {/* ── Page Header (burgundy banner with breadcrumb) ─────────────────── */}
      <PageHeader
        title="Traditional Style Cabinets"
        subtitle="Home / Traditional Style Cabinets"
      />

      {/* ════════════════════════════════════════════════════════════════════
          2. INTRO — Company label + main content text
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <div className="text-center mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1">
                Cabinets &amp; Remodeling Depot
              </p>
              <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                Traditional Kitchen Cabinets
              </h2>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Quality — Service — Value
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-5 text-gray-600 text-base sm:text-lg leading-[1.82]">
              <p>
                Traditional kitchen cabinets are a popular choice for homeowners who want to
                create a warm and inviting kitchen space that is both functional and stylish.
                These cabinets are typically made of wood and feature classic design elements
                such as raised panel doors, decorative moldings, and ornate hardware.
              </p>

              <p>
                One of the main benefits of traditional kitchen cabinets is their timeless appeal.
                Unlike trendy or modern cabinets, traditional cabinets have a classic look that can
                stand the test of time. They are versatile enough to work with a wide range of
                kitchen styles, from farmhouse to Mediterranean to colonial.
              </p>

              <p>
                If you&apos;re looking for a classic and timeless look for your kitchen, traditional
                kitchen cabinets are an excellent choice. With their classic design elements and
                durable construction, they offer both style and functionality. Whether you opt for
                stained wood cabinets or mix and match different finishes, traditional kitchen
                cabinets are sure to provide a warm and inviting atmosphere for years to come.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. IMAGE GALLERY
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-warm-gray">
        <div className="container-custom max-w-7xl">
          <FadeIn className="mb-10">
            <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-gray-900">
              Featured Traditional Designs
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {IMAGES.map(({ src, alt }, i) => (
              <FadeIn key={src} delay={i * 0.07}>
                <div className="relative aspect-4/5 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. EXPLORE OTHER STYLES
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-white border-y border-gray-100">
        <div className="container-custom max-w-4xl">
          <FadeIn className="text-center mb-8">
            <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-gray-900">
              Explore Our Other Kitchen Styles
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="flex flex-wrap justify-center gap-3">
              {OTHER_STYLES.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="inline-flex items-center gap-2 bg-warm-gray hover:bg-primary hover:text-white text-gray-800 text-sm font-semibold px-5 py-2.5 rounded-full border border-[#E8DFD0] hover:border-primary transition-all duration-200"
                >
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  {label}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. FAQ — dark banner header + plain Q&A list
      ════════════════════════════════════════════════════════════════════ */}

      {/* Dark heading banner */}
      <div className="bg-gray-900 py-8 px-4">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <p className="font-playfair text-white text-xl sm:text-2xl font-bold text-center leading-snug">
              &#96;&#96;Get the Answers You Need: Frequently Asked Questions about Traditional style cabinets&#96;&#96;
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Q&A list — always visible, no accordion */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <FadeIn delay={0.06}>
            <div className="space-y-8">
              {FAQS.map((faq, i) => (
                <div key={i} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-3 leading-snug">
                    — {faq.question}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. BOTTOM CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/cabinet_img.webp"
            alt="Traditional kitchen cabinets background"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/80" />
        </div>
        <div className="relative z-10 container-custom max-w-3xl text-center px-4">
          <FadeIn>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-gold" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold whitespace-nowrap">
                Tampa Bay Cabinet Experts
              </p>
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-gold" />
            </div>
            <p className="font-playfair text-gray-900 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-6">
              Every cabinet is thoughtfully crafted and professionally installed to deliver
              timeless traditional style and lasting warmth for your kitchen.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/85 text-white font-bold uppercase tracking-widest text-sm h-14 px-10 rounded-lg transition-colors shadow-lg whitespace-nowrap"
            >
              Request Free Estimate
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
