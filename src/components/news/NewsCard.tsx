'use client'

interface NewsCardProps {
  id: string
  title: string
  description: string
  image: string
  date: string
  category: string
  featured?: boolean
}

export function NewsCard({ 
  title, 
  description, 
  image, 
  date, 
  category,
  featured = false 
}: NewsCardProps) {
  return (
    <article className="group cursor-pointer transition-all duration-700 hover:scale-[1.03] hover:rotate-1 animate-fade-in">
      <div className="relative glass-card p-0 overflow-hidden h-full border border-white/5 hover:border-starling-500/30 transition-all duration-300">
        {/* Efeito de brilho no hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-starling-600/0 via-starling-600/5 to-starling-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Banner Image */}
        <div className="relative w-full h-40 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:rotate-2"
          />
          
          {/* Overlay gradiente no hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Category badge moderno */}
          <div className="absolute top-4 left-4 animate-bounce-in">
            <span className={`px-3 py-1.5 text-white text-xs font-semibold rounded-full backdrop-blur-sm border transition-all duration-300 hover:scale-110 hover:shadow-lg ${
              category === 'Spoiler' ? 'bg-red-600/80 border-red-500/50 hover:bg-red-500/90 hover:shadow-red-500/30' :
              category === 'Atualização' ? 'bg-starling-600/80 border-starling-500/50 hover:bg-starling-500/90 hover:shadow-starling-500/30' :
              category === 'Evento' ? 'bg-yellow-600/80 border-yellow-500/50 hover:bg-yellow-500/90 hover:shadow-yellow-500/30' :
              'bg-blue-600/80 border-blue-500/50 hover:bg-blue-500/90 hover:shadow-blue-500/30'
            }`}>
              {category}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 p-5 space-y-3">
          {/* Title com efeito */}
          <h3 className="font-bold text-white text-base group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-starling-400 group-hover:to-red-400 group-hover:bg-clip-text transition-all duration-500 hover:scale-105 hover:translate-x-1">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-200 transition-all duration-500 hover:translate-y-1">
            {description}
          </p>
          
          {/* Footer com animação */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10 group-hover:border-starling-500/20 transition-all duration-500">
            <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
              <span className="material-icons text-gray-500 text-sm animate-pulse">schedule</span>
              <span className="text-gray-400 text-sm">
                {date}
              </span>
            </div>
            <div className="flex items-center text-starling-400 text-sm font-medium group-hover:text-starling-300 transition-all duration-500 hover:scale-110 hover:translate-x-2">
              <span>Ler mais</span>
              <span className="ml-2 material-icons text-sm group-hover:translate-x-2 group-hover:rotate-12 transition-all duration-500">arrow_forward</span>
            </div>
          </div>
        </div>
        
        {/* Borda brilhante no hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-starling-600/20 via-transparent to-red-600/20 blur-sm"></div>
        </div>
      </div>
    </article>
  )
}
