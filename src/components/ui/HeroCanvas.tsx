'use client'

import { useEffect, useRef } from 'react'

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    let animId: number

    async function init() {
      const THREE = await import('three')
      const mount = mountRef.current!

      const w = mount.clientWidth
      const h = mount.clientHeight

      const scene    = new THREE.Scene()
      const camera   = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
      camera.position.z = 5

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)

      // ── Lights ──────────────────────────────────────────────────────────
      const ambient = new THREE.AmbientLight(0xffffff, 0.4)
      scene.add(ambient)

      const light1 = new THREE.PointLight(0xFF5C00, 3, 20)
      light1.position.set(3, 3, 3)
      scene.add(light1)

      const light2 = new THREE.PointLight(0xFF8C42, 2, 15)
      light2.position.set(-3, -2, 2)
      scene.add(light2)

      const light3 = new THREE.PointLight(0xF59E0B, 1.5, 12)
      light3.position.set(0, 4, -2)
      scene.add(light3)

      // ── Torus knot (main hero object) ────────────────────────────────────
      const torusGeo = new THREE.TorusKnotGeometry(1.2, 0.38, 128, 16, 2, 3)
      const torusMat = new THREE.MeshStandardMaterial({
        color: 0xFF5C00,
        emissive: 0xFF5C00,
        emissiveIntensity: 0.15,
        roughness: 0.25,
        metalness: 0.8,
        wireframe: false,
      })
      const torusKnot = new THREE.Mesh(torusGeo, torusMat)
      scene.add(torusKnot)

      // ── Icosahedron wireframe (orbiting) ─────────────────────────────────
      const icoGeo = new THREE.IcosahedronGeometry(0.6, 1)
      const icoMat = new THREE.MeshBasicMaterial({
        color: 0xFF8C42,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      })
      const ico = new THREE.Mesh(icoGeo, icoMat)
      ico.position.set(2.8, 0.5, 0)
      scene.add(ico)

      // ── Octahedron wireframe (orbiting opposite) ──────────────────────────
      const octGeo = new THREE.OctahedronGeometry(0.5, 0)
      const octMat = new THREE.MeshBasicMaterial({
        color: 0xF59E0B,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      })
      const oct = new THREE.Mesh(octGeo, octMat)
      oct.position.set(-2.5, -0.8, 0.5)
      scene.add(oct)

      // ── Floating spheres ─────────────────────────────────────────────────
      type SphereEntry = { mesh: InstanceType<typeof THREE.Mesh>; speed: number; offset: number }
      const sphereData: SphereEntry[] = []
      const sPositions = [
        [3.5, -1.5, -1], [-3.2, 1.8, -0.5], [1.5, 2.8, -1.5], [-1.8, -2.5, -1],
        [4.2, 1.2, -2], [-4, -1, -1.5],
      ]
      sPositions.forEach(([x, y, z]) => {
        const r   = 0.08 + Math.random() * 0.12
        const geo = new THREE.SphereGeometry(r, 8, 8)
        const mat = new THREE.MeshStandardMaterial({
          color: Math.random() > 0.5 ? 0xFF5C00 : 0xFF8C42,
          emissive: 0xFF5C00, emissiveIntensity: 0.4,
          roughness: 0.3, metalness: 0.6,
        })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(x, y, z)
        scene.add(mesh)
        sphereData.push({ mesh, speed: 0.4 + Math.random() * 0.6, offset: Math.random() * Math.PI * 2 })
      })

      // ── Particle field ────────────────────────────────────────────────────
      const pCount = 2000
      const pPos   = new Float32Array(pCount * 3)
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3]     = (Math.random() - 0.5) * 20
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 20
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 20
      }
      const pGeo = new THREE.BufferGeometry()
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
      const pMat = new THREE.PointsMaterial({
        color: 0xFF5C00, size: 0.018,
        transparent: true, opacity: 0.35,
      })
      const particles = new THREE.Points(pGeo, pMat)
      scene.add(particles)

      // ── Mouse parallax ────────────────────────────────────────────────────
      let targetX = 0, targetY = 0
      const onMouse = (e: MouseEvent) => {
        targetX = (e.clientX / window.innerWidth  - 0.5) * 0.5
        targetY = (e.clientY / window.innerHeight - 0.5) * 0.5
      }
      window.addEventListener('mousemove', onMouse)

      // ── Animate ────────────────────────────────────────────────────────────
      let camX = 0, camY = 0

      function animate() {
        animId = requestAnimationFrame(animate)
        const t = performance.now() * 0.001

        // torus knot
        torusKnot.rotation.x += 0.004
        torusKnot.rotation.y += 0.006

        // light pulse
        light1.intensity = 3 + Math.sin(t * 1.3) * 0.8
        light2.intensity = 2 + Math.sin(t * 0.9 + 1) * 0.5

        // ico orbit
        ico.rotation.y += 0.012
        ico.rotation.x += 0.008
        ico.position.x = 2.8 * Math.cos(t * 0.3)
        ico.position.z = 2.8 * Math.sin(t * 0.3)

        // oct orbit
        oct.rotation.y -= 0.01
        oct.rotation.z += 0.007
        oct.position.x = -2.5 * Math.cos(t * 0.2)
        oct.position.z = -2.5 * Math.sin(t * 0.2)

        // floating spheres bob
        sphereData.forEach(({ mesh, speed, offset }) => {
          mesh.position.y += Math.sin(t * speed + offset) * 0.003
        })

        // particles slow drift
        particles.rotation.y += 0.0003

        // camera parallax with lerp
        camX += (targetX - camX) * 0.04
        camY += (targetY - camY) * 0.04
        camera.position.x = camX * 1.5
        camera.position.y = -camY * 1.5

        renderer.render(scene, camera)
      }

      animate()

      // ── Resize ────────────────────────────────────────────────────────────
      const onResize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(mount.clientWidth, mount.clientHeight)
      }
      window.addEventListener('resize', onResize)

      return () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('mousemove', onMouse)
        window.removeEventListener('resize', onResize)
        torusGeo.dispose(); torusMat.dispose()
        icoGeo.dispose(); icoMat.dispose()
        octGeo.dispose(); octMat.dispose()
        pGeo.dispose(); pMat.dispose()
        sphereData.forEach(({ mesh }) => {
          mesh.geometry.dispose();
          ;(mesh.material as { dispose(): void }).dispose()
        })
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
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    />
  )
}
