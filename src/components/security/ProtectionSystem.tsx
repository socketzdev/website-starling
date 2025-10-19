'use client'

import { useEffect } from 'react'

export function ProtectionSystem() {
  useEffect(() => {
    // 1. Desabilitar DevTools
    const disableDevTools = () => {
      // Bloquear F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      document.addEventListener('keydown', (e) => {
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'J') ||
          (e.ctrlKey && e.key === 'U') ||
          (e.ctrlKey && e.key === 'S')
        ) {
          e.preventDefault()
          e.stopPropagation()
          return false
        }
      })


      // Detectar DevTools aberto
      let devtools = { open: false }
      const threshold = 160

      setInterval(() => {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
          if (!devtools.open) {
            devtools.open = true
            // Mostrar aviso temporário
            const originalDisplay = document.body.style.display
            document.body.style.display = 'none'
            setTimeout(() => {
              document.body.style.display = originalDisplay
              devtools.open = false
            }, 1000)
          }
        } else {
          devtools.open = false
        }
      }, 500)
    }

    // 2. Sistema de identificação de dispositivos
    const generateFingerprint = () => {
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.textBaseline = 'top'
          ctx.font = '14px Arial'
          ctx.fillText('Starling RPG Protection', 2, 2)
        }
        
        const fingerprint = {
          userAgent: navigator.userAgent,
          language: navigator.language,
          platform: navigator.platform,
          screen: `${screen.width}x${screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          canvas: canvas.toDataURL(),
          timestamp: Date.now()
        }
        
        // Salvar fingerprint no localStorage (opcional)
        localStorage.setItem('device_fingerprint', btoa(JSON.stringify(fingerprint)))
        
        return btoa(JSON.stringify(fingerprint))
      } catch (error) {
        console.log('Fingerprint generation failed:', error)
        return null
      }
    }

    // Executar proteções
    disableDevTools()
    generateFingerprint()

  }, [])

  return null
}
