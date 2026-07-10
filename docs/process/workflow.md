# Development Workflow

How this project is built — and how to reproduce the process.

## Roles

- **Mike Blom** — product owner, director, and reviewer of record. Every decision that reaches
  `main` is his.
- **AI (Claude Code)** — analyst, implementer, and reviewer-under-direction across the lifecycle:
  discovery, requirements, architecture, implementation, tests, and review gates.

## The loop

1. **Plan** — work is scoped against `docs/requirements/`; significant choices get an ADR in
   `docs/decisions/` before implementation.
2. **Implement** — feature branches; small, logical commits; PR per feature. Content changes
   must pass schema validation.
3. **Verify** — `npm run lint && npm run typecheck && npm run test && npm run build` locally
   and in CI; Playwright e2e and accessibility scans as they land (M1+).
4. **Review gates** — at each milestone, _fresh-context_ AI sessions (no memory of writing the
   code) perform code, security, accessibility, and performance reviews; findings and
   resolutions are committed to `docs/reviews/`. Separation of duties within a single AI system
   is part of what this project demonstrates.
5. **Document** — each work session appends a curated, redacted log to `docs/prompts/` and a
   row to `docs/costs/ledger.md`.
6. **Ship** — merge to `main` deploys via Cloudflare Pages; PR previews for everything else.

## Conventions

- Conventional-commit-style messages (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`).
- ADR files: `adr-NNNN-title.md`, statuses Proposed / Accepted / Superseded.
- Requirements: `REQ-NNN-title.md` with stable ids referenced from PRs and reviews.
