'use client'

import { useEffect, useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}

export function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  distance = 50 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active')
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getTransformOrigin = () => {
    switch (direction) {
      case 'up': return 'translateY(50px)'
      case 'down': return 'translateY(-50px)'
      case 'left': return 'translateX(50px)'
      case 'right': return 'translateX(-50px)'
      default: return 'translateY(50px)'
    }
  }

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{
        transform: getTransformOrigin(),
        transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`
      }}
    >
      {children}
    </div>
  )
}
