import { useEffect, useRef, useState } from 'react'
import { resume } from '../content'

/** Mounts the Phaser world. The engine is dynamically imported so /resume never loads it. */
export function GameCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    let game: { destroy: (removeCanvas: boolean) => void } | undefined
    void import('../game/create').then(({ createGame }) => {
      if (cancelled || !ref.current) return
      game = createGame(ref.current, resume, { reducedMotion })
      setLoading(false)
    })
    return () => {
      cancelled = true
      game?.destroy(true)
    }
  }, [reducedMotion])

  return (
    <div className="game-canvas" ref={ref}>
      {loading && <p className="game-loading">Loading the world…</p>}
    </div>
  )
}
