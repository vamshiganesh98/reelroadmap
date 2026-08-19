# ReelRoadmap

Learn AI from Instagram reels using captions, optional Whisper transcription, and LLM analysis.

Turn Instagram reels into a personalized AI learning roadmap. ReelRoadmap syncs reels from Instagram (default: [@jam.with.ai](https://www.instagram.com/jam.with.ai)), analyzes captions (with optional Whisper transcription), and builds a topic-based learning path.

## Live app (no laptop needed)

| | URL |
|---|---|
| **Web app** | https://vamshiganesh98.github.io/reelroadmap/ |
| **API** | https://reelroadmap-api.onrender.com |

Setup: [DEPLOY.md](DEPLOY.md) · First run: [GETTING_STARTED.md](GETTING_STARTED.md)

## Features

- **Instagram Graph API sync** — pull reels from configured accounts (default: `jam.with.ai`)
- **Caption-first processing** — analyze reel captions immediately; optional Whisper for audio transcription
- **Flexible AI analysis** — free mode uses Ollama or rule-based analysis; paid mode uses OpenAI
- **Learning roadmap dashboard** — topics, difficulty levels, and action items from your reels
- **SQLite storage** — lightweight local database, no external DB required

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 20+
- (Optional) [Ollama](https://ollama.ai) for free-mode LLM analysis
- (Optional) Instagram Graph API access token for live sync (mock data used without token)

### Clone

```bash
git clone https://github.com/vamshiganesh98/reelroadmap.git
cd reelroadmap
```

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Dev Script

From the repo root:

```bash
./scripts/dev.sh
```

Starts both backend (port 8000) and frontend (port 3000).

## Configuration

| Variable | Default | Description |
|---|---|---|
| `BILLING_MODE` | `free` | `free` (Ollama/rules) or `openai` (paid) |
| `INSTAGRAM_SYNC_USERNAMES` | `jam.with.ai` | Comma-separated Instagram usernames |
| `INSTAGRAM_ACCESS_TOKEN` | _(empty)_ | Instagram Graph API token |
| `OPENAI_API_KEY` | _(empty)_ | Required when `BILLING_MODE=openai` |
| `OLLAMA_BASE_URL` | `http://localhost:11434` | Ollama server URL |
| `OLLAMA_MODEL` | `llama3.2` | Model for free-mode analysis |
| `WHISPER_ENABLED` | `false` | Enable optional Whisper transcription |
| `NEXT_PUBLIC_API_URL` | `/api` | Frontend API base (proxied to backend) |

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check and billing mode |
| GET/PUT | `/api/profile` | User learning profile |
| GET/POST/DELETE | `/api/reels` | Reel CRUD and analysis |
| GET | `/api/roadmap/dashboard` | Roadmap dashboard data |
| GET/POST | `/api/instagram/*` | Instagram sync status and trigger |

## Project Structure

```
reelroadmap/
├── backend/          # FastAPI + SQLite
│   └── app/
│       ├── routers/  # API route handlers
│       └── services/ # Instagram, AI, reel processing
├── frontend/         # Next.js 15 + TypeScript + Tailwind
│   └── src/
│       ├── app/      # Pages and layout
│       └── components/ # Dashboard UI components
├── scripts/          # Dev and deploy helpers
└── .github/workflows/ # CI
```

## License

MIT — see [LICENSE](LICENSE).
