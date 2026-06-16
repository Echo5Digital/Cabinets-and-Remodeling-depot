'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle2 } from 'lucide-react'
import { usePageContent } from '@/hooks/usePageContent'
import { HeroSection } from '@/components/sections/HeroSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTABanner } from '@/components/sections/CTABanner'
import { ConsultationForm } from '@/components/forms/ConsultationForm'
import { Card, CardContent } from '@/components/ui/card'

function FeatureSection({ section, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const isEven = index % 2 === 0

  return (
    <div ref={ref} className={`grid md:grid-cols-2 gap-10 items-center ${!isEven ? 'md:[&>*:first-child]:order-2' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="space-y-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold">{section.heading}</h2>
        {section.body && (
          <p className="text-muted-foreground leading-relaxed">{section.body}</p>
        )}
        {section.bullets && section.bullets.length > 0 && (
          <ul className="space-y-2">
            {section.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="relative aspect-[4/3] rounded-xl overflow-hidden bg-primary/10"
      >
        {section.image ? (
          <Image
            src={section.image}
            alt={section.heading}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 brand-gradient opacity-60" />
        )}
      </motion.div>
    </div>
  )
}

export function ServicePageClient({ slug, serviceName }) {
  const { data: pageData } = usePageContent(slug)
  const content = pageData?.content || {}

  return (
    <>
      <HeroSection data={content.hero} />

      {/* Sections */}
      {content.sections && content.sections.length > 0 && (
        <section className="section-padding">
          <div className="container-custom space-y-12 md:space-y-20">
            {content.sections.map((section, index) => (
              <FeatureSection key={index} section={section} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQSection faqs={content.faqs} />

      {/* CTA + Form */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Schedule your free consultation today. Our experts will assess your space,
                discuss your vision, and provide a detailed quote with no obligation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Free Consultation', desc: 'No-obligation estimate' },
                  { label: 'Expert Craftsmen', desc: 'Licensed & insured' },
                  { label: 'Quality Materials', desc: 'Manufacturer warranties' },
                  { label: 'On-Time Delivery', desc: 'Project completion guarantee' },
                ].map((item) => (
                  <Card key={item.label}>
                    <CardContent className="p-4">
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="bg-background rounded-xl border p-6">
              <h3 className="text-xl font-semibold mb-4">Request Free Estimate</h3>
              <ConsultationForm serviceName={serviceName} />
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        heading={content.cta?.heading}
        subheading={content.cta?.subheading}
        buttonText={content.cta?.buttonText}
        buttonLink={content.cta?.buttonLink}
        bgImage={content.cta?.bgImage}
      />
    </>
  )
}
