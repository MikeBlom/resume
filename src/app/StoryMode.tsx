import { Link } from 'react-router-dom'
import { resume } from '../content'
import type { WorldLayout } from '../game/worldConfig'
import { SiteNav } from './SiteNav'

interface Props {
  layout: WorldLayout
  onSwitchToGame?: () => void
}

/**
 * The reduced-motion / no-game equivalent of the world: the same journey,
 * the same content, as a plain readable page. Nothing here is exclusive to
 * the canvas — and nothing in the canvas is missing here.
 */
export function StoryMode({ layout, onSwitchToGame }: Props) {
  return (
    <div className="page">
      <SiteNav />
      <main className="prose story-mode">
        <h1>{resume.basics.name} — the journey</h1>
        <p className="story-intro">
          This is the story-mode version of the interactive world: the same walk through my life,
          left to right, as readable text.{' '}
          {onSwitchToGame ? (
            <button type="button" className="link-button" onClick={onSwitchToGame}>
              Prefer to play it? Enter the world.
            </button>
          ) : null}{' '}
          In a hurry? <Link to="/resume">The traditional resume</Link> is the fast path.
        </p>

        {layout.sections.map((section) => {
          const objects = layout.objects
            .filter((object) => object.x >= section.from && object.x < section.to)
            .sort((a, b) => a.x - b.x)
          return (
            <section key={section.id} aria-labelledby={`story-${section.id}`}>
              <h2 id={`story-${section.id}`}>{section.label}</h2>
              {objects.map((object) => (
                <article key={object.id} className="story-stop">
                  <h3>{object.content.title}</h3>
                  {object.content.period && (
                    <p className="resume-period">{object.content.period}</p>
                  )}
                  <p>{object.content.body}</p>
                  {object.content.bullets && (
                    <ul>
                      {object.content.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </section>
          )
        })}
      </main>
    </div>
  )
}
