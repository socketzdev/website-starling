// Application Configuration
export const APP_CONFIG = {
  // Basic app info
  name: 'Starling RPG',
  description: 'Servidor de RPG para San Andreas Multiplayer',
  version: '1.0.0',
  author: 'Starling RPG Team',
  
  // URLs
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  
  // Features
  features: {
    serverStatus: true,
    shop: true,
    userAuth: false, // Will be implemented later
    adminPanel: false, // Will be implemented later
    news: false, // Will be implemented later
  },
  
  // Server settings
  server: {
    ip: 'starling-rpg.com',
    port: 7777,
    maxPlayers: 1000,
    version: '0.3.7',
    language: 'Português',
  },
  
  // Social links
  social: {
    discord: 'https://discord.gg/starling-rpg',
    instagram: 'https://instagram.com/starlingrpg',
    youtube: 'https://youtube.com/@starlingrpg',
    twitter: 'https://twitter.com/starlingrpg',
  },
  
  // SEO
  seo: {
    title: 'Starling RPG - SA:MP Server',
    description: 'Servidor de RPG para San Andreas Multiplayer com mais de 1000 slots',
    keywords: [
      'SA:MP',
      'San Andreas',
      'Multiplayer',
      'RPG',
      'Starling',
      'Los Santos',
      'GTA',
      'Servidor',
      'Brasil'
    ],
    ogImage: '/og-image.png',
  },
  
  // Analytics (will be configured later)
  analytics: {
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
    googleTagManager: process.env.NEXT_PUBLIC_GTM_ID,
  },
  
  // Cache settings
  cache: {
    serverStatus: 30000, // 30 seconds
    playerList: 10000,   // 10 seconds
    shopItems: 300000,   // 5 minutes
  }
} as const
