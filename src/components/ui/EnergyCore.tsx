'use client'

import { useEffect, useRef } from 'react'

export function EnergyCore() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    let animId: number

    async function init() {
      const THREE = await import('three')
      const mount = mountRef.current!

      const scene = new THREE.Scene()

      const camera = new THREE.PerspectiveCamera(
        75,
        mount.clientWidth / mount.clientHeight,
        0.1,
        1000
      )
      camera.position.z = 6

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })

      renderer.setSize(mount.clientWidth, mount.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)

      mount.appendChild(renderer.domElement)

      const count = 500
      const positions = new Float32Array(count * 3)
      const velocity: { x: number; y: number; z: number }[] = []

      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 10
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10

        velocity.push({
          x: (Math.random() - 0.5) * 0.002,
          y: (Math.random() - 0.5) * 0.002,
          z: (Math.random() - 0.5) * 0.002
        })
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      const mat = new THREE.PointsMaterial({
        color: 0x00ff88,
        size: 0.03,
        transparent: true,
        opacity: 0.7
      })

      const points = new THREE.Points(geo, mat)
      scene.add(points)

      const maxConnections = 3
      const maxDist = 1.2

      const lineGeo = new THREE.BufferGeometry()
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.15
      })

      const lineMesh = new THREE.LineSegments(lineGeo, lineMat)
      scene.add(lineMesh)

      let targetX = 0
      let targetY = 0
      let scrollY = 0
      let targetScroll = 0

      const handleMouse = (e: MouseEvent) => {
        targetX = (e.clientX / window.innerWidth  - 0.5) * 2
        targetY = (e.clientY / window.innerHeight - 0.5) * 2
      }

      const handleScroll = () => {
        targetScroll = window.scrollY
      }

      window.addEventListener('mousemove', handleMouse)
      window.addEventListener('scroll', handleScroll)

      function updateLines() {
        const pos = geo.attributes.position.array as Float32Array
        const vertices: number[] = []

        for (let i = 0; i < count; i++) {
          let connections = 0

          for (let j = i + 1; j < count; j++) {
            if (connections >= maxConnections) break

            const dx = pos[i * 3]     - pos[j * 3]
            const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
            const dz = pos[i * 3 + 2] - pos[j * 3 + 2]

            const dist = dx * dx + dy * dy + dz * dz

            if (dist < maxDist) {
              vertices.push(
                pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
                pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
              )
              connections++
            }
          }
        }

        lineGeo.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(vertices, 3)
        )
      }

      function animate() {
        animId = requestAnimationFrame(animate)

        scrollY += (targetScroll - scrollY) * 0.05
        camera.position.z = 6 - scrollY * 0.002
        camera.rotation.x = scrollY * 0.0003

        const pos = geo.attributes.position.array as Float32Array

        for (let i = 0; i < count; i++) {
          pos[i * 3]     += velocity[i].x
          pos[i * 3 + 1] += velocity[i].y
          pos[i * 3 + 2] += velocity[i].z

          if (pos[i * 3]     >  5 || pos[i * 3]     < -5) velocity[i].x *= -1
          if (pos[i * 3 + 1] >  5 || pos[i * 3 + 1] < -5) velocity[i].y *= -1
          if (pos[i * 3 + 2] >  5 || pos[i * 3 + 2] < -5) velocity[i].z *= -1
        }

        geo.attributes.position.needsUpdate = true

        updateLines()

        points.rotation.y   += ((targetX * 0.2 + scrollY * 0.0002) - points.rotation.y) * 0.03
        points.rotation.x   += ((targetY * 0.2 + scrollY * 0.0001) - points.rotation.x) * 0.03
        lineMesh.rotation.copy(points.rotation)

        renderer.render(scene, camera)
      }

      animate()

      const handleResize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(mount.clientWidth, mount.clientHeight)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('mousemove', handleMouse)
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
        geo.dispose()
        lineGeo.dispose()
        mat.dispose()
        lineMat.dispose()
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
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    />
  )
}
