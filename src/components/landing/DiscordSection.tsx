'use client'

import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export function DiscordSection() {
  return (
    <Section id="discord" padding="sm" className="relative bg-black overflow-hidden">
      {/* Background effects sutis */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-starling-600/5 rounded-full blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="text-center space-y-8 lg:space-y-12">
          <div className="space-y-4 lg:space-y-6">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
              Junte-se à
              <span className="block text-gradient">Comunidade</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Entre no nosso Discord e faça parte da maior comunidade de RPG do Brasil
            </p>
          </div>

          {/* Discord stats */}
          <div className="grid grid-cols-3 gap-3 lg:gap-6 max-w-2xl mx-auto">
            {[
              { number: '500+', label: 'Membros' },
              { number: '24/7', label: 'Ativo' },
              { number: '10+', label: 'Staff' }
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4 lg:p-6 text-center">
                <div className="text-2xl lg:text-3xl font-bold text-starling-400 mb-1 lg:mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm lg:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="space-y-3 lg:space-y-4">
            <button className="btn-primary text-base lg:text-lg px-6 lg:px-8 py-3 lg:py-4">
              Entrar no Discord
            </button>
            <p className="text-xs lg:text-sm text-gray-500 px-4">
              Participe de eventos, faça amigos e divirta-se
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}