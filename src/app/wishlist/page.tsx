'use client'

import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import EcommerceHeader from '@/components/ecommerce/Header'
import EcommerceFooter from '@/components/ecommerce/Footer'
import { featuredProducts } from '@/lib/mock-data'
import { formatPrice } from '@/lib/config'

export default function WishlistPage() {
  // Mock: primeiros 4 produtos como favoritos
  const wishlistProducts = featuredProducts.slice(0, 4)

  return (
    <main className="min-h-screen bg-black">
      <EcommerceHeader />
      
      <div className="pt-20 pb-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              ❤️ Lista de Desejos
            </h1>
            <p className="text-gray-400">
              {wishlistProducts.length} produto(s) na sua lista
            </p>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-white mb-2">Sua lista está vazia</h3>
              <p className="text-gray-400 mb-6">Adicione produtos que você gostou!</p>
              <Link
                href="/products"
                className="inline-block bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-lg"
              >
                Ver Produtos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((product, index) => {
                const discountPercentage = product.compareAtPrice
                  ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
                  : 0

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-emerald-500/50 transition-all group"
                  >
                    {/* Imagem */}
                    <Link href={`/products/${product.slug}`} className="block relative">
                      <div className="relative h-56 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-7xl">
                          {product.category === 'Consoles' && '🎮'}
                          {product.category === 'Eletrônicos' && '💻'}
                          {product.category === 'Hardware' && '🔧'}
                          {product.category === 'Acessórios' && '🎧'}
                        </div>
                        
                        {discountPercentage > 0 && (
                          <div className="absolute top-3 left-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            -{discountPercentage}%
                          </div>
                        )}

                        {/* Botão Remover */}
                        <button className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </Link>

                    {/* Conteúdo */}
                    <div className="p-4 space-y-3">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-semibold text-white line-clamp-2 group-hover:text-emerald-400 transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-emerald-400 fill-emerald-400'
                                  : 'text-gray-600'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({product.reviewCount})</span>
                      </div>

                      <div className="space-y-1">
                        {product.compareAtPrice && (
                          <p className="text-sm text-gray-500 line-through">
                            {formatPrice(product.compareAtPrice)}
                          </p>
                        )}
                        <p className="text-xl font-bold text-emerald-400">
                          {formatPrice(product.price)}
                        </p>
                        <p className="text-xs text-gray-400">
                          12x de {formatPrice(product.price / 12)}
                        </p>
                      </div>

                      <button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 text-sm">
                        <ShoppingCart className="w-4 h-4" />
                        <span>Adicionar ao Carrinho</span>
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <EcommerceFooter />
    </main>
  )
}
