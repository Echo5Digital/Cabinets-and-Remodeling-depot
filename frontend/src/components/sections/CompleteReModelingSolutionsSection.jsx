'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Utensils, Bath, Gem, LayoutGrid, Package, Layers, ArrowRight } from 'lucide-react'

const SOLUTIONS = [
  {
    label: 'Kitchen Remodeling',
    desc: 'Full kitchen remodels tailored to your style and budget.',
    image: '/07_img.jpg',
    href: '/kitchen-remodeling',
    Icon: Utensils,
  },
  {
    label: 'Bathroom Remodeling',
    desc: 'Beautiful, functional bathrooms designed for everyday living.',
    image: '/06_img.webp',
    href: '/bathroom-remodeling',
    Icon: Bath,
  },
  {
    label: 'Countertops',
    desc: 'Quartz, granite, marble, quartzite & porcelain.',
    image: '/03_img.webp',
    href: '/countertops',
    Icon: Gem,
  },
  {
    label: 'Kitchen Cabinets',
    desc: 'Quality cabinets in a variety of styles and finishes.',
    image: '/1_img.jpg',
    href: '/cabinets',
    Icon: LayoutGrid,
  },
  {
    label: 'In-Stock Cabinets',
    desc: 'Ready-to-install cabinets available for faster delivery.',
    image: '/05_img.jpg',
    href: '/cabinets',
    Icon: Package,
  },
  {
    label: 'Flooring',
    desc: 'Durable, beautiful flooring for every room.',
    image: '/2_img.webp',
    href: '/flooring',
    Icon: Layers,
  },
]

export function CompleteReModelingSolutionsSection() {
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
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3">
            Complete Kitchen Remodeling Solutions
          </h2>
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
            <div className="h-1 w-8 bg-primary rounded-full" />
            <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
          </div>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Cabinets &amp; Remodeling Depot offers more than cabinetry alone. Our showroom provides
            access to complete kitchen and remodeling solutions, including:
          </p>
        </motion.div>

        {/* 3×2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {SOLUTIONS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex"
            >
              <Link
                href={item.href}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col w-full"
              >
                {/* Image with icon badge */}
                <div className="relative h-56 sm:h-60 shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Dark gradient for icon readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  {/* Icon badge — bottom-left of image */}
                  <div className="absolute bottom-4 left-4 w-11 h-11 bg-white rounded-xl shadow-lg flex items-center justify-center">
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
          ))}
        </div>

        {/* Closing quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="border-l-4 border-primary pl-6 max-w-2xl mx-auto"
        >
          <p className="text-gray-600 text-base md:text-lg italic leading-relaxed">
            Our goal is to help homeowners create spaces that feel comfortable, functional, and
            built to last.
          </p>
        </motion.blockquote>

      </div>
    </section>
  )
}
