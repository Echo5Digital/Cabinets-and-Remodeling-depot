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
  { src: '/cabinet-shaker.jpg',                          alt: 'Transitional style kitchen cabinet close-up' },
  { src: '/kitchen-cabinet-2.jpg',                       alt: 'Transitional cabinet kitchen installation' },
  { src: '/Custom-Cabinets-and-Countertops-for-Tampa-2.jpg', alt: 'Transitional cabinets in kitchen' },
]

const OTHER_STYLES = [
  { label: 'Traditional Cabinets',    href: '/kitchen-cabinets-tampa' },
  { label: 'Modern Cabinets',         href: '/slab-kitchen-cabinets' },
  { label: 'Contemporary Cabinets',   href: '/contemporary-style-cabinets' },
  { label: 'Rustic Cabinets',         href: '/kitchen-cabinets-tampa' },
  { label: 'Industrial Style Cabinets', href: '/industrial-style-cabinets' },
]

const FAQS = [
  {
    question: 'How do transitional style kitchen cabinets differ from traditional or contemporary styles?',
    answer:
      'Transitional style kitchen cabinets incorporate elements of both traditional and contemporary design, whereas traditional style cabinets tend to be more ornate and formal, and contemporary style cabinets are more minimalistic and often feature bold colors or textures.',
  },
  {
    question: 'Can transitional style kitchen cabinets work with any type of kitchen design?',
    answer:
      'Yes, transitional style kitchen cabinets can work with any type of kitchen design, whether it\'s a modern or traditional space. The key is to strike a balance between the traditional and contemporary elements to create a cohesive look.',
  },
  {
    question: 'What are some benefits of transitional style kitchen cabinets?',
    answer:
      'Transitional style kitchen cabinets offer the best of both worlds, combining classic and modern design elements to create a timeless look that is both functional and stylish. They can also work well with a variety of kitchen styles and are versatile enough to accommodate changing tastes and trends.',
  },
]

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function TransitionalStyleCabinetsPageClient() {
  return (
    <>
      {/* ── Page Header (burgundy banner with breadcrumb) ─────────────────── */}
      <PageHeader
        title="Transitional Style Cabinets"
        subtitle="Home / Transitional Style Cabinets"
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
                Transitional Cabinets
              </h2>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Quality — Service — Value
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-5 text-gray-600 text-base sm:text-lg leading-[1.82]">
              <p>
                Transitional kitchen cabinets are a popular design choice for homeowners who want
                to strike a balance between traditional and contemporary styles. These cabinets are
                versatile, elegant, and functional, making them an ideal option for those who want
                a timeless look that will stand the test of time.
              </p>

              <h3 className="font-bold text-gray-900 text-base sm:text-lg pt-2">
                What are Transitional Kitchen Cabinets?
              </h3>
              <p>
                Transitional kitchen cabinets are characterized by their clean, simple lines, and
                their use of natural materials like wood, stone, and metal. These cabinets often
                feature raised or recessed panel doors with simple, understated hardware. They can
                be made from a variety of wood types, including maple, oak, and cherry, and can be
                finished in a wide range of colors and stains.
              </p>
              <p>
                One of the defining features of transitional kitchen cabinets is their ability to
                bridge the gap between traditional and contemporary styles. They combine the warmth
                and charm of traditional design with the clean lines and simplicity of modern
                design. This makes them a great choice for homeowners who want a kitchen that is
                both timeless and up-to-date.
              </p>
              <p>
                Transitional kitchen cabinets are also very functional. They offer plenty of
                storage space, with a variety of organizational features like pull-out drawers,
                roll-out trays, and built-in spice racks. They also come in a variety of sizes, so
                homeowners can choose cabinets that fit their specific needs and kitchen layout.
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
              Featured Transitional Designs
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
              &#96;&#96;Get the Answers You Need: FAQs about Transitional style cabinets&#96;&#96;
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
            alt="Transitional cabinets background"
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
              timeless transitional style and lasting functionality for your kitchen.
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
