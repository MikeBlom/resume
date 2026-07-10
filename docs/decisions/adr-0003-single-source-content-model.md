# ADR-0003 — Single-source typed content model

- **Status:** Accepted (2026-07-10)
- **Deciders:** Mike Blom (decision), AI planning session (analysis)

## Context

Resume facts must appear in (at least) two presentations: the interactive game world and the
traditional HTML resume. Duplicating facts guarantees drift, and the accessible presentation
must be provably equivalent to the game presentation.

## Decision

All resume and story content lives in `content/*.json`, validated by zod schemas in
`src/content/schema.ts`. Both the Phaser world's interactive objects and the HTML resume render
from this single source. **No resume fact is ever hardcoded in a scene or component.** A vitest
suite validates content against the schema in CI.

## Consequences

- Deleting a content entry removes it from every presentation — this is the M0 verification test.
- Chapter/world metadata (object positions, sprites) references content by id rather than
  embedding it.
- Placeholder content is explicitly marked (`"placeholder": true`) so nothing fabricated can
  ship as fact; CI can later gate on zero placeholders for launch.
