import { Link, useParams } from 'react-router-dom'
import { capstones } from '../data'
import { useProgress } from '../hooks/useProgressHook'

export function CapstonePage() {
  const { capstoneId } = useParams<{ capstoneId: string }>()
  const { progress, unlockedCapstones, completeCapstone } = useProgress()
  const capstone = capstones.find((c) => c.id === capstoneId)
  const unlocked = capstone && unlockedCapstones.includes(capstone.id)
  const done = capstone && progress.completedCapstones.includes(capstone.id)

  if (!capstone) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <Link to="/" className="text-emerald-400">
          ← Home
        </Link>
      </div>
    )
  }

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
        <div className="text-center">
          <p className="mb-4 text-4xl">🔒</p>
          <p>Finish the required worlds first.</p>
          <Link to="/" className="mt-4 inline-block text-emerald-400">
            ← Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto max-w-3xl border-b border-slate-800 px-4 py-4">
        <Link to="/" className="text-sm text-slate-400 hover:text-emerald-400">
          ← Roadmap
        </Link>
        <p className="mt-2 text-xs uppercase text-slate-500">{capstone.level} capstone</p>
        <h1 className="text-2xl font-bold">
          {capstone.emoji} {capstone.title}
        </h1>
        <p className="mt-1 text-slate-400">{capstone.summary}</p>
      </header>

      <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
        <section>
          <h2 className="mb-4 font-bold">Milestones</h2>
          <ol className="space-y-4">
            {capstone.milestones.map((milestone, i) => (
              <li
                key={i}
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-4"
              >
                <div className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-400">
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-300">{milestone}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5">
          <h2 className="mb-3 font-bold text-amber-200">What good looks like</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            {capstone.rubric.map((r, i) => (
              <li key={i}>• {r}</li>
            ))}
          </ul>
        </section>

        {!done ? (
          <button
            type="button"
            onClick={() => {
              if (
                confirm(
                  'Mark this capstone as complete? Only do this when you finished building it yourself.',
                )
              ) {
                completeCapstone(capstone.id)
              }
            }}
            className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-slate-950 hover:bg-emerald-400"
          >
            I finished this capstone ✓
          </button>
        ) : (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-center text-emerald-300">
            🎉 Capstone complete!
          </div>
        )}
      </main>
    </div>
  )
}
