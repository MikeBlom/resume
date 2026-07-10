import { Link } from 'react-router-dom'
import { resume } from '../content'

export function Landing() {
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
              <Link className="button button-primary" to="/resume">
                View resume
              </Link>
            </li>
            <li>
              <Link className="button" to="/how-it-was-built">
                How this site is being built
              </Link>
            </li>
          </ul>
        </nav>
        <p className="landing-note">
          An interactive side-scrolling version of this resume — a walk through the Netherlands, the
          US Army, and twelve years of engineering leadership — is under construction. The resume
          above is always the fastest path.
        </p>
      </div>
    </main>
  )
}
