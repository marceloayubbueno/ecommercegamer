'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Package, MapPin, CreditCard, Download, Home } from 'lucide-react'
import Link from 'next/link'
import EcommerceHeader from '@/components/ecommerce/Header'
import EcommerceFooter from '@/components/ecommerce/Footer'

export default function OrderSuccessPage() {
  const params = useParams()
  const orderId = params.id as string

  return (
    <main className="min-h-screen bg-black">
      <EcommerceHeader />
      
      <div className="pt-20 pb-12">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/20 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-emerald-400" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              🎉 Pedido Realizado com Sucesso!
            </h1>
            <p className="text-gray-400">
              Obrigado pela sua compra. Em breve você receberá os detalhes no seu email.
            </p>
          </motion.div>

          {/* Detalhes do Pedido */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
              <div>
                <p className="text-sm text-gray-400">Número do Pedido</p>
                <p className="text-xl font-bold text-emerald-400">#{orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Data</p>
                <p className="text-white font-medium">{new Date().toLocaleDateString('pt-BR')}</p>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Pedido Confirmado</h3>
                  <p className="text-sm text-gray-400">Seu pedido foi recebido e está sendo processado.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 opacity-50">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Pagamento Pendente</h3>
                  <p className="text-sm text-gray-400">Aguardando confirmação do pagamento.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 opacity-50">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Em Trânsito</h3>
                  <p className="text-sm text-gray-400">Seu pedido está a caminho.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Próximas Etapas */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-6">
            <h2 className="text-lg font-bold text-white mb-4">📋 Próximas Etapas</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">1.</span>
                Você receberá um email de confirmação em alguns minutos
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">2.</span>
                Assim que o pagamento for confirmado, iniciaremos a separação
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">3.</span>
                Enviaremos o código de rastreamento por email e SMS
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 mr-2">4.</span>
                Prazo de entrega: 5-7 dias úteis
              </li>
            </ul>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-xl shadow-emerald-500/50 flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Voltar para Home</span>
            </Link>
            <Link
              href="/account/orders"
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all border border-gray-700 flex items-center justify-center space-x-2"
            >
              <Package className="w-5 h-5" />
              <span>Meus Pedidos</span>
            </Link>
          </div>
        </div>
      </div>

      <EcommerceFooter />
    </main>
  )
}
