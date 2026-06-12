'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CABINET_INVENTORY = [
  'Stock kitchen cabinets Tampa homeowners love for fast projects',
  'Ready to install cabinets Tampa clients can select without long delays',
  'Custom cabinet styles for unique kitchen layouts',
  'Durable finishes designed for everyday use',
]

export function AffordableCabinetsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">

      {/* ── Full-bleed background image ── */}
      <Image
        src="/Budget-kitchen-remodel-Tampa-featuring-affordable-upgrades-and-modern-finishes.jpg"
        alt="Affordable kitchen cabinets Tampa remodel"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* ── Desktop: image visible left → solid white right ── */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,1) 62%, rgba(255,255,255,1) 100%)',
        }}
      />

      {/* ── Mobile: full white wash so content is readable ── */}
      <div
        className="absolute inset-0 md:hidden"
        style={{ background: 'rgba(255,255,255,0.92)' }}
      />

      <div className="relative z-10 container-custom">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── Left: empty — image shows through on desktop ── */}
          <div className="hidden md:block" />

          {/* ── Right: content directly on white, no card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Section label */}
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-primary/60 mb-3">
              Affordable Options
            </p>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              <span className="text-primary">Affordable Cabinets</span>{' '}
              <span className="text-foreground">Tampa Families Can Rely On</span>
            </h2>

            {/* Decorative underline */}
            <div className="flex items-center gap-2 mb-5">
              <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
              <div className="h-1 w-8 bg-primary rounded-full" />
              <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
            </div>

            <p className="text-gray-700 text-base leading-relaxed mb-5">
              A kitchen upgrade should feel exciting, not financially overwhelming. That&apos;s why we
              offer affordable cabinets Tampa homeowners can choose based on their style preferences,
              timeline, and remodeling goals.
            </p>

            <p className="font-semibold text-foreground mb-4">Our inventory includes:</p>

            <ul className="space-y-3 mb-6">
              {CABINET_INVENTORY.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-800 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-gray-700 text-base leading-relaxed mb-8">
              Whether you prefer a modern shaker design or a more traditional kitchen style, we help
              you choose cabinetry that balances appearance, storage, and long-term value.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="flex-1 font-bold uppercase tracking-wide">
                <Link href="/contact">Visit Our Showroom</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-wide">
                <Link href="/contact">Request a Quote</Link>
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
