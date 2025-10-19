import { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
}

export function Badge({ 
  className, 
  children, 
  variant = 'default',
  size = 'md',
  ...props 
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        {
          'bg-dark-700 text-gray-300': variant === 'default',
          'bg-green-900 text-green-300': variant === 'success',
          'bg-yellow-900 text-yellow-300': variant === 'warning',
          'bg-red-900 text-red-300': variant === 'error',
          'bg-blue-900 text-blue-300': variant === 'info',
        },
        {
          'px-2 py-1 text-xs': size === 'sm',
          'px-3 py-1.5 text-sm': size === 'md',
          'px-4 py-2 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
