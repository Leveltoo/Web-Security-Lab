# Web Security Lab

[中文](./README.md)

A site for learning **browser-side web security** through **controlled** demos, for **educational purposes only**. Built with Next.js App Router, MDX chapters, and interactive lab components—for exam prep and a public GitHub portfolio.

## Live demo

<https://web-security-lab.vercel.app/>

## Stack

- Next.js 16 (App Router)
- React 19, TypeScript
- Tailwind CSS v4, Biome
- `@next/mdx`, MDX chapters + interactive lab components

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Production build:

```bash
pnpm build
pnpm start
```

## Chapters

| Path | Description |
|------|-------------|
| `/learn/same-origin` | Same-origin policy & cross-origin |
| `/learn/xss` | XSS: defense concepts (controlled demo) |
| `/learn/csrf` | CSRF & anti-CSRF tokens (conceptual demo) |

## Deploy (Vercel)

1. Push this directory to GitHub (if the repo root is not `my-app`, set **Root Directory** to `my-app` in Vercel).
2. Import the repo and deploy; for the production URL, see **Live demo** above.

## Safety & compliance

- For **personal learning and educational demos only**—do not use for unauthorized testing or attacks against any system.
- Demos run **in-app / in controlled** environments to explain concepts; they do **not** instruct attacks against real third-party sites.
- By using this repository or the deployed site, you agree to comply with **applicable local laws and regulations** and platform rules.

## License

This project is licensed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

Copyright (c) 2026 牛战士
