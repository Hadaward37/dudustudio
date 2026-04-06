'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Syne } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['800'], variable: '--font-syne' })

const ACCENT = '#00ff88'
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export default function EntradaPage() {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const leftPupilRef  = useRef<SVGCircleElement>(null)
  const rightPupilRef = useRef<SVGCircleElement>(null)
  const leftHeartRef  = useRef<SVGGElement>(null)
  const rightHeartRef = useRef<SVGGElement>(null)
  const leftLidRef    = useRef<SVGPolygonElement>(null)
  const rightLidRef   = useRef<SVGPolygonElement>(null)
  const btnRef        = useRef<HTMLButtonElement>(null)

  const pupilTarget  = useRef({ x: 0, y: 0 })
  const pupilCurrent = useRef({ x: 0, y: 0 })
  const mousePos     = useRef({ x: -9999, y: -9999 })
  const angerTarget  = useRef(0)
  const angerCurrent = useRef(0)
  const rafRef       = useRef<number>(0)
  const hoveredRef   = useRef(false)
  const clickedRef   = useRef(false)

  useEffect(() => { hoveredRef.current = hovered }, [hovered])
  useEffect(() => { clickedRef.current = clicked }, [clicked])

  useEffect(() => {
    const calcTarget = (clientX: number, clientY: number) => {
      mousePos.current = { x: clientX, y: clientY }
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      let dx = (clientX - cx) / cx
      let dy = (clientY - cy) / cy
      const mag = Math.sqrt(dx * dx + dy * dy)
      if (mag > 0.7) { dx = dx / mag * 0.7; dy = dy / mag * 0.7 }
      pupilTarget.current = { x: dx, y: dy }
    }
    const onMove  = (e: MouseEvent) => calcTarget(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => { const t = e.touches[0]; if (t) calcTarget(t.clientX, t.clientY) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('touchmove', onTouch) }
  }, [])

  useEffect(() => {
    const MAX_PUPIL = 14
    const lidY = (anger: number, side: 'outer' | 'inner') => {
      const openY = 18
      return side === 'outer' ? lerp(openY, 60, anger) : lerp(openY, 84, anger)
    }

    const animate = () => {
      pupilCurrent.current.x = lerp(pupilCurrent.current.x, pupilTarget.current.x, 0.08)
      pupilCurrent.current.y = lerp(pupilCurrent.current.y, pupilTarget.current.y, 0.08)
      const ox = pupilCurrent.current.x * MAX_PUPIL
      const oy = pupilCurrent.current.y * MAX_PUPIL

      if (btnRef.current && mousePos.current.x !== -9999) {
        const rect = btnRef.current.getBoundingClientRect()
        const bx = rect.left + rect.width / 2
        const by = rect.top + rect.height / 2
        const dist = Math.sqrt((mousePos.current.x - bx) ** 2 + (mousePos.current.y - by) ** 2)
        angerTarget.current = Math.max(0, Math.min(1, (dist - 90) / 390))
      }

      angerCurrent.current = lerp(angerCurrent.current, angerTarget.current, 0.045)
      const anger = angerCurrent.current
      const showHearts = hoveredRef.current || clickedRef.current

      if (leftPupilRef.current) {
        leftPupilRef.current.setAttribute('cx', String(88 + ox))
        leftPupilRef.current.setAttribute('cy', String(80 + oy))
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.setAttribute('cx', String(232 + ox))
        rightPupilRef.current.setAttribute('cy', String(80 + oy))
      }

      document.querySelectorAll<SVGGElement>('.pupil-g').forEach(g => {
        g.style.opacity = showHearts ? '0' : '1'
      })

      if (leftHeartRef.current) {
        leftHeartRef.current.setAttribute('transform', `translate(${88 + ox},${80 + oy})`)
        leftHeartRef.current.style.opacity = showHearts ? '1' : '0'
      }
      if (rightHeartRef.current) {
        rightHeartRef.current.setAttribute('transform', `translate(${232 + ox},${80 + oy})`)
        rightHeartRef.current.style.opacity = showHearts ? '1' : '0'
      }

      if (leftLidRef.current) {
        const oy_ = lidY(anger, 'outer')
        const iy_ = lidY(anger, 'inner')
        leftLidRef.current.setAttribute('points', `30,-10 146,-10 146,${iy_} 30,${oy_}`)
      }
      if (rightLidRef.current) {
        const oy_ = lidY(anger, 'outer')
        const iy_ = lidY(anger, 'inner')
        rightLidRef.current.setAttribute('points', `174,-10 290,-10 290,${oy_} 174,${iy_}`)
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => router.push('/hub'), 700)
  }

  const heartPath = 'M0,-14 C8,-22 22,-18 22,-8 C22,2 12,12 0,22 C-12,12 -22,2 -22,-8 C-22,-18 -8,-22 0,-14 Z'

  return (
    <div
      className={syne.variable}
      style={{
        background: '#000',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3rem',
        fontFamily: 'var(--font-syne), sans-serif',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .entry-logo {
          font-family: var(--font-syne), sans-serif;
          font-weight: 800;
          font-size: clamp(2.4rem, 6vw, 4.5rem);
          letter-spacing: -0.03em;
          color: #fff;
          opacity: 0;
          animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s forwards;
        }
        .entry-eyes {
          opacity: 0;
          animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s forwards;
        }
        .entry-btn {
          opacity: 0;
          animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Logo */}
      <h1 className="entry-logo">DuduStudio</h1>

      {/* Eyes SVG */}
      <div className="entry-eyes">
        <svg
          viewBox="0 0 320 160"
          width="min(420px, 80vw)"
          style={{ overflow: 'visible', display: 'block' }}
        >
          {/* Left eye */}
          <ellipse cx="88" cy="80" rx="58" ry="58" fill="none" stroke="white" strokeWidth="3" />
          <g className="pupil-g" style={{ transition: 'opacity 0.25s' }}>
            <circle ref={leftPupilRef} cx="88" cy="80" r="22" fill="white" />
            <circle cx="88" cy="80" r="10" fill="#000" />
          </g>
          <g ref={leftHeartRef} style={{ opacity: 0, transition: 'opacity 0.25s' }}>
            <path d={heartPath} fill={ACCENT} />
          </g>
          <polygon ref={leftLidRef} points="30,-10 146,-10 146,18 30,18" fill="#000" />

          {/* Right eye */}
          <ellipse cx="232" cy="80" rx="58" ry="58" fill="none" stroke="white" strokeWidth="3" />
          <g className="pupil-g" style={{ transition: 'opacity 0.25s' }}>
            <circle ref={rightPupilRef} cx="232" cy="80" r="22" fill="white" />
            <circle cx="232" cy="80" r="10" fill="#000" />
          </g>
          <g ref={rightHeartRef} style={{ opacity: 0, transition: 'opacity 0.25s' }}>
            <path d={heartPath} fill={ACCENT} />
          </g>
          <polygon ref={rightLidRef} points="174,-10 290,-10 290,18 174,18" fill="#000" />
        </svg>
      </div>

      {/* Button */}
      <div className="entry-btn">
        <button
          ref={btnRef}
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            padding: '0.9rem 2.8rem',
            borderRadius: 999,
            background: hovered ? ACCENT : 'transparent',
            color: hovered ? '#080808' : '#fff',
            border: `2px solid ${hovered ? ACCENT : 'rgba(255,255,255,0.25)'}`,
            fontFamily: 'var(--font-syne), sans-serif',
            fontWeight: 800,
            fontSize: '1rem',
            letterSpacing: '-0.01em',
            cursor: 'pointer',
            transition: 'background 0.25s, color 0.25s, border-color 0.25s, box-shadow 0.25s',
            boxShadow: hovered ? `0 0 32px ${ACCENT}55` : 'none',
          }}
        >
          Entrar
        </button>
      </div>
    </div>
  )
}
