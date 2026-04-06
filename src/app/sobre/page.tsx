'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Syne, Manrope } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['400', '700', '800'], variable: '--font-syne' })
const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-manrope' })

const ACCENT = '#00ff88'
const ACCENT2 = '#7b61ff'

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const TITLE_WORDS_1 = ['Sites', 'que', 'Param', 'o', 'Scroll.']
const TITLE_WORDS_2 = ['Criando', 'o', 'Inesperado.']

export default function SobrePage() {
  const [scrolled, setScrolled] = useState(false)
  const [wordsVisible1, setWordsVisible1] = useState<boolean[]>(Array(TITLE_WORDS_1.length).fill(false))
  const [wordsVisible2, setWordsVisible2] = useState<boolean[]>(Array(TITLE_WORDS_2.length).fill(false))
  const [badgeVisible, setBadgeVisible] = useState(false)

  // Custom cursor
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafCursor = useRef<number>(0)

  // Blob parallax
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)
  const blob3Ref = useRef<HTMLDivElement>(null)
  const scrollY = useRef(0)

  // Scroll nav + parallax
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      scrollY.current = window.scrollY
      const s = window.scrollY
      if (blob1Ref.current) blob1Ref.current.style.transform = `translateY(${s * 0.12}px)`
      if (blob2Ref.current) blob2Ref.current.style.transform = `translateY(${s * 0.08}px)`
      if (blob3Ref.current) blob3Ref.current.style.transform = `translateY(${s * 0.05}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cursor RAF
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseRef.current.x}px`
        dotRef.current.style.top = `${mouseRef.current.y}px`
      }
      ringPos.current.x = lerp(ringPos.current.x, mouseRef.current.x, 0.12)
      ringPos.current.y = lerp(ringPos.current.y, mouseRef.current.y, 0.12)
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top = `${ringPos.current.y}px`
      }
      rafCursor.current = requestAnimationFrame(animate)
    }
    rafCursor.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafCursor.current)
    }
  }, [])

  // Stagger word reveal
  useEffect(() => {
    const badgeTimer = setTimeout(() => setBadgeVisible(true), 200)

    const timers1 = TITLE_WORDS_1.map((_, i) =>
      setTimeout(() => {
        setWordsVisible1(prev => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, 500 + i * 100)
    )

    const timers2 = TITLE_WORDS_2.map((_, i) =>
      setTimeout(() => {
        setWordsVisible2(prev => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, 1000 + i * 100)
    )

    return () => {
      clearTimeout(badgeTimer)
      timers1.forEach(clearTimeout)
      timers2.forEach(clearTimeout)
    }
  }, [])

  return (
    <div
      className={`${syne.variable} ${manrope.variable}`}
      style={{
        background: '#080808',
        minHeight: '100vh',
        color: '#fff',
        fontFamily: 'var(--font-manrope), sans-serif',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
      }}
    >
      {/* Custom cursor */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: ACCENT,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%,-50%)',
          transition: 'background 0.2s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: `1.5px solid ${ACCENT}`,
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%,-50%)',
          opacity: 0.5,
        }}
      />

      {/* Animated grain overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.035,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Liquid gradient blobs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div
          ref={blob1Ref}
          style={{
            position: 'absolute',
            width: '55vw',
            height: '55vw',
            borderRadius: '60% 40% 70% 30% / 50% 60% 40% 70%',
            background: `radial-gradient(circle, ${ACCENT}22 0%, transparent 70%)`,
            top: '-15vw',
            left: '-10vw',
            animation: 'blob1 18s ease-in-out infinite',
            filter: 'blur(60px)',
          }}
        />
        <div
          ref={blob2Ref}
          style={{
            position: 'absolute',
            width: '50vw',
            height: '50vw',
            borderRadius: '40% 60% 30% 70% / 70% 30% 60% 40%',
            background: `radial-gradient(circle, ${ACCENT2}22 0%, transparent 70%)`,
            top: '20vw',
            right: '-12vw',
            animation: 'blob2 22s ease-in-out infinite',
            filter: 'blur(70px)',
          }}
        />
        <div
          ref={blob3Ref}
          style={{
            position: 'absolute',
            width: '40vw',
            height: '40vw',
            borderRadius: '70% 30% 50% 50% / 30% 70% 50% 50%',
            background: 'radial-gradient(circle, #ff6b3522 0%, transparent 70%)',
            bottom: '-5vw',
            left: '30vw',
            animation: 'blob3 26s ease-in-out infinite',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Nav */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          height: 64,
          background: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontWeight: 800,
            fontSize: '1.1rem',
            letterSpacing: '-0.02em',
            color: '#fff',
          }}
        >
          DuduStudio
        </span>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[
            { label: 'Início', href: '/' },
            { label: 'Sites', href: '/vitrine' },
            { label: 'Contato', href: 'mailto:dudutorro1@gmail.com' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: 'var(--font-manrope), sans-serif',
                fontWeight: 400,
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          paddingTop: 64,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 1rem',
            borderRadius: 999,
            border: `1px solid ${ACCENT}44`,
            background: `${ACCENT}0d`,
            marginBottom: '2rem',
            opacity: badgeVisible ? 1 : 0,
            transform: badgeVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.6s, transform 0.6s',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: ACCENT,
              display: 'inline-block',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-manrope), sans-serif',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: ACCENT,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Estúdio Digital
          </span>
        </div>

        {/* Title line 1 */}
        <h1
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: 0,
            marginBottom: '0.25em',
            color: '#fff',
          }}
        >
          {TITLE_WORDS_1.map((word, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                marginRight: '0.25em',
                opacity: wordsVisible1[i] ? 1 : 0,
                transform: wordsVisible1[i] ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.5s, transform 0.5s',
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Title line 2 — accent color */}
        <h2
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: 0,
            marginBottom: '1.5rem',
            color: ACCENT,
          }}
        >
          {TITLE_WORDS_2.map((word, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                marginRight: '0.25em',
                opacity: wordsVisible2[i] ? 1 : 0,
                transform: wordsVisible2[i] ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.5s, transform 0.5s',
              }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-manrope), sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 560,
            lineHeight: 1.7,
            margin: '0 auto 2.5rem',
          }}
        >
          Cada negócio merece um site único. Criamos experiências digitais personalizadas
          que fazem seu cliente parar, olhar e comprar.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/vitrine"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 2rem',
              borderRadius: 999,
              background: ACCENT,
              color: '#080808',
              fontFamily: 'var(--font-syne), sans-serif',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: `0 0 32px ${ACCENT}44`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)'
              e.currentTarget.style.boxShadow = `0 0 48px ${ACCENT}66`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = `0 0 32px ${ACCENT}44`
            }}
          >
            Ver nosso trabalho →
          </Link>

          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 2rem',
              borderRadius: 999,
              background: 'transparent',
              color: '#fff',
              fontFamily: 'var(--font-syne), sans-serif',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
              e.currentTarget.style.transform = 'scale(1.04)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Falar no WhatsApp →
          </a>
        </div>
      </main>

      {/* Keyframe styles */}
      <style>{`
        @keyframes blob1 {
          0%, 100% { border-radius: 60% 40% 70% 30% / 50% 60% 40% 70%; transform: translate(0,0) scale(1); }
          33%       { border-radius: 40% 60% 30% 70% / 60% 40% 70% 30%; transform: translate(3vw, 2vw) scale(1.05); }
          66%       { border-radius: 70% 30% 60% 40% / 40% 70% 30% 60%; transform: translate(-2vw, 4vw) scale(0.95); }
        }
        @keyframes blob2 {
          0%, 100% { border-radius: 40% 60% 30% 70% / 70% 30% 60% 40%; transform: translate(0,0) scale(1); }
          33%       { border-radius: 60% 40% 70% 30% / 30% 70% 40% 60%; transform: translate(-4vw, 2vw) scale(1.08); }
          66%       { border-radius: 30% 70% 50% 50% / 50% 50% 70% 30%; transform: translate(2vw, -3vw) scale(0.92); }
        }
        @keyframes blob3 {
          0%, 100% { border-radius: 70% 30% 50% 50% / 30% 70% 50% 50%; transform: translate(0,0) scale(1); }
          50%       { border-radius: 30% 70% 40% 60% / 60% 40% 70% 30%; transform: translate(-3vw, -2vw) scale(1.1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>
    </div>
  )
}
