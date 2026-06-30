'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ZoomIn } from 'lucide-react'
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

// ── Laminate images ────────────────────────────────────────────────────────────
const LAMINATE_IMAGES = [
  { src: '/L1-.jpeg', alt: 'Laminate Flooring Tampa 1' },
  { src: '/L2-.jpeg', alt: 'Laminate Flooring Tampa 2' },
  { src: '/L3-.jpeg', alt: 'Laminate Flooring Tampa 3' },
  { src: '/L4-.jpeg', alt: 'Laminate Flooring Tampa 4' },
  { src: '/L5-.jpeg', alt: 'Laminate Flooring Tampa 5' },
  { src: '/L6-.jpeg', alt: 'Laminate Flooring Tampa 6' },
]

// ── Features ───────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    title: 'Fast Installation',
    desc: 'Quick to install and on average, laminate flooring could be installed in a day.',
  },
  {
    title: 'Super Durable',
    desc: 'Laminate flooring is resistant to scratches, fading, stains, and impacts.',
  },
  {
    title: 'Appearance',
    desc: "There's a variety of different wood styles to choose from in laminate flooring.",
  },
]

// ── Page ───────────────────────────────────────────────────────────────────────
export function LaminateFlooringPageClient() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const { data: pageData } = usePageContent('laminate-flooring-in-tampa')
  const sections = mergeWithPageDefaults('laminate-flooring-in-tampa', normalizeContent(pageData?.content).sections)
  const gallerySec = sections.find(s => s.id === 'laminate-flooring-gallery')
  const featuresSec = sections.find(s => s.id === 'laminate-flooring-features')
  const laminateImages = gallerySec?.items?.length
    ? gallerySec.items.map((item, i) => ({
        src: item.image || LAMINATE_IMAGES[i]?.src,
        alt: item.title || LAMINATE_IMAGES[i]?.alt,
      }))
    : LAMINATE_IMAGES
  const features = featuresSec?.items?.length
    ? featuresSec.items.map((item, i) => ({
        title: item.title || FEATURES[i]?.title,
        desc: item.description || item.desc || FEATURES[i]?.desc,
      }))
    : FEATURES

  return (
    <>
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section className="relative h-48 sm:h-64 md:h-72 overflow-hidden bg-gray-900">
        <Image
          src="/L1-.jpeg"
          alt="Laminate Flooring in Tampa, FL"
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
            Laminate Flooring in Tampa, FL
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white uppercase tracking-wide drop-shadow-lg">
            Laminate Flooring In Tampa, FL
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
              High-Quality Laminate Flooring In Tampa
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
              Transform Your Space With High-Quality Laminate Flooring In Tampa
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-5 text-gray-700 text-base leading-relaxed">
            <p>
              <Link href="/" className="text-primary font-semibold hover:underline underline-offset-2">
                Cabinets &amp; Remodeling Depot
              </Link>{' '}
              offers a wide selection of high-quality laminate flooring at affordable prices. We
              also offer a free in-home estimate as well. Laminate flooring is a great flooring
              option since it is affordable, durable, and makes any room look nice.
            </p>
            <p>
              Compared to hardwood flooring,{' '}
              <strong>Laminate Flooring In Tampa</strong>{' '}
              requires less maintenance and can be quickly installed. Stop by{' '}
              <Link href="/" className="text-primary font-semibold hover:underline underline-offset-2">
                Cabinets &amp; Remodeling Depot
              </Link>{' '}
              to check out our showroom to view flooring samples and talk with our experts.
              Cabinets And Remodeling Depot provides you with the Best{' '}
              <Link href="/flooring-in-tampa" className="text-primary font-semibold hover:underline underline-offset-2">
                Flooring In Tampa
              </Link>
              .
            </p>
            <p>
              Or call 813-651-2333 to schedule a free in-home estimate.
            </p>
          </FadeIn>

        </div>
      </section>

      {/* ── Image Row ────────────────────────────────────────────────────── */}
      <section className="pb-8 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {laminateImages.map(({ src, alt }, i) => (
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

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="pt-8 pb-10 md:pt-10 md:pb-14 bg-white">
        <div className="container-custom max-w-4xl">

          <FadeIn>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Affordable &amp; Long-Lasting Laminate Flooring In Tampa
            </h2>
          </FadeIn>

          <div className="space-y-4 text-gray-700 text-base leading-relaxed text-center">
            {features.map(({ title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.06}>
                <p>
                  <strong className="text-gray-900">{title}–</strong>{' '}{desc}
                </p>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ── Professional Installation ─────────────────────────────────── */}
      <section className="pt-4 pb-10 md:pt-6 md:pb-14 bg-white">
        <div className="container-custom max-w-4xl">

          <FadeIn>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wide">
              Professional Installation
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="text-gray-700 text-base leading-relaxed">
            <p>
              Let us, the professionals at Cabinets &amp; Remodeling Depot, install your new
              laminated wood floors. We have installed hundreds of floors all over Tampa, Valrico
              Florida for our wonderful customers. We can guarantee that you will love our service,
              craftsmanship, and most importantly, your new floor!
            </p>
          </FadeIn>

        </div>
      </section>

      <ImageLightbox
        images={laminateImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((i) => Math.max(0, i - 1))}
        onNext={() => setLightboxIndex((i) => Math.min(laminateImages.length - 1, i + 1))}
      />
    </>
  )
}
