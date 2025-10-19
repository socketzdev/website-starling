import { NextResponse } from 'next/server'
import { ServerInfo } from '@/types'

export async function GET() {
  // Mock data - será substituído por dados reais do servidor
  const serverInfo: ServerInfo = {
    ip: 'starling-rpg.com',
    port: 7777,
    maxPlayers: 500,
    currentPlayers: 247,
    version: '0.3.7',
    map: 'Los Santos',
    gamemode: 'Starling RPG',
    language: 'Português',
    website: 'https://starling-rpg.com',
    discord: 'https://discord.gg/starling-rpg'
  }

  return NextResponse.json({
    success: true,
    data: serverInfo
  })
}
