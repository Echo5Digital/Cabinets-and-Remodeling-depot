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
  { src: '/kitchen-cabinet-2.jpg',  alt: 'Industrial style kitchen cabinet close-up' },
  { src: '/kitchen-cabinet-3.jpg',  alt: 'Industrial cabinet kitchen installation' },
  { src: '/kitchencabinet3.jpg',    alt: 'Industrial cabinets in kitchen' },
]

const OTHER_STYLES = [
  { label: 'Traditional Cabinets',    href: '/kitchen-cabinets-tampa' },
  { label: 'Modern Cabinets',         href: '/slab-kitchen-cabinets' },
  { label: 'Contemporary Cabinets',   href: '/contemporary-style-cabinets' },
  { label: 'Transitional Cabinets',   href: '/kitchen-cabinets-tampa' },
  { label: 'Rustic Cabinets',         href: '/kitchen-cabinets-tampa' },
]

const FAQS = [
  {
    question: 'What are some popular finishes for industrial style cabinets?',
    answer:
      'Some popular finishes for industrial style cabinets include raw or brushed metal finishes, distressed wood finishes, matte black or dark finishes, and concrete-effect finishes.',
  },
  {
    question: 'What hardware is typically used for industrial style cabinets?',
    answer:
      'Industrial style cabinets typically use hardware made of metal, such as iron, steel, or brass. Common hardware choices include exposed bolts or screws, pipe-style handles or pulls, and minimalist bar pulls or knobs.',
  },
  {
    question: 'How can I incorporate industrial style cabinets into my kitchen design?',
    answer:
      'To incorporate industrial style cabinets into your kitchen design, consider pairing them with other industrial elements, such as exposed brick or concrete walls, metal light fixtures, or a stainless steel countertop. You can also mix and match different materials and finishes to create a unique, personalized look.',
  },
]

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function IndustrialStyleCabinetsPageClient() {
  return (
    <>
      {/* ── Page Header (burgundy banner with breadcrumb) ─────────────────── */}
      <PageHeader
        title="Industrial Style Cabinets"
        subtitle="Home / Industrial Style Cabinets"
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
                Industrial Cabinets
              </h2>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Quality — Service — Value
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-5 text-gray-600 text-base sm:text-lg leading-[1.82]">
              <p>
                Industrial style cabinets are a popular choice for homeowners and designers looking
                to create a unique, utilitarian, and stylish look in their kitchens. These cabinets
                are designed to have a raw, unfinished, and utilitarian appearance, featuring metal
                or reclaimed wood materials, exposed hardware, and industrial-inspired details. In
                this article, we&apos;ll explore the benefits and characteristics of industrial
                style cabinets, as well as how to incorporate them into your kitchen design.
              </p>

              <h3 className="font-bold text-gray-900 text-base sm:text-lg pt-2">
                Benefits of Industrial Style Cabinets
              </h3>
              <p>
                One of the main benefits of industrial style cabinets is their durability. Metal
                cabinets are particularly resistant to scratches, dents, and other forms of wear
                and tear, making them a practical choice for busy kitchens. In addition, the
                utilitarian aesthetic of these cabinets can add character and personality to your
                space, creating a unique and inviting atmosphere. Finally, industrial style cabinets
                are a great way to create a bold statement in your kitchen, adding a touch of edgy,
                urban flair to your home.
              </p>

              <h3 className="font-bold text-gray-900 text-base sm:text-lg pt-2">
                Characteristics of Industrial Style Cabinets
              </h3>
              <p>
                Industrial style cabinets are typically made from metal or reclaimed wood, and
                feature exposed hardware and industrial-inspired details. The metal can be polished,
                brushed, or distressed, depending on the desired look, while the reclaimed wood can
                add warmth and texture to the space. The cabinets may also feature details such as
                rivets, bolts, and exposed seams, giving them a rough-hewn and utilitarian
                appearance.
              </p>

              <h3 className="font-bold text-gray-900 text-base sm:text-lg pt-2">
                How to Incorporate Industrial Style Cabinets into Your Kitchen Design
              </h3>
              <p>
                There are many ways to incorporate industrial style cabinets into your kitchen
                design. One popular approach is to pair the cabinets with stainless steel appliances
                and concrete or metal countertops, creating a cohesive and industrial-inspired look.
                You can also use a monochromatic color palette with shades of gray, black, and white
                to complement the metal finishes of the cabinets. Finally, you can incorporate other
                industrial-inspired details, such as exposed ductwork or brick walls, to create a
                cohesive and stylish look.
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
              Featured Industrial Designs
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
              &#96;&#96;Get the Answers You Need: FAQs about Industrial style cabinets&#96;&#96;
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
            alt="Industrial cabinets background"
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
              bold, industrial style and lasting functionality for your kitchen.
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
