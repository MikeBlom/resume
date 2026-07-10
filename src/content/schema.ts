import { z } from 'zod'

/**
 * Single source of truth for all resume and story content (ADR-0003).
 * Both the HTML resume and the game world render from data validated here;
 * no resume fact may be hardcoded in a component or scene.
 *
 * `placeholder: true` marks entries whose details are not yet confirmed by
 * Mike — placeholders may render in development but must be zero at launch.
 */

const LinkSchema = z.object({
  label: z.string().min(1),
  url: z.url(),
})

const BasicsSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  location: z.string().optional(),
  summary: z.string().min(1),
  philosophy: z.string().optional(),
  links: z.array(LinkSchema),
  placeholder: z.boolean().default(false),
})

const ChapterSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  period: z.string().min(1),
  summary: z.string().min(1),
  themes: z.array(z.string().min(1)).min(1),
  placeholder: z.boolean().default(false),
})

const JobSchema = z.object({
  id: z.string().min(1),
  chapterId: z.string().min(1),
  employer: z.string().min(1),
  title: z.string().min(1),
  period: z.string().min(1),
  summary: z.string().min(1),
  highlights: z.array(z.string().min(1)),
  technologies: z.array(z.string().min(1)).optional(),
  placeholder: z.boolean().default(false),
})

const MilitaryServiceSchema = z.object({
  branch: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  summary: z.string().min(1),
  deployments: z.array(z.string().min(1)),
  lessons: z.array(z.string().min(1)),
  placeholder: z.boolean().default(false),
})

const EducationSchema = z.object({
  id: z.string().min(1),
  institution: z.string().min(1),
  credential: z.string().min(1),
  period: z.string().min(1),
  placeholder: z.boolean().default(false),
})

const SkillGroupSchema = z.object({
  name: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
  placeholder: z.boolean().default(false),
})

export const ResumeSchema = z.object({
  basics: BasicsSchema,
  chapters: z.array(ChapterSchema).min(1),
  experience: z.array(JobSchema),
  military: MilitaryServiceSchema,
  education: z.array(EducationSchema),
  skills: z.array(SkillGroupSchema),
})

export type Resume = z.infer<typeof ResumeSchema>
export type Job = z.infer<typeof JobSchema>
export type Chapter = z.infer<typeof ChapterSchema>

/** Every entry that carries unconfirmed details, for launch gating and dev banners. */
export function placeholderEntries(resume: Resume): string[] {
  const flagged: string[] = []
  if (resume.basics.placeholder) flagged.push('basics')
  for (const c of resume.chapters) if (c.placeholder) flagged.push(`chapter:${c.id}`)
  for (const j of resume.experience) if (j.placeholder) flagged.push(`job:${j.id}`)
  if (resume.military.placeholder) flagged.push('military')
  for (const e of resume.education) if (e.placeholder) flagged.push(`education:${e.id}`)
  for (const s of resume.skills) if (s.placeholder) flagged.push(`skills:${s.name}`)
  return flagged
}
