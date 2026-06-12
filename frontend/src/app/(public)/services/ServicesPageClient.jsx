'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, ChefHat, Droplets, Layout, Layers, Grid3X3, PencilRuler } from 'lucide-react'
import { usePageContent } from '@/hooks/usePageContent'
import { normalizeContent } from '@/lib/pageContent'
import { HeroSection } from '@/components/sections/HeroSection'
import { CTABanner } from '@/components/sections/CTABanner'
import { Card, CardContent } from '@/components/ui/card'
import { SERVICES } from '@/lib/constants'

const ICON_MAP = { ChefHat, Droplets, Layout, Layers, Grid3X3, PencilRuler }

export function ServicesPageClient() {
  const { data: pageData } = usePageContent('services')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const normalized = normalizeContent(pageData?.content)
  const heroSection = normalized.sections.find((s) => s.type === 'hero')
  const ctaSection  = normalized.sections.find((s) => s.type === 'cta')

  return (
    <>
      <HeroSection data={heroSection || {
        title: 'Our Remodeling Services',
        subtitle: 'Comprehensive home transformation services tailored to your vision and budget.',
        backgroundImage: '',
      }} />

      <section className="section-padding" ref={ref}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for Your Dream Home
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From a single room update to a whole-home transformation, we provide comprehensive
              remodeling services with the quality and care your home deserves.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => {
              const Icon = ICON_MAP[service.icon] || Layout
              return (
                <motion.div
                  key={service.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link href={service.href} className="group block h-full">
                    <Card className="h-full hover:shadow-lg transition-shadow hover:border-primary/50">
                      <CardContent className="p-6 space-y-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                        <div className="flex items-center text-sm font-medium text-primary">
                          Learn More
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <CTABanner
        heading={ctaSection?.heading || 'Start Your Project Today'}
        subheading={ctaSection?.subheading || 'Get a free estimate from our remodeling experts.'}
        buttonText={ctaSection?.buttonText || 'Get Free Estimate'}
        buttonLink={ctaSection?.buttonLink || '/contact'}
      />
    </>
  )
}
