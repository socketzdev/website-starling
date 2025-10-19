'use client'

import { Container } from '@/components/ui/Container'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background único - Grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Elementos de luz dinâmicos */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-2 h-32 bg-gradient-to-b from-transparent via-red-500/30 to-transparent transform rotate-12 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-24 bg-gradient-to-b from-transparent via-orange-500/40 to-transparent transform -rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/6 w-1.5 h-20 bg-gradient-to-b from-transparent via-red-400/25 to-transparent transform rotate-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>


      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-10 lg:py-20">
          
          {/* Lado esquerdo - Conteúdo */}
          <div className="space-y-6 lg:space-y-8">

            {/* Título principal */}
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-orbitron font-black leading-none tracking-wider">
                <span className="block text-white drop-shadow-2xl">STARLING</span>
                <span className="block bg-gradient-to-r from-starling-400 via-red-500 to-starling-400 bg-clip-text text-transparent drop-shadow-lg">
                  RPG
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-lg">
                O servidor de <span className="text-white font-bold">San Andreas Multiplayer</span> mais inovador do Brasil
              </p>
            </div>

            {/* Stats em linha */}
            <div className="flex flex-wrap gap-4 lg:gap-8">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-starling-400">1000+</div>
                <div className="text-xs lg:text-sm text-gray-400">Slots</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-blue-400">24/7</div>
                <div className="text-xs lg:text-sm text-gray-400">Online</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-green-400">AC</div>
                <div className="text-xs lg:text-sm text-gray-400">Anticheat</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-purple-400">RPG</div>
                <div className="text-xs lg:text-sm text-gray-400">Puro</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <button className="group relative px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-starling-600 to-red-700 text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-starling-500/30">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="material-icons text-base lg:text-lg">play_arrow</span>
                  <span className="text-sm lg:text-base">Jogar Agora</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-starling-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
              
              <button className="group px-6 lg:px-8 py-3 lg:py-4 border-2 border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/40">
                <span className="flex items-center justify-center gap-2">
                  <span className="material-icons text-base lg:text-lg">chat</span>
                  <span className="text-sm lg:text-base">Entrar no Discord</span>
                </span>
              </button>
            </div>

            {/* Server info */}
            <div className="inline-flex items-center gap-3 lg:gap-4 px-4 lg:px-6 py-2 lg:py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center gap-2">
                <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs lg:text-sm font-medium">Online</span>
              </div>
              <div className="w-px h-3 lg:h-4 bg-gray-600"></div>
              <div className="flex items-center gap-1 lg:gap-2">
                <span className="material-icons text-gray-400 text-xs lg:text-sm">dns</span>
                <code className="text-gray-300 font-mono text-xs lg:text-sm">181.215.45.25:7777</code>
                <button className="ml-1 p-1 rounded hover:bg-white/10 transition-colors group-hover:bg-white/10">
                  <span className="material-icons text-gray-400 text-xs lg:text-sm">content_copy</span>
                </button>
              </div>
            </div>
          </div>

          {/* Lado direito - Visual */}
          <div className="relative flex items-center justify-center mt-8 lg:mt-0">
            {/* Blur de fundo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 lg:w-80 xl:w-[20rem] h-64 lg:h-80 xl:h-[20rem] bg-gradient-to-br from-starling-600/30 to-red-600/30 rounded-full blur-3xl"></div>
            
            {/* Container principal */}
            <div className="relative w-64 lg:w-80 xl:w-[28rem] h-64 lg:h-80 xl:h-[28rem] z-10">
              {/* Imagem de fundo - InicioImage.webp */}
              <Image 
                src="/images/inicioImage.webp" 
                alt="Inicio Background"
                fill
                className="object-cover object-center rounded-lg overflow-hidden"
                priority
                onError={(e) => {
                  console.log('Erro ao carregar inicioImage.webp')
                }}
              />
              
              {/* Imagem sobreposta - main-rectangles-1.png */}
              <Image 
                src="/images/main-rectangles-1.png" 
                alt="Main Rectangles"
                fill
                className="object-contain mix-blend-overlay rounded-lg"
                onError={(e) => {
                  console.log('Erro ao carregar main-rectangles-1.png')
                }}
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator lateral */}
      <div className="absolute right-4 lg:right-6 top-1/2 transform -translate-y-1/2 hidden sm:block">
        <div className="flex flex-col items-center gap-2">
          <div className="w-4 lg:w-6 h-8 lg:h-12 border border-white/30 rounded-full flex items-start justify-center p-0.5 lg:p-1">
            <div className="w-0.5 lg:w-1 h-2 lg:h-3 bg-white/60 rounded-full animate-bounce"></div>
          </div>
          <span className="text-gray-400 text-sm lg:text-lg animate-bounce">↓</span>
        </div>
      </div>
    </section>
  )
}