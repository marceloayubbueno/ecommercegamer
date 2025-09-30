'use client'

import { motion } from 'framer-motion'
import ProductCard from '@/components/ecommerce/ProductCard'
import EcommerceHeader from '@/components/ecommerce/Header'
import EcommerceFooter from '@/components/ecommerce/Footer'
import { featuredProducts } from '@/lib/mock-data'

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-black">
      <EcommerceHeader />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-8">Todos os Produtos</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <EcommerceFooter />
    </main>
  )
}
