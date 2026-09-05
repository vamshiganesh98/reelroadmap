import type { NodeContent } from '../types/content'

export const world8Nodes: NodeContent[] = [
  {
    id: 'w8-n1',
    worldId: 'w8',
    title: 'FastAPI Basics',
    emoji: '⚡',
    summary: 'Turn your Python agent into an HTTP API — one endpoint, typed requests, instant docs.',
    watch: {
      videoId: 'tLKKmouUams',
      title: 'FastAPI Course for Beginners',
      channel: 'freeCodeCamp.org',
      startSeconds: 0,
      endSeconds: 1800,
      why: 'Skip install fluff — jump to routes, path params, and POST bodies. FastAPI auto-generates /docs.',
    },
    try: {
      goal: 'Define a Pydantic request model and print a greeting from validated input.',
      starterCode: `# pip install fastapi pydantic
from pydantic import BaseModel

class AskRequest(BaseModel):
    question: str

# TODO: req = AskRequest(question="What is FastAPI?")
# TODO: print req.question

`,
      expectedOutput: 'What is FastAPI?',
      hints: [
        'Pydantic models validate fields — AskRequest(question="...")',
        'Access fields with req.question',
      ],
      solution: `from pydantic import BaseModel

class AskRequest(BaseModel):
    question: str

req = AskRequest(question="What is FastAPI?")
print(req.question)`,
    },
    build: {
      goal: 'Sketch a /ask endpoint handler function (run with uvicorn locally).',
      starterCode: `# pip install fastapi uvicorn pydantic
# Save as main.py, then: uvicorn main:app --reload
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class AskRequest(BaseModel):
    question: str

class AskResponse(BaseModel):
    answer: str

@app.post("/ask")
def ask(req: AskRequest) -> AskResponse:
    # TODO: return AskResponse(answer=f"You asked: {req.question}")
    pass

# Test locally:
# curl -X POST http://127.0.0.1:8000/ask -H "Content-Type: application/json" -d '{"question":"hi"}'

if __name__ == "__main__":
    demo = ask(AskRequest(question="ping"))
    print(demo.answer)

`,
      expectedOutput: 'You asked: ping',
      hints: [
        'Return AskResponse(answer=...) from the route function.',
        'The __main__ block calls ask() directly for a quick local test.',
      ],
      solution: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class AskRequest(BaseModel):
    question: str

class AskResponse(BaseModel):
    answer: str

@app.post("/ask")
def ask(req: AskRequest) -> AskResponse:
    return AskResponse(answer=f"You asked: {req.question}")

if __name__ == "__main__":
    demo = ask(AskRequest(question="ping"))
    print(demo.answer)`,
    },
    check: {
      questions: [
        {
          question: 'What does FastAPI give you for free at /docs?',
          options: ['Interactive API documentation from your type hints', 'A trained LLM', 'A PostgreSQL database', 'Automatic GPU allocation'],
          correctIndex: 0,
          explanation: 'Pydantic models + route decorators → Swagger UI you can test in the browser.',
        },
        {
          question: 'Why use Pydantic models for request bodies?',
          options: ['Automatic validation and clear field types', 'Faster model training', 'Required by OpenAI', 'They replace JSON entirely'],
          correctIndex: 0,
          explanation: 'Bad requests fail early with helpful errors — critical for public APIs.',
        },
        {
          question: 'How do you run a FastAPI app locally?',
          options: ['uvicorn main:app --reload', 'python -m fastapi only', 'npm start', 'docker build with no server'],
          correctIndex: 0,
          explanation: 'Uvicorn is the ASGI server — --reload restarts on file changes during dev.',
        },
      ],
    },
  },
  {
    id: 'w8-n2',
    worldId: 'w8',
    title: 'Deploy Live',
    emoji: '☁️',
    summary: 'Ship your API to the internet — Render, Railway, or Fly with a Procfile and env vars.',
    watch: {
      videoId: 'stDadw38H0I',
      title: 'Deploy FastAPI App on Render For Free',
      channel: 'Mohsin Raz',
      why: 'Step-by-step free deploy — connect GitHub, set start command, add env vars, get a live URL.',
    },
    try: {
      goal: 'Build the start command string Render needs to run uvicorn.',
      starterCode: `host = "0.0.0.0"
port = 8000
module = "main:app"

# TODO: start_cmd = f"uvicorn {module} --host {host} --port {port}"
# TODO: print start_cmd

`,
      expectedOutput: 'uvicorn main:app --host 0.0.0.0 --port 8000',
      hints: [
        'Join the pieces with f-string: uvicorn {module} --host {host} --port {port}',
        '0.0.0.0 means listen on all interfaces — required in cloud hosts.',
      ],
      solution: `host = "0.0.0.0"
port = 8000
module = "main:app"
start_cmd = f"uvicorn {module} --host {host} --port {port}"
print(start_cmd)`,
    },
    build: {
      goal: 'Generate a minimal render.yaml service block for a FastAPI app.',
      starterCode: `service_name = "my-ai-api"
start_command = "uvicorn main:app --host 0.0.0.0 --port $PORT"
python_version = "3.11"

# TODO: render_yaml = f"""services:
#   - type: web
#     name: {service_name}
#     runtime: python
#     buildCommand: pip install -r requirements.txt
#     startCommand: {start_command}
# """
# TODO: print render_yaml.strip()

`,
      expectedOutput: 'YAML block with my-ai-api, pip install, and uvicorn startCommand',
      hints: [
        'Use a triple-quoted f-string for the YAML template.',
        'Cloud hosts often inject $PORT — uvicorn should read it.',
      ],
      solution: `service_name = "my-ai-api"
start_command = "uvicorn main:app --host 0.0.0.0 --port $PORT"
python_version = "3.11"

render_yaml = f"""services:
  - type: web
    name: {service_name}
    runtime: python
    buildCommand: pip install -r requirements.txt
    startCommand: {start_command}
"""
print(render_yaml.strip())`,
    },
    check: {
      questions: [
        {
          question: 'What should NEVER be committed to GitHub when deploying?',
          options: ['API keys and secrets — use host environment variables', 'requirements.txt', 'main.py', 'README.md'],
          correctIndex: 0,
          explanation: 'Set OPENAI_API_KEY in Render/Railway dashboard — not in source code.',
        },
        {
          question: 'Why use --host 0.0.0.0 in production?',
          options: ['So the server accepts connections from outside the container', 'To make the app faster', 'It is only for localhost', 'To disable HTTPS'],
          correctIndex: 0,
          explanation: '127.0.0.1 only listens locally — cloud platforms need 0.0.0.0.',
        },
        {
          question: 'A requirements.txt should list...',
          options: ['Pinned Python packages your app needs', 'Your SSH private key', 'Every file on your laptop', 'Only JavaScript libraries'],
          correctIndex: 0,
          explanation: 'pip install -r requirements.txt runs on the host during build.',
        },
      ],
    },
  },
  {
    id: 'w8-n3',
    worldId: 'w8',
    title: 'Evals & Observability',
    emoji: '👀',
    summary: 'Trace agent steps with LangSmith — see every LLM call, tool use, and latency in one dashboard.',
    watch: {
      videoId: 'fA9b4D8IsPQ',
      title: 'Getting Started with LangSmith: Tracing',
      channel: 'LangChain',
      why: 'Official LangSmith intro — enable tracing with env vars and inspect full agent runs in the UI.',
    },
    try: {
      goal: 'Write the three environment variables that enable LangSmith tracing.',
      starterCode: `project = "my-agent-app"
api_key = "lsv2_..."  # never commit real keys

# TODO: lines = [
#     "LANGSMITH_TRACING=true",
#     f"LANGSMITH_API_KEY={api_key}",
#     f"LANGSMITH_PROJECT={project}",
# ]
# TODO: print "\\n".join(lines)

`,
      expectedOutput: 'Three LANGSMITH_* lines',
      hints: [
        'LANGSMITH_TRACING=true turns tracing on.',
        'Join the list with "\\n".join(lines).',
      ],
      solution: `project = "my-agent-app"
api_key = "lsv2_..."

lines = [
    "LANGSMITH_TRACING=true",
    f"LANGSMITH_API_KEY={api_key}",
    f"LANGSMITH_PROJECT={project}",
]
print("\\n".join(lines))`,
    },
    build: {
      goal: 'Define 3 eval test cases and a simple pass/fail checker for agent answers.',
      starterCode: `# Evals = expected behavior you can re-run after every code change
from langsmith import traceable  # pip install langsmith

EVAL_CASES = [
    {"input": "What is 2+2?", "must_contain": "4"},
    {"input": "Capital of France?", "must_contain": "Paris"},
    {"input": "Say hello", "must_contain": "hello"},
]

def grade(answer: str, must_contain: str) -> bool:
    # TODO: return must_contain.lower() in answer.lower()
    pass

@traceable(name="run_evals")
def run_evals(responses: dict[str, str]) -> int:
    passed = 0
    for case in EVAL_CASES:
        ans = responses[case["input"]]
        if grade(ans, case["must_contain"]):
            passed += 1
    return passed

responses = {
    "What is 2+2?": "The answer is 4.",
    "Capital of France?": "Paris is the capital.",
    "Say hello": "Hello there!",
}

# TODO: print run_evals(responses)

`,
      expectedOutput: '3',
      hints: [
        'grade() does a case-insensitive substring check.',
        'All three sample responses should pass — print run_evals(responses).',
      ],
      solution: `from langsmith import traceable

EVAL_CASES = [
    {"input": "What is 2+2?", "must_contain": "4"},
    {"input": "Capital of France?", "must_contain": "Paris"},
    {"input": "Say hello", "must_contain": "hello"},
]

def grade(answer: str, must_contain: str) -> bool:
    return must_contain.lower() in answer.lower()

@traceable(name="run_evals")
def run_evals(responses: dict[str, str]) -> int:
    passed = 0
    for case in EVAL_CASES:
        ans = responses[case["input"]]
        if grade(ans, case["must_contain"]):
            passed += 1
    return passed

responses = {
    "What is 2+2?": "The answer is 4.",
    "Capital of France?": "Paris is the capital.",
    "Say hello": "Hello there!",
}
print(run_evals(responses))`,
    },
    check: {
      questions: [
        {
          question: 'What is LangSmith primarily for?',
          options: ['Tracing, debugging, and evaluating LLM apps and agents', 'Training new foundation models', 'Replacing FastAPI', 'Hosting static websites only'],
          correctIndex: 0,
          explanation: 'LangSmith records spans for every model and tool call — essential for agent debugging.',
        },
        {
          question: 'What does @traceable do?',
          options: ['Wraps a function so its run appears as a trace span in LangSmith', 'Deletes your API key', 'Speeds up inference 10x', 'Replaces unit tests entirely'],
          correctIndex: 0,
          explanation: 'Custom logic (eval harnesses, retrieval) shows up alongside LangChain/LangGraph traces.',
        },
        {
          question: 'Why write eval cases before shipping?',
          options: ['Catch regressions when you change prompts or tools', 'Evals replace all manual testing forever', 'OpenAI requires 100 evals', 'Evals make models smaller'],
          correctIndex: 0,
          explanation: 'Agents are flaky — automated checks on must_contain / expected JSON keep quality up.',
        },
      ],
    },
  },
  {
    id: 'w8-n4',
    worldId: 'w8',
    title: 'Live AI App Project',
    emoji: '🏁',
    summary: 'Capstone: FastAPI + agent endpoint + deploy checklist + LangSmith evals — your portfolio piece.',
    watch: {
      videoId: 'iFvCZD4iS2w',
      title: 'Deploy LangChain apps with FastAPI',
      channel: 'AssemblyAI',
      why: 'Short demo of wrapping a LangChain chain in FastAPI and shipping it — the pattern your Live AI App uses.',
    },
    try: {
      goal: 'Wire a stub agent function into a response model.',
      starterCode: `from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

def stub_agent(message: str) -> str:
    return f"Echo: {message}"

# TODO: req = ChatRequest(message="deploy me")
# TODO: resp = ChatResponse(reply=stub_agent(req.message))
# TODO: print resp.reply

`,
      expectedOutput: 'Echo: deploy me',
      hints: [
        'ChatResponse(reply=stub_agent(req.message))',
        'Print resp.reply',
      ],
      solution: `from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

def stub_agent(message: str) -> str:
    return f"Echo: {message}"

req = ChatRequest(message="deploy me")
resp = ChatResponse(reply=stub_agent(req.message))
print(resp.reply)`,
    },
    build: {
      goal: 'Build a LiveAIApp skeleton: FastAPI route + health check + deploy checklist (run locally).',
      starterCode: `# pip install fastapi uvicorn langchain-openai langsmith pydantic
# export OPENAI_API_KEY=... LANGSMITH_TRACING=true LANGSMITH_API_KEY=...
from fastapi import FastAPI
from pydantic import BaseModel
from langchain_openai import ChatOpenAI

app = FastAPI(title="Live AI App")

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest) -> ChatResponse:
    # TODO: llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    # TODO: reply = llm.invoke(req.message).content
    # TODO: return ChatResponse(reply=reply)
    pass

DEPLOY_CHECKLIST = [
    "requirements.txt with pinned versions",
    "Secrets in host env vars (not git)",
    "uvicorn main:app --host 0.0.0.0 --port $PORT",
    "3 LangSmith eval cases passing",
]

# TODO: print len(DEPLOY_CHECKLIST)
# TODO: print DEPLOY_CHECKLIST[0]

`,
      expectedOutput: '4 and requirements.txt with pinned versions',
      hints: [
        '/health is a simple {"status": "ok"} — platforms ping it to verify the app is up.',
        'Print len(DEPLOY_CHECKLIST) and the first checklist item.',
      ],
      solution: `from fastapi import FastAPI
from pydantic import BaseModel
from langchain_openai import ChatOpenAI

app = FastAPI(title="Live AI App")

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest) -> ChatResponse:
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    reply = llm.invoke(req.message).content
    return ChatResponse(reply=reply)

DEPLOY_CHECKLIST = [
    "requirements.txt with pinned versions",
    "Secrets in host env vars (not git)",
    "uvicorn main:app --host 0.0.0.0 --port $PORT",
    "3 LangSmith eval cases passing",
]

print(len(DEPLOY_CHECKLIST))
print(DEPLOY_CHECKLIST[0])`,
    },
    check: {
      questions: [
        {
          question: 'You finished World 8! What is the main skill you gained?',
          options: ['Shipping AI apps: FastAPI, deploy, and LangSmith observability', 'Only writing Jupyter notebooks', 'Avoiding all APIs', 'Memorizing YAML syntax'],
          correctIndex: 0,
          explanation: 'You can now expose agents via HTTP, deploy live, and trace/eval quality.',
        },
        {
          question: 'What makes a good portfolio Live AI App?',
          options: ['Working URL, clear /chat endpoint, README, and 3 eval cases', '500 unused dependencies', 'No health check', 'API keys in the repo'],
          correctIndex: 0,
          explanation: 'Recruiters click your link — it should work and you should explain it in 2 minutes.',
        },
        {
          question: 'What should you do after this world?',
          options: ['Deploy your Live AI App and tackle the final capstone', 'Stop learning — you are done forever', 'Delete LangSmith traces', 'Never ship to production'],
          correctIndex: 0,
          explanation: 'The End-to-End AI Product capstone combines RAG + agents + deployment.',
        },
      ],
    },
  },
]
