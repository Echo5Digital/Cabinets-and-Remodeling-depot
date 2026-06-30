'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })
  const animating = useRef(false)

  useEffect(() => {
    if (!inView || animating.current) return
    animating.current = true

    const start = 0
    const end = parseInt(target, 10)
    const increment = end / (duration / 16)
    let current = start

    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [inView, target, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const defaultStats = [
  { value: '500', suffix: '+', label: 'Projects Completed' },
  { value: '15', suffix: '+', label: 'Years of Experience' },
  { value: '98', suffix: '%', label: 'Customer Satisfaction' },
  { value: '50', suffix: '+', label: 'Expert Team Members' },
]

export function StatsSection({ stats = defaultStats }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="section-padding bg-primary" ref={ref}>
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                {inView ? (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                ) : (
                  '0'
                )}
              </div>
              <p className="text-white/80 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
