/**
 * MongoDB seed script for Cabinets & Remodeling Depot.
 *
 * Can be used two ways:
 *  1. Auto-seed on server start (called from index.js on fresh DB)
 *  2. Manual run: node src/seed.js
 */

import 'dotenv/config'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import { hashPassword } from './services/auth.service.js'
import { getDefaultContent } from './services/pages.service.js'

// Import all models (registers schemas with mongoose)
import User from './models/User.js'
import Page from './models/Page.js'
import Blog from './models/Blog.js'
import BlogCategory from './models/BlogCategory.js'
import Setting from './models/Setting.js'
import Gallery from './models/Gallery.js'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cabinets-depot'

const PAGE_SLUGS = [
  { slug: 'home', title: 'Home' },
  { slug: 'about', title: 'About Us' },
  { slug: 'services', title: 'Our Services' },
  { slug: 'kitchen-remodeling', title: 'Kitchen Remodeling' },
  { slug: 'bathroom-remodeling', title: 'Bathroom Remodeling' },
  { slug: 'cabinets', title: 'Custom Cabinets' },
  { slug: 'countertops', title: 'Countertops' },
  { slug: 'flooring', title: 'Flooring' },
  { slug: 'wood-flooring', title: 'Wooden Flooring' },
  { slug: 'tiles-in-tampa', title: 'Tiles' },
  { slug: 'laminate-flooring-in-tampa', title: 'Laminate Flooring' },
  { slug: 'contact', title: 'Contact Us' },
  { slug: 'privacy-policy', title: 'Privacy Policy' },
  { slug: 'terms', title: 'Terms of Service' },
]

const BLOG_CATEGORIES = [
  { name: 'Remodeling Tips', slug: 'remodeling-tips' },
  { name: 'Design Ideas', slug: 'design-ideas' },
  { name: 'Cabinet Care', slug: 'cabinet-care' },
  { name: 'Before & After', slug: 'before-and-after' },
]

const DEFAULT_SETTINGS = [
  { key: 'companyName', value: 'Cabinets & Remodeling Depot', label: 'Company Name', group: 'general' },
  { key: 'phone', value: '(813) 555-0100', label: 'Phone Number', group: 'contact' },
  { key: 'email', value: 'info@cabinetsremodelingdepot.com', label: 'Email Address', group: 'contact' },
  { key: 'address', value: '123 Main Street, Valrico, FL 33594', label: 'Business Address', group: 'contact' },
  { key: 'businessHours', value: 'Mon–Fri: 8am–6pm | Sat: 9am–4pm | Sun: Closed', label: 'Business Hours', group: 'general' },
  { key: 'facebookUrl', value: 'https://facebook.com', label: 'Facebook URL', group: 'social' },
  { key: 'instagramUrl', value: 'https://instagram.com', label: 'Instagram URL', group: 'social' },
  { key: 'googleReviewUrl', value: '', label: 'Google Review URL', group: 'social' },
  { key: 'metaTitle', value: 'Cabinets & Remodeling Depot | Tampa Bay Kitchen & Bathroom Remodeling', label: 'Default Meta Title', group: 'seo' },
  { key: 'metaDescription', value: 'Expert kitchen remodeling, bathroom renovations, custom cabinets, and countertops in Tampa Bay. Get your free estimate today.', label: 'Default Meta Description', group: 'seo' },
]

// Curated gallery images from the public/ directory.
// publicId uses a "local/" prefix as a placeholder (not a real Cloudinary asset).
// url values are served by Next.js from the frontend/public/ folder.
const GALLERY_IMAGES = [
  // ── KITCHEN ──────────────────────────────────────────────────────────────
  { url: '/kitchen-remodel.webp',               publicId: 'local/kitchen-remodel',               alt: 'Kitchen remodel Tampa',          category: 'KITCHEN',     sortOrder: 0 },
  { url: '/kitchen-remodel-2.webp',             publicId: 'local/kitchen-remodel-2',             alt: 'Modern kitchen remodel',         category: 'KITCHEN',     sortOrder: 1 },
  { url: '/kitchen_cabinet_remodeling-01.webp', publicId: 'local/kitchen_cabinet_remodeling-01', alt: 'Kitchen cabinet remodeling',     category: 'KITCHEN',     sortOrder: 2 },
  { url: '/kitchen_cabinet_4.jpg',              publicId: 'local/kitchen_cabinet_4',              alt: 'Custom kitchen cabinets',        category: 'KITCHEN',     sortOrder: 3 },
  { url: '/kitchen-cabinet-2.jpg',              publicId: 'local/kitchen-cabinet-2',              alt: 'Kitchen cabinet installation',   category: 'KITCHEN',     sortOrder: 4 },
  { url: '/beautiful-shot-modern-house-kitchen.jpg', publicId: 'local/beautiful-shot-modern-house-kitchen', alt: 'Modern house kitchen', category: 'KITCHEN',   sortOrder: 5 },

  // ── CABINETS ─────────────────────────────────────────────────────────────
  { url: '/cabinet_img.webp',      publicId: 'local/cabinet_img',      alt: 'Custom cabinets',           category: 'CABINETS',    sortOrder: 0 },
  { url: '/cabinet-glass.jpg',     publicId: 'local/cabinet-glass',     alt: 'Glass front cabinets',      category: 'CABINETS',    sortOrder: 1 },
  { url: '/cabinet-shaker.jpg',    publicId: 'local/cabinet-shaker',    alt: 'Shaker style cabinets',     category: 'CABINETS',    sortOrder: 2 },
  { url: '/cabinet-raised.webp',   publicId: 'local/cabinet-raised',    alt: 'Raised panel cabinets',     category: 'CABINETS',    sortOrder: 3 },
  { url: '/glass-front-1.webp',    publicId: 'local/glass-front-1',     alt: 'Glass front cabinet doors', category: 'CABINETS',    sortOrder: 4 },
  { url: '/shaker-cabinets-1.webp', publicId: 'local/shaker-cabinets-1', alt: 'Shaker cabinets Tampa',   category: 'CABINETS',    sortOrder: 5 },

  // ── BATHROOM ─────────────────────────────────────────────────────────────
  { url: '/bathroom-remodeling-hero.jpg',      publicId: 'local/bathroom-remodeling-hero',      alt: 'Bathroom remodeling Tampa',  category: 'BATHROOM',    sortOrder: 0 },
  { url: '/bathroom-remodel-1.jpg',            publicId: 'local/bathroom-remodel-1',            alt: 'Bathroom remodel project',   category: 'BATHROOM',    sortOrder: 1 },
  { url: '/bathroom-remodel-2.jpg',            publicId: 'local/bathroom-remodel-2',            alt: 'Bathroom renovation',        category: 'BATHROOM',    sortOrder: 2 },
  { url: '/bathroom-remodel-3.jpg',            publicId: 'local/bathroom-remodel-3',            alt: 'Custom bathroom remodel',    category: 'BATHROOM',    sortOrder: 3 },
  { url: '/bathroom-remodeling-design.webp',   publicId: 'local/bathroom-remodeling-design',    alt: 'Bathroom design',            category: 'BATHROOM',    sortOrder: 4 },
  { url: '/custom-bathroom-vanity.jpg',        publicId: 'local/custom-bathroom-vanity',        alt: 'Custom bathroom vanity',     category: 'BATHROOM',    sortOrder: 5 },

  // ── COUNTERTOPS ──────────────────────────────────────────────────────────
  { url: '/quartz.webp',             publicId: 'local/quartz',             alt: 'Quartz countertops',         category: 'COUNTERTOPS', sortOrder: 0 },
  { url: '/Granitecountertops.jpg',  publicId: 'local/Granitecountertops', alt: 'Granite countertops Tampa',  category: 'COUNTERTOPS', sortOrder: 1 },
  { url: '/marble.webp',             publicId: 'local/marble',             alt: 'Marble countertops',         category: 'COUNTERTOPS', sortOrder: 2 },
  { url: '/quartzite.webp',          publicId: 'local/quartzite',          alt: 'Quartzite countertops',      category: 'COUNTERTOPS', sortOrder: 3 },
  { url: '/porcelain.webp',          publicId: 'local/porcelain',          alt: 'Porcelain countertops',      category: 'COUNTERTOPS', sortOrder: 4 },
  { url: '/countertops_2.jpg',       publicId: 'local/countertops_2',      alt: 'Kitchen countertops',        category: 'COUNTERTOPS', sortOrder: 5 },

  // ── FLOORING ─────────────────────────────────────────────────────────────
  { url: '/flooring-hero.webp',               publicId: 'local/flooring-hero',               alt: 'Flooring Tampa',       category: 'FLOORING',    sortOrder: 0 },
  { url: '/flooring-tampa.jpg',               publicId: 'local/flooring-tampa',               alt: 'Flooring in Tampa',    category: 'FLOORING',    sortOrder: 2 },
  { url: '/tile-flooring.jpeg',               publicId: 'local/tile-flooring',               alt: 'Tile flooring',        category: 'FLOORING',    sortOrder: 3 },
  { url: '/Flooring-samples.jpg',             publicId: 'local/Flooring-samples',             alt: 'Flooring samples',     category: 'FLOORING',    sortOrder: 4 },

  // ── GENERAL ──────────────────────────────────────────────────────────────
  { url: '/Custom-Cabinets-and-Countertops-for-Tampa-2.jpg', publicId: 'local/Custom-Cabinets-and-Countertops-for-Tampa-2', alt: 'Custom cabinets and countertops Tampa', category: 'GENERAL', sortOrder: 0 },
  { url: '/Modern-kitchen-renovation-Tampa-completed-project.jpg', publicId: 'local/Modern-kitchen-renovation-Tampa-completed-project', alt: 'Modern kitchen renovation Tampa', category: 'GENERAL', sortOrder: 1 },
  { url: '/instock-cabinets-hero.webp', publicId: 'local/instock-cabinets-hero', alt: 'In-stock cabinets showroom', category: 'GENERAL', sortOrder: 2 },
  { url: '/Kitchen-Cabinet-Showroom-Tampa.jpg', publicId: 'local/Kitchen-Cabinet-Showroom-Tampa', alt: 'Kitchen cabinet showroom Tampa', category: 'GENERAL', sortOrder: 3 },

  // ── KITCHEN (additional) ──────────────────────────────────────────────────
  { url: '/kitchen_cabinet_5.jpg',          publicId: 'local/kitchen_cabinet_5',          alt: 'Kitchen cabinets design',              category: 'KITCHEN',     sortOrder: 6 },
  { url: '/kitchen-cabinet-3.jpg',          publicId: 'local/kitchen-cabinet-3',          alt: 'Kitchen cabinet detail',               category: 'KITCHEN',     sortOrder: 7 },
  { url: '/kitchen-cabinet-ins.jpg',        publicId: 'local/kitchen-cabinet-ins',        alt: 'Kitchen cabinet installation Tampa',   category: 'KITCHEN',     sortOrder: 8 },
  { url: '/kitchencabinet3.jpg',            publicId: 'local/kitchencabinet3',            alt: 'Kitchen cabinets remodel',             category: 'KITCHEN',     sortOrder: 9 },
  { url: '/kitchen-remodeling-hero.webp',   publicId: 'local/kitchen-remodeling-hero',   alt: 'Kitchen remodeling Tampa',             category: 'KITCHEN',     sortOrder: 10 },

  // ── CABINETS (additional) ─────────────────────────────────────────────────
  { url: '/cabinet-slab.jpg',              publicId: 'local/cabinet-slab',              alt: 'Slab cabinet doors',               category: 'CABINETS',    sortOrder: 6 },
  { url: '/cabinet-slab1.webp',            publicId: 'local/cabinet-slab1',            alt: 'Slab style cabinets',              category: 'CABINETS',    sortOrder: 7 },
  { url: '/cabinet-slab2.webp',            publicId: 'local/cabinet-slab2',            alt: 'Modern slab cabinets',             category: 'CABINETS',    sortOrder: 8 },
  { url: '/glass-front-2.webp',            publicId: 'local/glass-front-2',            alt: 'Glass front cabinets style 2',     category: 'CABINETS',    sortOrder: 9 },
  { url: '/glass-front-3.webp',            publicId: 'local/glass-front-3',            alt: 'Glass front cabinet doors',        category: 'CABINETS',    sortOrder: 10 },
  { url: '/shaker-cabinets-2.webp',        publicId: 'local/shaker-cabinets-2',        alt: 'Shaker cabinets style',            category: 'CABINETS',    sortOrder: 11 },
  { url: '/raised-panel-1.webp',           publicId: 'local/raised-panel-1',           alt: 'Raised panel cabinet doors',       category: 'CABINETS',    sortOrder: 12 },
  { url: '/raised-panel-2.webp',           publicId: 'local/raised-panel-2',           alt: 'Raised panel cabinets',            category: 'CABINETS',    sortOrder: 13 },

  // ── BATHROOM (additional) ─────────────────────────────────────────────────
  { url: '/bathroom-remodel-4.jpg',        publicId: 'local/bathroom-remodel-4',        alt: 'Bathroom remodel project 4',   category: 'BATHROOM',    sortOrder: 6 },
  { url: '/bathroom-remodel-5.jpg',        publicId: 'local/bathroom-remodel-5',        alt: 'Bathroom renovation project',  category: 'BATHROOM',    sortOrder: 7 },
  { url: '/bathroom-remodel-6.jpg',        publicId: 'local/bathroom-remodel-6',        alt: 'Complete bathroom remodel',    category: 'BATHROOM',    sortOrder: 8 },
  { url: '/bathroom-02.webp',              publicId: 'local/bathroom-02',              alt: 'Modern bathroom design',       category: 'BATHROOM',    sortOrder: 9 },
  { url: '/bathroom-designing.webp',       publicId: 'local/bathroom-designing',       alt: 'Bathroom designing Tampa',     category: 'BATHROOM',    sortOrder: 10 },
  { url: '/custom-bathroom-vanities.jpeg', publicId: 'local/custom-bathroom-vanities', alt: 'Custom bathroom vanities',     category: 'BATHROOM',    sortOrder: 11 },
  { url: '/shower-upgrade.jpg',            publicId: 'local/shower-upgrade',            alt: 'Shower upgrade Tampa',         category: 'BATHROOM',    sortOrder: 12 },

  // ── COUNTERTOPS (additional) ──────────────────────────────────────────────
  { url: '/Granitecountertops2.jpg',   publicId: 'local/Granitecountertops2',   alt: 'Granite countertops design',         category: 'COUNTERTOPS', sortOrder: 6 },
  { url: '/Granitecountertops3.jpg',   publicId: 'local/Granitecountertops3',   alt: 'Granite countertop installation',    category: 'COUNTERTOPS', sortOrder: 7 },
  { url: '/marblecountertops.jpg',     publicId: 'local/marblecountertops',     alt: 'Marble countertop installation',     category: 'COUNTERTOPS', sortOrder: 8 },
  { url: '/quartzcountertops.jpg',     publicId: 'local/quartzcountertops',     alt: 'Quartz countertop design',           category: 'COUNTERTOPS', sortOrder: 9 },
  { url: '/porcelaincountertops.jpg',  publicId: 'local/porcelaincountertops',  alt: 'Porcelain countertop installation',  category: 'COUNTERTOPS', sortOrder: 10 },
  { url: '/countertops_3.jpg',         publicId: 'local/countertops_3',         alt: 'Countertop remodeling Tampa',        category: 'COUNTERTOPS', sortOrder: 11 },

  // ── FLOORING (additional) ─────────────────────────────────────────────────
  { url: '/flooring-2.jpg',       publicId: 'local/flooring-2',       alt: 'Home flooring options',       category: 'FLOORING',    sortOrder: 6 },
  { url: '/flooring-in-tampa.jpg', publicId: 'local/flooring-in-tampa', alt: 'Flooring in Tampa',         category: 'FLOORING',    sortOrder: 7 },
  { url: '/L1-.jpeg',             publicId: 'local/L1-',             alt: 'Laminate flooring Tampa',     category: 'FLOORING',    sortOrder: 8 },

  // ── GENERAL (additional) ──────────────────────────────────────────────────
  { url: '/cabinet-contact.webp',  publicId: 'local/cabinet-contact',  alt: 'Cabinet remodeling consultation', category: 'GENERAL', sortOrder: 5 },
  { url: '/storage-solution.webp', publicId: 'local/storage-solution', alt: 'Custom storage solutions',        category: 'GENERAL', sortOrder: 6 },
]

const BLOG_POSTS = [
  {
    slug: '6-advantages-of-custom-made-kitchen-cabinets',
    title: '6 Advantages of Custom Made Kitchen Cabinets',
    excerpt:
      'Custom made kitchen cabinets offer longer shelf life, enhanced personalization, eco-friendly options, and much more. Discover the six key advantages that make them worth the investment for your Tampa, FL kitchen remodeling project.',
    body: `<p>Certain benefits of custom made kitchen cabinets include longer shelf life, enhanced personalization and much more. No doubt these cabinets cost more than stock kitchen cabinets or semi-custom cabinets. However, in certain cases, they are worth it. The main point is to see if you are prepared to pay extra for the customized cabinets meeting your specific requirements or not. It is usually suggested to have a mixture of custom and stock cabinets to save money. It will save you money.</p>

<p>Some of the advantages of custom made kitchen cabinets in the kitchen remodeling in Tampa, FL are as follows:</p>

<h2>1. Personalized Cabinets Complementing Any Style, Size or Shape of the Kitchen</h2>

<p>Custom cabinets are highly sorted. It is because these are built in order to fit in the design preference, lifestyle, cooking habits, different shapes of the kitchen, and storage indications. If we talk about stock cabinets; they are usually made for average people, and works for some but not for everyone. Custom made kitchen cabinets will enable you to enjoy innovative storage capacities.</p>

<h2>2. Custom Made Kitchen Cabinets Fit Any Kitchen</h2>

<p>It does not matter if your kitchen is small, medium or large; a custom made kitchen cabinets meet requirements of odd-shaped kitchens as well. If you think of buying stock cabinets they may not fit properly. However, this is not the case with the cabinets which have been built to meet specific measurements of your kitchen.</p>

<h2>3. You Pick the Material Yourself</h2>

<p>Custom made kitchen cabinets is customizable in several manners. This includes the type of material that is used to craft these cabinets. It completely depends on you to decide what style, type and finishing you want to have. You have the liberty to have the best-matched hardware. Options are very limited when it is about semi-custom or stock cabinets.</p>

<h2>4. You Gain Enhanced Storage Space</h2>

<p>Usually, stock cabinets have certain sizes that fit an average kitchen. This causes lesser storage space. With custom made kitchen cabinets you can have the desired size of the cabinet. Little cabinets or extra taller ones; you will have as much storage space as you will need.</p>

<h2>5. High-Quality Craftsmanship</h2>

<p>It is usually said that custom made kitchen cabinets last longer. It is because they have been built in an appropriate manner. Stock cabinets are made in bulk while customized cabinets are made specifically for you i.e. one at a time. These are made with dowels, intricate joints, and mortise-and-tenons. Each piece is joined together to come up with exclusive and attractive custom cabinets. On the other hand, stock cabinets are made with inexpensive nails and glue. No doubt you will have to pay higher for this kind of craftsmanship however, it will pay in the long run in form of longer-lasting kitchen cabinets and enhanced kitchen value.</p>

<h2>6. Eco-Friendly</h2>

<p>When we buy stock cabinets, we don't know what materials have been used to build them. On the other hand, when we order these custom made kitchen cabinets we can pick the recycled or eco-friendly material. These cabinets amuse you with choice of domestic or local hardwoods reducing the environmental impact.</p>`,
    coverImage: '/contact-no-1 (1).jpg',
    authorName: 'Cabinet and Remodeling Depot',
    isPublished: true,
    publishedAt: new Date('2021-03-15'),
    readTime: 3,
    metaTitle: '6 Advantages of Custom Made Kitchen Cabinets | Cabinet and Remodeling Depot',
    metaDescription:
      'Discover the six advantages of custom made kitchen cabinets — from personalized fit and material choice to eco-friendly options and high-quality craftsmanship.',
    categorySlug: 'remodeling-tips',
  },
]

// ─── Core seed logic (uses existing mongoose connection) ─────────────────────
export async function runSeed() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@cabinetsremodelingdepot.com'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeImmediately!'
  const hashedPassword = await hashPassword(adminPassword)

  // ─── Admin User ───────────────────────────────────────────────────────────
  await User.findOneAndUpdate(
    { email: adminEmail },
    {
      $setOnInsert: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin',
        role: 'SUPER_ADMIN',
        isActive: true,
      },
    },
    { upsert: true, new: true }
  )
  console.log(`✓ Admin user: ${adminEmail}`)

  // ─── Pages ────────────────────────────────────────────────────────────────
  for (const { slug, title } of PAGE_SLUGS) {
    await Page.findOneAndUpdate(
      { slug },
      {
        $setOnInsert: {
          slug,
          title,
          isActive: true,
          content: getDefaultContent(slug),
        },
      },
      { upsert: true, new: true }
    )
  }
  console.log(`✓ ${PAGE_SLUGS.length} pages seeded`)

  // ─── Blog Categories ──────────────────────────────────────────────────────
  for (const cat of BLOG_CATEGORIES) {
    await BlogCategory.findOneAndUpdate(
      { slug: cat.slug },
      { $setOnInsert: cat },
      { upsert: true, new: true }
    )
  }
  console.log(`✓ ${BLOG_CATEGORIES.length} blog categories seeded`)

  // ─── Blog Posts ───────────────────────────────────────────────────────────
  for (const post of BLOG_POSTS) {
    const { categorySlug, ...postData } = post
    const category = await BlogCategory.findOne({ slug: categorySlug })
    await Blog.findOneAndUpdate(
      { slug: postData.slug },
      {
        $setOnInsert: {
          ...postData,
          category: category?._id || null,
        },
      },
      { upsert: true, new: true }
    )
  }
  console.log(`✓ ${BLOG_POSTS.length} blog posts seeded`)

  // ─── Settings ─────────────────────────────────────────────────────────────
  for (const setting of DEFAULT_SETTINGS) {
    await Setting.findOneAndUpdate(
      { key: setting.key },
      { $setOnInsert: setting },
      { upsert: true, new: true }
    )
  }
  console.log(`✓ ${DEFAULT_SETTINGS.length} settings seeded`)

  // ─── Gallery ──────────────────────────────────────────────────────────────
  await seedGallery()

  return { adminEmail, adminPassword }
}

// ─── Gallery-only seed: always runs on startup to insert any new images ───────
// Safe to run repeatedly — upsert by url means no duplicates ever.
async function seedGallery() {
  let galleryInserted = 0
  for (const item of GALLERY_IMAGES) {
    const result = await Gallery.findOneAndUpdate(
      { url: item.url },
      { $setOnInsert: { ...item, isActive: true } },
      { upsert: true, new: false }
    )
    if (!result) galleryInserted++
  }
  if (galleryInserted > 0) {
    console.log(`✓ ${galleryInserted} new gallery images inserted`)
  }
}

// ─── Auto-seed: called by the server on startup ───────────────────────────────
// Checks each collection independently so existing DBs get missing blog
// posts / categories on restart without re-creating the admin user.
export async function autoSeed() {
  const [userCount, categoryCount, blogCount] = await Promise.all([
    User.countDocuments(),
    BlogCategory.countDocuments(),
    Blog.countDocuments(),
  ])

  // Run full seed for missing core data
  if (userCount === 0 || categoryCount === 0 || blogCount === 0) {
    console.log('🌱 Missing data detected — running automatic seed...')
    const { adminEmail, adminPassword } = await runSeed()
    console.log('✅ Auto-seed completed!')
    if (userCount === 0) {
      console.log(`   Admin email:    ${adminEmail}`)
      console.log(`   Admin password: ${adminPassword}`)
      console.log('   ⚠️  Change the admin password immediately after first login!')
    }
    console.log()
  } else {
    // Core data exists — still ensure gallery images are up to date
    await seedGallery()
  }
}

// ─── Standalone runner: node src/seed.js ─────────────────────────────────────
const isMain = process.argv[1] === fileURLToPath(import.meta.url)
if (isMain) {
  ;(async () => {
    console.log('🌱 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
    console.log('✓ Connected')

    const { adminEmail, adminPassword } = await runSeed()

    await mongoose.disconnect()
    console.log('\n✅ Seed completed successfully!')
    console.log(`   Admin email:    ${adminEmail}`)
    console.log(`   Admin password: ${adminPassword}`)
    console.log('   ⚠️  Change the admin password immediately after first login!')
    process.exit(0)
  })().catch((err) => {
    console.error('❌ Seed failed:', err)
    process.exit(1)
  })
}
