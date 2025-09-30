'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import EcommerceHeader from '@/components/ecommerce/Header'
import EcommerceFooter from '@/components/ecommerce/Footer'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/config'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotal, getItemsCount } = useCartStore()
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)

  const subtotal = getTotal()
  const discount = appliedCoupon ? subtotal * (appliedCoupon.discount / 100) : 0
  const shipping = subtotal > 199 ? 0 : 15
  const total = subtotal - discount + shipping

  const applyCoupon = () => {
    // Mock de cupom
    if (couponCode.toUpperCase() === 'GAMER10') {
      setAppliedCoupon({ code: couponCode, discount: 10 })
    } else if (couponCode.toUpperCase() === 'TECH20') {
      setAppliedCoupon({ code: couponCode, discount: 20 })
    } else {
      alert('Cupom inválido!')
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-black">
        <EcommerceHeader />
        <div className="pt-20 pb-12">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-8xl">🛒</div>
                <h1 className="text-3xl font-bold text-white">Seu carrinho está vazio</h1>
                <p className="text-gray-400">
                  Adicione produtos incríveis e comece suas compras!
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-xl shadow-emerald-500/50"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Ver Produtos</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        <EcommerceFooter />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black">
      <EcommerceHeader />
      
      <div className="pt-20 pb-12">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              🛒 Carrinho de Compras
            </h1>
            <p className="text-gray-400">
              {getItemsCount()} {getItemsCount() === 1 ? 'item' : 'itens'} no carrinho
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Produtos */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => {
                const discountPercentage = item.product.compareAtPrice
                  ? Math.round(((item.product.compareAtPrice - item.product.price) / item.product.compareAtPrice) * 100)
                  : 0

                return (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex gap-4">
                      {/* Imagem */}
                      <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                        {item.product.category === 'Consoles' && '🎮'}
                        {item.product.category === 'Eletrônicos' && '💻'}
                        {item.product.category === 'Hardware' && '🔧'}
                        {item.product.category === 'Acessórios' && '🎧'}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.product.slug}`} className="hover:text-emerald-400">
                          <h3 className="text-base font-semibold text-white mb-1 line-clamp-2">
                            {item.product.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg font-bold text-emerald-400">
                            {formatPrice(item.product.price)}
                          </span>
                          {item.product.compareAtPrice && (
                            <>
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(item.product.compareAtPrice)}
                              </span>
                              <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-xs font-bold">
                                -{discountPercentage}%
                              </span>
                            </>
                          )}
                        </div>

                        {/* Controles */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="bg-gray-700 hover:bg-gray-600 text-white w-7 h-7 rounded flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="bg-gray-700 hover:bg-gray-600 text-white w-7 h-7 rounded flex items-center justify-center"
                              disabled={item.quantity >= item.product.stock}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              {/* Limpar Carrinho */}
              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-300 text-sm flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Limpar carrinho</span>
              </button>
            </div>

            {/* Resumo */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 sticky top-24 space-y-6">
                <h2 className="text-xl font-bold text-white">Resumo do Pedido</h2>

                {/* Cupom */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Cupom de desconto:</label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-bold text-sm">{appliedCoupon.code}</span>
                        <span className="text-xs text-gray-400">(-{appliedCoupon.discount}%)</span>
                      </div>
                      <button onClick={removeCoupon} className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Ex: GAMER10"
                        className="flex-1 bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        onClick={applyCoupon}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Aplicar
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Cupons válidos: GAMER10, TECH20
                  </p>
                </div>

                <div className="space-y-3 py-4 border-y border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-400">Desconto ({appliedCoupon.discount}%)</span>
                      <span className="text-emerald-400 font-medium">-{formatPrice(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Frete</span>
                    <span className="text-white font-medium">
                      {shipping === 0 ? 'GRÁTIS' : formatPrice(shipping)}
                    </span>
                  </div>

                  {subtotal < 199 && shipping > 0 && (
                    <p className="text-xs text-gray-500">
                      Falta {formatPrice(199 - subtotal)} para frete grátis
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-2xl font-bold text-emerald-400">{formatPrice(total)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-xl shadow-emerald-500/50 flex items-center justify-center space-x-2"
                >
                  <span>Finalizar Compra</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/products"
                  className="block text-center text-emerald-400 hover:text-emerald-300 text-sm"
                >
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EcommerceFooter />
    </main>
  )
}
