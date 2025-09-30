"use client";

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star, Truck, Shield, CreditCard } from 'lucide-react'
import EcommerceHeader from '@/components/ecommerce/Header'
import ProductCard from '@/components/ecommerce/ProductCard'
import EcommerceFooter from '@/components/ecommerce/Footer'
import HeroCarousel from '@/components/ecommerce/HeroCarousel'
import { featuredProducts } from '@/lib/mock-data'

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Fundo com partículas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-emerald-950/30"></div>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, typeof window !== 'undefined' ? window.innerHeight + 20 : 1000],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-emerald-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-20px',
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        <EcommerceHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 lg:pr-16"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-relaxed">
                Os melhores{' '}
                <span className="gradient-text">produtos gamer</span> e eletrônicos você encontra aqui
              </h1>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-xl">
                Consoles, PCs, periféricos e muito mais com preços incríveis. 
                Monte seu setup dos sonhos com até 50% OFF!
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/products" className="btn-primary flex items-center space-x-2">
                  <span>Ver Produtos</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/offers" className="btn-secondary">
                  Ofertas do Dia
                </Link>
              </div>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-6 pt-12">
                <div className="flex items-center space-x-2">
                  <Truck className="w-6 h-6 text-primary" />
                  <span className="text-sm text-gray-300">Frete Grátis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-primary" />
                  <span className="text-sm text-gray-300">Compra Segura</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <span className="text-sm text-gray-300">Parcele em 12x</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Hero Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-12 lg:mt-0"
            >
              <HeroCarousel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">🎮 Gaming & Tech em Destaque</h2>
              <p className="text-base text-gray-400">Os produtos gamer mais vendidos da semana</p>
            </div>
            <Link href="/products" className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-2 group">
              <span>Ver Todos</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredProducts.slice(0, 8).map((product, index) => (
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
      </section>

      {/* CTA Banner */}
      <section className="py-24">
        <div className="container">
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-16 text-center shadow-2xl shadow-emerald-500/20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Cadastre-se e ganhe 10% de desconto na primeira compra!
              </h2>
              <p className="text-lg md:text-xl text-emerald-100">
                Receba ofertas exclusivas e novidades direto no seu e-mail
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="input flex-1 w-full"
                />
                <button className="w-full sm:w-auto whitespace-nowrap bg-white text-emerald-600 hover:bg-emerald-50 font-bold px-6 py-3 rounded-lg shadow-lg">
                  Cadastrar Agora
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <EcommerceFooter />
      </div>
    </main>
  )
} 