# Web Security Lab

[中文](./README.md)

A **learning site** with small, **controlled** browser-side **web security** demos (for **education only**). Built with Next.js App Router, MDX chapters, and interactive lab components—for study notes and a public GitHub portfolio.

## Live demo

**Production URL (replace the placeholder after you deploy):**  
<https://YOUR-VERCEL-URL>

## Stack

- Next.js 16 (App Router)
- React 19, TypeScript
- Tailwind CSS v4, Biome
- `@next/mdx`, MDX content + React lab components

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
pnpm build
pnpm start
```

## Chapters

| Path | Topic |
|------|--------|
| `/learn/same-origin` | Same-origin policy & cross-origin |
| `/learn/xss` | XSS concepts (controlled demo) |
| `/learn/csrf` | CSRF & anti-CSRF tokens (conceptual demo) |

## Deploy (Vercel)

1. Push this directory to GitHub (if the repo root is not `my-app`, set **Root Directory** to `my-app` in Vercel).
2. Import the repo and deploy; put the production URL in both this file and `README.md` under “Live demo” / “在线演示”.

## Safety & compliance

- For **personal learning and education only**—do not use for unauthorized testing or attacks against any system.
- Demos are **in-app / controlled** and do not instruct attacks against real third-party sites.
- By using this project or the deployed site, you agree to follow applicable laws and platform rules.

## License

Follow the licenses of bundled dependencies; add your own `LICENSE` in the repo if needed.
