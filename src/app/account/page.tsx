'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Package, Heart, MapPin, Settings, LogOut, Edit2 } from 'lucide-react'
import EcommerceHeader from '@/components/ecommerce/Header'
import EcommerceFooter from '@/components/ecommerce/Footer'

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false)

  // Mock de dados do usuário
  const [userData, setUserData] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    cpf: '000.000.000-00',
  })

  const menuItems = [
    { icon: User, label: 'Meus Dados', href: '/account', active: true },
    { icon: Package, label: 'Meus Pedidos', href: '/account/orders', active: false },
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
            👤 Minha Conta
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

            {/* Conteúdo */}
            <div className="lg:col-span-3 space-y-6">
              {/* Dados Pessoais */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white">📋 Dados Pessoais</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center space-x-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>{isEditing ? 'Cancelar' : 'Editar'}</span>
                  </button>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Nome Completo</label>
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email</label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Telefone</label>
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-2 px-6 rounded-lg text-sm"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Nome</p>
                      <p className="text-white font-medium">{userData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white font-medium">{userData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Telefone</p>
                      <p className="text-white font-medium">{userData.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">CPF</p>
                      <p className="text-white font-medium">{userData.cpf}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Cards de Resumo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/account/orders" className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-emerald-500/50 transition-all group">
                  <Package className="w-8 h-8 text-emerald-400 mb-3" />
                  <p className="text-2xl font-bold text-white mb-1">12</p>
                  <p className="text-sm text-gray-400 group-hover:text-emerald-400">Pedidos Realizados</p>
                </Link>

                <Link href="/wishlist" className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-emerald-500/50 transition-all group">
                  <Heart className="w-8 h-8 text-emerald-400 mb-3" />
                  <p className="text-2xl font-bold text-white mb-1">8</p>
                  <p className="text-sm text-gray-400 group-hover:text-emerald-400">Produtos Favoritos</p>
                </Link>

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <MapPin className="w-8 h-8 text-emerald-400 mb-3" />
                  <p className="text-2xl font-bold text-white mb-1">2</p>
                  <p className="text-sm text-gray-400">Endereços Salvos</p>
                </div>
              </div>

              {/* Ações Rápidas */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-base font-bold text-white mb-4">⚡ Ações Rápidas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Link href="/account/orders" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center space-x-2">
                    <Package className="w-4 h-4" />
                    <span>Ver Pedidos Recentes</span>
                  </Link>
                  <Link href="/wishlist" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>Ver Lista de Desejos</span>
                  </Link>
                  <Link href="/products" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center space-x-2">
                    <span>🎮</span>
                    <span>Continuar Comprando</span>
                  </Link>
                  <button className="text-gray-400 hover:text-white text-sm flex items-center space-x-2 text-left">
                    <Settings className="w-4 h-4" />
                    <span>Alterar Senha</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EcommerceFooter />
    </main>
  )
}
