import { useState } from 'react'
import type { QuizQuestion } from '../types/content'

interface Props {
  questions: QuizQuestion[]
  onPass: () => void
}

export default function QuizStep({ questions, onPass }: Props) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = questions.filter((q, i) => answers[i] === q.correctIndex).length
  const passed = submitted && score >= Math.ceil(questions.length * 0.6)

  function submit() {
    setSubmitted(true)
    if (score >= Math.ceil(questions.length * 0.6)) {
      onPass()
    }
  }

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => {
        const chosen = answers[qi]
        const correct = q.correctIndex
        return (
          <div key={qi} className="rounded-xl border border-slate-700 bg-slate-900/50 p-4">
            <p className="font-medium text-slate-100">
              {qi + 1}. {q.question}
            </p>
            <div className="mt-3 space-y-2">
              {q.options.map((opt, oi) => {
                let cls = 'border-slate-600 hover:border-indigo-400'
                if (submitted && oi === correct) cls = 'border-emerald-500 bg-emerald-950/40'
                else if (submitted && chosen === oi && oi !== correct) cls = 'border-rose-500 bg-rose-950/40'
                else if (chosen === oi) cls = 'border-indigo-500 bg-indigo-950/40'
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={submitted}
                    onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                    className={`block w-full rounded-lg border px-3 py-2 text-left text-sm text-slate-200 ${cls}`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
            {submitted && (
              <p className="mt-2 text-sm text-slate-400">{q.explanation}</p>
            )}
          </div>
        )
      })}

      {!submitted ? (
        <button
          type="button"
          onClick={submit}
          disabled={Object.keys(answers).length < questions.length}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500 disabled:opacity-40"
        >
          Check answers
        </button>
      ) : passed ? (
        <div className="animate-pop rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-4 py-3 text-emerald-200">
          ✅ Passed ({score}/{questions.length}) — next node unlocked!
        </div>
      ) : (
        <div className="rounded-xl border border-rose-500/40 bg-rose-950/40 px-4 py-3 text-rose-200">
          Score {score}/{questions.length} — need at least {Math.ceil(questions.length * 0.6)}. Review and try again.
          <button
            type="button"
            onClick={() => { setSubmitted(false); setAnswers({}) }}
            className="ml-3 underline"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  )
}
