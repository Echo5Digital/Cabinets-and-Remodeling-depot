'use client'

import { motion } from 'framer-motion'

export function PageHeader({ title, subtitle, className = '' }) {
  return (
    <section className={`section-padding bg-primary ${className}`}>
      <div className="container-custom text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">{title}</h1>
          {subtitle && (
            <p className="text-white/80 text-lg leading-relaxed">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
