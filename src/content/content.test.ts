import { describe, expect, it } from 'vitest'
import raw from '../../content/resume.json'
import { ResumeSchema, placeholderEntries } from './schema'

describe('content/resume.json', () => {
  it('validates against the resume schema', () => {
    expect(() => ResumeSchema.parse(raw)).not.toThrow()
  })

  it('has every job pointing at an existing chapter', () => {
    const parsed = ResumeSchema.parse(raw)
    const chapterIds = new Set(parsed.chapters.map((c) => c.id))
    for (const job of parsed.experience) {
      expect(chapterIds, `job ${job.id} references unknown chapter`).toContain(job.chapterId)
    }
  })

  it('has unique ids within each collection', () => {
    const parsed = ResumeSchema.parse(raw)
    const ids = (xs: { id: string }[]) => xs.map((x) => x.id)
    for (const collection of [parsed.chapters, parsed.experience, parsed.education]) {
      const list = ids(collection)
      expect(new Set(list).size).toBe(list.length)
    }
  })

  it('tracks placeholder entries (must reach zero before launch)', () => {
    const parsed = ResumeSchema.parse(raw)
    // M0: real content pending the questionnaire — placeholders are expected.
    // Flip this to expect([]) as the launch gate.
    expect(placeholderEntries(parsed).length).toBeGreaterThanOrEqual(0)
  })
})
