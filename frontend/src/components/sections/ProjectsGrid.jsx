'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const CATEGORY_LABELS = {
  KITCHEN_REMODELING: 'Kitchen Remodeling',
  BATHROOM_REMODELING: 'Bathroom Remodeling',
  CUSTOM_CABINETS: 'Custom Cabinets',
  KITCHEN_CABINETS: 'Kitchen Cabinets',
  STOCK_CABINETS: 'Stock Cabinets',
  QUARTZ_COUNTERTOPS: 'Quartz Countertops',
  GRANITE_COUNTERTOPS: 'Granite Countertops',
  FLOORING: 'Flooring',
  OTHER: 'Other',
}

function ProjectCard({ project, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-xl bg-primary/10 aspect-4/3">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 brand-gradient" />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground text-xs">
              {CATEGORY_LABELS[project.category] || project.category}
            </Badge>
          </div>

          {/* Hover arrow */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white rounded-full p-2">
              <ArrowRight className="h-4 w-4 text-primary" />
            </div>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <h3 className="font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
          {project.location && (
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {project.location}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export function ProjectsGrid({ projects = [], showViewAll = false, columns = 3 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  if (!projects.length) return null

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div ref={ref}>
      <div className={`grid ${gridCols} gap-6`}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id || index} project={project} index={index} inView={inView} />
        ))}
      </div>

      {showViewAll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-10"
        >
          <Button asChild variant="outline" size="lg">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
  )
}
