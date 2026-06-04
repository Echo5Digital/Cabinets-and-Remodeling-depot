'use client'

import { usePageContent } from '@/hooks/usePageContent'
import { useProjects } from '@/hooks/useProjects'
import { useBlogs } from '@/hooks/useBlogs'
import { useGallery } from '@/hooks/useGallery'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { StatsSection } from '@/components/sections/StatsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { GalleryGrid } from '@/components/sections/GalleryGrid'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTABanner } from '@/components/sections/CTABanner'
import { BlogGrid } from '@/components/sections/BlogGrid'
import { ContactForm } from '@/components/forms/ContactForm'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2, MapPin, ArrowRight } from 'lucide-react'

const SERVICE_AREAS = [
  'Tampa',
  'Brandon',
  'Riverview',
  'Valrico',
  'Apollo Beach',
  'Surrounding Tampa Bay communities',
]

const CABINET_INVENTORY = [
  'Stock kitchen cabinets Tampa homeowners love for fast projects',
  'Ready to install cabinets Tampa clients can select without long delays',
  'Custom cabinet styles for unique kitchen layouts',
  'Durable finishes designed for everyday use',
]

const REMODELING_SOLUTIONS = [
  'Kitchen cabinets Tampa',
  'Cabinet installation Tampa',
  'Quartz countertops',
  'Granite countertops',
  'Flooring',
  'Bathroom remodeling',
  'Kitchen remodeling services',
  'Countertop fabrication',
]

const WHY_CHOOSE_FEATURES = [
  'Experienced remodeling professionals',
  'Local Valrico showroom',
  'Affordable and custom cabinet options',
  'In-stock cabinetry available',
  'Personalized project support',
  'Professional installation services',
  'One-stop remodeling solutions',
]

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
          {subtitle && <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>}
        </motion.div>
      )}
      {children}
    </div>
  )
}

function ShowroomSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  return (
    <section className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Visit Our Kitchen Cabinet Showroom Tampa Homeowners Trust
          </h2>
          <p className="text-muted-foreground text-lg text-center max-w-3xl mx-auto mb-10">
            Seeing cabinetry in person makes a difference. Our Valrico showroom gives homeowners the
            opportunity to explore cabinet styles, finishes, countertop materials, and remodeling
            options before making a final decision.
          </p>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                If you&apos;ve been searching for a kitchen cabinet showroom Tampa homeowners recommend
                or looking online for a &ldquo;valrico showroom kitchen cabinets near me tampa,&rdquo;
                our showroom offers a convenient place to compare designs and speak directly with
                experienced remodeling professionals.
              </p>
              <p className="font-semibold text-foreground mb-4">
                We proudly serve homeowners across:
              </p>
              <ul className="space-y-2">
                {SERVICE_AREAS.map((area) => (
                  <li key={area} className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <Button size="lg" className="w-full" asChild>
                <Link href="/contact">
                  Visit Our Showroom
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full" asChild>
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full" asChild>
                <Link href="/contact">Request a Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full" asChild>
                <Link href="/cabinets">Explore Kitchen Cabinets</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function AffordableCabinetsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Affordable Cabinets Tampa Families Can Rely On
          </h2>
          <p className="text-muted-foreground text-lg text-center max-w-3xl mx-auto mb-8">
            A kitchen upgrade should feel exciting, not financially overwhelming. That&apos;s why we
            offer affordable cabinets Tampa homeowners can choose based on their style preferences,
            timeline, and remodeling goals.
          </p>

          <p className="font-semibold text-foreground text-center mb-6">Our inventory includes:</p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
            {CABINET_INVENTORY.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-4 rounded-lg border bg-muted/20"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Whether you prefer a modern shaker design or a more traditional kitchen style, we help you
            choose cabinetry that balances appearance, storage, and long-term value.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function ProfessionalInstallationSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  return (
    <section className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-custom max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Professional Cabinet Installation Tampa
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Great cabinets deserve proper installation. Our experienced cabinet installation Tampa team
            focuses on precision, alignment, functionality, and clean finishing details that help your
            kitchen look polished and complete.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            We work closely with homeowners throughout the remodeling process, helping coordinate
            cabinetry, countertops, and layout updates while minimizing unnecessary delays or
            confusion.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Every project is approached with attention to detail because we understand that a kitchen
            is more than another room&mdash;it&apos;s where daily life happens.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function CompleteReModelingSolutionsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Complete Kitchen Remodeling Solutions
          </h2>
          <p className="text-muted-foreground text-lg text-center max-w-3xl mx-auto mb-10">
            Cabinets &amp; Remodeling Depot offers more than cabinetry alone. Our showroom provides
            access to complete kitchen and remodeling solutions, including:
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {REMODELING_SOLUTIONS.map((solution) => (
              <div
                key={solution}
                className="flex items-start gap-3 p-4 rounded-lg border bg-muted/20"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground text-sm">{solution}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Our goal is to help homeowners create spaces that feel comfortable, functional, and built
            to last.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function WhyChooseSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  return (
    <section className="section-padding bg-muted/30" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Why Homeowners Choose Cabinets &amp; Remodeling Depot
          </h2>
          <p className="text-muted-foreground text-lg text-center max-w-3xl mx-auto mb-6">
            Homeowners across Tampa Bay continue to choose Cabinets &amp; Remodeling Depot because we
            focus on honest service, quality workmanship, and practical remodeling guidance.
          </p>

          <p className="font-semibold text-center mb-6">What sets us apart:</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {WHY_CHOOSE_FEATURES.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 p-4 rounded-lg border bg-white"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            We believe remodeling should feel organized, transparent, and tailored to your
            home&mdash;not rushed or overly complicated.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

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
        }}
      />

      {/* Stats */}
      <StatsSection stats={content.stats} />

      {/* H2: Visit Our Kitchen Cabinet Showroom Tampa Homeowners Trust */}
      <ShowroomSection />

      {/* Services */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionWrapper
            title="Our Remodeling Services"
            subtitle="From concept to completion, we deliver premium remodeling results throughout the Tampa Bay area."
          >
            <ServicesGrid services={content.services} />
          </SectionWrapper>
        </div>
      </section>

      {/* H2: Affordable Cabinets Tampa Families Can Rely On */}
      <AffordableCabinetsSection />

      {/* Process */}
      <ProcessSection steps={content.process} />

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

      {/* Testimonials */}
      <TestimonialsSection testimonials={content.testimonials} />

      {/* H2: Why Homeowners Choose Cabinets & Remodeling Depot */}
      <WhyChooseSection />

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

      {/* H2: Start Your Kitchen Remodeling Project Today */}
      <CTABanner
        heading={content.cta?.heading || 'Start Your Kitchen Remodeling Project Today'}
        subheading={
          content.cta?.subheading ||
          "If you're looking for kitchen cabinets Tampa homeowners trust for quality, value, and professional installation, visit Cabinets & Remodeling Depot today. Explore cabinet styles, compare countertop materials, and speak with our team about your remodeling goals."
        }
        buttonText={content.cta?.buttonText || 'Visit Our Showroom'}
        buttonLink={content.cta?.buttonLink || '/contact'}
        bgImage={content.cta?.bgImage}
      />

      {/* Contact Form */}
      <section className="section-padding">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Your Free Estimate</h2>
            <p className="text-muted-foreground text-lg">
              Tell us about your project and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
          <ContactForm source="home-page" />
        </div>
      </section>
    </>
  )
}
