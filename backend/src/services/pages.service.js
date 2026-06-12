/**
 * Pages Service
 * Handles content merging, validation, and default content generation.
 */

/**
 * Deep merge two objects. Arrays are replaced entirely (not concatenated).
 */
export function deepMerge(target, source) {
  if (!source || typeof source !== 'object') return target
  if (!target || typeof target !== 'object') return source

  const result = { ...target }
  for (const key of Object.keys(source)) {
    if (
      source[key] !== null &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(target[key], source[key])
    } else {
      result[key] = source[key]
    }
  }
  return result
}

/**
 * Merge incoming content updates with the existing stored content.
 * Ensures unedited sections aren't wiped.
 */
export function mergePageContent(existing, updates) {
  return deepMerge(existing || {}, updates || {})
}

/**
 * Returns default content structure for a given page slug.
 * All pages use the unified sections array format:
 *   { sections: [...], seo: {...}, schema: '' }
 */
export function getDefaultContent(slug) {
  const defaults = {
    home: {
      sections: [
        {
          id: 'home-hero',
          type: 'hero',
          title: 'Transform Your Home with Expert Remodeling',
          subtitle: "Tampa Bay's premier kitchen and bathroom remodeling company. Custom cabinets, countertops, and full renovations.",
          backgroundImage: '',
          ctaText: 'Get Your Free Estimate',
          ctaLink: '/contact',
          secondaryCtaText: 'View Our Work',
          secondaryCtaLink: '/projects',
        },
        {
          id: 'home-stats',
          type: 'stats',
          heading: '',
          items: [
            { value: '15+', label: 'Years Experience' },
            { value: '500+', label: 'Projects Completed' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '5★', label: 'Average Rating' },
          ],
        },
        {
          id: 'home-features',
          type: 'features',
          heading: 'Why Choose Cabinets & Remodeling Depot?',
          subheading: 'We deliver exceptional results with premium materials and expert craftsmanship.',
          items: [
            { icon: 'award', title: 'Licensed & Insured', description: 'Fully licensed contractors with comprehensive insurance for your peace of mind.' },
            { icon: 'users', title: 'Expert Team', description: 'Skilled craftsmen with 15+ years of combined remodeling experience.' },
            { icon: 'clock', title: 'On-Time Delivery', description: 'We respect your time and complete projects on schedule without sacrificing quality.' },
            { icon: 'shield', title: 'Quality Guarantee', description: 'Every project backed by our quality guarantee and post-installation support.' },
          ],
        },
        {
          id: 'home-testimonials',
          type: 'testimonials',
          heading: 'What Our Clients Say',
          items: [
            { name: 'Sarah M.', location: 'Tampa, FL', rating: 5, text: 'Absolutely transformed our kitchen! The cabinets are stunning and the team was professional throughout.', avatar: '' },
            { name: 'James R.', location: 'Brandon, FL', rating: 5, text: "Best remodeling experience we've had. Our bathroom looks like it belongs in a luxury hotel.", avatar: '' },
            { name: 'Linda K.', location: 'Valrico, FL', rating: 5, text: 'The quartz countertops are gorgeous. Great quality, fair pricing, and they finished ahead of schedule.', avatar: '' },
          ],
        },
        {
          id: 'home-faq',
          type: 'faq',
          heading: 'Frequently Asked Questions',
          items: [
            { question: 'How long does a kitchen remodel take?', answer: 'A typical kitchen remodel takes 4–8 weeks depending on the scope of work, cabinet availability, and any structural changes. We provide a detailed timeline during your free consultation.' },
            { question: 'Do you offer financing options?', answer: 'Yes! We partner with several financing companies to offer flexible payment plans. Ask about 0% interest financing options during your consultation.' },
            { question: 'Do you handle permits?', answer: 'Yes, we handle all necessary permits for your remodeling project. Our team is familiar with local Tampa Bay building codes and requirements.' },
            { question: 'Can I visit your showroom?', answer: 'Absolutely! Our showroom in Valrico, FL is open by appointment. You can see cabinet samples, countertop displays, and get inspiration for your project.' },
          ],
        },
        {
          id: 'home-cta',
          type: 'cta',
          heading: 'Ready to Transform Your Space?',
          subheading: 'Schedule a free in-home consultation and get a no-obligation estimate for your remodeling project.',
          buttonText: 'Get Free Estimate',
          buttonLink: '/contact',
          backgroundImage: '',
        },
      ],
      seo: {
        metaTitle: 'Cabinets & Remodeling Depot | Tampa Kitchen & Bathroom Remodeling',
        metaDescription: 'Expert kitchen remodeling, bathroom remodeling, custom cabinets, and countertops in Tampa Bay. Get your free estimate today.',
        ogImage: '',
        keywords: 'kitchen remodeling Tampa, bathroom remodeling Tampa, custom cabinets Tampa',
      },
      schema: '',
    },

    about: {
      sections: [
        {
          id: 'about-hero',
          type: 'hero',
          title: 'About Cabinets & Remodeling Depot',
          subtitle: 'Your trusted remodeling partner in Tampa Bay since 2009.',
          backgroundImage: '',
          ctaText: 'Contact Us',
          ctaLink: '/contact',
        },
        {
          id: 'about-story',
          type: 'text',
          heading: 'Our Story',
          body: "Founded in Valrico, FL, Cabinets & Remodeling Depot has been transforming Tampa Bay homes for over 15 years. What started as a small cabinet shop has grown into a full-service remodeling company trusted by hundreds of families across Hillsborough, Pinellas, and Pasco counties.\n\nWe believe every homeowner deserves a beautiful, functional home — and that quality remodeling should be accessible, not just affordable. Our team of skilled craftsmen, designers, and project managers work together to deliver results that exceed expectations.",
          image: '',
          layout: 'full',
        },
        {
          id: 'about-values',
          type: 'features',
          heading: 'Our Values',
          subheading: '',
          items: [
            { icon: 'heart', title: 'Integrity', description: 'Honest pricing, transparent communication, no hidden fees.' },
            { icon: 'star', title: 'Quality', description: 'Premium materials and meticulous craftsmanship on every project.' },
            { icon: 'users', title: 'Community', description: 'Proudly serving Tampa Bay families and supporting local businesses.' },
            { icon: 'zap', title: 'Innovation', description: 'Latest design trends and modern remodeling techniques.' },
          ],
        },
        {
          id: 'about-cta',
          type: 'cta',
          heading: "Let's Build Something Beautiful Together",
          subheading: 'Contact us to schedule your free design consultation.',
          buttonText: 'Schedule Consultation',
          buttonLink: '/contact',
        },
      ],
      seo: {
        metaTitle: 'About Us | Cabinets & Remodeling Depot Tampa',
        metaDescription: "Learn about Cabinets & Remodeling Depot — Tampa Bay's trusted kitchen and bathroom remodeling company with 15+ years of experience.",
        ogImage: '',
      },
      schema: '',
    },

    services: {
      sections: [
        {
          id: 'services-hero',
          type: 'hero',
          title: 'Our Remodeling Services',
          subtitle: 'Comprehensive home transformation services tailored to your vision and budget.',
          backgroundImage: '',
        },
        {
          id: 'services-list',
          type: 'services',
          heading: 'What We Do',
          items: [
            { icon: 'chef-hat', title: 'Kitchen Remodeling', description: 'Complete kitchen transformations from cabinets to countertops.', link: '/kitchen-remodeling', image: '' },
            { icon: 'droplets', title: 'Bathroom Remodeling', description: 'Luxury bathroom renovations and spa-style upgrades.', link: '/bathroom-remodeling', image: '' },
            { icon: 'layout', title: 'Custom Cabinets', description: 'Handcrafted cabinetry built to your exact specifications.', link: '/cabinets', image: '' },
            { icon: 'layers', title: 'Countertops', description: 'Quartz and granite countertops for kitchens and bathrooms.', link: '/countertops', image: '' },
            { icon: 'grid', title: 'Flooring', description: 'Hardwood, tile, vinyl, and luxury flooring installation.', link: '/flooring', image: '' },
            { icon: 'pencil-ruler', title: 'Design Consultation', description: 'Professional design guidance for your remodeling project.', link: '/contact', image: '' },
          ],
        },
      ],
      seo: {
        metaTitle: 'Remodeling Services | Cabinets & Remodeling Depot Tampa',
        metaDescription: 'Kitchen remodeling, bathroom renovations, custom cabinets, countertops, and flooring in Tampa Bay.',
        ogImage: '',
      },
      schema: '',
    },

    'kitchen-remodeling': {
      sections: [
        {
          id: 'kitchen-hero',
          type: 'hero',
          title: 'Kitchen Remodeling Tampa Bay Homeowners Love',
          subtitle: 'Luxury kitchen transformations crafted to your style and budget.',
          backgroundImage: '',
          ctaText: 'Get Free Kitchen Estimate',
          ctaLink: '/contact',
        },
        {
          id: 'kitchen-text',
          type: 'text',
          heading: 'Transform Your Kitchen Into the Heart of Your Home',
          body: "Your kitchen is where life happens. From morning coffee to holiday dinners, it's the most-used room in your home. At Cabinets & Remodeling Depot, we design and build kitchens that combine stunning aesthetics with everyday functionality.\n\nOur full-service kitchen remodeling covers everything from custom cabinet installation to countertop fabrication, backsplash tile, new flooring, lighting upgrades, and appliance integration.",
          image: '',
          layout: 'full',
        },
        {
          id: 'kitchen-features',
          type: 'features',
          heading: 'What Sets Us Apart',
          subheading: '',
          items: [
            { title: 'Custom Cabinet Design', description: 'Built-to-measure cabinetry in 200+ door styles and finishes.' },
            { title: 'Countertop Fabrication', description: 'In-house quartz and granite fabrication for perfect fits.' },
            { title: 'Full Project Management', description: 'One team handles everything from demo to final walkthrough.' },
            { title: 'Design Consultation', description: 'Free in-home design consultation with 3D rendering.' },
          ],
        },
        {
          id: 'kitchen-process',
          type: 'process',
          heading: 'Our Process',
          steps: [
            { step: 1, title: 'Free Consultation', description: 'We visit your home, take measurements, and discuss your vision.' },
            { step: 2, title: '3D Design', description: 'Our designers create a 3D rendering of your new kitchen.' },
            { step: 3, title: 'Material Selection', description: 'Visit our showroom to select cabinets, countertops, and finishes.' },
            { step: 4, title: 'Installation', description: 'Our team handles demo, installation, and finishing.' },
            { step: 5, title: 'Final Walkthrough', description: 'We inspect every detail to ensure your complete satisfaction.' },
          ],
        },
        {
          id: 'kitchen-faq',
          type: 'faq',
          heading: 'Kitchen Remodeling FAQs',
          items: [
            { question: 'How long does a kitchen remodel take?', answer: 'A complete kitchen remodel typically takes 4–8 weeks. Cabinet-only projects can be done in 1–2 weeks.' },
            { question: 'What is the average cost of a kitchen remodel?', answer: 'Kitchen remodels vary by scope. Cabinet refacing starts around $5,000, while full custom kitchen renovations range from $20,000–$80,000+.' },
            { question: 'Will I be able to use my kitchen during the remodel?', answer: 'During demo and installation, kitchen use will be limited. We work efficiently to minimize disruption and can set up a temporary kitchen area.' },
            { question: 'Do you offer warranties?', answer: 'Yes! All cabinets come with manufacturer warranties. Our installation work is backed by a 2-year craftsmanship warranty.' },
          ],
        },
        {
          id: 'kitchen-cta',
          type: 'cta',
          heading: 'Get Your Free Kitchen Remodeling Estimate Today',
          subheading: 'Get a free in-home consultation and detailed estimate.',
          buttonText: 'Schedule Free Estimate',
          buttonLink: '/contact',
        },
      ],
      seo: { metaTitle: 'Kitchen Remodeling Tampa | Cabinets & Remodeling Depot', metaDescription: 'Expert kitchen remodeling in Tampa Bay. Custom cabinets, countertops, full renovations. Free in-home estimates.', ogImage: '' },
      schema: '',
    },

    'bathroom-remodeling': {
      sections: [
        {
          id: 'bathroom-hero',
          type: 'hero',
          title: 'Bathroom Remodeling Tampa Bay Homeowners Love',
          subtitle: 'Create your dream bathroom retreat with expert design and installation.',
          backgroundImage: '',
          ctaText: 'Get Free Estimate',
          ctaLink: '/contact',
        },
        {
          id: 'bathroom-text',
          type: 'text',
          heading: 'Luxury Bathroom Renovations for Every Budget',
          body: "Transform your outdated bathroom into a spa-like sanctuary. From master suite renovations to guest bathroom refreshes, our team delivers beautiful, durable results using premium materials and expert craftsmanship.\n\nWe handle complete gut renovations or targeted upgrades — new vanities, custom tile showers, soaking tubs, frameless glass enclosures, luxury vinyl flooring, and more.",
          image: '',
          layout: 'full',
        },
        {
          id: 'bathroom-features',
          type: 'features',
          heading: 'Our Bathroom Services',
          subheading: '',
          items: [
            { title: 'Custom Vanities', description: 'Built-in vanity cabinetry with quartz or granite tops.' },
            { title: 'Tile Showers & Tub Surrounds', description: 'Custom tile work in hundreds of patterns and materials.' },
            { title: 'Frameless Glass Enclosures', description: 'Modern frameless shower doors and enclosures.' },
            { title: 'Luxury Flooring', description: 'Heated floors, large format tile, and luxury vinyl plank.' },
          ],
        },
        {
          id: 'bathroom-faq',
          type: 'faq',
          heading: 'Bathroom Remodeling FAQs',
          items: [
            { question: 'How long does a bathroom remodel take?', answer: 'A full bathroom renovation typically takes 2–3 weeks. Smaller updates like vanity replacement can be done in 1–3 days.' },
            { question: 'What is the average cost of a bathroom remodel?', answer: 'Bathroom remodels range from $5,000 for basic updates to $30,000+ for luxury master bath renovations.' },
            { question: 'Can you install walk-in showers?', answer: 'Absolutely! Walk-in showers are one of our most popular additions. We handle all plumbing coordination and custom tile work.' },
          ],
        },
        {
          id: 'bathroom-cta',
          type: 'cta',
          heading: 'Ready for Your Dream Bathroom?',
          subheading: 'Schedule a free in-home consultation today.',
          buttonText: 'Get Free Estimate',
          buttonLink: '/contact',
        },
      ],
      seo: { metaTitle: 'Bathroom Remodeling Tampa | Cabinets & Remodeling Depot', metaDescription: 'Professional bathroom remodeling in Tampa Bay. Custom vanities, tile showers, and luxury renovations. Free estimates.', ogImage: '' },
      schema: '',
    },

    cabinets: {
      sections: [
        {
          id: 'cabinets-hero',
          type: 'hero',
          title: 'Custom Cabinets Tampa Bay Homeowners Trust',
          subtitle: 'Premium cabinetry for kitchens, bathrooms, laundry rooms, and more.',
          backgroundImage: '',
          ctaText: 'Visit Our Showroom',
          ctaLink: '/contact',
        },
        {
          id: 'cabinets-text',
          type: 'text',
          heading: "The Tampa Bay Area's Cabinet Experts",
          body: "We offer the full spectrum of cabinetry — from in-stock stock cabinets for budget-conscious projects to fully custom built-to-order cabinetry for discerning homeowners. Our showroom in Valrico features hundreds of door styles, finishes, and configurations so you can see and feel the quality before you buy.",
          image: '',
          layout: 'full',
        },
        {
          id: 'cabinets-services',
          type: 'services',
          heading: 'Cabinet Options',
          items: [
            { title: 'Custom Cabinets', description: 'Built to your exact dimensions and specifications. Any size, any style.' },
            { title: 'Semi-Custom Cabinets', description: 'Pre-engineered boxes with extensive customization options.' },
            { title: 'Stock Cabinets', description: 'In-stock cabinets ready for quick installation at affordable prices.' },
          ],
        },
        {
          id: 'cabinets-faq',
          type: 'faq',
          heading: 'Cabinet FAQs',
          items: [
            { question: 'What is the difference between stock and custom cabinets?', answer: 'Stock cabinets come in standard sizes and are ready to install immediately. Custom cabinets are built to your exact measurements and style preferences but have longer lead times.' },
            { question: 'How long do custom cabinets take?', answer: 'Custom cabinets typically take 4–6 weeks from order to delivery. Stock and semi-custom options are often available much faster.' },
            { question: "Do you install cabinets you didn't sell?", answer: 'We specialize in selling and installing our own cabinet lines to ensure quality control throughout the project.' },
          ],
        },
        {
          id: 'cabinets-cta',
          type: 'cta',
          heading: 'See Our Cabinets in Person',
          subheading: 'Visit our Valrico showroom to explore hundreds of styles and finishes.',
          buttonText: 'Schedule Showroom Visit',
          buttonLink: '/contact',
        },
      ],
      seo: { metaTitle: 'Custom Cabinets Tampa | Cabinets & Remodeling Depot', metaDescription: 'Custom, semi-custom, and stock kitchen cabinets in Tampa Bay. Visit our Valrico showroom. Free design consultation.', ogImage: '' },
      schema: '',
    },

    countertops: {
      sections: [
        {
          id: 'countertops-hero',
          type: 'hero',
          title: 'Countertops Tampa Bay Homeowners Love',
          subtitle: 'Premium countertop fabrication and installation for kitchens and bathrooms.',
          backgroundImage: '',
          ctaText: 'Get Countertop Estimate',
          ctaLink: '/contact',
        },
        {
          id: 'countertops-text',
          type: 'text',
          heading: 'In-House Countertop Fabrication',
          body: 'We fabricate and install quartz and granite countertops right here in Tampa Bay. By cutting out the middleman, we deliver superior quality at better prices. From template measurement to final installation, our team handles every step.',
          image: '',
          layout: 'full',
        },
        {
          id: 'countertops-services',
          type: 'services',
          heading: 'Countertop Materials',
          items: [
            { title: 'Quartz Countertops', description: 'Engineered stone combining natural quartz with resins for a non-porous, low-maintenance surface.' },
            { title: 'Granite Countertops', description: 'Natural stone with unique veining patterns and exceptional durability.' },
          ],
        },
        {
          id: 'countertops-faq',
          type: 'faq',
          heading: 'Countertop FAQs',
          items: [
            { question: 'Which is better — quartz or granite?', answer: 'Both are excellent choices. Quartz requires less maintenance (no sealing) and offers consistent patterns. Granite offers natural uniqueness and heat resistance.' },
            { question: 'How long does countertop installation take?', answer: 'After template measurement, countertops are typically fabricated and installed within 7–10 business days.' },
            { question: 'Do you do countertop-only projects?', answer: 'Yes! We handle countertop-only replacement projects without requiring a full kitchen remodel.' },
          ],
        },
        {
          id: 'countertops-cta',
          type: 'cta',
          heading: 'Get a Countertop Quote Today',
          subheading: 'Send us your measurements or schedule a free in-home template appointment.',
          buttonText: 'Request Quote',
          buttonLink: '/contact',
        },
      ],
      seo: { metaTitle: 'Quartz & Granite Countertops Tampa | Cabinets & Remodeling Depot', metaDescription: 'In-house quartz and granite countertop fabrication and installation in Tampa Bay. Free templates and competitive pricing.', ogImage: '' },
      schema: '',
    },

    flooring: {
      sections: [
        {
          id: 'flooring-hero',
          type: 'hero',
          title: 'Flooring Tampa Bay Homeowners Love',
          subtitle: 'Hardwood, tile, luxury vinyl, and laminate flooring for every room.',
          backgroundImage: '',
          ctaText: 'Get Flooring Estimate',
          ctaLink: '/contact',
        },
        {
          id: 'flooring-text',
          type: 'text',
          heading: 'Premium Flooring for Every Room and Budget',
          body: 'The right floor transforms a room. Our flooring specialists help you choose the perfect material for your lifestyle, then install it with precision and care. We carry top brands in hardwood, tile, luxury vinyl plank (LVP), and laminate flooring.',
          image: '',
          layout: 'full',
        },
        {
          id: 'flooring-services',
          type: 'services',
          heading: 'Flooring Options',
          items: [
            { title: 'Hardwood Flooring', description: 'Solid and engineered hardwood in dozens of species and stains.' },
            { title: 'Luxury Vinyl Plank (LVP)', description: '100% waterproof flooring that looks like real wood.' },
            { title: 'Tile Flooring', description: 'Porcelain and ceramic tile for kitchens, bathrooms, and entryways.' },
            { title: 'Laminate Flooring', description: 'Affordable wood-look flooring with scratch-resistant surfaces.' },
          ],
        },
        {
          id: 'flooring-faq',
          type: 'faq',
          heading: 'Flooring FAQs',
          items: [
            { question: 'What flooring is best for kitchens?', answer: 'Tile and luxury vinyl plank are most popular for kitchens due to moisture resistance. Both are easy to clean and highly durable.' },
            { question: 'How long does flooring installation take?', answer: 'Most flooring projects take 1–3 days depending on square footage and material. Hardwood may require additional acclimation time.' },
            { question: 'Do you offer flooring removal?', answer: 'Yes, we handle old flooring removal and disposal as part of our installation service.' },
          ],
        },
        {
          id: 'flooring-cta',
          type: 'cta',
          heading: 'Get Your Free Flooring Estimate Today',
          subheading: 'Schedule a free in-home measurement and get a detailed flooring quote.',
          buttonText: 'Get Free Quote',
          buttonLink: '/contact',
        },
      ],
      seo: { metaTitle: 'Flooring Installation Tampa | Cabinets & Remodeling Depot', metaDescription: 'Professional hardwood, LVP, tile, and laminate flooring installation in Tampa Bay. Free estimates.', ogImage: '' },
      schema: '',
    },

    contact: {
      sections: [
        {
          id: 'contact-hero',
          type: 'hero',
          title: 'Contact Us',
          subtitle: 'Get in touch for a free estimate or to schedule your showroom visit.',
          backgroundImage: '',
        },
        {
          id: 'contact-text',
          type: 'text',
          heading: 'Get In Touch',
          body: 'Call us at (813) 651-2333, email sales@cabinetsandremodelingdepot.com, or visit our Valrico showroom. We are open Monday–Friday 8 AM–6 PM and Saturday 9 AM–4 PM.',
          image: '',
          layout: 'full',
        },
      ],
      seo: {
        metaTitle: 'Contact Us | Cabinets & Remodeling Depot Tampa',
        metaDescription: 'Contact Cabinets & Remodeling Depot for a free remodeling estimate in Tampa Bay. Call, email, or visit our Valrico showroom.',
        ogImage: '',
      },
      schema: '',
    },

    'privacy-policy': {
      sections: [
        {
          id: 'privacy-text',
          type: 'text',
          heading: 'Last updated: January 1, 2025',
          body: '',
          image: '',
          layout: 'full',
        },
      ],
      seo: { metaTitle: 'Privacy Policy | Cabinets & Remodeling Depot', metaDescription: 'Privacy policy for Cabinets & Remodeling Depot website.', ogImage: '' },
      schema: '',
    },

    terms: {
      sections: [
        {
          id: 'terms-text',
          type: 'text',
          heading: 'Last updated: January 1, 2025',
          body: '',
          image: '',
          layout: 'full',
        },
      ],
      seo: { metaTitle: 'Terms of Service | Cabinets & Remodeling Depot', metaDescription: 'Terms of service for Cabinets & Remodeling Depot website.', ogImage: '' },
      schema: '',
    },
  }

  return defaults[slug] || {
    sections: [
      {
        id: 'default-hero',
        type: 'hero',
        title: 'Welcome',
        subtitle: '',
        backgroundImage: '',
        ctaText: 'Contact Us',
        ctaLink: '/contact',
      },
    ],
    seo: { metaTitle: '', metaDescription: '', ogImage: '' },
    schema: '',
  }
}
