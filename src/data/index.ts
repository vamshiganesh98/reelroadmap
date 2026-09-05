import type { CapstoneContent, WorldContent } from '../types/content'
import { world1Nodes } from './world1'
import { world2Nodes } from './world2'
import { world3Nodes } from './world3'
import { world4Nodes } from './world4'
import { world5Nodes } from './world5'
import { world6Nodes } from './world6'
import { world7Nodes } from './world7'
import { world8Nodes } from './world8'

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
  {
    id: 'w3',
    number: 3,
    title: 'Practical ML',
    subtitle: 'scikit-learn on real data',
    emoji: '🔬',
    color: 'from-blue-500 to-cyan-600',
    nodes: world3Nodes,
  },
  {
    id: 'w4',
    number: 4,
    title: 'Talking to LLMs',
    subtitle: 'Prompts, APIs & LangChain basics',
    emoji: '💬',
    color: 'from-amber-500 to-orange-600',
    nodes: world4Nodes,
  },
  {
    id: 'w5',
    number: 5,
    title: 'RAG',
    subtitle: 'LangChain retrieval + doc chatbot',
    emoji: '📚',
    color: 'from-rose-500 to-pink-600',
    nodes: world5Nodes,
  },
  {
    id: 'w6',
    number: 6,
    title: 'AI Agents',
    subtitle: 'LangChain tools + LangGraph loops',
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
    subtitle: 'FastAPI, deploy, evals & LangSmith',
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
    summary: 'Build a chatbot that answers from YOUR documents using LangChain + a vector store.',
    unlockAfterWorld: 'w5',
    techStack: ['Python', 'LangChain', 'OpenAI Embeddings', 'FAISS or Chroma', 'CLI or Streamlit'],
    milestones: [
      {
        title: 'Set up your project',
        description: 'Create a folder, virtual env, and install langchain, langchain-openai, faiss-cpu (or chromadb).',
        checklist: [
          'python -m venv .venv && source .venv/bin/activate',
          'pip install langchain langchain-openai langchain-community faiss-cpu python-dotenv',
          'Create .env with OPENAI_API_KEY=sk-...',
          'Add 2-3 .txt or .md files you want to chat with',
        ],
        codeSnippet: `# project structure:
# rag-bot/
#   .env
#   docs/notes.txt
#   main.py`,
      },
      {
        title: 'Load and chunk documents',
        description: 'Use LangChain loaders + RecursiveCharacterTextSplitter. Aim for ~500 char chunks with 50 overlap.',
        checklist: [
          'Load files from docs/ folder',
          'Split into chunks with metadata (source filename)',
          'Print chunk count — should be 10+ for a few pages of text',
        ],
        codeSnippet: `from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

loader = DirectoryLoader("docs/", glob="**/*.txt", loader_cls=TextLoader)
docs = loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(docs)
print(f"{len(chunks)} chunks ready")`,
      },
      {
        title: 'Embed and store in vector DB',
        description: 'Create embeddings and persist to FAISS so retrieval is fast.',
        checklist: [
          'Use OpenAIEmbeddings()',
          'Build FAISS index from chunks',
          'Save index to disk (vectorstore.save_local("index"))',
          'Test: similarity_search("test query", k=3) returns relevant chunks',
        ],
        codeSnippet: `from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

embeddings = OpenAIEmbeddings()
vectorstore = FAISS.from_documents(chunks, embeddings)
vectorstore.save_local("index")`,
      },
      {
        title: 'Build the RAG chain',
        description: 'Retrieve top-k chunks, stuff into prompt, call LLM.',
        checklist: [
          'Create retriever with search_kwargs={"k": 3}',
          'Use create_stuff_documents_chain + create_retrieval_chain',
          'Ask 3 test questions — answers must come from YOUR docs',
        ],
        codeSnippet: `from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOpenAI(model="gpt-4o-mini")
# ... wire retriever + chain (see World 5 node w5-n4)`,
      },
      {
        title: 'Wrap in a simple UI',
        description: 'CLI loop or Streamlit — something you can demo in 2 minutes.',
        checklist: [
          'while True: input question → print answer',
          'Or: streamlit run app.py with text_input + button',
          'Record a 60-second screen demo',
        ],
        codeSnippet: `while True:
    q = input("Ask about your docs (q to quit): ")
    if q == "q": break
    print(rag_chain.invoke({"input": q})["answer"])`,
      },
    ],
    rubric: [
      'Answers cite content from your docs (not hallucinated fluff)',
      'Says "I don\'t know" when context is missing',
      'You can demo it live in under 2 minutes',
      'Code is in GitHub with a README explaining setup',
    ],
  },
  {
    id: 'cap-2',
    title: 'Multi-Step Task Agent',
    level: 'intermediate',
    emoji: '🎯',
    summary: 'A LangGraph agent that completes a real task using tools — research, calculate, summarize.',
    unlockAfterWorld: 'w6',
    techStack: ['Python', 'LangGraph', 'LangChain', 'OpenAI', 'Custom tools'],
    milestones: [
      {
        title: 'Define your task',
        description: 'Pick ONE concrete task: e.g. "Given a company name, find latest news headline and summarize in 3 bullets."',
        checklist: [
          'Write the task in one sentence',
          'List inputs the user provides',
          'List the final output format',
          'Define what "done" looks like',
        ],
      },
      {
        title: 'Build 2-3 tools',
        description: 'Start simple: calculator, file_reader, mock_web_search (or real Tavily API).',
        checklist: [
          'Each tool has clear name + docstring',
          '@tool decorator from langchain',
          'Test each tool independently before wiring to agent',
        ],
        codeSnippet: `from langchain_core.tools import tool

@tool
def calculator(expression: str) -> str:
    """Evaluate a math expression like '2+2'."""
    return str(eval(expression))  # use safely in real projects`,
      },
      {
        title: 'LangGraph agent loop',
        description: 'StateGraph with agent node + tool node + conditional edges.',
        checklist: [
          'Define AgentState with messages list',
          'agent node calls LLM with bind_tools',
          'tools node executes tool calls',
          'conditional edge: more tools vs END',
        ],
        codeSnippet: `from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode

# See World 6 w6-n3 for full pattern`,
      },
      {
        title: 'Add logging and error handling',
        description: 'Print each tool call and result. Handle tool failures gracefully.',
        checklist: [
          'Log: "Calling tool X with args Y"',
          'If tool fails, return error message to LLM (don\'t crash)',
          'Set max_iterations to prevent infinite loops',
        ],
      },
      {
        title: 'End-to-end demo',
        description: 'Run 3 different inputs and show the agent completing the task without hand-holding.',
        checklist: [
          'Demo runs without you typing intermediate steps',
          'Tool calls visible in logs',
          'Final output matches your defined format',
        ],
      },
    ],
    rubric: [
      'Agent completes task without micromanaging each step',
      'Tool calls are logged and inspectable',
      'Fails gracefully when a tool returns bad data',
      'Uses LangGraph (not just a while loop hack)',
    ],
  },
  {
    id: 'cap-3',
    title: 'End-to-End AI Product',
    level: 'final',
    emoji: '🏆',
    summary: 'Agent + RAG + FastAPI + deployed live — your portfolio piece.',
    unlockAfterWorld: 'w8',
    techStack: ['FastAPI', 'LangGraph', 'LangChain RAG', 'Render/Railway', 'LangSmith'],
    milestones: [
      {
        title: 'Pick your problem',
        description: 'Choose something you care about: study assistant, job application helper, hobby wiki bot.',
        checklist: [
          'One-sentence problem statement',
          'Who is the user?',
          'What input do they give?',
          'What output do they get?',
        ],
      },
      {
        title: 'Combine RAG + agent',
        description: 'RAG for knowledge, agent for multi-step actions (e.g. retrieve → analyze → format response).',
        checklist: [
          'RAG retrieves from your docs',
          'Agent decides when to retrieve vs use tools',
          'Single entry function: run_agent(query) -> answer',
        ],
      },
      {
        title: 'FastAPI endpoint',
        description: 'One clean POST /chat endpoint with Pydantic request/response.',
        checklist: [
          'POST /chat with {"message": "..."}',
          'Returns {"answer": "...", "sources": [...]}',
          'uvicorn main:app --reload works locally',
        ],
        codeSnippet: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    answer = run_agent(req.message)
    return {"answer": answer}`,
      },
      {
        title: 'Deploy live',
        description: 'Push to GitHub, deploy on Render free tier (or Railway/Fly).',
        checklist: [
          'requirements.txt with pinned versions',
          'Environment vars set on host (OPENAI_API_KEY, etc.)',
          'Live URL returns 200 on /docs',
          'Test /chat from your phone',
        ],
      },
      {
        title: 'Evals + demo',
        description: '3 test cases with expected behavior. 60-second demo video. README with architecture diagram.',
        checklist: [
          '3 eval questions with pass/fail criteria',
          'Optional: LangSmith traces for debugging',
          'README: setup, architecture, live URL',
          '60s Loom/demo recording',
        ],
      },
    ],
    rubric: [
      'Live URL works when you share it',
      'Clear input → output demo',
      'Explain architecture in 2 minutes',
      'Includes 3 eval test cases with expected behavior',
      'Would impress in a junior AI engineer interview',
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

export function getLevelTitle(completedNodes: number): string {
  if (completedNodes >= 39) return 'Pro Agentic AI Engineer'
  if (completedNodes >= 30) return 'Senior Builder'
  if (completedNodes >= 20) return 'Agentic AI Engineer'
  if (completedNodes >= 12) return 'LLM App Developer'
  if (completedNodes >= 5) return 'Python AI Beginner'
  return 'Fresh Starter'
}
