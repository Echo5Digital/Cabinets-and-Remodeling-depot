'use client'

import { usePageContent } from '@/hooks/usePageContent'
import { useProjects } from '@/hooks/useProjects'
import { useBlogs } from '@/hooks/useBlogs'
import { useGallery } from '@/hooks/useGallery'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { GalleryGrid } from '@/components/sections/GalleryGrid'
import { FAQSection } from '@/components/sections/FAQSection'
import { BlogGrid } from '@/components/sections/BlogGrid'
import { ShowroomSection } from '@/components/sections/ShowroomSection'
import { ServiceAreasSection } from '@/components/sections/ServiceAreasSection'
import { AffordableCabinetsSection } from '@/components/sections/AffordableCabinetsSection'
import { TransformationSection } from '@/components/sections/TransformationSection'
import { ProfessionalInstallationSection } from '@/components/sections/ProfessionalInstallationSection'
import { CompleteReModelingSolutionsSection } from '@/components/sections/CompleteReModelingSolutionsSection'
import { WhyChooseSection } from '@/components/sections/WhyChooseSection'
import { EstimateMapSection } from '@/components/sections/EstimateMapSection'
import { PartnersSection } from '@/components/sections/PartnersSection'
import { ClientSuccessSection } from '@/components/sections/ClientSuccessSection'
import { StartProjectSection } from '@/components/sections/StartProjectSection'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// ── Static content constants ──────────────────────────────────────────────────

const DEFAULT_FAQS = [
  {
    question: 'Do you offer affordable kitchen cabinets in Tampa?',
    answer:
      'Yes. We provide affordable cabinets Tampa homeowners can choose from, including stock and custom cabinet options.',
  },
  {
    question: 'Do you have in-stock cabinets available?',
    answer:
      'Absolutely. We carry in-stock cabinets Tampa homeowners often choose for faster remodeling timelines.',
  },
  {
    question: 'Do you provide cabinet installation Tampa services?',
    answer:
      'Yes. Our experienced team handles professional cabinet installation throughout the Tampa Bay area.',
  },
  {
    question: 'Where is your kitchen cabinet showroom located?',
    answer:
      'Our showroom is located in Valrico, serving homeowners throughout Tampa and nearby communities.',
  },
]

// ── Shared animated section wrapper ──────────────────────────────────────────

function SectionWrapper({ children, title, subtitle }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  return (
    <div ref={ref}>
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
          {subtitle && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
          )}
        </motion.div>
      )}
      {children}
    </div>
  )
}

// ── Main home page component ──────────────────────────────────────────────────

export function HomeClient() {
  const { data: pageData } = usePageContent('home')
  const { data: projectsData } = useProjects({ limit: 6, featured: true })
  const { data: blogsData } = useBlogs({ limit: 3, isPublished: true })
  const { data: galleryData } = useGallery({ limit: 12 })

  const content = pageData?.content || {}
  const projects = projectsData?.data || []
  const blogs = blogsData?.data || []
  const gallery = galleryData?.data || []
  const faqs = content.faqs?.length > 0 ? content.faqs : DEFAULT_FAQS

  return (
    <>
      {/* H1: Kitchen Cabinets Tampa – Quality Cabinets & Professional Installation */}
      <HeroSection
        data={{
          title: 'Kitchen Cabinets Tampa – Quality Cabinets & Professional Installation',
          subtitle:
            'Transform your kitchen with beautifully crafted cabinetry designed for the way you live. At Cabinets & Remodeling Depot, we help homeowners throughout Tampa Bay find stylish, functional, and affordable kitchen solutions without the stress that often comes with remodeling projects.',
          description:
            "From custom designs to in-stock cabinets Tampa homeowners can install quickly, our team provides expert guidance, quality materials, and dependable cabinet installation Tampa services all from our Valrico showroom. Whether you're updating a single kitchen or planning a full remodel, we're here to help make the process simpler, smoother, and more practical from start to finish.",
          ctaText: 'Visit Our Showroom',
          ctaLink: '/contact',
          backgroundImage: content.hero?.backgroundImage || '',
          videoSrc: '/1698799-Kitchen-Apartment-1920X1080.mp4',
        }}
      />

      {/* H2: Visit Our Kitchen Cabinet Showroom Tampa Homeowners Trust */}
      <ShowroomSection />

      {/* Service areas banner */}
      <ServiceAreasSection />

      {/* H2: Affordable Cabinets Tampa Families Can Rely On */}
      <AffordableCabinetsSection />

      {/* Before / After transformation slider */}
      <TransformationSection />

      {/* H2: Professional Cabinet Installation Tampa */}
      <ProfessionalInstallationSection />

      {/* H2: Complete Kitchen Remodeling Solutions */}
      <CompleteReModelingSolutionsSection />

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <SectionWrapper
              title="Our Recent Projects"
              subtitle="See the transformations we've created for homeowners across Tampa Bay."
            >
              <ProjectsGrid projects={projects} showViewAll />
            </SectionWrapper>
          </div>
        </section>
      )}

      {/* Gallery Preview */}
      {gallery.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <SectionWrapper
              title="Project Gallery"
              subtitle="Browse our portfolio of completed remodeling projects."
            >
              <GalleryGrid images={gallery.slice(0, 8)} showFilter={false} />
            </SectionWrapper>
          </div>
        </section>
      )}

      {/* H2: Why Homeowners Choose Cabinets & Remodeling Depot */}
      <WhyChooseSection />

      {/* Client Success Stories — Google review carousel */}
      <ClientSuccessSection />

      {/* Get Free Estimate + Google Map */}
      <EstimateMapSection />

      {/* Trusted Partners logo carousel */}
      <PartnersSection />

      {/* Blog Preview */}
      {blogs.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <SectionWrapper
              title="Remodeling Tips & Ideas"
              subtitle="Expert advice to help you plan your perfect remodel."
            >
              <BlogGrid blogs={blogs} showViewAll />
            </SectionWrapper>
          </div>
        </section>
      )}

      {/* H2: Frequently Asked Questions */}
      <FAQSection faqs={faqs} />

      {/* Start Your Kitchen Remodeling Project Today */}
      <StartProjectSection />

    </>
  )
}
