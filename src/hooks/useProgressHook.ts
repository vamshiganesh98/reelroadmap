import { useCallback, useMemo, useState } from 'react'
import {
  allNodeIds,
  capstones,
  getNode,
  getOrderedNodeIds,
  isCapstoneUnlocked,
  isNodeUnlocked as checkNodeUnlocked,
} from '../data'
import type { ProgressState, StepKind } from '../types/content'
import {
  completeStep as completeStepFn,
  getNextNodeId,
  getNodeProgress,
  loadProgress,
  resetProgress as resetFn,
  saveProgress,
  totalProgress,
} from './useProgress'

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress())

  const refresh = useCallback(() => setProgress(loadProgress()), [])

  const completeStep = useCallback(
    (nodeId: string, step: StepKind) => {
      const next = completeStepFn(nodeId, step)
      setProgress(next)
      return next
    },
    [],
  )

  const completeCapstone = useCallback((capstoneId: string) => {
    const state = loadProgress()
    if (state.completedCapstones.includes(capstoneId)) return
    const next: ProgressState = {
      ...state,
      completedCapstones: [...state.completedCapstones, capstoneId],
    }
    saveProgress(next)
    setProgress(next)
  }, [])

  const resetProgress = useCallback(() => {
    resetFn()
    setProgress(loadProgress())
  }, [])

  const isNodeUnlocked = useCallback(
    (nodeId: string) => checkNodeUnlocked(nodeId, progress.completedNodes),
    [progress.completedNodes],
  )

  const unlockedCapstones = useMemo(
    () => capstones.filter((c) => isCapstoneUnlocked(c, progress.completedNodes)).map((c) => c.id),
    [progress.completedNodes],
  )

  const continueNodeId = useMemo(
    () =>
      getNextNodeId(progress, getOrderedNodeIds(), (id) =>
        checkNodeUnlocked(id, progress.completedNodes),
      ),
    [progress],
  )

  const continueNode = continueNodeId ? getNode(continueNodeId) : null

  const stats = useMemo(
    () => ({
      streak: progress.streak,
      completedNodes: progress.completedNodes.length,
      totalNodes: allNodeIds.length,
      percent: totalProgress(progress, allNodeIds),
    }),
    [progress],
  )

  return {
    progress,
    unlockedCapstones,
    stats,
    continueNode,
    completeStep,
    completeCapstone,
    resetProgress,
    isNodeUnlocked,
    getNodeProgress: (nodeId: string) => getNodeProgress(progress, nodeId),
    refresh,
  }
}
