'use client'

import { useEffect, useRef } from 'react'

export function EnergyCore() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    let animId: number
    let smoothId: number

    async function init() {
      const THREE = await import('three')

      const mount = mountRef.current!
      const W = mount.clientWidth
      const H = mount.clientHeight

      // SCENE
      const scene = new THREE.Scene()

      // CAMERA
      const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000)
      camera.position.z = 5

      // RENDERER
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)

      // LIGHTS
      const light = new THREE.PointLight(0x00ff88, 3)
      light.position.set(5, 5, 5)
      scene.add(light)
      scene.add(new THREE.AmbientLight(0x00ff88, 0.3))

      // SPHERE
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 128, 128),
        new THREE.MeshStandardMaterial({
          color: 0x003322,
          emissive: 0x00ff88,
          emissiveIntensity: 1.2,
          metalness: 0.8,
          roughness: 0.15,
        })
      )
      scene.add(sphere)

      // RING
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.6, 0.02, 16, 100),
        new THREE.MeshStandardMaterial({
          color: 0x00ff88,
          emissive: 0x00ff88,
          emissiveIntensity: 2,
          metalness: 1,
          roughness: 0,
        })
      )
      ring.rotation.x = Math.PI / 4
      scene.add(ring)

      // PARTICLES
      const count = 2000
      const pos = new Float32Array(count * 3)
      const vel: { x: number; y: number; z: number }[] = []

      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2
        pos[i * 3]     = Math.cos(a)
        pos[i * 3 + 1] = (Math.random() - 0.5)
        pos[i * 3 + 2] = Math.sin(a)
        vel.push({
          x: pos[i * 3]     * 0.025,
          y: pos[i * 3 + 1] * 0.018,
          z: pos[i * 3 + 2] * 0.025,
        })
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const mat = new THREE.PointsMaterial({
        color: 0x00ff88,
        size: 0.035,
        transparent: true,
        opacity: 0.75,
      })
      const particles = new THREE.Points(geo, mat)
      scene.add(particles)

      // MOUSE
      let targetX = 0
      let targetY = 0
      const handleMouse = (e: MouseEvent) => {
        targetX = (e.clientX / innerWidth  - 0.5) * 2
        targetY = (e.clientY / innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', handleMouse)

      // ANIMATE
      function animate() {
        animId = requestAnimationFrame(animate)
        const time = Date.now() * 0.001

        sphere.scale.setScalar(1 + Math.sin(time * 2) * 0.04)
        sphere.rotation.y += 0.008
        ring.rotation.z   += 0.005
        ring.rotation.y   += 0.003

        const p = geo.attributes.position.array as Float32Array
        for (let i = 0; i < count; i++) {
          p[i * 3]     += vel[i].x
          p[i * 3 + 1] += vel[i].y
          p[i * 3 + 2] += vel[i].z
          const d = Math.sqrt(p[i*3]**2 + p[i*3+1]**2 + p[i*3+2]**2)
          if (d > 6) {
            const a = Math.random() * Math.PI * 2
            p[i * 3]     = Math.cos(a)
            p[i * 3 + 1] = (Math.random() - 0.5)
            p[i * 3 + 2] = Math.sin(a)
          }
        }
        geo.attributes.position.needsUpdate = true
        renderer.render(scene, camera)
      }
      animate()

      // SMOOTH MOUSE
      function smoothMove() {
        smoothId = requestAnimationFrame(smoothMove)
        sphere.rotation.y += (targetX * 0.5 - sphere.rotation.y) * 0.05
        sphere.rotation.x += (targetY * 0.3 - sphere.rotation.x) * 0.05
        ring.rotation.x   += (targetY * 0.2 - ring.rotation.x)   * 0.03
      }
      smoothMove()

      // RESIZE
      const handleResize = () => {
        if (!mount) return
        const W2 = mount.clientWidth
        const H2 = mount.clientHeight
        camera.aspect = W2 / H2
        camera.updateProjectionMatrix()
        renderer.setSize(W2, H2)
      }
      window.addEventListener('resize', handleResize)

      return () => {
        cancelAnimationFrame(animId)
        cancelAnimationFrame(smoothId)
        window.removeEventListener('mousemove', handleMouse)
        window.removeEventListener('resize', handleResize)
        renderer.dispose()
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement)
        }
      }
    }

    const cleanup = init()
    return () => { cleanup.then(fn => fn?.()) }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }}
    />
  )
}
