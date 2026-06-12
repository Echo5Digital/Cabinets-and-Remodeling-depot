'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Phone, Ruler, Wrench, ClipboardCheck } from 'lucide-react'

const STEPS = [
  {
    number: 1,
    Icon: Phone,
    title: 'Consult',
    desc: 'Chat with our team about your ideas, budget, and needs.',
  },
  {
    number: 2,
    Icon: Ruler,
    title: 'Plan',
    desc: 'Collaborate on design options and receive a detailed plan.',
  },
  {
    number: 3,
    Icon: Wrench,
    title: 'Install',
    desc: 'Our professionals handle everything with precision and care.',
  },
  {
    number: 4,
    Icon: ClipboardCheck,
    title: 'Enjoy',
    desc: 'Love your new space for years to come!',
  },
]

export function HowItWorksSection({ data }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const STEP_ICONS = [Phone, Ruler, Wrench, ClipboardCheck]
  const heading = data?.heading || 'How It Works'
  const steps = data?.steps?.length
    ? data.steps.map((s, i) => ({ number: i + 1, Icon: STEP_ICONS[i] || ClipboardCheck, title: s.title, desc: s.desc }))
    : STEPS

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 uppercase tracking-wide mb-5">
            {heading}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
            <div className="h-1 w-14 bg-primary rounded-full" />
            <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
          </div>
        </motion.div>

        {/* Steps + connector */}
        <div className="relative">

          {/* Horizontal connector line — desktop only */}
          <div
            className="hidden lg:flex items-center absolute z-0 pointer-events-none"
            style={{ top: '64px', left: '14%', right: '14%' }}
          >
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex-1 flex items-center">
                <div className="flex-1 h-px bg-gray-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300 shrink-0" />
                <div className="flex-1 h-px bg-gray-200" />
              </div>
            ))}
          </div>

          {/* Step cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-10 lg:gap-4">
            {steps.map(({ number, Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="pt-4 flex flex-col items-center text-center z-10"
              >
                {/* Circle + badge wrapper — badge positioned relative to circle */}
                <div className="relative mb-6">
                  {/* Number badge */}
                  <div className="absolute -top-3 -left-2 w-7 h-7 rounded-full bg-primary flex items-center justify-center z-20 shadow-md">
                    <span className="text-white font-extrabold text-sm leading-none">{number}</span>
                  </div>

                  {/* Circle */}
                  <div className="w-24 h-24 rounded-full border-2 border-gray-200 flex items-center justify-center bg-white shadow-sm">
                    <Icon className="h-10 w-10 text-primary" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-gray-900 text-base sm:text-lg md:text-xl uppercase tracking-widest mb-3">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-[200px]">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
