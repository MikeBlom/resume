import { controls } from '../game/bus'

/**
 * On-screen controls, shown only on coarse-pointer devices (CSS media query).
 * Buttons write the shared control state the world scene reads every frame.
 */
export function TouchControls({ interactVisible }: { interactVisible: boolean }) {
  const hold = (key: 'left' | 'right' | 'jump') => ({
    onPointerDown: (event: React.PointerEvent) => {
      event.preventDefault()
      controls[key] = true
    },
    onPointerUp: () => {
      controls[key] = false
    },
    onPointerLeave: () => {
      controls[key] = false
    },
    onPointerCancel: () => {
      controls[key] = false
    },
  })

  return (
    <div className="touch-controls" aria-hidden="true">
      <div className="touch-pad">
        <button type="button" className="touch-button" {...hold('left')}>
          ◀
        </button>
        <button type="button" className="touch-button" {...hold('right')}>
          ▶
        </button>
      </div>
      <div className="touch-pad">
        {interactVisible && (
          <button
            type="button"
            className="touch-button touch-interact"
            onPointerDown={(event) => {
              event.preventDefault()
              controls.interact = true
            }}
          >
            !
          </button>
        )}
        <button type="button" className="touch-button" {...hold('jump')}>
          ⤒
        </button>
      </div>
    </div>
  )
}
