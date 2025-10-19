'use client'

import { useState } from 'react'
import Image from 'next/image'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="Starling RPG Logo"
              width={96}
              height={32}
              className="w-24 h-8"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors font-medium">
              Início
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors font-medium">
              Sobre
            </a>
            <a href="/loja" className="text-gray-300 hover:text-white transition-colors font-medium">
              Loja
            </a>
            <a href="/teste-login" className="text-gray-300 hover:text-white transition-colors font-medium">
              Teste UCP
            </a>
            <a href="/noticias" className="text-gray-300 hover:text-white transition-colors font-medium">
              Notícias
            </a>
            <a href="#download" className="text-gray-300 hover:text-white transition-colors font-medium">
              Download
            </a>
            <a href="#discord" className="text-gray-300 hover:text-white transition-colors font-medium">
              Discord
            </a>
          </nav>
      
          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium">
              Login
            </button>
            <button className="btn-primary">
              Jogar
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-white/10">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#home"
                  className="text-gray-300 hover:text-white transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Início
                </a>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-white transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sobre
                </a>
                <a
                  href="/loja"
                  className="text-gray-300 hover:text-white transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Loja
                </a>
                <a
                  href="/teste-login"
                  className="text-gray-300 hover:text-white transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Teste UCP
                </a>
                <a
                  href="/noticias"
                  className="text-gray-300 hover:text-white transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Notícias
                </a>
                <a
                  href="#download"
                  className="text-gray-300 hover:text-white transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Download
                </a>
                <a
                  href="#discord"
                  className="text-gray-300 hover:text-white transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Discord
                </a>
              <div className="flex flex-col space-y-3 pt-4">
                <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium">
                  Login
                </button>
                <button className="btn-primary w-full">
                  Jogar Agora
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
