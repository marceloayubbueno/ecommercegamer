'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, ArrowRight, ChevronDown, X, Globe, Code, ShoppingCart, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BriefingData {
  // Qualificação
  businessSituation: string
  urgency: string
  budget: string
  decisionMaker: string
  
  // Projeto
  projectType: string
  features: string[]
  integrations: string[]
  
  // Contato
  name: string
  email: string
  phone: string
  company: string
  
  // Detalhes adicionais
  description: string
  timeline: string
}

// Componente de seleção de projeto com cards
const ProjectCards = ({ 
  options, 
  selectedValue, 
  onSelectionChange 
}: {
  options: { value: string; label: string }[]
  selectedValue: string
  onSelectionChange: (value: string) => void
}) => {
  const projectTypes = {
    institucional: {
      title: 'Site Institucional',
      description: 'Apresentação profissional da sua empresa com portfólio e informações de contato',
      icon: Globe,
      color: 'from-blue-500 to-blue-600',
      features: ['Design responsivo', 'SEO otimizado', 'Formulário de contato', 'Google Analytics']
    },
    landing: {
      title: 'Landing Page',
      description: 'Página única focada em conversão para capturar leads e gerar vendas',
      icon: Zap,
      color: 'from-green-500 to-green-600',
      features: ['Formulário de captura', 'Call-to-action', 'SEO otimizado', 'Analytics']
    },
    webapp: {
      title: 'Sistema Web',
      description: 'Aplicação web completa com dashboard, gestão de usuários e funcionalidades avançadas',
      icon: Code,
      color: 'from-purple-500 to-purple-600',
      features: ['Dashboard administrativo', 'Sistema de login', 'Banco de dados', 'API integrada']
    },
    ecommerce: {
      title: 'E-commerce',
      description: 'Loja virtual completa com catálogo, carrinho, pagamentos e gestão de pedidos',
      icon: ShoppingCart,
      color: 'from-orange-500 to-orange-600',
      features: ['Catálogo de produtos', 'Carrinho de compras', 'Pagamentos online', 'Painel administrativo']
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {options.map((option) => {
        const project = projectTypes[option.value as keyof typeof projectTypes]
        const IconComponent = project.icon
        const isSelected = selectedValue === option.value
        
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelectionChange(option.value)}
            className={`p-4 rounded-xl border transition-all duration-300 text-left ${
              isSelected 
                ? 'border-green-500 bg-green-500/10' 
                : 'border-gray-600 bg-gray-700/50 hover:border-green-500/50 hover:bg-gray-700'
            }`}
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className={`w-12 h-12 bg-gradient-to-r ${project.color} rounded-lg flex items-center justify-center`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
                <p className="text-gray-300 text-sm">{project.description}</p>
              </div>
              {isSelected && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-green-400 uppercase tracking-wider">Funcionalidades Incluídas</h4>
              <div className="grid grid-cols-2 gap-1">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span className="text-gray-300 text-xs">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

// Componente de seleção múltipla
const MultiSelect = ({ 
  options, 
  selectedValues, 
  onSelectionChange, 
  placeholder = "Selecione as opções" 
}: {
  options: { value: string; label: string }[]
  selectedValues: string[]
  onSelectionChange: (values: string[]) => void
  placeholder?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value]
    onSelectionChange(newValues)
  }

  const removeOption = (value: string) => {
    onSelectionChange(selectedValues.filter(v => v !== value))
  }

  const selectedLabels = selectedValues.map(value => 
    options.find(opt => opt.value === value)?.label
  ).filter(Boolean)

  return (
    <div className="relative">
      {/* Campo de seleção */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-left text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all flex items-center justify-between"
      >
        <span className={selectedLabels.length > 0 ? 'text-white' : 'text-gray-400'}>
          {selectedLabels.length > 0 
            ? `${selectedLabels.length} opção(ões) selecionada(s)`
            : placeholder
          }
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Tags das opções selecionadas */}
      {selectedLabels.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedLabels.map((label, index) => (
            <span
              key={index}
              className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm"
            >
              <span>{label}</span>
              <button
                type="button"
                onClick={() => removeOption(selectedValues[index])}
                className="hover:text-green-300 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-600 rounded-xl shadow-lg max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors flex items-center justify-between ${
                  selectedValues.includes(option.value) ? 'bg-green-500/10' : ''
                }`}
              >
                <span className="text-gray-300 hover:text-white">
                  {option.label}
                </span>
                {selectedValues.includes(option.value) && (
                  <Check className="w-4 h-4 text-green-400" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Componente de seleção única
const SingleSelect = ({ 
  options, 
  selectedValue, 
  onSelectionChange, 
  placeholder = "Selecione uma opção" 
}: {
  options: { value: string; label: string }[]
  selectedValue: string
  onSelectionChange: (value: string) => void
  placeholder?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectOption = (value: string) => {
    onSelectionChange(value)
    setIsOpen(false)
  }

  const selectedLabel = options.find(opt => opt.value === selectedValue)?.label

  return (
    <div className="relative">
      {/* Campo de seleção */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-left text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all flex items-center justify-between"
      >
        <span className={selectedLabel ? 'text-white' : 'text-gray-400'}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-600 rounded-xl shadow-lg max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => selectOption(option.value)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors flex items-center justify-between ${
                  selectedValue === option.value ? 'bg-green-500/10' : ''
                }`}
              >
                <span className="text-gray-300 hover:text-white">
                  {option.label}
                </span>
                {selectedValue === option.value && (
                  <Check className="w-4 h-4 text-green-400" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const BriefingForm = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<BriefingData>({
    businessSituation: '',
    urgency: '',
    budget: '',
    decisionMaker: '',
    projectType: '',
    features: [],
    integrations: [],
    name: '',
    email: '',
    phone: '',
    company: '',
    description: '',
    timeline: ''
  })

  const steps = [
    {
      title: 'Tipo de Projeto',
      subtitle: 'Escolha a categoria do seu projeto',
      fields: [
        {
          name: 'projectType',
          label: 'Que tipo de projeto você precisa?',
          type: 'project-cards',
          options: [
            { value: 'institucional', label: 'Site Institucional - Apresentação da empresa' },
            { value: 'landing', label: 'Landing Page - Página de conversão' },
            { value: 'webapp', label: 'Sistema Web - Aplicação completa' },
            { value: 'ecommerce', label: 'E-commerce - Loja virtual' }
          ]
        }
      ]
    },
    {
      title: 'Qualificação',
      subtitle: 'Entenda seu momento atual',
      fields: [
        {
          name: 'businessSituation',
          label: 'Qual é a situação atual do seu negócio?',
          type: 'radio',
          options: [
            { value: 'starting', label: 'Estou começando e preciso de presença online' },
            { value: 'improving', label: 'Já tenho um site/sistema, mas preciso melhorar' },
            { value: 'expanding', label: 'Tenho um negócio estabelecido e quero expandir digitalmente' },
            { value: 'specific', label: 'Preciso de uma solução específica para um problema atual' }
          ]
        },
        {
          name: 'urgency',
          label: 'Qual a urgência para ter o projeto pronto?',
          type: 'radio',
          options: [
            { value: 'urgent', label: 'Urgente (até 30 dias)' },
            { value: 'normal', label: 'Normal (1-3 meses)' },
            { value: 'flexible', label: 'Flexível (3-6 meses)' },
            { value: 'no-rush', label: 'Sem pressa (mais de 6 meses)' }
          ]
        },
        {
          name: 'budget',
          label: 'Qual o investimento que você tem disponível para este projeto?',
          type: 'radio',
          options: [
            { value: '5k', label: 'Até R$ 5.000' },
            { value: '15k', label: 'R$ 5.000 - R$ 15.000' },
            { value: '30k', label: 'R$ 15.000 - R$ 30.000' },
            { value: '50k', label: 'R$ 30.000 - R$ 50.000' },
            { value: '100k', label: 'R$ 50.000 - R$ 100.000' },
            { value: '100k+', label: 'Acima de R$ 100.000' },
            { value: 'custom', label: 'Preciso de um orçamento personalizado' }
          ]
        },
        {
          name: 'decisionMaker',
          label: 'Quem toma a decisão final sobre este projeto?',
          type: 'radio',
          options: [
            { value: 'me', label: 'Eu mesmo(a)' },
            { value: 'partner', label: 'Preciso apresentar para meu sócio/equipe' },
            { value: 'superior', label: 'Preciso aprovação de superiores' },
            { value: 'shared', label: 'Decisão compartilhada' }
          ]
        }
      ]
    },
    {
      title: 'Funcionalidades',
      subtitle: 'Selecione as funcionalidades necessárias',
      fields: [
        {
          name: 'features',
          label: 'Quais funcionalidades você precisa?',
          type: 'checkbox',
          options: getFeaturesByProjectType(formData.projectType)
        }
      ]
    },
    {
      title: 'Integrações',
      subtitle: 'Conecte com outras ferramentas',
      fields: [
        {
          name: 'integrations',
          label: 'Quais integrações são necessárias?',
          type: 'checkbox',
          options: [
            { value: 'google-analytics', label: 'Google Analytics' },
            { value: 'facebook-pixel', label: 'Facebook Pixel' },
            { value: 'whatsapp', label: 'WhatsApp Business' },
            { value: 'email-marketing', label: 'Email Marketing (Mailchimp, RD Station)' },
            { value: 'crm', label: 'CRM (HubSpot, Pipedrive)' },
            { value: 'payments', label: 'Pagamentos (Stripe, PagSeguro, Mercado Pago)' },
            { value: 'correios', label: 'Correios (rastreamento)' },
            { value: 'social-media', label: 'Redes sociais' },
            { value: 'google-maps', label: 'Google Maps' },
            { value: 'chat', label: 'Chat online' }
          ]
        }
      ]
    },
    {
      title: 'Informações do Projeto',
      subtitle: 'Detalhes adicionais',
      fields: [
        {
          name: 'description',
          label: 'Descreva brevemente seu projeto e objetivos',
          type: 'textarea',
          placeholder: 'Conte-nos mais sobre seu projeto, objetivos e expectativas...'
        },
        {
          name: 'timeline',
          label: 'Quando você gostaria de ter o projeto pronto?',
          type: 'radio',
          options: [
            { value: '1-month', label: 'Até 1 mês' },
            { value: '2-months', label: 'Até 2 meses' },
            { value: '3-months', label: 'Até 3 meses' },
            { value: '6-months', label: 'Até 6 meses' },
            { value: 'flexible', label: 'Flexível' }
          ]
        }
      ]
    },
    {
      title: 'Contato',
      subtitle: 'Seus dados para receber a proposta',
      fields: [
        {
          name: 'name',
          label: 'Nome completo',
          type: 'text',
          placeholder: 'Seu nome completo'
        },
        {
          name: 'email',
          label: 'E-mail',
          type: 'email',
          placeholder: 'seu@email.com'
        },
        {
          name: 'phone',
          label: 'Telefone/WhatsApp',
          type: 'tel',
          placeholder: '(11) 99999-9999'
        },
        {
          name: 'company',
          label: 'Empresa (opcional)',
          type: 'text',
          placeholder: 'Nome da sua empresa'
        }
      ]
    }
  ]

  function getFeaturesByProjectType(projectType: string) {
    const featuresMap = {
      institucional: [
        { value: 'blog', label: 'Blog integrado' },
        { value: 'news', label: 'Sistema de notícias' },
        { value: 'gallery', label: 'Galeria de imagens' },
        { value: 'testimonials', label: 'Depoimentos de clientes' },
        { value: 'chat', label: 'Chat online' },
        { value: 'whatsapp', label: 'Integração com WhatsApp' },
        { value: 'multilang', label: 'Múltiplos idiomas' },
        { value: 'search', label: 'Sistema de busca' },
        { value: 'newsletter', label: 'Newsletter' },
        { value: 'crm', label: 'Integração com CRM' }
      ],
      landing: [
        { value: 'chat', label: 'Chat online' },
        { value: 'whatsapp', label: 'Integração com WhatsApp' },
        { value: 'popups', label: 'Pop-ups de conversão' },
        { value: 'videos', label: 'Vídeos explicativos' },
        { value: 'video-testimonials', label: 'Depoimentos em vídeo' },
        { value: 'roi-calculator', label: 'Calculadora de ROI' },
        { value: 'crm', label: 'Integração com CRM' },
        { value: 'ab-testing', label: 'A/B testing' },
        { value: 'facebook-pixel', label: 'Pixel do Facebook' },
        { value: 'gtm', label: 'Google Tag Manager' }
      ],
      webapp: [
        { value: 'user-management', label: 'Gestão de usuários e permissões' },
        { value: 'notifications', label: 'Sistema de notificações' },
        { value: 'reports', label: 'Relatórios avançados' },
        { value: 'export', label: 'Exportação de dados (PDF/Excel)' },
        { value: 'api', label: 'API REST' },
        { value: 'integrations', label: 'Integração com terceiros' },
        { value: 'backup', label: 'Sistema de backup automático' },
        { value: 'audit-logs', label: 'Logs de auditoria' },
        { value: 'dashboard-charts', label: 'Dashboard com gráficos' },
        { value: 'templates', label: 'Sistema de templates' }
      ],
      ecommerce: [
        { value: 'multiple-payments', label: 'Múltiplas formas de pagamento' },
        { value: 'coupons', label: 'Sistema de cupons e promoções' },
        { value: 'inventory', label: 'Gestão de estoque' },
        { value: 'sales-reports', label: 'Relatórios de vendas' },
        { value: 'correios', label: 'Integração com correios' },
        { value: 'reviews', label: 'Sistema de avaliações' },
        { value: 'wishlist', label: 'Wishlist' },
        { value: 'compare', label: 'Comparador de produtos' },
        { value: 'support-chat', label: 'Chat de suporte' },
        { value: 'affiliate', label: 'Programa de afiliados' },
        { value: 'marketplace', label: 'Integração com marketplace' },
        { value: 'loyalty', label: 'Sistema de pontos/fidelidade' }
      ]
    }
    
    return featuresMap[projectType as keyof typeof featuresMap] || []
  }

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    // Aqui você implementaria a lógica de envio
    console.log('Form data:', formData)
    
    // Simular cálculo de orçamento
    const budget = calculateBudget(formData)
    
    // Redirecionar para página de resultado
    router.push(`/briefing/resultado?budget=${budget}&data=${encodeURIComponent(JSON.stringify(formData))}`)
  }

  const calculateBudget = (data: BriefingData) => {
    let basePrice = 0
    
    // Preço base por tipo de projeto
    const basePrices = {
      institucional: 5500,
      landing: 3500,
      webapp: 32500,
      ecommerce: 19000
    }
    
    basePrice = basePrices[data.projectType as keyof typeof basePrices] || 0
    
    // Adicionar custo por funcionalidade adicional
    const featureCost = data.features.length * 800
    
    // Adicionar custo por integração
    const integrationCost = data.integrations.length * 600
    
    // Multiplicador por urgência
    const urgencyMultipliers = {
      urgent: 1.3,
      normal: 1.0,
      flexible: 0.9,
      'no-rush': 0.8
    }
    
    const urgencyMultiplier = urgencyMultipliers[data.urgency as keyof typeof urgencyMultipliers] || 1.0
    
    const totalPrice = Math.round((basePrice + featureCost + integrationCost) * urgencyMultiplier)
    
    return totalPrice
  }

  const isStepValid = (stepIndex: number) => {
    const step = steps[stepIndex]
    return step.fields.every(field => {
      const value = formData[field.name as keyof BriefingData]
      if (field.type === 'checkbox') {
        return Array.isArray(value) && value.length > 0
      }
      return value && value.toString().trim() !== ''
    })
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-3xl p-6 border border-green-500/20">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold text-white">
            {currentStepData.title}
          </h3>
          <span className="text-green-400 font-semibold">
            {currentStep + 1} de {steps.length}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-gray-300 mt-2 text-sm">{currentStepData.subtitle}</p>
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStepData.fields.map((field, fieldIndex) => (
            <div key={fieldIndex} className="mb-6">
              <label className="block text-base font-semibold text-white mb-3">
                {field.label}
              </label>
              
              {field.type === 'project-cards' && (
                <ProjectCards
                  options={field.options || []}
                  selectedValue={formData[field.name as keyof BriefingData] as string}
                  onSelectionChange={(value) => handleInputChange(field.name, value)}
                />
              )}

              {field.type === 'radio' && (
                <SingleSelect
                  options={field.options || []}
                  selectedValue={formData[field.name as keyof BriefingData] as string}
                  onSelectionChange={(value) => handleInputChange(field.name, value)}
                  placeholder={`Selecione uma opção`}
                />
              )}

              {field.type === 'checkbox' && (
                <MultiSelect
                  options={field.options || []}
                  selectedValues={formData[field.name as keyof BriefingData] as string[]}
                  onSelectionChange={(values) => handleInputChange(field.name, values)}
                  placeholder={`Selecione as ${field.name === 'features' ? 'funcionalidades' : 'integrações'} necessárias`}
                />
              )}

              {(field.type === 'text' || field.type === 'email' || field.type === 'tel') && (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof BriefingData] as string}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                />
              )}

              {field.type === 'textarea' && (
                <textarea
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof BriefingData] as string}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all resize-none"
                />
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Anterior</span>
        </button>

        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!isStepValid(currentStep)}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 font-semibold"
          >
            <span>Gerar Orçamento</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!isStepValid(currentStep)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200"
          >
            <span>Próximo</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}

export default BriefingForm
