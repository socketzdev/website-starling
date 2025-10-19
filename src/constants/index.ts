// Server Information
export const SERVER_INFO = {
  NAME: 'Starling RPG',
  TAGLINE: 'O servidor de RPG mais emocionante do SA:MP',
  IP: 'starling-rpg.com',
  PORT: 7777,
  MAX_PLAYERS: 1000,
  VERSION: '0.3.7',
  LANGUAGE: 'Português',
  WEBSITE: 'https://starling-rpg.com',
  DISCORD: 'https://discord.gg/starling-rpg',
  INSTAGRAM: 'https://instagram.com/starlingrpg',
  YOUTUBE: 'https://youtube.com/@starlingrpg'
} as const

// Navigation Links
export const NAVIGATION_LINKS = [
  { label: 'Início', href: '#home' },
  { label: 'Servidor', href: '#server' },
  { label: 'Loja', href: '#shop' },
  { label: 'Contato', href: '#contact' }
] as const

// Server Features
export const SERVER_FEATURES = [
  {
    title: 'Sistema de RPG Completo',
    description: 'Viva a vida de um cidadão em Los Santos com sistema de emprego, propriedades e economia realista.',
    icon: '🏙️'
  },
  {
    title: 'Mais de 1000 Slots',
    description: 'Suporte para até 1000 jogadores simultâneos com servidor estável e sem lag.',
    icon: '👥'
  },
  {
    title: 'Anticheat Avançado',
    description: 'Sistema de anticheat robusto que garante fair play para todos os jogadores.',
    icon: '🛡️'
  },
  {
    title: 'Suporte 24/7',
    description: 'Equipe de administradores disponível 24 horas por dia para ajudar os jogadores.',
    icon: '⚡'
  },
  {
    title: 'Eventos Diários',
    description: 'Participe de eventos especiais todos os dias com prêmios incríveis.',
    icon: '🎉'
  },
  {
    title: 'Sistema de Clãs',
    description: 'Crie ou entre em clãs e participe de guerras épicas pela cidade.',
    icon: '⚔️'
  }
] as const

// Shop Categories
export const SHOP_CATEGORIES = [
  { id: 'vehicles', name: 'Veículos', icon: '🚗' },
  { id: 'properties', name: 'Propriedades', icon: '🏠' },
  { id: 'weapons', name: 'Armas', icon: '🔫' },
  { id: 'clothing', name: 'Roupas', icon: '👕' },
  { id: 'misc', name: 'Diversos', icon: '🎁' }
] as const

// API Endpoints
export const API_ENDPOINTS = {
  HEALTH: '/api/health',
  SERVER_INFO: '/api/server-info',
  PLAYERS: '/api/players',
  SHOP: '/api/shop',
  AUTH: '/api/auth'
} as const

// Theme Colors
export const THEME_COLORS = {
  PRIMARY: '#dc2626', // starling-600
  PRIMARY_DARK: '#b91c1c', // starling-700
  PRIMARY_LIGHT: '#f87171', // starling-400
  BACKGROUND: '#0f172a', // dark-900
  SURFACE: '#1e293b', // dark-800
  BORDER: '#334155' // dark-700
} as const

// Animation Durations
export const ANIMATION_DURATION = {
  FAST: '150ms',
  NORMAL: '200ms',
  SLOW: '300ms'
} as const
