# Test Plan

| Layer             | Tool                                     | What it proves                                                                                                   | Since |
| ----------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----- |
| Content schema    | Vitest + zod                             | All content validates; no unmarked placeholders at launch                                                        | M0    |
| Unit              | Vitest                                   | Game logic, content transforms                                                                                   | M1    |
| End-to-end        | Playwright                               | Keyboard-only journey, mini-game enter/return, cloud layer, reduced-motion equivalence                           | M1    |
| Accessibility     | axe-core via Playwright                  | Zero violations on HTML views                                                                                    | M0/M1 |
| Performance       | Lighthouse CI                            | `/resume` ≥95 perf/a11y/SEO; world lazy-loaded; budgets: <200 KB initial on `/resume`, <1.8 MB interactive world | M1    |
| Real devices      | Manual pass, iOS Safari + Android Chrome | Touch controls actually good                                                                                     | M1    |
| Visual regression | (deferred)                               | Post-v1                                                                                                          | —     |

Results snapshots are committed per milestone alongside review reports.
