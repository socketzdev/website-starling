'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { LoginModal } from '@/components/auth/LoginModal'
import { useAuth } from '@/hooks/useAuth'
import { SkinImage } from '@/components/ui/SkinImage'
import { GeminiChat } from '@/components/ai/GeminiChat'

export default function LojaPage() {
  const [cart, setCart] = useState<any[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('moedas')
  
  const { user, isAuthenticated, login, logout } = useAuth()

  const products = [
    // Moedas VIP
    { id: 'moedas-5000', name: '5KM (5.000 Moedas VIP)', price: 5.00, description: 'Moeda oficial do servidor', category: 'moedas', popular: false },
    { id: 'moedas-15000', name: '15KM (15.000 Moedas VIP)', price: 15.00, description: 'Moeda oficial do servidor', category: 'moedas', popular: false },
    { id: 'moedas-25000', name: '25KM (25.000 Moedas VIP)', price: 25.00, description: 'Pacote médio de moedas', category: 'moedas', popular: true },
    { id: 'moedas-50000', name: '50KM (50.000 Moedas VIP)', price: 50.00, description: 'Pacote grande de moedas', category: 'moedas', popular: true },
    { id: 'moedas-75000', name: '75KM (75.000 Moedas VIP)', price: 75.00, description: 'Pacote premium de moedas', category: 'moedas', popular: false },
    { id: 'moedas-100000', name: '100KM (100.000 Moedas VIP)', price: 100.00, description: 'Pacote máximo de moedas', category: 'moedas', popular: true },
    
    // Sócios
    { id: 'socio-starling', name: 'Sócio Starling', price: 80.00, description: 'O mais alto nível de sócio com todos os benefícios exclusivos', category: 'socios', popular: true },
    { id: 'socio-patrocinador', name: 'Sócio Patrocinador', price: 50.00, description: 'Nível intermediário com benefícios especiais de patrocínio', category: 'socios', popular: false },
    { id: 'socio-especial', name: 'Sócio Especial', price: 35.00, description: 'Acesso especial com comandos e benefícios exclusivos', category: 'socios', popular: false },
    { id: 'socio-comum', name: 'Sócio Comum', price: 20.00, description: 'Acesso básico aos benefícios de sócio', category: 'socios', popular: false },
    
    // VIP
    { id: 'vip-comum', name: 'VIP Comum', price: 10.00, description: 'Acesso básico aos benefícios VIP', category: 'vip', popular: false },
    { id: 'vip-premium', name: 'VIP Premium', price: 15.00, description: 'Acesso completo aos benefícios VIP premium', category: 'vip', popular: true },
    
    // Combos
    { id: 'combo-starter', name: 'Combo Starter', price: 49.99, originalPrice: 69.99, description: '5.000 Moedas VIP + Sócio 7 Dias + Kit de Armas Básico', category: 'combos', popular: true },
    { id: 'combo-vip', name: 'Combo VIP', price: 149.99, originalPrice: 199.99, description: '25.000 Moedas VIP + Sócio 30 Dias + Carro VIP Exclusivo', category: 'combos', popular: true },
    { id: 'combo-elite', name: 'Combo Elite', price: 399.99, originalPrice: 599.99, description: '100.000 Moedas VIP + Sócio Permanente + Skin VIP Lendária + Casa VIP Luxuosa', category: 'combos', popular: true }
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = product.category === activeFilter
    return matchesSearch && matchesFilter
  })

  const addToCart = (product: any) => {
    setCart(prev => [...prev, product])
    setShowCart(true)
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const clearCart = () => {
    setCart([])
    setShowCart(false)
  }

  const handleCheckout = () => {
    setShowCheckout(true)
    setShowCart(false)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background effects - IGUAL AO FOOTER */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-[900px] h-[900px] bg-gradient-to-br from-starling-600/15 to-transparent rounded-full blur-[120px]"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-purple-600/15 to-transparent rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg">
        <Container>
          <div className="flex items-center justify-between py-4">
            {/* Left Section */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 group"
              >
                <span className="material-icons group-hover:-translate-x-1 transition-transform duration-200">arrow_back</span>
                <span className="font-medium">Voltar ao Site</span>
              </button>
              
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-starling-600 to-red-600 rounded-lg flex items-center justify-center">
                  <span className="material-icons text-white text-sm">store</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Starling Store</h1>
                  <p className="text-xs text-gray-400">Loja Oficial</p>
                </div>
              </div>
            </div>

            {/* Center Section - Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="w-full px-4 py-2 pl-10 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:border-starling-500/50 focus:outline-none focus:ring-2 focus:ring-starling-500/20 text-sm"
                />
                <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  search
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* User Menu */}
              {isAuthenticated && user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 px-3 py-2 bg-white/5 border border-white/10 rounded-lg">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                          <SkinImage 
                            skinId={(user as any).skin || 0} 
                            nick={user.nick}
                            className="w-full h-full object-cover object-top"
                            style={{ transform: 'scale(3.5) translateY(-20px)' }}
                          />
                        </div>
                    <div className="hidden sm:block">
                      <div className="text-sm font-medium text-white">{user.nick}</div>
                      <div className="text-xs text-gray-300 flex items-center gap-1">
                        <span className="material-icons text-xs">monetization_on</span>
                        {user.moedas.toLocaleString()} Moedas
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => logout()}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                    title="Sair"
                  >
                    <span className="material-icons text-sm">logout</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                >
                  <span className="material-icons text-sm">person</span>
                  <span className="hidden sm:block text-sm font-medium">Entrar</span>
                </button>
              )}
              
              {/* Favorites */}
              <button className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200">
                <span className="material-icons text-lg">favorite_border</span>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              
              {/* Cart */}
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
              >
                <span className="material-icons text-lg">shopping_cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-starling-600 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </button>
              
              {/* Menu Toggle for Mobile */}
              <button className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200">
                <span className="material-icons">menu</span>
              </button>
            </div>
          </div>
        </Container>
      </div>
      
      <main className="pt-20 relative z-10 bg-transparent">
        <Container>
          {/* Header */}
          <div className="text-center py-20">
            <h1 className="text-6xl md:text-7xl font-orbitron font-black text-white mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-starling-400 via-red-500 to-starling-400 bg-clip-text text-transparent">
                STORE
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-lg mx-auto leading-relaxed font-light">
              Produtos exclusivos para sua jornada
            </p>
          </div>

          {/* Category Filters */}
          <div className="mb-16">
            <div className="flex gap-3 flex-wrap justify-center">
              <button
                onClick={() => setActiveFilter('moedas')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === 'moedas' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30' 
                    : 'text-gray-400 hover:text-green-400 hover:bg-gray-800/30'
                }`}
              >
                <span className="material-icons text-sm mr-2">monetization_on</span>
                Moedas VIP
              </button>
              <button
                onClick={() => setActiveFilter('socios')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === 'socios' 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/30' 
                    : 'text-gray-400 hover:text-yellow-400 hover:bg-gray-800/30'
                }`}
              >
                <span className="material-icons text-sm mr-2">workspace_premium</span>
                Sócios
              </button>
              <button
                onClick={() => setActiveFilter('vip')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === 'vip' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30' 
                    : 'text-gray-400 hover:text-purple-400 hover:bg-gray-800/30'
                }`}
              >
                <span className="material-icons text-sm mr-2">star</span>
                VIP
              </button>
              <button
                onClick={() => setActiveFilter('combos')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === 'combos' 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30' 
                    : 'text-gray-400 hover:text-blue-400 hover:bg-gray-800/30'
                }`}
              >
                <span className="material-icons text-sm mr-2">card_giftcard</span>
                Combos
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="group relative bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 hover:border-starling-500/50 hover:bg-gray-900/50 transition-all duration-300"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Popular Badge */}
                {product.popular && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    POPULAR
                  </div>
                )}

                {/* Product Icon */}
                {product.category === 'moedas' ? (
                  <div className="mb-4 flex justify-center">
                    <img 
                      src={`/images/${(() => {
                        if (product.name.includes('5KM')) return '5KM';
                        if (product.name.includes('15KM')) return '15KM';
                        if (product.name.includes('25KM')) return '25KM';
                        if (product.name.includes('50KM')) return '50KM';
                        if (product.name.includes('75KM')) return '75KM';
                        if (product.name.includes('100KM')) return '100KM';
                        return '1KM';
                      })()}.png`}
                      alt={product.name}
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                ) : product.category === 'socios' && product.name.includes('Starling') ? (
                  <div className="mb-4 flex justify-center">
                    <div className="w-32 h-32 bg-slate-700 border-2 border-red-500 flex flex-col items-center justify-center">
                      <div className="text-red-500 font-black text-xl tracking-tight leading-none" style={{ fontWeight: '900', fontSize: '1.5rem' }}>SOCIO</div>
                      <div className="text-red-500 font-black text-xl tracking-tight leading-none" style={{ fontWeight: '900', fontSize: '1.5rem' }}>STARLING</div>
                    </div>
                  </div>
                ) : product.category === 'socios' ? (
                  <div className="mb-4 flex justify-center">
                    <div className="w-32 h-32 bg-slate-700 border-2 border-red-500 flex flex-col items-center justify-center">
                      <div className="text-red-500 font-black text-xl tracking-tight leading-none" style={{ fontWeight: '900', fontSize: '1.5rem' }}>SOCIO</div>
                      <div className="text-red-500 font-black text-xl tracking-tight leading-none" style={{ fontWeight: '900', fontSize: '1.5rem' }}>
                        {product.name.includes('Patrocinador') && 'PATRO'}
                        {product.name.includes('Especial') && 'ESPECIAL'}
                        {product.name.includes('Comum') && 'COMUM'}
                      </div>
                    </div>
                  </div>
                ) : product.category === 'vip' ? (
                  <div className="mb-4 flex justify-center">
                    <div className="w-32 h-32 bg-slate-700 border-2 border-red-500 flex flex-col items-center justify-center">
                      <div className="text-red-500 font-black text-xl tracking-tight leading-none" style={{ fontWeight: '900', fontSize: '1.5rem' }}>VIP</div>
                      <div className="text-red-500 font-black text-xl tracking-tight leading-none" style={{ fontWeight: '900', fontSize: '1.5rem' }}>
                        {product.name.includes('Comum') && 'COMUM'}
                        {product.name.includes('Premium') && 'PREMIUM'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-800/50 rounded-xl p-4 mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-starling-400">
                        {product.category === 'combos' && 'COMBO'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Product Info */}
                <div className="mb-4">
                  <h3 className="text-white font-medium mb-2 text-sm">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <div className="text-green-400 font-bold text-lg">
                      R$ {product.price.toFixed(2)}
                    </div>
                    {product.originalPrice && (
                      <div className="text-gray-500 text-xs line-through">
                        R$ {product.originalPrice.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        setShowLogin(true);
                        return;
                      }
                      addToCart(product);
                      alert(`${product.name} adicionado ao carrinho!`);
                    }}
                    className="flex-1 bg-gradient-to-r from-starling-600 to-red-600 hover:from-starling-700 hover:to-red-700 text-white py-2 px-3 rounded-lg font-medium text-xs transition-all duration-200"
                  >
                    {isAuthenticated ? 'Adicionar' : 'Entrar para Comprar'}
                  </button>
                  <button className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 text-white py-2 px-3 rounded-lg font-medium text-xs transition-all duration-200 border border-gray-600/30">
                    Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium text-white mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-400 text-sm mb-6">
                Tente ajustar os filtros ou buscar por outros termos
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveFilter('moedas')
                }}
                className="px-4 py-2 bg-gradient-to-r from-starling-600 to-red-600 hover:from-starling-700 hover:to-red-700 text-white font-medium rounded-full text-sm transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          )}

          {/* Back to Site Button */}
          <div className="text-center py-12">
            <button
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
            >
              <span className="material-icons">home</span>
              <span>Voltar ao Site Principal</span>
            </button>
          </div>

        </Container>
      </main>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-gray-900 border border-starling-600/30 rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-white">Carrinho</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm">Carrinho vazio</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm">{item.name}</h3>
                      <p className="text-green-400 font-bold">R$ {item.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <span className="material-icons text-sm">delete</span>
                    </button>
                  </div>
                ))}
                
                <div className="border-t border-gray-700/50 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-medium">Total:</span>
                    <span className="text-green-400 font-bold text-lg">
                      R$ {cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={clearCart}
                      className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 text-white py-2 px-3 rounded-lg font-medium text-sm transition-colors"
                    >
                      Limpar
                    </button>
                    <button
                      onClick={handleCheckout}
                      className="flex-1 bg-gradient-to-r from-starling-600 to-red-600 hover:from-starling-700 hover:to-red-700 text-white py-2 px-3 rounded-lg font-medium text-sm transition-colors"
                    >
                      Finalizar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-gray-900 border border-starling-600/30 rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-white">Finalizar Compra</h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-green-400 font-bold text-2xl mb-4">
                  R$ {cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                </p>
                <p className="text-gray-400 text-sm">
                  Integração com Mercado Pago em breve
                </p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 text-white py-2 px-3 rounded-lg font-medium text-sm transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setShowCheckout(false)
                    setCart([])
                    alert('Compra finalizada com sucesso!')
                  }}
                  className="flex-1 bg-gradient-to-r from-starling-600 to-red-600 hover:from-starling-700 hover:to-red-700 text-white py-2 px-3 rounded-lg font-medium text-sm transition-colors"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={(userData) => {
          const token = localStorage.getItem('auth_token') || '';
          const rememberMe = userData.rememberMe || false;
          login(userData, token, rememberMe);
          setShowLogin(false);
        }}
      />

      {/* Chat IA */}
      <GeminiChat 
        isOpen={showChat} 
        onClose={() => setShowChat(false)} 
        products={products}
        userData={user}
      />

          {/* Botão Flutuante do Chat */}
          <button
            onClick={() => setShowChat(true)}
            className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-starling-600 to-red-600 hover:from-starling-700 hover:to-red-700 text-white rounded-2xl shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group backdrop-blur-sm border border-gray-600/20"
            title="Assistente IA"
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #dc2626 100%)',
              boxShadow: '0 8px 32px rgba(37, 99, 235, 0.4), 0 0 0 1px rgba(255,255,255,0.05)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <span className="material-icons text-xl group-hover:scale-110 transition-transform duration-200">
              smart_toy
            </span>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-starling-400 rounded-full border-2 border-black animate-pulse"></div>
          </button>
    </div>
  )
}
