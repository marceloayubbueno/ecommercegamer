/**
 * 🔴 DASHBOARD ADMIN - LOJA
 * Migrado de /client/pages/dashboard.html
 */

'use client'

import { useEffect, useState } from 'react'
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 48,
    totalOrders: 127,
    totalCustomers: 89,
    monthlyRevenue: 15340.50,
  })

  return (
    <div className="flex-1">
      {/* Header */}
      <header className="px-8 py-6 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-emerald-400">Dashboard</h1>
            <p className="text-gray-400 mt-1">Visão geral da sua loja</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Bem-vindo,</p>
            <p className="font-semibold text-gray-100">Administrador</p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="p-8">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Produtos */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total de Produtos</p>
                <p className="text-3xl font-bold text-gray-100">{stats.totalProducts}</p>
                <p className="text-green-400 text-sm mt-1">
                  <span className="mr-1">↑</span>+5 esta semana
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Package className="text-emerald-400 w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Pedidos */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Pedidos do Mês</p>
                <p className="text-3xl font-bold text-gray-100">{stats.totalOrders}</p>
                <p className="text-green-400 text-sm mt-1">
                  <span className="mr-1">↑</span>+12% este mês
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <ShoppingCart className="text-blue-400 w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Clientes */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total de Clientes</p>
                <p className="text-3xl font-bold text-gray-100">{stats.totalCustomers}</p>
                <p className="text-yellow-400 text-sm mt-1">
                  <span className="mr-1">→</span>Estável
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Users className="text-yellow-400 w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Receita */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Receita Mensal</p>
                <p className="text-3xl font-bold text-gray-100">
                  R$ {stats.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-green-400 text-sm mt-1">
                  <span className="mr-1">↑</span>+18% este mês
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="text-purple-400 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Pedidos Recentes */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-gray-100 mb-6">Pedidos Recentes</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <ShoppingCart className="text-green-400 w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-gray-100 font-medium">Novo pedido #1247</p>
                <p className="text-gray-400 text-sm">Cliente: João Silva - R$ 299,90</p>
              </div>
              <div className="text-gray-400 text-sm">Há 2 horas</div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <ShoppingCart className="text-blue-400 w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-gray-100 font-medium">Pedido #1246 enviado</p>
                <p className="text-gray-400 text-sm">Cliente: Maria Santos</p>
              </div>
              <div className="text-gray-400 text-sm">Há 4 horas</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
