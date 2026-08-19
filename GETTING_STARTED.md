# Day 0 — Get ReelRoadmap running

Your goal: turn **@jam.with.ai** reels into a **learning roadmap + hands-on tasks**, not just saved videos.

## Step 1 — Clone and run (5 min)

```bash
git clone https://github.com/vamshiganesh98/reelroadmap.git
cd reelroadmap
./scripts/dev.sh
```

Open **http://localhost:3000**

You should see:
- **Free mode** banner (no OpenAI cost)
- **Instagram Sync** with `@jam.with.ai`
- **Add Reel** (URL or caption paste)
- **Profile** section

---

## Step 2 — First test WITHOUT real Instagram (2 min)

No Meta credentials needed yet. Click **Sync** on `@jam.with.ai`.

The app loads **sample reels** and builds your first roadmap + hands-on tasks so you see how it works.

**What to check:**
| Screen area | Expected |
|-------------|----------|
| Total Reels | 3 |
| Learning Roadmap | Topics like Python, LLM, FastAPI |
| Hands-on Tasks | Green list of things to do |
| All Reels | Click one → Action Items |

---

## Step 3 — Set your profile (1 min)

Update profile to match you:
- **Skill level:** `intermediate` (you know some Python)
- **Learning goals:** what you want to build in AI
- **Instagram sources:** `jam.with.ai`

Save profile.

---

## Step 4 — Feed REAL reels from @jam.with.ai

Two ways:

### A) Paste reels (works today)

1. Open https://www.instagram.com/jam.with.ai/
2. Open a reel → Share → Copy link
3. Paste URL in **Add Reel**
4. Or paste the **caption text** if link fails
5. Click **Analyze Reel**

Do **3 reels today**, **3 tomorrow**. After ~10 reels the roadmap shows what repeats vs what matters.

### B) Auto-sync all reels (needs Meta setup)

Add to `backend/.env`:

```env
INSTAGRAM_ACCESS_TOKEN=your_token
```

Then **Sync** pulls reels from @jam.with.ai automatically via Instagram Graph API.

---

## Step 5 — Your weekly loop (the whole point)

```
Feed reels → read roadmap → pick 1 hands-on task → build it → feed more reels
```

**Rules:**
- Don't add 20 reels without building anything
- Pick **one** hands-on task per week
- Ignore topics that appear in every reel (the app will cluster these)

---

## What happens as you feed reels

| After | You get |
|-------|---------|
| 1 reel | Topics + action items for that reel |
| 3–5 reels | Roadmap starts showing repeated themes |
| 10+ reels | Clear picture of what @jam.with.ai pushes vs what YOU should focus on |
| Each week | Updated hands-on task list to build, not just watch |

---

## Optional upgrades

| Upgrade | Why |
|---------|-----|
| [Ollama](https://ollama.com) + `ollama pull llama3.2` | Smarter analysis, still free |
| Instagram Graph API token | Bulk sync from @jam.with.ai |
| Deploy to Render/Vercel | Access from phone anywhere |

---

## Quick API test (terminal)

```bash
# Health
curl http://localhost:8000/api/health

# Sync jam.with.ai (mock without token)
curl -X POST http://localhost:8000/api/instagram/sync \
  -H 'Content-Type: application/json' \
  -d '{"username":"jam.with.ai"}'

# Dashboard
curl http://localhost:8000/api/roadmap/dashboard
```

---

**Start now:** run `./scripts/dev.sh` → click **Sync** → paste your first real @jam.with.ai reel.
