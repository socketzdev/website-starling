'use client';

import { useState } from 'react';
import { LoginConfirmation } from './LoginConfirmation';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [formData, setFormData] = useState({
    nick: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Salvar token no localStorage e cookies
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_data', JSON.stringify(data.user));
        
        // Salvar em cookies se "lembrar-me" estiver marcado
        if (rememberMe) {
          // Importar AuthCookies dinamicamente para evitar problemas de SSR
          const { AuthCookies } = await import('@/utils/cookies');
          AuthCookies.saveLogin(data.user, data.token, rememberMe);
        }
        
        setUserData({ ...data.user, rememberMe });
        setShowConfirmation(true);
      } else {
        setError(data.error || 'Erro ao fazer login');
      }
    } catch (error) {
      setError('Erro de conexão');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleConfirmationContinue = () => {
    setShowConfirmation(false);
    onSuccess(userData);
    onClose();
    setFormData({ nick: '', password: '' });
    setRememberMe(false);
    setUserData(null);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    onClose();
    setFormData({ nick: '', password: '' });
    setRememberMe(false);
    setUserData(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Modal de Login - só aparece se não estiver mostrando confirmação */}
      {!showConfirmation && (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-white">Login UCP</h2>
            <p className="text-gray-400 text-sm">Entre com sua conta do servidor</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nick no Servidor
            </label>
            <input
              type="text"
              name="nick"
              value={formData.nick}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:border-starling-500/50 focus:outline-none focus:ring-2 focus:ring-starling-500/20"
              placeholder="Seu nick no Starling RPG"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Senha
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:border-starling-500/50 focus:outline-none focus:ring-2 focus:ring-starling-500/20"
              placeholder="Sua senha"
              required
              disabled={isLoading}
            />
          </div>

          {/* Checkbox Lembrar-me Melhorado */}
          <div className="relative">
            <div className="flex items-center gap-4 p-3 bg-gray-800/30 backdrop-blur-sm border border-gray-600/20 rounded-xl hover:border-starling-500/30 transition-all duration-200 group">
              {/* Checkbox Customizado */}
              <div className="relative">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                  disabled={isLoading}
                />
                <label 
                  htmlFor="rememberMe" 
                  className={`relative w-6 h-6 rounded-lg border-2 cursor-pointer transition-all duration-300 flex items-center justify-center ${
                    rememberMe 
                      ? 'bg-gradient-to-r from-starling-600 to-red-600 border-transparent shadow-lg animate-pulse' 
                      : 'bg-gray-700/50 border-gray-500 group-hover:border-starling-400 hover:scale-105'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={rememberMe ? {
                    background: 'linear-gradient(135deg, #2563eb 0%, #dc2626 100%)',
                    boxShadow: '0 4px 20px rgba(37, 99, 235, 0.5), 0 0 0 1px rgba(255,255,255,0.1)'
                  } : {}}
                >
                  {rememberMe && (
                    <span className="material-icons text-white text-sm animate-in zoom-in duration-300 drop-shadow-lg">
                      check
                    </span>
                  )}
                  {!rememberMe && (
                    <div className="w-2 h-2 rounded-full bg-gray-400 group-hover:bg-starling-400 transition-all duration-200 group-hover:scale-110"></div>
                  )}
                  
                  {/* Efeito de ripple quando marcado */}
                  {rememberMe && (
                    <div className="absolute inset-0 rounded-lg bg-white/20 animate-ping"></div>
                  )}
                </label>
              </div>

              {/* Texto e Ícone */}
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  rememberMe 
                    ? 'bg-gradient-to-r from-starling-600/20 to-red-600/20 scale-110' 
                    : 'bg-gray-700/30 group-hover:scale-105'
                }`}>
                  <span className={`material-icons text-sm transition-all duration-300 ${
                    rememberMe 
                      ? 'text-starling-400 animate-pulse' 
                      : 'text-gray-400 group-hover:text-starling-400 group-hover:scale-110'
                  }`}>
                    {rememberMe ? 'auto_awesome' : 'schedule'}
                  </span>
                </div>
                
                <div className="flex-1">
                  <p className={`text-sm font-medium transition-colors duration-200 ${
                    rememberMe ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  }`}>
                    Lembrar minha conta
                  </p>
                  <p className="text-xs text-gray-400">
                    Login automático por 30 dias
                  </p>
                </div>

                {/* Badge de segurança */}
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-300 ${
                  rememberMe 
                    ? 'bg-green-600/30 border border-green-600/50 scale-105' 
                    : 'bg-green-600/20 border border-green-600/30 group-hover:scale-105'
                }`}>
                  <span className={`material-icons text-xs transition-all duration-300 ${
                    rememberMe ? 'text-green-300 animate-pulse' : 'text-green-400'
                  }`}>
                    {rememberMe ? 'verified' : 'security'}
                  </span>
                  <span className={`text-xs font-medium transition-colors duration-300 ${
                    rememberMe ? 'text-green-300' : 'text-green-400'
                  }`}>
                    {rememberMe ? 'Ativado' : 'Seguro'}
                  </span>
                </div>
              </div>
            </div>

            {/* Dica adicional */}
            {rememberMe && (
              <div className="mt-3 p-3 bg-gradient-to-r from-starling-600/10 to-red-600/10 border border-starling-600/30 rounded-xl animate-in slide-in-from-top-2 duration-300 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-starling-600/20 to-red-600/20 flex items-center justify-center mt-0.5">
                    <span className="material-icons text-starling-400 text-sm animate-pulse">info</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-white font-medium mb-1">
                      🛡️ Proteção Ativada
                    </p>
                    <p className="text-xs text-starling-300 leading-relaxed">
                      Seus dados serão salvos de forma segura em cookies criptografados por 30 dias. 
                      Você poderá fazer login automaticamente em futuras visitas.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400">HTTPS Seguro</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-blue-400">Criptografado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-starling-600 to-red-600 text-white font-medium rounded-lg hover:from-starling-700 hover:to-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Entrando...
              </>
            ) : (
              <>
                <span className="material-icons text-sm">login</span>
                Entrar
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="p-6 pt-0">
          <div className="text-center text-xs text-gray-500">
            <p>Use as mesmas credenciais do seu personagem no servidor</p>
            <p className="mt-1">Starling RPG - Sistema UCP</p>
          </div>
        </div>
        </div>
      )}

      {/* Modal de Confirmação - aparece sobreposto */}
      {showConfirmation && userData && (
        <LoginConfirmation
          userData={userData}
          onContinue={handleConfirmationContinue}
          onClose={handleConfirmationClose}
        />
      )}
    </div>
  );
}
