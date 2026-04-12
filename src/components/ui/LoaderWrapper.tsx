'use client'

import { useState } from 'react'
import { Loader } from './Loader'

export function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  return (
    <>
      {!ready && <Loader onComplete={() => setReady(true)} />}
      <div style={{ visibility: ready ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </>
  )
}
