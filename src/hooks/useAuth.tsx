'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { AuthCookies } from '@/utils/cookies';

interface User {
  id: number;
  nick: string;
  moedas: number;
  dinheiro: number;
  level: number;
  admin: number;
  vip: number;
  socio: number;
  skin: number;
  lastLogin: number;
  since: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string, rememberMe?: boolean) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      console.log('🔍 Verificando status de autenticação...');
      
      // Primeiro, tentar obter dados dos cookies
      const cookieData = AuthCookies.getLogin();
      
      if (cookieData) {
        const { token, userData } = cookieData;
        console.log('📦 Dados encontrados nos cookies:', { nick: userData.nick, hasToken: !!token });
        
        // Verificar se o token ainda é válido
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          console.log('✅ Token válido, fazendo login automático');
          setUser(userData);
          // Sincronizar com localStorage para compatibilidade
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_data', JSON.stringify(userData));
        } else {
          console.log('❌ Token inválido, limpando dados');
          // Token inválido, limpar dados
          AuthCookies.clearLogin();
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          setUser(null);
        }
      } else {
        console.log('📦 Nenhum dado encontrado nos cookies, verificando localStorage...');
        // Fallback para localStorage se não houver cookies
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');

        if (token && userData) {
          console.log('📦 Dados encontrados no localStorage:', { hasToken: !!token, hasUserData: !!userData });
          
          const response = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });

          if (response.ok) {
            console.log('✅ Token do localStorage válido');
            setUser(JSON.parse(userData));
          } else {
            console.log('❌ Token do localStorage inválido, limpando');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            setUser(null);
          }
        } else {
          console.log('📦 Nenhum dado de autenticação encontrado');
          setUser(null);
        }
      }
    } catch (error) {
      console.error('❌ Erro na verificação de autenticação:', error);
      // Em caso de erro, limpar tudo para garantir estado limpo
      AuthCookies.clearLogin();
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData: User, token: string, rememberMe: boolean = false) => {
    // Salvar em cookies (prioritário)
    AuthCookies.saveLogin(userData, token, rememberMe);
    
    // Manter localStorage para compatibilidade
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(userData));
    
    setUser(userData);
  };

  const logout = async () => {
    console.log('🔄 Iniciando logout...');
    console.log('🔍 Estado atual do usuário:', user);
    
    // Limpar estado primeiro
    setUser(null);
    console.log('✅ Estado do usuário limpo');
    
    // Usar limpeza forçada
    try {
      AuthCookies.forceCleanup();
      console.log('✅ Limpeza forçada concluída');
    } catch (error) {
      console.error('❌ Erro na limpeza forçada:', error);
    }
    
    // Verificar se realmente limpou
    setTimeout(() => {
      console.log('🔍 Verificando dados após limpeza:');
      console.log('localStorage auth_token:', localStorage.getItem('auth_token'));
      console.log('localStorage user_data:', localStorage.getItem('user_data'));
      console.log('Cookies:', document.cookie);
      console.log('🔄 Recarregando página para garantir limpeza...');
      window.location.reload();
    }, 500);
  };

  const refreshUser = async () => {
    // Aqui você pode implementar uma função para atualizar os dados do usuário
    // Por exemplo, buscar dados atualizados da database
    const userData = localStorage.getItem('user_data');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
