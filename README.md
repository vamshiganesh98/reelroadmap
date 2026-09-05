# AI Journey — Learn AI by Doing

A personal, beginner-friendly, hands-on AI/ML learning platform. No backend, no auth — progress lives in your browser.

**Live site:** https://vamshiganesh98.github.io/reelroadmap/

## What this is

Not a textbook. A game-like learning path:

1. **Watch** — short embedded YouTube video
2. **Try** — copy starter code, fill in TODOs
3. **Build** — mini project applying the concept
4. **Check** — quick quiz to unlock the next node

Eight worlds from Python basics → neural nets → ML → LLMs → RAG → agents → MCP → shipping. Worlds 1 & 2 are fully built; 3–8 are scaffolded for incremental content.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173/reelroadmap/ (note the base path).

## Build for GitHub Pages

```bash
npm run build
```

Output goes to `dist/`. The base path is `/reelroadmap/` (set in `vite.config.ts`).

## Tech stack

- React + Vite + TypeScript
- Tailwind CSS v4
- React Router
- localStorage for progress (`ai-journey-progress-v1`)

## Adding content

Each node lives in `src/data/world1.ts`, `world2.ts`, etc. Follow the existing `NodeContent` shape in `src/types/content.ts`. Scaffolded worlds use placeholders in `src/data/index.ts`.

## Deploy

Push to `main` — GitHub Actions builds and deploys to GitHub Pages (see `.github/workflows/deploy-pages.yml`).
