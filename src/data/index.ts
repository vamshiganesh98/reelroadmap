import type { CapstoneContent, NodeContent, WorldContent } from '../types/content'
import { world1Nodes } from './world1'
import { world2Nodes } from './world2'
import { world6Nodes } from './world6'
import { world7Nodes } from './world7'
import { world8Nodes } from './world8'

function scaffoldNode(
  id: string,
  worldId: string,
  title: string,
  emoji: string,
  summary: string,
): NodeContent {
  return {
    id,
    worldId,
    title,
    emoji,
    summary,
    scaffolded: true,
    watch: {
      videoId: 'rfscVS0vtbw',
      title: 'Content coming soon',
      channel: 'TBD',
      why: 'This node is scaffolded — video will be added in a future update.',
    },
    try: {
      goal: 'Coming soon — interactive exercise will appear here.',
      starterCode: '# Scaffolded — check back later\n',
      expectedOutput: 'TBD',
      hints: ['This world is not built yet. Complete Worlds 1 & 2 first!'],
      solution: '# Coming soon',
    },
    build: {
      goal: 'Mini-project scaffold — fill in later.',
      starterCode: '# Scaffolded\n',
      expectedOutput: 'TBD',
      hints: ['Complete earlier worlds first.'],
      solution: '# Coming soon',
    },
    check: {
      questions: [
        {
          question: 'This node is a placeholder. What should you do?',
          options: ['Finish Worlds 1 & 2, then check back', 'Skip all prior worlds', 'Uninstall Python', 'Nothing — it auto-completes'],
          correctIndex: 0,
          explanation: 'We scaffolded structure so content can be added incrementally.',
        },
      ],
    },
  }
}

function scaffoldWorld(
  id: string,
  number: number,
  title: string,
  subtitle: string,
  emoji: string,
  color: string,
  nodeTitles: Array<[string, string, string]>,
): WorldContent {
  return {
    id,
    number,
    title,
    subtitle,
    emoji,
    color,
    scaffolded: true,
    nodes: nodeTitles.map(([nid, t, em], i) =>
      scaffoldNode(nid, id, t, em, `${title} — node ${i + 1} (coming soon)`),
    ),
  }
}

export const worlds: WorldContent[] = [
  {
    id: 'w1',
    number: 1,
    title: 'Python for AI',
    subtitle: 'Variables → functions → NumPy & Pandas',
    emoji: '🐍',
    color: 'from-emerald-500 to-teal-600',
    nodes: world1Nodes,
  },
  {
    id: 'w2',
    number: 2,
    title: 'Neural Networks',
    subtitle: 'Visual intuition → build one by hand',
    emoji: '🧠',
    color: 'from-violet-500 to-purple-600',
    nodes: world2Nodes,
  },
  scaffoldWorld('w3', 3, 'Practical ML', 'scikit-learn on real data', '🔬', 'from-blue-500 to-cyan-600', [
    ['w3-n1', 'Load a Real Dataset', '📂'],
    ['w3-n2', 'Train/Test Split', '✂️'],
    ['w3-n3', 'Your First Model', '🎯'],
    ['w3-n4', 'Metrics That Matter', '📏'],
    ['w3-n5', 'World 3 Project: Classifier', '🏁'],
  ]),
  scaffoldWorld('w4', 4, 'Talking to LLMs', 'Prompts & API calls', '💬', 'from-amber-500 to-orange-600', [
    ['w4-n1', 'What Is an LLM?', '🤖'],
    ['w4-n2', 'Write Better Prompts', '✍️'],
    ['w4-n3', 'Your First API Call', '🔌'],
    ['w4-n4', 'Structured Outputs', '📋'],
    ['w4-n5', 'World 4 Project: Prompt App', '🏁'],
  ]),
  scaffoldWorld('w5', 5, 'RAG', 'Chat with your documents', '📚', 'from-rose-500 to-pink-600', [
    ['w5-n1', 'Embeddings Explained', '🧲'],
    ['w5-n2', 'Chunk & Store Text', '📄'],
    ['w5-n3', 'Retrieve & Generate', '🔍'],
    ['w5-n4', 'World 5 Project: Doc Chatbot', '🏁'],
  ]),
  {
    id: 'w6',
    number: 6,
    title: 'AI Agents',
    subtitle: 'Tools & multi-step reasoning',
    emoji: '🤖',
    color: 'from-indigo-500 to-blue-600',
    nodes: world6Nodes,
  },
  {
    id: 'w7',
    number: 7,
    title: 'MCP & Tools',
    subtitle: 'Connect external capabilities',
    emoji: '🔗',
    color: 'from-teal-500 to-green-600',
    nodes: world7Nodes,
  },
  {
    id: 'w8',
    number: 8,
    title: 'Shipping It',
    subtitle: 'Deploy, observe, evaluate',
    emoji: '🚀',
    color: 'from-fuchsia-500 to-violet-600',
    nodes: world8Nodes,
  },
]

export const capstones: CapstoneContent[] = [
  {
    id: 'cap-1',
    title: 'Document Chatbot (RAG)',
    level: 'beginner',
    emoji: '📖',
    summary: 'Build a chatbot that answers from YOUR documents — step-by-step milestones.',
    unlockAfterWorld: 'w5',
    scaffolded: true,
    milestones: [
      'Load and chunk your text files',
      'Create embeddings and a simple vector store',
      'Retrieve relevant chunks for a question',
      'Send retrieved context + question to an LLM',
      'Wrap in a simple CLI or web UI',
    ],
    rubric: [
      'Answers cite content from your docs (not hallucinated fluff)',
      'Handles "I don\'t know" when context is missing',
      'You can demo it live in under 2 minutes',
    ],
  },
  {
    id: 'cap-2',
    title: 'Multi-Step Task Agent',
    level: 'intermediate',
    emoji: '🎯',
    summary: 'An agent that completes a real task using tools — guided milestones.',
    unlockAfterWorld: 'w6',
    scaffolded: true,
    milestones: [
      'Define one concrete task (e.g. research + summarize)',
      'Give the agent 2-3 tools (search, calculator, file read)',
      'Implement think → act → observe loop',
      'Add error handling when tools fail',
      'Demo completing the task end-to-end',
    ],
    rubric: [
      'Agent completes task without you micromanaging each step',
      'Tool calls are logged and inspectable',
      'Fails gracefully when a tool returns bad data',
    ],
  },
  {
    id: 'cap-3',
    title: 'End-to-End AI Product',
    level: 'final',
    emoji: '🏆',
    summary: 'Agent + RAG + deployed API — your portfolio piece.',
    unlockAfterWorld: 'w8',
    scaffolded: true,
    milestones: [
      'Pick one problem you actually care about',
      'Combine RAG retrieval + agent reasoning',
      'Expose via FastAPI with one clear endpoint',
      'Deploy to a free host (Render/Railway/Fly)',
      'Write a 5-line README and record a 60s demo',
    ],
    rubric: [
      'Live URL works when you share it',
      'Clear input → output demo',
      'You can explain architecture in 2 minutes',
      'Includes basic eval (3 test questions with expected behavior)',
    ],
  },
]

export const allNodes = worlds.flatMap((w) => w.nodes)
export const allNodeIds = allNodes.map((n) => n.id)

export function getNode(id: string) {
  return allNodes.find((n) => n.id === id)
}

export function getWorld(id: string) {
  return worlds.find((w) => w.id === id)
}

export function getOrderedNodeIds() {
  return allNodeIds
}

export function isWorldUnlocked(worldIndex: number, completedNodes: string[]): boolean {
  if (worldIndex === 0) return true
  const prevWorld = worlds[worldIndex - 1]
  return prevWorld.nodes.every((n) => completedNodes.includes(n.id))
}

export function isNodeUnlocked(nodeId: string, completedNodes: string[]): boolean {
  const idx = allNodeIds.indexOf(nodeId)
  if (idx <= 0) return true
  return completedNodes.includes(allNodeIds[idx - 1])
}

export function isCapstoneUnlocked(cap: CapstoneContent, completedNodes: string[]): boolean {
  const world = worlds.find((w) => w.id === cap.unlockAfterWorld)
  if (!world) return false
  return world.nodes.every((n) => completedNodes.includes(n.id))
}
