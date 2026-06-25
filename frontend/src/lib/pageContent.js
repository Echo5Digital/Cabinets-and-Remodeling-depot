/**
 * Utilities for normalizing page content between the legacy named-key
 * format and the new unified sections array format.
 *
 * Legacy format:  { hero: {...}, faq: [...], cta: {...}, seo: {...}, ... }
 * New format:     { sections: [{id, type, ...fields}], seo: {...}, schema: '' }
 */

/**
 * Ensure every section in an array has an id field.
 * Also fixes any field-name inconsistencies introduced by old versions:
 *   - process sections that accidentally used `items` instead of `steps`
 */
export function ensureSectionIds(sections) {
  return sections.map((s) => {
    let section = s.id ? s : { ...s, id: crypto.randomUUID() }
    // Heal process sections that were saved with `items` instead of `steps`
    if (section.type === 'process' && Array.isArray(section.items) && !section.steps) {
      const { items, ...rest } = section
      section = { ...rest, steps: items }
    }
    return section
  })
}

/**
 * Convert any page content object (old or new format) to the unified
 * { sections, seo, schema } shape used by the admin editor.
 *
 * Safe to call with null / undefined — returns an empty default.
 */
export function normalizeContent(content) {
  if (!content) return { sections: [], seo: {}, schema: '' }

  // Already in new format: sections array whose items carry a .type field
  if (
    Array.isArray(content.sections) &&
    content.sections.length > 0 &&
    content.sections[0]?.type
  ) {
    return {
      sections: ensureSectionIds(content.sections),
      seo: content.seo || {},
      schema: content.schema || '',
    }
  }

  // Empty new-format object (freshly saved but no sections yet)
  if (Array.isArray(content.sections) && content.sections.length === 0) {
    return {
      sections: [],
      seo: content.seo || {},
      schema: content.schema || '',
    }
  }

  // ── Convert legacy named-key format ─────────────────────────────────────
  const sections = []

  // Hero
  if (content.hero && (content.hero.title || content.hero.backgroundImage)) {
    sections.push({
      id: crypto.randomUUID(),
      type: 'hero',
      ...content.hero,
    })
  }

  // Text / content block
  if (content.content && (content.content.heading || content.content.body)) {
    sections.push({
      id: crypto.randomUUID(),
      type: 'text',
      heading: content.content.heading || '',
      body: content.content.body || '',
      image: content.content.image || '',
      layout: content.content.layout || 'full',
    })
  }

  // About page: story → text
  if (content.story && (content.story.heading || content.story.body)) {
    sections.push({
      id: crypto.randomUUID(),
      type: 'text',
      heading: content.story.heading || 'Our Story',
      body: content.story.body || '',
      image: content.story.image || '',
      layout: 'full',
    })
  }

  // Stats
  if (Array.isArray(content.stats) && content.stats.length > 0) {
    sections.push({
      id: crypto.randomUUID(),
      type: 'stats',
      heading: '',
      items: content.stats,
    })
  }

  // Home page: whyChooseUs → features
  if (content.whyChooseUs?.items?.length) {
    sections.push({
      id: crypto.randomUUID(),
      type: 'features',
      heading: content.whyChooseUs.heading || 'Why Choose Us',
      subheading: content.whyChooseUs.subheading || '',
      items: content.whyChooseUs.items,
    })
  }

  // Services list
  if (Array.isArray(content.services) && content.services.length > 0) {
    sections.push({
      id: crypto.randomUUID(),
      type: 'services',
      heading: 'Our Services',
      items: content.services,
    })
  }

  // Generic features array
  if (Array.isArray(content.features) && content.features.length > 0) {
    sections.push({
      id: crypto.randomUUID(),
      type: 'features',
      heading: 'Features',
      subheading: '',
      items: content.features,
    })
  }

  // About page: values → features
  if (Array.isArray(content.values) && content.values.length > 0) {
    sections.push({
      id: crypto.randomUUID(),
      type: 'features',
      heading: 'Our Values',
      subheading: '',
      items: content.values,
    })
  }

  // Cabinet types / countertop types / flooring types → services
  const typeArrayKey = ['cabinetTypes', 'countertopTypes', 'flooringTypes'].find(
    (k) => Array.isArray(content[k]) && content[k].length > 0
  )
  if (typeArrayKey) {
    sections.push({
      id: crypto.randomUUID(),
      type: 'services',
      heading: '',
      items: content[typeArrayKey],
    })
  }

  // Process steps (handles both legacy `process` array and objects with steps/items)
  if (Array.isArray(content.process) && content.process.length > 0) {
    sections.push({
      id: crypto.randomUUID(),
      type: 'process',
      heading: 'Our Process',
      steps: content.process,
    })
  }

  // Testimonials (handles both `testimonials` array and objects with items)
  const testimonialItems = Array.isArray(content.testimonials)
    ? content.testimonials
    : content.testimonials?.items
  if (Array.isArray(testimonialItems) && testimonialItems.length > 0) {
    sections.push({
      id: crypto.randomUUID(),
      type: 'testimonials',
      heading: content.testimonials?.heading || 'What Our Clients Say',
      items: testimonialItems,
    })
  }

  // FAQ (handles both `faq` and `faqs` keys, array or object with items)
  const faqSource = content.faq || content.faqs
  const faqItems = Array.isArray(faqSource) ? faqSource : faqSource?.items
  if (Array.isArray(faqItems) && faqItems.length > 0) {
    sections.push({
      id: crypto.randomUUID(),
      type: 'faq',
      heading: faqSource?.heading || 'Frequently Asked Questions',
      items: faqItems,
    })
  }

  // CTA
  if (content.cta && (content.cta.heading || content.cta.buttonText)) {
    sections.push({
      id: crypto.randomUUID(),
      type: 'cta',
      ...content.cta,
    })
  }

  // About page: team members → text section (if members exist)
  if (content.team?.members?.length) {
    const membersList = content.team.members
      .map((m) => `${m.name || ''}${m.role ? ` — ${m.role}` : ''}`)
      .filter(Boolean)
      .join('\n')
    sections.push({
      id: crypto.randomUUID(),
      type: 'text',
      heading: content.team.heading || 'Meet Our Team',
      body: membersList,
      image: '',
      layout: 'full',
    })
  }

  // Contact page: contactInfo → text section
  if (content.contactInfo) {
    const ci = content.contactInfo
    const lines = [
      ci.phone ? `Phone: ${ci.phone}` : '',
      ci.email ? `Email: ${ci.email}` : '',
      ci.address ? `Address: ${ci.address}` : '',
      ...(Array.isArray(ci.hours)
        ? ci.hours.map((h) => `${h.day}: ${h.hours}`)
        : []),
    ].filter(Boolean)
    sections.push({
      id: crypto.randomUUID(),
      type: 'text',
      heading: 'Contact Information',
      body: lines.join('\n'),
      image: '',
      layout: 'full',
    })
  }

  return {
    sections,
    seo: content.seo || {},
    schema: content.schema || '',
  }
}

/**
 * Default field values for a newly created section of a given type.
 */
export function getSectionDefaults(type) {
  const defaults = {
    hero: {
      title: '',
      subtitle: '',
      description: '',
      backgroundImage: '',
      ctaText: 'Get Free Estimate',
      ctaLink: '/contact',
      secondaryCtaText: '',
      secondaryCtaLink: '',
    },
    text: { heading: '', body: '', image: '', layout: 'full' },
    features: {
      heading: '',
      subheading: '',
      items: [{ title: '', description: '', icon: '' }],
    },
    faq: {
      heading: 'Frequently Asked Questions',
      items: [{ question: '', answer: '' }],
    },
    cta: {
      heading: '',
      subheading: '',
      buttonText: 'Get Free Estimate',
      buttonLink: '/contact',
      backgroundImage: '',
    },
    stats: {
      heading: '',
      items: [{ value: '', label: '' }],
    },
    services: {
      heading: 'Our Services',
      items: [{ title: '', description: '', icon: '', link: '', image: '' }],
    },
    process: {
      heading: 'Our Process',
      steps: [{ step: 1, title: '', description: '' }],
    },
    testimonials: {
      heading: 'What Our Clients Say',
      items: [{ name: '', location: '', rating: 5, text: '', avatar: '' }],
    },
    // ── Home page custom section types ────────────────────────────────────────
    'feature-strip': {
      items: [{ iconName: '', title: '', desc: '' }],
    },
    solutions: {
      label: 'Our Services',
      heading: 'Complete Kitchen Remodeling Solutions',
      description: '',
      closingText: '',
      items: [{ label: '', desc: '', image: '', href: '' }],
    },
    showroom: {
      label: '',
      heading: 'Visit Our Showroom',
      body: '',
      bgImage: '',
    },
    'service-areas': {
      label: 'Service Coverage',
      heading: 'We proudly serve homeowners across:',
      areas: ['Tampa'],
    },
    affordable: {
      label: 'Affordable Options',
      heading: 'Affordable Cabinets',
      body: '',
      bgImage: '',
      items: [''],
      cta1Text: 'Visit Our Showroom',
      cta1Link: '/contact',
      cta2Text: 'Request a Quote',
      cta2Link: '/contact',
    },
    'how-it-works': {
      heading: 'How It Works',
      steps: [{ title: '', desc: '' }],
    },
    transformation: {
      label: 'Before & After',
      heading: 'See Our Transformations',
      description: 'Drag the slider to see the dramatic difference our expert remodeling makes.',
      beforeImage: '',
      afterImage: '',
    },
    installation: {
      label: 'Expert Installation',
      heading: 'Professional Cabinet Installation',
      bgImage: '',
      paragraphs: [''],
    },
    'why-choose': {
      heading: 'Why Choose Us',
      body: '',
      features: [''],
      closingText: '',
      bgImage: '',
      address: '',
      phone: '',
      email: '',
      hours: '',
      mapLink: '',
    },
    'start-project': {
      heading: 'Start Your Project Today',
      body: '',
      bgImage: '',
      ctaText: 'Contact Us',
      ctaLink: '/contact',
    },
    'pre-footer': {
      heading: 'Ready to Start Your Project?',
      description: '',
      phone: '',
      trustItems: [''],
    },
    partners: {
      label: 'Our Partners',
      heading: 'Our Trusted Partners',
      description: '',
      logos: [''],
    },
  }
  return defaults[type] || {}
}

// ── Page-level default sections (used by mergeWithPageDefaults) ───────────────

const PAGE_DEFAULT_SECTIONS = {
  home: [
    {
      id: 'home-hero',
      type: 'hero',
      title: 'Kitchen Cabinets Tampa – Quality Cabinets & Professional Installation',
      subtitle: 'Transform your kitchen with beautifully crafted cabinetry designed for the way you live. At Cabinets & Remodeling Depot, we help homeowners throughout Tampa Bay find stylish, functional, and affordable kitchen solutions without the stress that often comes with remodeling projects.',
      description: "From custom designs to kitchen cabinets Tampa homeowners can install quickly, our team provides expert guidance, quality materials, and dependable cabinet installation Tampa services all from our Valrico showroom. Whether you're updating a single kitchen or planning a full remodel, we're here to help make the process simpler, smoother, and more practical from start to finish.",
      backgroundImage: '/home-hero-bg.jpg',
      ctaText: 'Visit Our Showroom',
      ctaLink: '/contact',
      secondaryCtaText: '',
      secondaryCtaLink: '',
    },
    {
      id: 'home-feature-strip',
      type: 'feature-strip',
      items: [
        { iconName: 'BadgePercent', title: 'Wholesale Pricing', desc: 'Direct importing. Better savings.' },
        { iconName: 'Store', title: 'Local Showroom', desc: 'Visit our Valrico showroom. See. Compare. Choose.' },
        { iconName: 'Wrench', title: 'Professional Installation', desc: 'Skilled team. Quality work. Done right.' },
        { iconName: 'Star', title: '5-Star Reviews', desc: 'Trusted by Tampa Bay homeowners.' },
        { iconName: 'Heart', title: 'One-Stop Shop', desc: 'Cabinets, countertops, flooring & more.' },
      ],
    },
    {
      id: 'home-solutions',
      type: 'solutions',
      label: 'Our Services',
      heading: 'Complete Kitchen Remodeling Solutions',
      description: 'Cabinets & Remodeling Depot offers more than cabinetry alone. Our showroom provides access to complete kitchen and remodeling solutions, including:',
      closingText: 'Our goal is to help homeowners create spaces that feel comfortable, functional, and built to last.',
      items: [
        { label: 'Kitchen Remodeling', desc: 'Full kitchen remodels tailored to your style and budget.', image: '/07_img.jpg', href: '/kitchen-remodeling-tampa' },
        { label: 'Bathroom Remodeling', desc: 'Beautiful, functional bathrooms designed for everyday living.', image: '/06_img.webp', href: '/bathroom-remodeling-tampa' },
        { label: 'Kitchen Cabinets', desc: 'Quality cabinets in a variety of styles and finishes.', image: '/1_img.jpg', href: '/kitchen-cabinets-tampa' },
        { label: 'Countertops', desc: 'Quartz, granite, marble, quartzite & porcelain.', image: '/03_img.webp', href: '/countertops-tampa' },
        { label: 'Kitchen Cabinets', desc: 'Ready-to-install cabinets available for faster delivery.', image: '/05_img.jpg', href: '/kitchen-cabinets-tampa' },
        { label: 'Flooring', desc: 'Durable, beautiful flooring for every room.', image: '/2_img.webp', href: '/flooring-in-tampa' },
      ],
    },
    {
      id: 'home-showroom',
      type: 'showroom',
      label: "Tampa Bay's Trusted Showroom",
      heading: 'Visit Our Kitchen Cabinet Showroom Tampa Homeowners Trust',
      body: "Seeing cabinetry in person makes a difference. Our Valrico showroom gives homeowners the opportunity to explore cabinet styles, finishes, countertop materials, and remodeling options before making a final decision.\n\nIf you've been searching for a kitchen cabinet showroom Tampa homeowners recommend, our showroom offers a convenient place to compare designs and speak directly with experienced remodeling professionals.",
      bgImage: '/Kitchen-Cabinet-Showroom-Tampa.jpg',
    },
    {
      id: 'home-service-areas',
      type: 'service-areas',
      label: 'Service Coverage',
      heading: 'We proudly serve homeowners across:',
      areas: ['Tampa', 'Brandon', 'Riverview', 'Valrico', 'Apollo Beach', 'Surrounding Tampa Bay Communities'],
    },
    {
      id: 'home-affordable',
      type: 'affordable',
      label: 'Affordable Options',
      heading: 'Affordable Cabinets Tampa Families Can Rely On',
      body: "A kitchen upgrade should feel exciting, not financially overwhelming. That's why we offer affordable cabinets Tampa homeowners can choose based on their style preferences, timeline, and remodeling goals.\n\nWhether you prefer a modern shaker design or a more traditional kitchen style, we help you choose cabinetry that balances appearance, storage, and long-term value.",
      bgImage: '/Budget-kitchen-remodel-Tampa-featuring-affordable-upgrades-and-modern-finishes.jpg',
      items: [
        'Stock kitchen cabinets Tampa homeowners love for fast projects',
        'Ready to install cabinets Tampa clients can select without long delays',
        'Custom cabinet styles for unique kitchen layouts',
        'Durable finishes designed for everyday use',
      ],
      cta1Text: 'Visit Our Showroom',
      cta1Link: '/contact',
      cta2Text: 'Request a Quote',
      cta2Link: '/contact',
    },
    {
      id: 'home-how-it-works',
      type: 'how-it-works',
      heading: 'How It Works',
      steps: [
        { title: 'Consult', desc: 'Chat with our team about your ideas, budget, and needs.' },
        { title: 'Plan', desc: 'Collaborate on design options and receive a detailed plan.' },
        { title: 'Install', desc: 'Our professionals handle everything with precision and care.' },
        { title: 'Enjoy', desc: 'Love your new space for years to come!' },
      ],
    },
    {
      id: 'home-transformation',
      type: 'transformation',
      label: 'Before & After',
      heading: 'See Our Transformations',
      description: 'Drag the slider to see the dramatic difference our expert remodeling makes.',
      beforeImage: '/old.jpeg',
      afterImage: '/new.jpg',
    },
    {
      id: 'home-installation',
      type: 'installation',
      label: 'Expert Installation',
      heading: 'Professional Cabinet Installation Tampa',
      bgImage: '/cabinet_img.webp',
      paragraphs: [
        'Great cabinets deserve proper installation. Our experienced cabinet installation Tampa team focuses on precision, alignment, functionality, and clean finishing details that help your kitchen look polished and complete.',
        'We work closely with homeowners throughout the remodeling process, helping coordinate cabinetry, countertops, and layout updates while minimizing unnecessary delays or confusion.',
        "Every project is approached with attention to detail because we understand that a kitchen is more than another room—it's where daily life happens.",
      ],
    },
    {
      id: 'home-reviews',
      type: 'testimonials',
      heading: 'Client Success Stories',
      items: [
        { name: 'Lei Cheng', location: '3 years ago', rating: 5, text: 'I used Cabinet and Remodeling Depot replaced my entire kitchen and master bathroom cabinets and countertop. They did a fantastic job! It had been a pleasure working with them. They help us select all the materials and styles and we are very satisfied.', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { name: 'R George', location: '3 years ago', rating: 5, text: 'We used cabinets & remodeling when we need to replace old carpet in the house. My experience was amazing as they are friendly and helpful with the whole process. Highly recommend!', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { name: 'Kishon Kuruvilla', location: '3 years ago', rating: 5, text: 'We have been purchasing kitchen cabinets from this shop for few years and their customer service has always been great and we really like coming here.', avatar: '' },
        { name: 'Ginger Wilkerson', location: '3 years ago', rating: 5, text: 'We had a great experience with our quartz countertop purchase and install. From the start to finish, about 1.5 weeks and they look amazing!!', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
        { name: 'Oscar Herrera', location: '1 year ago', rating: 5, text: 'It was a great pleasure working with Marcos and his team at Cabinets and Remodeling Depot. They communicated well during the entire process, from the selection of the tiles for a bathroom remodel to the final clean up.', avatar: '' },
        { name: 'Michelle K', location: '2 years ago', rating: 5, text: 'They did a great job on my floors and bathrooms. Marcos and team were great to work with.', avatar: '' },
        { name: 'Emile Nicholas', location: '1 year ago', rating: 5, text: 'Excellent experience with our master bath remodel. Our general contractor Marcos was the consummate professional. He was able to meet our needs and expectations for our bath remodel. Would highly recommend him and his team.', avatar: '' },
      ],
    },
    {
      id: 'home-why-choose',
      type: 'why-choose',
      heading: 'Why Homeowners Choose Cabinets & Remodeling Depot',
      body: 'Homeowners across Tampa Bay continue to choose Cabinets & Remodeling Depot because we focus on honest service, quality workmanship, and practical remodeling guidance.',
      features: [
        'Experienced remodeling professionals',
        'Local Valrico showroom',
        'Affordable and custom cabinet options',
        'In-stock cabinetry available',
        'Personalized project support',
        'Professional installation services',
        'One-stop remodeling solutions',
      ],
      closingText: 'We believe remodeling should feel organized, transparent, and tailored to your home—not rushed or overly complicated.',
      bgImage: '/cabinet-remodeling-shop.webp',
      address: '106 S St Cloud Ave, Valrico, FL 33594',
      phone: '+1 813-651-2333',
      email: 'sales@cabinetsandremodelingdepot.com',
      hours: 'Mon – Fri: 10:00AM – 6:00PM\nSat: 10:00AM – 4:00PM\nSun: Closed',
      mapLink: 'https://maps.google.com/?q=106+S+St+Cloud+Ave+Valrico+FL+33594',
    },
    {
      id: 'home-faq',
      type: 'faq',
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Do you offer affordable kitchen cabinets in Tampa?', answer: 'Yes. We provide affordable cabinets Tampa homeowners can choose from, including stock and custom cabinet options.' },
        { question: 'Do you have kitchen cabinets available?', answer: 'Absolutely. We carry kitchen cabinets Tampa homeowners often choose for faster remodeling timelines.' },
        { question: 'Do you provide cabinet installation Tampa services?', answer: 'Yes. Our experienced team handles professional cabinet installation throughout the Tampa Bay area.' },
        { question: 'Where is your kitchen cabinet showroom located?', answer: 'Our showroom is located in Valrico, serving homeowners throughout Tampa and nearby communities.' },
      ],
    },
    {
      id: 'home-start-project',
      type: 'start-project',
      heading: 'Start Your Kitchen Remodeling Project Today',
      body: "If you're looking for kitchen cabinets Tampa homeowners trust for quality, value, and professional installation, visit Cabinets & Remodeling Depot today.\n\nExplore cabinet styles, compare countertop materials, and speak with our team about your remodeling goals. From affordable cabinets Tampa clients love to ready to install cabinets Tampa homeowners need quickly, we're ready to help bring your kitchen project to life.",
      bgImage: '/kitchen-bg.webp',
      ctaText: 'Visit Our Showroom',
      ctaLink: '/contact',
    },
    {
      id: 'home-pre-footer',
      type: 'pre-footer',
      heading: 'Ready to Start Your Project?',
      description: "Get a free quote and expert design inspiration from our team—let's build!",
      phone: '(813) 651-2333',
      trustItems: ['Lowest Price', 'Premium Quality', 'Professional Installation', 'Financing Options Available'],
    },
    {
      id: 'home-partners',
      type: 'partners',
      label: 'Our Partners',
      heading: 'Our Trusted Partners',
      description: 'Brands we proudly work with to bring you quality products and materials.',
      logos: ['/partner/1.png', '/partner/2.png', '/partner/3.png', '/partner/4.png', '/partner/5.png', '/partner/6.png', '/partner/7.png', '/partner/8.png', '/partner/9.png', '/partner/10.png'],
    },
  ],
}

/**
 * Fill any empty / missing fields in a DB-saved section with values from the
 * corresponding page default. Only applied for:
 *  - string fields that are empty, null, or undefined
 *  - array fields that are missing or have zero items
 * Non-empty DB values are always preserved (intentional edits are kept).
 */
function fillSectionDefaults(dbSection, defaultSection) {
  const result = { ...dbSection }
  for (const [key, defaultVal] of Object.entries(defaultSection)) {
    if (key === 'id' || key === 'type') continue
    const dbVal = result[key]
    if (typeof defaultVal === 'string' && (dbVal === undefined || dbVal === null || dbVal === '')) {
      result[key] = defaultVal
    }
    if (Array.isArray(defaultVal) && (!Array.isArray(dbVal) || dbVal.length === 0)) {
      result[key] = defaultVal
    }
  }
  return result
}

/**
 * Section types whose content is hardcoded on the live page and must never be
 * overridden by DB values.  The admin always shows the PAGE_DEFAULT_SECTIONS
 * original content for these types, regardless of what may be stored in the DB.
 */
const HARDCODED_SECTION_TYPES = {
  home: new Set(['hero']),
}

/**
 * Merge existing sections with the default sections for a given page slug.
 * The default order is preserved. For each default section type:
 *  - if the type is in HARDCODED_SECTION_TYPES: always use the page default
 *  - if a matching section exists in the DB: use it, filling any empty/missing
 *    fields from the page default so no original content is ever lost
 *  - otherwise: use the page default in full
 * Any extra existing sections not in the default set are appended at the end.
 */
export function mergeWithPageDefaults(slug, existingSections) {
  const defaults = PAGE_DEFAULT_SECTIONS[slug]
  if (!defaults || !defaults.length) return existingSections

  const hardcoded = HARDCODED_SECTION_TYPES[slug] || new Set()

  // Strip hardcoded-type sections from the DB list so they never override defaults
  const mergeSource = hardcoded.size
    ? existingSections.filter((s) => !hardcoded.has(s.type))
    : existingSections

  const usedIndices = new Set()

  const result = defaults.map((defaultSection) => {
    // Hardcoded sections always use the page default — ignore DB
    if (hardcoded.has(defaultSection.type)) return defaultSection

    const idx = mergeSource.findIndex(
      (s, i) => s.type === defaultSection.type && !usedIndices.has(i)
    )
    if (idx !== -1) {
      usedIndices.add(idx)
      // Fill any empty / missing fields so original content is never lost
      return fillSectionDefaults(mergeSource[idx], defaultSection)
    }
    return defaultSection
  })

  // Append any remaining DB sections not matched to a default
  mergeSource.forEach((s, i) => {
    if (!usedIndices.has(i)) result.push(s)
  })

  return ensureSectionIds(result)
}
