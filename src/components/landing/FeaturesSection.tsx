'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import Image from 'next/image'

const features = [
  {
    id: 'gangs',
    title: 'MONTE SUA GANGUE',
    description: 'No Starling, você tem a oportunidade de se tornar o líder de uma organização. Monte sua gangue, recrute membros habilidosos, e estabeleça sua supremacia no mundo do crime. Domine territórios, planeje estratégias e prove que sua gangue é imbatível.',
    icon: 'groups',
    image: '/images/build_gang.png',
    gradient: 'from-red-500 to-starling-600'
  },
  {
    id: 'events',
    title: 'EVENTOS DIÁRIOS',
    description: 'Desfrute de uma variedade de eventos diários, que garantem que a diversão no nosso servidor nunca termine. Prepare-se para participar de desafios emocionantes e atividades envolventes todos os dias.',
    icon: 'event',
    image: '/images/events.png',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'war',
    title: 'GUERRA DO MORRO',
    description: 'Participe de uma intensa guerra que ocorre em horários específicos em uma área especialmente modelada para nosso servidor. Lute para conquistar o morro ou defenda seu domínio com unhas e dentes. Seja você policial ou gangster, apenas uma organização poderá sair vitoriosa.',
    icon: 'landscape',
    image: '/images/hill_war.png',
    gradient: 'from-red-500 to-orange-500'
  },
  {
    id: 'police',
    title: 'TORNE-SE UM POLICIAL',
    description: 'O crime domina San Andreas; junte-se às forças policiais e combata o crime colocando os criminosos em seu devido lugar. Realize abordagens estratégicas, investigue cenas de crime, persiga criminosos em alta velocidade e mantenha a paz nas ruas da cidade.',
    icon: 'security',
    image: '/images/be_a_cop.png',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'vehicles',
    title: 'CARRO FORTE',
    description: 'O banco precisa receber o dinheiro, o carro forte está a caminho... Você não vai dar esse mole, né? Junte os membros da sua organização e planeje um roubo ao carro forte. Lembre-se, os policiais vão estar na sua cola, isso pode não acabar bem.',
    icon: 'local_shipping',
    image: '/images/armored_truck.png',
    gradient: 'from-purple-500 to-pink-500'
  }
]

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState('gangs')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0) // Começa com 0 = MONTE SUA GANGUE

  const currentFeature = features.find(f => f.id === activeFeature) || features[0]

  // Timer automático para trocar seções em ordem
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Vai para próxima seção em ordem
          const nextIndex = (currentIndex + 1) % features.length
          const nextFeature = features[nextIndex]
          
          setCurrentIndex(nextIndex)
          setIsTransitioning(true)
          
          setTimeout(() => {
            setActiveFeature(nextFeature.id)
            setIsTransitioning(false)
          }, 150)
          
          return 0 // Reset progress
        }
        return prev + 2 // Incrementa 2% a cada 100ms (5 segundos total)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [currentIndex]) // Dependência no currentIndex

  const handleFeatureChange = (featureId: string) => {
    if (featureId === activeFeature) return
    
    // Encontrar o índice da feature selecionada
    const featureIndex = features.findIndex(f => f.id === featureId)
    if (featureIndex !== -1) {
      setCurrentIndex(featureIndex)
      setProgress(0) // Reset progress quando muda manualmente
      
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveFeature(featureId)
        setIsTransitioning(false)
      }, 150)
    }
  }

  return (
    <Section id="features" padding="sm" className="relative bg-black overflow-hidden">
      {/* Background effects sutis */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-starling-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Lado esquerdo - Visual */}
          <div className="relative flex items-center justify-center min-h-[300px] lg:min-h-[500px] order-2 lg:order-1">
            {/* Blur sutil atrás da imagem - sem formato de quadrado */}
            <div className={`absolute w-48 lg:w-80 h-48 lg:h-80 bg-gradient-to-br ${currentFeature.gradient} opacity-10 rounded-full blur-2xl`}></div>
            
            {/* Imagem dos personagens - sem quadrado */}
            <div className="relative w-full h-[250px] lg:h-[400px] z-10 group">
              <Image 
                src={currentFeature.image} 
                alt={currentFeature.title}
                width={400}
                height={400}
                className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-105 group-hover:rotate-1 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
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
                    {currentFeature.icon}
                  </div>
                  <p className="text-gray-500 text-sm">
                    Imagem não disponível
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado direito - Conteúdo e botões */}
          <div className="space-y-6 lg:space-y-8 order-1 lg:order-2">
            {/* Título */}
            <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-black transition-all duration-500 ${isTransitioning ? 'opacity-50 translate-y-2' : 'opacity-100 translate-y-0'} ${currentFeature.id === 'gangs' ? 'text-starling-400' : currentFeature.id === 'police' ? 'text-blue-400' : 'text-white'}`}>
              {currentFeature.title}
            </h2>
            
            {/* Descrição */}
            <p className={`text-gray-300 text-base lg:text-lg leading-relaxed transition-all duration-500 ${isTransitioning ? 'opacity-50 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              {currentFeature.description}
            </p>

            {/* Barra de progresso com timer */}
            <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${currentFeature.gradient} rounded-full transition-all duration-100 ease-linear`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Botões interativos */}
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {features.map((feature, index) => (
                <button
                  key={feature.id}
                  onClick={() => handleFeatureChange(feature.id)}
                  className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 ${
                    activeFeature === feature.id
                      ? 'bg-starling-600 scale-110 shadow-lg shadow-starling-600/30'
                      : 'bg-gray-800 hover:bg-gray-700 hover:shadow-lg'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="material-icons text-lg lg:text-xl transition-transform duration-200 hover:rotate-12">{feature.icon}</span>
                </button>
              ))}
            </div>

          </div>
        </div>
      </Container>
    </Section>
  )
}