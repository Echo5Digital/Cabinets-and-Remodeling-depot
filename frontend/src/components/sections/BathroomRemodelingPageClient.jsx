'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImageLightbox } from '@/components/common/ImageLightbox'

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Bathroom images ────────────────────────────────────────────────────────────
const BATHROOM_IMAGES = [
  { src: '/bathroom-remodel-1.jpg', alt: 'Bathroom Remodeling Tampa 1' },
  { src: '/bathroom-remodel-2.jpg', alt: 'Bathroom Remodeling Tampa 2' },
  { src: '/bathroom-remodel-3.jpg', alt: 'Bathroom Remodeling Tampa 3' },
  { src: '/bathroom-remodel-4.jpg', alt: 'Bathroom Remodeling Tampa 4' },
  { src: '/bathroom-remodel-5.jpg', alt: 'Bathroom Remodeling Tampa 5' },
  { src: '/bathroom-remodel-6.jpg', alt: 'Bathroom Remodeling Tampa 6' },
]

// ── Page ───────────────────────────────────────────────────────────────────────
export function BathroomRemodelingPageClient() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <>
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section className="relative h-56 sm:h-72 md:h-80 overflow-hidden bg-gray-900">
        <Image
          src="/bathroom-remodel-1.jpg"
          alt="Bathroom Remodeling in Tampa, FL"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/70 text-xs sm:text-sm mb-3 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            {' / '}
            Bathroom Remodeling in Tampa, FL
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-wide drop-shadow-lg">
            Bathroom Remodeling In Tampa, FL
          </h1>
        </div>
      </section>

      {/* ── Framed Heading ───────────────────────────────────────────────── */}
      <section className="pt-10 pb-4 md:pt-14 md:pb-6 bg-white">
        <div className="container-custom max-w-4xl text-center">
          <div className="border border-gray-200 rounded-2xl p-5 sm:p-8 md:p-12 shadow-sm">
            <div className="flex justify-center mb-4">
              <Image
                src="/cabinet_fav.jpg"
                alt="Cabinets & Remodeling Depot"
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold uppercase tracking-wide text-gray-900 mb-1">
              Expert Solution For Bathroom Remodeling In Tampa
            </h2>
            <p className="text-sm text-muted-foreground uppercase tracking-widest mt-2">
              Tampa, Florida
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <section className="pt-6 pb-10 md:pt-8 md:pb-14 bg-white">
        <div className="container-custom max-w-4xl">

          <FadeIn>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Trusted Bathroom Remodel Contractors In Tampa For Quality Renovations
            </h2>
            <p className="text-base font-bold text-gray-900 mb- ">
              Reasonably Priced Bathroom Design and Remodeling
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-5 text-gray-700 text-base leading-relaxed">
            <p>
              Bathroom remodeling is noting lesser than a toll on us as homeowners in terms of unmet
              timetables, misery and being expensive. Considering the high cost of bathroom remolding;
              one must not only think out of the box but should also look for the economic and smarter
              alternatives. After you will have a low-cost bathroom, you will not only enjoying having
              a bright, clean and functional bathroom but you will not feel any burden on your pocket.
              In other words, you will be different from all the home owners who would have emptied
              their bank accounts after wasteful and expensive route towards bathroom remodeling.
            </p>
            <p>
              It is the latest home remodeling culture that makes bathroom remodeling to cost around
              five figures however reasonably priced remodeling options are there. It is not a joke.
              You don&apos;t believe us; well we at Cabinet &amp; Remodeling Depot are amusing our valued
              customers with cost-effective bathroom remodeling. We have the best bathroom vanities at
              really competitive prices.
            </p>
            <p>
              Our storeroom has a variety of cheap bathroom vanities meeting all the requirements of
              modern bathroom vanities. Looking at the slump in the estate market; more and more people
              are inclined towards making things better at home rather than selling it. We are there to
              help you on your journey of remodeling your bathroom or even kitchen. Our professional
              experience will help you to have many options for your bathroom or kitchen remodeling
              project. Beginning from custom made kitchen cabinets, laminate countertops, and bathroom
              vanity with basin to hardwood flooring installation; we will not leave you alone. We
              construct each and everything with great care and hence our products are not only
              cost-effective but durable as well. Do not wait anymore and visit us or call us to get a
              free estimate for your bathroom or kitchen remodeling. Cabinets And Remodeling Depot
              provides you with the best Bathroom Remodeling in Tampa.
            </p>
            <p>
              Cabinets &amp; Remodeling Depot offers the best deals for our customers who need
              high-quality Bathroom Vanities In Tampa along with elegant faucets. Our vanities are
              constructed well and with great precision. Make sure to stop by our store if you are
              unsure of what to purchase. If you have any other questions, please feel free to call
              our number: 813-651-5333
            </p>
          </FadeIn>

        </div>
      </section>

      {/* ── Image Row ────────────────────────────────────────────────────── */}
      <section className="pb-8 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {BATHROOM_IMAGES.map(({ src, alt }, i) => (
              <FadeIn key={src} delay={i * 0.05}>
                <div
                  className="relative aspect-3/4 overflow-hidden rounded-lg shadow-sm cursor-pointer group"
                  onClick={() => setLightboxIndex(i)}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────────────────── */}
      <section className="pt-8 pb-16 md:pt-10 md:pb-20 bg-white">
        <div className="container-custom max-w-3xl text-center">

          <FadeIn>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Contact Us Today For Free Bathroom Estimates
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-4 text-gray-700 text-base leading-relaxed mb-8">
            <p>
              Make sure to call if you need a bathroom measurement so we can give you an estimate.
              We can stop by your home and measure your bathroom and discuss your options.
            </p>
            <p>
              Our specialists are capable of helping you find what you are looking for, so you do not
              have to worry because we can find what you are looking for. Make sure to visit our
              showroom and explore all of your options. No appointments are necessary, so just come
              on in!
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Button
              asChild
              size="lg"
              className="w-full bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-widest text-sm sm:text-base h-12 sm:h-14"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </FadeIn>

        </div>
      </section>

      <ImageLightbox
        images={BATHROOM_IMAGES}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((i) => Math.max(0, i - 1))}
        onNext={() => setLightboxIndex((i) => Math.min(BATHROOM_IMAGES.length - 1, i + 1))}
      />
    </>
  )
}
