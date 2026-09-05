import type { NodeContent } from '../types/content'

export const world7Nodes: NodeContent[] = [
  {
    id: 'w7-n1',
    worldId: 'w7',
    title: 'What Is MCP?',
    emoji: '🌐',
    summary: 'Model Context Protocol — Anthropic\'s open standard for connecting AI apps to tools and data.',
    watch: {
      videoId: 'CQywdSdi5iA',
      title: 'The Model Context Protocol (MCP)',
      channel: 'Anthropic',
      why: 'Official Anthropic intro — MCP is like USB-C for AI: one protocol to connect models to files, APIs, and databases.',
    },
    try: {
      goal: 'Model MCP client/server roles: print which side hosts tools vs calls them.',
      starterCode: `# MCP = Model Context Protocol (open standard by Anthropic)
# Host app (Claude Desktop, Cursor) = MCP client
# Your Python script exposing tools = MCP server

client = "Claude Desktop"
server = "my-file-tools-server"

# TODO: print f"Client: {client} — asks for tools and sends prompts"
# TODO: print f"Server: {server} — exposes tools like read_file, search_db"

`,
      expectedOutput: 'Client line and Server line describing roles',
      hints: [
        'The client is the AI app people use; the server is code you write.',
        'Two print() calls with the f-strings shown in the TODO comments.',
      ],
      solution: `client = "Claude Desktop"
server = "my-file-tools-server"
print(f"Client: {client} — asks for tools and sends prompts")
print(f"Server: {server} — exposes tools like read_file, search_db")`,
    },
    build: {
      goal: 'Build a tool manifest list — name, description, input schema — the metadata MCP servers advertise.',
      starterCode: `# MCP servers publish a list of tools the client can call.
tools = []

def register_tool(name: str, description: str, properties: dict) -> None:
    # TODO: append {"name": name, "description": description, "inputSchema": {"properties": properties}}
    pass

# TODO: register_tool("read_file", "Read a text file", {"path": {"type": "string"}})
# TODO: register_tool("grep_repo", "Search code", {"pattern": {"type": "string"}})
# TODO: print len(tools) and tools[0]["name"]

`,
      expectedOutput: '2 and read_file',
      hints: [
        'tools.append({...}) inside register_tool.',
        'len(tools) is 2 after registering both tools.',
      ],
      solution: `tools = []

def register_tool(name: str, description: str, properties: dict) -> None:
    tools.append({
        "name": name,
        "description": description,
        "inputSchema": {"properties": properties},
    })

register_tool("read_file", "Read a text file", {"path": {"type": "string"}})
register_tool("grep_repo", "Search code", {"pattern": {"type": "string"}})
print(len(tools))
print(tools[0]["name"])`,
    },
    check: {
      questions: [
        {
          question: 'Who created the Model Context Protocol?',
          options: ['Anthropic — now an open standard under the Linux Foundation', 'Only OpenAI', 'Google exclusively', 'A single startup with no backers'],
          correctIndex: 0,
          explanation: 'Anthropic open-sourced MCP in 2024; major vendors now support it.',
        },
        {
          question: 'In MCP, the "server" is...',
          options: ['Code that exposes tools/data to an AI client', 'The GPU running the model', 'Always a cloud VM only', 'The user\'s keyboard'],
          correctIndex: 0,
          explanation: 'You build MCP servers — file access, databases, APIs — clients connect to them.',
        },
        {
          question: 'Why is MCP compared to USB-C?',
          options: ['One standard port instead of a custom cable per tool', 'It only works with USB devices', 'It replaces Wi-Fi', 'It is a hardware protocol only'],
          correctIndex: 0,
          explanation: 'Before MCP, every AI app needed custom integrations — MCP unifies the interface.',
        },
      ],
    },
  },
  {
    id: 'w7-n2',
    worldId: 'w7',
    title: 'Build Mini MCP Tool',
    emoji: '🛠️',
    summary: 'Write a Python function and expose it as an MCP tool with name, schema, and handler.',
    watch: {
      videoId: 'LYfr7qusVSs',
      title: 'MCP Explained for Beginners in Python',
      channel: 'Analytics Vidhya',
      startSeconds: 0,
      endSeconds: 1200,
      why: 'Hands-on Python MCP server with FastMCP — greeter and file-counter tools you can connect to Claude Desktop.',
    },
    try: {
      goal: 'Implement a tool handler that uppercases a string and returns JSON-shaped output.',
      starterCode: `def greet_tool(name: str) -> dict:
    """Return a greeting for the user."""
    # TODO: message = f"Hello, {name}! Welcome to MCP."
    # TODO: return {"content": [{"type": "text", "text": message}]}
    pass

result = greet_tool("Ada")
print(result["content"][0]["text"])

`,
      expectedOutput: 'Hello, Ada! Welcome to MCP.',
      hints: [
        'MCP tool results often wrap text in {"content": [{"type": "text", "text": "..."}]}.',
        'Use an f-string with the name parameter.',
      ],
      solution: `def greet_tool(name: str) -> dict:
    """Return a greeting for the user."""
    message = f"Hello, {name}! Welcome to MCP."
    return {"content": [{"type": "text", "text": message}]}

result = greet_tool("Ada")
print(result["content"][0]["text"])`,
    },
    build: {
      goal: 'Build a mini MCP-style server class with register + dispatch (or use FastMCP locally).',
      starterCode: `# pip install mcp fastmcp
# Minimal pattern — same idea as Anthropic's MCP Python SDK
from typing import Callable, Any

class MiniMCPServer:
    def __init__(self):
        self._tools: dict[str, Callable[..., Any]] = {}

    def tool(self, name: str):
        def decorator(fn):
            # TODO: self._tools[name] = fn
            return fn
        return decorator

    def call(self, name: str, **kwargs) -> Any:
        # TODO: return self._tools[name](**kwargs)
        pass

server = MiniMCPServer()

@server.tool("add")
def add(a: int, b: int) -> int:
    return a + b

# TODO: print server.call("add", a=3, b=9)

`,
      expectedOutput: '12',
      hints: [
        'Store functions in self._tools[name] inside the decorator.',
        'call() looks up the function and invokes it with **kwargs.',
      ],
      solution: `from typing import Callable, Any

class MiniMCPServer:
    def __init__(self):
        self._tools: dict[str, Callable[..., Any]] = {}

    def tool(self, name: str):
        def decorator(fn):
            self._tools[name] = fn
            return fn
        return decorator

    def call(self, name: str, **kwargs) -> Any:
        return self._tools[name](**kwargs)

server = MiniMCPServer()

@server.tool("add")
def add(a: int, b: int) -> int:
    return a + b

print(server.call("add", a=3, b=9))`,
    },
    check: {
      questions: [
        {
          question: 'What must every MCP tool expose to the client?',
          options: ['A name, description, and input schema', 'Only Python source code', 'A trained neural network', 'A Docker image'],
          correctIndex: 0,
          explanation: 'The client reads metadata so the LLM knows when and how to call each tool.',
        },
        {
          question: 'FastMCP in Python helps you...',
          options: ['Spin up an MCP server with @tool decorators quickly', 'Train GPT-5 locally', 'Replace FastAPI entirely', 'Compile TypeScript'],
          correctIndex: 0,
          explanation: 'FastMCP wraps the official MCP SDK — less boilerplate for hobby servers.',
        },
        {
          question: 'Where do you configure MCP servers for Claude Desktop?',
          options: ['claude_desktop_config.json under mcpServers', 'Inside the system prompt only', 'On a public GitHub gist', 'In requirements.txt alone'],
          correctIndex: 0,
          explanation: 'Point Claude Desktop at your server command — it launches and connects automatically.',
        },
      ],
    },
  },
  {
    id: 'w7-n3',
    worldId: 'w7',
    title: 'Connected Agent Project',
    emoji: '🏁',
    summary: 'Wire an agent to MCP tools — client discovers tools, calls them, and uses results in a reply.',
    watch: {
      videoId: 'LYfr7qusVSs',
      title: 'MCP Explained for Beginners in Python',
      channel: 'Analytics Vidhya',
      startSeconds: 1200,
      why: 'Second half shows connecting your MCP server to Claude Desktop and watching real tool calls fire.',
    },
    try: {
      goal: 'Simulate tool discovery: given a server manifest, pick the right tool for a user question.',
      starterCode: `manifest = [
    {"name": "get_weather", "description": "Get weather for a city"},
    {"name": "send_email", "description": "Send an email message"},
]

question = "What's the weather in Tokyo?"

# TODO: chosen = manifest[0]["name"]  (weather question → get_weather)
# TODO: print f"Question: {question}"
# TODO: print f"MCP tool: {chosen}"

`,
      expectedOutput: 'Question line and MCP tool: get_weather',
      hints: [
        'Match keywords in the question to tool descriptions.',
        'Weather → get_weather is manifest[0].',
      ],
      solution: `manifest = [
    {"name": "get_weather", "description": "Get weather for a city"},
    {"name": "send_email", "description": "Send an email message"},
]

question = "What's the weather in Tokyo?"
chosen = manifest[0]["name"]
print(f"Question: {question}")
print(f"MCP tool: {chosen}")`,
    },
    build: {
      goal: 'Build a ConnectedAgent that lists MCP tools, dispatches a call, and formats the answer.',
      starterCode: `# Connected agent = LLM reasoning + MCP tool execution
from typing import Any

class ConnectedAgent:
    def __init__(self, tools: dict[str, Any]):
        self.tools = tools

    def list_tools(self) -> list[str]:
        # TODO: return list(self.tools.keys())
        pass

    def run(self, tool_name: str, **kwargs) -> str:
        # TODO: result = self.tools[tool_name](**kwargs)
        # TODO: return f"Tool {tool_name} returned: {result}"
        pass

def get_weather(city: str) -> str:
    return f"Sunny, 24°C in {city}"

agent = ConnectedAgent({"get_weather": get_weather})

# TODO: print agent.list_tools()
# TODO: print agent.run("get_weather", city="Tokyo")

`,
      expectedOutput: "['get_weather'] and Tool get_weather returned: Sunny, 24°C in Tokyo",
      hints: [
        'list_tools returns list(self.tools.keys()).',
        'run() calls the function and wraps the result in an f-string.',
      ],
      solution: `from typing import Any

class ConnectedAgent:
    def __init__(self, tools: dict[str, Any]):
        self.tools = tools

    def list_tools(self) -> list[str]:
        return list(self.tools.keys())

    def run(self, tool_name: str, **kwargs) -> str:
        result = self.tools[tool_name](**kwargs)
        return f"Tool {tool_name} returned: {result}"

def get_weather(city: str) -> str:
    return f"Sunny, 24°C in {city}"

agent = ConnectedAgent({"get_weather": get_weather})
print(agent.list_tools())
print(agent.run("get_weather", city="Tokyo"))`,
    },
    check: {
      questions: [
        {
          question: 'You finished World 7! What is the main skill you gained?',
          options: ['Connecting agents to external tools via MCP', 'Fine-tuning a 70B model', 'Building React frontends only', 'Writing SQL migrations'],
          correctIndex: 0,
          explanation: 'MCP standardizes how AI clients discover and call your tools — Anthropic\'s open protocol.',
        },
        {
          question: 'What should you do after this world?',
          options: ['Run a real MCP server with Claude Desktop, then start World 8 (shipping)', 'Delete all your tools', 'Avoid agents entirely', 'Only use closed proprietary APIs'],
          correctIndex: 0,
          explanation: 'World 8 covers FastAPI, deployment, and observability — putting agents in production.',
        },
        {
          question: 'A ConnectedAgent needs...',
          options: ['Tool discovery, dispatch, and feeding results back to the LLM', 'Only a static FAQ page', 'No error handling ever', 'A separate app per tool with no standard'],
          correctIndex: 0,
          explanation: 'Same agent loop as World 6 — MCP just standardizes the tool wire format.',
        },
      ],
    },
  },
]
