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

// ── All tile images (flat — for lightbox) ──────────────────────────────────────
const TILE_IMAGES = [
  { src: '/c1.jpeg',  alt: 'Ceramic Tile Tampa 1' },
  { src: '/c2.jpeg',  alt: 'Ceramic Tile Tampa 2' },
  { src: '/c3.jpeg',  alt: 'Ceramic Tile Tampa 3' },
  { src: '/m1.png',   alt: 'Marble Tile Tampa 1' },
  { src: '/m2.jpeg',  alt: 'Marble Tile Tampa 2' },
  { src: '/m3.jpeg',  alt: 'Marble Tile Tampa 3' },
  { src: '/t1.png',   alt: 'Travertine Tile Tampa 1' },
  { src: '/t2.png',   alt: 'Travertine Tile Tampa 2' },
  { src: '/t3.png',   alt: 'Travertine Tile Tampa 3' },
  { src: '/G1.jpeg',  alt: 'Glass Tile Tampa 1' },
  { src: '/G2.jpeg',  alt: 'Glass Tile Tampa 2' },
  { src: '/G3.jpeg',  alt: 'Glass Tile Tampa 3' },
  { src: '/p1.png',   alt: 'Porcelain Tile Tampa 1' },
  { src: '/p2.png',   alt: 'Porcelain Tile Tampa 2' },
  { src: '/p3.png',   alt: 'Porcelain Tile Tampa 3' },
  { src: '/sl1.jpeg', alt: 'Slate Tile Tampa 1' },
  { src: '/sl2.png',  alt: 'Slate Tile Tampa 2' },
  { src: '/sl3.png',  alt: 'Slate Tile Tampa 3' },
]

// ── Page ───────────────────────────────────────────────────────────────────────
export function TilesPageClient() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <>
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section className="relative h-48 sm:h-64 md:h-72 overflow-hidden bg-gray-900">
        <Image
          src="/porcelain.webp"
          alt="Tiles in Tampa, FL"
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
            Tiles In Tampa, FL
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-wide drop-shadow-lg">
            Tiles In Tampa, FL
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
              Affordable Tile Flooring Around Valrico &amp; Tampa, FL
            </h2>
            <p className="text-sm text-muted-foreground uppercase tracking-widest mt-2">
              Tampa, Florida
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <section className="pt-6 pb-8 md:pt-8 md:pb-10 bg-white">
        <div className="container-custom max-w-4xl">

          <FadeIn>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
              Explore Premium Kitchen Tiles &amp; Stylish Bathroom Tiles in Tampa
            </h2>
            <p className="text-base font-bold text-gray-900 mb-4">
              Affordable Tile flooring in Valrico and Tampa
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-5 text-gray-700 text-base leading-relaxed">
            <p>
              It cannot be denied that the right flooring material accentuates any place, giving
              it the feeling of being just right. However, choosing a floor surface is a lot more
              than just looks. You will have to think about the ease of installation, durability,
              and the flooring cost itself.
            </p>
            <p>
              Types of flooring: There are different types of flooring. These include the:
            </p>
            <ul className="space-y-1 text-gray-700 text-base leading-relaxed pl-2">
              <li>Wood flooring</li>
              <li>Engineered wood flooring</li>
              <li>Prefinished maple hardwood flooring</li>
              <li>Solid wood flooring</li>
              <li>Laminate wood flooring and many more</li>
            </ul>
            <p>
              No doubt wall to wall carpet, hardwoods, and ceramic tiles are attractive; however,
              they are not budget-friendly. People these days are selecting more cost-effective
              flooring options such as laminate flooring, cork floors, carpet tile, etc.
            </p>
            <p>
              Depending on your choice, preference, and pocket, we at Cabinets &amp; Remodeling
              Depot will facilitate you in finding the right material with appropriate colors, patterns,
              and finishes. The kitchen and bathroom are the parts of any house that are used the
              most. Therefore, we will help you in getting the tile flooring that will not only be
              durable but also easily maintained. We take pride in providing highly competitive
              prices around Florida and Tampa.
            </p>
            <p>
              Cabinets And Remodeling Depot provides you with the{' '}
              <Link href="/flooring-in-tampa" className="text-primary font-semibold hover:underline underline-offset-2">
                Best Flooring Stores Tampa
              </Link>. Give us a
              call at 813-651-5333 and get your free in-home estimate scheduled right there and
              then.
            </p>
          </FadeIn>

        </div>
      </section>

      {/* ── Tile Categories Row 1: Ceramic + Marble ─────────────────────── */}
      <section className="pb-8 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">

            {/* Ceramic — indices 0-2 */}
            <FadeIn>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 uppercase tracking-wide mb-3">
                Ceramic
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {TILE_IMAGES.slice(0, 3).map(({ src, alt }, i) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-lg shadow-sm cursor-pointer group" onClick={() => setLightboxIndex(i)}>
                    <Image src={src} alt={alt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Marble — indices 3-5 */}
            <FadeIn delay={0.05}>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 uppercase tracking-wide mb-3">
                Marble
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {TILE_IMAGES.slice(3, 6).map(({ src, alt }, i) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-lg shadow-sm cursor-pointer group" onClick={() => setLightboxIndex(3 + i)}>
                    <Image src={src} alt={alt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── Tile Categories Row 2: Travertine + Glass ────────────────────── */}
      <section className="pb-8 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">

            {/* Travertine — indices 6-8 */}
            <FadeIn>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 uppercase tracking-wide mb-3">
                Travertine
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {TILE_IMAGES.slice(6, 9).map(({ src, alt }, i) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-lg shadow-sm cursor-pointer group" onClick={() => setLightboxIndex(6 + i)}>
                    <Image src={src} alt={alt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Glass — indices 9-11 */}
            <FadeIn delay={0.05}>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 uppercase tracking-wide mb-3">
                Glass
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {TILE_IMAGES.slice(9, 12).map(({ src, alt }, i) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-lg shadow-sm cursor-pointer group" onClick={() => setLightboxIndex(9 + i)}>
                    <Image src={src} alt={alt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── Different Types Of Tile Flooring ─────────────────────────────── */}
      <section className="pt-4 pb-8 md:pt-6 md:pb-10 bg-white">
        <div className="container-custom max-w-4xl">

          <FadeIn>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wide">
              Different Types Of Tile Flooring
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-5 text-gray-700 text-base leading-relaxed">
            <p>
              Cabinets &amp; Remodeling Depot carries hundreds of color options for tile, and
              install everything from natural stone, slate, and marble, to ceramic, glass, and
              porcelain tiles.
            </p>
            <p>
              Tile flooring is very convenient and complement spaces like the kitchen and
              bathrooms. Since the bathroom and kitchen is often used the most, tiles will perform
              better at less maintenance. Tile flooring can easily sharpen up a home by keeping the
              bathroom and kitchen looking nice. In addition, tile flooring is durable and can last
              you a lifetime.
            </p>
          </FadeIn>

        </div>
      </section>

      {/* ── Tile Categories Row 3: Porcelain + Slate ─────────────────────── */}
      <section className="pb-10 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">

            {/* Porcelain — indices 12-14 */}
            <FadeIn>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 uppercase tracking-wide mb-3">
                Porcelain
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {TILE_IMAGES.slice(12, 15).map(({ src, alt }, i) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-lg shadow-sm cursor-pointer group" onClick={() => setLightboxIndex(12 + i)}>
                    <Image src={src} alt={alt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Slate — indices 15-17 */}
            <FadeIn delay={0.05}>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 uppercase tracking-wide mb-3">
                Slate
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {TILE_IMAGES.slice(15, 18).map(({ src, alt }, i) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-lg shadow-sm cursor-pointer group" onClick={() => setLightboxIndex(15 + i)}>
                    <Image src={src} alt={alt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5" />
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── Contact Us Button ────────────────────────────────────────────── */}
      <section className="pb-16 md:pb-20 bg-white">
        <div className="container-custom max-w-4xl">
          <FadeIn>
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
        images={TILE_IMAGES}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((i) => Math.max(0, i - 1))}
        onNext={() => setLightboxIndex((i) => Math.min(TILE_IMAGES.length - 1, i + 1))}
      />
    </>
  )
}
