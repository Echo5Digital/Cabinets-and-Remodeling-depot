'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Plus, Minus } from 'lucide-react'

/**
 * FAQSection
 *
 * Props:
 *   faqs       – array of { question, answer }
 *   title      – section heading
 *   subtitle   – optional subheading
 *   dark       – dark (sage green) background variant
 *   variant    – 'default' (maroon primary) | 'olive' (dark olive green) — only applies when dark=false
 */
export function FAQSection({
  faqs = [],
  title = 'Frequently Asked Questions',
  subtitle = '',
  dark = false,
  variant = 'default',
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [openIndex, setOpenIndex] = useState(0)

  if (!faqs || faqs.length === 0) return null

  const words = title.split(' ')
  const firstWord = words[0]
  const restWords = words.slice(1).join(' ')

  // Determine accent classes based on dark / variant
  const accentText  = dark ? 'text-gold'    : variant === 'olive' ? 'text-olive'     : 'text-primary'
  const accentBg    = dark ? 'bg-sage-card'  : variant === 'olive' ? 'bg-olive'       : 'bg-primary'
  const iconInactBg = dark ? 'bg-white/15'   : 'bg-gray-100'
  const iconInactTx = dark ? 'text-white/70' : 'text-gray-500'
  const borderOpen  = dark ? 'border-gold/40 bg-sage-card' : variant === 'olive' ? 'border-olive/30' : 'border-primary/30'
  const borderClose = dark ? 'border-white/20 bg-white/5'  : 'border-gray-200'
  const qOpenTx     = dark ? 'text-gold'     : variant === 'olive' ? 'text-olive'     : 'text-primary'
  const qCloseTx    = dark ? 'text-white'    : 'text-gray-800'
  const answerTx    = dark ? 'text-white/70' : 'text-muted-foreground'
  const headingTx   = dark ? 'text-white'    : 'text-gray-800'
  const accentSpan  = dark ? 'text-gold'     : variant === 'olive' ? 'text-olive'     : 'text-primary'

  return (
    <section className={`section-padding ${dark ? 'bg-sage' : 'bg-white'}`} ref={ref}>
      <div className="container-custom max-w-4xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold leading-tight font-[family-name:var(--font-playfair)] ${headingTx}`}>
            {firstWord}{' '}
            <span className={accentSpan}>{restWords}</span>
          </h2>
          {subtitle && (
            <p className={`text-lg mt-4 max-w-2xl mx-auto ${dark ? 'text-white/75' : 'text-muted-foreground'}`}>
              {subtitle}
            </p>
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
                  isOpen ? `${borderOpen} shadow-sm` : borderClose
                }`}
              >
                {/* Question row */}
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-start gap-4 px-5 py-4 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  {/* +/- icon */}
                  <span
                    className={`shrink-0 mt-0.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      isOpen ? `${accentBg} text-white` : `${iconInactBg} ${iconInactTx}`
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>

                  <span className={`font-semibold text-base md:text-lg leading-snug ${isOpen ? qOpenTx : qCloseTx}`}>
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
                      <div className={`pl-4 sm:pl-17 pr-5 pb-5 leading-relaxed text-sm md:text-base ${answerTx}`}>
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
