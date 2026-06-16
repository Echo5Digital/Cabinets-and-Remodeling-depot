'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { FAQSection } from '@/components/sections/FAQSection'
import { ConsultationForm } from '@/components/forms/ConsultationForm'

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}


const FAQS = [
  {
    question: 'Do you offer complete kitchen remodel Tampa services?',
    answer:
      'Yes. We provide full kitchen remodeling services including cabinets, countertops, flooring, design support, and installation.',
  },
  {
    question: 'Can I visit your showroom before starting my kitchen renovation?',
    answer:
      'Absolutely. Our Valrico showroom allows homeowners to compare materials, layouts, and finishes in person.',
  },
  {
    question: 'Do you help with kitchen design?',
    answer:
      'Yes. Our tampa kitchen design team helps homeowners create layouts that improve functionality, storage, and overall kitchen flow.',
  },
  {
    question: 'Do you work on smaller kitchen renovation projects?',
    answer:
      "Yes. We work on both complete renovations and smaller kitchen upgrades depending on the homeowner's goals and budget.",
  },
]

// ── Page ───────────────────────────────────────────────────────────────────────
export function KitchenRemodelingPageClient() {

  return (
    <>
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden flex items-center">

        {/* Background: bright kitchen photo */}
        <Image
          src="/kitchen-remodeling-banner-new.webp"
          alt="Kitchen remodel Tampa modern kitchen"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Light overlay — keeps the bright kitchen visible, ensures text contrast */}
        <div className="absolute inset-0 bg-white/50" />

        {/* Content */}
        <div className="relative z-10 w-full py-16 md:py-20">
          <div className="container-custom max-w-6xl">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

              {/* Left: heading + body + CTA */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
              >
                <h1 className="mb-6 leading-tight">
                  <span className="block text-primary font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] uppercase tracking-wide">
                    Kitchen Remodel
                  </span>
                  <span className="block text-primary font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] uppercase tracking-wide">
                    Tampa
                  </span>
                  <span className="block text-primary font-bold text-xl sm:text-2xl md:text-3xl uppercase tracking-wide mt-2">
                    Custom Renovation &amp;
                  </span>
                  <span className="block text-primary font-bold text-xl sm:text-2xl md:text-3xl uppercase tracking-wide">
                    Kitchen Design Solutions
                  </span>
                </h1>
                <div className="space-y-4 text-gray-900 text-sm sm:text-base leading-relaxed max-w-lg mb-7">
                  <p>
                    A kitchen remodel is rarely just about replacing cabinets or upgrading countertops.
                    Most homeowners come in looking for something deeper, better functionality, more
                    storage, improved lighting, or simply a kitchen that finally feels comfortable to
                    spend time in again. At Cabinets &amp; Remodeling Depot, we help homeowners
                    throughout Tampa Bay create kitchens that work better for everyday living while still
                    reflecting personal style and long-term value.
                  </p>
                  <p>
                    From complete kitchen renovation Tampa projects to smaller layout updates and cabinet
                    replacements, our team provides practical remodeling guidance, professional
                    craftsmanship, and personalized design support from our Valrico showroom. Every
                    kitchen has different challenges, and honestly, that&rsquo;s what makes remodeling
                    interesting. Some homes need more efficient storage. Others need better traffic flow
                    for busy families or open-concept layouts that feel less closed off than older kitchen
                    designs.
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-widest text-sm sm:text-base h-12 sm:h-14 px-8"
                >
                  <Link href="/contact">Schedule a Free Consultation</Link>
                </Button>
              </motion.div>

              {/* Right: consultation form card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  Book Free Consultation
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Fill out the form and we&apos;ll contact you within 1 business day.
                </p>
                <ConsultationForm serviceName="Kitchen Remodeling" />
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Tampa Kitchen Design — 2-col: images left | text right ─────── */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

            {/* Left — stacked images */}
            <FadeIn className="space-y-3">
              <div className="relative w-full aspect-4/3 overflow-hidden rounded-xl shadow-md">
                <Image
                  src="/Modern-kitchen-renovation-Tampa-completed-project.jpg"
                  alt="Modern kitchen renovation Tampa completed project"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative w-full aspect-4/3 overflow-hidden rounded-xl shadow-md">
                  <Image
                    src="/freepik__quartz-vs-granite-for-bathroom-countertops-which-s__53320.webp"
                    alt="Quartz vs granite countertops Tampa"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative w-full aspect-4/3 overflow-hidden rounded-xl shadow-md">
                  <Image
                    src="/blog2-.jpeg"
                    alt="Kitchen remodeling Tampa"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Right — text content */}
            <FadeIn delay={0.1} className="space-y-5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                <span className="text-gray-900">Tampa Kitchen Design </span>
                <span className="text-primary">Tailored to Your Home</span>
              </h2>

              <div className="space-y-4 text-gray-900 text-base leading-relaxed">
                <p>
                  Good kitchen design is not only about appearance. A well-designed kitchen should feel
                  natural to use day after day. That means paying attention to storage, spacing,
                  lighting, appliance placement, and how people actually move through the room.
                </p>
                <p>
                  Our Tampa kitchen design team works closely with homeowners to create kitchens that
                  balance style with functionality. In many Tampa homes, especially older properties,
                  we often see layouts that waste space or limit storage unnecessarily. Even small
                  adjustments can completely change how a kitchen feels once the remodel is finished.
                </p>
              </div>

              <p className="text-lg font-bold text-primary">Our kitchen remodeling services include:</p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                {[
                  'Custom cabinetry solutions',
                  'Quartz and granite countertops',
                  'Kitchen layout redesign',
                  'Flooring upgrades',
                  'Lighting recommendations',
                  'Countertop fabrication and installation',
                  'Full kitchen renovation support',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-900 text-sm">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <Link href="#consultation">Start Your Kitchen Remodel</Link>
                </Button>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── Kitchen Renovation — full-width bg image section ──────────────── */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/beautiful-shot-modern-house-kitchen.jpg"
            alt="Beautiful modern kitchen renovation Tampa"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={false}
          />
          {/* Overlay — keeps text readable while showing the kitchen image */}
          <div className="absolute inset-0 bg-white/75" />
        </div>

        <div className="relative z-10 container-custom max-w-5xl space-y-8">

          <FadeIn>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight text-center">
              <span className="text-primary">Kitchen Renovation Tampa </span>
              <span className="text-gray-900">Homeowners Can Trust</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-4 text-gray-900 text-base leading-relaxed max-w-3xl mx-auto text-center">
            <p>
              A successful kitchen renovation requires more than materials alone. Communication,
              planning, and installation quality make a major difference once construction begins.
            </p>
            <p>
              At Cabinets &amp; Remodeling Depot, we help homeowners navigate every phase of the
              remodeling process from selecting finishes to coordinating cabinetry, countertops,
              and installation timelines. Our goal is to make the renovation process feel organized
              rather than overwhelming.
            </p>
            <p>
              Homeowners searching for a kitchen remodel near me Tampa often visit our showroom
              because they want to see materials in person before making decisions. Photos online
              can help, but they rarely show how colors, textures, and finishes actually look under
              real lighting conditions.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-lg font-bold text-primary mb-4 text-center">
              Our Valrico showroom allows homeowners to compare:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'Cabinet finishes',
                'Countertop materials',
                'Flooring options',
                'Kitchen color combinations',
                'Storage configurations',
                'Design styles and layouts',
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4 flex items-center justify-center gap-3"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                  <span className="text-gray-800 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white/90 border-l-4 border-primary rounded-r-xl px-6 py-4 max-w-3xl mx-auto text-center">
              <p className="text-gray-900 text-base leading-relaxed italic">
                That hands-on experience tends to make the remodeling process feel far more manageable.
              </p>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ── Valrico Kitchen Remodel — full-width bg image, left-aligned ───── */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        {/* Background image */}
        <Image
          src="/kitchen_countertops_marble.webp"
          alt="Kitchen remodeling contractors Tampa"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Light overlay */}
        <div className="absolute inset-0 bg-white/88" />

        <div className="relative z-10 container-custom max-w-5xl space-y-6">

          <FadeIn>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight text-primary">
              Valrico Kitchen Remodel &amp; Professional Installation Services
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-4 text-gray-900 text-base leading-relaxed max-w-3xl">
            <p>
              As experienced kitchen remodeling contractors Tampa Valrico showroom homeowners rely
              on, we focus on delivering remodeling solutions that feel cohesive from start to
              finish. Our team coordinates design, fabrication, and installation with close
              attention to detail because even small finishing issues can affect the overall
              appearance of a completed kitchen.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="space-y-4">
            <p className="text-lg font-bold text-primary">We proudly provide:</p>
            <ul className="space-y-2">
              {[
                'Kitchen remodel Tampa services',
                'Valrico kitchen remodel solutions',
                'Cabinet installation',
                'Countertop fabrication',
                'Kitchen renovation support',
                'Full-service remodeling guidance',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-900 text-base">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.2} className="max-w-3xl">
            <p className="text-gray-900 text-base leading-relaxed">
              Over the years, we&rsquo;ve worked on kitchens ranging from compact family homes to
              larger open-concept renovations designed around entertaining and gathering spaces.
              Every project brings different goals, budgets, and design preferences, which is why
              we avoid taking a one-size-fits-all approach to remodeling.
            </p>
          </FadeIn>

        </div>
      </section>

      {/* ── Why Homeowners Choose ─────────────────────────────────────────── */}
      <section className="relative py-14 md:py-20 overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/cabinet_remodeling_kitchen-03.webp"
            alt="Kitchen remodeling Tampa showroom"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* White overlay — light enough to keep text readable, transparent enough to show image */}
          <div className="absolute inset-0 bg-white/75" />
        </div>

        <div className="relative z-10 container-custom max-w-6xl space-y-10">

          {/* Top row — heading left | intro text right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            <FadeIn>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                <span className="text-gray-900">Why Homeowners Choose </span>
                <span className="text-primary">Cabinets &amp; Remodeling Depot</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-gray-900 text-base leading-relaxed">
                Homeowners across Tampa Bay continue to choose{' '}
                <strong>Cabinets &amp; Remodeling Depot</strong> because we combine remodeling
                experience with personalized customer support and local showroom access.
              </p>
            </FadeIn>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300" />

          {/* Bullet grid */}
          <FadeIn delay={0.1} className="text-center">
            <p className="text-lg font-bold text-primary mb-5">Why clients work with us:</p>
            <ul className="inline-grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-16 text-left mx-auto">
              {[
                'Local Valrico showroom',
                'Professional installation services',
                'Experienced remodeling professionals',
                'One-stop remodeling solutions',
                'Custom kitchen design support',
                'Personalized project guidance',
                'Cabinet and countertop selections',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-900 text-base">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Quote block */}
          <FadeIn delay={0.2}>
            <div className="bg-white shadow-sm border-l-4 border-primary rounded-r-xl px-6 py-5 max-w-3xl mx-auto text-center">
              <p className="text-gray-900 text-base leading-relaxed italic">
                We believe homeowners should feel informed and comfortable throughout the remodeling
                process, not pressured into rushed decisions or unnecessary upgrades.
              </p>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ── Frequently Asked Questions ────────────────────────────────────── */}
      <FAQSection faqs={FAQS} title="Frequently Asked Questions" />

      {/* ── Visit Our Valrico Showroom Today ──────────────────────────────── */}
      <section className="relative py-14 md:py-20 overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/kitchen_cabinet_remodeling-01.webp"
            alt="Kitchen cabinet remodeling Tampa"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/55" />
        </div>

        <div className="relative z-10 container-custom max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* Left: 2 image cards + Google Map */}
            <FadeIn className="space-y-4">

              {/* Two image cards side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-4/3 overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/kitchen-remodel.webp"
                    alt="Kitchen remodel Tampa"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-4/3 overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/kitchen-remodel-2.webp"
                    alt="Kitchen renovation Tampa"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>

              {/* Google Map */}
              <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://maps.google.com/maps?cid=18201794426186346316&output=embed&hl=en-US&t=k"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cabinets & Remodeling Depot — 106 S St Cloud Ave, Valrico, FL 33594"
                />
              </div>

            </FadeIn>

            {/* Right: heading + text + CTA */}
            <FadeIn delay={0.15} className="flex flex-col justify-center space-y-6 pt-2">

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
                <span className="text-gray-900">Visit Our </span>
                <span className="text-primary">Valrico<br className="hidden sm:block" /> Showroom</span>
                <span className="text-gray-900"> Today</span>
              </h2>

              <div className="space-y-4 text-gray-900 text-base leading-relaxed">
                <p>
                  If you&rsquo;re planning a kitchen remodel Tampa homeowners can genuinely feel
                  confident about, visit Cabinets &amp; Remodeling Depot today.
                </p>
                <p>
                  Explore cabinetry, countertops, and design solutions in person while speaking
                  directly with experienced remodeling professionals who understand how to create
                  kitchens that feel practical, comfortable, and built around everyday living.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-widest text-sm sm:text-base h-12 sm:h-14 px-8"
                >
                  <Link href="/contact">Visit Our Valrico Showroom</Link>
                </Button>
              </div>

            </FadeIn>

          </div>
        </div>
      </section>

    </>
  )
}
