'use client'

interface HolographicTextProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function HolographicText({ children, className = '', size = 'lg' }: HolographicTextProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  return (
    <span className={`holographic font-black ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  )
}
