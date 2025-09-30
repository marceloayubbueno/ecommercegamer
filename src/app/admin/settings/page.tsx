/**
 * 🔴 CONFIGURAÇÕES DA LOJA
 */

'use client'

export default function SettingsPage() {
  return (
    <div className="flex-1">
      <header className="px-8 py-6 bg-gray-900 border-b border-gray-700">
        <div>
          <h1 className="text-3xl font-bold text-emerald-400">Configurações</h1>
          <p className="text-gray-400 mt-1">Configure sua loja</p>
        </div>
      </header>

      <main className="p-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-gray-100 mb-4">Dados da Loja</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nome da Loja</label>
              <input type="text" className="input" placeholder="Minha Loja" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">E-mail</label>
              <input type="email" className="input" placeholder="contato@loja.com" />
            </div>
            <button className="btn-primary">Salvar Alterações</button>
          </div>
        </div>
      </main>
    </div>
  )
}
