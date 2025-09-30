'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function EcommerceFooter() {
  return (
    <footer className="bg-gray-900 border-t border-emerald-500/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              GameTech<span className="text-emerald-400">Store</span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Sua loja gamer e tech com os melhores produtos e preços do mercado.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-all hover:scale-110 transform">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-all hover:scale-110 transform">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-all hover:scale-110 transform">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-all hover:scale-110 transform">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Institucional */}
          <div>
            <h4 className="font-semibold text-white mb-4">Institucional</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">Sobre Nós</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contato</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Termos de Uso</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Política de Privacidade</Link></li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h4 className="font-semibold text-white mb-4">Atendimento</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white text-sm transition-colors">Entregas</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-white text-sm transition-colors">Trocas e Devoluções</Link></li>
              <li><Link href="/track" className="text-gray-400 hover:text-white text-sm transition-colors">Rastrear Pedido</Link></li>
            </ul>
          </div>

          {/* Minha Conta */}
          <div>
            <h4 className="font-semibold text-white mb-4">Minha Conta</h4>
            <ul className="space-y-2">
              <li><Link href="/account" className="text-gray-400 hover:text-white text-sm transition-colors">Meus Dados</Link></li>
              <li><Link href="/account/orders" className="text-gray-400 hover:text-white text-sm transition-colors">Meus Pedidos</Link></li>
              <li><Link href="/wishlist" className="text-gray-400 hover:text-white text-sm transition-colors">Lista de Desejos</Link></li>
              <li><Link href="/account/addresses" className="text-gray-400 hover:text-white text-sm transition-colors">Endereços</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 ShopNow. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                contato@shopnow.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                (11) 9999-9999
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
