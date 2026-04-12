'use client'

import { useEffect, useState } from 'react'

interface Props { onComplete: () => void }

export function Loader({ onComplete }: Props) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        const next = Math.min(p + Math.random() * 18 + 8, 100)
        if (next >= 100) { clearInterval(iv); setTimeout(onComplete, 400) }
        return next
      })
    }, 90)
    return () => clearInterval(iv)
  }, [onComplete])

  const pct = Math.round(Math.min(progress, 100))

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#050508',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, gap: '1.5rem',
    }}>
      <p style={{
        fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2rem',
        letterSpacing: '-0.03em', color: '#f0f0f0',
        animation: 'loaderPulse 1.5s ease-in-out infinite',
      }}>
        Dudu<span style={{ color: '#FF5C00' }}>Studio</span>
      </p>

      <div style={{ width: 240, height: 2, background: 'rgba(255,92,0,0.15)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: 'linear-gradient(90deg, #FF5C00, #FF8C42)',
          borderRadius: 2, transition: 'width 0.12s ease',
        }} />
      </div>

      <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>
        {pct}%
      </span>

      <style>{`@keyframes loaderPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.97)} }`}</style>
    </div>
  )
}
