'use client'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import Image from 'next/image'

export function DownloadSection() {
  return (
    <Section id="download" padding="sm" className="relative bg-black overflow-hidden">
      {/* Background effects sutis */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-starling-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Lado esquerdo - Conteúdo */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div>
              <span className="inline-block px-3 lg:px-4 py-1.5 lg:py-2 rounded-full bg-starling-600/20 text-starling-400 font-medium text-xs lg:text-sm mb-4 lg:mb-6">
                Download
              </span>
              
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4 lg:mb-6">
                BAIXE AGORA
                <span className="block text-gradient">MESMO</span>
              </h2>

              <div className="space-y-3 lg:space-y-4 text-gray-300 text-base lg:text-lg leading-relaxed">
                <p>
                  Os servidores do <span className="text-starling-400 font-semibold">Starling RPG</span> são multiplataforma, permitindo que você jogue tanto no computador quanto no Android, oferecendo uma experiência integrada para jogar com pessoas de diferentes plataformas.
                </p>
                <p>
                  Jogue no Android e dispute com usuários de PC. Diversão sem limites, independentemente de onde você esteja ou em qual dispositivo esteja jogando. O <span className="text-white font-semibold">Starling RPG</span> certamente estará ao seu alcance.
                </p>
              </div>
            </div>

            {/* Botões de Download */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <button className="group flex items-center justify-center gap-2 lg:gap-3 bg-starling-600 hover:bg-starling-700 text-white font-bold py-3 lg:py-4 px-6 lg:px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-starling-600/30">
                <span className="material-icons text-xl lg:text-2xl">phone_android</span>
                <span className="text-sm lg:text-base">ANDROID DOWNLOAD</span>
              </button>
              
              <button className="group flex items-center justify-center gap-2 lg:gap-3 bg-starling-600 hover:bg-starling-700 text-white font-bold py-3 lg:py-4 px-6 lg:px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-starling-600/30">
                <span className="material-icons text-xl lg:text-2xl">computer</span>
                <span className="text-sm lg:text-base">PC DOWNLOAD</span>
              </button>
            </div>
          </div>

          {/* Lado direito - Visual */}
          <div className="relative flex items-center justify-center order-1 lg:order-2">
            {/* Imagem do avatar */}
            <div className="relative w-full h-[250px] lg:h-[400px]">
              <Image 
                src="/images/avatar-downloads.png" 
                alt="Avatar Downloads"
                width={400}
                height={400}
                className="w-full h-full object-contain animate-float"
                onError={(e) => {
                  // Fallback para ícone se a imagem não carregar
                  e.currentTarget.style.display = 'none'
                  const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                  if (nextElement) {
                    nextElement.style.display = 'flex'
                  }
                }}
              />
              
              {/* Fallback com ícone */}
              <div className="w-full h-full flex items-center justify-center text-center" style={{ display: 'none' }}>
                <div>
                  <div className="text-6xl mb-4 text-gray-400">
                    🎮
                  </div>
                  <p className="text-gray-500 text-sm">
                    Imagem não disponível
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
