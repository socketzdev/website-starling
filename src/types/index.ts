// User types
export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  createdAt: Date
  lastLogin?: Date
}

// Server types
export interface ServerInfo {
  ip: string
  port: number
  maxPlayers: number
  currentPlayers: number
  version: string
  map: string
  gamemode: string
  language: string
  website: string
  discord: string
}

// Shop types
export interface ShopItem {
  id: string
  name: string
  description: string
  price: number
  currency: 'USD' | 'BRL' | 'CREDITS'
  category: 'vehicles' | 'properties' | 'weapons' | 'clothing' | 'misc'
  image: string
  inStock: boolean
  featured: boolean
}

// Game types
export interface Player {
  id: string
  name: string
  level: number
  money: number
  score: number
  kills: number
  deaths: number
  playTime: number
  lastSeen: Date
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Component Props types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}
