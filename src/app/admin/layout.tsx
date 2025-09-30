/**
 * 🔴 LAYOUT ADMIN - GERENCIADOR DA LOJA
 * Migrado de /client/pages/dashboard.html (sidebar do cliente)
 * MANTÉM: Estrutura, cores, navegação
 */

'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Gift,
  BarChart3
} from 'lucide-react'
import { useEffect } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  
  // Check auth
  useEffect(() => {
    if (pathname !== '/admin/login') {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        router.push('/admin/login')
      }
    }
  }, [pathname, router])
  
  // Se for página de login, não mostra sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>
  }
  
  const menuItems = [
    { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/products', icon: Package, label: 'Produtos' },
    { href: '/admin/orders', icon: ShoppingCart, label: 'Pedidos' },
    { href: '/admin/customers', icon: Users, label: 'Clientes' },
    { href: '/admin/coupons', icon: Gift, label: 'Cupons' },
    { href: '/admin/reports', icon: BarChart3, label: 'Relatórios' },
    { href: '/admin/settings', icon: Settings, label: 'Configurações' },
  ]

  function handleLogout() {
    localStorage.clear()
    router.push('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar - Estilo de /client/pages/dashboard.html */}
      <nav className="w-64 bg-gray-800 flex-shrink-0 flex flex-col py-6 px-4 min-h-screen text-gray-100 border-r border-gray-700">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <span className="text-2xl font-bold text-emerald-400">
            Admin Panel
          </span>
        </div>

        {/* Menu */}
        <ul className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center pl-4 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gray-700 text-emerald-400 font-semibold'
                      : 'hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {item.label}
                </Link>
              </li>
            )
          })}
          
          {/* Logout */}
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center pl-4 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sair
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-900 min-h-screen">
        {children}
      </div>
    </div>
  )
}
