'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'

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

// ── Page ───────────────────────────────────────────────────────────────────────
export function FlooringPageClient() {
  return (
    <>
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section className="relative h-56 sm:h-72 md:h-80 overflow-hidden bg-gray-900">
        <Image
          src="/wood-flooring-750x469.jpg"
          alt="Flooring in Tampa, FL"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/70 text-xs sm:text-sm mb-3 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            {' / '}
            Flooring In Tampa, FL
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-wide drop-shadow-lg">
            Flooring In Tampa, FL
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
              Premium Flooring In Tampa For Every Style
            </h2>
            <p className="text-sm text-muted-foreground uppercase tracking-widest mt-2">
              Tampa, Florida
            </p>
          </div>
        </div>
      </section>

      {/* ── Top Flooring Stores section ───────────────────────────────────── */}
      <section className="pt-6 pb-8 md:pt-8 md:pb-10 bg-white">
        <div className="container-custom max-w-4xl">

          <FadeIn>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Top Flooring Stores In Tampa Offering Exceptional Selection
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-5 text-gray-700 text-base leading-relaxed">
            <p>
              Floors are the most important aspect of a home and we have what you are looking for.
              From hard wood to carpet, we have it all. We carry different varieties of flooring
              that will match your home aesthetic.
            </p>
            <p>
              There are various types of flooring available today such as{' '}
              <Link href="/flooring/laminate-flooring-in-tampa" className="text-primary font-semibold hover:underline underline-offset-2">
                Laminate Flooring In Tampa
              </Link>
              , wooden flooring, vinyl flooring, and many more. Beautiful flooring can change the
              entire look of a place no matter how old it is. So, it is always a wise choice to
              opt for good flooring.
            </p>
            <p>
              Cabinets and Remodeling Depot provides you with the best{' '}
              <strong className="text-gray-900">Flooring In Tampa</strong>.
            </p>
          </FadeIn>

        </div>
      </section>

      {/* ── Two landscape images ─────────────────────────────────────────── */}
      <section className="pb-8 bg-white">
        <div className="container-custom max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <FadeIn>
              <div className="relative w-full aspect-16/10 overflow-hidden rounded-lg shadow-sm">
                <Image
                  src="/wood-flooring-750x469.jpg"
                  alt="Wood Flooring Tampa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <div className="relative w-full aspect-16/10 overflow-hidden rounded-lg shadow-sm">
                <Image
                  src="/engineered-wood-flooring-768x480-1.jpg"
                  alt="Engineered Wood Flooring Tampa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── The Perfect Flooring Stores section ──────────────────────────── */}
      <section className="pt-6 pb-8 md:pt-8 md:pb-10 bg-white">
        <div className="container-custom max-w-4xl">

          <FadeIn>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              The Perfect Flooring Stores Tampa
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-5 text-gray-700 text-base leading-relaxed mb-8">
            <p>
              You need to invest in good flooring for your home in order to make it last longer.
              You can choose from the wide range of flooring options that are available at{' '}
              <Link href="/" className="text-primary font-semibold hover:underline underline-offset-2">
                Cabinets &amp; Remodeling Depot
              </Link>
              .
            </p>
            <p>
              It is also very much important to choose the perfect flooring because wrong flooring
              can ruin the vibe of a house and might also cost you piles of money. So, if you are
              looking for the flooring solution, you can easily look up to Cabinets &amp; Remodeling
              Depot for the best options. We carry a huge variety of different flooring which can
              help you in choosing the perfect flooring option for your home.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-sm">
              <Image
                src="/Flooring-samples.jpg"
                alt="Flooring Samples Tampa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ── Hardwood Flooring ────────────────────────────────────────────── */}
      <section className="pt-8 pb-6 md:pt-10 md:pb-8 bg-white">
        <div className="container-custom max-w-4xl">

          <FadeIn>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wide">
              Hardwood Flooring
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-5 text-gray-700 text-base leading-relaxed">
            <p>
              Wood adds warmth, beauty, and value to your home compared to any other flooring.
              Cabinets &amp; Remodeling Depot carries a variety of different type of woods to
              choose from, spanning from the color, texture, and price. Wood flooring enhances the
              aesthetic of your home and creates a home with timeless beauty. With wood flooring,
              there is a style for everyone with custom stains and finishes.
            </p>
            <p>
              <strong className="text-gray-900">Hardwood</strong> cleaning is easy and since wood
              does not collect dust, wood floors are a perfect choice for a healthy home. Wood
              floors are ecologically friendly and recyclable.
            </p>
          </FadeIn>

        </div>
      </section>

      {/* ── Carpet ───────────────────────────────────────────────────────── */}
      <section className="pt-6 pb-10 md:pt-8 md:pb-12 bg-white">
        <div className="container-custom max-w-4xl">

          <FadeIn>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wide">
              Carpet
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-5 text-gray-700 text-base leading-relaxed">
            <p>
              Carpet adds a sense of coziness to a home and a feel great against your feet. Carpets
              bring a soft and warm look to the home. Cabinets &amp; Remodeling Depot carries a
              great variety of carpet colors that you will love. Buying the right carpet is very
              important and seeing it for yourself is best.
            </p>
            <p>
              Understanding carpet is important so that you know what is most functional for your
              lifestyle and home. Here are a few points to look over:
            </p>
            <ul className="space-y-3 text-gray-700 text-base leading-relaxed">
              <li>
                <strong className="text-gray-900">Frieze</strong> – A textured surface that gives
                off a curled and twisted look to the yarns. It helps with minimizing footprints.
              </li>
              <li>
                <strong className="text-gray-900">Textured Plush</strong> – A soft and
                decoratively versatile texture. It also helps to hide imprints and is often used
                to add beauty to a room.
              </li>
              <li>
                <strong className="text-gray-900">Plush</strong> – Has a luxurious textured feel,
                however it does leave imprints. Best to use in less populated areas.
              </li>
              <li>
                <strong className="text-gray-900">Saxony</strong> – An ideal texture for living
                and dining rooms and works well in a traditional interior.
              </li>
              <li>
                <strong className="text-gray-900">Level Loop Pile</strong> – This texture lasts a
                long time in populated areas. This texture is also a good choice in a contemporary
                to cottage furnishing.
              </li>
              <li>
                <strong className="text-gray-900">Multi-Level Loop Pile</strong> – This texture is
                durable and creates a patterned effect due to the different loop heights.
              </li>
            </ul>
          </FadeIn>

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
    </>
  )
}
