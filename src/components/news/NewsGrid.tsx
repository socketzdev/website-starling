'use client'

import { useState } from 'react'
import { NewsCard } from './NewsCard'

const newsData = [
  {
    id: '1',
    title: '🎃 A ÉPOCA DE HALLOWEEN CHEGOU',
    description: 'Prepare-se para o evento mais assustador do ano! O Halloween chegou ao Starling RPG com missões exclusivas, recompensas aterrorizantes e uma experiência única. Explore áreas sombrias, enfrente criaturas misteriosas e ganhe itens exclusivos de Halloween. Não perca esta celebração especial que acontece apenas uma vez por ano!',
    image: 'https://media.discordapp.net/attachments/1386459014467948565/1427154719457017887/IMG-20251002-WA0010.jpg?ex=68edd4e8&is=68ec8368&hm=8cc8c2414de639823ed7550ea60f0c7cd08d96b033bddfcc21534fac11a2de5e&=&format=webp&width=1202&height=676',
    date: '13/10/2025, 18:00:00',
    category: 'Evento',
    featured: true
  },
  {
    id: '2',
    title: '🎉 EVENTO ESPECIAL: DIA DAS CRIANÇAS NO STARLING!',
    description: 'Celebre o Dia das Crianças com muito estilo! Participe de eventos especiais, ganhe recompensas exclusivas e divirta-se com atividades temáticas incríveis. Uma celebração única que você não pode perder! Venha fazer parte desta festa especial!',
    image: 'https://media.discordapp.net/attachments/1386459014467948565/1427154087119556669/Story_do_instagram_dia_das_criancas_divertido_azul.png?ex=68edd451&is=68ec82d1&hm=2db23e5227292e3c1aa2b4aa0f3f2c08caa02a4e661c1075d64bf37ada1f293f&=&format=webp&quality=lossless&width=439&height=780',
    date: '12/10/2025, 10:00:00',
    category: 'Evento'
  },
  {
    id: '3',
    title: 'SPOILER: NOVO INTERIOR DA CONCESSIONÁRIA REVELADO!',
    description: 'Prepare-se para uma experiência completamente nova! O interior da concessionária foi totalmente reformulado com design moderno, novos veículos exclusivos e uma atmosfera premium. Descubra os segredos escondidos neste novo espaço e prepare-se para as surpresas que aguardam!',
    image: 'https://media.discordapp.net/attachments/1367275932620030108/1424180483230531685/IMG-20251004-WA0032.jpg?ex=68ed8eef&is=68ec3d6f&hm=629d9a9a88e3dcb7c0aa992d24cf63695dd45a9e11a18f839a00321c1b9f332c&=&format=webp&width=541&height=676',
    date: '04/10/2025, 14:30:00',
    category: 'Spoiler'
  }
]

export function NewsGrid() {
  const [activeFilter, setActiveFilter] = useState('Todas')
  const [showCount, setShowCount] = useState(6)

  const categories = ['Todas', 'Atualização', 'Spoiler', 'Evento', 'Sistema']
  
  const filteredNews = newsData.filter(news => 
    activeFilter === 'Todas' || news.category === activeFilter
  )

  const displayedNews = filteredNews.slice(0, showCount)

  return (
    <div className="space-y-8">
      {/* Filtros modernos */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeFilter === category
                ? 'bg-starling-600 text-white shadow-lg shadow-starling-600/30 scale-105'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Contador de resultados */}
      <div className="text-center">
        <p className="text-gray-400">
          Mostrando <span className="text-starling-400 font-semibold">{displayedNews.length}</span> de{' '}
          <span className="text-white font-semibold">{filteredNews.length}</span> notícias
        </p>
      </div>

      {/* Grid de notícias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
        {displayedNews.map((news, index) => (
          <div 
            key={news.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <NewsCard
              id={news.id}
              title={news.title}
              description={news.description}
              image={news.image}
              date={news.date}
              category={news.category}
            />
          </div>
        ))}
      </div>
      
      {/* Botão carregar mais com animação */}
      {displayedNews.length < filteredNews.length && (
        <div className="text-center pt-8">
          <button 
            onClick={() => setShowCount(prev => Math.min(prev + 3, filteredNews.length))}
            className="group btn-primary px-8 py-4 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Carregar Mais</span>
              <span className="material-icons text-lg group-hover:rotate-180 transition-transform duration-300">
                expand_more
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-starling-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      )}

      {/* Indicador de fim */}
      {displayedNews.length === filteredNews.length && filteredNews.length > 6 && (
        <div className="text-center pt-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full border border-white/10">
            <span className="material-icons text-gray-400">check_circle</span>
            <span className="text-gray-400 text-sm">Todas as notícias carregadas</span>
          </div>
        </div>
      )}
    </div>
  )
}
