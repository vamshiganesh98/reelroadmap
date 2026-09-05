import { useState } from 'react'
import type { ExerciseContent } from '../types/content'

interface Props {
  exercise: ExerciseContent
  stepLabel: string
}

function normalizeOutput(s: string) {
  return s.trim().replace(/\r\n/g, '\n').replace(/\s+/g, ' ')
}

function outputsMatch(actual: string, expected: string, alternates?: string[]) {
  const norm = normalizeOutput(actual)
  const targets = [expected, ...(alternates ?? [])].map(normalizeOutput)
  return targets.some((t) => norm === t || norm.includes(t) || t.includes(norm))
}

export default function CodeExercise({ exercise, stepLabel }: Props) {
  const [code, setCode] = useState(exercise.starterCode)
  const [hintIndex, setHintIndex] = useState(-1)
  const [showSolution, setShowSolution] = useState(false)
  const [userOutput, setUserOutput] = useState('')
  const [checkResult, setCheckResult] = useState<'idle' | 'pass' | 'fail'>('idle')
  const [copied, setCopied] = useState(false)

  function copyCode() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function resetCode() {
    setCode(exercise.starterCode)
    setUserOutput('')
    setCheckResult('idle')
  }

  function verifyOutput() {
    if (!userOutput.trim()) {
      setCheckResult('fail')
      return
    }
    const pass = outputsMatch(userOutput, exercise.expectedOutput, exercise.acceptableOutputs)
    setCheckResult(pass ? 'pass' : 'fail')
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/30 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-300">{stepLabel}</p>
        <p className="mt-2 text-slate-200">{exercise.goal}</p>
        {exercise.setup && (
          <p className="mt-3 rounded-lg bg-slate-900/60 px-3 py-2 text-xs text-cyan-300">
            ⚙️ Setup: {exercise.setup}
          </p>
        )}
      </div>

      <div>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium text-slate-400">
            Your code — edit here, then run in your Python editor
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={resetCode}
              className="rounded-md border border-slate-600 px-2 py-1 text-xs text-slate-400 hover:bg-slate-800"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={copyCode}
              className="rounded-md border border-emerald-600/50 bg-emerald-950/40 px-2 py-1 text-xs text-emerald-300 hover:bg-emerald-900/40"
            >
              {copied ? 'Copied!' : 'Copy code'}
            </button>
          </div>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="min-h-[200px] w-full resize-y rounded-xl border border-slate-700 bg-slate-950 p-4 font-mono text-sm text-emerald-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-3">
        <p className="text-xs text-slate-400">Expected output</p>
        <p className="mt-1 font-mono text-sm text-amber-200">{exercise.expectedOutput}</p>
      </div>

      <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
        <p className="mb-2 text-xs font-semibold uppercase text-cyan-300">Self-check — paste your output</p>
        <textarea
          value={userOutput}
          onChange={(e) => {
            setUserOutput(e.target.value)
            setCheckResult('idle')
          }}
          placeholder="Run your code, paste the terminal output here..."
          className="min-h-[60px] w-full resize-y rounded-lg border border-slate-700 bg-slate-950 p-3 font-mono text-sm text-slate-200 focus:border-cyan-500 focus:outline-none"
        />
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={verifyOutput}
            className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500"
          >
            Check my output
          </button>
          {checkResult === 'pass' && (
            <span className="animate-pop text-sm font-semibold text-emerald-400">
              ✅ Matches! You nailed it.
            </span>
          )}
          {checkResult === 'fail' && (
            <span className="text-sm text-rose-400">
              Not quite — compare with expected output or grab a hint.
            </span>
          )}
        </div>
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
