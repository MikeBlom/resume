import raw from '../../content/resume.json'
import { ResumeSchema, type Resume } from './schema'

/** Validated at module load: invalid content fails the build/tests, not the visitor. */
export const resume: Resume = ResumeSchema.parse(raw)

export { placeholderEntries } from './schema'
export type { Resume, Job, Chapter } from './schema'
