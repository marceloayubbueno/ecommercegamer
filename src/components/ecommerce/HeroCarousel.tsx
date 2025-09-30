'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface SlideProps {
  id: number
  title: string
  image: string
  discount?: string
  badge?: string
}

const heroSlides: SlideProps[] = [
  {
    id: 1,
    title: 'Consoles e Acessórios Gamer',
    image: '🎮',
    discount: '-50%',
    badge: 'SUPER OFERTA'
  },
  {
    id: 2,
    title: 'PCs e Notebooks',
    image: '💻',
    discount: '-30%',
    badge: 'NOVIDADE'
  },
  {
    id: 3,
    title: 'Headsets e Periféricos',
    image: '🎧',
    discount: '-40%',
    badge: 'GAMING'
  },
  {
    id: 4,
    title: 'Smartphones e Tablets',
    image: '📱',
    discount: '-35%',
    badge: 'TECH'
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div className="relative h-96 bg-dark-secondary rounded-2xl overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Emoji/Image */}
          <div className="text-9xl">
            {heroSlides[currentSlide].image}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badge TOP RIGHT */}
          {heroSlides[currentSlide].badge && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full font-bold text-sm"
            >
              {heroSlides[currentSlide].badge}
            </motion.div>
          )}

          {/* Discount Badge */}
          {heroSlides[currentSlide].discount && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="absolute top-4 left-4 bg-danger text-white px-6 py-3 rounded-full font-bold text-xl shadow-2xl"
            >
              {heroSlides[currentSlide].discount} OFF
            </motion.div>
          )}

          {/* Title BOTTOM */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-6 left-6 right-6 text-white"
          >
            <h3 className="text-2xl font-bold">{heroSlides[currentSlide].title}</h3>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-emerald-400 w-8' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
