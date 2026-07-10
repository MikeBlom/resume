import type { Resume } from '../content/schema'

/**
 * Derives the side-scrolling world layout from the content model (ADR-0003):
 * every interactive object's text comes from content, never from scene code.
 * Coordinates are world pixels; the viewport is 960x540.
 */

export const WORLD = {
  width: 3600,
  height: 540,
  groundY: 476,
} as const

export type SectionTheme = 'netherlands' | 'transition' | 'tech'

export interface WorldSection {
  id: string
  theme: SectionTheme
  from: number
  to: number
  label: string
}

export type WorldObjectKind = 'sign' | 'door' | 'gate' | 'beacon'

export interface WorldObjectContent {
  title: string
  period?: string
  body: string
  bullets?: string[]
}

export interface WorldObject {
  id: string
  kind: WorldObjectKind
  x: number
  label: string
  content: WorldObjectContent
  /** Door objects can lead somewhere. */
  action?: 'minigame'
}

export interface WorldLayout {
  sections: WorldSection[]
  objects: WorldObject[]
}

export function buildWorld(resume: Resume): WorldLayout {
  const chapter = (id: string) => {
    const found = resume.chapters.find((c) => c.id === id)
    if (!found) throw new Error(`worldConfig: missing chapter ${id}`)
    return found
  }
  const story = (id: string) => {
    const found = resume.stories.find((s) => s.id === id)
    if (!found) throw new Error(`worldConfig: missing story ${id}`)
    return found
  }
  const job = (id: string) => {
    const found = resume.experience.find((j) => j.id === id)
    if (!found) throw new Error(`worldConfig: missing job ${id}`)
    return found
  }

  const netherlands = chapter('netherlands')
  const edtech = chapter('edtech')
  const future = chapter('future')
  const masteryconnect = job('masteryconnect')
  const instructure = job('instructure')

  const sections: WorldSection[] = [
    { id: 'netherlands', theme: 'netherlands', from: 0, to: 1560, label: netherlands.title },
    { id: 'transition', theme: 'transition', from: 1560, to: 1960, label: 'Crossing the ocean' },
    { id: 'tech', theme: 'tech', from: 1960, to: WORLD.width, label: edtech.title },
  ]

  const objects: WorldObject[] = [
    {
      id: 'ch-netherlands',
      kind: 'sign',
      x: 360,
      label: netherlands.title,
      content: {
        title: netherlands.title,
        period: netherlands.period,
        body: netherlands.summary,
        bullets: netherlands.themes,
      },
    },
    {
      id: 'paper-route',
      kind: 'door',
      x: 820,
      label: story('paper-route').title,
      content: { title: story('paper-route').title, body: story('paper-route').body },
      action: 'minigame',
    },
    {
      id: 'odd-jobs',
      kind: 'sign',
      x: 1240,
      label: story('odd-jobs').title,
      content: { title: story('odd-jobs').title, body: story('odd-jobs').body },
    },
    {
      id: 'leaving-home',
      kind: 'gate',
      x: 1760,
      label: story('leaving-home').title,
      content: { title: story('leaving-home').title, body: story('leaving-home').body },
    },
    {
      id: 'self-taught',
      kind: 'sign',
      x: 2180,
      label: story('self-taught').title,
      content: { title: story('self-taught').title, body: story('self-taught').body },
    },
    {
      id: 'job-masteryconnect',
      kind: 'beacon',
      x: 2560,
      label: masteryconnect.employer,
      content: {
        title: `${masteryconnect.title} · ${masteryconnect.employer}`,
        period: masteryconnect.period,
        body: masteryconnect.summary,
        bullets: masteryconnect.highlights,
      },
    },
    {
      id: 'job-instructure',
      kind: 'beacon',
      x: 2960,
      label: instructure.employer,
      content: {
        title: `${instructure.title} · ${instructure.employer}`,
        period: instructure.period,
        body: instructure.summary,
        bullets: instructure.highlights,
      },
    },
    {
      id: 'future-cta',
      kind: 'sign',
      x: 3360,
      label: future.title,
      content: {
        title: story('future-cta').title,
        period: future.period,
        body: story('future-cta').body,
      },
    },
  ]

  return { sections, objects }
}

/** Distance within which the player can interact with an object. */
export const INTERACT_RADIUS = 70
