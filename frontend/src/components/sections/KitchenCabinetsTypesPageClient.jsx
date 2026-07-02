'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PageHeader } from '@/components/common/PageHeader'

/* ─── Fade-in wrapper ───────────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = '', y = 24 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Cabinet type section component ───────────────────────────────────────── */
function CabinetTypeSection({ number, title, image, imageAlt, children }) {
  return (
    <section className="py-14 md:py-20 border-b border-gray-100 last:border-0">
      <div className="container-custom max-w-4xl">
        {/* Company label header */}
        <FadeIn>
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1">
              Cabinets &amp; Remodeling Depot
            </p>
            <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
              {number}. {title}
            </h2>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Quality — Service — Value
            </p>
          </div>
        </FadeIn>

        {/* Image */}
        {image && (
          <FadeIn delay={0.05} className="mb-8">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          </FadeIn>
        )}

        {/* Content */}
        <FadeIn delay={0.08}>
          <div className="text-gray-600 text-base sm:text-lg leading-[1.82] space-y-5">
            {children}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── Pros / Cons list ──────────────────────────────────────────────────────── */
function ProsList({ items }) {
  return (
    <ul className="space-y-2 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-1.5 w-2 h-2 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ConsList({ items }) {
  return (
    <ul className="space-y-2 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-1.5 w-2 h-2 shrink-0 rounded-full bg-gray-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
export function KitchenCabinetsTypesPageClient() {
  return (
    <>
      {/* ── Page Header (burgundy banner with breadcrumb) ─────────────────── */}
      <PageHeader
        title="Kitchen Cabinets Types"
        subtitle="Home / Kitchen Cabinets Types"
      />

      {/* ════════════════════════════════════════════════════════════════════
          2. GLASS-FRONT CABINETS
      ════════════════════════════════════════════════════════════════════ */}
      <div className="bg-white">
        <CabinetTypeSection
          number="2"
          title="Glass-Front Cabinets"
          image="/cabinet-glass.jpg"
          imageAlt="Glass-front kitchen cabinets"
        >
          <p>
            You may not choose to have glass fronts on every cabinet in your kitchen (especially
            the below-counter ones), but it&apos;s OK to mix and match with, say, a flat-front
            style. Like a window, a single cabinet door can be made up of one or several panes
            of glass.
          </p>

          <div>
            <p className="font-bold text-gray-900 mb-2">Pros:</p>
            <ProsList
              items={[
                '"Glass-front cabinets always seem a little more special," says Parker. "They have a lovely reflection, which helps in a darker room, and of course they\'re great for displaying items you\'re proud of."',
                'As kitchens tend to be dusty and greasy places, Parker points out that glass-front cabinets display ceramics and glassware but keep them more protected than open shelves.',
                'Adding lights installed inside your glass-front cabinets will help brighten your kitchen—and also highlight what\'s displayed.',
                'Glass-front doors also let you add a design element inside the cabinets—say, installing beadboard in the back, or painting the interiors.',
              ]}
            />
          </div>

          <div>
            <p className="font-bold text-gray-900 mb-2">Cons:</p>
            <ConsList
              items={[
                "There's a downside to the display element: Since whatever's inside is in open view, you must keep your shelves neat and tidy. That's a good reason to have glass on only some of your cabinets—and put your best stuff in those. Or, choose frosted glass, for some opacity.",
                "Be sure the glass is high quality; for safety's sake you'll need it to be durable.",
                'Cleaning glass and wood is a two-step process. Dirt and dust can collect along the frames; glass is easily cleaned but will need a glass cleaner.',
                'Glass-front cupboards are a little more expensive than wood, says Parker, as the glazing takes more time to fit and finish in the shop.',
              ]}
            />
          </div>
        </CabinetTypeSection>

        {/* ════════════════════════════════════════════════════════════════════
            3. BEADBOARD CABINETS
        ════════════════════════════════════════════════════════════════════ */}
        <CabinetTypeSection
          number="3"
          title="Beadboard Cabinets"
          image="/kitchencabinet3.jpg"
          imageAlt="Beadboard kitchen cabinets"
        >
          <p>
            Beadboard (sometimes also called tongue-and-groove; see Remodeling 101: The Ultimate
            Wood Paneling Guide with Jersey Ice Cream Co.) describes a type of construction in
            which vertical slats are fitted into each other. &ldquo;It&apos;s definitely not for
            someone trying to achieve a minimal and sleek look, as it&apos;s detailed and
            textured,&rdquo; says Parker.
          </p>

          <div>
            <p className="font-bold text-gray-900 mb-2">Pros:</p>
            <ProsList
              items={[
                'Depending on the finish, beadboard can give you a relaxed, cottage-style look with Scandinavian overtones. It adds an element of warmth—just as it does when used to cover a wall in a hall or mudroom.',
                'Beadboard is available with "boards" in various widths. Do you want them around two inches, or wider? Consistent width, or varying widths for a more traditional look? Another common variation is a beadboard panel set in a stile-and-rail frame.',
                "Today's beadboard is often a solid piece of medium-density fiberboard, or MDF, milled to resemble pieces of wood fitted together. Sharp profiles in the grooves will make it look more like the real thing.",
                'Beadboard can also be used inside cabinets; deVol often puts it the backs of cabinets, to add a subtle touch of detail.',
              ]}
            />
          </div>

          <div>
            <p className="font-bold text-gray-900 mb-2">Cons:</p>
            <ConsList
              items={[
                'Beadboard requires careful cleaning, since the grooves can collect dirt and grease.',
                'The cost of beadboard varies, depending on the type of wood and the construction used.',
              ]}
            />
          </div>
        </CabinetTypeSection>

        {/* ════════════════════════════════════════════════════════════════════
            4. FLAT-FRONT CABINETS
        ════════════════════════════════════════════════════════════════════ */}
        <CabinetTypeSection
          number="4"
          title="Flat-Front Cabinets"
          image="/cabinet-slab.jpg"
          imageAlt="Flat-front slab kitchen cabinets"
        >
          <p>
            Flat-front doors, also called slab doors, are solid with no panels or other framing.
            It&apos;s a simple, minimalist look that works well in any modern or contemporary
            kitchen. Flat-front doors are generally made from a single piece of plywood or MDF,
            which is either painted or covered with wood veneer.
          </p>

          <div>
            <p className="font-bold text-gray-900 mb-2">Pros:</p>
            <ProsList
              items={[
                'No cabinet is easier to clean or refinish than one with a flat front.',
                'These make an excellent showcase for the hardware you choose (knobs, drawer pulls and the like).',
                "Because of their simplicity, flat-front cabinets can be the least expensive, but it all depends on the type of wood used, the finished applied, the hardware, and more.",
              ]}
            />
          </div>

          <div>
            <p className="font-bold text-gray-900 mb-2">Cons:</p>
            <ConsList
              items={[
                "Flat-front cabinets can look a little stark, but you can easily add interest by staining the wood or painting it. (They're particularly easy to paint.)",
              ]}
            />
          </div>
        </CabinetTypeSection>

        {/* ════════════════════════════════════════════════════════════════════
            5. PLYWOOD CABINETS
        ════════════════════════════════════════════════════════════════════ */}
        <CabinetTypeSection
          number="5"
          title="Plywood Cabinets"
          image="/kitchen-cabinet-2.jpg"
          imageAlt="Plywood kitchen cabinets"
        >
          <p>
            Many cabinets—both front and interior—are constructed of plywood, but designers are
            beginning to appreciate the wood not only for its functional merits but also for its
            beauty. &ldquo;Plywood has this very organic and warm quality that makes a space feel
            cozy and inviting,&rdquo; says Swedish architect Bj&ouml;rn F&ouml;rstberg, of
            F&ouml;rstberg Ling, who uses plywood in many of his projects. (See our full
            conversation with him here: Remodeling 101: A Plywood Primer.)
          </p>

          <div>
            <p className="font-bold text-gray-900 mb-2">Pros:</p>
            <ProsList
              items={[
                "Unlike lumber, plywood won't warp, shrink, or expand. Plus, it's incredibly strong and durable.",
                'A clear finish will bring out the grain of plywood on your cabinets and add to its appeal. "The natural, never-repeating patterns are hard to get tired of," says Förstberg. "Plywood is like a fine marble; nature does it best."',
              ]}
            />
          </div>

          <div>
            <p className="font-bold text-gray-900 mb-2">Cons:</p>
            <ConsList
              items={[
                'Be sure you choose a good-quality and sturdy type of plywood. Still, it\'s inexpensive compared to "furniture board," though it does cost more than MDF, which isn\'t as strong.',
              ]}
            />
          </div>
        </CabinetTypeSection>

        {/* ════════════════════════════════════════════════════════════════════
            6. NATURAL (UNFINISHED) WOOD CABINETS
        ════════════════════════════════════════════════════════════════════ */}
        <CabinetTypeSection
          number="6"
          title="Natural (Unfinished) Wood Cabinets"
          image="/kitchen-cabinet-3.jpg"
          imageAlt="Natural unfinished wood kitchen cabinets"
        >
          <p>
            At first glance it may sound like a recipe for disaster: unfinished wood in a
            kitchen? But homeowners who opt for this look like the informal, summer-cottage look,
            and the patina acquired with use.
          </p>

          <div>
            <p className="font-bold text-gray-900 mb-2">Pros:</p>
            <ProsList
              items={[
                "Unfinished wood is the least expensive choice. And if you decide you don't like the appearance, you can easily swap out (or finish) the doors.",
              ]}
            />
          </div>

          <div>
            <p className="font-bold text-gray-900 mb-2">Cons:</p>
            <ConsList
              items={[
                "Don't install unfinished wood cabinets unless your kitchen has an effective venting system (open windows just won't cut it).",
                'Even if you like the unfinished look, it\'s wise to choose a flat varnish or other finish that will keep grease and moisture from infiltrating the wood. "We use beech for our Sebastian Cox line, adding a varnish to highlight its beauty, retain its natural look, and keep it from getting dirty," says Parker. "It\'s lovely for people who like an organic feel to their kitchen and it\'s easy to clean. Since there are no colors to contend with, it goes with anything."',
              ]}
            />
          </div>
        </CabinetTypeSection>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          MORE TO CONSIDER — dark banner
      ════════════════════════════════════════════════════════════════════ */}
      <div className="bg-gray-900 py-8 px-4">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <p className="font-playfair text-white text-xl sm:text-2xl font-bold text-center leading-snug">
              Cabinets &amp; Remodeling Depot — More to consider:
            </p>
          </FadeIn>
        </div>
      </div>

      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <div className="text-center mb-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Quality — Service — Value
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <div className="space-y-5 text-gray-600 text-base sm:text-lg leading-[1.82]">
              <p>
                Cabinet prices vary widely, depending on the quality of the wood, the finish, and
                the style. When you&apos;re browsing cabinet styles, there are also many functional
                features to consider, and they all affect the final price tag: Are drawers
                available? How about wine racks or specialized fittings, like spice drawers? What
                hardware is used to install them (such as hinges and sliding mechanisms)? What
                material is on the inside? Then there&apos;s how you customize the look: the type
                of wood; the color, stain, or finish; the handles and knobs. Selecting the style
                is just the beginning, but it sets the groundwork.
              </p>
              <p>
                And, if you do ever tire of your beadboard or Shaker cabinets, the styles are
                simple enough that replacing the doors can be a fast and easy way to update your
                kitchen, as long as the cabinets themselves are still in good shape.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          BOTTOM CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/cabinet_img.webp"
            alt="Kitchen cabinets background"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/80" />
        </div>
        <div className="relative z-10 container-custom max-w-3xl text-center px-4">
          <FadeIn>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-gold" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold whitespace-nowrap">
                Tampa Bay Cabinet Experts
              </p>
              <span className="flex-1 max-w-15 sm:max-w-22.5 h-px bg-gold" />
            </div>
            <p className="font-playfair text-gray-900 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-6">
              Every cabinet is thoughtfully crafted and professionally installed to deliver
              exceptional quality and lasting beauty for your kitchen.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/85 text-white font-bold uppercase tracking-widest text-sm h-14 px-10 rounded-lg transition-colors shadow-lg whitespace-nowrap"
            >
              Request Free Estimate
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
