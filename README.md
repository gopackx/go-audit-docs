# Go Audit Documentation

Documentation site for [Go Audit](https://github.com/gopackx/go-audit),
built with [Next.js 16](https://nextjs.org) + [Fumadocs 16](https://fumadocs.vercel.app)
and styled with Tailwind CSS v4.

Production URL: `https://go-audit.andrianprasetya.com`

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack in dev)
- **Docs engine**: Fumadocs UI 16 + Fumadocs MDX 12
- **Styling**: Tailwind CSS v4 (CSS-first config in `app/global.css`)
- **Runtime**: React 19.2
- **Package manager**: Bun 1.2+
- **Deployment**: Vercel

## Local Development

Requires **Node 20+** (Fumadocs 16 / Next 16 won't run on older versions).

```bash
bun install          # postinstall generates .source/ types
bun run dev          # http://localhost:3000
```

## Content

MDX files live under `content/docs/`. Sidebar ordering is controlled
by `content/docs/meta.json`. Section separators use the
`"---Section Name---"` entry format.

Adding a new page:

1. Create `content/docs/<group>/<slug>.mdx` with frontmatter:
   ```mdx
   ---
   title: Page Title
   description: One-line summary used for search and meta tags.
   ---
   ```
2. Add `"<group>/<slug>"` to the `pages` array in
   `content/docs/meta.json` at the desired position.
3. Run `bun run mdx` (or restart dev) so the generated types pick it up.

## Build

```bash
bun run build
bun run start        # serve the production build locally
```

## Deploying to Vercel

One-time:

1. Push this repo to GitHub.
2. Import the repo on Vercel (Framework preset: **Next.js**; the
   `vercel.json` in this repo pins install/build commands for Bun).
3. Add the custom domain `go-audit.andrianprasetya.com` under
   Project → Settings → Domains.
4. Point DNS: add a `CNAME` record for `go-audit` → `cname.vercel-dns.com`.

Subsequent pushes to `main` trigger production deploys; PRs get
preview deployments automatically.

## Dynamic Assets

- `app/icon.svg` — favicon (shield outline).
- `app/opengraph-image.tsx` — dynamic 1200×630 OG card generated at
  the edge per request.
- `public/go-audit-icon.png` — placeholder PNG icon (replace with
  final asset when available).
- `public/og-image.png` — placeholder static OG image (fallback for
  clients that don't hit the dynamic route).

## Regenerating Placeholder Logo Assets

```bash
python scripts/gen-logo.py
```

Writes `public/go-audit-icon.png` and `public/og-image.png`. Requires
Python 3 with `Pillow` (`pip install Pillow`).

## Syntax Highlighting

Shiki themes are configured in `source.config.ts`:

- `light: github-light`
- `dark: github-dark`

Switch the strings to any valid Shiki theme (e.g. `vitesse-dark`,
`catppuccin-mocha`) to change the look without touching MDX.
