'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Plus, Minus } from 'lucide-react'

export function FAQSection({ faqs = [], title = 'Frequently Asked Questions', subtitle = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [openIndex, setOpenIndex] = useState(0)

  if (!faqs || faqs.length === 0) return null

  // Split title for two-tone heading: first word normal, rest bold primary
  const words = title.split(' ')
  const firstWord = words[0]
  const restWords = words.slice(1).join(' ')

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom max-w-4xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            {firstWord}{' '}
            <span className="text-primary">{restWords}</span>
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-3"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className={`border rounded-lg overflow-hidden transition-shadow duration-200 ${
                  isOpen ? 'border-primary/30 shadow-sm' : 'border-gray-200'
                }`}
              >
                {/* Question row */}
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  {/* +/- icon */}
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      isOpen ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {isOpen
                      ? <Minus className="w-4 h-4" />
                      : <Plus className="w-4 h-4" />
                    }
                  </span>

                  <span className={`font-semibold text-base md:text-lg leading-snug ${isOpen ? 'text-primary' : 'text-gray-800'}`}>
                    {faq.question}
                  </span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 sm:pl-17 pr-5 pb-5 text-muted-foreground leading-relaxed text-sm md:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
