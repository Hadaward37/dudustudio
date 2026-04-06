'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Syne, Manrope } from 'next/font/google'

const syne    = Syne({ subsets: ['latin'], weight: ['400', '700', '800'], variable: '--font-syne' })
const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400'], variable: '--font-manrope' })

const ACCENT = '#00ff88'

export default function HubPage() {
  const router  = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scrolled, setScrolled] = useState(false)

  // Perspective grid animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let offset = 0

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const vx = W / 2   // vanishing point x
      const vy = H * 0.5 // vanishing point y
      const COLS = 10
      const ROWS = 12
      const speed = 0.4

      offset = (offset + speed) % (H / ROWS)

      ctx.strokeStyle = `rgba(0,255,136,0.06)`
      ctx.lineWidth = 1

      // Vertical lines (converge to VP)
      for (let i = 0; i <= COLS; i++) {
        const t   = i / COLS
        const bx  = W * t
        ctx.beginPath()
        ctx.moveTo(vx + (bx - vx) * 0.01, vy)
        ctx.lineTo(bx, H)
        ctx.stroke()
      }

      // Horizontal lines (perspective rows, scrolling toward viewer)
      for (let r = 0; r <= ROWS; r++) {
        const raw = r / ROWS
        const p   = ((raw + offset / H) % 1)
        // perspective: near bottom = p close to 1
        const ease = Math.pow(p, 2.2)
        const y    = vy + (H - vy) * ease
        const spread = (y - vy) / (H - vy)
        const x0  = vx - (vx) * spread
        const x1  = vx + (W - vx) * spread

        ctx.beginPath()
        ctx.moveTo(x0, y)
        ctx.lineTo(x1, y)
        ctx.stroke()
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`${syne.variable} ${manrope.variable}`}
      style={{ background: '#080808', minHeight: '100vh', color: '#fff', overflow: 'hidden', animation: 'pageIn 0.45s ease both' }}
    >
      {/* Grid canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(1.5rem, 5vw, 4rem)', height: 60,
        background: scrolled ? 'rgba(8,8,8,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.35s',
      }}>
        <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em' }}>
          DuduStudio
        </span>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[
            { label: 'Início', href: '/' },
            { label: 'Sites',  href: '/sites' },
          ].map(({ label, href }) => (
            <button
              key={label}
              onClick={() => router.push(href)}
              style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              {label}
            </button>
          ))}
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-manrope)', fontSize: '0.85rem', color: ACCENT, textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Contato
          </a>
        </div>
      </nav>

      {/* Hero center */}
      <main style={{
        position: 'relative', zIndex: 10,
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
        gap: '1.25rem',
      }}>
        {/* Label */}
        <span style={{
          fontFamily: 'var(--font-manrope)', fontWeight: 400,
          fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: ACCENT, opacity: 0, animation: 'fadeUp 0.6s ease 0.1s both',
        }}>
          Estúdio Digital
        </span>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-syne)', fontWeight: 800,
          fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
          lineHeight: 1.06, letterSpacing: '-0.03em',
          margin: 0,
          opacity: 0, animation: 'fadeUp 0.65s ease 0.2s both',
        }}>
          Sites que Param<br />o Scroll.
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'var(--font-manrope)', fontWeight: 300,
          fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
          color: 'rgba(255,255,255,0.45)', maxWidth: 480, lineHeight: 1.75,
          margin: 0,
          opacity: 0, animation: 'fadeUp 0.65s ease 0.32s both',
        }}>
          Cada negócio merece um site único. Criamos experiências digitais
          que fazem seu cliente parar, olhar e comprar.
        </p>

        {/* CTA */}
        <button
          onClick={() => router.push('/sites')}
          style={{
            marginTop: '0.5rem',
            padding: '0.85rem 2.2rem',
            borderRadius: 999,
            background: ACCENT,
            color: '#080808',
            fontFamily: 'var(--font-syne)', fontWeight: 800,
            fontSize: '0.95rem', letterSpacing: '-0.01em',
            border: 'none', cursor: 'pointer',
            boxShadow: `0 0 28px ${ACCENT}44`,
            transition: 'transform 0.2s, box-shadow 0.2s',
            opacity: 0, animation: 'fadeUp 0.65s ease 0.44s both',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = `0 0 44px ${ACCENT}66` }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.boxShadow = `0 0 28px ${ACCENT}44` }}
        >
          Ver nosso trabalho →
        </button>
      </main>

      <style>{`
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
