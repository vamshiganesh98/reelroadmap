import { Link } from 'react-router-dom'
import JourneyMap from '../components/JourneyMap'
import { capstones } from '../data'
import { useProgress } from '../hooks/useProgressHook'

export function HomePage() {
  const { progress, unlockedCapstones, stats, continueNode, resetProgress } = useProgress()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              AI Journey
            </p>
            <h1 className="text-xl font-bold sm:text-2xl">Learn AI by doing</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-indigo-900/60 px-3 py-1 text-indigo-200">
              {stats.level}
            </span>
            <span className="rounded-full bg-slate-800 px-3 py-1">⚡ {stats.xp} XP</span>
            <span className="rounded-full bg-slate-800 px-3 py-1">
              🔥 {stats.streak} day streak
            </span>
            <span className="rounded-full bg-slate-800 px-3 py-1">
              {stats.completedNodes}/{stats.totalNodes} nodes
            </span>
            <button
              type="button"
              onClick={() => {
                if (confirm('Reset all progress? This cannot be undone.')) resetProgress()
              }}
              className="text-xs text-slate-500 hover:text-slate-300"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-3">
          <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
            <span>Overall progress</span>
            <span>{stats.percent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-700"
              style={{ width: `${stats.percent}%` }}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-10 px-4 py-8">
        {continueNode && (
          <section className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/50 to-slate-900 p-6">
            <p className="mb-1 text-sm font-medium text-emerald-300">Continue your journey</p>
            <h2 className="mb-2 text-2xl font-bold">{continueNode.title}</h2>
            <p className="mb-4 max-w-xl text-sm text-slate-400">{continueNode.summary}</p>
            <Link
              to={`/node/${continueNode.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Continue →
            </Link>
          </section>
        )}

        <section>
          <h2 className="mb-2 text-lg font-bold">Your learning path</h2>
          <p className="mb-6 max-w-2xl text-sm text-slate-400">
            Each world unlocks one node at a time. Watch a short video → try a tiny exercise →
            build something → pass a quick check. No walls of text.
          </p>
          <JourneyMap progress={progress} />
        </section>

        <section>
          <h2 className="mb-4 text-lg font-bold">Capstone projects</h2>
          <p className="mb-4 text-sm text-slate-400">
            Bigger builds that unlock after you finish the related worlds. Guided milestones — you
            write the code.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {capstones.map((c) => {
              const unlocked = unlockedCapstones.includes(c.id)
              const done = progress.completedCapstones.includes(c.id)
              return (
                <Link
                  key={c.id}
                  to={unlocked ? `/capstone/${c.id}` : '#'}
                  onClick={(e) => !unlocked && e.preventDefault()}
                  className={`rounded-xl border p-5 transition ${
                    unlocked
                      ? 'border-slate-700 bg-slate-900 hover:border-emerald-500/50'
                      : 'cursor-not-allowed border-slate-800 bg-slate-900/50 opacity-60'
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase text-slate-500">
                      {c.level}
                    </span>
                    {done && <span className="text-emerald-400">✓</span>}
                    {!unlocked && <span>🔒</span>}
                  </div>
                  <h3 className="mb-1 font-bold">
                    {c.emoji} {c.title}
                  </h3>
                  <p className="text-sm text-slate-400">{c.summary}</p>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 text-sm text-slate-400">
          <h3 className="mb-3 font-semibold text-slate-200">Your path: beginner → pro</h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            <div className="rounded-lg bg-slate-950/50 p-2">
              <span className="text-emerald-400">Worlds 1–2</span> — Python + neural nets
            </div>
            <div className="rounded-lg bg-slate-950/50 p-2">
              <span className="text-blue-400">World 3</span> — scikit-learn ML
            </div>
            <div className="rounded-lg bg-slate-950/50 p-2">
              <span className="text-amber-400">Worlds 4–5</span> — LLMs + LangChain RAG
            </div>
            <div className="rounded-lg bg-slate-950/50 p-2">
              <span className="text-indigo-400">Worlds 6–8</span> — LangGraph agents → ship live
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 text-sm text-slate-400">
          <h3 className="mb-2 font-semibold text-slate-200">How each node works</h3>
          <ol className="grid gap-3 sm:grid-cols-4">
            <li>
              <span className="font-bold text-emerald-400">1. Watch</span> — short YouTube clip
            </li>
            <li>
              <span className="font-bold text-cyan-400">2. Try</span> — copy starter code, fill TODOs
            </li>
            <li>
              <span className="font-bold text-violet-400">3. Build</span> — mini project
            </li>
            <li>
              <span className="font-bold text-amber-400">4. Check</span> — 3–5 question quiz
            </li>
          </ol>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-600">
        Progress saved in your browser · No account needed · Built for hands-on learning
      </footer>
    </div>
  )
}
