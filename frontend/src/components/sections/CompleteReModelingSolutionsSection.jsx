'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Utensils, Bath, Gem, LayoutGrid, Package, Layers, ArrowRight } from 'lucide-react'

const SOLUTIONS = [
  {
    label: 'Kitchen Remodeling',
    desc: 'Full kitchen remodels tailored to your style and budget.',
    images: ['/07_img.jpg', '/kitchen-cabinet-2.jpg', '/kitchen-cabinet-3.jpg'],
    href: '/kitchen-remodeling',
    Icon: Utensils,
  },
  {
    label: 'Bathroom Remodeling',
    desc: 'Beautiful, functional bathrooms designed for everyday living.',
    images: ['/06_img.webp', '/bathroom-remodeling-2.jpg', '/bathroom-remodeling-3.jpg'],
    href: '/bathroom-remodeling',
    Icon: Bath,
  },
  {
    label: 'Kitchen Cabinets',
    desc: 'Quality cabinets in a variety of styles and finishes.',
    images: ['/1_img.jpg', '/kitchen_cabinet_4.jpg', '/kitchen_cabinet_5.jpg'],
    href: '/cabinets',
    Icon: LayoutGrid,
  },
  {
    label: 'Countertops',
    desc: 'Quartz, granite, marble, quartzite & porcelain.',
    images: ['/03_img.webp', '/countertops_2.jpg', '/countertops_3.jpg'],
    href: '/countertops',
    Icon: Gem,
  },
  {
    label: 'In-Stock Cabinets',
    desc: 'Ready-to-install cabinets available for faster delivery.',
    images: ['/05_img.jpg', '/instock-cabinets-1.jpg', '/instock-cabinets-2.jpg'],
    href: '/cabinets',
    Icon: Package,
  },
  {
    label: 'Flooring',
    desc: 'Durable, beautiful flooring for every room.',
    images: ['/2_img.webp', '/flooring-1.jpg', '/flooring-2.jpg'],
    href: '/flooring',
    Icon: Layers,
  },
]

// ── Individual service card with auto-crossfade carousel ─────────────────────
function ServiceCard({ item, index, inView }) {
  const [imgIdx, setImgIdx] = useState(0)

  useEffect(() => {
    // Stagger card timers so all 6 don't flip at the exact same moment
    let interval
    const delay = setTimeout(() => {
      interval = setInterval(() => {
        setImgIdx((prev) => (prev + 1) % item.images.length)
      }, 3500)
    }, index * 550)

    return () => {
      clearTimeout(delay)
      if (interval) clearInterval(interval)
    }
  }, [item.images.length, index])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="flex"
    >
      <Link
        href={item.href}
        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col w-full"
      >
        {/* ── Carousel image area ───────────────────────────────────────── */}
        <div className="relative h-56 sm:h-60 shrink-0 overflow-hidden">

          {/* Crossfade layers — no dots, no arrows */}
          {item.images.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === imgIdx ? 1 : 0 }}
            >
              <Image
                src={src}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}

          {/* Dark gradient — sits above carousel images */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />

          {/* Icon badge — bottom-left of image */}
          <div className="absolute bottom-4 left-4 w-11 h-11 bg-white rounded-xl shadow-lg flex items-center justify-center z-10">
            <item.Icon className="h-5 w-5 text-primary" />
          </div>

        </div>

        {/* Text content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-2 leading-snug">
            {item.label}
          </h3>
          <p className="text-gray-500 text-[0.95rem] sm:text-base leading-relaxed mb-5 flex-1">
            {item.desc}
          </p>
          <span className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export function CompleteReModelingSolutionsSection({ data }) {
  const sectionLabel = data && data.label ? data.label : 'Our Services'
  const sectionHeading = data && data.heading ? data.heading : null
  const sectionDescription = data && data.description ? data.description : null
  const sectionClosingText = data && data.closingText ? data.closingText : null
  const solutionItems = data && data.items && data.items.length ? data.items : null

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section className="section-padding bg-gray-50" ref={ref}>
      <div className="container-custom">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.18em] font-semibold text-primary/60 mb-3">
            {sectionLabel}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3">
            {sectionHeading || 'Complete Kitchen Remodeling Solutions'}
          </h2>
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
            <div className="h-1 w-8 bg-primary rounded-full" />
            <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
          </div>
          {sectionDescription ? (
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {sectionDescription}
            </p>
          ) : (
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Cabinets &amp; Remodeling Depot offers more than cabinetry alone. Our showroom provides
              access to complete kitchen and remodeling solutions, including:
            </p>
          )}
        </motion.div>

        {/* 3×2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {solutionItems ? (
            solutionItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex"
              >
                <a
                  href={item.href || '#'}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col w-full"
                >
                  {item.image && (
                    <div className="relative h-56 sm:h-60 shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.label || 'Service'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-2 leading-snug">{item.label || '(no label)'}</h3>
                    <p className="text-gray-500 text-[0.95rem] sm:text-base leading-relaxed mb-5 flex-1">{item.desc || ''}</p>
                    <span className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              </motion.div>
            ))
          ) : (
            SOLUTIONS.map((item, i) => (
              <ServiceCard key={item.label} item={item} index={i} inView={inView} />
            ))
          )}
        </div>

        {/* Closing quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="border-l-4 border-primary pl-6 max-w-2xl mx-auto"
        >
          <p className="text-gray-600 text-base md:text-lg italic leading-relaxed">
            {sectionClosingText || 'Our goal is to help homeowners create spaces that feel comfortable, functional, and built to last.'}
          </p>
        </motion.blockquote>

      </div>
    </section>
  )
}
