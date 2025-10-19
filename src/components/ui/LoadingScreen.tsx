'use client'

import { useEffect, useState } from 'react'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simular progresso de carregamento
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 20
      })
    }, 100)

    // Iniciar fade out
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, 1200)

    // Remover loading screen após animação de fade
    const removeTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1800)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-all duration-700 ${isFadingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-starling-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-red-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Loading content */}
      <div className={`relative z-10 flex flex-col items-center gap-8 px-4 transition-all duration-700 ${isFadingOut ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        {/* Logo animado */}
        <div className="relative">
          <div className={`absolute inset-0 bg-starling-600 rounded-2xl blur-2xl opacity-50 transition-opacity duration-700 ${isFadingOut ? 'opacity-0' : 'animate-pulse'}`}></div>
          <div className={`relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-starling-600 to-red-700 rounded-2xl flex items-center justify-center border-2 border-starling-500/50 transition-all duration-700 ${isFadingOut ? 'scale-75 rotate-180' : 'animate-bounce'}`}>
            <span className="text-white font-black text-4xl sm:text-5xl">S</span>
          </div>
        </div>

        {/* Texto */}
        <div className="text-center space-y-2">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-orbitron font-black tracking-wider transition-all duration-500 ${isFadingOut ? 'opacity-0 translate-y-2' : 'opacity-100'}`}>
            <span className="text-white drop-shadow-2xl">STARLING</span> 
            <span className="bg-gradient-to-r from-starling-400 via-red-500 to-starling-400 bg-clip-text text-transparent drop-shadow-lg"> RPG</span>
          </h1>
          <p className={`text-gray-400 text-sm sm:text-base transition-all duration-500 delay-100 ${isFadingOut ? 'opacity-0 translate-y-2' : 'opacity-100'}`}>
            {isFadingOut ? 'Pronto!' : 'Carregando experiência...'}
          </p>
        </div>

        {/* Barra de progresso */}
        <div className={`w-64 sm:w-80 space-y-2 transition-all duration-500 delay-150 ${isFadingOut ? 'opacity-0 translate-y-2' : 'opacity-100'}`}>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-starling-600 to-red-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Carregando</span>
            <span>{Math.round(Math.min(progress, 100))}%</span>
          </div>
        </div>

        {/* Spinner decorativo */}
        <div className={`flex gap-2 transition-all duration-500 delay-200 ${isFadingOut ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
          <div className="w-2 h-2 bg-starling-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-starling-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}

