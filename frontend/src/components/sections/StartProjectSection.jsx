'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'

export function StartProjectSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="relative overflow-hidden min-h-105 md:min-h-125 flex items-center">

      {/* Full-section background: kitchen image */}
      <Image
        src="/kitchen-bg.webp"
        alt="Beautiful kitchen remodel Tampa"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Cream gradient overlay — solid on the left, fades to transparent on desktop */}
      <div className="absolute inset-0 bg-linear-to-r from-[#f5ede4] via-[#f5ede4]/90 to-[#f5ede4]/50 md:to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-lg"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5">
              Start Your Kitchen Remodeling Project Today
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              If you&apos;re looking for kitchen cabinets Tampa homeowners trust for quality, value,
              and professional installation, visit Cabinets &amp; Remodeling Depot today.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Explore cabinet styles, compare countertop materials, and speak with our team about
              your remodeling goals. From affordable cabinets Tampa clients love to ready to install
              cabinets Tampa homeowners need quickly, we&apos;re ready to help bring your kitchen
              project to life.
            </p>
            <Button
              asChild
              size="lg"
              className="font-semibold px-8"
              style={{ backgroundColor: '#811121' }}
            >
              <Link href="/contact">Visit Our Showroom</Link>
            </Button>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
