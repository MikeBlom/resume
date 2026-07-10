# ADR-0002 — Hosting on Cloudflare Pages

- **Status:** Accepted (2026-07-10)
- **Deciders:** Mike Blom

## Context

Fully static site; minimal budget (~$50–150 total); need per-PR preview deploys because the
review workflow is part of the public case study; traffic may spike from LinkedIn/HN shares.

## Decision

Cloudflare Pages: free tier with unlimited bandwidth, per-PR preview deployments, custom domain
support, global CDN. Cloudflare Web Analytics (free, cookieless, no consent banner) for
observability.

## Alternatives considered

- **Vercel** — excellent DX; hobby-tier bandwidth limits and commercial-use terms are a gray
  area for a resume site.
- **GitHub Pages** — $0 and maximally transparent, but no built-in per-PR previews, which
  weakens the documented review workflow.

## Consequences

- CI deploys via Cloudflare's GitHub integration or `wrangler`; a `CLOUDFLARE_API_TOKEN`
  repository secret is required (never committed).
- Custom domain DNS moves to / is configured in Cloudflare.
