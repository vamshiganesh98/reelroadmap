import type { NodeContent } from '../types/content'

export const world6Nodes: NodeContent[] = [
  {
    id: 'w6-n1',
    worldId: 'w6',
    title: 'What Is an Agent?',
    emoji: '🎭',
    summary: 'Agents = LLM + tools + a loop — they plan, act, and observe until the job is done.',
    watch: {
      videoId: 'ZvDkJsKE80k',
      title: 'AI Agents Explained',
      channel: 'Tech With Tim',
      startSeconds: 0,
      endSeconds: 900,
      why: 'Clear mental model: chatbots reply once, agents use tools in a loop until they finish a task.',
    },
    try: {
      goal: 'Simulate one agent step: given a goal, pick a tool name and print the action.',
      starterCode: `goal = "What is 17 * 24?"
tools = ["calculator", "web_search", "send_email"]

# TODO: chosen_tool = "calculator"  (math → calculator)
# TODO: print f"Goal: {goal}"
# TODO: print f"Action: call {chosen_tool}"

`,
      expectedOutput: 'Goal line and Action: call calculator',
      hints: [
        'Math questions usually map to a calculator tool.',
        'Use two print() calls with f-strings.',
      ],
      solution: `goal = "What is 17 * 24?"
tools = ["calculator", "web_search", "send_email"]
chosen_tool = "calculator"
print(f"Goal: {goal}")
print(f"Action: call {chosen_tool}")`,
    },
    build: {
      goal: 'Implement a tiny agent loop: think → act → observe for 2 steps, then stop.',
      starterCode: `def think(step: int, observation: str) -> str:
    if step == 0:
        return "calculator"
    return "finish"

def act(tool: str) -> str:
    if tool == "calculator":
        return "408"
    return "done"

observation = "start"
max_steps = 2

# TODO: for step in range(max_steps):
#     tool = think(step, observation)
#     print(f"Step {step}: tool={tool}")
#     observation = act(tool)
#     print(f"  observe: {observation}")

`,
      expectedOutput: 'Step 0: tool=calculator\\n  observe: 408\\nStep 1: tool=finish\\n  observe: done',
      hints: [
        'Loop with for step in range(max_steps):',
        'Call think, print tool, then observation = act(tool).',
      ],
      solution: `def think(step: int, observation: str) -> str:
    if step == 0:
        return "calculator"
    return "finish"

def act(tool: str) -> str:
    if tool == "calculator":
        return "408"
    return "done"

observation = "start"
max_steps = 2
for step in range(max_steps):
    tool = think(step, observation)
    print(f"Step {step}: tool={tool}")
    observation = act(tool)
    print(f"  observe: {observation}")`,
    },
    check: {
      questions: [
        {
          question: 'What makes an agent different from a plain chatbot?',
          options: ['Agents use tools in a loop until a task is done', 'Agents never call APIs', 'Chatbots are always smarter', 'Agents cannot use LLMs'],
          correctIndex: 0,
          explanation: 'The agent loop — think, act, observe — lets the model take multi-step actions.',
        },
        {
          question: 'In the agent loop, what is "observe"?',
          options: ['Reading the result of a tool call back into context', 'Training new model weights', 'Deleting the chat history', 'Only watching a YouTube video'],
          correctIndex: 0,
          explanation: 'Tool output becomes the next input — the model decides what to do next.',
        },
        {
          question: 'Why give an agent tools instead of only text generation?',
          options: ['So it can search, calculate, and call real APIs', 'Tools replace the LLM entirely', 'Tools are required by Python syntax', 'Tools make the model smaller'],
          correctIndex: 0,
          explanation: 'Tools are the agent\'s hands — search, code execution, databases, and more.',
        },
      ],
    },
  },
  {
    id: 'w6-n2',
    worldId: 'w6',
    title: 'LangChain Tool Calling',
    emoji: '🔧',
    summary: 'Define tools with @tool, bind them to a model, and let the LLM choose when to call them.',
    watch: {
      videoId: 'zCwuAlpQKTM',
      title: 'Tool Calling with LangChain',
      channel: 'LangChain',
      why: 'Official walkthrough of @tool, bind_tools, and create_tool_calling_agent — the LangChain standard.',
    },
    try: {
      goal: 'Create a @tool function and print its name and description.',
      starterCode: `# pip install langchain-core
from langchain_core.tools import tool

# TODO: @tool decorator on def add(a: int, b: int) -> int:
#     """Add two integers."""
#     return a + b
# TODO: print add.name and add.description

`,
      expectedOutput: 'add and Add two integers.',
      hints: [
        'Put @tool directly above def add(...):',
        'Tools expose .name and .description from the function.',
      ],
      solution: `from langchain_core.tools import tool

@tool
def add(a: int, b: int) -> int:
    """Add two integers."""
    return a + b

print(add.name)
print(add.description)`,
    },
    build: {
      goal: 'Bind two tools to a mock model response and execute the tool call (run locally with OPENAI_API_KEY).',
      starterCode: `# pip install langchain-openai langchain-core
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI

@tool
def multiply(x: float, y: float) -> float:
    """Multiply x times y."""
    return x * y

@tool
def get_word_length(word: str) -> int:
    """Return the length of a word."""
    return len(word)

tools = [multiply, get_word_length]

# TODO: llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
# TODO: llm_with_tools = llm.bind_tools(tools)
# TODO: response = llm_with_tools.invoke("What is 6 times 7?")
# TODO: if response.tool_calls:
#     call = response.tool_calls[0]
#     result = multiply.invoke(call["args"])
#     print(result)

`,
      expectedOutput: '42.0',
      hints: [
        'bind_tools(tools) tells the model which tools exist.',
        'response.tool_calls[0]["args"] has {"x": 6, "y": 7} — pass to multiply.invoke().',
      ],
      solution: `from langchain_core.tools import tool
from langchain_openai import ChatOpenAI

@tool
def multiply(x: float, y: float) -> float:
    """Multiply x times y."""
    return x * y

@tool
def get_word_length(word: str) -> int:
    """Return the length of a word."""
    return len(word)

tools = [multiply, get_word_length]
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
llm_with_tools = llm.bind_tools(tools)
response = llm_with_tools.invoke("What is 6 times 7?")
if response.tool_calls:
    call = response.tool_calls[0]
    result = multiply.invoke(call["args"])
    print(result)`,
    },
    check: {
      questions: [
        {
          question: 'What does the @tool decorator do?',
          options: ['Wraps a Python function so an LLM can call it with structured args', 'Compiles Python to C', 'Replaces the need for an LLM', 'Only works in JavaScript'],
          correctIndex: 0,
          explanation: 'The docstring becomes the tool description the model reads when deciding what to call.',
        },
        {
          question: 'What does llm.bind_tools(tools) accomplish?',
          options: ['Tells the model which tools exist and their input schemas', 'Deletes old chat messages', 'Fine-tunes weights on your tools', 'Runs tools automatically without the model'],
          correctIndex: 0,
          explanation: 'Binding is how the model learns what tools it may invoke and with what arguments.',
        },
        {
          question: 'Where do you find tool call arguments in a LangChain response?',
          options: ['response.tool_calls — a list of name + args dicts', 'response.content only', 'In a pandas DataFrame', 'In the system prompt automatically'],
          correctIndex: 0,
          explanation: 'Your code executes the tool and feeds the result back to the model.',
        },
      ],
    },
  },
  {
    id: 'w6-n3',
    worldId: 'w6',
    title: 'LangGraph Agent Loop',
    emoji: '🔁',
    summary: 'Build agent flows with LangGraph StateGraph — explicit nodes, edges, and shared state.',
    watch: {
      videoId: '1Q_MDOWaljk',
      title: 'LangGraph explained in 8 minutes',
      channel: 'W.W. AI Adventures',
      why: 'Short visual intro to StateGraph, nodes, and edges — the primitives every LangGraph agent uses.',
    },
    try: {
      goal: 'Define AgentState with TypedDict and run one node that appends a message.',
      starterCode: `# pip install langgraph
from typing import TypedDict, Annotated
import operator
from langgraph.graph import StateGraph, START, END

class AgentState(TypedDict):
    messages: Annotated[list[str], operator.add]

def greet_node(state: AgentState) -> dict:
    # TODO: return {"messages": ["Hello from the agent!"]}
    pass

# TODO: builder = StateGraph(AgentState)
# TODO: builder.add_node("greet", greet_node)
# TODO: builder.add_edge(START, "greet")
# TODO: builder.add_edge("greet", END)
# TODO: graph = builder.compile()
# TODO: result = graph.invoke({"messages": []})
# TODO: print result["messages"]

`,
      expectedOutput: "['Hello from the agent!']",
      hints: [
        'Nodes return partial state updates — {"messages": ["Hello from the agent!"]}.',
        'START and END are special edge targets from langgraph.graph.',
      ],
      solution: `from typing import TypedDict, Annotated
import operator
from langgraph.graph import StateGraph, START, END

class AgentState(TypedDict):
    messages: Annotated[list[str], operator.add]

def greet_node(state: AgentState) -> dict:
    return {"messages": ["Hello from the agent!"]}

builder = StateGraph(AgentState)
builder.add_node("greet", greet_node)
builder.add_edge(START, "greet")
builder.add_edge("greet", END)
graph = builder.compile()
result = graph.invoke({"messages": []})
print(result["messages"])`,
    },
    build: {
      goal: 'Build a 3-node LangGraph loop: plan → act → check, with conditional edge back to plan or END.',
      starterCode: `# pip install langgraph
from typing import TypedDict, Annotated, Literal
import operator
from langgraph.graph import StateGraph, START, END

class AgentState(TypedDict):
    step: int
    messages: Annotated[list[str], operator.add]

def plan_node(state: AgentState) -> dict:
    return {"messages": [f"plan step {state['step']}"]}

def act_node(state: AgentState) -> dict:
    return {"messages": ["act: ran tool"], "step": state["step"] + 1}

def should_continue(state: AgentState) -> Literal["plan", "__end__"]:
    # TODO: return "plan" if state["step"] < 2 else "__end__"
    pass

# TODO: builder = StateGraph(AgentState)
# TODO: builder.add_node("plan", plan_node)
# TODO: builder.add_node("act", act_node)
# TODO: builder.add_edge(START, "plan")
# TODO: builder.add_edge("plan", "act")
# TODO: builder.add_conditional_edges("act", should_continue, {"plan": "plan", "__end__": END})
# TODO: graph = builder.compile()
# TODO: out = graph.invoke({"step": 0, "messages": []})
# TODO: print len(out["messages"])

`,
      expectedOutput: '4',
      hints: [
        'should_continue returns "plan" or "__end__" — map "__end__" to END in add_conditional_edges.',
        'Two loops (step 0→1, step 1→2) produce 4 messages total.',
      ],
      solution: `from typing import TypedDict, Annotated, Literal
import operator
from langgraph.graph import StateGraph, START, END

class AgentState(TypedDict):
    step: int
    messages: Annotated[list[str], operator.add]

def plan_node(state: AgentState) -> dict:
    return {"messages": [f"plan step {state['step']}"]}

def act_node(state: AgentState) -> dict:
    return {"messages": ["act: ran tool"], "step": state["step"] + 1}

def should_continue(state: AgentState) -> Literal["plan", "__end__"]:
    return "plan" if state["step"] < 2 else "__end__"

builder = StateGraph(AgentState)
builder.add_node("plan", plan_node)
builder.add_node("act", act_node)
builder.add_edge(START, "plan")
builder.add_edge("plan", "act")
builder.add_conditional_edges("act", should_continue, {"plan": "plan", "__end__": END})
graph = builder.compile()
out = graph.invoke({"step": 0, "messages": []})
print(len(out["messages"]))`,
    },
    check: {
      questions: [
        {
          question: 'What is StateGraph in LangGraph?',
          options: ['A graph where nodes read/write shared state', 'A SQL database', 'A React component', 'A GPU driver'],
          correctIndex: 0,
          explanation: 'State flows through nodes — each node returns updates merged into the state.',
        },
        {
          question: 'What does add_conditional_edges do?',
          options: ['Routes to different next nodes based on a function', 'Deletes all edges', 'Only works with OpenAI', 'Replaces the need for nodes'],
          correctIndex: 0,
          explanation: 'Conditional edges implement loops — e.g. keep planning or stop when done.',
        },
        {
          question: 'Why use LangGraph instead of a single while-loop in Python?',
          options: ['Explicit graph structure you can visualize, checkpoint, and debug', 'LangGraph is faster than Python', 'while-loops are banned in agents', 'LangGraph removes the need for tools'],
          correctIndex: 0,
          explanation: 'Graphs make complex agent flows inspectable — great for production and LangSmith tracing.',
        },
      ],
    },
  },
  {
    id: 'w6-n4',
    worldId: 'w6',
    title: 'World 6 Project: Task Agent',
    emoji: '🏁',
    summary: 'Combine LangChain tools and a LangGraph loop into a task agent that researches and summarizes.',
    watch: {
      videoId: 'bTMPwUgLZf0',
      title: 'Build an AI Agent From Scratch in Python',
      channel: 'Tech With Tim',
      startSeconds: 1053,
      endSeconds: 1848,
      why: 'Jump to tool calling and running the agent — the same pieces your TaskAgent project wires together.',
    },
    try: {
      goal: 'Define a search tool stub and a function that formats a task brief.',
      starterCode: `from langchain_core.tools import tool

@tool
def search_web(query: str) -> str:
    """Search the web for a query. Returns a short snippet."""
    snippets = {
        "langgraph": "LangGraph builds stateful agent workflows with graphs.",
        "mcp": "MCP connects AI apps to external tools via a standard protocol.",
    }
    return snippets.get(query.lower(), "No results found.")

# TODO: def make_brief(task: str) -> str:
#     return f"Task: {task}\\nTools: search_web"
# TODO: print make_brief("Research LangGraph")

`,
      expectedOutput: 'Task: Research LangGraph\\nTools: search_web',
      hints: [
        'make_brief returns an f-string with the task and available tools.',
        'Call print(make_brief("Research LangGraph")).',
      ],
      solution: `from langchain_core.tools import tool

@tool
def search_web(query: str) -> str:
    """Search the web for a query. Returns a short snippet."""
    snippets = {
        "langgraph": "LangGraph builds stateful agent workflows with graphs.",
        "mcp": "MCP connects AI apps to external tools via a standard protocol.",
    }
    return snippets.get(query.lower(), "No results found.")

def make_brief(task: str) -> str:
    return f"Task: {task}\\nTools: search_web"

print(make_brief("Research LangGraph"))`,
    },
    build: {
      goal: 'Build a TaskAgent LangGraph: search node → summarize node → END (run locally with OPENAI_API_KEY).',
      starterCode: `# pip install langgraph langchain-openai langchain-core
from typing import TypedDict, Annotated
import operator
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, START, END

@tool
def search_web(query: str) -> str:
    """Search for facts about a topic."""
    return f"Fact: {query} is used in modern AI agent systems."

class TaskState(TypedDict):
    task: str
    context: str
    summary: str
    messages: Annotated[list[str], operator.add]

def search_node(state: TaskState) -> dict:
    # TODO: snippet = search_web.invoke({"query": state["task"]})
    # TODO: return {"context": snippet, "messages": ["searched"]}
    pass

def summarize_node(state: TaskState) -> dict:
    # TODO: llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    # TODO: prompt = f"Summarize in one sentence: {state['context']}"
    # TODO: summary = llm.invoke(prompt).content
    # TODO: return {"summary": summary, "messages": ["summarized"]}
    pass

# TODO: builder = StateGraph(TaskState)
# TODO: builder.add_node("search", search_node)
# TODO: builder.add_node("summarize", summarize_node)
# TODO: builder.add_edge(START, "search")
# TODO: builder.add_edge("search", "summarize")
# TODO: builder.add_edge("summarize", END)
# TODO: graph = builder.compile()
# TODO: out = graph.invoke({"task": "LangGraph", "context": "", "summary": "", "messages": []})
# TODO: print out["summary"]

`,
      expectedOutput: 'One-sentence summary mentioning LangGraph or AI agents',
      hints: [
        'search_node calls search_web.invoke({"query": state["task"]}).',
        'Chain START → search → summarize → END — a linear task pipeline.',
      ],
      solution: `from typing import TypedDict, Annotated
import operator
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, START, END

@tool
def search_web(query: str) -> str:
    """Search for facts about a topic."""
    return f"Fact: {query} is used in modern AI agent systems."

class TaskState(TypedDict):
    task: str
    context: str
    summary: str
    messages: Annotated[list[str], operator.add]

def search_node(state: TaskState) -> dict:
    snippet = search_web.invoke({"query": state["task"]})
    return {"context": snippet, "messages": ["searched"]}

def summarize_node(state: TaskState) -> dict:
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    prompt = f"Summarize in one sentence: {state['context']}"
    summary = llm.invoke(prompt).content
    return {"summary": summary, "messages": ["summarized"]}

builder = StateGraph(TaskState)
builder.add_node("search", search_node)
builder.add_node("summarize", summarize_node)
builder.add_edge(START, "search")
builder.add_edge("search", "summarize")
builder.add_edge("summarize", END)
graph = builder.compile()
out = graph.invoke({"task": "LangGraph", "context": "", "summary": "", "messages": []})
print(out["summary"])`,
    },
    check: {
      questions: [
        {
          question: 'You finished World 6! What is the main skill you gained?',
          options: ['Building agents with tools, LangChain, and LangGraph loops', 'Training a 1T parameter model', 'Writing CUDA kernels', 'Deploying Kubernetes'],
          correctIndex: 0,
          explanation: 'Agent loop + tool calling + StateGraph — the core of modern AI agents.',
        },
        {
          question: 'What should you do after this world?',
          options: ['Run the TaskAgent locally, then start World 7 (MCP)', 'Skip MCP and deploy immediately', 'Stop using tools in agents', 'Only build chatbots from now on'],
          correctIndex: 0,
          explanation: 'World 7 shows how MCP standardizes connecting agents to external tools.',
        },
        {
          question: 'A good TaskAgent separates...',
          options: ['Search/act steps as graph nodes with shared state', 'Everything into one 500-line prompt', 'Tools from the LLM entirely', 'State from the graph'],
          correctIndex: 0,
          explanation: 'Nodes = steps, state = memory, edges = control flow — easy to extend and debug.',
        },
      ],
    },
  },
]
