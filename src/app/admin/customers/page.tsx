/**
 * 🔴 LISTA DE CLIENTES
 * Migrado de /client/pages/participants.html
 */

'use client'

import { useState } from 'react'
import { Search, Eye } from 'lucide-react'

interface Customer {
  _id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
}

export default function CustomersPage() {
  const [customers] = useState<Customer[]>([
    { _id: '1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-9999', totalOrders: 5, totalSpent: 1249.50 },
    { _id: '2', name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 98888-8888', totalOrders: 3, totalSpent: 890.00 },
  ])
  const [search, setSearch] = useState('')

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex-1">
      <header className="px-8 py-6 bg-gray-900 border-b border-gray-700">
        <div>
          <h1 className="text-3xl font-bold text-emerald-400">Clientes</h1>
          <p className="text-gray-400 mt-1">Lista de clientes cadastrados</p>
        </div>
      </header>

      <main className="p-8">
        {/* Search */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm text-gray-400">
            <span>{customers.length}</span> clientes
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar cliente..."
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
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">E-mail</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">Telefone</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">Pedidos</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">Total Gasto</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {filteredCustomers.map((customer) => (
                <tr key={customer._id} className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-100">{customer.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{customer.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{customer.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{customer.totalOrders}</td>
                  <td className="px-6 py-4 text-sm text-emerald-400 font-bold">
                    R$ {customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-emerald-400 hover:text-emerald-300">
                      <Eye className="w-4 h-4" />
                    </button>
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
