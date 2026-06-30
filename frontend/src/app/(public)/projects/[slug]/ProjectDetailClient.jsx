'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Calendar, Tag } from 'lucide-react'
import { useProject } from '@/hooks/useProjects'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { GalleryGrid } from '@/components/sections/GalleryGrid'
import { CTABanner } from '@/components/sections/CTABanner'
import { formatDate } from '@/lib/utils'

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

export function ProjectDetailClient({ slug }) {
  const { data: project, isLoading } = useProject(slug)

  if (isLoading) {
    return (
      <div className="section-padding container-custom space-y-6">
        <Skeleton className="h-[500px] w-full rounded-xl" />
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    )
  }

  if (!project) return null

  const galleryImages = (project.images || []).map((img) => ({
    id: img.id,
    url: img.url,
    alt: img.alt || project.title,
    category: 'GENERAL',
  }))

  return (
    <>
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back link */}
            <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
              <Link href="/projects">
                <ArrowLeft className="mr-1 h-4 w-4" />
                All Projects
              </Link>
            </Button>

            {/* Cover image */}
            <div className="relative aspect-[16/7] rounded-2xl overflow-hidden bg-primary/10 mb-8">
              {project.coverImage ? (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                />
              ) : (
                <div className="absolute inset-0 brand-gradient" />
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {/* Content */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {project.description}
                  </p>
                </div>

                {project.body && (
                  <div
                    className="prose prose-sm max-w-none text-foreground"
                    dangerouslySetInnerHTML={{ __html: project.body }}
                  />
                )}
              </div>

              {/* Meta */}
              <div className="space-y-4">
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-5 space-y-3">
                  <h3 className="font-semibold">Project Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Tag className="h-4 w-4 flex-shrink-0" />
                      <span>{CATEGORY_LABELS[project.category] || project.category}</span>
                    </div>
                    {project.location && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span>{project.location}</span>
                      </div>
                    )}
                    {project.completedAt && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span>{formatDate(project.completedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link href="/contact">Get Similar Results</Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Project gallery */}
          {galleryImages.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Project Photos</h2>
              <GalleryGrid images={galleryImages} showFilter={false} />
            </div>
          )}
        </div>
      </section>

      <CTABanner
        heading="Ready to Transform Your Home?"
        subheading="Contact us for a free estimate on your remodeling project."
        buttonText="Get Free Estimate"
        buttonLink="/contact"
      />
    </>
  )
}
