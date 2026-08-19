# Deploy ReelRoadmap (no company laptop needed)

Use **GitHub Pages** for the app UI and **Render** (free) for the API.

## Live URLs (after setup)

| Service | URL |
|---------|-----|
| **App (GitHub Pages)** | https://vamshiganesh98.github.io/reelroadmap/ |
| **API (Render)** | https://reelroadmap-api.onrender.com/api/health |

---

## Step 1 — Enable GitHub Pages (one time)

1. Open https://github.com/vamshiganesh98/reelroadmap/settings/pages
2. Under **Build and deployment** → Source: **GitHub Actions**
3. Save

Every push to `main` auto-deploys the frontend via `.github/workflows/deploy-pages.yml`.

Your app will be at:

**https://vamshiganesh98.github.io/reelroadmap/**

---

## Step 2 — Deploy the backend on Render (free, one time)

The frontend on GitHub Pages is static — the API runs in the cloud.

1. Go to https://render.com and sign in with GitHub
2. **New → Blueprint** → connect repo `vamshiganesh98/reelroadmap`
3. Render reads `render.yaml` and creates **reelroadmap-api**
4. Deploy (free tier — may sleep after 15 min idle; first request wakes it)

Optional secrets in Render dashboard:

- `INSTAGRAM_ACCESS_TOKEN` — bulk sync from @jam.with.ai
- `OPENAI_API_KEY` — only if `BILLING_MODE=openai`

---

## Step 3 — Verify

1. Open https://vamshiganesh98.github.io/reelroadmap/
2. Click **Sync** on `@jam.with.ai`
3. Paste a reel caption or URL
4. Check **Learning Roadmap** and **Hands-on Tasks**

If the API is sleeping, the first load may take ~30 seconds.

---

## Custom domain (optional)

GitHub Pages → Settings → Custom domain → e.g. `reelroadmap.yourdomain.com`

---

## Architecture

```
Your phone / any browser
        ↓
vamshiganesh98.github.io/reelroadmap  (static UI)
        ↓
reelroadmap-api.onrender.com          (FastAPI + SQLite)
        ↓
@jam.with.ai reels → roadmap + hands-on tasks
```

No local install. No company laptop.
