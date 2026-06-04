'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const defaultSteps = [
  {
    step: '01',
    title: 'Free Consultation',
    description: 'We start with a no-obligation consultation at your home or our showroom to discuss your vision, needs, and budget.',
  },
  {
    step: '02',
    title: 'Design & Planning',
    description: 'Our design experts create a detailed plan with 3D renderings so you can see exactly how your space will look.',
  },
  {
    step: '03',
    title: 'Material Selection',
    description: 'Choose from hundreds of premium materials, finishes, and fixtures at our showroom with expert guidance.',
  },
  {
    step: '04',
    title: 'Professional Installation',
    description: 'Our skilled craftsmen execute the project with precision, keeping you informed throughout every step.',
  },
]

export function ProcessSection({
  steps = defaultSteps,
  title = 'Our Simple Process',
  subtitle = 'From initial consultation to final walkthrough, we make remodeling easy and stress-free.',
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>}
        </motion.div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-border mx-[12.5%]" />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative text-center"
              >
                {/* Step number circle */}
                <div className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-6 mx-auto">
                  {step.step}
                </div>

                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
