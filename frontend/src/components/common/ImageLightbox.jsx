'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Reusable lightbox for service-page image grids.
 * images: [{ src, alt }]
 * currentIndex: number | null  (null = closed)
 */
export function ImageLightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  // Keyboard navigation + body-scroll lock
  useEffect(() => {
    if (currentIndex === null) return
    document.body.style.overflow = 'hidden'
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && currentIndex > 0) onPrev()
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNext()
    }
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [currentIndex, images.length, onClose, onPrev, onNext])

  if (currentIndex === null) return null

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
          aria-label="Close"
          className="absolute top-4 right-4 text-white hover:text-white/70 transition-colors z-10"
          onClick={onClose}
        >
          <X className="h-8 w-8" />
        </button>

        {/* Prev */}
        {currentIndex > 0 && (
          <button
            aria-label="Previous image"
            className="absolute left-3 sm:left-4 text-white hover:text-white/70 transition-colors z-10 bg-black/30 rounded-full p-2"
            onClick={(e) => { e.stopPropagation(); onPrev() }}
          >
            <ChevronLeft className="h-7 w-7 sm:h-8 sm:w-8" />
          </button>
        )}

        {/* Next */}
        {currentIndex < images.length - 1 && (
          <button
            aria-label="Next image"
            className="absolute right-3 sm:right-4 text-white hover:text-white/70 transition-colors z-10 bg-black/30 rounded-full p-2"
            onClick={(e) => { e.stopPropagation(); onNext() }}
          >
            <ChevronRight className="h-7 w-7 sm:h-8 sm:w-8" />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.2 }}
          className="relative px-14 sm:px-16"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt || 'Image'}
            width={1200}
            height={900}
            className="object-contain max-h-[85vh] max-w-[90vw] rounded-lg"
            style={{ width: 'auto', height: 'auto' }}
          />
        </motion.div>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm select-none">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
