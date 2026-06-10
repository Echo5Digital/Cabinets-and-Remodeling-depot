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

  return { adminEmail, adminPassword }
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

  // Everything already exists — nothing to do
  if (userCount > 0 && categoryCount > 0 && blogCount > 0) return

  console.log('🌱 Missing data detected — running automatic seed...')
  const { adminEmail, adminPassword } = await runSeed()
  console.log('✅ Auto-seed completed!')
  if (userCount === 0) {
    console.log(`   Admin email:    ${adminEmail}`)
    console.log(`   Admin password: ${adminPassword}`)
    console.log('   ⚠️  Change the admin password immediately after first login!')
  }
  console.log()
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
