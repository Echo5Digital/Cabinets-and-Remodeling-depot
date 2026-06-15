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
    title: 'Wooden Flooring Tampa Bay',
    subtitle:
      'Transform your home with the timeless beauty of hardwood flooring. From solid oak to engineered wood, we offer premium wooden flooring options expertly installed throughout Tampa Bay.',
  },
  features: {
    heading: 'Our Wooden Flooring Options',
    subheading: 'Natural beauty and lasting durability for every room',
    items: [
      {
        title: 'Solid Hardwood',
        description:
          'Classic solid wood flooring available in oak, maple, cherry, hickory, and more. Can be sanded and refinished multiple times.',
      },
      {
        title: 'Engineered Wood',
        description:
          'Real hardwood top layer over a stable plywood core. More resistant to humidity and temperature changes — ideal for Tampa Bay homes.',
      },
      {
        title: 'Exotic Hardwoods',
        description:
          'Premium species like Brazilian cherry, teak, and mahogany for a truly distinctive look and exceptional hardness.',
      },
      {
        title: 'Reclaimed Wood',
        description:
          'Eco-friendly flooring with unique character and patina from repurposed timbers. Each plank tells a story.',
      },
    ],
  },
  faq: {
    heading: 'Wooden Flooring FAQs',
    items: [
      {
        question: 'Is hardwood flooring suitable for Florida\'s humidity?',
        answer:
          'Yes — engineered hardwood in particular is well-suited for Florida\'s climate. Its layered construction resists the expansion and contraction caused by humidity changes better than solid wood.',
      },
      {
        question: 'How long does wooden flooring installation take?',
        answer:
          'A typical room (300–400 sq ft) takes 1–2 days. Larger projects are quoted individually. We handle all prep, installation, and finishing.',
      },
      {
        question: 'Can hardwood flooring be installed over concrete slab?',
        answer:
          'Engineered hardwood can be glued or floated over concrete. Solid hardwood typically requires a plywood subfloor. We assess your specific situation during the free estimate.',
      },
      {
        question: 'Do you offer free estimates?',
        answer:
          'Yes! Contact us or visit our Valrico showroom for a free, no-obligation estimate tailored to your project.',
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
  const heading = data?.heading || 'Ready to Transform Your Floors?'
  const subheading = data?.subheading || 'Visit our Valrico showroom or contact us for a free estimate on wooden flooring installation.'
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

export function WoodenFlooringPageClient() {
  const { data: page } = usePageContent('wood-flooring')
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
