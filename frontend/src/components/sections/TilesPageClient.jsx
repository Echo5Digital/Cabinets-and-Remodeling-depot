'use client'

import { usePageContent } from '@/hooks/usePageContent'
import { normalizeContent } from '@/lib/pageContent'
import { PageHeader } from '@/components/common/PageHeader'
import { ConsultationForm } from '@/components/forms/ConsultationForm'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { JsonLd } from '@/components/common/JsonLd'

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
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

// ── Default fallback content ───────────────────────────────────────────────────

const DEFAULT = {
  hero: {
    title: 'Tile Flooring Tampa Bay',
    subtitle:
      'Durable, low-maintenance, and endlessly stylish. Our tile flooring solutions include ceramic, porcelain, natural stone, and large-format tiles — expertly installed throughout Tampa Bay.',
  },
  features: {
    heading: 'Our Tile Flooring Options',
    subheading: 'Versatile and durable flooring for kitchens, bathrooms, and beyond',
    items: [
      {
        title: 'Ceramic Tile',
        description:
          'Affordable and water-resistant, ceramic tile is ideal for kitchens, bathrooms, and laundry rooms. Available in hundreds of colors and patterns.',
      },
      {
        title: 'Porcelain Tile',
        description:
          'Denser and more durable than ceramic, porcelain handles heavy foot traffic and outdoor applications with ease.',
      },
      {
        title: 'Large-Format Tile',
        description:
          'Oversized tiles (24"x24" and larger) create a seamless, modern look with fewer grout lines for an open, airy feel.',
      },
      {
        title: 'Natural Stone',
        description:
          'Marble, travertine, slate, and limestone tiles deliver a luxurious, one-of-a-kind aesthetic to any space.',
      },
    ],
  },
  faq: {
    heading: 'Tile Flooring FAQs',
    items: [
      {
        question: 'Is tile flooring good for Florida homes?',
        answer:
          'Tile is one of the best flooring choices for Florida — it stays cool underfoot, resists moisture, and is easy to clean. Perfect for Tampa Bay\'s warm, humid climate.',
      },
      {
        question: 'How long does tile installation take?',
        answer:
          'Installation time depends on the area size and tile complexity. On average, a standard bathroom takes 2–3 days including curing time. We provide a detailed timeline with every estimate.',
      },
      {
        question: 'Can tile be installed over existing flooring?',
        answer:
          'In some cases, yes. We assess the existing subfloor condition to determine if tile can be installed on top or if removal is needed for the best long-term result.',
      },
      {
        question: 'Do you offer grout color options?',
        answer:
          'Absolutely. We carry a wide range of grout colors to complement your tile choice. Our team can help you select the perfect pairing during the consultation.',
      },
    ],
  },
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FeaturesSection({ data }) {
  const d = data || DEFAULT.features
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{d.heading}</h2>
          {d.subheading && <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{d.subheading}</p>}
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(d.items || []).map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="bg-primary/5 rounded-2xl p-6 h-full">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqSection({ data }) {
  const d = data || DEFAULT.faq
  const [open, setOpen] = useState(null)
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom max-w-3xl">
        <FadeIn className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">{d.heading}</h2>
        </FadeIn>
        <div className="space-y-3">
          {(d.items || []).map((item, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="bg-white rounded-xl border overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold gap-4"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span>{item.question}</span>
                  {open === i ? <Minus className="w-4 h-4 shrink-0 text-primary" /> : <Plus className="w-4 h-4 shrink-0 text-primary" />}
                </button>
                {open === i && (
                  <div className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed border-t">
                    <p className="pt-3">{item.answer}</p>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection({ data }) {
  const heading = data?.heading || 'Ready for Beautiful Tile Floors?'
  const subheading = data?.subheading || 'Visit our Valrico showroom or contact us for a free estimate on tile installation.'
  const ctaText = data?.ctaText || 'Get Free Estimate'
  const ctaLink = data?.ctaLink || '/contact'
  return (
    <section className="section-padding bg-primary text-white text-center">
      <div className="container-custom max-w-2xl">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
          <p className="text-white/80 text-lg mb-8">{subheading}</p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-bold rounded-full px-10 uppercase tracking-wide">
            <Link href={ctaLink}>{ctaText}</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function TilesPageClient() {
  const { data: page } = usePageContent('tiles-in-tampa')
  const { sections, schema } = normalizeContent(page?.content)

  const hero = sections.find((s) => s.type === 'hero') || DEFAULT.hero
  const features = sections.find((s) => s.type === 'features')
  const faq = sections.find((s) => s.type === 'faq')
  const cta = sections.find((s) => s.type === 'cta')

  return (
    <>
      {schema && <JsonLd schema={schema} />}

      <PageHeader
        title={hero.title}
        subtitle={hero.subtitle}
      />

      <FeaturesSection data={features} />

      <FaqSection data={faq} />

      <CtaSection data={cta} />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <FadeIn className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Request a Free Estimate</h2>
            <p className="text-muted-foreground">
              Fill out the form below and our team will get back to you shortly.
            </p>
          </FadeIn>
          <ConsultationForm />
        </div>
      </section>
    </>
  )
}
