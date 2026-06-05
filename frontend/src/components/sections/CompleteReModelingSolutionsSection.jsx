'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const SOLUTIONS = [
  { label: 'Kitchen Cabinets Tampa',      image: '/1_img.jpg',   href: '/cabinets',            span: 'col-span-1 md:col-span-2' },
  { label: 'Flooring',                    image: '/2_img.webp',  href: '/flooring',            span: 'col-span-1 md:col-span-2' },
  { label: 'Quartz Countertops',          image: '/03_img.webp', href: '/countertops',         span: 'col-span-1 md:col-span-2' },
  { label: 'Granite Countertops',         image: '/4_img.webp',  href: '/countertops',         span: 'col-span-1 md:col-span-2' },
  { label: 'Cabinet Installation Tampa',  image: '/05_img.jpg',  href: '/cabinets',            span: 'col-span-1 md:col-span-2' },
  { label: 'Bathroom Remodeling',         image: '/06_img.webp', href: '/bathroom-remodeling', span: 'col-span-1 md:col-span-2' },
  { label: 'Kitchen Remodeling Services', image: '/07_img.jpg',  href: '/kitchen-remodeling',  span: 'col-span-2 md:col-span-3' },
  { label: 'Countertop Fabrication',      image: '/08_img.jpg',  href: '/countertops',         span: 'col-span-2 md:col-span-3' },
]

export function CompleteReModelingSolutionsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-4">
            Complete Kitchen Remodeling Solutions
          </h2>
          <p className="text-muted-foreground text-lg text-center max-w-3xl mx-auto mb-10">
            Cabinets &amp; Remodeling Depot offers more than cabinetry alone. Our showroom provides
            access to complete kitchen and remodeling solutions, including:
          </p>

          {/* Card grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-10">
            {SOLUTIONS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`${item.span}`}
              >
                <Link
                  href={item.href}
                  className="group relative block rounded-2xl overflow-hidden h-48 md:h-60 shadow-sm"
                >
                  {/* Background image */}
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />

                  {/* Dark gradient at bottom for text legibility */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent" />

                  {/* Label — bottom-left */}
                  <span className="absolute bottom-4 left-4 right-4 text-white font-bold text-sm md:text-base leading-snug drop-shadow-sm">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Closing quote */}
          <blockquote className="border-l-4 border-primary pl-5 max-w-2xl mx-auto">
            <p className="text-muted-foreground text-base md:text-lg italic leading-relaxed">
              Our goal is to help homeowners create spaces that feel comfortable, functional, and
              built to last.
            </p>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
