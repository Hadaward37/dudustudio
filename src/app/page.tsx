'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Syne } from 'next/font/google'
import { EnergyCore } from '@/components/ui/EnergyCore'

const syne = Syne({ subsets: ['latin'], weight: ['800'], variable: '--font-syne' })

const ACCENT = '#00ff88'

export default function EntryPage() {
  const router  = useRouter()
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => router.push('/sobre'), 500)
  }

  return (
    <div
      className={syne.variable}
      style={{
        background: '#080808',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-syne), sans-serif',
        userSelect: 'none',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Neural network 3D background ── */}
      <EnergyCore />

      {/* ── Overlay ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(0,255,136,0.04) 0%, rgba(8,8,8,0.85) 65%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* ── Content ── */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        width: '100%',
        padding: '0 1rem',
      }}>
        <style>{`
          *,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }

          .entry-logo {
            font-family: var(--font-syne), sans-serif;
            font-weight: 800;
            font-size: clamp(2.6rem, 7vw, 5rem);
            letter-spacing: -0.03em;
            color: #f0f0f0;
            line-height: 1;
            opacity: 0;
            transform: translateY(20px);
            animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s forwards;
          }
          .entry-sub {
            opacity: 0;
            animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s forwards;
          }
          .entry-btn {
            opacity: 0;
            animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s forwards;
          }
          @keyframes fadeUp {
            to { opacity: 1; transform: translateY(0); }
          }

          .btn-enter {
            font-family: var(--font-syne), sans-serif;
            font-weight: 800;
            font-size: 1rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #080808;
            background: ${ACCENT};
            border: none;
            padding: 1rem 3rem;
            border-radius: 999px;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          }
          .btn-enter:hover {
            transform: scale(1.06);
            box-shadow: 0 0 32px ${ACCENT}66;
          }
          .btn-enter:active  { transform: scale(0.96); }
          .btn-enter:disabled { opacity: 0.6; cursor: default; transform: none; }
        `}</style>

        {/* Logo */}
        <h1 className="entry-logo">
          Dudu<span style={{ color: ACCENT }}>Studio</span>
        </h1>

        {/* Subtitle */}
        <p
          className="entry-sub"
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(0.8rem, 2vw, 1rem)',
            fontWeight: 400,
            lineHeight: 1.6,
            textAlign: 'center',
            color: 'rgba(255,255,255,0.45)',
            margin: 0,
            maxWidth: '30ch',
          }}
        >
          Todo negócio merece ser visto.{' '}
          <span style={{ color: 'rgba(255,255,255,0.7)' }}>
            Criamos o site que faz seu cliente parar — e comprar.
          </span>
        </p>

        {/* Button */}
        <div className="entry-btn">
          <button
            className="btn-enter"
            onClick={handleClick}
            disabled={clicked}
          >
            {clicked ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </div>
    </div>
  )
}
