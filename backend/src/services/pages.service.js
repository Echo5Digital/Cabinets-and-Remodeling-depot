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
 *
 * IMPORTANT: Section IDs and order must exactly match
 * PAGE_DEFAULT_SECTIONS in frontend/src/lib/pageContent.js.
 */
export function getDefaultContent(slug) {
  const defaults = {

    // ── HOME ─────────────────────────────────────────────────────────────────
    home: {
      _version: 3,
      sections: [
        {
          id: 'home-hero',
          type: 'hero',
          title: 'Kitchen Remodeling, Cabinets & Countertops in Tampa Bay',
          subtitle: 'Transform your home with premium cabinetry, countertops, flooring, and professional remodeling services from our Valrico showroom.',
          description: '',
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
          id: 'home-partners',
          type: 'partners',
          label: 'Our Partners',
          heading: 'Our Trusted Partners',
          description: 'Brands we proudly work with to bring you quality products and materials.',
          logos: ['/partner/1.png', '/partner/2.png', '/partner/3.png', '/partner/4.png', '/partner/5.png', '/partner/6.png', '/partner/7.png', '/partner/8.png', '/partner/9.png', '/partner/10.png'],
        },
        {
          id: 'home-faq',
          type: 'faq',
          heading: 'Frequently Asked Questions',
          items: [
            { question: 'How much do kitchen cabinets cost in Tampa Bay?', answer: 'The cost depends on your kitchen size, cabinet style, material selection, and installation requirements. We offer stock, semi-custom, and custom cabinet options to fit a variety of budgets. Contact us or visit our Valrico showroom for a free estimate.' },
            { question: 'What is the difference between stock, semi-custom, and custom cabinets?', answer: 'Stock cabinets come in standard sizes and are budget-friendly. Semi-custom cabinets offer more flexibility in finishes and configurations, while custom cabinets are built specifically for your space, style, and storage needs.' },
            { question: 'Do you provide complete kitchen remodeling services?', answer: 'Yes. In addition to kitchen cabinets, we offer countertops, flooring, backsplashes, and complete kitchen remodeling solutions. Our team manages the process from design consultation to professional installation.' },
            { question: 'Why should I visit your Valrico showroom?', answer: "Our showroom allows you to explore cabinet styles, countertop materials, colors, finishes, and design options in person. You'll also receive expert guidance to help you choose the best solutions for your home and budget." },
            { question: 'What areas do you serve?', answer: 'We proudly serve homeowners throughout Tampa Bay, including Tampa, Valrico, Brandon, Riverview, Lithia, Plant City, Apollo Beach, Wesley Chapel, and surrounding communities.' },
          ],
        },
        {
          id: 'home-pre-footer',
          type: 'pre-footer',
          heading: 'Ready to Start Your Project?',
          description: "Get a free quote and expert design inspiration from our team—let's build!",
          phone: '+1 813-651-2333',
          trustItems: ['Lowest Price', 'Premium Quality', 'Professional Installation', 'Financing Options Available'],
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

    // ── ABOUT ────────────────────────────────────────────────────────────────
    about: {
      sections: [
        {
          id: 'about-hero',
          type: 'hero',
          title: 'About Cabinets & Remodeling Depot',
          subtitle: 'Your trusted remodeling partner in Tampa Bay since 2005.',
          backgroundImage: '',
          ctaText: 'Contact Us',
          ctaLink: '/contact',
        },
        {
          id: 'about-history',
          type: 'text',
          heading: 'Our History',
          body: 'We created Cabinets & Remodeling Depot, formerly known as Brandon Discount Cabinets, because we wanted to create a place where our customers saw us as hardworking, honest, and have pride in the work that we do. Cabinets & Remodeling Depot is a company that wants to change the standard and give our clients quality products that will not disappoint them. We are proud of the work we have done, and we are expecting a greater future with our clients. Thank you for taking an interest in Cabinets & Remodeling Depot.',
          image: '',
          layout: 'full',
        },
        {
          id: 'about-values',
          type: 'text',
          heading: 'Our Values',
          body: 'At Cabinet & Remodeling Depot, we value our clients. Our team believes in developing an impactful community with our Cabinets & Remodeling family. We take pride in being proactive and consistent with our approach to new projects and making sure our clients are happy.',
          image: '',
          layout: 'full',
        },
        {
          id: 'about-content',
          type: 'text',
          heading: 'Pair Your Kitchen Cabinets And Countertops',
          body: "Cabinets & Remodeling Depot have been designing and supplying bathroom and kitchen cabinets throughout the Tampa area for years. We aim to succeed but to also go beyond every client's expectations. Our background of success was founded on the principles that if we treat our clients right from the moment, they call us, that they have no other choice but to flaunt to their friends and family about us. To Cabinets & Remodeling Depot, your referral is our highest possible compliment.\n\nComing up with a cohesive kitchen begins with getting the right material which is in coordinating colors. When you will be putting your kitchen together, you will have to choose countertops, cupboards, appliances and floor styles. All these represent your taste. Moreover, how you mix and match the materials and colors creates a direct correlation with the types of vibes a kitchen gives off. There are several ways of enabling one to coordinate cupboards, cabinets, and countertops to get an appealing and creative aesthetic.\n\nColor: Color of your kitchen will give an integral look to it. At the same time, the color choice shapes up the overall space into something that is elegant, fun, and light-hearted.\n\nMaterial: Overall quality of a kitchen largely depends on the type of material you choose. There are different materials that you may use for countertops and cabinets.\n\nCabinet material: Most common material in this regards is wood. However, there are other options such as plywood, veneer, and laminating.\n\nCountertop material: There is a variety of countertop material in the market as well. For instance; engineered stone, natural stone, ceramic tile, solid surface material, butcher block, laminate, concrete, and stainless steel etc are few to be mentioned.\n\nOnce again it is suggested that color of your cabinets and countertops give an overall look to your kitchen indeed and hence it needs to be well taken care of.\n\nWe at Cabinets & Remodeling Depot will ensure our professional facilitation in this regards. We know it well that as homeowners, we all like to have options. Since there are so many choices available out there; options turn in to chores and no one likes chores. Therefore, it is significant that you whittle down the alternatives by following a set of criteria. The criteria must reflect what is important for you while remodeling of your kitchen or bathroom.\n\nThis wonderful world of kitchen countertops, cabinets and bathroom vanities is loaded with every main style along with the sub-style that one can think of. Here once again, we are there to help you out. It does not matter if you are looking forward to renovate your kitchen or bathroom; we will provide you with our professional experience and guidance. We excel in providing kitchen and bathroom shower faucets; custom designed kitchen cabinets Tampa FL, quartz, granite table tops, bathroom vanities and much more. Similarly we amuse our valuable clients with waterproof vinyl and laminate flooring enhancing beauty of your place in every manner.\n\nWe will share with you different options of cabinet and countertops colors and materials. Moreover, we will save you from pain remodeling your kitchen or bathroom this year and having it outdated next year. Do not feel hesitate and allow us to serve you with our professional services. We are just a few clicks away from you at Cabinets & Remodeling Depot. Cabinets And Remodeling Depot provides you with the best kitchen countertops in Tampa.",
          image: '',
          layout: 'full',
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
        metaDescription: "Learn about Cabinets & Remodeling Depot — Tampa Bay's trusted kitchen and bathroom remodeling company.",
        ogImage: '',
      },
      schema: '',
    },

    // ── SERVICES ─────────────────────────────────────────────────────────────
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
          heading: 'Everything You Need for Your Dream Home',
          description: 'From a single room update to a whole-home transformation, we provide comprehensive remodeling services with the quality and care your home deserves.',
          items: [
            { icon: 'Layers',   title: 'Countertops',         description: 'Premium quartz and granite countertops fabricated and installed by certified professionals.',                    link: '/countertops-tampa',         image: '' },
            { icon: 'Layout',   title: 'Kitchen Cabinets',    description: 'Ready-to-install cabinets in stock at our Valrico showroom — no long waits, fast project turnaround.',          link: '/kitchen-cabinets-tampa',    image: '' },
            { icon: 'ChefHat',  title: 'Kitchen Remodeling',  description: 'Complete kitchen transformations including cabinets, countertops, flooring, and layout redesign.',              link: '/kitchen-remodeling-tampa',  image: '' },
            { icon: 'Grid3X3',  title: 'Flooring',            description: 'Hardwood, tile, luxury vinyl plank, and laminate flooring expertly installed throughout your home.',           link: '/flooring-in-tampa',         image: '' },
            { icon: 'Droplets', title: 'Bathroom Remodeling', description: 'Luxury bathroom renovations with custom tile, vanities, walk-in showers, and modern fixtures.',               link: '/bathroom-remodeling-tampa', image: '' },
          ],
        },
        {
          id: 'services-cta',
          type: 'cta',
          heading: 'Start Your Project Today',
          subheading: 'Get a free estimate from our remodeling experts.',
          buttonText: 'Get Free Estimate',
          buttonLink: '/contact',
        },
      ],
      seo: {
        metaTitle: 'Remodeling Services | Cabinets & Remodeling Depot Tampa',
        metaDescription: 'Kitchen remodeling, bathroom renovations, custom cabinets, countertops, and flooring in Tampa Bay.',
        ogImage: '',
      },
      schema: '',
    },

    // ── KITCHEN REMODELING TAMPA ──────────────────────────────────────────────
    'kitchen-remodeling-tampa': {
      sections: [
        {
          id: 'kr-hero',
          type: 'hero',
          title: 'Kitchen Remodeling Tampa',
          subtitle: 'Custom Cabinetry & Countertop Renovations',
          description: 'Transform your kitchen with custom cabinetry, premium countertops, and professional remodeling solutions tailored to your style, needs, and budget.',
          backgroundImage: '/kitchen-remodeling-hero.webp',
          ctaText: 'Get a Free Estimate',
          ctaLink: '/contact',
        },
        {
          id: 'kr-why-choose',
          type: 'features',
          heading: 'Why Homeowners Choose Cabinets & Remodeling Depot',
          items: [
            { title: 'Local Valrico Showroom', description: 'Explore cabinets, countertops, finishes, and design options in person before making important decisions.', icon: 'Building2' },
            { title: 'Complete Remodeling Solutions', description: 'From cabinetry and countertops to flooring and finishing touches, we provide comprehensive kitchen renovation services.', icon: 'Settings2' },
            { title: 'Professional Installation', description: 'Our experienced team ensures every component is installed with precision and attention to detail.', icon: 'Wrench' },
            { title: 'Personalized Design Guidance', description: 'We help homeowners create kitchens that reflect their style while maximizing storage, workflow, and comfort.', icon: 'Palette' },
            { title: 'Quality Products', description: 'Choose from trusted materials, modern designs, and durable finishes built to withstand daily use.', icon: 'ShieldCheck' },
          ],
        },
        {
          id: 'kr-partner',
          type: 'installation',
          label: 'Your Trusted Partner',
          heading: 'Kitchen Remodeling in Tampa Bay',
          bgImage: '/cabinet-instock.webp',
          paragraphs: [
            "A kitchen is more than just a place to cook. It's where families gather, meals are shared, and memories are made. Whether you're updating an outdated layout or planning a complete kitchen renovation, our team provides personalized solutions designed around your lifestyle, needs, and budget.",
            'We proudly serve homeowners across Tampa, Valrico, Brandon, Riverview, Lithia, Apollo Beach, Wesley Chapel, and surrounding communities with professional kitchen remodeling services that enhance both beauty and functionality.',
          ],
        },
        {
          id: 'kr-services',
          type: 'services',
          heading: 'Comprehensive Kitchen Remodeling Services',
          items: [
            { title: 'Kitchen Design & Planning', description: 'Thoughtful planning that balances aesthetics, functionality, and your lifestyle needs.', image: '/07_img.jpg', link: '/contact' },
            { title: 'Cabinet Solutions', description: 'Stock, semi-custom, and custom cabinetry to fit your style, budget, and storage needs.', image: '/1_img.jpg', link: '/kitchen-cabinets-tampa' },
            { title: 'Countertops & Surfaces', description: 'Premium quartz, granite, and other surfaces that elevate the look and performance of your kitchen.', image: '/03_img.webp', link: '/countertops-tampa' },
            { title: 'Flooring & Finishing Details', description: 'Flooring, backsplashes, hardware, and finishing elements that create a cohesive, polished look.', image: '/2_img.webp', link: '/flooring-in-tampa' },
          ],
        },
        {
          id: 'kr-styles',
          type: 'service-areas',
          heading: 'Kitchen Design Styles',
          areas: ['Modern Kitchen Designs', 'Shaker Cabinet Kitchens', 'Open-Concept Layouts', 'Quartz Countertop Kitchens', 'Contemporary Kitchen Renovations', 'Classic Traditional Kitchens'],
        },
        {
          id: 'kr-gallery',
          type: 'services',
          heading: 'Kitchen Design Inspiration',
          items: [
            { title: 'Modern kitchen remodel Tampa Bay', image: '/kitchen-remodel.webp' },
            { title: 'Kitchen renovation Tampa', image: '/kitchen-remodel-2.webp' },
            { title: 'Completed kitchen renovation Tampa', image: '/Modern-kitchen-renovation-Tampa-completed-project.jpg' },
            { title: 'Kitchen cabinet remodeling Tampa', image: '/kitchen_cabinet_remodeling-01.webp' },
            { title: 'Marble countertops kitchen Tampa', image: '/kitchen_countertops_marble.webp' },
          ],
        },
        {
          id: 'kr-process',
          type: 'process',
          heading: 'Our Kitchen Remodeling Process',
          steps: [
            { step: '01', title: 'Consultation', description: 'We begin by discussing your goals, budget, and design preferences.' },
            { step: '02', title: 'Design & Material Selection', description: 'Visit our Valrico showroom to explore cabinets, countertops, and finishes while finalizing your plan.' },
            { step: '03', title: 'Project Planning', description: 'Our team develops a detailed project scope and timeline so you know exactly what to expect.' },
            { step: '04', title: 'Professional Installation', description: 'We complete your kitchen remodel with careful attention to craftsmanship, quality, and efficiency.' },
            { step: '05', title: 'Final Walkthrough', description: 'Before project completion, we review every detail to ensure your satisfaction.' },
          ],
        },
        {
          id: 'kr-areas',
          type: 'service-areas',
          heading: 'Service Areas',
          areas: ['Tampa', 'Apollo Beach', 'Valrico', 'Plant City', 'Brandon', 'Wesley Chapel', 'Riverview', 'Lithia'],
        },
        {
          id: 'kr-testimonials',
          type: 'testimonials',
          heading: 'What Our Clients Say',
          items: [
            { name: 'Sarah M.', location: 'Riverview, FL', rating: 5, text: "We finally redid our kitchen after 12 years putting it off. Went into the Valrico showroom with no idea what we wanted and they were so patient, spent over an hour going through cabinet styles and countertop samples with us. Ended up with white shaker cabinets and quartz countertops and I obsess over it every single morning. The crew was in and out in a week and left everything spotless." },
            { name: 'Carlos B.', location: 'Brandon, FL', rating: 5, text: "Got quotes from three places before coming here. Best price, no pressure, and they actually listened. The semi-custom cabinets look completely custom, you'd never know the difference. There was one small issue during install and they fixed it the same day without us having to follow up. Kitchen looks amazing, added real value to the house." },
            { name: 'Michelle R.', location: 'Valrico, FL', rating: 5, text: 'We redid the kitchen before listing our home and honestly it changed everything. They helped us pick finishes that photograph well without going over budget. Whole project was done in under two weeks. Our realtor said it was one of the best kitchen updates she had seen at that price point. We ended up not even selling because we fell back in love with the house!' },
          ],
        },
        {
          id: 'kr-faq',
          type: 'faq',
          heading: 'Frequently Asked Questions',
          items: [
            { question: 'How much does a kitchen remodel cost in Tampa?', answer: 'The cost of a kitchen remodel depends on factors such as project size, material selections, cabinetry, countertops, and installation requirements. We provide free estimates and personalized recommendations based on your goals and budget.' },
            { question: 'How long does a kitchen renovation take?', answer: 'Project timelines vary depending on the scope of work. Smaller updates may take a few weeks, while complete kitchen renovations can require additional time. We provide clear timelines before work begins.' },
            { question: 'Do you help with kitchen design?', answer: 'Yes. Our team assists homeowners with kitchen layouts, cabinet selections, material choices, and design planning to create a space that balances functionality and style.' },
            { question: 'Why should I visit your Valrico showroom?', answer: 'Our showroom allows homeowners to compare cabinet styles, countertop materials, colors, and finishes in person while receiving expert guidance from our team.' },
            { question: 'What areas do you serve?', answer: 'We serve homeowners throughout Tampa Bay, including Tampa, Valrico, Brandon, Riverview, Lithia, Apollo Beach, Wesley Chapel, and surrounding communities.' },
          ],
        },
        {
          id: 'kr-cta',
          type: 'start-project',
          heading: 'Start Your Kitchen Remodeling Project Today',
          body: 'Visit our Valrico showroom to explore kitchen remodeling options, compare materials, and speak with our experienced team about your renovation goals.',
          bgImage: '/kitchen_cabinet_remodeling-01.webp',
          ctaText: 'Request a Free Estimate',
          ctaLink: '/contact',
        },
      ],
      seo: { metaTitle: 'Kitchen Remodeling Tampa | Cabinets & Remodeling Depot', metaDescription: 'Expert kitchen remodeling in Tampa Bay. Custom cabinets, countertops, full renovations. Free estimates.', ogImage: '' },
      schema: '',
    },

    // ── BATHROOM REMODELING TAMPA ─────────────────────────────────────────────
    'bathroom-remodeling-tampa': {
      sections: [
        {
          id: 'br-hero',
          type: 'hero',
          title: 'Bathroom Remodeling Tampa',
          subtitle: 'Custom Vanities & Luxury Renovations',
          description: 'Transform your bathroom with custom vanities, premium countertops, modern fixtures, and professional renovation solutions designed around your lifestyle.',
          backgroundImage: '/bathroom-02.webp',
          ctaText: 'Schedule a Free Consultation',
          ctaLink: '/contact',
        },
        {
          id: 'br-why-choose',
          type: 'features',
          heading: 'Why Homeowners Choose Cabinets & Remodeling Depot',
          items: [
            { title: 'Local Valrico Showroom', description: 'Explore vanities, countertops, faucets, and design options in person before making important remodeling decisions.', icon: 'Building2' },
            { title: 'Complete Bathroom Remodeling Solutions', description: 'From vanity upgrades to full bathroom renovations, we provide comprehensive remodeling services tailored to your space.', icon: 'Settings2' },
            { title: 'Professional Installation', description: 'Our experienced team ensures every component is installed with precision and attention to detail.', icon: 'Wrench' },
            { title: 'Personalized Design Guidance', description: 'We help homeowners create bathrooms that reflect their style while improving functionality and organization.', icon: 'Palette' },
            { title: 'Quality Products', description: 'Choose from trusted materials, modern finishes, and durable products designed for everyday use.', icon: 'ShieldCheck' },
          ],
        },
        {
          id: 'br-partner',
          type: 'installation',
          label: 'Your Trusted Partner',
          heading: 'Bathroom Remodeling Partner in Tampa Bay',
          bgImage: '/bathroom-remodeling-design-2.jpg',
          paragraphs: [
            "A well-designed bathroom should feel comfortable, functional, and easy to maintain. For many homeowners, older bathrooms often feel cramped, outdated, or no longer practical for everyday routines. At Cabinets & Remodeling Depot, we help homeowners throughout Tampa Bay create bathrooms that balance style, storage, and long-term functionality without making the remodeling process overwhelming.",
            'We proudly serve homeowners across Tampa, Valrico, Brandon, Riverview, Lithia, Apollo Beach, Wesley Chapel, and surrounding communities with professional bathroom remodeling services.',
          ],
        },
        {
          id: 'br-services',
          type: 'services',
          heading: 'Comprehensive Bathroom Remodeling Services',
          items: [
            { title: 'Bathroom Design & Planning', description: 'Every successful bathroom renovation starts with thoughtful planning. We work closely with homeowners to develop designs that balance comfort, efficiency, and visual appeal.', image: '/bathroom-designing.webp', link: '/contact' },
            { title: 'Custom Bathroom Vanities', description: "Our showroom features bathroom vanities Tampa homeowners can compare in person. Whether you're looking for a modern floating vanity or a traditional cabinet-style vanity, we help you find options that fit your space.", image: '/custom-bathroom-vanity.jpg', link: '/contact' },
            { title: 'Bathroom Countertops & Surfaces', description: 'We offer bathroom countertops Tampa homeowners can customize using premium materials such as quartz and granite.', image: '/bathroom-surfaces.webp', link: '/contact' },
            { title: 'Faucets & Fixture Selections', description: 'Our showroom includes bathroom faucets Tampa Valrico showroom visitors can compare alongside vanities and countertop materials.', image: '/faucets-fixtures.jpg', link: '/contact' },
            { title: 'Shower & Bath Upgrades', description: 'From updated shower systems to bathtub replacements, we help homeowners create bathrooms that feel more comfortable and modern.', image: '/shower-upgrade.jpg', link: '/contact' },
            { title: 'Storage & Organization Solutions', description: 'Smart storage solutions help maximize available space while keeping bathrooms organized and clutter-free.', image: '/storage-solution.webp', link: '/contact' },
          ],
        },
        {
          id: 'br-styles',
          type: 'service-areas',
          heading: 'Bathroom Design Styles',
          areas: ['Spa-Inspired Bathrooms', 'Modern Bathroom Designs', 'Walk-In Showers', 'Double Vanity Layouts', 'Contemporary Bathroom Renovations', 'Guest Bathroom Updates'],
        },
        {
          id: 'br-gallery',
          type: 'services',
          heading: 'Bathroom Renovation Gallery',
          items: [
            { title: 'Luxury bathroom vanity Tampa', image: '/bathroom-remodel-1.jpg' },
            { title: 'Modern bathroom renovation Tampa Bay', image: '/bathroom-remodeling-2.jpg' },
            { title: 'Walk-in shower bathroom Tampa', image: '/bathroom-remodel-3.jpg' },
            { title: 'Modern bathroom countertops Tampa', image: '/bathroom-remodel-4.jpg' },
            { title: 'Bathroom renovation Valrico Tampa Bay', image: '/bathroom-remodeling-3.jpg' },
            { title: 'Custom bathroom renovation Tampa Bay', image: '/bathroom-remodel-5.jpg' },
            { title: 'Elegant tile work bathroom Tampa', image: '/bathroom-remodel-2.jpg' },
            { title: 'Spa-inspired bathroom remodel Tampa', image: '/bathroom-remodel-6.jpg' },
          ],
        },
        {
          id: 'br-upgrades',
          type: 'services',
          heading: 'Popular Bathroom Upgrades',
          items: [
            { title: 'Custom Bathroom Vanities', image: '/custom-bathroom-vanities.jpeg' },
            { title: 'Quartz Countertops', image: '/quartz-countertopz.jpeg' },
            { title: 'Modern Faucet Collections', image: '/modern-faucet-collections.jpeg' },
            { title: 'Walk-In Showers', image: '/walk-in-showers.jpeg' },
            { title: 'Tile Flooring', image: '/tile-flooring.jpeg' },
            { title: 'Improved Lighting', image: '/improved-lighting.jpeg' },
            { title: 'Storage Enhancements', image: '/storage-enhancement.jpeg' },
            { title: 'Double Sink Vanities', image: '/double-sink-vanities.jpeg' },
          ],
        },
        {
          id: 'br-process',
          type: 'process',
          heading: 'Our Bathroom Remodeling Process',
          steps: [
            { step: '01', title: 'Consultation', description: 'We begin by discussing your goals, design preferences, and budget.' },
            { step: '02', title: 'Design & Material Selection', description: 'Visit our Valrico showroom to compare vanities, countertops, faucets, and finishes while finalizing your remodeling plan.' },
            { step: '03', title: 'Planning & Scheduling', description: 'Our team develops a clear project scope and timeline so you know exactly what to expect.' },
            { step: '04', title: 'Professional Installation', description: 'We complete your bathroom remodel with careful attention to craftsmanship, quality, and efficiency.' },
            { step: '05', title: 'Final Walkthrough', description: 'Before project completion, we review every detail to ensure your satisfaction.' },
          ],
        },
        {
          id: 'br-areas',
          type: 'service-areas',
          heading: 'Service Areas',
          areas: ['Tampa', 'Apollo Beach', 'Valrico', 'Plant City', 'Brandon', 'Wesley Chapel', 'Riverview', 'Lithia'],
        },
        {
          id: 'br-faq',
          type: 'faq',
          heading: 'Frequently Asked Questions',
          items: [
            { question: 'Do you offer complete bathroom remodeling Tampa services?', answer: 'Yes. We provide full bathroom remodeling services including vanities, countertops, fixtures, storage solutions, and renovation support.' },
            { question: 'Can I visit your showroom before starting my renovation?', answer: 'Absolutely. Our Valrico showroom allows homeowners to compare bathroom vanities, faucets, countertops, and finishes in person.' },
            { question: 'Do you offer bathroom countertops Tampa homeowners can customize?', answer: 'Yes. We provide quartz and granite bathroom countertop options along with custom vanity top solutions.' },
            { question: 'Do you help with bathroom fixture and faucet selection?', answer: 'Yes. We help homeowners coordinate bathroom faucets, fixtures, vanities, and countertop materials for a more cohesive bathroom design.' },
            { question: 'How long does a bathroom renovation typically take?', answer: 'Project timelines vary depending on the scope of work. Smaller updates may take a few weeks, while complete bathroom renovations can require additional time. We provide clear timelines before work begins.' },
          ],
        },
        {
          id: 'br-cta',
          type: 'start-project',
          heading: 'Start Your Bathroom Remodeling Project Today',
          body: 'Visit our Valrico showroom to explore bathroom remodeling options, compare materials, and speak with our experienced team about your renovation goals.',
          bgImage: '/start-bathroom-remodel.jpeg',
          ctaText: 'Schedule a Free Consultation',
          ctaLink: '/contact',
        },
      ],
      seo: { metaTitle: 'Bathroom Remodeling Tampa | Cabinets & Remodeling Depot', metaDescription: 'Professional bathroom remodeling in Tampa Bay. Custom vanities, tile showers, and luxury renovations. Free estimates.', ogImage: '' },
      schema: '',
    },

    // ── KITCHEN CABINETS TAMPA ────────────────────────────────────────────────
    'kitchen-cabinets-tampa': {
      sections: [
        {
          id: 'cab-hero',
          type: 'hero',
          title: 'Kitchen Cabinets Tampa',
          subtitle: 'Affordable & Ready-to-Install Cabinet Solutions',
          description: 'Explore quality in-stock kitchen cabinets, affordable cabinet options, and professional installation services from our Valrico showroom.',
          backgroundImage: '/instock-cabinets-hero.webp',
          ctaText: 'Request Cabinet Pricing',
          ctaLink: '/contact',
        },
        {
          id: 'cab-why-choose',
          type: 'features',
          heading: 'Why Homeowners Choose Cabinets & Remodeling Depot',
          items: [
            { title: 'Local Valrico Showroom', description: 'Explore cabinet styles, finishes, and design options in person before making important remodeling decisions.', icon: 'Building2' },
            { title: 'In-Stock & Ready-to-Install Options', description: 'Reduce wait times and move your project forward more efficiently.', icon: 'Package' },
            { title: 'Professional Installation Services', description: 'Our experienced team ensures cabinets are installed with precision and attention to detail.', icon: 'Wrench' },
            { title: 'Personalized Design Guidance', description: 'We help homeowners select cabinet solutions that align with their goals, lifestyle, and budget.', icon: 'Settings2' },
            { title: 'One-Stop Remodeling Support', description: 'From cabinets and countertops to flooring and renovation planning, we help simplify the remodeling process.', icon: 'ShoppingBag' },
          ],
        },
        {
          id: 'cab-options',
          type: 'services',
          heading: 'Cabinet Options',
          items: [
            { title: 'Stock Cabinets', description: 'Stock cabinets are a popular solution for homeowners who want quality cabinetry without long lead times. Available in standard sizes and styles, ideal for faster remodeling projects.', image: '/instock-cabinets-1.jpg', link: '/contact' },
            { title: 'Semi-Custom Cabinets', description: 'Semi-custom cabinets offer additional flexibility in finishes, storage features, and configurations while maintaining a more manageable budget than fully custom options.', image: '/Custom-Cabinets-and-Countertops-for-Tampa-2.jpg', link: '/contact' },
            { title: 'Ready-to-Install Cabinets', description: 'Ready-to-install cabinets provide homeowners with an efficient way to upgrade their kitchen while reducing project timelines and simplifying the remodeling process.', image: '/instock-cabinets-2.jpg', link: '/contact' },
            { title: 'Cabinet Replacement Solutions', description: "Replacing outdated cabinets can dramatically improve a kitchen's appearance and functionality without requiring a complete renovation.", image: '/cabinet_remodeling_kitchen-03.webp', link: '/contact' },
          ],
        },
        {
          id: 'cab-gallery',
          type: 'services',
          heading: 'Cabinet Gallery',
          items: [
            { title: 'Kitchen remodel with new cabinets Tampa', image: '/kitchen-remodel.webp' },
            { title: 'Modern kitchen cabinet remodel Tampa Bay', image: '/kitchen-remodel-2.webp' },
            { title: 'Custom kitchen cabinets Tampa showroom', image: '/kitchen_cabinet_4.jpg' },
            { title: 'Affordable kitchen cabinets Tampa', image: '/kitchen_cabinet_5.jpg' },
            { title: 'White shaker cabinets Tampa installation', image: '/kitchen-cabinet-2.jpg' },
            { title: 'In-stock kitchen cabinets Tampa Bay', image: '/kitchen-cabinet-3.jpg' },
            { title: 'In-stock cabinets available in Valrico showroom', image: '/instock-cabinets-1.jpg' },
            { title: 'Semi-custom cabinets and countertops Tampa', image: '/Custom-Cabinets-and-Countertops-for-Tampa-2.jpg' },
          ],
        },
        {
          id: 'cab-styles',
          type: 'service-areas',
          heading: 'Cabinet Styles',
          areas: ['White Shaker Cabinets', 'Modern Flat-Panel Cabinets', 'Transitional Kitchen Designs', 'Traditional Raised-Panel Cabinets', 'Two-Tone Cabinet Combinations', 'Contemporary Storage Solutions'],
        },
        {
          id: 'cab-process',
          type: 'process',
          heading: 'Our Cabinet Process',
          steps: [
            { step: '01', title: 'Visit Our Showroom', description: 'Explore cabinet displays, finishes, and design ideas in person.' },
            { step: '02', title: 'Compare Cabinet Options', description: 'Review stock, semi-custom, and ready-to-install solutions.' },
            { step: '03', title: 'Receive Design Guidance', description: 'Work with our team to select cabinetry that fits your space and budget.' },
            { step: '04', title: 'Schedule Installation', description: 'Coordinate professional installation and project planning.' },
            { step: '05', title: 'Enjoy Your Updated Kitchen', description: 'Experience a kitchen that feels more functional, organized, and visually appealing.' },
          ],
        },
        {
          id: 'cab-faq',
          type: 'faq',
          heading: 'Frequently Asked Questions',
          items: [
            { question: 'Do you offer kitchen cabinets Tampa homeowners can purchase quickly?', answer: 'Yes. We provide a wide selection of kitchen cabinets available for faster remodeling timelines.' },
            { question: 'Are ready-to-install cabinets durable?', answer: 'Absolutely. Many modern ready-to-install cabinets offer strong construction, reliable hardware, and long-lasting finishes.' },
            { question: 'Can I view cabinet styles in person before purchasing?', answer: 'Yes. Our Valrico showroom allows homeowners to compare cabinet finishes, storage features, and design combinations firsthand.' },
            { question: 'Do you provide quick cabinet installation Tampa services?', answer: 'Yes. We offer professional cabinet installation services throughout Tampa Bay and surrounding communities.' },
            { question: "What's the difference between stock and semi-custom cabinets?", answer: 'Stock cabinets come in standard sizes and configurations, while semi-custom cabinets offer greater flexibility in finishes, storage features, and design options.' },
          ],
        },
        {
          id: 'cab-cta',
          type: 'start-project',
          heading: 'Start Your Cabinet Project Today',
          body: 'Visit our Valrico showroom to explore cabinet options, compare styles, and speak with our team about your kitchen remodeling goals.',
          bgImage: '/kitchen-bg.webp',
          ctaText: 'Schedule a Free Consultation',
          ctaLink: '/contact',
        },
      ],
      seo: { metaTitle: 'Kitchen Cabinets Tampa | Cabinets & Remodeling Depot', metaDescription: 'Affordable kitchen cabinets, ready-to-install cabinets, and professional installation in Tampa Bay. Visit our Valrico showroom.', ogImage: '' },
      schema: '',
    },

    // ── COUNTERTOPS TAMPA ─────────────────────────────────────────────────────
    'countertops-tampa': {
      sections: [
        {
          id: 'ct-hero',
          type: 'hero',
          title: 'Countertops Tampa Bay Homeowners Love',
          subtitle: 'Premium countertop fabrication and installation for kitchens and bathrooms.',
          backgroundImage: '/countertop_bg.webp',
          ctaText: 'Get Free Estimate',
          ctaLink: '/contact',
        },
        {
          id: 'ct-strip',
          type: 'features',
          heading: 'Why Choose Us',
          items: [
            { title: 'Premium Materials', description: 'Quartz, Granite, Quartzite, Marble & Porcelain', icon: 'LayoutGrid' },
            { title: 'Serving Tampa Bay', description: 'Tampa, Brandon, Riverview, Valrico, Lithia, FishHawk & More', icon: 'MapPin' },
            { title: 'Fast Turnaround', description: 'Most projects completed in 7–14 business days', icon: 'CalendarDays' },
            { title: 'Free Estimates', description: 'Visit our showroom or call (813) 651-2333', icon: 'Tag' },
            { title: 'Local & Trusted', description: 'Family-owned. Quality you can count on', icon: 'ShieldCheck' },
          ],
        },
        {
          id: 'ct-materials',
          type: 'services',
          heading: 'Countertop Materials',
          items: [
            { title: 'Quartz', description: 'Low maintenance, non-porous, and available in dozens of colors and finishes.', image: '/quartz.webp', link: '/contact' },
            { title: 'Granite', description: 'Natural stone with unique veining patterns and exceptional long-term durability.', image: '/granite.webp', link: '/contact' },
            { title: 'Quartzite', description: 'Marble-like beauty with incredible strength and natural heat resistance.', image: '/quartzite.webp', link: '/contact' },
            { title: 'Marble', description: 'Timeless elegance that adds luxury and sophistication to any kitchen or bath.', image: '/marble.webp', link: '/contact' },
            { title: 'Porcelain', description: 'Sleek, ultra-durable, and perfect for modern indoor and outdoor applications.', image: '/porcelain.webp', link: '/contact' },
          ],
        },
        {
          id: 'ct-why-choose',
          type: 'features',
          heading: 'Why Choose Cabinets & Remodeling Depot',
          items: [
            { title: 'Wholesale Pricing Through Direct Importing', description: 'Many countertop retailers buy through multiple distributors before materials reach the customer. Each step adds cost. Cabinets & Remodeling Depot works to reduce that markup by sourcing materials directly and passing savings to homeowners.', icon: 'Tag' },
            { title: 'A Real Local Showroom', description: 'Pictures online help, but countertops need to be seen in person. At our Valrico showroom, you can compare colors, patterns, edge profiles, and materials before making a final decision.', icon: 'MapPin' },
            { title: 'Custom Fabrication', description: 'Your countertop is measured, cut, edged, and finished for your specific kitchen or bathroom. We do not believe in one-size-fits-all countertop work.', icon: 'Settings2' },
            { title: 'One-Stop Kitchen and Bathroom Remodeling', description: 'Countertops often connect with cabinets, backsplash, flooring, sinks, and full remodeling work. We can help coordinate the entire project instead of making you manage multiple contractors.', icon: 'Layers' },
            { title: 'Professional Installation', description: 'Good countertops can look bad if they are installed poorly. Proper measurement, leveling, seam placement, sink cutouts, and finishing matter. Our team focuses on doing the work correctly from start to finish.', icon: 'Wrench' },
          ],
        },
        {
          id: 'ct-process',
          type: 'process',
          heading: 'Our Countertop Installation Process',
          steps: [
            { step: '01', title: 'Consultation & Material Selection', description: 'Call us or visit our Valrico showroom. We help you compare quartz, granite, quartzite, marble, and porcelain based on your style, budget, and daily use.' },
            { step: '02', title: 'Measurement', description: 'Once your layout is ready, we measure your kitchen, bathroom, island, or vanity area. This includes sink cutouts, cooktop openings, edges, seams, and overhangs.' },
            { step: '03', title: 'Fabrication', description: 'Your selected material is cut and finished to match the exact measurements of your space.' },
            { step: '04', title: 'Installation', description: 'Our installation team installs the countertops, checks the fit, secures the surface, finishes seams, and cleans the area.' },
          ],
        },
        {
          id: 'ct-areas',
          type: 'service-areas',
          heading: 'Countertop Installation Areas',
          areas: ['Tampa', 'South Tampa', 'Brandon', 'Riverview', 'Valrico', 'Lithia', 'FishHawk', 'Bloomingdale', 'Carrollwood', 'Westchase', 'Temple Terrace', 'Wesley Chapel', 'Lutz'],
        },
        {
          id: 'ct-faq',
          type: 'faq',
          heading: 'Countertop FAQs',
          items: [
            { question: 'How much do countertops cost in Tampa Bay?', answer: 'Countertop pricing depends on the material, square footage, edge style, sink cutouts, and installation needs. Granite, quartz, porcelain, quartzite, and marble all have different price ranges. The best way to get accurate pricing is to visit the showroom or schedule a free estimate.' },
            { question: 'Is quartz better than granite?', answer: 'Quartz is better if you want low maintenance and no sealing. Granite is better if you want natural stone, unique patterns, and stronger heat resistance. Both are excellent options for Tampa Bay kitchens.' },
            { question: 'How long does countertop installation take?', answer: 'Many countertop projects are completed within 7–14 business days after final measurement and material selection. A standard installation can often be completed in one day, depending on project size and complexity.' },
            { question: 'Do you remove old countertops?', answer: 'Yes, old countertop removal can be part of the installation process. Confirm this during your estimate so the team can include it in the project scope.' },
            { question: 'Do you install bathroom countertops too?', answer: 'Yes. Cabinets & Remodeling Depot installs kitchen countertops, bathroom vanity tops, islands, laundry room countertops, and more.' },
            { question: 'What is the easiest countertop to maintain?', answer: 'Quartz and porcelain are usually the easiest to maintain because they do not require sealing. They are strong choices for busy homes.' },
            { question: 'What countertop is best for outdoor kitchens in Tampa Bay?', answer: 'Porcelain, granite, and quartzite are strong outdoor countertop options because they handle heat and sunlight better than quartz. Quartz is usually better for indoor use.' },
            { question: 'Do you offer free estimates?', answer: 'Yes. Call (813) 651-2333 or visit the Valrico showroom to request a free countertop estimate.' },
          ],
        },
        {
          id: 'ct-cta',
          type: 'start-project',
          heading: 'Ready for Beautiful New Countertops?',
          body: 'Visit our Valrico showroom to compare materials, get expert guidance, and receive a free estimate for your countertop project.',
          bgImage: '/countertop_bg.webp',
          ctaText: 'Get Free Estimate',
          ctaLink: '/contact',
        },
        {
          id: 'ct-reviews',
          type: 'testimonials',
          heading: 'What Our Customers Say',
          items: [
            {
              name: 'Jennifer M.',
              location: 'Brandon, FL',
              initials: 'JM',
              rating: 5,
              timeAgo: '2 weeks ago',
              text: "The team did an amazing job on our kitchen countertops. The quartz they helped us select looks absolutely stunning. The install was quick and professional — couldn't be happier!",
            },
            {
              name: 'Robert T.',
              location: 'Riverview, FL',
              initials: 'RT',
              rating: 5,
              timeAgo: '1 month ago',
              text: 'We replaced old laminate with granite and the transformation is incredible. The showroom has so many options and the staff was very knowledgeable. Highly recommend!',
            },
            {
              name: 'Maria S.',
              location: 'Tampa, FL',
              initials: 'MS',
              rating: 5,
              timeAgo: '3 weeks ago',
              text: 'Professional from start to finish. The measurement was precise, fabrication was fast, and the installation team was courteous and tidy. My marble bathroom countertop is exactly what I envisioned.',
            },
            {
              name: 'David L.',
              location: 'Valrico, FL',
              initials: 'DL',
              rating: 5,
              timeAgo: '2 months ago',
              text: 'Outstanding experience. We visited the showroom and were able to compare quartz, granite, and quartzite side by side. They helped us choose the right material for our budget and lifestyle. The installation was flawless.',
            },
          ],
        },
        {
          id: 'ct-care-tips',
          type: 'features',
          heading: 'Countertop Care & Maintenance',
          items: [
            { title: 'Daily Cleaning', description: 'Use warm water, mild dish soap, and a soft cloth for everyday cleaning. Dry the surface to avoid water spots, especially on darker stone.' },
            { title: 'Avoid Harsh Chemicals', description: 'Avoid bleach, ammonia, vinegar, lemon juice, and abrasive scrubbers — especially on natural stone like granite, marble, and quartzite.' },
            { title: 'Use Cutting Boards', description: 'Even strong countertops can be damaged by repeated knife use. Cutting boards protect both your countertops and your knives.' },
            { title: 'Use Trivets for Hot Pans', description: 'Quartz can be damaged by direct high heat. Granite, quartzite, and porcelain handle heat better, but trivets are still recommended.' },
            { title: 'Seal Natural Stone', description: 'Granite, quartzite, and marble should be sealed when recommended. Quartz and porcelain do not need sealing.' },
            { title: 'Clean Spills Quickly', description: 'Wine, coffee, oil, citrus, and dark liquids should be wiped up quickly — especially on marble and natural stone.' },
          ],
        },
      ],
      seo: { metaTitle: 'Countertops Tampa | Granite & Quartz Countertops | Cabinets & Remodeling Depot', metaDescription: 'Premium granite and quartz countertops in Tampa Bay. In-house fabrication, expert installation, and a huge showroom selection. Free estimates available.', ogImage: '' },
      schema: '',
    },

    // ── FLOORING IN TAMPA ─────────────────────────────────────────────────────
    'flooring-in-tampa': {
      sections: [
        {
          id: 'fl-hero',
          type: 'hero',
          title: 'Flooring Tampa',
          subtitle: 'Hardwood, Tile & Laminate Flooring Solutions',
          description: 'Upgrade your home with hardwood, laminate, tile, and professionally installed flooring solutions designed for beauty, durability, and everyday living.',
          backgroundImage: '/wood-flooring-750x469.jpg',
          ctaText: 'Visit Our Valrico Showroom',
          ctaLink: '/contact',
        },
        {
          id: 'fl-why-choose',
          type: 'features',
          heading: 'Why Homeowners Choose Cabinets & Remodeling Depot',
          items: [
            { title: 'Local Valrico Showroom', description: 'Compare flooring materials, colors, and textures in person before making important renovation decisions.', icon: 'Building2' },
            { title: 'Professional Installation', description: 'Our experienced team ensures flooring is installed with precision and attention to detail.', icon: 'Wrench' },
            { title: 'Personalized Design Guidance', description: 'We help homeowners choose flooring solutions that fit their lifestyle, budget, and long-term goals.', icon: 'Palette' },
            { title: 'Quality Materials', description: "Select from durable flooring products designed to perform well in busy households and Florida's climate.", icon: 'ShieldCheck' },
            { title: 'One-Stop Remodeling Solutions', description: 'Coordinate flooring updates alongside kitchen remodeling, bathroom renovations, cabinetry, and countertops.', icon: 'Settings2' },
          ],
        },
        {
          id: 'fl-partner',
          type: 'installation',
          label: 'Your Trusted Partner',
          heading: 'Your Trusted Flooring Partner in Tampa Bay',
          bgImage: '/Flooring-samples.jpg',
          paragraphs: [
            "Choosing new flooring is one of the most impactful upgrades you can make to your home. The right floor changes how a room feels, how it functions, and how much you enjoy spending time in it. At Cabinets & Remodeling Depot, we help Tampa Bay homeowners explore flooring options that match their lifestyle, budget, and long-term goals.",
            'We proudly serve homeowners across Tampa, Valrico, Brandon, Riverview, Lithia, Apollo Beach, Wesley Chapel, and surrounding communities with professional flooring installation services.',
          ],
        },
        {
          id: 'fl-options',
          type: 'services',
          heading: 'Flooring Options',
          items: [
            { title: 'Hardwood Flooring', description: 'Hardwood flooring Tampa homeowners choose continues to be a popular option because of its timeless appearance, natural character, and long-term value.', image: '/wood-flooring-750x469.jpg', link: '/flooring-in-tampa/wood-flooring' },
            { title: 'Laminate Flooring', description: 'Laminate flooring Tampa homeowners appreciate offers an affordable and durable alternative to traditional hardwood while providing attractive wood-look finishes.', image: '/engineered-wood-flooring-768x480-1.jpg', link: '/flooring-in-tampa/laminate-flooring-in-tampa' },
            { title: 'Tile Flooring', description: 'Tile flooring Tampa homeowners frequently select is ideal for kitchens, bathrooms, laundry rooms, and high-moisture environments.', image: '/Flooring-samples.jpg', link: '/flooring-in-tampa/tiles-in-tampa' },
            { title: 'Waterproof Flooring', description: 'Waterproof flooring solutions are ideal for active households, helping protect against spills, moisture, and everyday wear.', image: '/flooring-1.jpg', link: '/contact' },
            { title: 'Whole-Home Flooring Solutions', description: 'For homeowners planning larger renovations, we provide flooring options that create consistency and flow throughout the entire home.', image: '/flooring-2.jpg', link: '/contact' },
          ],
        },
        {
          id: 'fl-styles',
          type: 'service-areas',
          heading: 'Flooring Styles',
          areas: ['Wide-Plank Hardwood Flooring', 'Modern Wood-Look Flooring', 'Waterproof Luxury Flooring', 'Contemporary Open Concept Interiors', 'Tile Flooring Designs', 'Whole-Home Flooring Renovations'],
        },
        {
          id: 'fl-gallery',
          type: 'services',
          heading: 'Flooring Gallery',
          items: [
            { title: 'Wide-plank hardwood flooring Tampa living room', image: '/wood-flooring-750x469.jpg' },
            { title: 'Modern wood-look flooring open concept home Tampa', image: '/engineered-wood-flooring-768x480-1.jpg' },
            { title: 'Tile flooring designs kitchen Tampa', image: '/Flooring-samples.jpg' },
            { title: 'Waterproof luxury flooring Tampa home', image: '/flooring-1.jpg' },
            { title: 'Whole-home flooring renovation Tampa Bay', image: '/flooring-2.jpg' },
          ],
        },
        {
          id: 'fl-process',
          type: 'process',
          heading: 'Our Flooring Process',
          steps: [
            { step: '01', title: 'Consultation', description: 'We discuss your goals, design preferences, budget, and project timeline.' },
            { step: '02', title: 'Flooring Selection', description: 'Visit our showroom to compare materials, colors, textures, and flooring styles.' },
            { step: '03', title: 'Measurement & Planning', description: 'Our team evaluates the space and develops a detailed installation plan.' },
            { step: '04', title: 'Professional Installation', description: 'We install your flooring with attention to detail, craftsmanship, and long-term performance.' },
            { step: '05', title: 'Final Inspection', description: 'Before project completion, we review every detail to ensure your satisfaction.' },
          ],
        },
        {
          id: 'fl-areas',
          type: 'service-areas',
          heading: 'Service Areas',
          areas: ['Tampa', 'Valrico', 'Brandon', 'Riverview', 'Lithia', 'Apollo Beach', 'Plant City', 'Wesley Chapel'],
        },
        {
          id: 'fl-faq',
          type: 'faq',
          heading: 'Frequently Asked Questions',
          items: [
            { question: 'What flooring works best for Florida homes?', answer: 'Tile, waterproof flooring, and laminate flooring are all popular choices because of their durability and moisture resistance. Hardwood remains a popular option for living areas and bedrooms.' },
            { question: 'Do you offer hardwood flooring Tampa homeowners can view in person?', answer: 'Yes. Our Valrico showroom features hardwood flooring options alongside laminate, tile, and waterproof flooring selections.' },
            { question: 'Do you provide flooring installation services?', answer: 'Absolutely. We provide professional flooring installation for kitchens, bathrooms, living areas, bedrooms, and full-home renovations.' },
            { question: 'Can I compare flooring materials before purchasing?', answer: 'Yes. Our showroom allows homeowners to compare flooring colors, textures, finishes, and material options directly before making final decisions.' },
            { question: 'How long does flooring installation take?', answer: 'Project timelines vary depending on the size of the space, flooring material selected, and project complexity. We provide clear timelines before work begins.' },
          ],
        },
        {
          id: 'fl-cta',
          type: 'start-project',
          heading: 'Start Your Flooring Project Today',
          body: 'Visit our Valrico showroom to explore flooring options, compare materials, and speak with our experienced team about your renovation goals.',
          bgImage: '/wood-flooring-750x469.jpg',
          ctaText: 'Visit Our Showroom',
          ctaLink: '/contact',
        },
      ],
      seo: { metaTitle: 'Flooring In Tampa | Flooring Stores Tampa | Cabinets & Remodeling Depot', metaDescription: 'Professional hardwood, laminate, tile, and waterproof flooring installation in Tampa Bay. Visit our Valrico showroom for expert guidance and free estimates.', ogImage: '' },
      schema: '',
    },

    // ── WOOD FLOORING ─────────────────────────────────────────────────────────
    'wood-flooring': {
      sections: [
        {
          id: 'wooden-flooring-hero',
          type: 'hero',
          title: 'Wooden Flooring In Tampa, FL',
          subtitle: 'Most Affordable Wood Installation Around Valrico & Tampa, FL',
          backgroundImage: '/wd1.png',
          ctaText: 'Contact Us',
          ctaLink: '/contact',
        },
        {
          id: 'wooden-flooring-features',
          type: 'features',
          heading: 'Our Wooden Flooring Options',
          subheading: 'Natural beauty and lasting durability for every room',
          items: [
            { title: 'Solid Hardwood', description: 'Classic solid wood flooring in oak, maple, cherry, hickory, and more. Can be sanded and refinished multiple times.', icon: '' },
            { title: 'Engineered Wood', description: 'Real hardwood top layer over a stable plywood core — more resistant to humidity and temperature changes.', icon: '' },
            { title: 'Exotic Hardwoods', description: 'Premium species like Brazilian cherry, teak, and mahogany for a truly distinctive look and exceptional hardness.', icon: '' },
            { title: 'Reclaimed Wood', description: 'Eco-friendly flooring with unique character from repurposed timbers. Each plank tells a story.', icon: '' },
          ],
        },
        {
          id: 'wooden-flooring-gallery',
          type: 'services',
          heading: 'Wood Flooring Gallery',
          items: [
            { title: 'Wooden Flooring Tampa 1', image: '/wd1.png' },
            { title: 'Wooden Flooring Tampa 2', image: '/wd2.png' },
            { title: 'Wooden Flooring Tampa 3', image: '/wd3.png' },
            { title: 'Wooden Flooring Tampa 4', image: '/wd4.png' },
            { title: 'Wooden Flooring Tampa 5', image: '/wd5.png' },
            { title: 'Wooden Flooring Tampa 6', image: '/wd6.png' },
          ],
        },
        {
          id: 'wooden-flooring-faq',
          type: 'faq',
          heading: 'Wooden Flooring FAQs',
          items: [
            { question: "Is hardwood flooring suitable for Florida's humidity?", answer: "Yes — engineered hardwood in particular is well-suited for Florida's climate. Its layered construction resists the expansion and contraction caused by humidity changes better than solid wood." },
            { question: 'How long does wooden flooring installation take?', answer: 'A typical room (300–400 sq ft) takes 1–2 days. Larger projects are quoted individually. We handle all prep, installation, and finishing.' },
            { question: 'Can hardwood flooring be installed over concrete slab?', answer: 'Engineered hardwood can be glued or floated over concrete. Solid hardwood typically requires a plywood subfloor. We assess your specific situation during the free estimate.' },
            { question: 'Do you offer free estimates?', answer: 'Yes! Contact us or visit our Valrico showroom for a free, no-obligation estimate tailored to your project.' },
          ],
        },
        {
          id: 'wooden-flooring-cta',
          type: 'cta',
          heading: 'Ready to Transform Your Floors?',
          subheading: 'Visit our Valrico showroom or contact us for a free estimate on wooden flooring installation.',
          buttonText: 'Contact Us',
          buttonLink: '/contact',
        },
      ],
      seo: { metaTitle: 'Wooden Flooring Tampa Bay | Hardwood Floor Installation | Cabinets & Remodeling Depot', metaDescription: 'Expert hardwood and engineered wooden flooring installation in Tampa Bay. Solid wood, engineered wood, and exotic hardwoods installed by our certified professionals.', ogImage: '' },
      schema: '',
    },

    // ── TILES IN TAMPA ────────────────────────────────────────────────────────
    'tiles-in-tampa': {
      sections: [
        {
          id: 'tiles-hero',
          type: 'hero',
          title: 'Tile Flooring Tampa Bay',
          subtitle: 'Durable, low-maintenance, and endlessly stylish. Our tile flooring solutions include ceramic, porcelain, natural stone, and large-format tiles — expertly installed throughout Tampa Bay.',
          backgroundImage: '',
          ctaText: 'Get Free Estimate',
          ctaLink: '/contact',
        },
        {
          id: 'tiles-features',
          type: 'features',
          heading: 'Our Tile Flooring Options',
          subheading: 'Versatile and durable flooring for kitchens, bathrooms, and beyond',
          items: [
            { title: 'Ceramic Tile', description: 'Affordable and water-resistant, ceramic tile is ideal for kitchens, bathrooms, and laundry rooms. Available in hundreds of colors and patterns.', icon: '' },
            { title: 'Porcelain Tile', description: 'Denser and more durable than ceramic, porcelain handles heavy foot traffic and outdoor applications with ease.', icon: '' },
            { title: 'Large-Format Tile', description: 'Oversized tiles (24"x24" and larger) create a seamless, modern look with fewer grout lines for an open, airy feel.', icon: '' },
            { title: 'Natural Stone', description: 'Marble, travertine, slate, and limestone tiles deliver a luxurious, one-of-a-kind aesthetic to any space.', icon: '' },
          ],
        },
        {
          id: 'tiles-faq',
          type: 'faq',
          heading: 'Tile Flooring FAQs',
          items: [
            { question: 'Is tile flooring good for Florida homes?', answer: "Tile is one of the best flooring choices for Florida — it stays cool underfoot, resists moisture, and is easy to clean. Perfect for Tampa Bay's warm, humid climate." },
            { question: 'How long does tile installation take?', answer: 'Installation time depends on the area size and tile complexity. On average, a standard bathroom takes 2–3 days including curing time. We provide a detailed timeline with every estimate.' },
            { question: 'Can tile be installed over existing flooring?', answer: 'In some cases, yes. We assess the existing subfloor condition to determine if tile can be installed on top or if removal is needed for the best long-term result.' },
            { question: 'Do you offer grout color options?', answer: 'Absolutely. We carry a wide range of grout colors to complement your tile choice. Our team can help you select the perfect pairing during the consultation.' },
          ],
        },
        {
          id: 'tiles-cta',
          type: 'cta',
          heading: 'Ready for Beautiful Tile Floors?',
          subheading: 'Visit our Valrico showroom or contact us for a free estimate on tile installation.',
          buttonText: 'Get Free Estimate',
          buttonLink: '/contact',
        },
      ],
      seo: { metaTitle: 'Tile Flooring Tampa Bay | Ceramic & Porcelain Tile Installation | Cabinets & Remodeling Depot', metaDescription: 'Premium ceramic and porcelain tile flooring installation in Tampa Bay. Kitchen tiles, bathroom tiles, large-format tiles, and more.', ogImage: '' },
      schema: '',
    },

    // ── LAMINATE FLOORING IN TAMPA ────────────────────────────────────────────
    'laminate-flooring-in-tampa': {
      sections: [
        {
          id: 'laminate-flooring-hero',
          type: 'hero',
          title: 'Laminate Flooring Tampa Bay',
          subtitle: 'Get the look of hardwood or stone at a fraction of the cost. Our laminate flooring options are durable, easy to maintain, and available in a wide variety of styles for Tampa Bay homes.',
          backgroundImage: '/L1-.jpeg',
          ctaText: 'Get Free Estimate',
          ctaLink: '/contact',
        },
        {
          id: 'laminate-flooring-gallery',
          type: 'services',
          heading: 'Laminate Flooring Gallery',
          items: [
            { title: 'Laminate Flooring Tampa 1', image: '/L1-.jpeg' },
            { title: 'Laminate Flooring Tampa 2', image: '/L2-.jpeg' },
            { title: 'Laminate Flooring Tampa 3', image: '/L3-.jpeg' },
            { title: 'Laminate Flooring Tampa 4', image: '/L4-.jpeg' },
            { title: 'Laminate Flooring Tampa 5', image: '/L5-.jpeg' },
            { title: 'Laminate Flooring Tampa 6', image: '/L6-.jpeg' },
          ],
        },
        {
          id: 'laminate-flooring-features',
          type: 'features',
          heading: 'Why Choose Laminate Flooring?',
          subheading: 'The smart, budget-friendly flooring solution for modern homes',
          items: [
            { title: 'Affordable Style', description: 'Achieve the look of real hardwood or stone without the premium price tag. Laminate offers exceptional value for any budget.', icon: '' },
            { title: 'Durable & Scratch-Resistant', description: 'High-quality laminate resists scratches, dents, and stains — ideal for high-traffic areas and homes with pets or children.', icon: '' },
            { title: 'Easy Maintenance', description: 'A simple sweep and occasional damp mop keeps laminate floors looking great. No special cleaners or refinishing required.', icon: '' },
            { title: 'Wide Style Range', description: 'From light oak to dark walnut, rustic to modern — our laminate collection covers every aesthetic. Visit our showroom to see the full range.', icon: '' },
          ],
        },
        {
          id: 'laminate-flooring-faq',
          type: 'faq',
          heading: 'Laminate Flooring FAQs',
          items: [
            { question: 'Is laminate flooring waterproof?', answer: 'Many modern laminate floors are water-resistant, but not fully waterproof. For areas prone to moisture like bathrooms, we recommend waterproof laminate or LVP. We can advise on the best option for your needs.' },
            { question: 'How long does laminate flooring last?', answer: 'With proper care, quality laminate flooring typically lasts 15–25 years. The wear layer thickness (AC rating) determines durability — we carry AC3 through AC5 options.' },
            { question: 'Can laminate be installed over existing flooring?', answer: 'In many cases, yes. Laminate can float over existing vinyl, tile, or hardwood as long as the subfloor is level and in good condition. We assess this during the free estimate.' },
            { question: 'How is laminate different from LVP?', answer: 'Laminate has a wood-fiber core with a photographic image layer, while LVP (luxury vinyl plank) is made entirely of PVC and is fully waterproof. Both are excellent options — we can help you decide which is right for your project.' },
          ],
        },
        {
          id: 'laminate-flooring-cta',
          type: 'cta',
          heading: 'Love the Look of Laminate?',
          subheading: 'Visit our Valrico showroom or contact us for a free estimate on laminate flooring installation.',
          buttonText: 'Get Free Estimate',
          buttonLink: '/contact',
        },
      ],
      seo: { metaTitle: 'Laminate Flooring Tampa Bay | Affordable & Durable | Cabinets & Remodeling Depot', metaDescription: 'High-quality laminate flooring installation in Tampa Bay. Durable, beautiful, and budget-friendly laminate options for every room.', ogImage: '' },
      schema: '',
    },

    // ── SHOWROOM GALLERY ──────────────────────────────────────────────────────
    'showroom-gallery': {
      sections: [
        {
          id: 'gal-hero',
          type: 'hero',
          title: 'Our Stunning Showroom Gallery',
          subtitle: 'Tour of Our Showroom — Tampa, Florida',
          backgroundImage: '/Cabinet-Slide-650x350-1.jpg',
          ctaText: 'Visit Our Showroom',
          ctaLink: '/contact',
        },
      ],
      seo: {
        metaTitle: 'Project Gallery | Cabinets & Remodeling Depot',
        metaDescription: 'Browse our gallery of kitchen and bathroom remodeling projects, custom cabinets, countertops, and flooring installations throughout Tampa Bay.',
        ogImage: '',
      },
      schema: '',
    },

    // ── CONTACT ───────────────────────────────────────────────────────────────
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
          body: 'Call us at +1 813-651-2333, email sales@cabinetsandremodelingdepot.com, or visit our Valrico showroom. We are open Monday–Friday 10 AM–6 PM and Saturday 10 AM–4 PM.',
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

    // ── PRIVACY POLICY ────────────────────────────────────────────────────────
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

    // ── TERMS ─────────────────────────────────────────────────────────────────
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
