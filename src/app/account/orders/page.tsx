'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Package, Heart, MapPin, Settings, LogOut, Eye, Truck, CheckCircle, Clock } from 'lucide-react'
import EcommerceHeader from '@/components/ecommerce/Header'
import EcommerceFooter from '@/components/ecommerce/Footer'
import { formatPrice } from '@/lib/config'

interface Order {
  id: string
  date: string
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  items: number
  total: number
  trackingCode?: string
}

const mockOrders: Order[] = [
  { id: 'ABC123XYZ', date: '2025-09-28', status: 'delivered', items: 3, total: 2499.90, trackingCode: 'BR123456789BR' },
  { id: 'DEF456GHI', date: '2025-09-25', status: 'shipped', items: 1, total: 399.90, trackingCode: 'BR987654321BR' },
  { id: 'JKL789MNO', date: '2025-09-20', status: 'paid', items: 2, total: 1899.80 },
  { id: 'PQR012STU', date: '2025-09-15', status: 'pending', items: 1, total: 5499.99 },
]

const statusConfig = {
  pending: { label: 'Aguardando Pagamento', color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: Clock },
  paid: { label: 'Pago', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: CheckCircle },
  shipped: { label: 'Enviado', color: 'text-purple-400', bg: 'bg-purple-500/10', icon: Truck },
  delivered: { label: 'Entregue', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: CheckCircle },
  cancelled: { label: 'Cancelado', color: 'text-red-400', bg: 'bg-red-500/10', icon: Clock },
}

export default function OrdersPage() {
  const menuItems = [
    { icon: User, label: 'Meus Dados', href: '/account', active: false },
    { icon: Package, label: 'Meus Pedidos', href: '/account/orders', active: true },
    { icon: Heart, label: 'Favoritos', href: '/wishlist', active: false },
    { icon: MapPin, label: 'Endereços', href: '/account/addresses', active: false },
    { icon: Settings, label: 'Configurações', href: '/account/settings', active: false },
  ]

  return (
    <main className="min-h-screen bg-black">
      <EcommerceHeader />
      
      <div className="pt-20 pb-12">
        <div className="container">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
            📦 Meus Pedidos
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Menu Lateral */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      item.active
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
                
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-red-400 hover:bg-red-500/10 mt-4">
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Sair</span>
                </button>
              </div>
            </div>

            {/* Lista de Pedidos */}
            <div className="lg:col-span-3 space-y-4">
              {mockOrders.map((order, index) => {
                const statusInfo = statusConfig[order.status]
                const StatusIcon = statusInfo.icon

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-emerald-500/30 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Pedido</p>
                        <p className="text-lg font-bold text-white">#{order.id}</p>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 md:mt-0">
                        <div className={`${statusInfo.bg} ${statusInfo.color} px-3 py-1 rounded-full flex items-center space-x-2`}>
                          <StatusIcon className="w-4 h-4" />
                          <span className="text-xs font-medium">{statusInfo.label}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-400">Data</p>
                        <p className="text-sm text-white font-medium">
                          {new Date(order.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Itens</p>
                        <p className="text-sm text-white font-medium">{order.items} produto(s)</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Total</p>
                        <p className="text-sm text-emerald-400 font-bold">{formatPrice(order.total)}</p>
                      </div>
                      {order.trackingCode && (
                        <div>
                          <p className="text-xs text-gray-400">Rastreio</p>
                          <p className="text-sm text-white font-mono">{order.trackingCode}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/order/${order.id}`}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Ver Detalhes</span>
                      </Link>
                      {order.trackingCode && (
                        <a
                          href={`https://rastreamento.correios.com.br/app/index.php?codigo=${order.trackingCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all border border-emerald-500/30"
                        >
                          <Truck className="w-4 h-4" />
                          <span>Rastrear Pedido</span>
                        </a>
                      )}
                    </div>
                  </motion.div>
                )
              })}

              {mockOrders.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-bold text-white mb-2">Nenhum pedido ainda</h3>
                  <p className="text-gray-400 mb-6">Comece a comprar produtos incríveis!</p>
                  <Link
                    href="/products"
                    className="inline-block bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-lg"
                  >
                    Ver Produtos
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <EcommerceFooter />
    </main>
  )
}
