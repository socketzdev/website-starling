
export default function Loading() {
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
            {/* Loading Icon */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-starling-600/20 rounded-full mb-6">
                <div className="animate-spin">
                  <span className="material-icons text-5xl text-starling-400">refresh</span>
                </div>
              </div>
            </div>

            {/* Loading Message */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Carregando...
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Aguarde enquanto carregamos o conteúdo
              </p>
            </div>

            {/* Loading Dots */}
            <div className="flex justify-center items-center gap-2">
              <div className="w-3 h-3 bg-starling-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-starling-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-starling-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
