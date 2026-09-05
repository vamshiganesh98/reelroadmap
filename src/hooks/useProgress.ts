import type { ProgressState, StepKind } from '../types/content'
import { STEP_ORDER } from '../types/content'

const STORAGE_KEY = 'ai-journey-progress-v1'

const defaultProgress = (): ProgressState => ({
  completedSteps: {},
  completedNodes: [],
  completedCapstones: [],
  streak: 0,
  lastActiveDate: '',
  lastNodeId: 'w1-n1',
})

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress()
    return { ...defaultProgress(), ...JSON.parse(raw) }
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
  const steps = new Set([...(state.completedSteps[nodeId] ?? []), step])
  state.completedSteps = { ...state.completedSteps, [nodeId]: STEP_ORDER.filter((s) => steps.has(s)) }
  state.lastNodeId = nodeId

  const allDone = STEP_ORDER.every((s) => steps.has(s))
  if (allDone && !state.completedNodes.includes(nodeId)) {
    state.completedNodes = [...state.completedNodes, nodeId]
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
