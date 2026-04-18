# Go Audit Documentation

Documentation site for [Go Audit](https://github.com/gopackx/go-audit),
built with [Next.js](https://nextjs.org) + [Fumadocs](https://fumadocs.vercel.app)
and styled with Tailwind CSS.

Deployed at `go-audit.andrianprasetya.com`.

## Local Development

Requires **Node 18+** on PATH (Next.js 15 won't run on Node 14/16).
If `node -v` shows an older version, install nvm-windows or upgrade
Node before continuing.

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

If `bun install` warns about a `fumadocs-mdx` syntax error, that's the
optional `mdx` script failing on old Node. Upgrade Node — the dev
server generates `.source/` automatically once started.

## Content

MDX files live under `content/docs/`. Sidebar ordering is controlled
by `content/docs/meta.json`. See `go-audit-docs-plan.md` for the
content map.

## Build

```bash
bun run build
```

## Deploy

The site is deployed on Vercel. Pushing to `main` triggers a production
build; pull requests get preview deployments.
