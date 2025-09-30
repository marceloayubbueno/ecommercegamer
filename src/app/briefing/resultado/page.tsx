'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, Clock, DollarSign, Calendar, Download, MessageCircle, ArrowRight, Globe, Code, ShoppingCart, Zap } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface BriefingData {
  businessSituation: string
  urgency: string
  budget: string
  decisionMaker: string
  projectType: string
  features: string[]
  integrations: string[]
  name: string
  email: string
  phone: string
  company: string
  description: string
  timeline: string
}

const BriefingResultado = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [formData, setFormData] = useState<BriefingData | null>(null)
  const [budget, setBudget] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const budgetParam = searchParams.get('budget')
    const dataParam = searchParams.get('data')

    if (budgetParam && dataParam) {
      setBudget(parseInt(budgetParam))
      setFormData(JSON.parse(decodeURIComponent(dataParam)))
    }
    setIsLoading(false)
  }, [searchParams])

  const projectTypeInfo = {
    institucional: {
      title: 'Site Institucional',
      icon: Globe,
      color: 'from-blue-500 to-blue-600',
      description: 'Apresentação profissional da sua empresa',
      baseFeatures: ['Design responsivo', 'SEO otimizado', 'Formulário de contato', 'Google Analytics']
    },
    landing: {
      title: 'Landing Page',
      icon: Zap,
      color: 'from-green-500 to-green-600',
      description: 'Página única focada em conversão',
      baseFeatures: ['Formulário de captura', 'Call-to-action', 'SEO otimizado', 'Analytics']
    },
    webapp: {
      title: 'Sistema Web',
      icon: Code,
      color: 'from-purple-500 to-purple-600',
      description: 'Aplicação web completa',
      baseFeatures: ['Dashboard administrativo', 'Sistema de login', 'Banco de dados', 'API integrada']
    },
    ecommerce: {
      title: 'E-commerce',
      icon: ShoppingCart,
      color: 'from-orange-500 to-orange-600',
      description: 'Loja virtual completa',
      baseFeatures: ['Catálogo de produtos', 'Carrinho de compras', 'Pagamentos online', 'Painel administrativo']
    }
  }

  const urgencyLabels = {
    urgent: 'Urgente (até 30 dias)',
    normal: 'Normal (1-3 meses)',
    flexible: 'Flexível (3-6 meses)',
    'no-rush': 'Sem pressa (mais de 6 meses)'
  }

  const budgetLabels = {
    '5k': 'Até R$ 5.000',
    '15k': 'R$ 5.000 - R$ 15.000',
    '30k': 'R$ 15.000 - R$ 30.000',
    '50k': 'R$ 30.000 - R$ 50.000',
    '100k': 'R$ 50.000 - R$ 100.000',
    '100k+': 'Acima de R$ 100.000',
    'custom': 'Orçamento personalizado'
  }

  const calculateTimeline = (urgency: string, projectType: string) => {
    const baseTimelines = {
      institucional: 4,
      landing: 3,
      webapp: 8,
      ecommerce: 6
    }

    const urgencyMultipliers = {
      urgent: 0.7,
      normal: 1.0,
      flexible: 1.2,
      'no-rush': 1.5
    }

    const baseWeeks = baseTimelines[projectType as keyof typeof baseTimelines] || 4
    const multiplier = urgencyMultipliers[urgency as keyof typeof urgencyMultipliers] || 1.0
    
    return Math.ceil(baseWeeks * multiplier)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const generateProposal = () => {
    // Aqui você implementaria a geração de PDF
    console.log('Gerando proposta PDF...')
    alert('Proposta será enviada por email em breve!')
  }

  const scheduleMeeting = () => {
    // Aqui você implementaria o agendamento
    console.log('Agendando reunião...')
    alert('Você será redirecionado para o agendamento!')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Calculando seu orçamento...</p>
        </div>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Erro</h1>
          <p className="text-gray-300 mb-8">Não foi possível carregar os dados do briefing.</p>
          <button
            onClick={() => router.push('/briefing')}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200"
          >
            Voltar ao Briefing
          </button>
        </div>
      </div>
    )
  }

  const projectInfo = projectTypeInfo[formData.projectType as keyof typeof projectTypeInfo]
  const IconComponent = projectInfo.icon
  const timelineWeeks = calculateTimeline(formData.urgency, formData.projectType)

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
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            ref={ref}
          >
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              <span className="text-green-400">Orçamento</span> Pronto!
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mb-8" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Seu orçamento personalizado foi calculado com base nas suas necessidades específicas. 
              Confira os detalhes abaixo e entre em contato para iniciarmos seu projeto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Budget Card */}
      <section className="px-8 mb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-green-500/20"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center mb-8">
              <div className={`w-16 h-16 bg-gradient-to-r ${projectInfo.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{projectInfo.title}</h2>
              <p className="text-gray-300">{projectInfo.description}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Budget */}
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">{formatCurrency(budget)}</h3>
                <p className="text-gray-300">Investimento Total</p>
              </div>

              {/* Timeline */}
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-400 mb-2">{timelineWeeks} semanas</h3>
                <p className="text-gray-300">Prazo de Entrega</p>
              </div>

              {/* Urgency */}
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-orange-400 mb-2">
                  {urgencyLabels[formData.urgency as keyof typeof urgencyLabels]}
                </h3>
                <p className="text-gray-300">Urgência</p>
              </div>
            </div>

            {/* Project Details */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Base Features */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Funcionalidades Incluídas</h4>
                <div className="space-y-2">
                  {projectInfo.baseFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Features */}
              {formData.features.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Funcionalidades Adicionais</h4>
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Integrations */}
            {formData.integrations.length > 0 && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white mb-4">Integrações</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {formData.integrations.map((integration, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span className="text-gray-300">{integration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {formData.description && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white mb-4">Descrição do Projeto</h4>
                <p className="text-gray-300 bg-gray-800/50 rounded-xl p-4">{formData.description}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold text-white mb-8">
              Pronto para <span className="text-green-400">começar</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Agende uma reunião para discutir os detalhes do seu projeto e receber uma proposta formal.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button
                onClick={scheduleMeeting}
                className="flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 group"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Agendar Reunião</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={generateProposal}
                className="flex items-center justify-center space-x-3 px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-200"
              >
                <Download className="w-5 h-5" />
                <span>Baixar Proposta</span>
              </button>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-4">Ou entre em contato diretamente:</p>
              <div className="flex flex-col md:flex-row gap-4 justify-center text-gray-300">
                <span>📧 {formData.email}</span>
                <span>📱 {formData.phone}</span>
                {formData.company && <span>🏢 {formData.company}</span>}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default BriefingResultado



