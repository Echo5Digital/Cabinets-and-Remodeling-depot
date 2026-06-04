'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const CATEGORY_LABELS = {
  KITCHEN: 'Kitchen',
  BATHROOM: 'Bathroom',
  CABINETS: 'Cabinets',
  COUNTERTOPS: 'Countertops',
  FLOORING: 'Flooring',
  GENERAL: 'General',
}

function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close */}
        <button
          className="absolute top-4 right-4 text-white hover:text-white/70 transition-colors z-10"
          onClick={onClose}
        >
          <X className="h-8 w-8" />
        </button>

        {/* Prev */}
        {currentIndex > 0 && (
          <button
            className="absolute left-4 text-white hover:text-white/70 transition-colors z-10 bg-black/30 rounded-full p-2"
            onClick={(e) => { e.stopPropagation(); onPrev() }}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}

        {/* Next */}
        {currentIndex < images.length - 1 && (
          <button
            className="absolute right-4 text-white hover:text-white/70 transition-colors z-10 bg-black/30 rounded-full p-2"
            onClick={(e) => { e.stopPropagation(); onNext() }}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-h-[85vh] max-w-[90vw] aspect-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={images[currentIndex].url}
            alt={images[currentIndex].alt || 'Gallery image'}
            width={1200}
            height={800}
            className="object-contain max-h-[85vh] max-w-[90vw] rounded-lg"
            style={{ width: 'auto', height: 'auto' }}
          />
          {images[currentIndex].caption && (
            <p className="text-center text-white/80 text-sm mt-3">
              {images[currentIndex].caption}
            </p>
          )}
        </motion.div>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export function GalleryGrid({ images = [], showFilter = true }) {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const categories = ['ALL', ...Object.keys(CATEGORY_LABELS).filter((cat) =>
    images.some((img) => img.category === cat)
  )]

  const filtered = activeCategory === 'ALL'
    ? images
    : images.filter((img) => img.category === activeCategory)

  const handleKeyDown = (e) => {
    if (lightboxIndex === null) return
    if (e.key === 'ArrowLeft' && lightboxIndex > 0) setLightboxIndex((i) => i - 1)
    if (e.key === 'ArrowRight' && lightboxIndex < filtered.length - 1) setLightboxIndex((i) => i + 1)
    if (e.key === 'Escape') setLightboxIndex(null)
  }

  if (!images.length) return null

  return (
    <div ref={ref} onKeyDown={handleKeyDown} tabIndex={-1}>
      {/* Category filter */}
      {showFilter && categories.length > 2 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'ALL' ? 'All' : CATEGORY_LABELS[cat]}
            </Button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {filtered.map((image, index) => (
          <motion.div
            key={image.id || index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: Math.min(index * 0.05, 0.5), duration: 0.4 }}
            className="relative group cursor-pointer break-inside-avoid rounded-lg overflow-hidden bg-primary/10"
            onClick={() => setLightboxIndex(index)}
          >
            <Image
              src={image.url}
              alt={image.alt || 'Gallery image'}
              width={400}
              height={300}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => Math.max(0, i - 1))}
          onNext={() => setLightboxIndex((i) => Math.min(filtered.length - 1, i + 1))}
        />
      )}
    </div>
  )
}
