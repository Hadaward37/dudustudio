'use client'

import { useEffect } from 'react'

export function AntiClone() {
  useEffect(() => {
    // 1. Detecta se está sendo carregado em iframe
    if (window.self !== window.top) {
      document.body.innerHTML =
        '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#666;">Este conteúdo não pode ser exibido em iframe.</div>'
      return
    }

    // 2. Marca d'água invisível no código
    const watermark = document.createElement('meta')
    watermark.name = 'generator'
    watermark.content = 'DuduStudio — dudustudio-eight.vercel.app'
    document.head.appendChild(watermark)

    // 3. Detecta domínio — se clonar e hospedar em outro lugar
    const allowedDomains = [
      'localhost',
      'dudustudio-eight.vercel.app',
      'dudustudio.vercel.app',
      'dudustudio.com.br',
    ]

    const currentDomain = window.location.hostname
    const isAllowed = allowedDomains.some(
      (d) => currentDomain === d || currentDomain.endsWith('.' + d),
    )

    if (!isAllowed && process.env.NODE_ENV === 'production') {
      console.warn(
        '⚠️ DuduStudio: Este site foi criado por DuduStudio.',
        'dudustudio-eight.vercel.app',
      )
    }

    // 4. Bloqueia atalhos de cópia nas rotas /demo/*
    if (window.location.pathname.startsWith('/demo')) {
      const handler = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'u') e.preventDefault()
        if (e.ctrlKey && e.key === 's') e.preventDefault()
      }
      document.addEventListener('keydown', handler)
      return () => document.removeEventListener('keydown', handler)
    }
  }, [])

  return null
}
