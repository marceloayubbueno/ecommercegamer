'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CreditCard, Barcode, QrCode, Lock, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import EcommerceHeader from '@/components/ecommerce/Header'
import EcommerceFooter from '@/components/ecommerce/Footer'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/config'

type PaymentMethod = 'pix' | 'boleto' | 'card'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix')
  const [loading, setLoading] = useState(false)

  // Dados pessoais
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cpf, setCpf] = useState('')

  // Endereço
  const [cep, setCep] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  // Cartão
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')

  const subtotal = getTotal()
  const shipping = subtotal > 199 ? 0 : 15
  const total = subtotal + shipping

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Mock de processamento
    setTimeout(() => {
      const orderId = Math.random().toString(36).substr(2, 9).toUpperCase()
      clearCart()
      router.push(`/order/${orderId}`)
    }, 2000)
  }

  if (items.length === 0) {
    return null
  }

  return (
    <main className="min-h-screen bg-black">
      <EcommerceHeader />
      
      <div className="pt-20 pb-12">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <Link href="/cart" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao carrinho
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              💳 Finalizar Compra
            </h1>
            <p className="text-gray-400">Preencha seus dados para concluir o pedido</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Formulário */}
              <div className="lg:col-span-2 space-y-6">
                {/* Dados Pessoais */}
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-lg font-bold text-white mb-4">📋 Dados Pessoais</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-400 mb-2">Nome Completo *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="João Silva"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="joao@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Telefone *</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-400 mb-2">CPF *</label>
                      <input
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="000.000.000-00"
                      />
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-lg font-bold text-white mb-4">📍 Endereço de Entrega</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">CEP *</label>
                      <input
                        type="text"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        required
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="00000-000"
                      />
                    </div>
                    <div className="md:col-span-1"></div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-400 mb-2">Rua *</label>
                      <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Rua Exemplo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Número *</label>
                      <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="123"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Complemento</label>
                      <input
                        type="text"
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Apto 45"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Bairro *</label>
                      <input
                        type="text"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        required
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Centro"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Cidade *</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="São Paulo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Estado *</label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">Selecione</option>
                        <option value="SP">SP</option>
                        <option value="RJ">RJ</option>
                        <option value="MG">MG</option>
                        <option value="RS">RS</option>
                        {/* Adicionar outros estados */}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Pagamento */}
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-lg font-bold text-white mb-4">💰 Forma de Pagamento</h2>
                  
                  {/* Métodos */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        paymentMethod === 'pix'
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-gray-700 bg-gray-900'
                      }`}
                    >
                      <QrCode className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                      <p className="text-xs font-medium text-white">PIX</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('boleto')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        paymentMethod === 'boleto'
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-gray-700 bg-gray-900'
                      }`}
                    >
                      <Barcode className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                      <p className="text-xs font-medium text-white">Boleto</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-gray-700 bg-gray-900'
                      }`}
                    >
                      <CreditCard className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                      <p className="text-xs font-medium text-white">Cartão</p>
                    </button>
                  </div>

                  {/* Detalhes do Pagamento */}
                  {paymentMethod === 'pix' && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                      <p className="text-sm text-gray-300">
                        ✅ Pagamento instantâneo via PIX. Após finalizar, você receberá o QR Code para pagamento.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'boleto' && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <p className="text-sm text-gray-300">
                        📄 Boleto bancário com vencimento em 3 dias. Você receberá o boleto por email.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-400 mb-2">Número do Cartão *</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required={paymentMethod === 'card'}
                          className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-400 mb-2">Nome no Cartão *</label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          required={paymentMethod === 'card'}
                          className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="JOÃO SILVA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Validade *</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          required={paymentMethod === 'card'}
                          className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="MM/AA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">CVV *</label>
                        <input
                          type="text"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          required={paymentMethod === 'card'}
                          maxLength={3}
                          className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Resumo */}
              <div className="lg:col-span-1">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 sticky top-24 space-y-4">
                  <h2 className="text-lg font-bold text-white">📦 Resumo do Pedido</h2>

                  {/* Produtos */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center text-2xl flex-shrink-0">
                          {item.product.category === 'Consoles' && '🎮'}
                          {item.product.category === 'Eletrônicos' && '💻'}
                          {item.product.category === 'Hardware' && '🔧'}
                          {item.product.category === 'Acessórios' && '🎧'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white font-medium line-clamp-2">{item.product.name}</p>
                          <p className="text-xs text-gray-400">Qtd: {item.quantity}</p>
                          <p className="text-sm text-emerald-400 font-bold">{formatPrice(item.product.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-4 border-t border-gray-700">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Frete</span>
                      <span className="text-white">{shipping === 0 ? 'GRÁTIS' : formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t border-gray-700">
                      <span className="text-base font-bold text-white">Total</span>
                      <span className="text-xl font-bold text-emerald-400">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-xl shadow-emerald-500/50 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processando...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        <span>Finalizar Pedido</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                    <Lock className="w-3 h-3" />
                    <span>Pagamento 100% seguro</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <EcommerceFooter />
    </main>
  )
}
