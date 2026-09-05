import type { ProgressState, StepKind } from '../types/content'
import { STEP_ORDER } from '../types/content'
import { XP_PER_CAPSTONE, XP_PER_STEP } from '../types/content'

const STORAGE_KEY = 'ai-journey-progress-v1'

const defaultProgress = (): ProgressState => ({
  completedSteps: {},
  completedNodes: [],
  completedCapstones: [],
  capstoneChecklists: {},
  streak: 0,
  lastActiveDate: '',
  lastNodeId: 'w1-n1',
  xp: 0,
})

function migrate(raw: Partial<ProgressState>): ProgressState {
  const base = defaultProgress()
  return {
    ...base,
    ...raw,
    capstoneChecklists: raw.capstoneChecklists ?? {},
    xp: raw.xp ?? 0,
  }
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress()
    return migrate(JSON.parse(raw))
  } catch {
    return defaultProgress()
  }
}

export function saveProgress(state: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function bumpStreak(state: ProgressState): ProgressState {
  const d = today()
  if (state.lastActiveDate === d) return state
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const y = yesterday.toISOString().slice(0, 10)
  const streak = state.lastActiveDate === y ? state.streak + 1 : 1
  return { ...state, streak, lastActiveDate: d }
}

export function completeStep(nodeId: string, step: StepKind): ProgressState {
  let state = bumpStreak(loadProgress())
  const existing = state.completedSteps[nodeId] ?? []
  const alreadyDone = existing.includes(step)

  const steps = new Set([...existing, step])
  state.completedSteps = {
    ...state.completedSteps,
    [nodeId]: STEP_ORDER.filter((s) => steps.has(s)),
  }
  state.lastNodeId = nodeId

  if (!alreadyDone) {
    state.xp = (state.xp ?? 0) + XP_PER_STEP
  }

  const allDone = STEP_ORDER.every((s) => steps.has(s))
  if (allDone && !state.completedNodes.includes(nodeId)) {
    state.completedNodes = [...state.completedNodes, nodeId]
    state.xp = (state.xp ?? 0) + XP_PER_STEP
  }

  saveProgress(state)
  return state
}

export function completeCapstone(capstoneId: string): ProgressState {
  let state = bumpStreak(loadProgress())
  if (state.completedCapstones.includes(capstoneId)) return state
  state.completedCapstones = [...state.completedCapstones, capstoneId]
  state.xp = (state.xp ?? 0) + XP_PER_CAPSTONE
  saveProgress(state)
  return state
}

export function toggleCapstoneChecklistItem(
  capstoneId: string,
  milestoneIndex: number,
  itemIndex: number,
  totalItems: number,
): ProgressState {
  const state = loadProgress()
  const cap = state.capstoneChecklists[capstoneId] ?? {}
  const items = cap[milestoneIndex] ?? Array(totalItems).fill(false)
  const next = [...items]
  next[itemIndex] = !next[itemIndex]
  state.capstoneChecklists = {
    ...state.capstoneChecklists,
    [capstoneId]: { ...cap, [milestoneIndex]: next },
  }
  saveProgress(state)
  return state
}

export function isStepDone(state: ProgressState, nodeId: string, step: StepKind) {
  return (state.completedSteps[nodeId] ?? []).includes(step)
}

export function isNodeComplete(state: ProgressState, nodeId: string) {
  return state.completedNodes.includes(nodeId)
}

export function getNodeProgress(state: ProgressState, nodeId: string) {
  const done = state.completedSteps[nodeId]?.length ?? 0
  return Math.round((done / STEP_ORDER.length) * 100)
}

export function totalProgress(state: ProgressState, allNodeIds: string[]) {
  if (!allNodeIds.length) return 0
  const completed = allNodeIds.filter((id) => state.completedNodes.includes(id)).length
  return Math.round((completed / allNodeIds.length) * 100)
}

export function getNextNodeId(
  state: ProgressState,
  orderedNodeIds: string[],
  unlocked: (id: string) => boolean,
): string | null {
  for (const id of orderedNodeIds) {
    if (unlocked(id) && !state.completedNodes.includes(id)) return id
  }
  return null
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY)
}
