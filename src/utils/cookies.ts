// Utilitários para gerenciar cookies de forma segura

export interface CookieOptions {
  expires?: Date;
  maxAge?: number; // em segundos
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export class CookieManager {
  // Definir um cookie
  static set(name: string, value: string, options: CookieOptions = {}): void {
    if (typeof window === 'undefined') return; // SSR safety
    
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    
    if (options.expires) {
      cookieString += `; expires=${options.expires.toUTCString()}`;
    }
    
    if (options.maxAge !== undefined) {
      cookieString += `; max-age=${options.maxAge}`;
    }
    
    if (options.path) {
      cookieString += `; path=${options.path}`;
    }
    
    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }
    
    if (options.secure) {
      cookieString += '; secure';
    }
    
    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`;
    }
    
    document.cookie = cookieString;
  }
  
  // Obter um cookie
  static get(name: string): string | null {
    if (typeof window === 'undefined') return null; // SSR safety
    
    const nameEQ = encodeURIComponent(name) + '=';
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  }
  
  // Remover um cookie
  static remove(name: string, path?: string, domain?: string): void {
    if (typeof window === 'undefined') return; // SSR safety
    
    let cookieString = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    
    if (path) {
      cookieString += `; path=${path}`;
    }
    
    if (domain) {
      cookieString += `; domain=${domain}`;
    }
    
    document.cookie = cookieString;
  }
  
  // Verificar se um cookie existe
  static has(name: string): boolean {
    return this.get(name) !== null;
  }
  
  // Obter todos os cookies como objeto
  static getAll(): Record<string, string> {
    if (typeof window === 'undefined') return {}; // SSR safety
    
    const cookies: Record<string, string> = {};
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      const eqIndex = c.indexOf('=');
      if (eqIndex > 0) {
        const name = decodeURIComponent(c.substring(0, eqIndex));
        const value = decodeURIComponent(c.substring(eqIndex + 1));
        cookies[name] = value;
      }
    }
    
    return cookies;
  }
}

// Funções específicas para autenticação
export const AuthCookies = {
  // Salvar dados de login
  saveLogin: (userData: any, token: string, rememberMe: boolean = false) => {
    const cookieOptions: CookieOptions = {
      path: '/',
      secure: window.location.protocol === 'https:',
      sameSite: 'lax'
    };
    
    // Se "lembrar-me" estiver marcado, cookie expira em 30 dias
    // Senão, expira quando o navegador fechar
    if (rememberMe) {
      cookieOptions.maxAge = 30 * 24 * 60 * 60; // 30 dias em segundos
    }
    
    CookieManager.set('starling_auth_token', token, cookieOptions);
    CookieManager.set('starling_user_data', JSON.stringify(userData), cookieOptions);
    CookieManager.set('starling_remember_me', rememberMe.toString(), cookieOptions);
  },
  
  // Obter dados de login
  getLogin: (): { userData: any; token: string; rememberMe: boolean } | null => {
    const token = CookieManager.get('starling_auth_token');
    const userDataStr = CookieManager.get('starling_user_data');
    const rememberMeStr = CookieManager.get('starling_remember_me');
    
    if (!token || !userDataStr) {
      return null;
    }
    
    try {
      const userData = JSON.parse(userDataStr);
      const rememberMe = rememberMeStr === 'true';
      
      return { userData, token, rememberMe };
    } catch (error) {
      console.error('Erro ao parsear dados do cookie:', error);
      AuthCookies.clearLogin();
      return null;
    }
  },
  
  // Limpar dados de login
  clearLogin: () => {
    try {
      console.log('🧹 Limpando cookies de autenticação...');
      
      // Remover cookies com diferentes configurações para garantir limpeza completa
      CookieManager.remove('starling_auth_token', '/');
      CookieManager.remove('starling_user_data', '/');
      CookieManager.remove('starling_remember_me', '/');
      
      // Tentar remover com diferentes paths
      CookieManager.remove('starling_auth_token', '/loja');
      CookieManager.remove('starling_user_data', '/loja');
      CookieManager.remove('starling_remember_me', '/loja');
      
      // Tentar remover sem path (fallback)
      CookieManager.remove('starling_auth_token');
      CookieManager.remove('starling_user_data');
      CookieManager.remove('starling_remember_me');
      
      console.log('✅ Cookies de autenticação limpos');
    } catch (error) {
      console.error('❌ Erro ao limpar cookies:', error);
    }
  },
  
  // Verificar se há dados salvos
  hasLoginData: (): boolean => {
    return CookieManager.has('starling_auth_token') && CookieManager.has('starling_user_data');
  },
  
  // Limpeza completa e forçada (para logout)
  forceCleanup: () => {
    try {
      console.log('🧹 Limpeza forçada de todos os dados de autenticação...');
      
      if (typeof window !== 'undefined') {
        // Limpar cookies primeiro
        AuthCookies.clearLogin();
        
        // Lista completa de chaves para remover
        const keysToRemove = [
          'auth_token',
          'user_data', 
          'starling_auth_token',
          'starling_user_data',
          'starling_remember_me',
          'token',
          'user',
          'login_data'
        ];
        
        // Limpar localStorage
        keysToRemove.forEach(key => {
          try {
            localStorage.removeItem(key);
            console.log(`🗑️ Removido do localStorage: ${key}`);
          } catch (e) {
            console.log(`⚠️ Erro ao remover ${key} do localStorage:`, e);
          }
        });
        
        // Limpar sessionStorage
        keysToRemove.forEach(key => {
          try {
            sessionStorage.removeItem(key);
            console.log(`🗑️ Removido do sessionStorage: ${key}`);
          } catch (e) {
            console.log(`⚠️ Erro ao remover ${key} do sessionStorage:`, e);
          }
        });
        
        // Tentar limpar todos os cookies manualmente
        document.cookie.split(";").forEach(cookie => {
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
          if (name.includes('starling') || name.includes('auth') || name.includes('token')) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/loja`;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=${window.location.hostname}`;
            console.log(`🗑️ Cookie removido: ${name}`);
          }
        });
        
        console.log('✅ Limpeza forçada concluída');
      }
    } catch (error) {
      console.error('❌ Erro na limpeza forçada:', error);
    }
  }
};

export default CookieManager;
