'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { X, ChevronLeft, ChevronRight, ZoomIn, LayoutGrid, ChefHat, Droplets, Box, Layers, Grip, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const INITIAL_COUNT = 12

const CATEGORY_LABELS = {
  KITCHEN: 'Kitchen',
  BATHROOM: 'Bathroom',
  CABINETS: 'Cabinets',
  COUNTERTOPS: 'Countertops',
  FLOORING: 'Flooring',
  GENERAL: 'General',
}

const CATEGORY_ICONS = {
  ALL:        LayoutGrid,
  KITCHEN:    ChefHat,
  BATHROOM:   Droplets,
  CABINETS:   Box,
  COUNTERTOPS: Layers,
  FLOORING:   Grip,
  GENERAL:    ImageIcon,
}

// Alternate card heights to create a masonry-like rhythm
// Pattern repeats every 3 cards per column: tall, short, tall, short...
const HEIGHTS = ['h-64', 'h-44', 'h-56', 'h-48', 'h-72', 'h-40']

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
        <button
          className="absolute top-4 right-4 text-white hover:text-white/70 transition-colors z-10"
          onClick={onClose}
        >
          <X className="h-8 w-8" />
        </button>
        {currentIndex > 0 && (
          <button
            className="absolute left-4 text-white hover:text-white/70 transition-colors z-10 bg-black/30 rounded-full p-2"
            onClick={(e) => { e.stopPropagation(); onPrev() }}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}
        {currentIndex < images.length - 1 && (
          <button
            className="absolute right-4 text-white hover:text-white/70 transition-colors z-10 bg-black/30 rounded-full p-2"
            onClick={(e) => { e.stopPropagation(); onNext() }}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        )}
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
      </motion.div>
    </AnimatePresence>
  )
}

function GalleryCard({ image, heightClass, delay, onClick }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  return (
    <div
      ref={ref}
      className={`relative group cursor-pointer rounded-lg overflow-hidden bg-primary/10 ${heightClass}`}
      style={{
        opacity: inView ? 1 : 0,
        transition: `opacity 0.35s ease ${delay}s`,
      }}
      onClick={onClick}
    >
      <Image
        src={image.url}
        alt={image.alt || 'Gallery image'}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8" />
      </div>
    </div>
  )
}

// Distribute images into columns round-robin, each column tracks its own height index
function buildColumns(items, colCount) {
  const cols = Array.from({ length: colCount }, () => [])
  items.forEach((item, i) => {
    const col = i % colCount
    const posInCol = cols[col].length
    cols[col].push({
      item,
      originalIndex: i,
      heightClass: HEIGHTS[posInCol % HEIGHTS.length],
    })
  })
  return cols
}

export function GalleryGrid({ images = [], showFilter = true }) {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [colCount, setColCount] = useState(4)

  useEffect(() => {
    function update() {
      const w = window.innerWidth
      if (w >= 1024) setColCount(4)
      else if (w >= 768) setColCount(3)
      else setColCount(2)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    setShowAll(false)
  }, [activeCategory])

  const categories = ['ALL', ...Object.keys(CATEGORY_LABELS).filter((cat) =>
    images.some((img) => img.category === cat)
  )]

  const filtered = activeCategory === 'ALL'
    ? images
    : images.filter((img) => img.category === activeCategory)

  const hasMore = filtered.length > INITIAL_COUNT
  const visibleImages = showAll ? filtered : filtered.slice(0, INITIAL_COUNT)
  const cols = buildColumns(visibleImages, colCount)

  const handleKeyDown = (e) => {
    if (lightboxIndex === null) return
    if (e.key === 'ArrowLeft' && lightboxIndex > 0) setLightboxIndex((i) => i - 1)
    if (e.key === 'ArrowRight' && lightboxIndex < filtered.length - 1) setLightboxIndex((i) => i + 1)
    if (e.key === 'Escape') setLightboxIndex(null)
  }

  if (!images.length) return null

  return (
    <div onKeyDown={handleKeyDown} tabIndex={-1}>
      {/* Category filter */}
      {showFilter && categories.length > 2 && (
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat] || ImageIcon
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex flex-col items-center justify-center gap-1.5 px-4 py-3 rounded-2xl border-2 transition-all duration-200 min-w-[72px] sm:min-w-[88px]
                  ${isActive
                    ? 'bg-primary border-primary text-white shadow-md scale-105'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary hover:shadow-sm'
                  }`}
              >
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${isActive ? 'text-white' : 'text-primary'}`} />
                <span className="text-xs sm:text-sm font-semibold leading-none">
                  {cat === 'ALL' ? 'All' : CATEGORY_LABELS[cat]}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Masonry columns */}
      <div className="flex gap-3 items-start">
        {cols.map((col, ci) => (
          <div key={ci} className="flex-1 flex flex-col gap-3 min-w-0">
            {col.map(({ item, originalIndex, heightClass }) => (
              <GalleryCard
                key={item._id || item.id || item.url}
                image={item}
                heightClass={heightClass}
                delay={Math.min(originalIndex * 0.03, 0.25)}
                onClick={() => setLightboxIndex(filtered.indexOf(item))}
              />
            ))}
          </div>
        ))}
      </div>

      {/* View More / View Less */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            size="lg"
            onClick={() => setShowAll((prev) => !prev)}
            className="bg-primary text-white hover:bg-primary/90 font-semibold px-10 rounded-full shadow transition-colors duration-200"
          >
            {showAll ? 'View Less' : 'View More'}
          </Button>
        </div>
      )}

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
