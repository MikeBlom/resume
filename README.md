# Mike Blom — Interactive Resume & AI-Directed Development Case Study

This repository is two things at once:

1. **An interactive resume** — an original retro pixel-art side-scrolling experience that walks
   visitors through my life and career: growing up in the Netherlands, serving in the US Army
   infantry, twelve years growing from self-taught software engineer into engineering leadership,
   and the unwritten chapter ahead. A traditional, printable resume is always one click away —
   the game is optional, the information never is.
2. **A public case study in AI-directed software development** — every stage of this project
   (discovery, requirements, architecture, implementation, reviews, testing, deployment, costs)
   is directed by me and executed with AI assistance, and the full process is documented here so
   others can reproduce it.

## Status

🚧 **Milestone 0** — foundation, transparency skeleton, and the traditional resume page.

## The process, documented

| What | Where |
|---|---|
| Product vision & requirements | [`docs/requirements/`](docs/requirements/) |
| Architecture decision records | [`docs/decisions/`](docs/decisions/) |
| AI prompt & session logs (curated, redacted) | [`docs/prompts/`](docs/prompts/) |
| Code / security / accessibility / performance reviews | [`docs/reviews/`](docs/reviews/) |
| Test plans and results | [`docs/testing/`](docs/testing/) |
| Design & visual-language guidelines | [`docs/design/`](docs/design/) |
| Development workflow & how to reproduce this process | [`docs/process/`](docs/process/) |
| Cost ledger (AI + infrastructure) | [`docs/costs/`](docs/costs/) |
| Retrospectives | [`docs/retrospective/`](docs/retrospective/) |

## Development

```sh
npm install
npm run dev        # local dev server
npm run lint       # oxlint
npm run typecheck  # tsc
npm run test       # vitest
npm run build      # production build
```

## License

Code is licensed under [MIT](LICENSE). Resume content, personal story content, and original
artwork in `content/` and `public/assets/` are **not** licensed for reuse — all rights reserved.
This project is inspired by the feel of NES-era platformers but contains no Nintendo assets,
characters, music, or level designs; see
[`docs/design/visual-language.md`](docs/design/visual-language.md) for the originality guidelines.
