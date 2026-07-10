/**
 * Tiny typed event bus bridging the Phaser world and the React shell.
 * React owns all UI (panels, cloud layer, hints); Phaser emits world events
 * and reads the shared control state written by keyboard/touch UI.
 */

export interface BusEvents {
  /** Player pressed interact while near an object (id from worldConfig). */
  interact: { id: string }
  /** Player moved near / away from an interactive object. */
  near: { id: string | null }
  /** React overlay opened/closed — world pauses while any overlay is open. */
  overlay: { open: boolean }
  /** Enter / leave the mini-game shell. */
  minigame: { active: boolean }
  /** Player progressed into a section (for ambient UI, analytics later). */
  section: { id: string }
}

type Handler<K extends keyof BusEvents> = (payload: BusEvents[K]) => void

class Bus {
  private handlers = new Map<keyof BusEvents, Set<Handler<never>>>()

  on<K extends keyof BusEvents>(event: K, handler: Handler<K>): () => void {
    const set = this.handlers.get(event) ?? new Set()
    set.add(handler as Handler<never>)
    this.handlers.set(event, set)
    return () => set.delete(handler as Handler<never>)
  }

  emit<K extends keyof BusEvents>(event: K, payload: BusEvents[K]): void {
    this.handlers.get(event)?.forEach((handler) => (handler as Handler<K>)(payload))
  }
}

export const bus = new Bus()

/** Control state shared between React (keyboard/touch writers) and Phaser (reader). */
export const controls = {
  left: false,
  right: false,
  jump: false,
  /** One-shot: set by UI, consumed by the world scene. */
  interact: false,
}
