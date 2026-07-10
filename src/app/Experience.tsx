import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { resume } from '../content'
import { bus } from '../game/bus'
import { buildWorld, type WorldObject } from '../game/worldConfig'
import { ambient } from './audio'
import { CloudLayer } from './CloudLayer'
import { ContentPanel } from './ContentPanel'
import { GameCanvas } from './GameCanvas'
import { StoryMode } from './StoryMode'
import { TouchControls } from './TouchControls'

type Mode = 'intro' | 'game' | 'story'

export function Experience() {
  const layout = useMemo(() => buildWorld(resume), [])
  const reducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )
  const [searchParams, setSearchParams] = useSearchParams()
  const [mode, setMode] = useState<Mode>(() => {
    const urlMode = searchParams.get('mode')
    if (urlMode === 'story') return 'story'
    if (urlMode === 'game') return 'game'
    return reducedMotion ? 'story' : 'intro'
  })
  const [panel, setPanel] = useState<WorldObject | null>(null)
  const [cloudOpen, setCloudOpen] = useState(false)
  const [nearId, setNearId] = useState<string | null>(null)
  const [inMiniGame, setInMiniGame] = useState(false)
  const [audioOn, setAudioOn] = useState(false)

  // Phaser -> React: world events
  useEffect(() => {
    const offInteract = bus.on('interact', ({ id }) => {
      const object = layout.objects.find((o) => o.id === id)
      if (object) setPanel(object)
    })
    const offNear = bus.on('near', ({ id }) => setNearId(id))
    return () => {
      offInteract()
      offNear()
    }
  }, [layout])

  // React -> Phaser: pause the world while any overlay is open
  useEffect(() => {
    bus.emit('overlay', { open: panel !== null || cloudOpen })
  }, [panel, cloudOpen])

  // Global keys: Esc closes panels / toggles the cloud layer
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || mode !== 'game') return
      if (panel) setPanel(null)
      else setCloudOpen((open) => !open)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mode, panel])

  useEffect(() => {
    if (audioOn) ambient.start()
    else ambient.stop()
    return () => ambient.stop()
  }, [audioOn])

  const switchMode = (next: Mode) => {
    setPanel(null)
    setCloudOpen(false)
    setInMiniGame(false)
    setMode(next)
    setSearchParams(next === 'intro' ? {} : { mode: next }, { replace: true })
  }

  const enterMiniGame = () => {
    setPanel(null)
    setInMiniGame(true)
    bus.emit('minigame', { active: true })
  }

  const leaveMiniGame = () => {
    setInMiniGame(false)
    bus.emit('minigame', { active: false })
  }

  if (mode === 'story') {
    return <StoryMode layout={layout} onSwitchToGame={() => switchMode('game')} />
  }

  if (mode === 'intro') {
    return (
      <main className="landing">
        <div className="landing-inner">
          <p className="landing-kicker" aria-hidden="true">
            ▸ press start
          </p>
          <h1>{resume.basics.name}</h1>
          <p className="landing-tagline">{resume.basics.tagline}</p>
          <nav aria-label="Primary">
            <ul className="landing-actions">
              <li>
                <button
                  type="button"
                  className="button button-primary"
                  onClick={() => switchMode('game')}
                >
                  Enter the world
                </button>
              </li>
              <li>
                <Link className="button" to="/resume">
                  View resume
                </Link>
              </li>
              <li>
                <button type="button" className="button" onClick={() => switchMode('story')}>
                  Story mode (no game)
                </button>
              </li>
            </ul>
          </nav>
          <p className="landing-note">
            A side-scrolling walk through my life — the Netherlands, a decade of service, and twelve
            years of engineering leadership. Move with ← → · jump with Space · press E at the
            markers. Esc opens the clouds.
          </p>
        </div>
      </main>
    )
  }

  const nearObject = nearId ? layout.objects.find((o) => o.id === nearId) : null

  return (
    <div className="game-shell">
      <GameCanvas reducedMotion={reducedMotion} />

      <div className="game-topbar">
        <span className="game-title">{resume.basics.name}</span>
        <div className="game-topbar-actions">
          <Link className="button button-small" to="/resume">
            View resume
          </Link>
          <button
            type="button"
            className="button button-small"
            onClick={() => setCloudOpen(true)}
            aria-haspopup="dialog"
          >
            ☁ Clouds (Esc)
          </button>
        </div>
      </div>

      {nearObject && !panel && !cloudOpen && !inMiniGame && (
        <p className="near-hint" role="status">
          <strong>{nearObject.label}</strong> — press E or tap !
        </p>
      )}

      {inMiniGame && (
        <button type="button" className="button minigame-leave" onClick={leaveMiniGame}>
          Leave the mini-game
        </button>
      )}

      <TouchControls interactVisible={nearObject !== null} />

      {panel && (
        <ContentPanel
          object={panel}
          onClose={() => setPanel(null)}
          onEnterMiniGame={panel.action === 'minigame' ? enterMiniGame : undefined}
        />
      )}

      {cloudOpen && (
        <CloudLayer
          objects={layout.objects}
          audioOn={audioOn}
          onToggleAudio={() => setAudioOn((on) => !on)}
          onOpenObject={(object) => {
            setCloudOpen(false)
            setPanel(object)
          }}
          onSwitchToStory={() => switchMode('story')}
          onClose={() => setCloudOpen(false)}
        />
      )}
    </div>
  )
}
