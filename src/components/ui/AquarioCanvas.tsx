'use client'

import { useEffect, useRef } from 'react'

export function AquarioCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    let animId: number

    async function init() {
      const THREE = await import('three')
      const mount = mountRef.current!

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 30

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)

      // ── Luzes ──────────────────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0xffffff, 0.2))
      const l1 = new THREE.PointLight(0x2563eb, 4, 100)
      l1.position.set(20, 20, 20)
      scene.add(l1)
      const l2 = new THREE.PointLight(0x0ea5e9, 3, 80)
      l2.position.set(-20, -10, 10)
      scene.add(l2)

      // ── Objeto viajante — torus knot ────────────────────────────────────────
      const knotGeo = new THREE.TorusKnotGeometry(4, 1.2, 100, 16, 2, 3)
      const knotMat = new THREE.MeshPhongMaterial({
        color: 0x1d4ed8,
        emissive: 0x1e3a8a,
        shininess: 100,
        transparent: true,
        opacity: 0.75,
      })
      const knot = new THREE.Mesh(knotGeo, knotMat)
      knot.position.set(14, 0, -5)
      scene.add(knot)

      const knotWire = new THREE.Mesh(knotGeo, new THREE.MeshBasicMaterial({
        color: 0x60a5fa, wireframe: true, transparent: true, opacity: 0.1,
      }))
      knotWire.position.copy(knot.position)
      scene.add(knotWire)

      // ── Icosahedron — lado esquerdo ─────────────────────────────────────────
      const ico = new THREE.Mesh(
        new THREE.IcosahedronGeometry(3, 1),
        new THREE.MeshPhongMaterial({ color: 0x0ea5e9, emissive: 0x0c4a6e, transparent: true, opacity: 0.4 })
      )
      ico.position.set(-18, 6, -12)
      scene.add(ico)

      // ── Octahedron ──────────────────────────────────────────────────────────
      const oct = new THREE.Mesh(
        new THREE.OctahedronGeometry(2.5, 0),
        new THREE.MeshPhongMaterial({ color: 0x818cf8, transparent: true, opacity: 0.35 })
      )
      oct.position.set(5, -15, -8)
      scene.add(oct)

      // ── Partículas espalhadas por toda a altura ─────────────────────────────
      const pCount = 400
      const pPos = new Float32Array(pCount * 3)
      const pVel: { x: number; y: number }[] = []
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3]     = (Math.random() - 0.5) * 80
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 150
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10
        pVel.push({ x: (Math.random() - 0.5) * 0.012, y: (Math.random() - 0.5) * 0.006 })
      }
      const pGeo = new THREE.BufferGeometry()
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
      const pMesh = new THREE.Points(pGeo, new THREE.PointsMaterial({
        color: 0x2563eb, size: 0.14, transparent: true, opacity: 0.45,
      }))
      scene.add(pMesh)

      // ── Esferas flutuantes ──────────────────────────────────────────────────
      const sColors = [0x2563eb, 0x0ea5e9, 0x38bdf8, 0x818cf8]
      const spheres: InstanceType<typeof THREE.Mesh>[] = []
      for (let i = 0; i < 18; i++) {
        const r = Math.random() * 1.2 + 0.3
        const col = sColors[i % 4]
        const m = new THREE.Mesh(
          new THREE.SphereGeometry(r, 10, 10),
          new THREE.MeshPhongMaterial({
            color: col, emissive: col, emissiveIntensity: 0.2,
            transparent: true, opacity: Math.random() * 0.25 + 0.15,
          })
        )
        m.position.set(
          (Math.random() - 0.5) * 70,
          (Math.random() - 0.5) * 120,
          (Math.random() - 0.5) * 20 - 10
        )
        m.userData = {
          oy: m.position.y,
          sp: Math.random() * 0.008 + 0.003,
          of: Math.random() * Math.PI * 2,
        }
        scene.add(m)
        spheres.push(m)
      }

      // ── Posições Y do knot por seção ────────────────────────────────────────
      const sectionYPositions = [4, -4, -12, -20, -28, -36]
      let targetKnotY = sectionYPositions[0]
      let targetCamY = 0

      function onScroll() {
        const scrollY = window.scrollY
        const vh = window.innerHeight
        const secIndex = Math.round(scrollY / vh)
        const clampedIdx = Math.min(secIndex, sectionYPositions.length - 1)
        targetKnotY = sectionYPositions[clampedIdx]
        targetCamY = -clampedIdx * 0.5
      }
      window.addEventListener('scroll', onScroll, { passive: true })

      // ── Mouse parallax ───────────────────────────────────────────────────────
      let mx = 0, my = 0
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2
        my = (e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouse)

      let t = 0
      function animate() {
        animId = requestAnimationFrame(animate)
        t += 0.007

        knot.rotation.x += 0.004
        knot.rotation.y += 0.006
        knotWire.rotation.copy(knot.rotation)
        knot.position.y += (targetKnotY - knot.position.y) * 0.03
        knotWire.position.y = knot.position.y

        ico.rotation.x += 0.004
        ico.rotation.y += 0.003
        oct.rotation.x += 0.006
        oct.rotation.z += 0.004

        const p = pGeo.attributes.position.array as Float32Array
        for (let i = 0; i < pCount; i++) {
          p[i * 3]     += pVel[i].x
          p[i * 3 + 1] += pVel[i].y
          if (p[i * 3] > 40 || p[i * 3] < -40) pVel[i].x *= -1
          if (p[i * 3 + 1] > 75 || p[i * 3 + 1] < -75) pVel[i].y *= -1
        }
        pGeo.attributes.position.needsUpdate = true

        spheres.forEach(s => {
          s.position.y = s.userData.oy + Math.sin(t * s.userData.sp * 100 + s.userData.of) * 2.5
          s.rotation.y += 0.004
        })

        camera.position.x += (mx * 3 - camera.position.x) * 0.04
        camera.position.y += (-my * 2 + targetCamY - camera.position.y) * 0.04
        camera.lookAt(scene.position)

        l1.position.x = Math.sin(t * 0.7) * 25
        l1.position.y = Math.cos(t * 0.5) * 20
        l2.position.x = Math.cos(t * 0.8) * 20

        renderer.render(scene, camera)
      }
      animate()

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', onResize)

      return () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('mousemove', onMouse)
        window.removeEventListener('resize', onResize)
        knotGeo.dispose(); knotMat.dispose()
        pGeo.dispose()
        renderer.dispose()
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      }
    }

    const cleanup = init()
    return () => { cleanup.then(fn => fn?.()) }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
