/**
 * Section Registry — maps section type strings to their React components.
 *
 * This module provides a centralized lookup for all 21 supported section types.
 * Components are imported statically here so tree-shaking and SSR work correctly.
 * Use dynamic() imports in specific page clients only when you need per-page
 * code-splitting — this registry is a shared reference, not a page entry point.
 *
 * USAGE:
 *   import { SECTION_REGISTRY } from '@/lib/sectionRegistry'
 *   const Component = SECTION_REGISTRY[section.type]
 *   if (Component) return <Component data={section} />
 *
 * ADDING A NEW SECTION TYPE:
 *   1. Create the component in /components/sections/
 *   2. Add it here with the matching type key
 *   3. Add it to getSectionDefaults() in pageContent.js
 *   4. Add an editor in SectionCard.jsx
 *   5. Add a preview in SectionPreview.jsx
 */

import { HeroSection } from '@/components/sections/HeroSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTABanner } from '@/components/sections/CTABanner'
import { StatsSection } from '@/components/sections/StatsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CompleteReModelingSolutionsSection } from '@/components/sections/CompleteReModelingSolutionsSection'
import { ShowroomSection } from '@/components/sections/ShowroomSection'
import { ServiceAreasSection } from '@/components/sections/ServiceAreasSection'
import { AffordableCabinetsSection } from '@/components/sections/AffordableCabinetsSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { TransformationSection } from '@/components/sections/TransformationSection'
import { ProfessionalInstallationSection } from '@/components/sections/ProfessionalInstallationSection'
import { WhyChooseSection } from '@/components/sections/WhyChooseSection'
import { ClientSuccessSection } from '@/components/sections/ClientSuccessSection'
import { PreFooterSection } from '@/components/sections/PreFooterSection'
import { PartnersSection } from '@/components/sections/PartnersSection'
import { StartProjectSection } from '@/components/sections/StartProjectSection'
import { ServicesGrid } from '@/components/sections/ServicesGrid'

/**
 * Registry mapping section type → React component.
 * All 21 supported section types are registered here.
 *
 * Note: 'text', 'features', and 'service-areas' may render differently
 * depending on page context. The registry provides the default component;
 * individual page clients can override rendering for specific pages.
 */
export const SECTION_REGISTRY = {
  // Standard CMS sections
  hero:            HeroSection,
  faq:             FAQSection,
  cta:             CTABanner,
  stats:           StatsSection,
  process:         ProcessSection,
  testimonials:    TestimonialsSection,
  services:        ServicesGrid,

  // Home / service page specific sections
  'feature-strip': null,           // Rendered inline in HomeClient (no standalone component)
  solutions:       CompleteReModelingSolutionsSection,
  showroom:        ShowroomSection,
  'service-areas': ServiceAreasSection,
  affordable:      AffordableCabinetsSection,
  'how-it-works':  HowItWorksSection,
  transformation:  TransformationSection,
  installation:    ProfessionalInstallationSection,
  'why-choose':    WhyChooseSection,
  'start-project': StartProjectSection,
  'pre-footer':    PreFooterSection,
  partners:        PartnersSection,

  // Generic content sections (no standalone component — rendered by page clients)
  text:            null,
  features:        null,
}

/**
 * Resolve a component for a given section type.
 * Returns null for unknown types or types without a standalone component.
 *
 * @param {string} type - Section type string
 * @returns {React.ComponentType|null}
 */
export function getSectionComponent(type) {
  return SECTION_REGISTRY[type] ?? null
}
