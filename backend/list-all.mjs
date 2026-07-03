import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

const GallerySchema = new mongoose.Schema({
  url: String, publicId: String, alt: String, category: String,
  sortOrder: Number, isActive: Boolean,
}, { timestamps: true });
const Gallery = mongoose.model('Gallery', GallerySchema);

await mongoose.connect(MONGO_URI);
console.log('Connected\n');

const all = await Gallery.find({}).sort({ category: 1, sortOrder: 1, createdAt: 1 }).lean();
console.log('Total:', all.length, '\n');

const byCategory = {};
all.forEach(img => {
  const cat = img.category || 'UNCATEGORIZED';
  if (!byCategory[cat]) byCategory[cat] = [];
  byCategory[cat].push(img);
});

for (const [cat, imgs] of Object.entries(byCategory)) {
  console.log(`\n=== ${cat} (${imgs.length}) ===`);
  imgs.forEach((img, i) => console.log(`  [${i+1}] [${img.isActive ? 'ON ' : 'OFF'}] ${img._id} | ${img.url}`));
}

await mongoose.disconnect();
