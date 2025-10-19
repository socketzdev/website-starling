import { Metadata } from 'next'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { AboutSection } from '@/components/landing/AboutSection'
import { DownloadSection } from '@/components/landing/DownloadSection'
import { DiscordSection } from '@/components/landing/DiscordSection'

export const metadata: Metadata = {
  title: 'Starling RPG - O Melhor Servidor de SA:MP',
  description: 'Viva a melhor experiência de RPG no San Andreas Multiplayer. Mais de 1000 slots, economia realista, facções, empregos e muito mais!',
  keywords: 'SA:MP, San Andreas, Multiplayer, RPG, Starling, Los Santos, GTA, Servidor Brasil, SAMP Brasil',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <DownloadSection />
      <DiscordSection />
    </>
  )
}
