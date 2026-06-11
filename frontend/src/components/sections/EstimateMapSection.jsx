'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'

export function EstimateMapSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="relative overflow-hidden py-16 md:py-24">

      {/* Background */}
      <Image
        src="/estimate_bg.jpg"
        alt=""
        fill
        aria-hidden="true"
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 container-custom">

        {/* Heading + subtitle + CTA — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-white/50 mb-3">
            Free Estimate
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
            Get the estimate for{' '}
            <span className="italic" style={{ color: '#e05a72' }}>your Kitchen</span>
          </h2>
          {/* Decorative underline */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-0.5 w-10 bg-white/30 rounded-full" />
            <div className="h-1 w-8 bg-white rounded-full" />
            <div className="h-0.5 w-10 bg-white/30 rounded-full" />
          </div>
          <p className="text-white/75 text-base md:text-lg mb-8">
            Get costing for your kitchen interiors.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-bold tracking-widest uppercase rounded-md px-10 h-12"
          >
            <Link href="/contact">Get Free Consultation</Link>
          </Button>
        </motion.div>

        {/* Google Map embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-xl overflow-hidden shadow-2xl w-full"
        >
          <iframe
            src="https://maps.google.com/maps?cid=18201794426186346316&output=embed&hl=en-US&t=k"
            width="100%"
            height="450"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Cabinets & Remodeling Depot — 106 S St Cloud Ave, Valrico, FL 33594"
          />
        </motion.div>

      </div>
    </section>
  )
}
