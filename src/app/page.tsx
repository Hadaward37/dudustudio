'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Syne } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['800'], variable: '--font-syne' })

const ACCENT = '#00ff88'
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export default function EntradaPage() {
  const router  = useRouter()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Each eye: move the whole iris group (white + black) together
  const leftIrisRef  = useRef<SVGGElement>(null)
  const rightIrisRef = useRef<SVGGElement>(null)
  const leftHeartRef  = useRef<SVGGElement>(null)
  const rightHeartRef = useRef<SVGGElement>(null)
  const leftLidRef    = useRef<SVGPathElement>(null)
  const rightLidRef   = useRef<SVGPathElement>(null)
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

  // Mouse / touch tracking
  useEffect(() => {
    const calc = (clientX: number, clientY: number) => {
      mousePos.current = { x: clientX, y: clientY }
      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2
      let dx = (clientX - cx) / cx
      let dy = (clientY - cy) / cy
      const mag = Math.sqrt(dx * dx + dy * dy)
      if (mag > 0.7) { dx = dx / mag * 0.7; dy = dy / mag * 0.7 }
      pupilTarget.current = { x: dx, y: dy }
    }
    const onMove  = (e: MouseEvent) => calc(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => { const t = e.touches[0]; if (t) calc(t.clientX, t.clientY) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('touchmove', onTouch) }
  }, [])

  // RAF animation loop
  useEffect(() => {
    const MAX_PUPIL = 12

    // Upper eyelid path: covers top arc of eye
    // anger=0 → barely visible, anger=1 → covers half the eye
    const lidPath = (cx: number, anger: number) => {
      // The lid is a filled shape that sits on top of the eye circle
      // We draw it as a curved path following the top of the ellipse
      const r  = 58  // eye radius
      const drop = lerp(0, r * 0.55, anger)  // how far the lid drops down
      const topY = 80 - r - 4  // top of eye area
      const midY = 80 - r + drop  // bottom of lid at center
      return `M ${cx - r - 2},${topY} Q ${cx},${midY} ${cx + r + 2},${topY} Z`
    }

    const animate = () => {
      // Smooth pupil tracking
      pupilCurrent.current.x = lerp(pupilCurrent.current.x, pupilTarget.current.x, 0.08)
      pupilCurrent.current.y = lerp(pupilCurrent.current.y, pupilTarget.current.y, 0.08)
      const ox = pupilCurrent.current.x * MAX_PUPIL
      const oy = pupilCurrent.current.y * MAX_PUPIL

      // Anger from distance to button
      if (btnRef.current && mousePos.current.x !== -9999) {
        const rect = btnRef.current.getBoundingClientRect()
        const bx = rect.left + rect.width  / 2
        const by = rect.top  + rect.height / 2
        const dist = Math.sqrt((mousePos.current.x - bx) ** 2 + (mousePos.current.y - by) ** 2)
        angerTarget.current = Math.max(0, Math.min(1, (dist - 90) / 390))
      }
      angerCurrent.current = lerp(angerCurrent.current, angerTarget.current, 0.045)
      const anger = angerCurrent.current

      const showHearts = hoveredRef.current || clickedRef.current

      // Move iris groups (both white + black circles move together)
      if (leftIrisRef.current)  leftIrisRef.current.setAttribute('transform',  `translate(${88  + ox}, ${80 + oy})`)
      if (rightIrisRef.current) rightIrisRef.current.setAttribute('transform', `translate(${232 + ox}, ${80 + oy})`)

      // Iris visibility
      document.querySelectorAll<SVGGElement>('.iris-g').forEach(g => {
        g.style.opacity = showHearts ? '0' : '1'
      })

      // Hearts follow iris
      if (leftHeartRef.current) {
        leftHeartRef.current.setAttribute('transform', `translate(${88  + ox}, ${80 + oy})`)
        leftHeartRef.current.style.opacity = showHearts ? '1' : '0'
      }
      if (rightHeartRef.current) {
        rightHeartRef.current.setAttribute('transform', `translate(${232 + ox}, ${80 + oy})`)
        rightHeartRef.current.style.opacity = showHearts ? '1' : '0'
      }

      // Eyelids (angry drooping)
      if (leftLidRef.current)  leftLidRef.current.setAttribute('d',  lidPath(88,  anger))
      if (rightLidRef.current) rightLidRef.current.setAttribute('d', lidPath(232, anger))

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
        *,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }
        .entry-logo {
          font-family: var(--font-syne), sans-serif;
          font-weight: 800;
          font-size: clamp(2.4rem, 6vw, 4.5rem);
          letter-spacing: -0.03em;
          color: #fff;
          opacity: 0;
          animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s forwards;
        }
        .entry-eyes { opacity: 0; animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s forwards; }
        .entry-btn  { opacity: 0; animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s forwards; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <h1 className="entry-logo">DuduStudio</h1>

      <div className="entry-eyes">
        <svg
          viewBox="0 0 320 160"
          width="min(420px, 80vw)"
          style={{ overflow: 'visible', display: 'block' }}
        >
          <defs>
            {/* Gradient for eyelid — skin tone fading to transparent at bottom */}
            <linearGradient id="lidGradL" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#2a1a0e" stopOpacity="1" />
              <stop offset="100%" stopColor="#1a0e06" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="lidGradR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#2a1a0e" stopOpacity="1" />
              <stop offset="100%" stopColor="#1a0e06" stopOpacity="0.85" />
            </linearGradient>
            {/* Clip paths so iris stays inside eye circle */}
            <clipPath id="clipL">
              <ellipse cx="88"  cy="80" rx="57" ry="57" />
            </clipPath>
            <clipPath id="clipR">
              <ellipse cx="232" cy="80" rx="57" ry="57" />
            </clipPath>
          </defs>

          {/* ── LEFT EYE ── */}
          {/* Sclera (white of the eye) */}
          <ellipse cx="88" cy="80" rx="57" ry="57" fill="#f0ece8" />
          {/* Iris + pupil — move together */}
          <g ref={leftIrisRef} className="iris-g" transform="translate(88, 80)" clipPath="url(#clipL)" style={{ transition: 'opacity 0.25s' }}>
            <circle r="26" fill="#5c8a6e" />      {/* iris colour */}
            <circle r="26" fill="url(#irisShading)" opacity="0.4" />
            <circle r="13" fill="#111" />           {/* pupil */}
            <circle r="6"  fill="#000" />
            <circle cx="5" cy="-7" r="4" fill="rgba(255,255,255,0.55)" />  {/* specular */}
          </g>
          {/* Heart (replaces iris on hover) */}
          <g ref={leftHeartRef} style={{ opacity: 0, transition: 'opacity 0.25s' }}>
            <path d={heartPath} fill={ACCENT} />
          </g>
          {/* Eye outline */}
          <ellipse cx="88" cy="80" rx="57" ry="57" fill="none" stroke="#ccc" strokeWidth="1.5" />
          {/* Upper eyelid */}
          <path ref={leftLidRef}  d={`M 30,22 Q 88,22 146,22 Z`} fill="url(#lidGradL)" />
          {/* Eyelash line */}
          <path d="M 30,22 Q 88,18 146,22" fill="none" stroke="#1a0a04" strokeWidth="3.5" strokeLinecap="round" />

          {/* ── RIGHT EYE ── */}
          <ellipse cx="232" cy="80" rx="57" ry="57" fill="#f0ece8" />
          <g ref={rightIrisRef} className="iris-g" transform="translate(232, 80)" clipPath="url(#clipR)" style={{ transition: 'opacity 0.25s' }}>
            <circle r="26" fill="#5c8a6e" />
            <circle r="26" fill="url(#irisShading)" opacity="0.4" />
            <circle r="13" fill="#111" />
            <circle r="6"  fill="#000" />
            <circle cx="5" cy="-7" r="4" fill="rgba(255,255,255,0.55)" />
          </g>
          <g ref={rightHeartRef} style={{ opacity: 0, transition: 'opacity 0.25s' }}>
            <path d={heartPath} fill={ACCENT} />
          </g>
          <ellipse cx="232" cy="80" rx="57" ry="57" fill="none" stroke="#ccc" strokeWidth="1.5" />
          <path ref={rightLidRef} d={`M 174,22 Q 232,22 290,22 Z`} fill="url(#lidGradR)" />
          <path d="M 174,22 Q 232,18 290,22" fill="none" stroke="#1a0a04" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </div>

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
