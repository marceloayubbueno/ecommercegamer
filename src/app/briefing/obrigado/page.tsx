'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, ArrowRight, MessageCircle, Mail, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BriefingObrigado = () => {
  const router = useRouter()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Hero Section */}
      <section className="py-20 px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.1, 0.05, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            ref={ref}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              <span className="text-green-400">Obrigado!</span>
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-8" />
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Seu briefing foi enviado com sucesso! Nossa equipe analisará suas necessidades 
              e retornará em até 24 horas com uma proposta detalhada e personalizada.
            </p>

            <div className="bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-green-500/20 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">O que acontece agora?</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Análise</h3>
                  <p className="text-gray-300 text-sm">
                    Nossa equipe analisa seu briefing e prepara uma proposta personalizada
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Proposta</h3>
                  <p className="text-gray-300 text-sm">
                    Você recebe uma proposta detalhada com cronograma e investimento
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Reunião</h3>
                  <p className="text-gray-300 text-sm">
                    Agendamos uma reunião para discutir os detalhes e iniciar o projeto
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
              <button
                onClick={() => router.push('/briefing')}
                className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 group"
              >
                <span>Fazer Novo Briefing</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => router.push('/')}
                className="flex items-center justify-center space-x-3 px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-200"
              >
                <span>Voltar ao Início</span>
              </button>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Precisa de ajuda imediata?</h3>
              <div className="flex flex-col md:flex-row gap-4 justify-center text-gray-300">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-green-400" />
                  <span>contato@uixweb.com.br</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span>(11) 99999-9999</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-green-400" />
                  <span>WhatsApp</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default BriefingObrigado



