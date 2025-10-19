import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export function NewsHeader() {
  return (
    <Section padding="lg" className="relative bg-black overflow-hidden">
      {/* Background moderno com gradiente */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-starling-600/10 via-transparent to-red-600/10"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-starling-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-red-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid pattern sutil */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.1'%3e%3ccircle cx='30' cy='30' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
        }}></div>
      </div>
      
      <Container className="relative z-10">
        <div className="text-center space-y-8">
          {/* Badge moderno */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-starling-600/20 border border-starling-500/30 backdrop-blur-sm">
            <div className="w-2 h-2 bg-starling-400 rounded-full animate-pulse"></div>
            <span className="text-starling-400 text-sm font-medium">Últimas Notícias</span>
          </div>
          
          {/* Título com efeito holográfico */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-black">
              <span className="block text-white">NOTÍCIAS</span>
              <span className="block bg-gradient-to-r from-starling-400 via-red-400 to-starling-600 bg-clip-text text-transparent">
                STARLING
              </span>
            </h1>
          </div>
          
          {/* Descrição melhorada */}
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
              Fique por dentro das <span className="text-starling-400 font-semibold">últimas novidades</span> e 
              <span className="text-red-400 font-semibold"> spoilers exclusivos</span> do servidor.
            </p>
            <p className="text-gray-400 text-lg">
              Sua fonte oficial para descobrir as atualizações mais recentes do Starling RPG.
            </p>
          </div>
          
          {/* Stats rápidas */}
          <div className="flex justify-center items-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-starling-400">3</div>
              <div className="text-sm text-gray-400">Notícias</div>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">24/7</div>
              <div className="text-sm text-gray-400">Atualizações</div>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-sm text-gray-400">Exclusivo</div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
