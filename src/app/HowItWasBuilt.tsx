import { SiteNav } from './SiteNav'

const REPO = 'https://github.com/MikeBlom/resume'

const artifacts = [
  { label: 'Requirements & product vision', path: 'docs/requirements' },
  { label: 'Architecture decision records', path: 'docs/decisions' },
  { label: 'AI prompt & session logs (curated)', path: 'docs/prompts' },
  { label: 'Review reports — code, security, accessibility, performance', path: 'docs/reviews' },
  { label: 'Test plan and results', path: 'docs/testing' },
  { label: 'Visual language & originality guidelines', path: 'docs/design' },
  { label: 'Development workflow & reproduction guide', path: 'docs/process' },
  { label: 'Cost ledger — what AI-directed development actually costs', path: 'docs/costs' },
]

export function HowItWasBuilt() {
  return (
    <div className="page">
      <SiteNav />
      <main className="prose">
        <h1>How this site is being built</h1>
        <p>
          This project is a live case study in AI-directed software development. I direct the
          process — product decisions, architecture choices, reviews of record — and AI executes
          alongside me through every stage of the lifecycle: discovery, requirements, architecture,
          implementation, testing, and dedicated review gates for code quality, security,
          accessibility, and performance.
        </p>
        <p>
          Everything is public, from the first commit: the requirements, the decision records,
          curated logs of the AI sessions, every review finding, and an honest ledger of what it
          costs.
        </p>
        <h2>The artifacts</h2>
        <ul>
          {artifacts.map((artifact) => (
            <li key={artifact.path}>
              <a href={`${REPO}/tree/main/${artifact.path}`}>{artifact.label}</a>
            </li>
          ))}
        </ul>
        <p>
          <a href={REPO}>Browse the full repository on GitHub →</a>
        </p>
      </main>
    </div>
  )
}
