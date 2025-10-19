import { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function Container({ 
  className, 
  children, 
  size = 'lg',
  ...props 
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        {
          'max-w-3xl': size === 'sm',
          'max-w-4xl': size === 'md',
          'max-w-7xl': size === 'lg',
          'max-w-none': size === 'xl',
          'w-full': size === 'full',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
