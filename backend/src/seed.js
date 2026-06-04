/**
 * MongoDB seed script for Cabinets & Remodeling Depot.
 * Run: node src/seed.js
 *
 * Creates:
 *  - Admin user
 *  - All pages with default content
 *  - Blog categories
 *  - Default settings
 */

import 'dotenv/config'
import mongoose from 'mongoose'
import { hashPassword } from './services/auth.service.js'
import { getDefaultContent } from './services/pages.service.js'

// Import all models (registers schemas with mongoose)
import User from './models/User.js'
import Page from './models/Page.js'
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

async function seed() {
  console.log('🌱 Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
  console.log('✓ Connected')

  // ─── Admin User ─────────────────────────────────────────────────────────────
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@cabinetsremodelingdepot.com'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeImmediately!'
  const hashedPassword = await hashPassword(adminPassword)

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

  // ─── Pages ──────────────────────────────────────────────────────────────────
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

  // ─── Blog Categories ─────────────────────────────────────────────────────────
  for (const cat of BLOG_CATEGORIES) {
    await BlogCategory.findOneAndUpdate(
      { slug: cat.slug },
      { $setOnInsert: cat },
      { upsert: true, new: true }
    )
  }
  console.log(`✓ ${BLOG_CATEGORIES.length} blog categories seeded`)

  // ─── Settings ────────────────────────────────────────────────────────────────
  for (const setting of DEFAULT_SETTINGS) {
    await Setting.findOneAndUpdate(
      { key: setting.key },
      { $setOnInsert: setting },
      { upsert: true, new: true }
    )
  }
  console.log(`✓ ${DEFAULT_SETTINGS.length} settings seeded`)

  await mongoose.disconnect()
  console.log('\n✅ Seed completed successfully!')
  console.log(`   Admin email:    ${adminEmail}`)
  console.log(`   Admin password: ${adminPassword}`)
  console.log('   ⚠️  Change the admin password immediately after first login!')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
