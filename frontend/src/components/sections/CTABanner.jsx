'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { COMPANY_PHONE, COMPANY_PHONE_DISPLAY } from '@/lib/constants'

export function CTABanner({
  heading = 'Ready to Transform Your Home?',
  subheading = 'Get a free consultation with our remodeling experts today.',
  buttonText = 'Get Free Estimate',
  buttonLink = '/contact',
  bgImage = null,
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
      style={
        bgImage
          ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : {}
      }
    >
      {/* Background gradient overlay or solid brand color */}
      <div
        className={`absolute inset-0 ${bgImage ? 'bg-black/60' : 'brand-gradient'}`}
      />

      <div className="container-custom relative z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">{heading}</h2>
          {subheading && (
            <p className="text-lg md:text-xl text-white/85">{subheading}</p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold text-base px-8">
              <Link href={buttonLink}>
                {buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <a
              href={`tel:${COMPANY_PHONE}`}
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium text-base"
            >
              <Phone className="h-5 w-5" />
              {COMPANY_PHONE_DISPLAY}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
