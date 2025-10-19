import { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  background?: 'default' | 'dark' | 'gradient'
  id?: string
}

export function Section({ 
  className, 
  children, 
  padding = 'lg',
  background = 'default',
  id,
  ...props 
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'w-full',
        {
          'py-8': padding === 'sm',
          'py-12': padding === 'md',
          'py-16': padding === 'lg',
          'py-24': padding === 'xl',
        },
        {
          'bg-dark-900': background === 'default',
          'bg-dark-800': background === 'dark',
          'bg-gradient-starling': background === 'gradient',
        },
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
