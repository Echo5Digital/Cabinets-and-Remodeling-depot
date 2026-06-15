'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { User, Wrench } from 'lucide-react'

// ── Static content ─────────────────────────────────────────────────────────────

const SPECIALS = [
  {
    Icon: User,
    title: 'Our History',
    text: 'We created Cabinets & Remodeling Depot, formerly known as Brandon Discount Cabinets, because we wanted to create a place where our customers saw us as hardworking, honest, and have pride in the work that we do. Cabinets & Remodeling Depot is a company that wants to change the standard and give our clients quality products that will not disappoint them. We are proud of the work we have done, and we are expecting a greater future with our clients. Thank you for taking an interest in Cabinets & Remodeling Depot.',
  },
  {
    Icon: Wrench,
    title: 'Our Values',
    text: 'At Cabinet & Remodeling Depot, we value our clients. Our team believes in developing an impactful community with our Cabinets & Remodeling family. We take pride in being proactive and consistent with our approach to new projects and making sure our clients are happy.',
  },
]

// ── Page ───────────────────────────────────────────────────────────────────────

export function AboutClient() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [specialsRef, specialsInView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <>
      {/* ── Hero Banner ───────────────────────────────────────────────────── */}
      <section className="section-padding bg-gray-900">
        <div className="container-custom text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
              About Us
            </h1>
            <p className="text-white/50 text-sm tracking-wide">
              <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
              &nbsp;/&nbsp;About Us
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <section ref={ref} className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              {/* Section label */}
              <div className="mb-7">
                <div className="w-8 h-8 bg-primary mb-4" />
                <div className="inline-block border-2 border-gray-200 px-5 py-3 mb-4">
                  <h2 className="text-sm sm:text-base md:text-lg font-bold tracking-[0.12em] uppercase text-foreground leading-snug">
                    Pair Your Kitchen Cabinets And Countertops
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-primary/40" />
                  <p className="text-primary text-sm font-medium tracking-wide">
                    Quality - Service - Value
                  </p>
                  <div className="h-px w-8 bg-primary/40" />
                </div>
              </div>

              {/* Body */}
              <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4">
                <p>
                  Cabinets &amp; Remodeling Depot have been designing and supplying bathroom and
                  kitchen cabinets throughout the Tampa area for years. We aim to succeed but to
                  also go beyond every client&apos;s expectations. Our background of success was
                  founded on the principles that if we treat our clients right from the moment,
                  they call us, that they have no other choice but to flaunt to their friends and
                  family about us. To Cabinets &amp; Remodeling Depot, your referral is our highest
                  possible compliment.
                </p>
                <p>
                  Coming up with a cohesive kitchen begins with getting the right material which is
                  in coordinating colors. When you will be putting your kitchen together, you will
                  have to choose countertops, cupboards, appliances and floor styles. All these
                  represent your taste. Moreover, how you mix and match the materials and colors
                  creates a direct correlation with the types of vibes a kitchen gives off. There
                  are several ways of enabling one to coordinate cupboards, cabinets, and
                  countertops to get an appealing and creative aesthetic.
                </p>
                <p>
                  <strong className="text-gray-800">Color:</strong> Color of your kitchen will
                  give an integral look to it. At the same time, the color choice shapes up the
                  overall space into something that is elegant, fun, and light-hearted.
                </p>
                <p>
                  <strong className="text-gray-800">Material:</strong> Overall quality of a
                  kitchen largely depends on the type of material you choose. There are different
                  materials that you may use for countertops and cabinets.
                </p>
                <p>
                  <strong className="text-gray-800">Cabinet material:</strong> Most common
                  material in this regards is wood. However, there are other options such as
                  plywood, veneer, and laminating.
                </p>
                <p>
                  <strong className="text-gray-800">Countertop material:</strong> There is a
                  variety of countertop material in the market as well. For instance; engineered
                  stone, natural stone, ceramic tile, solid surface material, butcher block,
                  laminate, concrete, and stainless steel etc are few to be mentioned.
                </p>
                <p>
                  Once again it is suggested that color of your cabinets and countertops give an
                  overall look to your kitchen indeed and hence it needs to be well taken care of.
                </p>
                <p>
                  We at Cabinets &amp; Remodeling Depot will ensure our professional facilitation
                  in this regards. We know it well that as homeowners, we all like to have options.
                  Since there are so many choices available out there; options turn in to chores
                  and no one likes chores. Therefore, it is significant that you whittle down the
                  alternatives by following a set of criteria. The criteria must reflect what is
                  important for you while remodeling of your kitchen or bathroom.
                </p>
                <p>
                  This wonderful world of kitchen countertops, cabinets and bathroom vanities is
                  loaded with every main style along with the sub-style that one can think of. Here
                  once again, we are there to help you out. It does not matter if you are looking
                  forward to renovate your kitchen or bathroom; we will provide you with our
                  professional experience and guidance. We excel in providing kitchen and bathroom
                  shower faucets; custom designed kitchen cabinets Tampa FL, quartz, granite table
                  tops, bathroom vanities and much more. Similarly we amuse our valuable clients
                  with waterproof vinyl and laminate flooring enhancing beauty of your place in
                  every manner.
                </p>
                <p>
                  We will share with you different options of cabinet and countertops colors and
                  materials. Moreover, we will save you from pain remodeling your kitchen or
                  bathroom this year and having it outdated next year. Do not feel hesitate and
                  allow us to serve you with our professional services. We are just a few clicks
                  away from you at Cabinets &amp; Remodeling Depot. Cabinets And Remodeling Depot
                  provides you with the best kitchen countertops in Tampa.
                </p>
              </div>
            </motion.div>

            {/* Right — sticky image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:sticky lg:top-28"
            >
              <div className="relative w-full aspect-3/4 rounded-xl overflow-hidden">
                <Image
                  src="/gti.webp"
                  alt="Cabinets & Remodeling Depot showroom"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Our Specials ──────────────────────────────────────────────────── */}
      <section ref={specialsRef} className="relative py-16 md:py-24 overflow-hidden">
        {/* Background */}
        <Image
          src="/estimate_bg.jpg"
          alt=""
          fill
          aria-hidden="true"
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/72" />

        <div className="relative z-10 container-custom">

          {/* Section header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-5">
              <div className="w-11 h-11 bg-primary rotate-45 flex items-center justify-center shadow-md">
                <Wrench className="h-5 w-5 text-white -rotate-45" />
              </div>
            </div>
            <div className="inline-block border-2 border-white/30 px-8 sm:px-10 py-3 mb-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-[0.25em] uppercase text-white">
                Our Specials
              </h2>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-white/40" />
              <p className="text-white/70 text-sm font-medium tracking-widest uppercase">
                Quality. Service. Value.
              </p>
              <div className="h-px w-10 bg-white/40" />
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {SPECIALS.map(({ Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                animate={specialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-white/10 border border-white/20 backdrop-blur-sm p-6 sm:p-8"
              >
                <div className="w-12 h-12 rounded-full bg-primary/30 border border-primary/50 flex items-center justify-center mb-5">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
                  {title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
