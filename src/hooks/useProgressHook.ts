import { useCallback, useMemo, useState } from 'react'
import {
  allNodeIds,
  capstones,
  getLevelTitle,
  getNode,
  getOrderedNodeIds,
  isCapstoneUnlocked,
  isNodeUnlocked as checkNodeUnlocked,
} from '../data'
import type { ProgressState, StepKind } from '../types/content'
import {
  completeCapstone as completeCapstoneFn,
  completeStep as completeStepFn,
  getNextNodeId,
  getNodeProgress,
  loadProgress,
  resetProgress as resetFn,
  toggleCapstoneChecklistItem as toggleChecklistFn,
  totalProgress,
} from './useProgress'

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress())

  const refresh = useCallback(() => setProgress(loadProgress()), [])

  const completeStep = useCallback((nodeId: string, step: StepKind) => {
    const next = completeStepFn(nodeId, step)
    setProgress(next)
    return next
  }, [])

  const completeCapstone = useCallback((capstoneId: string) => {
    const next = completeCapstoneFn(capstoneId)
    setProgress(next)
  }, [])

  const toggleCapstoneChecklistItem = useCallback(
    (capstoneId: string, milestoneIndex: number, itemIndex: number, totalItems: number) => {
      const next = toggleChecklistFn(capstoneId, milestoneIndex, itemIndex, totalItems)
      setProgress(next)
    },
    [],
  )

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
      xp: progress.xp ?? 0,
      level: getLevelTitle(progress.completedNodes.length),
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
    toggleCapstoneChecklistItem,
    resetProgress,
    isNodeUnlocked,
    getNodeProgress: (nodeId: string) => getNodeProgress(progress, nodeId),
    refresh,
  }
}
