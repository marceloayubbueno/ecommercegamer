'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import EcommerceHeader from '@/components/ecommerce/Header'
import EcommerceFooter from '@/components/ecommerce/Footer'
import ProductCard from '@/components/ecommerce/ProductCard'
import { featuredProducts } from '@/lib/mock-data'
import { formatPrice } from '@/lib/config'
import { useCartStore } from '@/store/cart'

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  // Encontrar produto pelo slug
  const product = featuredProducts.find(p => p.slug === slug) || featuredProducts[0]
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem(product, quantity)
    router.push('/cart')
  }
  
  // Mock de imagens (enquanto não temos imagens reais)
  const images = [product.images[0], product.images[0], product.images[0]]
  
  // Produtos relacionados
  const relatedProducts = featuredProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  return (
    <main className="min-h-screen bg-black">
      <EcommerceHeader />
      
      <div className="pt-20 pb-12">
        {/* Breadcrumb */}
        <div className="container py-3">
          <div className="flex items-center text-xs text-gray-400 space-x-2">
            <Link href="/" className="hover:text-emerald-400">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-emerald-400">Produtos</Link>
            <span>/</span>
            <span className="text-gray-200">{product.name}</span>
          </div>
        </div>

        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Galeria de Imagens */}
            <div className="space-y-3">
              {/* Imagem Principal */}
              <motion.div 
                className="relative aspect-square bg-gray-800 rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-full h-full flex items-center justify-center text-7xl">
                  {product.category === 'Consoles' && '🎮'}
                  {product.category === 'Eletrônicos' && '💻'}
                  {product.category === 'Hardware' && '🔧'}
                  {product.category === 'Acessórios' && '🎧'}
                </div>
                
                {discountPercentage > 0 && (
                  <div className="absolute top-3 left-3 bg-danger text-white px-3 py-1 rounded-full font-bold text-sm">
                    -{discountPercentage}% OFF
                  </div>
                )}
              </motion.div>

              {/* Miniaturas */}
              <div className="grid grid-cols-3 gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-800 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-emerald-500' 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center text-3xl">
                      {product.category === 'Consoles' && '🎮'}
                      {product.category === 'Eletrônicos' && '💻'}
                      {product.category === 'Hardware' && '🔧'}
                      {product.category === 'Acessórios' && '🎧'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Informações do Produto */}
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {product.name}
                </h1>
                
                {/* Avaliações */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-emerald-400 fill-emerald-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    {product.rating} ({product.reviewCount} avaliações)
                  </span>
                </div>

                {/* Preço */}
                <div className="mb-4">
                  {product.compareAtPrice && (
                    <div className="flex items-baseline space-x-2 mb-1">
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                      <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-xs font-bold">
                        Economize {formatPrice(product.compareAtPrice - product.price)}
                      </span>
                    </div>
                  )}
                  <div className="text-3xl md:text-4xl font-bold text-emerald-400">
                    {formatPrice(product.price)}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">ou 12x de {formatPrice(product.price / 12)} sem juros</p>
                </div>

                {/* Estoque */}
                <div className="flex items-center space-x-2 mb-4">
                  {product.stock > 0 ? (
                    <>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm text-emerald-400 font-medium">
                        {product.stock} unidades em estoque
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-red-400 font-medium">Fora de estoque</span>
                    </>
                  )}
                </div>

                {/* Descrição */}
                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  {product.description}. Produto de alta qualidade com garantia estendida. 
                  Ideal para gamers e entusiastas de tecnologia.
                </p>

                {/* Quantidade */}
                <div className="mb-4">
                  <label className="text-sm text-gray-400 mb-2 block">Quantidade:</label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-gray-800 hover:bg-gray-700 text-white w-8 h-8 rounded-lg text-sm"
                    >
                      -
                    </button>
                    <span className="text-white text-lg font-bold w-10 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="bg-gray-800 hover:bg-gray-700 text-white w-8 h-8 rounded-lg text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <button 
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-xl shadow-emerald-500/50 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{product.stock > 0 ? 'Adicionar ao Carrinho' : 'Fora de Estoque'}</span>
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition-all border border-gray-700">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition-all border border-gray-700">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-sm text-white font-medium">Frete Grátis</p>
                      <p className="text-xs text-gray-400">Acima de R$ 199</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-sm text-white font-medium">Garantia</p>
                      <p className="text-xs text-gray-400">12 meses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Produtos Relacionados */}
          {relatedProducts.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                🎮 Produtos Relacionados
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <EcommerceFooter />
    </main>
  )
}
