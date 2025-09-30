/**
 * 🔴 GERENCIAMENTO DE PRODUTOS
 * Migrado de /client/pages/participants.html
 * MANTÉM: Tabela, CRUD, filtros
 */

'use client'

import { useEffect, useState } from 'react'
import { Plus, Search, Edit, Trash2, Image as ImageIcon } from 'lucide-react'

interface Product {
  _id: string
  name: string
  price: number
  stock: number
  category: string
  status: 'ativo' | 'inativo'
  image?: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  // Mock data por enquanto
  useEffect(() => {
    setProducts([
      { _id: '1', name: 'Notebook Gamer', price: 5499.99, stock: 15, category: 'Eletrônicos', status: 'ativo' },
      { _id: '2', name: 'Mouse RGB', price: 149.90, stock: 87, category: 'Eletrônicos', status: 'ativo' },
      { _id: '3', name: 'Teclado Mecânico', price: 399.90, stock: 42, category: 'Eletrônicos', status: 'ativo' },
    ])
  }, [])

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex-1">
      {/* Header */}
      <header className="px-8 py-6 bg-gray-900 border-b border-gray-700">
        <div>
          <h1 className="text-3xl font-bold text-emerald-400">Produtos</h1>
          <p className="text-gray-400 mt-1">Gerencie o catálogo de produtos</p>
        </div>
      </header>

      {/* Main */}
      <main className="p-8">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Novo Produto
            </button>
            <div className="text-sm text-gray-400">
              <span>{products.length}</span> produtos cadastrados
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar produto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">Produto</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">Categoria</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">Preço</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">Estoque</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                      Nenhum produto encontrado
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          </div>
                          <div className="text-sm font-medium text-gray-100">{product.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{product.category}</td>
                      <td className="px-6 py-4 text-sm text-emerald-400 font-bold">
                        R$ {product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{product.stock} un.</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                          product.status === 'ativo'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-400 hover:text-blue-300">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
