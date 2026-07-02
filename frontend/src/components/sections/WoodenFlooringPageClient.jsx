'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImageLightbox } from '@/components/common/ImageLightbox'
import { usePageContent } from '@/hooks/usePageContent'
import { normalizeContent, mergeWithPageDefaults } from '@/lib/pageContent'

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

// ── Wood flooring images ────────────────────────────────────────────────────────
const WOOD_IMAGES = [
  { src: '/wd1.png', alt: 'Wooden Flooring Tampa 1' },
  { src: '/wd2.png', alt: 'Wooden Flooring Tampa 2' },
  { src: '/wd3.png', alt: 'Wooden Flooring Tampa 3' },
  { src: '/wd4.png', alt: 'Wooden Flooring Tampa 4' },
  { src: '/wd5.png', alt: 'Wooden Flooring Tampa 5' },
  { src: '/wd6.png', alt: 'Wooden Flooring Tampa 6' },
]

// ── Page ───────────────────────────────────────────────────────────────────────
export function WoodenFlooringPageClient() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const { data: pageData } = usePageContent('wood-flooring')
  const sections = mergeWithPageDefaults('wood-flooring', normalizeContent(pageData?.content).sections)
  const gallerySec = sections.find(s => s.id === 'wooden-flooring-gallery')
  const woodImages = gallerySec?.items?.length
    ? gallerySec.items.map((item, i) => ({
        src: item.image || WOOD_IMAGES[i]?.src,
        alt: item.title || WOOD_IMAGES[i]?.alt,
      }))
    : WOOD_IMAGES

  return (
    <>
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section className="relative h-48 sm:h-64 md:h-72 overflow-hidden bg-gray-900">
        <Image
          src="/wd1.png"
          alt="Wooden Flooring in Tampa, FL"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/70 text-xs sm:text-sm mb-3 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            {' / '}
            <Link href="/flooring-in-tampa" className="hover:text-white transition-colors">Flooring</Link>
            {' / '}
            Wooden Flooring in Tampa, FL
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white uppercase tracking-wide drop-shadow-lg">
            Wooden Flooring In Tampa, FL
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
              Most Affordable Wood Installation Around Valrico &amp; Tampa, FL
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

          <FadeIn delay={0.1} className="space-y-5 text-gray-700 text-base leading-relaxed">
            <p>
              Wooden flooring, also known as hardwood flooring, is a type of flooring made from
              natural hardwoods such as oak, maple, and walnut. It is a popular choice for its
              durability, natural beauty, and versatility. Wooden flooring is available in a range
              of finishes and can be easily maintained with regular cleaning and occasional
              refinishing. It is also a natural insulator and has acoustic properties that can help
              reduce noise levels. While wooden flooring may be prone to scratching and denting over
              time, this can be minimized with proper care and the use of furniture pads in
              high-traffic areas. Overall, wooden flooring is a timeless and valuable addition to
              any space. Cabinets and Remodeling Depot provides you with the{' '}
              <Link href="/flooring-in-tampa" className="text-primary font-semibold hover:underline underline-offset-2">
                Best Flooring In Tampa
              </Link>
              .
            </p>
          </FadeIn>

        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────────────────── */}
      <section className="pt-4 pb-8 md:pt-6 md:pb-10 bg-white">
        <div className="container-custom max-w-4xl">

          <FadeIn>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Contact Cabinets &amp; Remodeling Depot For Free Wood Flooring Estimates
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-5 text-gray-700 text-base leading-relaxed">
            <p>
              Cabinets &amp; Remodeling Depot is trusted in flooring. We have the best team who are
              more than happy in assisting you with your needs. We will help you find the best wood
              flooring that will match your home and install it for you at a reasonable price. Our
              team is well equipped in floor installation and will do their best in making your
              floors beautiful.
            </p>
            <p>
              There is a style of wood flooring that can match you, especially with a vast array of
              wood finishes and colors. The &ldquo;grade&rdquo; of the wood is determined by the
              appearance, and all grades can give you a different look.
            </p>
          </FadeIn>

        </div>
      </section>

      {/* ── Image Row ────────────────────────────────────────────────────── */}
      <section className="pb-8 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {woodImages.map(({ src, alt }, i) => (
              <FadeIn key={src} delay={i * 0.05}>
                <div
                  className="relative aspect-square overflow-hidden rounded-lg shadow-sm cursor-pointer group"
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

      {/* ── Closing + CTA Button ─────────────────────────────────────────── */}
      <section className="pt-8 pb-16 md:pt-10 md:pb-20 bg-white">
        <div className="container-custom max-w-4xl">

          <FadeIn delay={0.1} className="mb-8 text-center">
            <p className="text-gray-500 italic text-base leading-relaxed">
              With our experienced team, we can assure you that you will receive the highest level
              of satisfaction with our wood installation. Cabinets &amp; Remodeling Depot will
              service you with laminate, hardwood, and solid wood flooring.
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
        images={woodImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((i) => Math.max(0, i - 1))}
        onNext={() => setLightboxIndex((i) => Math.min(woodImages.length - 1, i + 1))}
      />
    </>
  )
}
