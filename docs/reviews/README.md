# Review Gates

At each milestone, four reviews run before merge to `main`, each performed by a **fresh-context
AI session** (one that did not write the code), directed and accepted by Mike:

1. **Code review** — correctness, simplification, maintainability
2. **Security review** — threat-model-driven (supply chain, XSS via content, secrets, privacy)
3. **Accessibility review** — keyboard, screen reader, reduced motion, contrast, axe scans
4. **Performance review** — bundle budgets, lazy loading, Core Web Vitals

Each review is committed here as `mN-<type>-review.md` containing findings, severity,
resolution, and what was deliberately not fixed (with reasons).
