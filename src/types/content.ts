export type StepKind = 'watch' | 'try' | 'build' | 'check'

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface WatchContent {
  videoId: string
  title: string
  channel: string
  startSeconds?: number
  endSeconds?: number
  why: string
}

export interface ExerciseContent {
  goal: string
  starterCode: string
  expectedOutput: string
  hints: string[]
  solution: string
  /** Alternate acceptable outputs (trimmed match) */
  acceptableOutputs?: string[]
  /** pip packages needed — shown as setup tip */
  setup?: string
}

export interface NodeContent {
  id: string
  worldId: string
  title: string
  emoji: string
  summary: string
  watch: WatchContent
  try: ExerciseContent
  build: ExerciseContent
  check: { questions: QuizQuestion[] }
  scaffolded?: boolean
}

export interface WorldContent {
  id: string
  number: number
  title: string
  subtitle: string
  emoji: string
  color: string
  nodes: NodeContent[]
  scaffolded?: boolean
}

export interface CapstoneMilestone {
  title: string
  description: string
  checklist: string[]
  codeSnippet?: string
}

export interface CapstoneContent {
  id: string
  title: string
  level: 'beginner' | 'intermediate' | 'final'
  emoji: string
  summary: string
  techStack: string[]
  milestones: CapstoneMilestone[]
  rubric: string[]
  unlockAfterWorld: string
  scaffolded?: boolean
}

export interface ProgressState {
  completedSteps: Record<string, StepKind[]>
  completedNodes: string[]
  completedCapstones: string[]
  capstoneChecklists: Record<string, Record<number, boolean[]>>
  streak: number
  lastActiveDate: string
  lastNodeId: string | null
  xp: number
}

export const STEP_ORDER: StepKind[] = ['watch', 'try', 'build', 'check']

export const STEP_LABELS: Record<StepKind, string> = {
  watch: 'Watch',
  try: 'Try',
  build: 'Build',
  check: 'Check',
}

export const XP_PER_STEP = 25
export const XP_PER_CAPSTONE = 200
