import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { resume } from '../content'
import type { WorldObject } from '../game/worldConfig'

interface Props {
  objects: WorldObject[]
  audioOn: boolean
  onToggleAudio: () => void
  onOpenObject: (object: WorldObject) => void
  onSwitchToStory: () => void
  onClose: () => void
}

/**
 * The cloud layer: persistent navigation above the world. Everything the game
 * communicates is reachable from here without playing — links, the full world
 * index, settings, and the traditional resume.
 */
export function CloudLayer({
  objects,
  audioOn,
  onToggleAudio,
  onOpenObject,
  onSwitchToStory,
  onClose,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className="cloud-layer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cloud-title"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === 'Escape') onClose()
        }}
      >
        <div className="cloud-header">
          <h2 id="cloud-title">☁ Above the world</h2>
          <button type="button" className="button" onClick={onClose} ref={closeRef}>
            Back down
          </button>
        </div>

        <div className="cloud-columns">
          <section aria-labelledby="cloud-nav">
            <h3 id="cloud-nav">The fast path</h3>
            <ul>
              <li>
                <Link to="/resume">Traditional resume (printable, PDF)</Link>
              </li>
              <li>
                <Link to="/how-it-was-built">How this site is being built</Link>
              </li>
              {resume.basics.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url}>{link.label}</a>
                </li>
              ))}
            </ul>
            <h3>Settings</h3>
            <ul className="cloud-settings">
              <li>
                <button type="button" className="button" onClick={onToggleAudio}>
                  Sound: {audioOn ? 'on' : 'off'}
                </button>
              </li>
              <li>
                <button type="button" className="button" onClick={onSwitchToStory}>
                  Switch to story mode (no game)
                </button>
              </li>
            </ul>
            <h3>Controls</h3>
            <p className="cloud-controls-help">
              Move: ← → or A D · Jump: ↑ / W / Space · Interact: E · Menu: Esc. On touch screens,
              use the on-screen buttons.
            </p>
          </section>

          <section aria-labelledby="cloud-index">
            <h3 id="cloud-index">World index — every stop on the road</h3>
            <ul className="world-index">
              {objects.map((object) => (
                <li key={object.id}>
                  <button type="button" onClick={() => onOpenObject(object)}>
                    {object.label}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
