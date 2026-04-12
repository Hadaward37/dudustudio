'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const LINKS = [
  { label: 'Sobre',       href: '/#sobre' },
  { label: 'Serviços',    href: '/#servicos' },
  { label: 'Demos',       href: '/trabalhos' },
  { label: 'Processo',    href: '/#processo' },
  { label: 'DuduShield™', href: '/dudushield' },
]

export function NavBar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fecha o menu mobile ao redimensionar para desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? '10px 0' : '18px 0',
      background: scrolled || mobileOpen ? 'rgba(5,5,8,0.92)' : 'transparent',
      backdropFilter: scrolled || mobileOpen ? 'blur(20px)' : 'none',
      borderBottom: scrolled || mobileOpen ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      {/* ── Barra principal ── */}
      <div style={{
        maxWidth: 1240, margin: '0 auto', padding: '0 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* LOGO */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 32, height: 32, position: 'relative',
            transformStyle: 'preserve-3d',
            animation: 'spinCube 8s linear infinite', flexShrink: 0,
          }}>
            {(['front','back','left','right','top','bottom'] as const).map((face, i) => (
              <div key={face} style={{
                position: 'absolute', width: 32, height: 32,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 12,
                border: '1px solid rgba(37,99,235,0.4)', borderRadius: 3,
                background: 'rgba(37,99,235,0.15)', color: '#fff',
                transform: [
                  'translateZ(16px)', 'rotateY(180deg) translateZ(16px)',
                  'rotateY(-90deg) translateZ(16px)', 'rotateY(90deg) translateZ(16px)',
                  'rotateX(90deg) translateZ(16px)',  'rotateX(-90deg) translateZ(16px)',
                ][i],
              }}>
                {['D','S','U','D','U','S'][i]}
              </div>
            ))}
          </div>
          <span style={{ fontSize: 18, fontWeight: 700 }}>
            <span style={{ color: '#ffffff' }}>Dudu</span>
            <span style={{ color: '#2563EB' }}>Studio</span>
          </span>
        </Link>

        {/* LINKS DESKTOP */}
        <ul className="nav-links-desktop" style={{
          display: 'flex', gap: 2, alignItems: 'center',
          listStyle: 'none', margin: 0, padding: 0,
        }}>
          {LINKS.map(link => (
            <li key={link.label}>
              <Link href={link.href} style={{
                padding: '7px 14px', borderRadius: 100, fontSize: 13, fontWeight: 500,
                color: link.label === 'DuduShield™' ? 'rgba(37,99,235,0.9)' : 'rgba(255,255,255,0.7)',
                textDecoration: 'none', transition: 'all 0.25s', display: 'block',
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
          <li>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent('Olá! Vim pelo DuduStudio.')}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                padding: '9px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
                color: '#fff', textDecoration: 'none', display: 'block',
                boxShadow: '0 0 16px rgba(37,99,235,0.3)', transition: 'opacity 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Contato
            </a>
          </li>
        </ul>

        {/* HAMBURGER MOBILE */}
        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen(o => !o)}
          style={{
            flexDirection: 'column', gap: 5, padding: 8,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, cursor: 'pointer',
          }}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span style={{ display: 'block', width: 20, height: 2, background: '#fff', borderRadius: 2,
            transform: mobileOpen ? 'translateY(7px) rotate(45deg)' : 'none', transition: 'transform 0.3s' }} />
          <span style={{ display: 'block', width: 20, height: 2, background: '#fff', borderRadius: 2,
            opacity: mobileOpen ? 0 : 1, transition: 'opacity 0.3s' }} />
          <span style={{ display: 'block', width: 20, height: 2, background: '#fff', borderRadius: 2,
            transform: mobileOpen ? 'translateY(-7px) rotate(-45deg)' : 'none', transition: 'transform 0.3s' }} />
        </button>
      </div>

      {/* ── MENU MOBILE ─── */}
      <div style={{
        maxHeight: mobileOpen ? '400px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.35s ease',
      }}>
        <div style={{
          padding: '12px 20px 20px',
          display: 'flex', flexDirection: 'column', gap: 4,
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          {LINKS.map(link => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: '12px 16px', borderRadius: 10, fontSize: 15, fontWeight: 500,
                color: link.label === 'DuduShield™' ? '#2563EB' : 'rgba(255,255,255,0.75)',
                textDecoration: 'none', transition: 'background 0.2s',
                background: 'transparent', display: 'block',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent('Olá! Vim pelo DuduStudio.')}`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            style={{
              marginTop: 8, padding: '13px 16px', borderRadius: 10, fontSize: 15, fontWeight: 600,
              background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
              color: '#fff', textDecoration: 'none', textAlign: 'center', display: 'block',
              boxShadow: '0 0 20px rgba(37,99,235,0.3)',
            }}
          >
            💬 Contato via WhatsApp
          </a>
        </div>
      </div>
    </nav>
  )
}
