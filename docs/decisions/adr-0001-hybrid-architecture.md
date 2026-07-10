# ADR-0001 — Hybrid architecture: Phaser 3 canvas world inside a React/HTML shell

- **Status:** Accepted (2026-07-10)
- **Deciders:** Mike Blom (decision), AI planning session (analysis)

## Context

The site must be simultaneously a side-scrolling game and a fully accessible professional
resume. A canvas is opaque to screen readers and search engines; a pure DOM "world" makes
camera work, physics feel, and mini-games hard.

## Decision

- **React + Vite + TypeScript shell** owns routing (`/`, `/resume`, `/how-it-was-built`), the
  cloud-layer UI, overlays, focus management, and every piece of resume content as semantic HTML.
- **Phaser 3** renders the game world in a canvas mounted inside the shell, giving us arcade
  physics, tilemaps, camera follow, input handling, and scene management (world ↔ mini-games
  with return-to-position).
- **The DOM is the system of record; the canvas is a presentation of it.** World-interactive
  objects mirror into a focusable DOM index; `prefers-reduced-motion` swaps the world for a
  page-mode equivalent.

## Alternatives considered

- **Pure DOM/CSS world** — best accessibility, weakest game feel; remains the documented
  fallback if Phaser fights the hybrid.
- **PixiJS + custom engine** — smaller bundle, much more code before "feels good."
- **Unity/Godot → wasm** — payload size and accessibility hostile; rejected.

## Consequences

- ~1.1 MB engine bundle: the world must be lazy-loaded; `/resume` must never pay that cost.
- Escape hatch: the M1 POC gate explicitly re-evaluates this choice before chapter buildout.
