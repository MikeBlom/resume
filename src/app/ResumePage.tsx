import { placeholderEntries, resume } from '../content'
import { SiteNav } from './SiteNav'

export function ResumePage() {
  const pending = placeholderEntries(resume)

  return (
    <div className="page">
      <SiteNav />
      {pending.length > 0 && (
        <p className="placeholder-banner" role="note">
          Work in progress: sections of this resume still hold structured placeholders while the
          full content lands. The project is being built in public —{' '}
          <a href="https://github.com/MikeBlom/resume">follow along on GitHub</a>.
        </p>
      )}
      <main className="resume">
        <header className="resume-header">
          <h1>{resume.basics.name}</h1>
          <p className="resume-tagline">{resume.basics.tagline}</p>
          <ul className="resume-links">
            {resume.basics.links.map((link) => (
              <li key={link.url}>
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
          <p className="resume-actions print-hidden">
            <a className="button button-primary" href="/Mike-Blom-Resume.pdf" download>
              Download PDF
            </a>
            <button type="button" className="button" onClick={() => window.print()}>
              Print this resume
            </button>
          </p>
        </header>

        <section aria-labelledby="summary-heading">
          <h2 id="summary-heading">Summary</h2>
          <p>{resume.basics.summary}</p>
        </section>

        {resume.basics.philosophy && (
          <section aria-labelledby="philosophy-heading">
            <h2 id="philosophy-heading">Leadership philosophy</h2>
            <p>{resume.basics.philosophy}</p>
          </section>
        )}

        <section aria-labelledby="experience-heading">
          <h2 id="experience-heading">Experience</h2>
          {resume.experience.map((job) => (
            <article key={job.id} className="resume-entry">
              <h3>
                {job.title} · {job.employer}
              </h3>
              <p className="resume-period">{job.period}</p>
              <p>{job.summary}</p>
              <ul>
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section aria-labelledby="military-heading">
          <h2 id="military-heading">Military service</h2>
          <article className="resume-entry">
            <h3>
              {resume.military.role} · {resume.military.branch}
            </h3>
            <p className="resume-period">
              {resume.military.period} · {resume.military.deployments.join(', ')}
            </p>
            <p>{resume.military.summary}</p>
            <ul>
              {resume.military.lessons.map((lesson) => (
                <li key={lesson}>{lesson}</li>
              ))}
            </ul>
          </article>
        </section>

        <section aria-labelledby="skills-heading">
          <h2 id="skills-heading">Skills</h2>
          {resume.skills.map((group) => (
            <p key={group.name} className="resume-skills">
              <strong>{group.name}:</strong> {group.items.join(' · ')}
            </p>
          ))}
        </section>

        {resume.education.length > 0 && (
          <section aria-labelledby="education-heading">
            <h2 id="education-heading">Education</h2>
            {resume.education.map((entry) => (
              <article key={entry.id} className="resume-entry">
                <h3>{entry.credential}</h3>
                <p className="resume-period">
                  {entry.institution} · {entry.period}
                </p>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}
