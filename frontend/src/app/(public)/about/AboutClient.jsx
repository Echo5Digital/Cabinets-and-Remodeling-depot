'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle2 } from 'lucide-react'
import { usePageContent } from '@/hooks/usePageContent'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTABanner } from '@/components/sections/CTABanner'
import { ProcessSection } from '@/components/sections/ProcessSection'

const whyChooseUs = [
  'Over 15 years serving the Tampa Bay area',
  'Licensed, insured, and bonded contractors',
  'Free in-home or showroom consultations',
  'Quality materials with manufacturer warranties',
  'On-time project completion guarantee',
  'Dedicated project manager for every job',
]

export function AboutClient() {
  const { data: pageData } = usePageContent('about')
  const content = pageData?.content || {}
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <HeroSection data={content.hero} />

      {/* Mission section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tampa Bay&apos;s Trusted Remodeling Partner
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Cabinets &amp; Remodeling Depot has been transforming homes throughout the Tampa Bay
                area for over 15 years. We combine expert craftsmanship with premium materials to
                deliver remodeling results that exceed expectations and stand the test of time.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                From custom kitchen cabinets to full bathroom renovations, we handle every project
                with the same level of care, precision, and professionalism — whether it&apos;s a
                small update or a complete home transformation.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {whyChooseUs.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-primary/10"
            >
              {content.hero?.bgImage ? (
                <Image
                  src={content.hero.bgImage}
                  alt="Our team at work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 brand-gradient" />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <StatsSection stats={content.stats} />
      <ProcessSection steps={content.process} />
      <TestimonialsSection testimonials={content.testimonials} />
      <CTABanner
        heading={content.cta?.heading || 'Ready to Start Your Project?'}
        subheading={content.cta?.subheading}
        buttonText={content.cta?.buttonText || 'Get Free Estimate'}
        buttonLink={content.cta?.buttonLink || '/contact'}
      />
    </>
  )
}
