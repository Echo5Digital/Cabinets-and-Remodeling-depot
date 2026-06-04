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
 * This is used during seeding and as a fallback.
 */
export function getDefaultContent(slug) {
  const defaults = {
    home: {
      hero: {
        title: 'Transform Your Home with Expert Remodeling',
        subtitle:
          'Tampa Bay\'s premier kitchen and bathroom remodeling company. Custom cabinets, countertops, and full renovations.',
        backgroundImage: '',
        ctaText: 'Get Your Free Estimate',
        ctaLink: '/contact',
        secondaryCtaText: 'View Our Work',
        secondaryCtaLink: '/projects',
      },
      stats: [
        { value: '15+', label: 'Years Experience' },
        { value: '500+', label: 'Projects Completed' },
        { value: '98%', label: 'Client Satisfaction' },
        { value: '5★', label: 'Average Rating' },
      ],
      whyChooseUs: {
        heading: 'Why Choose Cabinets & Remodeling Depot?',
        subheading: 'We deliver exceptional results with premium materials and expert craftsmanship.',
        items: [
          {
            icon: 'award',
            title: 'Licensed & Insured',
            description: 'Fully licensed contractors with comprehensive insurance for your peace of mind.',
          },
          {
            icon: 'users',
            title: 'Expert Team',
            description: 'Skilled craftsmen with 15+ years of combined remodeling experience.',
          },
          {
            icon: 'clock',
            title: 'On-Time Delivery',
            description: 'We respect your time and complete projects on schedule without sacrificing quality.',
          },
          {
            icon: 'shield',
            title: 'Quality Guarantee',
            description: 'Every project backed by our quality guarantee and post-installation support.',
          },
        ],
      },
      testimonials: [
        {
          name: 'Sarah M.',
          location: 'Tampa, FL',
          rating: 5,
          text: 'Absolutely transformed our kitchen! The cabinets are stunning and the team was professional throughout.',
          avatar: '',
        },
        {
          name: 'James R.',
          location: 'Brandon, FL',
          rating: 5,
          text: 'Best remodeling experience we\'ve had. Our bathroom looks like it belongs in a luxury hotel.',
          avatar: '',
        },
        {
          name: 'Linda K.',
          location: 'Valrico, FL',
          rating: 5,
          text: 'The quartz countertops are gorgeous. Great quality, fair pricing, and they finished ahead of schedule.',
          avatar: '',
        },
      ],
      faq: [
        {
          question: 'How long does a kitchen remodel take?',
          answer:
            'A typical kitchen remodel takes 4–8 weeks depending on the scope of work, cabinet availability, and any structural changes. We provide a detailed timeline during your free consultation.',
        },
        {
          question: 'Do you offer financing options?',
          answer:
            'Yes! We partner with several financing companies to offer flexible payment plans. Ask about 0% interest financing options during your consultation.',
        },
        {
          question: 'Do you handle permits?',
          answer:
            'Yes, we handle all necessary permits for your remodeling project. Our team is familiar with local Tampa Bay building codes and requirements.',
        },
        {
          question: 'Can I visit your showroom?',
          answer:
            'Absolutely! Our showroom in Valrico, FL is open by appointment. You can see cabinet samples, countertop displays, and get inspiration for your project.',
        },
      ],
      cta: {
        heading: 'Ready to Transform Your Space?',
        subheading:
          'Schedule a free in-home consultation and get a no-obligation estimate for your remodeling project.',
        buttonText: 'Get Free Estimate',
        buttonLink: '/contact',
        backgroundImage: '',
      },
      seo: {
        metaTitle: 'Cabinets & Remodeling Depot | Tampa Kitchen & Bathroom Remodeling',
        metaDescription:
          'Expert kitchen remodeling, bathroom remodeling, custom cabinets, and countertops in Tampa Bay. Get your free estimate today.',
        ogImage: '',
        keywords: 'kitchen remodeling Tampa, bathroom remodeling Tampa, custom cabinets Tampa',
      },
    },

    about: {
      hero: {
        title: 'About Cabinets & Remodeling Depot',
        subtitle: 'Your trusted remodeling partner in Tampa Bay since 2009.',
        backgroundImage: '',
        ctaText: 'Contact Us',
        ctaLink: '/contact',
      },
      story: {
        heading: 'Our Story',
        body: 'Founded in Valrico, FL, Cabinets & Remodeling Depot has been transforming Tampa Bay homes for over 15 years. What started as a small cabinet shop has grown into a full-service remodeling company trusted by hundreds of families across Hillsborough, Pinellas, and Pasco counties.\n\nWe believe every homeowner deserves a beautiful, functional home — and that quality remodeling should be accessible, not just affordable. Our team of skilled craftsmen, designers, and project managers work together to deliver results that exceed expectations.',
        image: '',
      },
      values: [
        { icon: 'heart', title: 'Integrity', description: 'Honest pricing, transparent communication, no hidden fees.' },
        { icon: 'star', title: 'Quality', description: 'Premium materials and meticulous craftsmanship on every project.' },
        { icon: 'users', title: 'Community', description: 'Proudly serving Tampa Bay families and supporting local businesses.' },
        { icon: 'zap', title: 'Innovation', description: 'Latest design trends and modern remodeling techniques.' },
      ],
      team: {
        heading: 'Meet Our Team',
        members: [],
      },
      cta: {
        heading: 'Let\'s Build Something Beautiful Together',
        subheading: 'Contact us to schedule your free design consultation.',
        buttonText: 'Schedule Consultation',
        buttonLink: '/contact',
      },
      seo: {
        metaTitle: 'About Us | Cabinets & Remodeling Depot Tampa',
        metaDescription:
          'Learn about Cabinets & Remodeling Depot — Tampa Bay\'s trusted kitchen and bathroom remodeling company with 15+ years of experience.',
        ogImage: '',
      },
    },

    services: {
      hero: {
        title: 'Our Remodeling Services',
        subtitle: 'Comprehensive home transformation services tailored to your vision and budget.',
        backgroundImage: '',
      },
      services: [
        { title: 'Kitchen Remodeling', description: 'Complete kitchen transformations from cabinets to countertops.', icon: 'chef-hat', link: '/kitchen-remodeling', image: '' },
        { title: 'Bathroom Remodeling', description: 'Luxury bathroom renovations and spa-style upgrades.', icon: 'droplets', link: '/bathroom-remodeling', image: '' },
        { title: 'Custom Cabinets', description: 'Handcrafted cabinetry built to your exact specifications.', icon: 'layout', link: '/cabinets', image: '' },
        { title: 'Countertops', description: 'Quartz and granite countertops for kitchens and bathrooms.', icon: 'layers', link: '/countertops', image: '' },
        { title: 'Flooring', description: 'Hardwood, tile, vinyl, and luxury flooring installation.', icon: 'grid', link: '/flooring', image: '' },
        { title: 'Design Consultation', description: 'Professional design guidance for your remodeling project.', icon: 'pencil-ruler', link: '/contact', image: '' },
      ],
      seo: {
        metaTitle: 'Remodeling Services | Cabinets & Remodeling Depot Tampa',
        metaDescription: 'Kitchen remodeling, bathroom renovations, custom cabinets, countertops, and flooring in Tampa Bay.',
        ogImage: '',
      },
    },

    'kitchen-remodeling': {
      hero: {
        title: 'Kitchen Remodeling Tampa',
        subtitle: 'Luxury kitchen transformations crafted to your style and budget.',
        backgroundImage: '',
        ctaText: 'Get Free Kitchen Estimate',
        ctaLink: '/contact',
      },
      content: {
        heading: 'Transform Your Kitchen Into the Heart of Your Home',
        body: 'Your kitchen is where life happens. From morning coffee to holiday dinners, it\'s the most-used room in your home. At Cabinets & Remodeling Depot, we design and build kitchens that combine stunning aesthetics with everyday functionality.\n\nOur full-service kitchen remodeling covers everything from custom cabinet installation to countertop fabrication, backsplash tile, new flooring, lighting upgrades, and appliance integration.',
        image: '',
      },
      features: [
        { title: 'Custom Cabinet Design', description: 'Built-to-measure cabinetry in 200+ door styles and finishes.' },
        { title: 'Countertop Fabrication', description: 'In-house quartz and granite fabrication for perfect fits.' },
        { title: 'Full Project Management', description: 'One team handles everything from demo to final walkthrough.' },
        { title: 'Design Consultation', description: 'Free in-home design consultation with 3D rendering.' },
      ],
      process: [
        { step: 1, title: 'Free Consultation', description: 'We visit your home, take measurements, and discuss your vision.' },
        { step: 2, title: '3D Design', description: 'Our designers create a 3D rendering of your new kitchen.' },
        { step: 3, title: 'Material Selection', description: 'Visit our showroom to select cabinets, countertops, and finishes.' },
        { step: 4, title: 'Installation', description: 'Our team handles demo, installation, and finishing.' },
        { step: 5, title: 'Final Walkthrough', description: 'We inspect every detail to ensure your complete satisfaction.' },
      ],
      faq: [
        { question: 'How long does a kitchen remodel take?', answer: 'A complete kitchen remodel typically takes 4–8 weeks. Cabinet-only projects can be done in 1–2 weeks.' },
        { question: 'What is the average cost of a kitchen remodel?', answer: 'Kitchen remodels vary by scope. Cabinet refacing starts around $5,000, while full custom kitchen renovations range from $20,000–$80,000+.' },
        { question: 'Will I be able to use my kitchen during the remodel?', answer: 'During demo and installation, kitchen use will be limited. We work efficiently to minimize disruption and can set up a temporary kitchen area.' },
        { question: 'Do you offer warranties?', answer: 'Yes! All cabinets come with manufacturer warranties. Our installation work is backed by a 2-year craftsmanship warranty.' },
      ],
      cta: { heading: 'Ready to Transform Your Kitchen?', subheading: 'Get a free in-home consultation and detailed estimate.', buttonText: 'Schedule Free Estimate', buttonLink: '/contact' },
      seo: { metaTitle: 'Kitchen Remodeling Tampa | Cabinets & Remodeling Depot', metaDescription: 'Expert kitchen remodeling in Tampa Bay. Custom cabinets, countertops, full renovations. Free in-home estimates.', ogImage: '' },
    },

    'bathroom-remodeling': {
      hero: {
        title: 'Bathroom Remodeling Tampa',
        subtitle: 'Create your dream bathroom retreat with expert design and installation.',
        backgroundImage: '',
        ctaText: 'Get Free Estimate',
        ctaLink: '/contact',
      },
      content: {
        heading: 'Luxury Bathroom Renovations for Every Budget',
        body: 'Transform your outdated bathroom into a spa-like sanctuary. From master suite renovations to guest bathroom refreshes, our team delivers beautiful, durable results using premium materials and expert craftsmanship.\n\nWe handle complete gut renovations or targeted upgrades — new vanities, custom tile showers, soaking tubs, frameless glass enclosures, luxury vinyl flooring, and more.',
        image: '',
      },
      features: [
        { title: 'Custom Vanities', description: 'Built-in vanity cabinetry with quartz or granite tops.' },
        { title: 'Tile Showers & Tub Surrounds', description: 'Custom tile work in hundreds of patterns and materials.' },
        { title: 'Frameless Glass Enclosures', description: 'Modern frameless shower doors and enclosures.' },
        { title: 'Luxury Flooring', description: 'Heated floors, large format tile, and luxury vinyl plank.' },
      ],
      faq: [
        { question: 'How long does a bathroom remodel take?', answer: 'A full bathroom renovation typically takes 2–3 weeks. Smaller updates like vanity replacement can be done in 1–3 days.' },
        { question: 'What is the average cost of a bathroom remodel?', answer: 'Bathroom remodels range from $5,000 for basic updates to $30,000+ for luxury master bath renovations.' },
        { question: 'Can you install walk-in showers?', answer: 'Absolutely! Walk-in showers are one of our most popular additions. We handle all plumbing coordination and custom tile work.' },
      ],
      cta: { heading: 'Ready for Your Dream Bathroom?', subheading: 'Schedule a free in-home consultation today.', buttonText: 'Get Free Estimate', buttonLink: '/contact' },
      seo: { metaTitle: 'Bathroom Remodeling Tampa | Cabinets & Remodeling Depot', metaDescription: 'Professional bathroom remodeling in Tampa Bay. Custom vanities, tile showers, and luxury renovations. Free estimates.', ogImage: '' },
    },

    cabinets: {
      hero: {
        title: 'Custom Cabinets & Kitchen Cabinets Tampa',
        subtitle: 'Premium cabinetry for kitchens, bathrooms, laundry rooms, and more.',
        backgroundImage: '',
        ctaText: 'Visit Our Showroom',
        ctaLink: '/contact',
      },
      content: {
        heading: 'The Tampa Bay Area\'s Cabinet Experts',
        body: 'We offer the full spectrum of cabinetry — from in-stock stock cabinets for budget-conscious projects to fully custom built-to-order cabinetry for discerning homeowners. Our showroom in Valrico features hundreds of door styles, finishes, and configurations so you can see and feel the quality before you buy.',
        image: '',
      },
      cabinetTypes: [
        { title: 'Custom Cabinets', description: 'Built to your exact dimensions and specifications. Any size, any style.', features: ['Built-to-measure sizing', '200+ door styles', 'Unlimited finish options', 'Soft-close hardware standard'] },
        { title: 'Semi-Custom Cabinets', description: 'Pre-engineered boxes with extensive customization options.', features: ['Faster lead times', 'Wide style selection', 'Modification options', 'Better value than full custom'] },
        { title: 'Stock Cabinets', description: 'In-stock cabinets ready for quick installation at affordable prices.', features: ['In-stock availability', 'Budget-friendly pricing', 'Quality construction', 'Fast project completion'] },
      ],
      faq: [
        { question: 'What is the difference between stock and custom cabinets?', answer: 'Stock cabinets come in standard sizes and are ready to install immediately. Custom cabinets are built to your exact measurements and style preferences but have longer lead times.' },
        { question: 'How long do custom cabinets take?', answer: 'Custom cabinets typically take 4–6 weeks from order to delivery. Stock and semi-custom options are often available much faster.' },
        { question: 'Do you install cabinets you didn\'t sell?', answer: 'We specialize in selling and installing our own cabinet lines to ensure quality control throughout the project.' },
      ],
      cta: { heading: 'See Our Cabinets in Person', subheading: 'Visit our Valrico showroom to explore hundreds of styles and finishes.', buttonText: 'Schedule Showroom Visit', buttonLink: '/contact' },
      seo: { metaTitle: 'Custom Cabinets Tampa | Cabinets & Remodeling Depot', metaDescription: 'Custom, semi-custom, and stock kitchen cabinets in Tampa Bay. Visit our Valrico showroom. Free design consultation.', ogImage: '' },
    },

    countertops: {
      hero: {
        title: 'Quartz & Granite Countertops Tampa',
        subtitle: 'Premium countertop fabrication and installation for kitchens and bathrooms.',
        backgroundImage: '',
        ctaText: 'Get Countertop Estimate',
        ctaLink: '/contact',
      },
      content: {
        heading: 'In-House Countertop Fabrication',
        body: 'We fabricate and install quartz and granite countertops right here in Tampa Bay. By cutting out the middleman, we deliver superior quality at better prices. From template measurement to final installation, our team handles every step.',
        image: '',
      },
      countertopTypes: [
        { title: 'Quartz Countertops', description: 'Engineered stone combining natural quartz with resins for a non-porous, low-maintenance surface.', benefits: ['Non-porous & stain resistant', 'No sealing required', '100+ colors available', 'Consistent pattern throughout'] },
        { title: 'Granite Countertops', description: 'Natural stone with unique veining patterns and exceptional durability.', benefits: ['Natural stone beauty', 'Heat resistant', 'Unique slab patterns', 'Adds home value'] },
      ],
      faq: [
        { question: 'Which is better — quartz or granite?', answer: 'Both are excellent choices. Quartz requires less maintenance (no sealing) and offers consistent patterns. Granite offers natural uniqueness and heat resistance.' },
        { question: 'How long does countertop installation take?', answer: 'After template measurement, countertops are typically fabricated and installed within 7–10 business days.' },
        { question: 'Do you do countertop-only projects?', answer: 'Yes! We handle countertop-only replacement projects without requiring a full kitchen remodel.' },
      ],
      cta: { heading: 'Get a Countertop Quote Today', subheading: 'Send us your measurements or schedule a free in-home template appointment.', buttonText: 'Request Quote', buttonLink: '/contact' },
      seo: { metaTitle: 'Quartz & Granite Countertops Tampa | Cabinets & Remodeling Depot', metaDescription: 'In-house quartz and granite countertop fabrication and installation in Tampa Bay. Free templates and competitive pricing.', ogImage: '' },
    },

    flooring: {
      hero: {
        title: 'Flooring Installation Tampa',
        subtitle: 'Hardwood, tile, luxury vinyl, and laminate flooring for every room.',
        backgroundImage: '',
        ctaText: 'Get Flooring Estimate',
        ctaLink: '/contact',
      },
      content: {
        heading: 'Premium Flooring for Every Room and Budget',
        body: 'The right floor transforms a room. Our flooring specialists help you choose the perfect material for your lifestyle, then install it with precision and care. We carry top brands in hardwood, tile, luxury vinyl plank (LVP), and laminate flooring.',
        image: '',
      },
      flooringTypes: [
        { title: 'Hardwood Flooring', description: 'Solid and engineered hardwood in dozens of species and stains.', features: ['Adds home value', 'Can be refinished', 'Timeless appearance', '20–100 year lifespan'] },
        { title: 'Luxury Vinyl Plank (LVP)', description: '100% waterproof flooring that looks like real wood.', features: ['100% waterproof', 'Pet & kid friendly', 'Comfortable underfoot', 'Budget-friendly'] },
        { title: 'Tile Flooring', description: 'Porcelain and ceramic tile for kitchens, bathrooms, and entryways.', features: ['Extremely durable', 'Easy to clean', 'Endless style options', 'Ideal for wet areas'] },
        { title: 'Laminate Flooring', description: 'Affordable wood-look flooring with scratch-resistant surfaces.', features: ['Budget-friendly', 'Scratch resistant', 'Easy maintenance', 'Fast installation'] },
      ],
      faq: [
        { question: 'What flooring is best for kitchens?', answer: 'Tile and luxury vinyl plank are most popular for kitchens due to moisture resistance. Both are easy to clean and highly durable.' },
        { question: 'How long does flooring installation take?', answer: 'Most flooring projects take 1–3 days depending on square footage and material. Hardwood may require additional acclimation time.' },
        { question: 'Do you offer flooring removal?', answer: 'Yes, we handle old flooring removal and disposal as part of our installation service.' },
      ],
      cta: { heading: 'Ready for New Floors?', subheading: 'Schedule a free in-home measurement and get a detailed flooring quote.', buttonText: 'Get Free Quote', buttonLink: '/contact' },
      seo: { metaTitle: 'Flooring Installation Tampa | Cabinets & Remodeling Depot', metaDescription: 'Professional hardwood, LVP, tile, and laminate flooring installation in Tampa Bay. Free estimates.', ogImage: '' },
    },

    contact: {
      hero: {
        title: 'Contact Us',
        subtitle: 'Get in touch for a free estimate or to schedule your showroom visit.',
        backgroundImage: '',
      },
      contactInfo: {
        phone: '(813) 555-0100',
        email: 'info@cabinetsremodelingdepot.com',
        address: '123 Main Street, Valrico, FL 33594',
        hours: [
          { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
          { day: 'Saturday', hours: '9:00 AM – 4:00 PM' },
          { day: 'Sunday', hours: 'Closed' },
        ],
      },
      seo: {
        metaTitle: 'Contact Us | Cabinets & Remodeling Depot Tampa',
        metaDescription: 'Contact Cabinets & Remodeling Depot for a free remodeling estimate in Tampa Bay. Call, email, or visit our Valrico showroom.',
        ogImage: '',
      },
    },

    'privacy-policy': {
      hero: { title: 'Privacy Policy', subtitle: 'Last updated: January 2025', backgroundImage: '' },
      content: {
        body: '# Privacy Policy\n\nCabinets & Remodeling Depot ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you visit our website.\n\n## Information We Collect\n\nWe collect information you provide directly, such as when you fill out our contact form including your name, email address, phone number, and project details.\n\n## How We Use Your Information\n\nWe use your information to respond to your inquiries, provide estimates, and communicate about your remodeling project.\n\n## Contact Us\n\nIf you have questions about this Privacy Policy, contact us at info@cabinetsremodelingdepot.com.',
      },
      seo: { metaTitle: 'Privacy Policy | Cabinets & Remodeling Depot', metaDescription: 'Privacy policy for Cabinets & Remodeling Depot website.', ogImage: '' },
    },

    terms: {
      hero: { title: 'Terms of Service', subtitle: 'Please read these terms carefully.', backgroundImage: '' },
      content: {
        body: '# Terms of Service\n\nBy accessing our website, you agree to these Terms of Service. Our website is for informational purposes. All pricing and project details are subject to in-person consultation and written contract.\n\n## Intellectual Property\n\nAll content on this website is the property of Cabinets & Remodeling Depot.\n\n## Contact\n\nFor questions about these terms, contact us at info@cabinetsremodelingdepot.com.',
      },
      seo: { metaTitle: 'Terms of Service | Cabinets & Remodeling Depot', metaDescription: 'Terms of service for Cabinets & Remodeling Depot website.', ogImage: '' },
    },
  }

  return defaults[slug] || {
    hero: {
      title: 'Welcome',
      subtitle: '',
      backgroundImage: '',
      ctaText: 'Contact Us',
      ctaLink: '/contact',
    },
    sections: [],
    faq: [],
    cta: { heading: 'Get In Touch', subheading: '', buttonText: 'Contact Us', buttonLink: '/contact' },
    seo: { metaTitle: '', metaDescription: '', ogImage: '' },
  }
}
