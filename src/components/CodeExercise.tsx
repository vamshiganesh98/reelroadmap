import { useState } from 'react'
import type { ExerciseContent } from '../types/content'

interface Props {
  exercise: ExerciseContent
  stepLabel: string
}

export default function CodeExercise({ exercise, stepLabel }: Props) {
  const [hintIndex, setHintIndex] = useState(-1)
  const [showSolution, setShowSolution] = useState(false)

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/30 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-300">{stepLabel}</p>
        <p className="mt-2 text-slate-200">{exercise.goal}</p>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-slate-400">Starter code — copy into your editor (VS Code, Replit, etc.)</p>
        <pre className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-emerald-300">
          <code>{exercise.starterCode}</code>
        </pre>
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-3">
        <p className="text-xs text-slate-400">Expected output</p>
        <p className="mt-1 font-mono text-sm text-amber-200">{exercise.expectedOutput}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setHintIndex((i) => Math.min(i + 1, exercise.hints.length - 1))}
          disabled={hintIndex >= exercise.hints.length - 1}
          className="rounded-lg border border-amber-500/40 bg-amber-950/40 px-4 py-2 text-sm text-amber-200 hover:bg-amber-900/40 disabled:opacity-40"
        >
          Hint {hintIndex >= 0 ? `(${hintIndex + 1}/${exercise.hints.length})` : ''}
        </button>
        <button
          type="button"
          onClick={() => setShowSolution((s) => !s)}
          className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
        >
          {showSolution ? 'Hide solution' : 'Reveal solution'}
        </button>
      </div>

      {hintIndex >= 0 && (
        <div className="rounded-lg border border-amber-500/20 bg-amber-950/20 px-4 py-3 text-sm text-amber-100">
          💡 {exercise.hints[hintIndex]}
        </div>
      )}

      {showSolution && (
        <pre className="overflow-x-auto rounded-xl border border-slate-600 bg-slate-950 p-4 text-sm text-sky-300">
          <code>{exercise.solution}</code>
        </pre>
      )}
    </div>
  )
}
