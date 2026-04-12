'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -100, my = -100
    let rx = -100, ry = -100
    let raf: number

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }

    function tick() {
      raf = requestAnimationFrame(tick)
      if (!dot || !ring) return
      dot.style.transform  = `translate(${mx - 4}px, ${my - 4}px)`
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`
    }

    const onEnter = () => { ring.style.transform += ' scale(1.6)'; ring.style.opacity = '0.4' }
    const onLeave = () => { ring.style.opacity = '1' }

    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMove)
    document.body.style.cursor = 'none'
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#FF5C00',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'opacity 0.2s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 32, height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,92,0,0.6)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'opacity 0.3s, transform 0.15s ease-out',
        }}
      />
    </>
  )
}
