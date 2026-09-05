import type { NodeContent } from '../types/content'

export const world4Nodes: NodeContent[] = [
  {
    id: 'w4-n1',
    worldId: 'w4',
    title: 'What Is an LLM?',
    emoji: '🤖',
    summary: 'Understand what large language models are — prediction machines that generate text one token at a time.',
    watch: {
      videoId: 'zjkBMFhNj_g',
      title: 'Intro to Large Language Models',
      channel: 'Andrej Karpathy',
      startSeconds: 0,
      endSeconds: 1500,
      why: 'Karpathy explains LLMs in plain English — files, tokens, training, and why they "dream" text instead of looking things up.',
    },
    try: {
      goal: 'Create variables for a fake LLM and print a one-line description.',
      starterCode: `# LLMs have a name, a size (parameters), and a context window (max tokens).
# TODO: model_name = "gpt-mini"
# TODO: params_b = 7  (billions of parameters)
# TODO: context_tokens = 4096
# TODO: print an f-string like: gpt-mini: 7B params, 4096 token context

`,
      expectedOutput: 'gpt-mini: 7B params, 4096 token context',
      hints: [
        'Use model_name = "gpt-mini" and numbers without quotes for params_b and context_tokens.',
        'print(f"{model_name}: {params_b}B params, {context_tokens} token context")',
      ],
      solution: `model_name = "gpt-mini"
params_b = 7
context_tokens = 4096
print(f"{model_name}: {params_b}B params, {context_tokens} token context")`,
    },
    build: {
      goal: 'Build a chat-style message list (system + user) — the format every LLM API expects.',
      starterCode: `# Chat APIs send a list of {"role": ..., "content": ...} messages.
messages = []

# TODO: append {"role": "system", "content": "You are a helpful coding tutor."}
# TODO: append {"role": "user", "content": "What is a token?"}
# TODO: print len(messages) and the user message content

`,
      expectedOutput: '2 and What is a token?',
      hints: [
        'messages.append({"role": "system", "content": "..."})',
        'User content is messages[1]["content"]',
      ],
      solution: `messages = []
messages.append({"role": "system", "content": "You are a helpful coding tutor."})
messages.append({"role": "user", "content": "What is a token?"})
print(len(messages))
print(messages[1]["content"])`,
    },
    check: {
      questions: [
        {
          question: 'At a high level, what does an LLM do?',
          options: ['Predicts the next token over and over to generate text', 'Looks up answers in a database', 'Runs Python code directly', 'Only classifies images'],
          correctIndex: 0,
          explanation: 'LLMs are autoregressive — they predict one token at a time, which becomes the next input.',
        },
        {
          question: 'What is a "token"?',
          options: ['A chunk of text the model reads/writes (often a word piece)', 'A GPU core', 'An API key', 'A Python variable'],
          correctIndex: 0,
          explanation: 'Models do not see raw letters — they see tokens. Context windows are measured in tokens.',
        },
        {
          question: 'Why do chat apps send a "system" message?',
          options: ['To set behavior/persona before the user speaks', 'To pay OpenAI', 'To train the model live', 'System messages are optional decoration'],
          correctIndex: 0,
          explanation: 'The system message steers tone and rules — "You are a concise tutor" vs "You are a pirate".',
        },
      ],
    },
  },
  {
    id: 'w4-n2',
    worldId: 'w4',
    title: 'Write Better Prompts',
    emoji: '✍️',
    summary: 'Clear instructions, examples, and structure — prompt engineering is how you steer LLM output.',
    watch: {
      videoId: 'H4YK_7MAckk',
      title: 'ChatGPT Prompt Engineering for Developers',
      channel: 'DeepLearning.AI',
      why: 'Andrew Ng and OpenAI engineers show prompt patterns that work in real apps — not just chat tricks.',
    },
    try: {
      goal: 'Fill in a prompt template with a topic and audience.',
      starterCode: `topic = "embeddings"
audience = "beginners"

# TODO: prompt = f"Explain {topic} to {audience} in 3 bullet points."
# TODO: print prompt

`,
      expectedOutput: 'Explain embeddings to beginners in 3 bullet points.',
      hints: [
        'Use an f-string to inject topic and audience into the sentence.',
        'The template pattern is how LangChain PromptTemplates work under the hood.',
      ],
      solution: `topic = "embeddings"
audience = "beginners"
prompt = f"Explain {topic} to {audience} in 3 bullet points."
print(prompt)`,
    },
    build: {
      goal: 'Build a few-shot prompt: include 2 examples, then ask for a new classification.',
      starterCode: `# Few-shot = show the model examples before your real question.
examples = [
    ("I love this!", "positive"),
    ("This is terrible.", "negative"),
]
review = "Pretty good, would buy again."

# TODO: build prompt lines: "Review: ... Sentiment: ..." for each example
# TODO: add a final line: f"Review: {review} Sentiment:"
# TODO: print the full prompt (join lines with newlines)

lines = []
# your code here

print("\\n".join(lines))

`,
      expectedOutput: 'A multi-line prompt ending with the new review and "Sentiment:"',
      hints: [
        'for text, label in examples: lines.append(f"Review: {text} Sentiment: {label}")',
        'Then lines.append(f"Review: {review} Sentiment:")',
      ],
      solution: `examples = [
    ("I love this!", "positive"),
    ("This is terrible.", "negative"),
]
review = "Pretty good, would buy again."

lines = []
for text, label in examples:
    lines.append(f"Review: {text} Sentiment: {label}")
lines.append(f"Review: {review} Sentiment:")
print("\\n".join(lines))`,
    },
    check: {
      questions: [
        {
          question: 'What makes a prompt "specific" better than a vague one?',
          options: ['It tells the model format, audience, and constraints clearly', 'It uses more exclamation marks', 'It must be under 10 words', 'It avoids mentioning the task'],
          correctIndex: 0,
          explanation: '"Summarize in 3 bullets for executives" beats "summarize this" every time.',
        },
        {
          question: 'Few-shot prompting means...',
          options: ['Giving the model example input/output pairs before the real task', 'Using a small model only', 'Calling the API once', 'Fine-tuning weights on your laptop'],
          correctIndex: 0,
          explanation: 'Examples teach the pattern — great for classification, formatting, and tone.',
        },
        {
          question: 'Why separate "developer" prompts from user messages in apps?',
          options: ['You control hidden instructions; users only see their side of the chat', 'OpenAI requires it for billing', 'User messages cannot contain text', 'It makes responses slower'],
          correctIndex: 0,
          explanation: 'System/developer messages set rules; user messages are what people type.',
        },
      ],
    },
  },
  {
    id: 'w4-n3',
    worldId: 'w4',
    title: 'Your First API Call',
    emoji: '🔌',
    summary: 'Call an LLM from Python with the OpenAI API and LangChain — your code, not the web UI.',
    watch: {
      videoId: 'lG7Uxts9SXs',
      title: 'LangChain Crash Course for Beginners',
      channel: 'freeCodeCamp.org',
      startSeconds: 0,
      endSeconds: 900,
      why: 'Walkthrough of pip install langchain-openai, API keys, and your first ChatOpenAI call — run locally with your key.',
    },
    try: {
      goal: 'Wire up ChatOpenAI and a ChatPromptTemplate (run locally with OPENAI_API_KEY set).',
      starterCode: `# pip install langchain-openai
# export OPENAI_API_KEY="sk-..."   (set in your terminal, never commit keys!)
import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

# TODO: llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
# TODO: prompt = ChatPromptTemplate.from_messages([
#     ("system", "You reply in one short sentence."),
#     ("user", "{question}"),
# ])
# TODO: chain = prompt | llm
# TODO: response = chain.invoke({"question": "What is an API?"})
# TODO: print(response.content)

`,
      expectedOutput: 'One short sentence about what an API is',
      hints: [
        'ChatOpenAI reads OPENAI_API_KEY from the environment automatically.',
        'The | pipe chains prompt → model. response.content is the text.',
      ],
      solution: `import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
prompt = ChatPromptTemplate.from_messages([
    ("system", "You reply in one short sentence."),
    ("user", "{question}"),
])
chain = prompt | llm
response = chain.invoke({"question": "What is an API?"})
print(response.content)`,
    },
    build: {
      goal: 'Build a tiny "explain like I\'m 5" chain with a custom topic variable.',
      starterCode: `# pip install langchain-openai
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

topic = "neural networks"

# TODO: llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)
# TODO: prompt = ChatPromptTemplate.from_template(
#     "Explain {topic} like I am 5 years old. Use at most 2 sentences."
# )
# TODO: chain = prompt | llm
# TODO: print chain.invoke({"topic": topic}).content

`,
      expectedOutput: 'A short, simple explanation of neural networks',
      hints: [
        'from_template uses {topic} as a placeholder — pass it in invoke().',
        'temperature=0.7 allows slightly more creative wording.',
      ],
      solution: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

topic = "neural networks"
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)
prompt = ChatPromptTemplate.from_template(
    "Explain {topic} like I am 5 years old. Use at most 2 sentences."
)
chain = prompt | llm
print(chain.invoke({"topic": topic}).content)`,
    },
    check: {
      questions: [
        {
          question: 'Where should you store your OpenAI API key?',
          options: ['Environment variable or secret manager — never in source code', 'In a public GitHub repo', 'Hard-coded in every print statement', 'In the system prompt'],
          correctIndex: 0,
          explanation: 'Keys are secrets. Use os.environ or a .env file gitignored locally.',
        },
        {
          question: 'What does ChatOpenAI from langchain_openai wrap?',
          options: ['The OpenAI chat completions API', 'A local SQLite database', 'YouTube transcripts', 'A pandas DataFrame'],
          correctIndex: 0,
          explanation: 'LangChain gives a consistent interface; ChatOpenAI talks to OpenAI models.',
        },
        {
          question: 'What does prompt | llm do in LangChain?',
          options: ['Chains formatting the prompt into a model call', 'Deletes your API key', 'Trains a new model', 'Only works in JavaScript'],
          correctIndex: 0,
          explanation: 'The pipe operator composes steps — prompt fills variables, llm generates text.',
        },
      ],
    },
  },
  {
    id: 'w4-n4',
    worldId: 'w4',
    title: 'Structured Outputs',
    emoji: '📋',
    summary: 'Get JSON you can trust — JSON mode and Pydantic schemas with LangChain.',
    watch: {
      videoId: '-FMUt3OARy0',
      title: 'Open Source Extraction Service',
      channel: 'LangChain',
      why: 'LangChain demo of extracting structured data — covers JSON mode, schemas, and why raw text parsing breaks in production.',
    },
    try: {
      goal: 'Define a Pydantic model and attach it with with_structured_output (run locally).',
      starterCode: `# pip install langchain-openai pydantic
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI

class MovieReview(BaseModel):
    title: str = Field(description="Movie title")
    rating: int = Field(description="Rating 1-5")
    summary: str = Field(description="One sentence summary")

# TODO: llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
# TODO: structured_llm = llm.with_structured_output(MovieReview)
# TODO: result = structured_llm.invoke("Review: Inception blew my mind. 5/5.")
# TODO: print result.title, result.rating, result.summary

`,
      expectedOutput: 'Validated fields: title, rating (int), summary',
      hints: [
        'with_structured_output tells the model to return JSON matching your schema.',
        'result is a Pydantic object — use result.title not result["title"].',
      ],
      solution: `from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI

class MovieReview(BaseModel):
    title: str = Field(description="Movie title")
    rating: int = Field(description="Rating 1-5")
    summary: str = Field(description="One sentence summary")

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
structured_llm = llm.with_structured_output(MovieReview)
result = structured_llm.invoke("Review: Inception blew my mind. 5/5.")
print(result.title, result.rating, result.summary)`,
    },
    build: {
      goal: 'Extract a list of action items as structured Task objects from messy notes.',
      starterCode: `# pip install langchain-openai pydantic
from typing import List
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI

class Task(BaseModel):
    title: str
    owner: str

class TaskList(BaseModel):
    tasks: List[Task]

notes = """
- Alice: write unit tests for the API
- Bob: update the README
"""

# TODO: llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
# TODO: extractor = llm.with_structured_output(TaskList)
# TODO: parsed = extractor.invoke(f"Extract tasks from:\\n{notes}")
# TODO: for t in parsed.tasks: print(f"{t.owner}: {t.title}")

`,
      expectedOutput: 'Alice and Bob lines with their tasks',
      hints: [
        'Nested models work — TaskList contains a list of Task objects.',
        'Loop parsed.tasks to print each owner and title.',
      ],
      solution: `from typing import List
from pydantic import BaseModel, Field
from langchain_openai import ChatOpenAI

class Task(BaseModel):
    title: str
    owner: str

class TaskList(BaseModel):
    tasks: List[Task]

notes = """
- Alice: write unit tests for the API
- Bob: update the README
"""
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
extractor = llm.with_structured_output(TaskList)
parsed = extractor.invoke(f"Extract tasks from:\\n{notes}")
for t in parsed.tasks:
    print(f"{t.owner}: {t.title}")`,
    },
    check: {
      questions: [
        {
          question: 'Why use structured output instead of parsing free-form text?',
          options: ['Validated fields you can use in code without fragile string splitting', 'It is always free', 'Models cannot return text otherwise', 'JSON mode removes the need for prompts'],
          correctIndex: 0,
          explanation: 'Production apps need typed data — schemas catch missing fields early.',
        },
        {
          question: 'What does Pydantic add on top of raw JSON?',
          options: ['Type validation and clear field definitions', 'Faster GPU training', 'Automatic fine-tuning', 'YouTube embedding'],
          correctIndex: 0,
          explanation: 'Field(description=...) also helps the model know what to extract.',
        },
        {
          question: 'with_structured_output(MovieReview) returns...',
          options: ['A runnable that yields validated MovieReview objects', 'A plain string always', 'A NumPy array', 'An untyped dict with no validation'],
          correctIndex: 0,
          explanation: 'LangChain binds the schema to the model — JSON mode + Pydantic parsing built in.',
        },
      ],
    },
  },
  {
    id: 'w4-n5',
    worldId: 'w4',
    title: 'World 4 Project: Prompt App',
    emoji: '🏁',
    summary: 'Combine prompts, LangChain, and structured output into a reusable mini prompt app.',
    watch: {
      videoId: 'lG7Uxts9SXs',
      title: 'LangChain Crash Course (chains & prompts)',
      channel: 'freeCodeCamp.org',
      startSeconds: 1800,
      endSeconds: 2700,
      why: 'Jump to where chains and prompt templates come together — the pattern your PromptApp uses.',
    },
    try: {
      goal: 'Create a prompt router function that picks a system message by task type.',
      starterCode: `TASKS = {
    "summarize": "Summarize the user text in 2 bullet points.",
    "translate": "Translate the user text to Spanish.",
    "code": "Explain the code snippet line by line.",
}

def build_messages(task: str, user_text: str) -> list:
    # TODO: get system prompt from TASKS[task] (default to summarize if missing)
    # TODO: return [{"role": "system", "content": system}, {"role": "user", "content": user_text}]

msgs = build_messages("translate", "Hello world")
print(msgs[0]["content"])
print(msgs[1]["content"])

`,
      expectedOutput: 'Translate instruction and Hello world',
      hints: [
        'system = TASKS.get(task, TASKS["summarize"])',
        'Return a list of two dicts with role and content keys.',
      ],
      solution: `TASKS = {
    "summarize": "Summarize the user text in 2 bullet points.",
    "translate": "Translate the user text to Spanish.",
    "code": "Explain the code snippet line by line.",
}

def build_messages(task: str, user_text: str) -> list:
    system = TASKS.get(task, TASKS["summarize"])
    return [
        {"role": "system", "content": system},
        {"role": "user", "content": user_text},
    ]

msgs = build_messages("translate", "Hello world")
print(msgs[0]["content"])
print(msgs[1]["content"])`,
    },
    build: {
      goal: 'Build a PromptApp class: pick a task, run through LangChain, return structured metadata (run locally).',
      starterCode: `# pip install langchain-openai pydantic
from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

class PromptResult(BaseModel):
    task: str
    answer: str

class PromptApp:
    def __init__(self):
        # TODO: self.llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
        # TODO: self.structured = self.llm.with_structured_output(PromptResult)
        pass

    def run(self, task: str, user_text: str) -> PromptResult:
        # TODO: prompt = ChatPromptTemplate.from_messages([
        #     ("system", "You are a helpful assistant. Task: {task}"),
        #     ("user", "{text}"),
        # ])
        # TODO: chain = prompt | self.structured
        # TODO: return chain.invoke({"task": task, "text": user_text})

# app = PromptApp()
# out = app.run("summarize", "LangChain connects prompts to models.")
# print(out.task, out.answer)

`,
      expectedOutput: 'Structured PromptResult with task and answer fields',
      hints: [
        'structured output fills both task and answer fields — mention task in the system message.',
        'Return the invoke result directly; it is already a PromptResult.',
      ],
      solution: `from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

class PromptResult(BaseModel):
    task: str
    answer: str

class PromptApp:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
        self.structured = self.llm.with_structured_output(PromptResult)

    def run(self, task: str, user_text: str) -> PromptResult:
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a helpful assistant. Task: {task}"),
            ("user", "{text}"),
        ])
        chain = prompt | self.structured
        return chain.invoke({"task": task, "text": user_text})

app = PromptApp()
out = app.run("summarize", "LangChain connects prompts to models.")
print(out.task, out.answer)`,
    },
    check: {
      questions: [
        {
          question: 'You finished World 4! What is the main skill you gained?',
          options: ['Calling LLMs from code with prompts and structured outputs', 'Training a 70B model from scratch', 'Building CUDA kernels', 'Deploying Kubernetes clusters'],
          correctIndex: 0,
          explanation: 'Prompts, API calls, LangChain chains, and Pydantic schemas — your LLM toolkit.',
        },
        {
          question: 'What should you do after this world?',
          options: ['Run the PromptApp locally with your API key, then start World 5 (RAG)', 'Publish your API key on Twitter', 'Skip to agents without practicing', 'Only use the ChatGPT website forever'],
          correctIndex: 0,
          explanation: 'Hands-on reps with real API calls matter — World 5 adds your own documents.',
        },
        {
          question: 'A good PromptApp architecture separates...',
          options: ['Task routing, prompt templates, model calls, and typed responses', 'Everything into one giant string with no functions', 'Training from user chats', 'Only GUI code with no backend'],
          correctIndex: 0,
          explanation: 'Small pieces you can test and swap — same pattern as production LLM apps.',
        },
      ],
    },
  },
]
