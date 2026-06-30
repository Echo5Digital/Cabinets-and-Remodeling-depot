'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const defaultTestimonials = [
  {
    name: 'Maria G.',
    location: 'Brandon, FL',
    rating: 5,
    text: 'They transformed our outdated kitchen into a stunning modern space. The attention to detail was incredible, and the team was professional from start to finish. Our new cabinets are absolutely beautiful!',
  },
  {
    name: 'James T.',
    location: 'Valrico, FL',
    rating: 5,
    text: 'We had our master bathroom completely remodeled. The quality of work exceeded our expectations. The project was completed on time and within budget. Highly recommend Cabinets & Remodeling Depot!',
  },
  {
    name: 'Sandra P.',
    location: 'Tampa, FL',
    rating: 5,
    text: 'The quartz countertops they installed are gorgeous. The team was knowledgeable and helped us pick the perfect design. Our kitchen has been completely transformed. Worth every penny!',
  },
]

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-primary text-primary' : 'text-primary/20'}`}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection({
  testimonials = defaultTestimonials,
  title = 'What Our Customers Say',
  subtitle = 'Hundreds of happy homeowners throughout the Tampa Bay area trust us with their remodeling projects.',
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4 h-full flex flex-col">
                  <div className="flex items-start justify-between">
                    <StarRating rating={item.rating} />
                    <Quote className="h-6 w-6 text-primary/30 shrink-0" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed grow italic">
                    &ldquo;{item.text}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.location}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
