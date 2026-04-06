'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Syne } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['800'], variable: '--font-syne' })

const ACCENT = '#00ff88'
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

// Eye geometry (SVG viewBox 0 0 320 160)
// Left eye center: (88, 80), Right eye center: (232, 80), radius: 58
// Outer = temple side, Inner = nose side
// Left  → outer x=30,  inner x=146
// Right → inner x=174, outer x=290

export default function EntryPage() {
  const router = useRouter()
  const [clicked, setClicked] = useState(false)

  // --- Refs for imperative SVG updates ---
  const buttonRef       = useRef<HTMLButtonElement>(null)
  const leftPupilRef    = useRef<SVGCircleElement>(null)
  const rightPupilRef   = useRef<SVGCircleElement>(null)
  const leftHeartRef    = useRef<SVGGElement>(null)
  const rightHeartRef   = useRef<SVGGElement>(null)
  const leftLidRef      = useRef<SVGPolygonElement>(null)
  const rightLidRef     = useRef<SVGPolygonElement>(null)

  // Animation state kept in refs (no re-renders in RAF)
  const pupilTarget  = useRef({ x: 0, y: 0 })
  const pupilCurrent = useRef({ x: 0, y: 0 })
  const mousePos     = useRef({ x: -9999, y: -9999 })
  const angerTarget  = useRef(0)
  const angerCurrent = useRef(0)
  const rafRef       = useRef<number>(0)
  const clickedRef   = useRef(false) // mirror of state for RAF
  const hoveredRef   = useRef(false) // true while cursor is over the button

  // sync clicked state → ref
  useEffect(() => { clickedRef.current = clicked }, [clicked])

  // --- Button hover tracking ---
  useEffect(() => {
    const btn = buttonRef.current
    if (!btn) return
    const onEnter = () => { hoveredRef.current = true }
    const onLeave = () => { hoveredRef.current = false }
    btn.addEventListener('mouseenter', onEnter)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      btn.removeEventListener('mouseenter', onEnter)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // --- Mouse tracking ---
  useEffect(() => {
    const calcTarget = (clientX: number, clientY: number) => {
      mousePos.current = { x: clientX, y: clientY }
      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2
      let dx = (clientX - cx) / cx
      let dy = (clientY - cy) / cy
      const mag = Math.sqrt(dx * dx + dy * dy)
      if (mag > 0.7) { dx = dx / mag * 0.7; dy = dy / mag * 0.7 }
      pupilTarget.current = { x: dx, y: dy }
    }

    // Pupil target: cursor/touch relative to viewport center, clamped to [-0.7, 0.7]
    const onMove  = (e: MouseEvent) => calcTarget(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) calcTarget(t.clientX, t.clientY)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  // --- RAF animation loop ---
  useEffect(() => {
    const MAX_PUPIL = 14  // max pupil offset in px

    // Eyelid Y positions (SVG units) — interpolated by anger
    // anger=0: lid just above eye (y=18), anger=1: lid covers eye angrily
    const lidY = (anger: number, side: 'outer' | 'inner') => {
      const openY = 18
      if (side === 'outer') return lerp(openY, 60, anger)
      return lerp(openY, 84, anger)  // inner corner drops more → angry V-shape
    }

    const animate = () => {
      // Smooth pupil
      pupilCurrent.current.x = lerp(pupilCurrent.current.x, pupilTarget.current.x, 0.08)
      pupilCurrent.current.y = lerp(pupilCurrent.current.y, pupilTarget.current.y, 0.08)
      const ox = pupilCurrent.current.x * MAX_PUPIL
      const oy = pupilCurrent.current.y * MAX_PUPIL

      // Compute anger from distance to button
      if (buttonRef.current && mousePos.current.x !== -9999) {
        const rect = buttonRef.current.getBoundingClientRect()
        const bx = rect.left + rect.width  / 2
        const by = rect.top  + rect.height / 2
        const dist = Math.sqrt((mousePos.current.x - bx) ** 2 + (mousePos.current.y - by) ** 2)
        // 0-90px → 0, 90-480px → 0→1, >480px → 1
        angerTarget.current = Math.max(0, Math.min(1, (dist - 90) / 390))
      }

      // Smooth anger
      angerCurrent.current = lerp(angerCurrent.current, angerTarget.current, 0.045)
      const anger = angerCurrent.current

      // Show hearts or pupils
      const showHearts = clickedRef.current || hoveredRef.current
      const pupilOpacity = showHearts ? 0 : 1
      const heartOpacity = showHearts ? 1 : 0

      // Pupil positions
      if (leftPupilRef.current) {
        leftPupilRef.current.setAttribute('cx', String(88  + ox))
        leftPupilRef.current.setAttribute('cy', String(80  + oy))
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.setAttribute('cx', String(232 + ox))
        rightPupilRef.current.setAttribute('cy', String(80  + oy))
      }

      // Pupil groups opacity
      const pupilGroups = document.querySelectorAll<SVGGElement>('.pupil-g')
      pupilGroups.forEach(g => (g.style.opacity = String(pupilOpacity)))

      // Hearts
      if (leftHeartRef.current) {
        leftHeartRef.current.setAttribute('transform', `translate(${88  + ox},${80 + oy})`)
        leftHeartRef.current.style.opacity = String(heartOpacity)
      }
      if (rightHeartRef.current) {
        rightHeartRef.current.setAttribute('transform', `translate(${232 + ox},${80 + oy})`)
        rightHeartRef.current.style.opacity = String(heartOpacity)
      }

      // Eyelids — polygon covers top of eye in background color
      // Left eye:  outer=left (x=30),  inner=right (x=146)
      // Right eye: inner=left (x=174), outer=right (x=290)
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
    // Navigate after a brief heart moment
    setTimeout(() => router.push('/vitrine'), 700)
  }

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
        gap: '3.5rem',
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
          font-size: clamp(2.6rem, 7vw, 5rem);
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s forwards;
        }
        .entry-eyes {
          opacity: 0;
          animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s forwards;
        }
        .entry-sub {
          opacity: 0;
          animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s forwards;
        }
        .entry-btn {
          opacity: 0;
          animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.7s forwards;
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
          color: #000;
          background: ${ACCENT};
          border: none;
          padding: 1rem 3rem;
          border-radius: 999px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-enter:hover {
          transform: scale(1.06);
          box-shadow: 0 0 32px ${ACCENT}66;
        }
        .btn-enter:active { transform: scale(0.96); }

        .pupil-g  { transition: opacity 0.2s; }
        .heart-g  { transition: opacity 0.2s; }

        .heart-path {
          transform-origin: center;
          transform-box: fill-box;
        }
        .clicked .heart-path {
          animation: heartbeat 0.45s ease-in-out infinite alternate;
        }
        @keyframes heartbeat {
          from { transform: scale(0.85); }
          to   { transform: scale(1.15); }
        }
      `}</style>

      {/* Logo */}
      <h1 className="entry-logo">
        Dudu<span style={{ color: ACCENT }}>Studio</span>
      </h1>

      {/* Eyes */}
      <div className={`entry-eyes${clicked ? ' clicked' : ''}`}>
        <svg
          viewBox="0 0 320 160"
          width="320"
          height="160"
          aria-hidden="true"
          style={{ overflow: 'visible' }}
        >
          {/* ── Eye whites ── */}
          <ellipse cx="88"  cy="80" rx="58" ry="58" fill="#fff" />
          <ellipse cx="232" cy="80" rx="58" ry="58" fill="#fff" />

          {/* ── Left pupil ── */}
          <g className="pupil-g">
            <circle ref={leftPupilRef} cx="88" cy="80" r="22" fill="#111" />
            <circle cx="88" cy="80" r="7"  fill={ACCENT} />
          </g>

          {/* ── Right pupil ── */}
          <g className="pupil-g">
            <circle ref={rightPupilRef} cx="232" cy="80" r="22" fill="#111" />
            <circle cx="232" cy="80" r="7"  fill={ACCENT} />
          </g>

          {/* ── Left heart ── */}
          <g ref={leftHeartRef} className="heart-g" transform="translate(88,80)" style={{ opacity: 0 }}>
            <path
              className="heart-path"
              d="M0,-14 C5,-22 18,-22 18,-10 C18,0 0,14 0,14 C0,14 -18,0 -18,-10 C-18,-22 -5,-22 0,-14 Z"
              fill={ACCENT}
            />
          </g>

          {/* ── Right heart ── */}
          <g ref={rightHeartRef} className="heart-g" transform="translate(232,80)" style={{ opacity: 0 }}>
            <path
              className="heart-path"
              d="M0,-14 C5,-22 18,-22 18,-10 C18,0 0,14 0,14 C0,14 -18,0 -18,-10 C-18,-22 -5,-22 0,-14 Z"
              fill={ACCENT}
              style={{ animationDelay: '0.07s' }}
            />
          </g>

          {/* ── Eyelids (black overlay, updated imperatively) ── */}
          {/* Left: outer=left(x=30) inner=right(x=146) */}
          <polygon
            ref={leftLidRef}
            points="30,-10 146,-10 146,18 30,18"
            fill="#000"
          />
          {/* Right: inner=left(x=174) outer=right(x=290) */}
          <polygon
            ref={rightLidRef}
            points="174,-10 290,-10 290,18 174,18"
            fill="#000"
          />
        </svg>
      </div>

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
          ref={buttonRef}
          className="btn-enter"
          onClick={handleClick}
        >
          Entrar
        </button>
      </div>
    </div>
  )
}
