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
  { src: '/cabinet-slab.jpg',                                alt: 'Modern style kitchen cabinet with sleek slab doors' },
  { src: '/kitchen-cabinet-2.jpg',                           alt: 'Modern kitchen cabinet with clean lines Tampa' },
  { src: '/Custom-Cabinets-and-Countertops-for-Tampa-2.jpg', alt: 'Modern cabinets installed in Tampa kitchen' },
]

const OTHER_STYLES = [
  { label: 'Traditional Cabinets',      href: '/traditional-style-cabinets' },
  { label: 'Contemporary Cabinets',     href: '/contemporary-style-cabinets' },
  { label: 'Transitional Cabinets',     href: '/transitional-style-cabinets' },
  { label: 'Rustic Cabinets',           href: '/rustic-style-cabinets' },
  { label: 'Industrial Style Cabinets', href: '/industrial-style-cabinets' },
]

const FAQS = [
  {
    question: 'What are some popular modern kitchen cabinet styles?',
    answer:
      'Some popular modern kitchen cabinet styles include flat-panel cabinets, slab cabinets, Shaker-style cabinets, glass-front cabinets, and open-shelving cabinets.',
  },
  {
    question: 'How can I incorporate modern kitchen cabinets into my kitchen design?',
    answer:
      'There are many ways to incorporate modern kitchen cabinets into your kitchen design. Consider pairing flat-panel cabinets with sleek stainless steel appliances and minimalist hardware for a contemporary look, or using slab cabinets with bold, colorful countertops for a more dramatic effect. Mixing and matching different styles of modern cabinets can also create a unique, personalized look.',
  },
  {
    question: 'What hardware is popular for modern kitchen cabinets?',
    answer:
      'Minimalist hardware, such as simple knobs or pulls in brushed nickel or black, is popular for modern kitchen cabinets. Some modern kitchens may also use no hardware at all, with cabinets featuring touch-latch or push-open mechanisms instead.',
  },
]

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function ModernStyleCabinetsPageClient() {
  return (
    <>
      {/* ── Page Header (burgundy banner with breadcrumb) ─────────────────── */}
      <PageHeader
        title="Modern Style Cabinets"
        subtitle="Home / Modern Style Cabinets"
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
                Modern Style Cabinets
              </h2>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Quality — Service — Value
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-5 text-gray-600 text-base sm:text-lg leading-[1.82]">
              <p>
                Modern kitchen cabinets are sleek and functional, with clean lines and minimalist
                design. They offer a simple, yet stylish aesthetic that is perfect for contemporary
                homes. These cabinets are available in a wide range of materials, finishes, and
                colors to suit any taste and budget.
              </p>

              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900 pt-2">
                Materials
              </h3>
              <p>
                Modern kitchen cabinets are made from a variety of materials, including wood,
                metal, and glass. Wood is a popular choice for modern cabinets, as it offers a
                natural and warm feel that is perfect for creating a cozy atmosphere in the
                kitchen. Metal cabinets are also gaining popularity, as they offer a sleek and
                industrial look that is perfect for modern homes. Glass cabinets are another
                option, and they provide a transparent and minimalist aesthetic that is perfect for
                displaying your favorite dishes and cookware.
              </p>

              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900 pt-2">
                Colors and Finishes
              </h3>
              <p>
                Modern kitchen cabinets come in a wide range of colors and finishes, from glossy
                white to matte black. You can also find cabinets in natural wood finishes, such as
                oak, maple, and cherry. Some modern cabinets feature bold colors, such as bright
                red or blue, which can add a pop of color to your kitchen.
              </p>

              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900 pt-2">
                Design
              </h3>
              <p>
                Modern kitchen cabinets feature clean lines and simple designs that are free from
                ornamentation. They often have flat or slab doors, which offer a streamlined and
                minimalist look. Many modern cabinets also feature hidden hinges, which add to the
                sleek and seamless aesthetic.
              </p>

              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-gray-900 pt-2">
                Storage
              </h3>
              <p>
                Modern kitchen cabinets offer ample storage space, with a variety of drawers,
                shelves, and cabinets. They often feature pull-out drawers and organizers, which
                make it easy to keep your kitchen organized and clutter-free. Many modern cabinets
                also have built-in lighting, which can help illuminate your kitchen and create a
                warm and welcoming atmosphere.
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
              Featured Modern Designs
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
              &#96;&#96;Get the Answers You Need: FAQs about Modern style cabinets&#96;&#96;
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
            alt="Modern kitchen cabinets background"
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
              Every modern cabinet is precisely crafted and professionally installed to bring
              sleek, timeless style and lasting function to your kitchen.
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
