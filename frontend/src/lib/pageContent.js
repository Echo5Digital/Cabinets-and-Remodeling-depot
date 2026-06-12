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
  }
  return defaults[type] || {}
}
