import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { capstones } from '../data'
import { useProgress } from '../hooks/useProgressHook'

export function CapstonePage() {
  const { capstoneId } = useParams<{ capstoneId: string }>()
  const { progress, unlockedCapstones, completeCapstone, toggleCapstoneChecklistItem } =
    useProgress()
  const capstone = capstones.find((c) => c.id === capstoneId)
  const unlocked = capstone && unlockedCapstones.includes(capstone.id)
  const done = capstone && progress.completedCapstones.includes(capstone.id)
  const [openSnippet, setOpenSnippet] = useState<number | null>(null)

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
          <p>Finish World {capstone.unlockAfterWorld.replace('w', '')} first.</p>
          <Link to="/" className="mt-4 inline-block text-emerald-400">
            ← Home
          </Link>
        </div>
      </div>
    )
  }

  const checklistState = progress.capstoneChecklists[capstone.id] ?? {}

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
        <div className="mt-3 flex flex-wrap gap-2">
          {capstone.techStack.map((t) => (
            <span key={t} className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-cyan-300">
              {t}
            </span>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
        <section className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 text-sm text-indigo-100">
          <strong>How to use this guide:</strong> Work through each milestone in order. Check off
          items as you complete them — progress saves in your browser. Write the code yourself;
          snippets are starting points, not copy-paste solutions.
        </section>

        <section>
          <h2 className="mb-4 font-bold">Milestones</h2>
          <ol className="space-y-4">
            {capstone.milestones.map((m, i) => {
              const items = checklistState[i] ?? Array(m.checklist.length).fill(false)
              const doneCount = items.filter(Boolean).length
              return (
                <li
                  key={i}
                  className="rounded-xl border border-slate-800 bg-slate-900/80 p-4"
                >
                  <div className="flex gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        doneCount === m.checklist.length
                          ? 'bg-emerald-500/30 text-emerald-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {doneCount === m.checklist.length ? '✓' : i + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-semibold">{m.title}</h3>
                        <span className="text-xs text-slate-500">
                          {doneCount}/{m.checklist.length}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-400">{m.description}</p>
                      <ul className="mt-3 space-y-2">
                        {m.checklist.map((item, j) => (
                          <li key={j}>
                            <button
                              type="button"
                              onClick={() =>
                                toggleCapstoneChecklistItem(
                                  capstone.id,
                                  i,
                                  j,
                                  m.checklist.length,
                                )
                              }
                              className={`flex w-full gap-2 rounded-lg border px-3 py-2 text-left text-sm transition ${
                                items[j]
                                  ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-200'
                                  : 'border-slate-700 bg-slate-950/50 text-slate-300 hover:border-slate-600'
                              }`}
                            >
                              <span>{items[j] ? '☑' : '☐'}</span>
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                      {m.codeSnippet && (
                        <div className="mt-3">
                          <button
                            type="button"
                            onClick={() => setOpenSnippet(openSnippet === i ? null : i)}
                            className="text-xs text-cyan-400 hover:underline"
                          >
                            {openSnippet === i ? 'Hide starter snippet' : 'Show starter snippet →'}
                          </button>
                          {openSnippet === i && (
                            <pre className="mt-2 overflow-x-auto rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-emerald-300">
                              <code>{m.codeSnippet}</code>
                            </pre>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        <section className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5">
          <h2 className="mb-3 font-bold text-amber-200">What good looks like</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            {capstone.rubric.map((r, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-amber-400">★</span>
                {r}
              </li>
            ))}
          </ul>
        </section>

        {!done ? (
          <button
            type="button"
            onClick={() => {
              if (
                confirm(
                  'Mark this capstone complete? Only when you built and demoed it yourself.',
                )
              ) {
                completeCapstone(capstone.id)
              }
            }}
            className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-slate-950 hover:bg-emerald-400"
          >
            I finished this capstone — claim +200 XP ✓
          </button>
        ) : (
          <div className="animate-pop rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-center text-emerald-300">
            🎉 Capstone complete! +200 XP earned.
          </div>
        )}
      </main>
    </div>
  )
}
