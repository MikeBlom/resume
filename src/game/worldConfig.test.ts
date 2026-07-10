import { describe, expect, it } from 'vitest'
import { resume } from '../content'
import { INTERACT_RADIUS, WORLD, buildWorld } from './worldConfig'

describe('worldConfig', () => {
  const layout = buildWorld(resume)

  it('builds sections that tile the world exactly, left to right', () => {
    expect(layout.sections[0].from).toBe(0)
    expect(layout.sections.at(-1)!.to).toBe(WORLD.width)
    for (let i = 1; i < layout.sections.length; i++) {
      expect(layout.sections[i].from).toBe(layout.sections[i - 1].to)
    }
  })

  it('places every object inside the world, in walk order', () => {
    const xs = layout.objects.map((o) => o.x)
    expect([...xs].sort((a, b) => a - b)).toEqual(xs)
    for (const x of xs) {
      expect(x).toBeGreaterThan(0)
      expect(x).toBeLessThan(WORLD.width)
    }
  })

  it('spaces objects so interact zones never overlap ambiguously', () => {
    for (let i = 1; i < layout.objects.length; i++) {
      expect(layout.objects[i].x - layout.objects[i - 1].x).toBeGreaterThan(INTERACT_RADIUS * 2)
    }
  })

  it('derives every object from content (no fabricated resume facts in scenes)', () => {
    const contentText = [
      ...resume.chapters.flatMap((c) => [c.title, c.summary]),
      ...resume.stories.flatMap((s) => [s.title, s.body]),
      ...resume.experience.flatMap((j) => [`${j.title} · ${j.employer}`, j.summary]),
    ]
    for (const object of layout.objects) {
      expect(
        contentText.some((text) => text === object.content.title || text === object.content.body),
        `object ${object.id} content must come from the content model`,
      ).toBe(true)
    }
  })

  it('has exactly one mini-game door in the POC', () => {
    expect(layout.objects.filter((o) => o.action === 'minigame')).toHaveLength(1)
  })
})
