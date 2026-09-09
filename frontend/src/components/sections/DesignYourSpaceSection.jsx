'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'

const FEATURES = [
  {
    title: 'Easy to Use',
    desc: 'Design in minutes with our simple tool.',
  },
  {
    title: '3D Visualization',
    desc: 'See your kitchen in realistic 3D.',
  },
  {
    title: 'Full Customization',
    desc: 'Styles, colors, finishes and more.',
  },
  {
    title: 'Save & Share',
    desc: 'Save your design or get a free quote.',
  },
]

export function DesignYourSpaceSection({ data }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const bgImage = data?.bgImage || '/cabinet-remodeling-catalog.webp'
  const label = data?.label || 'Design Your Space'
  const heading = data?.heading || null
  const body = data?.body || null
  const features = data?.features?.length ? data.features : FEATURES
  const cta1Text = data?.cta1Text || 'Start Designing Now'
  const cta1Link = data?.cta1Link || 'https://cabinet-catalog-platform.vercel.app/'
  const cta2Text = data?.cta2Text || 'Browse Our Catalog'
  const cta2Link = data?.cta2Link || 'https://cabinet-catalog-platform.vercel.app/catalog'

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-28">

      {/* ── Full-bleed background image — left-center focus on mobile, right-center on desktop ── */}
      <Image
        src={bgImage}
        alt="Design your dream kitchen tool"
        fill
        className="object-cover object-left md:object-right"
        sizes="100vw"
      />

      {/* ── No overlay — background image shows at full strength ── */}

      <div className="relative z-10 px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-10"
        >
          {/* Section label */}
          <p
            className="text-xs uppercase tracking-[0.18em] font-semibold text-primary/70 mb-3"
            style={{ textShadow: '0 1px 10px rgba(255,255,255,0.9)' }}
          >
            {label}
          </p>

          <h2
            className="text-2xl sm:text-3xl font-bold leading-tight mb-4"
            style={{ textShadow: '0 1px 14px rgba(255,255,255,0.9), 0 1px 4px rgba(255,255,255,0.9)' }}
          >
            {heading ? (
              <span className="text-foreground">{heading}</span>
            ) : (
              <><span className="text-foreground">Design Your Dream</span>{' '}<span className="text-primary">Kitchen Yourself</span></>
            )}
          </h2>

          {/* Decorative underline */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
            <div className="h-1 w-8 bg-primary rounded-full" />
            <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
          </div>

          {body ? (
            <p className="text-gray-800 text-base leading-relaxed" style={{ textShadow: '0 1px 10px rgba(255,255,255,0.9)' }}>{body}</p>
          ) : (
            <p className="text-gray-800 text-base leading-relaxed" style={{ textShadow: '0 1px 10px rgba(255,255,255,0.9)' }}>
              Our easy-to-use kitchen design tool lets you create your perfect kitchen in just a few
              steps. Choose your layout, cabinets, colors, and finishes&mdash;then see your vision come
              to life in 3D.
            </p>
          )}
        </motion.div>

        {/* ── Feature grid — 2x2 cards, full section width ── */}
        <div className="max-w-2xl grid grid-cols-2 gap-3 sm:gap-4 mb-10">
          {features.map(({ title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="relative bg-white/95 backdrop-blur-sm rounded-lg border border-primary/10 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 px-3 py-4 sm:px-4 sm:py-5 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
              <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug mb-1">
                {title}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── CTA buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button asChild size="lg" className="w-full sm:w-auto font-bold uppercase tracking-wide">
            <Link href={cta1Link} target="_blank" rel="noopener noreferrer">{cta1Text}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto bg-white border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-wide"
          >
            <Link href={cta2Link} target="_blank" rel="noopener noreferrer">{cta2Text}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
