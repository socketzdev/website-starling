'use client'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export function AboutSection() {
  return (
    <Section id="about" padding="sm" className="relative bg-black overflow-hidden">
      {/* Background effects sutis */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-green-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Conteúdo */}
          <div className="space-y-6 lg:space-y-8">
            <div>
              <span className="inline-block px-3 lg:px-4 py-1.5 lg:py-2 rounded-full bg-starling-600/20 text-starling-400 font-medium text-xs lg:text-sm mb-4 lg:mb-6">
                Sobre o Servidor
              </span>
              
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4 lg:mb-6">
                Bem-vindo ao
                <span className="block text-gradient">Starling RPG</span>
              </h2>

              <div className="space-y-3 lg:space-y-4 text-gray-300 text-base lg:text-lg leading-relaxed">
                <p>
                  O <span className="text-starling-400 font-semibold">Starling RPG</span> é um servidor de San Andreas Multiplayer focado em proporcionar a melhor experiência de RPG para os jogadores brasileiros.
                </p>
                <p>
                  Com uma equipe dedicada e sistemas únicos, oferecemos um ambiente justo, divertido e competitivo onde você pode criar sua própria história em Los Santos.
                </p>
                <p>
                  Nosso servidor conta com <span className="text-white font-semibold">sistemas exclusivos</span>, economia balanceada, anticheat avançado e uma comunidade ativa que cresce a cada dia.
                </p>
              </div>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4">
              {[
                { value: '1', label: 'Ano Ativo' },
                { value: '500+', label: 'Slots' },
                { value: '99.9%', label: 'Uptime' }
              ].map((stat, i) => (
                <div key={i} className="glass-card p-3 lg:p-4 text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-starling-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-xs lg:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <button className="btn-primary text-sm lg:text-base px-6 lg:px-8 py-3 lg:py-4">
                Começar Agora
              </button>
              <button className="btn-secondary text-sm lg:text-base px-6 lg:px-8 py-3 lg:py-4">
                Saber Mais
              </button>
            </div>
          </div>

          {/* Visual - Trailer do YouTube */}
          <div className="relative order-first lg:order-last">
            <div className="aspect-video rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/7OWe8uMEG8s?si=Ceg19tOK9Yua0W5m"
                title="Starling RPG - Trailer Oficial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}