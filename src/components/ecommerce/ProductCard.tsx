'use client'

import { ShoppingCart, Heart, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Product } from '@/lib/mock-data'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  // Ícones baseados no produto
  const getProductIcon = () => {
    const name = product.name.toLowerCase()
    if (name.includes('playstation') || name.includes('ps5')) return '🎮'
    if (name.includes('xbox')) return '🎮'
    if (name.includes('notebook') || name.includes('pc')) return '💻'
    if (name.includes('mouse')) return '🖱️'
    if (name.includes('teclado')) return '⌨️'
    if (name.includes('headset') || name.includes('fone')) return '🎧'
    if (name.includes('webcam')) return '📹'
    if (name.includes('monitor')) return '🖥️'
    if (name.includes('ssd') || name.includes('hd')) return '💾'
    if (name.includes('cadeira')) return '🪑'
    if (name.includes('gpu') || name.includes('placa de vídeo') || name.includes('rtx')) return '🎨'
    if (name.includes('controle')) return '🎮'
    if (name.includes('smartphone') || name.includes('celular')) return '📱'
    return '💻'
  }

  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className="group cursor-pointer relative bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
      >
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-5xl">
            {getProductIcon()}
          </div>
          
          {discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-emerald-500 text-white px-2 py-0.5 rounded text-xs font-bold">
              -{discountPercentage}%
            </div>
          )}
          
          <button className="absolute top-2 right-2 bg-gray-900/80 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="w-4 h-4 text-gray-300 hover:text-red-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 space-y-1">
          <h3 className="font-medium text-sm text-gray-100 line-clamp-2 group-hover:text-emerald-400 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-emerald-400 fill-emerald-400'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
          
          <div className="flex items-baseline space-x-2 pt-1">
            {product.compareAtPrice && (
              <span className="text-xs text-gray-500 line-through">
                R$ {product.compareAtPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-emerald-400">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          
          <button className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium py-2 rounded transition-all duration-200 flex items-center justify-center space-x-1">
            <ShoppingCart className="w-4 h-4" />
            <span>Comprar</span>
          </button>
        </div>
      </motion.div>
    </Link>
  )
}
