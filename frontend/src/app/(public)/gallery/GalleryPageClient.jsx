'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useGallery } from '@/hooks/useGallery'
import { GalleryGrid } from '@/components/sections/GalleryGrid'
import { Skeleton } from '@/components/ui/skeleton'

// ── Gallery hero banner ───────────────────────────────────────────────────────

function GalleryBanner() {
  return (
    <section className="relative flex items-center justify-center section-padding overflow-hidden">

      {/* Background image — top center */}
      <Image
        src="/Cabinet-Slide-650x350-1.jpg"
        alt="Cabinets & Remodeling Depot showroom"
        fill
        priority
        className="object-cover object-top"
        sizes="100vw"
      />

      {/* Dark overlay — matches PageHeader look */}
      <div className="absolute inset-0 bg-primary/80" />

      {/* Heading */}
      <div className="container-custom relative z-10 text-center max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          Our Stunning Showroom Gallery
        </motion.h1>
      </div>

    </section>
  )
}

// ── Framed heading below banner ───────────────────────────────────────────────

function GalleryHeading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="bg-white flex flex-col items-center text-center px-4 pt-8 pb-4 sm:pt-10 sm:pb-6"
    >
      {/* Icon badge */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 overflow-hidden mb-4 shrink-0 shadow-md">
        <Image
          src="/cabinet_fav.jpg"
          alt="Cabinets & Remodeling Depot"
          width={56}
          height={56}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Framed card */}
      <div
        className="bg-white px-8 sm:px-14 md:px-20 py-5 sm:py-7"
        style={{ border: '1px solid rgba(0,0,0,0.12)' }}
      >
        {/* Top rule */}
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
          <div className="h-px w-8 sm:w-10 bg-primary" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          <div className="h-px w-8 sm:w-10 bg-primary" />
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 uppercase tracking-[0.08em] leading-tight mb-3 sm:mb-4">
          Tour of Our Showroom
        </h2>
        <p className="text-primary font-bold text-xs sm:text-sm uppercase tracking-[0.22em]">
          Tampa, Florida
        </p>

        {/* Bottom rule */}
        <div className="flex items-center justify-center gap-3 mt-3 sm:mt-4">
          <div className="h-px w-8 sm:w-10 bg-gray-200" />
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
          <div className="h-px w-8 sm:w-10 bg-gray-200" />
        </div>
      </div>
    </motion.div>
  )
}

// ── Visit Our Showroom section ────────────────────────────────────────────────

function VisitShowroom() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-4xl">

        {/* Heading block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Icon badge */}
          <div className="w-10 h-10 overflow-hidden mb-4 shrink-0 shadow-md">
            <Image
              src="/cabinet_fav.jpg"
              alt="Cabinets & Remodeling Depot"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title + tagline with left border */}
          <div className="border-l-4 border-primary pl-4 mb-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-gray-900 leading-tight">
              Visit Our Showroom
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <p className="italic text-primary font-semibold text-sm sm:text-base whitespace-nowrap">
                Quality - Service - Value.
              </p>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gray-100" />
        </motion.div>

        {/* Body content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-5 text-gray-700 leading-relaxed text-[15px] sm:text-base"
        >
          <p>
            You will find a one-stop shop for anything and everything that you will need for your
            home, kitchen, and{' '}
            <Link href="/bathroom-remodeling" className="text-primary font-bold hover:underline underline-offset-2">Bathroom Remodeling In Tampa</Link>.
            Visiting us, you will not have to visit from one shop to another. Just stop by our
            showroom and you will find:
          </p>

          <p>
            <strong className="text-gray-900">Cabinets:</strong> These include the{' '}
            <Link href="/cabinets" className="text-primary font-bold hover:underline underline-offset-2">Custom Kitchen Cabinets Tampa</Link>,
            Solid Wood Cabinets, Online Kitchen Cabinets Fully Assembled, Etc.
          </p>

          <p>
            <strong className="text-gray-900">Countertops:</strong> You will find all kinds of
            countertops, such as{' '}
            <Link href="/countertops" className="text-primary font-bold hover:underline underline-offset-2">Granite Countertops Tampa</Link>,{' '}
            <Link href="/countertops" className="text-primary font-bold hover:underline underline-offset-2">Quartz Countertops Tampa</Link>, Laminate
            Countertops, DIY Laminate Countertops, Solid Surface Countertops, etc.
          </p>

          <p>
            <strong className="text-gray-900">Faucets:</strong> Our range of Faucets will amuse
            you with{' '}
            <Link href="/kitchen-remodeling" className="text-primary font-bold hover:underline underline-offset-2">Kitchen Faucets</Link>, Kitchen Faucets
            With Sprayer,{' '}
            <Link href="/bathroom-remodeling" className="text-primary font-bold hover:underline underline-offset-2">Bathroom Faucets</Link>, Bathroom Shower
            Faucets, Bathtub Faucets, Bathroom Sink Faucets, and many more.
          </p>

          <p>
            <strong className="text-gray-900">Vanities:</strong> Our modern{' '}
            <Link href="/bathroom-remodeling" className="text-primary font-bold hover:underline underline-offset-2">Bathroom Vanities In Tampa</Link>, with
            and without basins, will enhance the overall look of your bathroom.
          </p>

          <p>
            <strong className="text-gray-900">Flooring:</strong> Last but not least, we offer{' '}
            <Link href="/flooring" className="text-primary font-bold hover:underline underline-offset-2">Flooring In Tampa</Link> to our valued
            customers, too. These options include wood flooring, Engineered{' '}
            <Link href="/flooring/wood-flooring" className="text-primary font-bold hover:underline underline-offset-2">Wood Flooring</Link>, solid wood
            flooring,{' '}
            <Link href="/flooring/laminate-flooring-in-tampa" className="text-primary font-bold hover:underline underline-offset-2">Laminate Flooring</Link>, waterproofing,
            etc.
          </p>

          <p>
            Cabinets and Remodeling Depot provides you with{' '}
            <Link href="/kitchen-remodeling" className="text-primary font-bold hover:underline underline-offset-2">Kitchen Remodel Tampa</Link>. We take
            pride in offering high-quality services at competitive prices. You can have a free
            estimate of your remodeling activity with us.{' '}
            <Link href="/contact" className="text-primary font-bold hover:underline underline-offset-2">Contact us</Link> and allow us to serve
            you with our highly professional services. We are waiting for you.
          </p>
        </motion.div>

      </div>
    </section>
  )
}

// ── Gallery page ──────────────────────────────────────────────────────────────

export function GalleryPageClient() {
  const { data, isPending, isError, refetch } = useGallery({ limit: 100 })
  const images = data?.data || []

  return (
    <>
      <GalleryBanner />
      <GalleryHeading />

      <section className="pt-4 pb-10 md:pt-6 md:pb-16">
        <div className="container-custom">
          {isPending ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg break-inside-avoid" />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="mb-4">Unable to load gallery. Please check back shortly.</p>
              <button
                onClick={() => refetch()}
                className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors text-sm font-medium"
              >
                Try again
              </button>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              Gallery coming soon. Check back soon!
            </div>
          ) : (
            <GalleryGrid images={images} showFilter />
          )}
        </div>
      </section>

      <VisitShowroom />
    </>
  )
}
