'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChefHat, Droplets, Layout, Layers, Grid3X3, PencilRuler, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SERVICES } from '@/lib/constants'

const ICON_MAP = {
  ChefHat,
  Droplets,
  Layout,
  Layers,
  Grid3X3,
  PencilRuler,
}

const DEFAULT_SERVICES = SERVICES.map((s) => ({
  ...s,
  description: 'Expert remodeling solutions tailored to your vision and budget.',
}))

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function ServicesGrid({ services = DEFAULT_SERVICES, title, subtitle }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
            {subtitle && <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = ICON_MAP[service.icon] || Layout
            return (
              <motion.div key={service.href || service.title} variants={item}>
                <Link href={service.link || service.href || '/services'}>
                  <Card className="h-full hover:shadow-lg transition-shadow group cursor-pointer">
                    {service.image && (
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                        <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center text-sm font-medium text-primary gap-1">
                        Learn More <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
