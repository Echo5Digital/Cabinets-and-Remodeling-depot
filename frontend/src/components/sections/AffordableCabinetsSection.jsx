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
    <section ref={ref} className="relative py-20 md:py-28 overflow-hidden">
      {/* ── Background image ── */}
      <Image
        src="/Budget-kitchen-remodel-Tampa-featuring-affordable-upgrades-and-modern-finishes.jpg"
        alt="Affordable kitchen cabinets Tampa remodel"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient: image shows on left, fades to white on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-white/60 to-white md:from-transparent md:via-white/50 md:to-white" />

      <div className="relative z-10 container-custom">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: empty — lets the background image show through ── */}
          <div className="hidden md:block" />

          {/* ── Right: content panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-10">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
                <span className="text-primary">Affordable Cabinets</span>{' '}
                <span className="text-foreground">Tampa Families Can Rely On</span>
              </h2>

              <p className="text-muted-foreground text-base leading-relaxed mb-5">
                A kitchen upgrade should feel exciting, not financially overwhelming. That&apos;s why we
                offer affordable cabinets Tampa homeowners can choose based on their style preferences,
                timeline, and remodeling goals.
              </p>

              <p className="font-semibold text-foreground mb-4">Our inventory includes:</p>

              <ul className="space-y-3 mb-6">
                {CABINET_INVENTORY.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Whether you prefer a modern shaker design or a more traditional kitchen style, we help
                you choose cabinetry that balances appearance, storage, and long-term value.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="flex-1">
                  <Link href="/contact">Visit Our Showroom</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-white">
                  <Link href="/contact">Request a Quote</Link>
                </Button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
