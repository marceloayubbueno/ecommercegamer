/**
 * 🔴 GERENCIAMENTO DE PEDIDOS
 * Migrado de /client/pages/referrals.html
 */

'use client'

import { useState } from 'react'
import { Search, Eye, CheckCircle, XCircle } from 'lucide-react'

interface Order {
  _id: string
  orderNumber: string
  customerName: string
  total: number
  status: 'pendente' | 'pago' | 'enviado' | 'entregue' | 'cancelado'
  createdAt: string
}

export default function OrdersPage() {
  const [orders] = useState<Order[]>([
    { _id: '1', orderNumber: '#1247', customerName: 'João Silva', total: 299.90, status: 'pendente', createdAt: '2025-09-30' },
    { _id: '2', orderNumber: '#1246', customerName: 'Maria Santos', total: 549.80, status: 'pago', createdAt: '2025-09-29' },
    { _id: '3', orderNumber: '#1245', customerName: 'Pedro Costa', total: 149.90, status: 'enviado', createdAt: '2025-09-28' },
  ])
  const [search, setSearch] = useState('')

  const filteredOrders = orders.filter(o =>
    o.orderNumber.includes(search) || o.customerName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex-1">
      <header className="px-8 py-6 bg-gray-900 border-b border-gray-700">
        <div>
          <h1 className="text-3xl font-bold text-emerald-400">Pedidos</h1>
          <p className="text-gray-400 mt-1">Gerencie todos os pedidos da loja</p>
        </div>
      </header>

      <main className="p-8">
        {/* Search */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm text-gray-400">
            <span>{orders.length}</span> pedidos
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar pedido..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">Pedido</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">Data</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-100">{order.orderNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{order.customerName}</td>
                  <td className="px-6 py-4 text-sm text-emerald-400 font-bold">
                    R$ {order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                      order.status === 'entregue' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'enviado' ? 'bg-blue-500/20 text-blue-400' :
                      order.status === 'pago' ? 'bg-emerald-500/20 text-emerald-400' :
                      order.status === 'cancelado' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{order.createdAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-emerald-400 hover:text-emerald-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-400 hover:text-green-300">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
