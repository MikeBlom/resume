import { useEffect, useRef } from 'react'
import type { WorldObject } from '../game/worldConfig'

interface Props {
  object: WorldObject
  onClose: () => void
  onEnterMiniGame?: () => void
}

/** DOM presentation of a world object — the accessible system of record (ADR-0001). */
export function ContentPanel({ object, onClose, onEnterMiniGame }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
  }, [object.id])

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className="content-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-title"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === 'Escape') onClose()
        }}
      >
        <h2 id="panel-title">{object.content.title}</h2>
        {object.content.period && <p className="panel-period">{object.content.period}</p>}
        <p>{object.content.body}</p>
        {object.content.bullets && (
          <ul>
            {object.content.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}
        <div className="panel-actions">
          {object.action === 'minigame' && onEnterMiniGame && (
            <button type="button" className="button button-primary" onClick={onEnterMiniGame}>
              Step through the door
            </button>
          )}
          <button type="button" className="button" onClick={onClose} ref={closeRef}>
            Back to the world
          </button>
        </div>
      </div>
    </div>
  )
}
