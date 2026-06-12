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
          title: 'Kitchen Cabinets Tampa – Quality Cabinets & Professional Installation',
          subtitle: 'Transform your kitchen with beautifully crafted cabinetry designed for the way you live. At Cabinets & Remodeling Depot, we help homeowners throughout Tampa Bay find stylish, functional, and affordable kitchen solutions without the stress that often comes with remodeling projects.',
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
            { label: 'Kitchen Remodeling', desc: 'Full kitchen remodels tailored to your style and budget.', image: '/07_img.jpg', href: '/kitchen-remodeling' },
            { label: 'Bathroom Remodeling', desc: 'Beautiful, functional bathrooms designed for everyday living.', image: '/06_img.webp', href: '/bathroom-remodeling' },
            { label: 'Kitchen Cabinets', desc: 'Quality cabinets in a variety of styles and finishes.', image: '/1_img.jpg', href: '/cabinets' },
            { label: 'Countertops', desc: 'Quartz, granite, marble, quartzite & porcelain.', image: '/03_img.webp', href: '/countertops' },
            { label: 'In-Stock Cabinets', desc: 'Ready-to-install cabinets available for faster delivery.', image: '/05_img.jpg', href: '/cabinets' },
            { label: 'Flooring', desc: 'Durable, beautiful flooring for every room.', image: '/2_img.webp', href: '/flooring' },
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
            { question: 'Do you have in-stock cabinets available?', answer: 'Absolutely. We carry in-stock cabinets Tampa homeowners often choose for faster remodeling timelines.' },
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
