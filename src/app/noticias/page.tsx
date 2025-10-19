import { Metadata } from 'next'
import { NewsHeader } from '@/components/news/NewsHeader'
import { NewsGrid } from '@/components/news/NewsGrid'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Notícias - Starling RPG',
  description: 'Fique por dentro das últimas novidades e spoilers do servidor Starling RPG',
  keywords: 'Starling RPG, Notícias, Spoilers, SA:MP, Novidades',
}

export default function NoticiasPage() {
  return (
    <>
      <NewsHeader />
      <Section padding="lg" className="relative bg-black overflow-hidden">
        <Container>
          <NewsGrid />
        </Container>
      </Section>
    </>
  )
}
