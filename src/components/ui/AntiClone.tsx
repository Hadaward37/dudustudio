'use client'

import { useEffect, useState } from 'react'

export function AntiClone() {
  const [isIframe, setIsIframe] = useState(false)

  useEffect(() => {
    if (window.self !== window.top) {
      setIsIframe(true)
      return
    }

    const watermark = document.createElement('meta')
    watermark.name = 'generator'
    watermark.content = 'DuduStudio — dudustudio-eight.vercel.app'
    document.head.appendChild(watermark)

    const envDomains = process.env.NEXT_PUBLIC_ALLOWED_DOMAINS?.split(',') ?? []
    const defaultDomains = ['localhost', 'dudustudio-eight.vercel.app']
    const allowedDomains = [...defaultDomains, ...envDomains]
    const currentDomain = window.location.hostname
    const isAllowed = allowedDomains.some(
      (d) => currentDomain === d || currentDomain.endsWith('.' + d),
    )

    if (!isAllowed && process.env.NODE_ENV === 'production') {
      console.warn('⚠️ DuduStudio: Site protegido pelo DuduShield™.')
    }

    if (window.location.pathname.startsWith('/demo')) {
      const handler = (e: KeyboardEvent) => {
        if (e.ctrlKey && (e.key === 'u' || e.key === 's')) {
          e.preventDefault()
        }
      }
      document.addEventListener('keydown', handler)
      return () => document.removeEventListener('keydown', handler)
    }
  }, [])

  if (isIframe) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          fontFamily: 'sans-serif',
          color: '#666',
          gap: '1rem',
        }}
      >
        <div style={{ fontSize: '2rem' }}>🔒</div>
        <div style={{ fontSize: '1rem', color: '#888' }}>
          Conteúdo protegido pelo DuduShield™
        </div>
        <div style={{ fontSize: '0.75rem', color: '#555' }}>
          dudustudio-eight.vercel.app
        </div>
      </div>
    )
  }

  return null
}
