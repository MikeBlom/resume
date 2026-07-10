# REQ-000 — Product Vision

## Two products, one repository

1. **The resume experience.** An original retro pixel-art side-scroller. A character representing
   Mike — visibly aging across the journey — walks left to right through four life chapters:

   | Chapter                 | Period                                                        | Themes                                                          |
   | ----------------------- | ------------------------------------------------------------- | --------------------------------------------------------------- |
   | 1. Netherlands          | Childhood & teens; paper route                                | Responsibility, independence, work ethic                        |
   | 2. US Army infantry     | Immigration; deployments to Iraq & Afghanistan                | Leadership, accountability, performing under pressure           |
   | 3. Software & edtech    | 2014 → present; self-taught engineer → engineering leadership | Growth, technical strategy, team development, AI-era leadership |
   | 4. The unwritten future | Next                                                          | Open, forward-looking; professional call to action              |

   Optional discoverable mini-games, original chapter-transition set pieces, bidirectional
   movement, and a persistent cloud/sky layer that opens a traditional resume and navigation.

2. **The case study.** This public repository documents the complete AI-directed software
   development lifecycle — requirements, prompts, decisions, reviews, tests, costs, lessons —
   reproducibly enough that another person could run the same process.

## Non-negotiables

- A hiring manager can determine Mike's qualifications **without playing anything**. The
  traditional resume is a first-class path, reachable within seconds of landing.
- **Zero Nintendo assets or trade dress.** Inspired by the platformer genre, never a re-skin.
  See `docs/design/visual-language.md`.
- The military chapter is **respectful**: coordination and leadership framing, never combat
  gameplay; every published detail is explicitly approved by Mike.
- **Accessibility is first-class**: keyboard-complete, reduced-motion equivalent, screen-reader
  path for all resume content, visible focus states, contrast-checked palette.
- **No secrets, private personal information, employer-confidential information, or sensitive
  military information** is ever committed. See `docs/process/redaction-checklist.md`.

## Primary personas

- **The recruiter / hiring manager (3 minutes, often mobile).** Needs qualifications fast;
  uses the traditional view; may sample the game for 30 seconds.
- **The curious engineer / engineering leader (15–30 minutes).** Plays the experience, reads
  the case study, judges craft.
- **The process learner.** Came for "how do you direct AI through a full SDLC"; reads `docs/`.

## Success criteria

- A first-time visitor can answer "what does Mike do and how senior is he?" in under 60 seconds.
- The experience is delightful enough that visitors mention it (the game is the hook), while the
  resume information remains fully legible without it.
- The repository stands alone as a reproducible reference for AI-directed development.
