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
    title: 'Laminate Flooring Tampa Bay',
    subtitle:
      'Get the look of hardwood or stone at a fraction of the cost. Our laminate flooring options are durable, easy to maintain, and available in a wide variety of styles for Tampa Bay homes.',
  },
  features: {
    heading: 'Why Choose Laminate Flooring?',
    subheading: 'The smart, budget-friendly flooring solution for modern homes',
    items: [
      {
        title: 'Affordable Style',
        description:
          'Achieve the look of real hardwood or stone without the premium price tag. Laminate offers exceptional value for any budget.',
      },
      {
        title: 'Durable & Scratch-Resistant',
        description:
          'High-quality laminate resists scratches, dents, and stains — making it ideal for high-traffic areas and homes with pets or children.',
      },
      {
        title: 'Easy Maintenance',
        description:
          'A simple sweep and occasional damp mop keeps laminate floors looking great. No special cleaners or refinishing required.',
      },
      {
        title: 'Wide Style Range',
        description:
          'From light oak to dark walnut, from rustic to modern, our laminate collection covers every aesthetic. Visit our showroom to see the full range.',
      },
    ],
  },
  faq: {
    heading: 'Laminate Flooring FAQs',
    items: [
      {
        question: 'Is laminate flooring waterproof?',
        answer:
          'Many modern laminate floors are water-resistant, but not fully waterproof. For areas prone to moisture like bathrooms, we recommend waterproof laminate or LVP. We can advise on the best option for your needs.',
      },
      {
        question: 'How long does laminate flooring last?',
        answer:
          'With proper care, quality laminate flooring typically lasts 15–25 years. The wear layer thickness (measured in AC rating) determines durability — we carry AC3 through AC5 options.',
      },
      {
        question: 'Can laminate be installed over existing flooring?',
        answer:
          'In many cases, yes. Laminate can float over existing vinyl, tile, or hardwood as long as the subfloor is level and in good condition. We assess this during the free estimate.',
      },
      {
        question: 'How is laminate different from LVP?',
        answer:
          'Laminate has a wood-fiber core with a photographic image layer, while LVP (luxury vinyl plank) is made entirely of PVC and is fully waterproof. Both are excellent options — we can help you decide which is right for your project.',
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
  const heading = data?.heading || 'Love the Look of Laminate?'
  const subheading = data?.subheading || 'Visit our Valrico showroom or contact us for a free estimate on laminate flooring installation.'
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

export function LaminateFlooringPageClient() {
  const { data: page } = usePageContent('laminate-flooring-in-tampa')
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
