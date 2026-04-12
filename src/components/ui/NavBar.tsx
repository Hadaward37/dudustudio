'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      padding: scrolled ? '12px 0' : '20px 0',
      background: scrolled ? 'rgba(5,5,8,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'all 0.4s ease'
    }}>
      <div style={{
        maxWidth: 1240,
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>

        {/* LOGO — cubo 3D + nome */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>

          {/* CUBO 3D CSS ANIMADO */}
          <div style={{
            width: 36, height: 36,
            position: 'relative',
            transformStyle: 'preserve-3d',
            animation: 'spinCube 8s linear infinite',
            flexShrink: 0
          }}>
            {(['front', 'back', 'left', 'right', 'top', 'bottom'] as const).map((face, i) => (
              <div key={face} style={{
                position: 'absolute',
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-head, Syne, sans-serif)',
                fontWeight: 800, fontSize: 13,
                border: '1px solid rgba(37,99,235,0.4)',
                borderRadius: 4,
                background: 'rgba(37,99,235,0.15)',
                color: '#fff',
                transform: [
                  'translateZ(18px)',
                  'rotateY(180deg) translateZ(18px)',
                  'rotateY(-90deg) translateZ(18px)',
                  'rotateY(90deg) translateZ(18px)',
                  'rotateX(90deg) translateZ(18px)',
                  'rotateX(-90deg) translateZ(18px)',
                ][i]
              }}>
                {['D', 'S', 'U', 'D', 'U', 'S'][i]}
              </div>
            ))}
          </div>

          {/* NOME */}
          <span style={{
            fontFamily: 'var(--font-head, Syne, sans-serif)',
            fontSize: 20,
            fontWeight: 700
          }}>
            <span style={{ color: '#ffffff' }}>Dudu</span>
            <span style={{ color: '#2563EB' }}>Studio</span>
          </span>
        </Link>

        {/* LINKS DE NAVEGAÇÃO — desktop */}
        <ul style={{
          display: 'flex',
          gap: 4,
          alignItems: 'center',
          listStyle: 'none',
          margin: 0, padding: 0
        }}
          className="nav-links-desktop"
        >
          {[
            { label: 'Sobre', href: '/#sobre' },
            { label: 'Serviços', href: '/#servicos' },
            { label: 'Demos', href: '/trabalhos' },
            { label: 'Processo', href: '/#processo' },
            { label: 'DuduShield™', href: '/dudushield' },
          ].map(link => (
            <li key={link.label}>
              <Link href={link.href} style={{
                padding: '8px 16px',
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 500,
                color: link.label === 'DuduShield™' ? 'rgba(37,99,235,0.9)' : 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                transition: 'all 0.3s',
                display: 'block'
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = '#fff'
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = link.label === 'DuduShield™' ? 'rgba(37,99,235,0.9)' : 'rgba(255,255,255,0.7)'
                  ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* CTA CONTATO */}
          <li>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent('Olá! Vim pelo DuduStudio.')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 24px',
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 600,
                background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
                color: '#fff',
                textDecoration: 'none',
                display: 'block',
                transition: 'opacity 0.3s'
              }}
            >
              Contato
            </a>
          </li>
        </ul>

        {/* MENU MOBILE — hamburger */}
        <button
          className="nav-hamburger"
          style={{
            flexDirection: 'column',
            gap: 5, padding: 4,
            background: 'none', border: 'none',
            cursor: 'pointer'
          }}
          aria-label="Menu"
        >
          <span style={{ display: 'block', width: 24, height: 2, background: '#fff', borderRadius: 2 }}></span>
          <span style={{ display: 'block', width: 24, height: 2, background: '#fff', borderRadius: 2 }}></span>
          <span style={{ display: 'block', width: 24, height: 2, background: '#fff', borderRadius: 2 }}></span>
        </button>

      </div>
    </nav>
  )
}
