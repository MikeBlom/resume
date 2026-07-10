# ADR-0004 — World/React bridge: event bus, DOM overlays, and lazy engine loading

- **Status:** Accepted (2026-07-10)
- **Deciders:** Mike Blom (approval), AI implementation session (design)

## Context

ADR-0001 committed to "DOM is the system of record; canvas is a presentation." M1 needed the
concrete mechanism: how the Phaser world and the React shell communicate, and how the engine
stays off the resume-critical routes.

## Decision

1. **Typed event bus** (`src/game/bus.ts`): Phaser emits world events (`interact`, `near`,
   `section`); React emits UI state (`overlay`, `minigame`). A shared `controls` object carries
   keyboard/touch input into the scene's update loop. No direct references between React
   components and Phaser scenes.
2. **All reading happens in the DOM.** World objects only carry ids; interacting emits the id
   and React renders the content (from the content model) in an accessible dialog. The cloud
   layer's _world index_ opens the same dialogs without playing — that is the screen-reader and
   no-canvas path, tested with axe.
3. **Story mode** (`/?mode=story`) renders the entire journey as plain HTML from the same
   `worldConfig` layout — the reduced-motion default and the provable-equivalence artifact.
4. **The engine loads lazily.** `src/game/create.ts` (and Phaser with it) is a dynamic import;
   `/resume` ships ~99 KB gzip while the world chunk (~360 KB gzip) loads only on entry.
5. **Mini-game transfer uses scene sleep/wake** (`scene.switch`), so returning from a mini-game
   restores the player exactly where they entered — the architectural point the shell exists to
   prove.

## Consequences

- Pause semantics: any open overlay pauses the active scene via the bus; scenes own their own
  pause/resume handlers.
- Placeholder art is generated at runtime (`textures.ts`) — zero external assets in the POC,
  originality by construction; M2 replaces textures without touching the bridge.
- A unit test asserts every world object's text is sourced from the content model.
