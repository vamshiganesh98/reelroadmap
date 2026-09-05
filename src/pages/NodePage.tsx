import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CodeExercise from '../components/CodeExercise'
import QuizStep from '../components/QuizStep'
import WatchStep from '../components/WatchStep'
import { allNodeIds, getNode } from '../data'
import { useProgress } from '../hooks/useProgressHook'
import { isStepDone } from '../hooks/useProgress'
import type { StepKind } from '../types/content'
import { STEP_LABELS, STEP_ORDER } from '../types/content'

const STEPS: { key: StepKind; emoji: string }[] = [
  { key: 'watch', emoji: '▶' },
  { key: 'try', emoji: '⌨' },
  { key: 'build', emoji: '🔨' },
  { key: 'check', emoji: '✓' },
]

function firstIncompleteStep(nodeId: string, completedSteps: Record<string, StepKind[]>) {
  for (const s of STEP_ORDER) {
    if (!completedSteps[nodeId]?.includes(s)) return s
  }
  return 'watch' as StepKind
}

function getNextNodeId(currentId: string) {
  const idx = allNodeIds.indexOf(currentId)
  if (idx < 0 || idx >= allNodeIds.length - 1) return null
  return allNodeIds[idx + 1]
}

export function NodePage() {
  const { nodeId } = useParams<{ nodeId: string }>()
  const navigate = useNavigate()
  const { progress, completeStep, isNodeUnlocked } = useProgress()
  const node = nodeId ? getNode(nodeId) : undefined

  const [activeStep, setActiveStep] = useState<StepKind>('watch')
  const [celebrate, setCelebrate] = useState(false)

  useEffect(() => {
    if (node) setActiveStep(firstIncompleteStep(node.id, progress.completedSteps))
  }, [node?.id, progress.completedSteps])

  if (!node) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="text-center">
          <p className="mb-4 text-xl">Node not found</p>
          <Link to="/" className="text-emerald-400 hover:underline">
            ← Back home
          </Link>
        </div>
      </div>
    )
  }

  if (!isNodeUnlocked(node.id)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
        <div className="max-w-md text-center">
          <p className="mb-4 text-4xl">🔒</p>
          <h1 className="mb-2 text-xl font-bold">This node is locked</h1>
          <p className="mb-6 text-slate-400">
            Finish the previous node first — all four steps (Watch, Try, Build, Check).
          </p>
          <Link to="/" className="text-emerald-400 hover:underline">
            ← Back to roadmap
          </Link>
        </div>
      </div>
    )
  }

  const stepDone = (key: StepKind) => isStepDone(progress, node.id, key)

  const advance = (step: StepKind) => {
    const next = completeStep(node.id, step)
    const idx = STEP_ORDER.indexOf(step)
    if (idx < STEP_ORDER.length - 1) {
      setActiveStep(STEP_ORDER[idx + 1])
    } else if (next.completedNodes.includes(node.id)) {
      setCelebrate(true)
      setTimeout(() => setCelebrate(false), 2500)
    }
  }

  const nextId = getNextNodeId(node.id)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <Link to="/" className="text-sm text-slate-400 hover:text-emerald-400">
            ← Roadmap
          </Link>
          <h1 className="mt-1 text-lg font-bold">
            {node.emoji} {node.title}
          </h1>
          <p className="text-sm text-slate-400">{node.summary}</p>
        </div>
        <div className="mx-auto flex max-w-3xl gap-1 px-4 pb-3">
          {STEPS.map((s) => {
            const done = stepDone(s.key)
            const active = activeStep === s.key
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setActiveStep(s.key)}
                className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
                  active
                    ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/50'
                    : done
                      ? 'bg-emerald-950/50 text-emerald-500'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {done ? '✓ ' : `${s.emoji} `}
                {STEP_LABELS[s.key]}
              </button>
            )
          })}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {celebrate && (
          <div className="animate-pop mb-6 rounded-xl border border-emerald-500/50 bg-emerald-950/40 p-6 text-center">
            <p className="mb-2 text-3xl">🎉</p>
            <p className="text-lg font-bold text-emerald-300">Node complete!</p>
            <p className="mt-1 text-sm text-slate-400">Next node unlocked on your roadmap.</p>
            {nextId ? (
              <button
                type="button"
                onClick={() => navigate(`/node/${nextId}`)}
                className="mt-4 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950"
              >
                Next node →
              </button>
            ) : (
              <Link
                to="/"
                className="mt-4 inline-block rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950"
              >
                Back to roadmap
              </Link>
            )}
          </div>
        )}

        {activeStep === 'watch' && (
          <div className="space-y-4">
            <WatchStep watch={node.watch} />
            {!stepDone('watch') && (
              <button
                type="button"
                onClick={() => advance('watch')}
                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500"
              >
                I watched it — continue to Try →
              </button>
            )}
          </div>
        )}

        {activeStep === 'try' && (
          <div className="space-y-4">
            <CodeExercise exercise={node.try} stepLabel="Try — hands-on practice" />
            {!stepDone('try') && (
              <button
                type="button"
                onClick={() => advance('try')}
                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500"
              >
                I got the expected output — continue to Build →
              </button>
            )}
          </div>
        )}

        {activeStep === 'build' && (
          <div className="space-y-4">
            <CodeExercise exercise={node.build} stepLabel="Build — mini project" />
            {!stepDone('build') && (
              <button
                type="button"
                onClick={() => advance('build')}
                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500"
              >
                I finished the build — continue to Check →
              </button>
            )}
          </div>
        )}

        {activeStep === 'check' && (
          <QuizStep
            questions={node.check.questions}
            onPass={() => advance('check')}
          />
        )}

        <div className="mt-8 flex justify-between text-sm">
          <button
            type="button"
            onClick={() => {
              const idx = STEP_ORDER.indexOf(activeStep)
              if (idx > 0) setActiveStep(STEP_ORDER[idx - 1])
            }}
            className="text-slate-400 hover:text-slate-200 disabled:opacity-30"
            disabled={activeStep === 'watch'}
          >
            ← Previous step
          </button>
          {stepDone(activeStep) && activeStep !== 'check' && (
            <button
              type="button"
              onClick={() => {
                const idx = STEP_ORDER.indexOf(activeStep)
                if (idx < STEP_ORDER.length - 1) setActiveStep(STEP_ORDER[idx + 1])
              }}
              className="text-emerald-400 hover:text-emerald-300"
            >
              Next step →
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
