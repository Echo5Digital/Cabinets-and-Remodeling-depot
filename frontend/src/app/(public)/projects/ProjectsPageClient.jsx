'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useProjects } from '@/hooks/useProjects'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const CATEGORIES = [
  { value: '', label: 'All Projects' },
  { value: 'KITCHEN_REMODELING', label: 'Kitchen Remodeling' },
  { value: 'BATHROOM_REMODELING', label: 'Bathroom Remodeling' },
  { value: 'CUSTOM_CABINETS', label: 'Custom Cabinets' },
  { value: 'QUARTZ_COUNTERTOPS', label: 'Quartz Countertops' },
  { value: 'GRANITE_COUNTERTOPS', label: 'Granite Countertops' },
  { value: 'FLOORING', label: 'Flooring' },
]

export function ProjectsPageClient() {
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const { data, isLoading } = useProjects({ category, page, limit: 12 })
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const projects = data?.data || []
  const total = data?.pagination?.total || 0
  const totalPages = data?.pagination?.pages || 1

  return (
    <>
      <PageHeader
        title="Our Project Portfolio"
        subtitle="Explore completed kitchen and bathroom remodeling projects, custom cabinets, countertops, and flooring installations throughout the Tampa Bay area."
      />

      <section className="section-padding" ref={ref}>
        <div className="container-custom">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {CATEGORIES.map((cat) => (
              <Button
                key={cat.value}
                variant={category === cat.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => { setCategory(cat.value); setPage(1) }}
              >
                {cat.label}
              </Button>
            ))}
          </motion.div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No projects found for this category.
            </div>
          ) : (
            <>
              <ProjectsGrid projects={projects} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  <Button
                    variant="outline"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4 text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
