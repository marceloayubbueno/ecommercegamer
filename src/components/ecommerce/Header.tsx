'use client'
import Link from 'next/link'
import { ShoppingCart, Search, User, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cart'

export default function EcommerceHeader() {
  const { getItemsCount } = useCartStore()
  const cartCount = getItemsCount()

  return (
    <header className="bg-gray-900/80 backdrop-blur-md border-b border-emerald-500/20 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              GameTech<span className="text-emerald-400">Store</span>
            </span>
          </Link>

          {/* Menu */}
          <div className="flex items-center space-x-6">
            <Link href="/products" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-medium hidden md:block">
              Produtos
            </Link>
            <Link href="/wishlist" className="text-gray-300 hover:text-emerald-400 transition-colors hidden md:block">
              <Heart className="w-5 h-5" />
            </Link>
            <Link href="/cart" className="relative text-gray-300 hover:text-emerald-400 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/account" className="text-gray-300 hover:text-emerald-400 transition-colors">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
