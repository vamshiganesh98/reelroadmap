import { Link } from 'react-router-dom'
import { capstones, isCapstoneUnlocked, isNodeUnlocked, isWorldUnlocked, worlds } from '../data'
import type { ProgressState } from '../types/content'
import { getNodeProgress } from '../hooks/useProgress'

interface Props {
  progress: ProgressState
}

export default function JourneyMap({ progress }: Props) {
  return (
    <div className="space-y-10">
      {worlds.map((world, wi) => {
        const unlocked = isWorldUnlocked(wi, progress.completedNodes)
        return (
          <section key={world.id} className={unlocked ? '' : 'opacity-50'}>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-3xl">{world.emoji}</span>
              <div>
                <h2 className="text-lg font-bold text-white">
                  World {world.number} — {world.title}
                  {world.scaffolded && (
                    <span className="ml-2 rounded-full bg-slate-700 px-2 py-0.5 text-xs text-slate-300">soon</span>
                  )}
                </h2>
                <p className="text-sm text-slate-400">{world.subtitle}</p>
              </div>
              {!unlocked && <span className="ml-auto text-2xl">🔒</span>}
            </div>

            <div className="relative flex flex-wrap gap-3 pl-4">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/50 to-transparent" />
              {world.nodes.map((node, ni) => {
                const nodeUnlocked = unlocked && isNodeUnlocked(node.id, progress.completedNodes)
                const done = progress.completedNodes.includes(node.id)
                const pct = getNodeProgress(progress, node.id)
                const isCurrent = progress.lastNodeId === node.id && !done

                return (
                  <Link
                    key={node.id}
                    to={nodeUnlocked ? `/node/${node.id}` : '#'}
                    onClick={(e) => !nodeUnlocked && e.preventDefault()}
                    className={`relative min-w-[140px] flex-1 rounded-2xl border p-4 transition ${
                      done
                        ? 'border-emerald-500/50 bg-emerald-950/30'
                        : isCurrent
                          ? 'node-current border-indigo-400 bg-indigo-950/40'
                          : nodeUnlocked
                            ? 'border-slate-600 bg-slate-900/60 hover:border-indigo-400'
                            : 'cursor-not-allowed border-slate-800 bg-slate-950/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-2xl">{node.emoji}</span>
                      {done && <span className="animate-pop text-emerald-400">✓</span>}
                      {!nodeUnlocked && !done && <span className="text-slate-500">🔒</span>}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-slate-100">{node.title}</p>
                    {!done && nodeUnlocked && pct > 0 && (
                      <div className="mt-2 h-1.5 rounded-full bg-slate-800">
                        <div className="h-full rounded-full bg-indigo-500" style={{ width: `${pct}%` }} />
                      </div>
                    )}
                    {ni === world.nodes.length - 1 && (
                      <span className="mt-1 block text-xs text-amber-400/80">🏁 project</span>
                    )}
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}

      <section>
        <h2 className="mb-4 text-lg font-bold text-white">🏆 Capstone Projects</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {capstones.map((cap) => {
            const unlocked = isCapstoneUnlocked(cap, progress.completedNodes)
            const done = progress.completedCapstones.includes(cap.id)
            return (
              <Link
                key={cap.id}
                to={unlocked ? `/capstone/${cap.id}` : '#'}
                onClick={(e) => !unlocked && e.preventDefault()}
                className={`rounded-2xl border p-4 transition ${
                  unlocked
                    ? 'border-amber-500/40 bg-amber-950/20 hover:border-amber-400/60'
                    : 'cursor-not-allowed border-slate-800 opacity-50'
                }`}
              >
                <span className="text-2xl">{cap.emoji}</span>
                <p className="mt-2 font-semibold text-white">{cap.title}</p>
                <p className="mt-1 text-xs text-slate-400">{cap.summary}</p>
                {done && <p className="mt-2 text-xs text-emerald-400">✓ Complete</p>}
                {!unlocked && (
                  <p className="mt-2 text-xs text-slate-500">
                    Unlock after World {cap.unlockAfterWorld.replace('w', '')}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
