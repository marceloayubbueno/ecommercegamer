import type { Metadata } from 'next'
import './globals.css'
import PixelAndConsentProvider from '../components/PixelAndConsentProvider';

export const metadata: Metadata = {
  title: 'GameTechStore - Loja Gamer e Tech | Consoles, PCs, Periféricos e Muito Mais',
  description: 'Os melhores produtos gamer e eletrônicos com até 50% OFF. Consoles, PCs, notebooks, periféricos e acessórios com preços incríveis e entrega rápida.',
  keywords: 'loja gamer, produtos tech, consoles, playstation, xbox, pc gamer, periféricos, headset, teclado mecânico, mouse gamer, monitor, gpu, placa de vídeo, ssd',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased bg-black text-gray-100">
        <div className="min-h-screen bg-black">
          {children}
        </div>
      </body>
    </html>
  )
} 