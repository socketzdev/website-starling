import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background effects - igual ao site */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-starling-600/10 to-transparent rounded-full blur-[120px]"></div>
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-purple-600/10 to-transparent rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* 404 Number */}
            <div className="mb-8">
              <h1 className="text-9xl md:text-[12rem] font-orbitron font-black text-white mb-4">
                <span className="bg-gradient-to-r from-starling-400 via-red-500 to-starling-400 bg-clip-text text-transparent">
                  404
                </span>
              </h1>
            </div>

            {/* Error Message */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Página não encontrada
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                A página que você está procurando não existe ou foi movida.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-starling-600 to-red-600 hover:from-starling-700 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-starling-500/30 hover:scale-105"
              >
                <span className="material-icons">home</span>
                Voltar ao Início
              </Link>
              
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all duration-300 border border-gray-700 hover:border-gray-600"
              >
                <span className="material-icons">arrow_back</span>
                Página Anterior
              </Link>
            </div>

            {/* Help Text */}
            <div className="mt-16">
              <p className="text-gray-500 text-sm">
                Se você acredita que isso é um erro, entre em contato conosco
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
