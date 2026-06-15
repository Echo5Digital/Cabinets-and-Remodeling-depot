'use client'

import { usePageContent } from '@/hooks/usePageContent'
import { useProjects } from '@/hooks/useProjects'
import { useBlogs } from '@/hooks/useBlogs'
import { useGallery } from '@/hooks/useGallery'
import { normalizeContent, mergeWithPageDefaults } from '@/lib/pageContent'
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
import { PartnersSection } from '@/components/sections/PartnersSection'
import { ClientSuccessSection } from '@/components/sections/ClientSuccessSection'
import { StartProjectSection } from '@/components/sections/StartProjectSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { PreFooterSection } from '@/components/sections/PreFooterSection'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BadgePercent, Store, Wrench, Star, Heart } from 'lucide-react'

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

// ── FadeIn scroll-animation wrapper ──────────────────────────────────────────

function FadeIn({ children, delay = 0, className = '', x = 0, y = 24 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

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
          {title && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{title}</h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
                <div className="h-1 w-8 bg-primary rounded-full" />
                <div className="h-0.5 w-10 bg-primary/30 rounded-full" />
              </div>
            </>
          )}
          {subtitle && (
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">{subtitle}</p>
          )}
        </motion.div>
      )}
      {children}
    </div>
  )
}

// ── 5-card feature strip data ─────────────────────────────────────────────────

const FEATURE_STRIP = [
  {
    Icon: BadgePercent,
    title: 'Wholesale Pricing',
    desc: 'Direct importing. Better savings.',
  },
  {
    Icon: Store,
    title: 'Local Showroom',
    desc: 'Visit our Valrico showroom. See. Compare. Choose.',
  },
  {
    Icon: Wrench,
    title: 'Professional Installation',
    desc: 'Skilled team. Quality work. Done right.',
  },
  {
    Icon: Star,
    title: '5-Star Reviews',
    desc: 'Trusted by Tampa Bay homeowners.',
  },
  {
    Icon: Heart,
    title: 'One-Stop Shop',
    desc: 'Cabinets, countertops, flooring & more.',
  },
]

// Map CMS iconName strings to lucide-react Icon components
const FEATURE_STRIP_ICON_MAP = { BadgePercent, Store, Wrench, Star, Heart }

// ── Main home page component ──────────────────────────────────────────────────

export function HomeClient() {
  const { data: pageData } = usePageContent('home')
  const { data: projectsData } = useProjects({ limit: 6, featured: true })
  const { data: blogsData } = useBlogs({ limit: 3, isPublished: true })
  const { data: galleryData } = useGallery({ limit: 12 })

  const projects = projectsData?.data || []
  const blogs = blogsData?.data || []
  const gallery = galleryData?.data || []

  // Parse the unified sections format from the admin and merge with page defaults
  const normalized = normalizeContent(pageData?.content)
  const sections = mergeWithPageDefaults('home', normalized.sections)

  // Extract each section by type
  const heroSection         = sections.find((s) => s.type === 'hero')
  const featureStripSection = sections.find((s) => s.type === 'feature-strip')
  const solutionsSection    = sections.find((s) => s.type === 'solutions')
  const showroomSection     = sections.find((s) => s.type === 'showroom')
  const serviceAreasSection = sections.find((s) => s.type === 'service-areas')
  const affordableSection   = sections.find((s) => s.type === 'affordable')
  const howItWorksSection   = sections.find((s) => s.type === 'how-it-works')
  const transformSection    = sections.find((s) => s.type === 'transformation')
  const installSection      = sections.find((s) => s.type === 'installation')
  const whyChooseSection    = sections.find((s) => s.type === 'why-choose')
  const reviewsSection      = sections.find((s) => s.type === 'testimonials')
  const faqSection          = sections.find((s) => s.type === 'faq')
  const startProjectSection = sections.find((s) => s.type === 'start-project')
  const preFooterSection    = sections.find((s) => s.type === 'pre-footer')
  const partnersSection     = sections.find((s) => s.type === 'partners')

  const faqs = DEFAULT_FAQS

  // Build feature strip items: CMS items mapped to Icon components, else static fallback
  const featureStripItems = featureStripSection?.items?.length
    ? featureStripSection.items.map((item) => ({
        Icon: FEATURE_STRIP_ICON_MAP[item.iconName] || Star,
        title: item.title || '',
        desc: item.desc || '',
      }))
    : FEATURE_STRIP

  return (
    <>
      {/* H1: hero is always the original hardcoded content — not driven by DB */}
      <HeroSection data={{ backgroundImage: '/home-hero-bg.jpg' }} />

      {/* ── Floating 5-card feature strip ──────────────────────────────────── */}
      <div className="relative z-20 -mt-10 sm:-mt-14 px-4 sm:px-6 lg:px-8 pb-0">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-gray-100">
              {featureStripItems.map(({ Icon, title, desc }, i, arr) => (
                <div
                  key={title}
                  className={`bg-white flex flex-col items-center text-center px-5 sm:px-6 py-8 sm:py-9 lg:py-11 hover:bg-primary/3 transition-colors ${
                    i === arr.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                >
                  {/* Icon box */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 shrink-0">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-[0.95rem] sm:text-base lg:text-[1.05rem] leading-snug mb-2">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* H2: Complete Kitchen Remodeling Solutions */}
      <CompleteReModelingSolutionsSection data={solutionsSection} />

      {/* H2: Visit Our Kitchen Cabinet Showroom Tampa Homeowners Trust */}
      <ShowroomSection data={showroomSection} />

      {/* Service areas banner */}
      <ServiceAreasSection data={serviceAreasSection} />

      {/* H2: Affordable Cabinets Tampa Families Can Rely On */}
      <AffordableCabinetsSection data={affordableSection} />

      {/* How It Works — 4-step process */}
      <HowItWorksSection data={howItWorksSection} />

      {/* Before / After transformation slider */}
      <TransformationSection data={transformSection} />

      {/* H2: Professional Cabinet Installation Tampa */}
      <ProfessionalInstallationSection data={installSection} />

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="section-padding bg-gray-50">
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
      <WhyChooseSection data={whyChooseSection} />

      {/* Client Success Stories — Google review carousel */}
      <ClientSuccessSection reviewItems={reviewsSection?.items} />

      {/* Trusted Partners logo carousel */}
      <PartnersSection data={partnersSection} />

      {/* Blog Preview — temporarily hidden */}
      {/* {blogs.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <SectionWrapper
              title="Remodeling Tips & Ideas"
              subtitle="Expert advice to help you plan your perfect remodel."
            >
              <BlogGrid blogs={blogs} showViewAll />
            </SectionWrapper>
          </div>
        </section>
      )} */}

      {/* H2: Frequently Asked Questions */}
      <FAQSection faqs={faqs} />

      {/* Start Your Kitchen Remodeling Project Today */}
      <StartProjectSection data={startProjectSection} />

      {/* Pre-footer: CTA band + trust/payment strip */}
      <PreFooterSection data={preFooterSection} />

    </>
  )
}
