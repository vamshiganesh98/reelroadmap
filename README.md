# AI Journey — Beginner to Pro Agentic AI Engineer

A hands-on, game-like learning platform. Watch → Try → Build → Check on every node. No walls of text.

**Live:** https://vamshiganesh98.github.io/reelroadmap/

## What you'll become

| Progress | Title |
|----------|-------|
| Worlds 1–2 | Python AI Beginner |
| Worlds 3–4 | LLM App Developer |
| Worlds 5–6 | Agentic AI Engineer |
| Worlds 7–8 | Pro Agentic AI Engineer |

## Full curriculum (38 nodes + 3 capstones)

| World | Topic | Tools |
|-------|-------|-------|
| 1 🐍 | Python for AI | Python, NumPy, Pandas |
| 2 🧠 | Neural Networks | Pure Python (no frameworks) |
| 3 🔬 | Practical ML | scikit-learn |
| 4 💬 | Talking to LLMs | OpenAI API, LangChain |
| 5 📚 | RAG | LangChain, FAISS, embeddings |
| 6 🤖 | AI Agents | LangChain tools, **LangGraph** |
| 7 🔗 | MCP & Tools | Model Context Protocol |
| 8 🚀 | Shipping It | FastAPI, deploy, LangSmith evals |

**Capstones:** RAG chatbot → LangGraph task agent → deployed AI product

## Interactive features

- Visual skill-tree roadmap with sequential unlocks
- Editable code editor with copy + output self-check
- Progressive hints before solutions
- XP, streaks, and level titles
- Capstone milestone checklists (saved in browser)
- Embedded YouTube videos per node

## Run locally

```bash
npm install
npm run dev
# open http://localhost:5173/reelroadmap/
```

## Build

```bash
npm run build
```

Progress key: `ai-journey-progress-v1` in localStorage.

## Adding content

Edit `src/data/worldN.ts` — each node follows `NodeContent` in `src/types/content.ts`.
