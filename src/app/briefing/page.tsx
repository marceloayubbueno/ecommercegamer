'use client'

import BriefingForm from '../../components/BriefingForm'

const BriefingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Header Section */}
      <section className="py-8 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-green-400">Briefing</span> do Projeto
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Vamos entender suas necessidades para criar a melhor solução para seu negócio
          </p>
        </div>
      </section>

      {/* Briefing Form Section */}
      <section className="py-8 px-8">
        <div className="max-w-4xl mx-auto">
          <BriefingForm />
        </div>
      </section>
    </div>
  )
}

export default BriefingPage
