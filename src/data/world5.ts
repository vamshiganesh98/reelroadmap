import type { NodeContent } from '../types/content'

export const world5Nodes: NodeContent[] = [
  {
    id: 'w5-n1',
    worldId: 'w5',
    title: 'Embeddings Explained',
    emoji: '🧲',
    summary: 'Turn text into number vectors — similar meanings land close together in vector space.',
    watch: {
      videoId: 'fa3tC67eAtE',
      title: 'What Are Embeddings in AI? Explained Simply',
      channel: 'AI Simplified',
      why: 'Plain-English intro to vectors and meaning — the mental model behind every RAG system.',
    },
    try: {
      goal: 'Compute dot-product similarity between two tiny word vectors (cat vs dog vs car).',
      starterCode: `def dot(a, b):
    return sum(x * y for x, y in zip(a, b))

cat = [0.9, 0.1, 0.0]
dog = [0.85, 0.15, 0.0]
car = [0.0, 0.1, 0.95]

# TODO: print dot(cat, dog) and dot(cat, car)
# Higher score = more similar meaning

`,
      expectedOutput: 'cat-dog higher than cat-car (e.g. ~0.78 vs ~0.10)',
      hints: [
        'dot(cat, dog) should be larger — both are animal-ish vectors.',
        'dot(cat, car) should be smaller — car points in a different direction.',
      ],
      solution: `def dot(a, b):
    return sum(x * y for x, y in zip(a, b))

cat = [0.9, 0.1, 0.0]
dog = [0.85, 0.15, 0.0]
car = [0.0, 0.1, 0.95]

print(round(dot(cat, dog), 2))
print(round(dot(cat, car), 2))`,
    },
    build: {
      goal: 'Embed two sentences with LangChain OpenAIEmbeddings and print vector length (run locally).',
      starterCode: `# pip install langchain-openai
# export OPENAI_API_KEY="sk-..."   (set in your terminal, never commit keys!)
from langchain_openai import OpenAIEmbeddings

# TODO: embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
# TODO: vec = embeddings.embed_query("RAG uses embeddings for search")
# TODO: print len(vec)
# TODO: print round(vec[0], 4)  # peek at first dimension

`,
      expectedOutput: 'A long vector (1536 dims for text-embedding-3-small) and one float',
      hints: [
        'embed_query turns one string into a list of floats.',
        'Real embeddings have hundreds or thousands of dimensions — not our 3-number toy vectors.',
      ],
      solution: `from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vec = embeddings.embed_query("RAG uses embeddings for search")
print(len(vec))
print(round(vec[0], 4))`,
    },
    check: {
      questions: [
        {
          question: 'What is an embedding?',
          options: ['A list of numbers representing text meaning', 'A Python loop', 'An API key', 'A GPU driver'],
          correctIndex: 0,
          explanation: 'Embeddings map words/sentences into vector space — similar text → nearby vectors.',
        },
        {
          question: 'Why do RAG systems use embeddings?',
          options: ['To search documents by meaning, not just exact keywords', 'To train models from scratch', 'To replace LLMs entirely', 'To compress video files'],
          correctIndex: 0,
          explanation: 'Vector search finds relevant chunks even when wording differs from the question.',
        },
        {
          question: 'In our toy example, cat and dog scored higher than cat and car because...',
          options: ['Their vectors point in similar directions (similar meaning)', 'They share the same spelling', 'Dot product always returns 1', 'Cars are not in vector space'],
          correctIndex: 0,
          explanation: 'Similarity = how aligned two vectors are — the core idea behind semantic search.',
        },
      ],
    },
  },
  {
    id: 'w5-n2',
    worldId: 'w5',
    title: 'Chunk & Store Text',
    emoji: '📄',
    summary: 'Split long documents into chunks — LangChain text splitters keep context readable for retrieval.',
    watch: {
      videoId: 'bjb_EMsTDKI',
      title: 'RAG From Scratch: Part 2 (Indexing)',
      channel: 'LangChain',
      why: 'Official walkthrough of loading documents, splitting with RecursiveCharacterTextSplitter, and embedding.',
    },
    try: {
      goal: 'Split a short paragraph into chunks with RecursiveCharacterTextSplitter.',
      starterCode: `# pip install langchain-text-splitters
from langchain_text_splitters import RecursiveCharacterTextSplitter

text = """RAG helps LLMs answer from your documents.
First you chunk the text.
Then you embed each chunk.
Finally you store vectors for search."""

# TODO: splitter = RecursiveCharacterTextSplitter(chunk_size=40, chunk_overlap=10)
# TODO: chunks = splitter.split_text(text)
# TODO: print len(chunks)
# TODO: print chunks[0]

`,
      expectedOutput: 'Multiple chunks; first chunk is a substring of the paragraph',
      hints: [
        'chunk_size limits characters per chunk; chunk_overlap repeats text at boundaries.',
        'split_text returns a list of strings — print len(chunks) first.',
      ],
      solution: `from langchain_text_splitters import RecursiveCharacterTextSplitter

text = """RAG helps LLMs answer from your documents.
First you chunk the text.
Then you embed each chunk.
Finally you store vectors for search."""

splitter = RecursiveCharacterTextSplitter(chunk_size=40, chunk_overlap=10)
chunks = splitter.split_text(text)
print(len(chunks))
print(chunks[0])`,
    },
    build: {
      goal: 'Create LangChain Documents, split them, and print each chunk with its metadata source.',
      starterCode: `# pip install langchain-text-splitters langchain-core
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

docs = [
    Document(page_content="LangChain text splitters break long files into retrieval-sized pieces.", metadata={"source": "notes.txt"}),
    Document(page_content="Overlap between chunks prevents cutting sentences in half.", metadata={"source": "tips.txt"}),
]

# TODO: splitter = RecursiveCharacterTextSplitter(chunk_size=60, chunk_overlap=15)
# TODO: splits = splitter.split_documents(docs)
# TODO: for d in splits: print(d.metadata["source"], ":", d.page_content[:50])

`,
      expectedOutput: 'Lines showing source filename and start of each chunk',
      hints: [
        'split_documents keeps metadata attached to each chunk.',
        'Slice page_content[:50] to preview without flooding the console.',
      ],
      solution: `from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

docs = [
    Document(page_content="LangChain text splitters break long files into retrieval-sized pieces.", metadata={"source": "notes.txt"}),
    Document(page_content="Overlap between chunks prevents cutting sentences in half.", metadata={"source": "tips.txt"}),
]

splitter = RecursiveCharacterTextSplitter(chunk_size=60, chunk_overlap=15)
splits = splitter.split_documents(docs)
for d in splits:
    print(d.metadata["source"], ":", d.page_content[:50])`,
    },
    check: {
      questions: [
        {
          question: 'Why chunk documents before embedding?',
          options: ['LLM context windows are limited — whole books do not fit', 'Chunking trains the model', 'Embeddings only work on one character', 'Chunking deletes metadata'],
          correctIndex: 0,
          explanation: 'Small chunks retrieve precisely; huge pages dilute relevance.',
        },
        {
          question: 'What does chunk_overlap do?',
          options: ['Repeats text at chunk edges so context is not lost', 'Encrypts the document', 'Removes duplicate files', 'Doubles your API bill automatically'],
          correctIndex: 0,
          explanation: 'Overlap keeps sentences that straddle a boundary available in both chunks.',
        },
        {
          question: 'RecursiveCharacterTextSplitter tries to split on...',
          options: ['Paragraphs, then lines, then spaces — keeping meaning together', 'Random characters only', 'Every single letter', 'JSON keys exclusively'],
          correctIndex: 0,
          explanation: 'It prefers natural boundaries before chopping mid-word.',
        },
      ],
    },
  },
  {
    id: 'w5-n3',
    worldId: 'w5',
    title: 'Retrieve & Generate',
    emoji: '🔍',
    summary: 'Vector search finds relevant chunks — then the LLM generates an answer grounded in that context.',
    watch: {
      videoId: 'LxNVgdIz9sU',
      title: 'RAG From Scratch: Part 3 (Retrieval)',
      channel: 'LangChain',
      why: 'Clear explanation of similarity search — embed the question, fetch nearest chunks, pass to the model.',
    },
    try: {
      goal: 'Build a tiny in-memory "vector store" and retrieve the closest chunk to a query vector.',
      starterCode: `def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    mag_a = sum(x * x for x in a) ** 0.5
    mag_b = sum(x * x for x in b) ** 0.5
    return dot / (mag_a * mag_b)

chunks = {
    "refund": [0.1, 0.9, 0.0],
    "shipping": [0.8, 0.1, 0.0],
    "billing": [0.2, 0.7, 0.1],
}
query = [0.15, 0.85, 0.05]  # closest to refund policy

# TODO: scores = {name: cosine(query, vec) for name, vec in chunks.items()}
# TODO: best = max(scores, key=scores.get)
# TODO: print best, round(scores[best], 3)

`,
      expectedOutput: 'refund with the highest similarity score',
      hints: [
        'max(scores, key=scores.get) returns the key with the highest value.',
        'This is the same idea as vectorstore.similarity_search — just with toy numbers.',
      ],
      solution: `def cosine(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    mag_a = sum(x * x for x in a) ** 0.5
    mag_b = sum(x * x for x in b) ** 0.5
    return dot / (mag_a * mag_b)

chunks = {
    "refund": [0.1, 0.9, 0.0],
    "shipping": [0.8, 0.1, 0.0],
    "billing": [0.2, 0.7, 0.1],
}
query = [0.15, 0.85, 0.05]

scores = {name: cosine(query, vec) for name, vec in chunks.items()}
best = max(scores, key=scores.get)
print(best, round(scores[best], 3))`,
    },
    build: {
      goal: 'Index LangChain Documents in FAISS and run similarity_search (run locally with OPENAI_API_KEY).',
      starterCode: `# pip install langchain-openai langchain-community faiss-cpu
from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

docs = [
    Document(page_content="Our refund policy allows returns within 30 days."),
    Document(page_content="Standard shipping takes 5-7 business days."),
    Document(page_content="Contact billing@example.com for invoice questions."),
]

# TODO: embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
# TODO: store = FAISS.from_documents(docs, embeddings)
# TODO: hits = store.similarity_search("How do I get my money back?", k=1)
# TODO: print hits[0].page_content

`,
      expectedOutput: 'The refund policy sentence',
      hints: [
        'FAISS.from_documents embeds every chunk and builds a searchable index.',
        'k=1 returns the single closest chunk — increase k to fetch more context.',
      ],
      solution: `from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

docs = [
    Document(page_content="Our refund policy allows returns within 30 days."),
    Document(page_content="Standard shipping takes 5-7 business days."),
    Document(page_content="Contact billing@example.com for invoice questions."),
]

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
store = FAISS.from_documents(docs, embeddings)
hits = store.similarity_search("How do I get my money back?", k=1)
print(hits[0].page_content)`,
    },
    check: {
      questions: [
        {
          question: 'In RAG, "retrieve" means...',
          options: ['Find document chunks relevant to the user question', 'Download the entire internet', 'Fine-tune model weights', 'Delete old embeddings'],
          correctIndex: 0,
          explanation: 'Retrieval = semantic search over your indexed chunks.',
        },
        {
          question: '"Generate" in RAG means...',
          options: ['The LLM writes an answer using retrieved context', 'Creating random embeddings', 'Splitting text into chunks', 'Training a new tokenizer'],
          correctIndex: 0,
          explanation: 'Find first, then generate — the LLM reads the chunks you retrieved.',
        },
        {
          question: 'similarity_search with k=3 returns...',
          options: ['The 3 closest chunks to the query embedding', 'Exactly 3 random chunks', 'The 3 longest documents', 'The 3 newest files on disk'],
          correctIndex: 0,
          explanation: 'k controls how much context you pass to the LLM — a key tuning knob.',
        },
      ],
    },
  },
  {
    id: 'w5-n4',
    worldId: 'w5',
    title: 'LangChain RAG Chain',
    emoji: '⛓️',
    summary: 'Wire retriever + prompt + LLM with create_retrieval_chain — the modern LangChain RAG pattern.',
    watch: {
      videoId: 'Vw52xyyFsB8',
      title: 'RAG From Scratch: Part 4 (Generation)',
      channel: 'LangChain',
      why: 'Shows how retrieved context flows into a prompt — the same wiring create_retrieval_chain automates.',
    },
    try: {
      goal: 'Build a minimal LCEL RAG chain: retriever context piped into a prompt and LLM.',
      starterCode: `# pip install langchain-openai langchain-community faiss-cpu
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

docs = [Document(page_content="The company mascot is a robot named Chip.")]
store = FAISS.from_documents(docs, OpenAIEmbeddings(model="text-embedding-3-small"))
retriever = store.as_retriever()

prompt = ChatPromptTemplate.from_template(
    "Answer using only this context:\\n{context}\\n\\nQuestion: {question}"
)
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# TODO: def format_docs(docs): return "\\n".join(d.page_content for d in docs)
# TODO: chain = (
#     {"context": retriever | format_docs, "question": RunnablePassthrough()}
#     | prompt | llm | StrOutputParser()
# )
# TODO: print chain.invoke("What is the mascot name?")

`,
      expectedOutput: 'An answer mentioning Chip (grounded in the document)',
      hints: [
        'format_docs joins retrieved Document objects into one context string.',
        'RunnablePassthrough() passes the input string as "question".',
      ],
      solution: `from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

docs = [Document(page_content="The company mascot is a robot named Chip.")]
store = FAISS.from_documents(docs, OpenAIEmbeddings(model="text-embedding-3-small"))
retriever = store.as_retriever()

prompt = ChatPromptTemplate.from_template(
    "Answer using only this context:\\n{context}\\n\\nQuestion: {question}"
)
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

def format_docs(docs):
    return "\\n".join(d.page_content for d in docs)

chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)
print(chain.invoke("What is the mascot name?"))`,
    },
    build: {
      goal: 'Build a RAG chain with create_retrieval_chain + create_stuff_documents_chain (run locally).',
      starterCode: `# pip install langchain langchain-openai langchain-community faiss-cpu
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

docs = [
    Document(page_content="Our support hours are 9am-5pm Pacific, Monday through Friday."),
    Document(page_content="Emergency phone support is available 24/7 for enterprise plans."),
]

# TODO: store = FAISS.from_documents(docs, OpenAIEmbeddings(model="text-embedding-3-small"))
# TODO: retriever = store.as_retriever()
# TODO: llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
# TODO: prompt = ChatPromptTemplate.from_messages([
#     ("system", "Answer from the context below.\\n\\n{context}"),
#     ("human", "{input}"),
# ])
# TODO: doc_chain = create_stuff_documents_chain(llm, prompt)
# TODO: rag_chain = create_retrieval_chain(retriever, doc_chain)
# TODO: result = rag_chain.invoke({"input": "When is live chat available?"})
# TODO: print result["answer"]

`,
      expectedOutput: 'An answer about 9am-5pm Pacific support hours',
      hints: [
        'create_stuff_documents_chain stuffs all retrieved docs into {context}.',
        'invoke({"input": "..."}) — note the key is "input", not "query".',
      ],
      solution: `from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

docs = [
    Document(page_content="Our support hours are 9am-5pm Pacific, Monday through Friday."),
    Document(page_content="Emergency phone support is available 24/7 for enterprise plans."),
]

store = FAISS.from_documents(docs, OpenAIEmbeddings(model="text-embedding-3-small"))
retriever = store.as_retriever()
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
prompt = ChatPromptTemplate.from_messages([
    ("system", "Answer from the context below.\\n\\n{context}"),
    ("human", "{input}"),
])
doc_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, doc_chain)
result = rag_chain.invoke({"input": "When is live chat available?"})
print(result["answer"])`,
    },
    check: {
      questions: [
        {
          question: 'What does create_retrieval_chain combine?',
          options: ['A retriever plus a document-combining LLM chain', 'Two unrelated pandas DataFrames', 'A GPU and a CSV file', 'Only embedding models'],
          correctIndex: 0,
          explanation: 'It automates retrieve → stuff context → LLM answer — the RAG loop in one call.',
        },
        {
          question: 'RetrievalQA is deprecated — the modern replacement is...',
          options: ['create_retrieval_chain (LCEL-style RAG)', 'More print statements', 'Deleting the vector store', 'Using only keyword search'],
          correctIndex: 0,
          explanation: 'LangChain moved to composable chains — create_retrieval_chain is the official pattern.',
        },
        {
          question: 'Why tell the LLM "answer only from context"?',
          options: ['Reduces hallucinations when the answer must come from your docs', 'It makes the model train faster', 'OpenAI requires that exact phrase', 'Context is ignored anyway'],
          correctIndex: 0,
          explanation: 'Grounding instructions keep answers tied to retrieved chunks — core RAG hygiene.',
        },
      ],
    },
  },
  {
    id: 'w5-n5',
    worldId: 'w5',
    title: 'World 5 Project: Doc Chatbot',
    emoji: '🏁',
    summary: 'Combine chunking, FAISS, and a retrieval chain into a reusable document Q&A chatbot.',
    watch: {
      videoId: 'sVcwVQRHIc8',
      title: 'Learn RAG From Scratch – Python AI Tutorial',
      channel: 'freeCodeCamp.org',
      startSeconds: 0,
      endSeconds: 960,
      why: 'Full end-to-end RAG build from a LangChain engineer — indexing through generation in one course.',
    },
    try: {
      goal: 'Write a function that turns raw text into chunked LangChain Documents with source metadata.',
      starterCode: `# pip install langchain-text-splitters langchain-core
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

def load_text_corpus(text: str, source: str) -> list:
    # TODO: doc = Document(page_content=text, metadata={"source": source})
    # TODO: splitter = RecursiveCharacterTextSplitter(chunk_size=80, chunk_overlap=20)
    # TODO: return splitter.split_documents([doc])

corpus = load_text_corpus(
    "Our API rate limit is 100 requests per minute. "
    "Enterprise customers can request a higher limit.",
    "api-guide.md",
)
print(len(corpus))
print(corpus[0].metadata["source"])

`,
      expectedOutput: 'One or more chunks with source api-guide.md',
      hints: [
        'Wrap the full string in one Document before splitting.',
        'metadata={"source": source} tracks where each chunk came from.',
      ],
      solution: `from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

def load_text_corpus(text: str, source: str) -> list:
    doc = Document(page_content=text, metadata={"source": source})
    splitter = RecursiveCharacterTextSplitter(chunk_size=80, chunk_overlap=20)
    return splitter.split_documents([doc])

corpus = load_text_corpus(
    "Our API rate limit is 100 requests per minute. "
    "Enterprise customers can request a higher limit.",
    "api-guide.md",
)
print(len(corpus))
print(corpus[0].metadata["source"])`,
    },
    build: {
      goal: 'Build a DocChatbot class: index documents, then answer questions with create_retrieval_chain.',
      starterCode: `# pip install langchain langchain-openai langchain-community faiss-cpu langchain-text-splitters
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter

class DocChatbot:
    def __init__(self, docs: list):
        # TODO: splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=20)
        # TODO: chunks = splitter.split_documents(docs)
        # TODO: self.store = FAISS.from_documents(chunks, OpenAIEmbeddings(model="text-embedding-3-small"))
        # TODO: retriever = self.store.as_retriever(search_kwargs={"k": 2})
        # TODO: llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
        # TODO: prompt = ChatPromptTemplate.from_messages([
        #     ("system", "Answer from context only. If unknown, say \\"I don't know.\\"\\n\\n{context}"),
        #     ("human", "{input}"),
        # ])
        # TODO: doc_chain = create_stuff_documents_chain(llm, prompt)
        # TODO: self.chain = create_retrieval_chain(retriever, doc_chain)
        pass

    def ask(self, question: str) -> str:
        # TODO: return self.chain.invoke({"input": question})["answer"]
        pass

# docs = [
#     Document(page_content="Passwords must be at least 12 characters.", metadata={"source": "security.md"}),
#     Document(page_content="Reset tokens expire after 15 minutes.", metadata={"source": "security.md"}),
# ]
# bot = DocChatbot(docs)
# print(bot.ask("How long do reset tokens last?"))

`,
      expectedOutput: '15 minutes (grounded in the security doc)',
      hints: [
        'Split in __init__, build the chain once, reuse for every ask().',
        'search_kwargs={"k": 2} retrieves two chunks — good default for small docs.',
      ],
      solution: `from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter

class DocChatbot:
    def __init__(self, docs: list):
        splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=20)
        chunks = splitter.split_documents(docs)
        self.store = FAISS.from_documents(chunks, OpenAIEmbeddings(model="text-embedding-3-small"))
        retriever = self.store.as_retriever(search_kwargs={"k": 2})
        llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
        prompt = ChatPromptTemplate.from_messages([
            ("system", "Answer from context only. If unknown, say \\"I don't know.\\"\\n\\n{context}"),
            ("human", "{input}"),
        ])
        doc_chain = create_stuff_documents_chain(llm, prompt)
        self.chain = create_retrieval_chain(retriever, doc_chain)

    def ask(self, question: str) -> str:
        return self.chain.invoke({"input": question})["answer"]

docs = [
    Document(page_content="Passwords must be at least 12 characters.", metadata={"source": "security.md"}),
    Document(page_content="Reset tokens expire after 15 minutes.", metadata={"source": "security.md"}),
]
bot = DocChatbot(docs)
print(bot.ask("How long do reset tokens last?"))`,
    },
    check: {
      questions: [
        {
          question: 'You finished World 5! What is the main skill you gained?',
          options: ['Building RAG pipelines: chunk → embed → retrieve → generate', 'Training a 405B model from scratch', 'Writing CUDA kernels', 'Designing SQL databases only'],
          correctIndex: 0,
          explanation: 'Embeddings, text splitters, vector stores, and retrieval chains — your doc chatbot toolkit.',
        },
        {
          question: 'What should you do after this world?',
          options: ['Run DocChatbot on your own text files locally, then explore agents in World 6', 'Delete your vector store after every question', 'Skip retrieval and hope the LLM remembers', 'Only use RAG in production without testing'],
          correctIndex: 0,
          explanation: 'Try your own PDFs or notes — hands-on reps beat watching alone.',
        },
        {
          question: 'A production doc chatbot should...',
          options: ['Cite sources and say "I don\'t know" when context is missing', 'Always guess confidently', 'Never chunk documents', 'Ignore metadata'],
          correctIndex: 0,
          explanation: 'Trustworthy RAG = grounded answers + honest limits — same rubric as the capstone project.',
        },
      ],
    },
  },
]
