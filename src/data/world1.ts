import type { NodeContent } from '../types/content'

export const world1Nodes: NodeContent[] = [
  {
    id: 'w1-n1',
    worldId: 'w1',
    title: 'Variables & Printing',
    emoji: '📦',
    summary: 'Store data in Python and print results — your first AI building blocks.',
    watch: {
      videoId: '_uQrJ0TkZlc',
      title: 'Python Variables (start here)',
      channel: 'Programming with Mosh',
      startSeconds: 420,
      endSeconds: 780,
      why: 'Skip install chatter — jump to where variables actually get explained in plain English.',
    },
    try: {
      goal: 'Create two variables and print a sentence that uses both.',
      starterCode: `# TODO: create a variable called model_name with value "mini-llm"
# TODO: create a variable called accuracy with value 0.87
# TODO: print a sentence like: Model mini-llm scored 0.87

`,
      expectedOutput: 'Model mini-llm scored 0.87',
      hints: [
        'Use model_name = "mini-llm" — text goes in quotes.',
        'Use print(f"Model {model_name} scored {accuracy}") for a clean sentence.',
      ],
      solution: `model_name = "mini-llm"
accuracy = 0.87
print(f"Model {model_name} scored {accuracy}")`,
    },
    build: {
      goal: 'Build a tiny "model card" — name, task, and score — printed nicely.',
      starterCode: `# Fill in the three fields for a fake AI model, then print a 3-line card.

name = "TODO"
task = "TODO"
score = 0.0  # use a number between 0 and 1

# TODO: print three lines:
# Name: ...
# Task: ...
# Score: ...

`,
      expectedOutput: 'Three labeled lines with your model info',
      hints: [
        'Example: name = "SpamBot", task = "email classification", score = 0.92',
        'Use print("Name:", name) three times — one per field.',
      ],
      solution: `name = "SpamBot"
task = "email classification"
score = 0.92

print("Name:", name)
print("Task:", task)
print("Score:", score)`,
    },
    check: {
      questions: [
        {
          question: 'What does a variable do in Python?',
          options: ['Stores a value you can reuse', 'Only prints text', 'Installs packages', 'Runs the GPU'],
          correctIndex: 0,
          explanation: 'Variables are labeled boxes for data — you will use them constantly in ML.',
        },
        {
          question: 'Which is a valid variable name?',
          options: ['2score', 'model-name', 'model_name', 'class'],
          correctIndex: 2,
          explanation: 'Use letters, numbers, underscores. No spaces or starting with a number.',
        },
        {
          question: 'Why do AI engineers use f-strings?',
          options: ['They make mixing text and variables easy', 'They train neural nets faster', 'They replace NumPy', 'They are required by OpenAI'],
          correctIndex: 0,
          explanation: 'f"Hello {name}" is the cleanest way to build messages and logs.',
        },
      ],
    },
  },
  {
    id: 'w1-n2',
    worldId: 'w1',
    title: 'Functions',
    emoji: '⚙️',
    summary: 'Wrap reusable logic — every ML pipeline is made of functions.',
    watch: {
      videoId: '9Os0oKUOoJo',
      title: 'Python Functions',
      channel: 'Corey Schafer',
      startSeconds: 0,
      why: 'Clear, short explanation of def, parameters, and return values.',
    },
    try: {
      goal: 'Write a function that doubles a number and returns it.',
      starterCode: `# TODO: define double(x) that returns x * 2
# TODO: print double(21)

`,
      expectedOutput: '42',
      hints: [
        'Start with: def double(x):',
        'Use return x * 2 inside the function.',
      ],
      solution: `def double(x):
    return x * 2

print(double(21))`,
    },
    build: {
      goal: 'Write score_label(score) that returns "pass" if score >= 0.5 else "fail".',
      starterCode: `# TODO: define score_label(score)
# TODO: print score_label(0.8) and score_label(0.3)

`,
      expectedOutput: 'pass then fail (on separate lines)',
      hints: [
        'Use if score >= 0.5: return "pass" else return "fail"',
        'Test with two print() calls.',
      ],
      solution: `def score_label(score):
    if score >= 0.5:
        return "pass"
    return "fail"

print(score_label(0.8))
print(score_label(0.3))`,
    },
    check: {
      questions: [
        {
          question: 'What keyword starts a function definition?',
          options: ['func', 'def', 'function', 'lambda only'],
          correctIndex: 1,
          explanation: 'def name(params): is how every Python function begins.',
        },
        {
          question: 'What does return do?',
          options: ['Sends a value back to the caller', 'Stops Python forever', 'Prints to screen', 'Imports NumPy'],
          correctIndex: 0,
          explanation: 'return gives your result back — like model.predict() giving predictions.',
        },
        {
          question: 'Why are functions important for AI code?',
          options: ['They organize reusable steps like preprocess, train, evaluate', 'They replace GPUs', 'They are only for web apps', 'Python requires one function per file'],
          correctIndex: 0,
          explanation: 'ML code is pipelines of small reusable functions.',
        },
      ],
    },
  },
  {
    id: 'w1-n3',
    worldId: 'w1',
    title: 'Loops',
    emoji: '🔁',
    summary: 'Repeat actions over data — training loops are just fancy for-loops.',
    watch: {
      videoId: '6iF8Xy7BDIA',
      title: 'While Loops in Python',
      channel: 'Corey Schafer',
      why: 'Understand repetition — then for-loops over datasets feel natural.',
    },
    try: {
      goal: 'Print numbers 1 through 5 using a for-loop.',
      starterCode: `# TODO: loop 1..5 inclusive and print each number

`,
      expectedOutput: '1\\n2\\n3\\n4\\n5',
      hints: [
        'Use for i in range(1, 6): — range stops BEFORE the end number.',
        'print(i) inside the loop body (indented).',
      ],
      solution: `for i in range(1, 6):
    print(i)`,
    },
    build: {
      goal: 'Sum a list of epoch losses and print the average.',
      starterCode: `losses = [0.9, 0.7, 0.55, 0.4, 0.32]
total = 0

# TODO: loop over losses, add each to total
# TODO: compute average = total / len(losses) and print it

`,
      expectedOutput: '0.574',
      hints: [
        'for loss in losses: total += loss',
        'average = total / len(losses)',
      ],
      solution: `losses = [0.9, 0.7, 0.55, 0.4, 0.32]
total = 0
for loss in losses:
    total += loss
average = total / len(losses)
print(round(average, 3))`,
    },
    check: {
      questions: [
        {
          question: 'What does range(1, 6) produce?',
          options: ['1 through 5', '1 through 6', '0 through 5', '6 numbers starting at 0'],
          correctIndex: 0,
          explanation: 'range start is included, end is excluded — so 1,2,3,4,5.',
        },
        {
          question: 'Why do ML engineers use loops?',
          options: ['To repeat training over batches and epochs', 'To avoid using Python', 'Only for printing', 'Loops are banned in PyTorch'],
          correctIndex: 0,
          explanation: 'Training = looping over data again and again until the model learns.',
        },
        {
          question: 'What happens if you forget to indent loop body code?',
          options: ['SyntaxError or wrong logic', 'It runs faster', 'Python auto-indents', 'Nothing'],
          correctIndex: 0,
          explanation: 'Indentation defines what is INSIDE the loop — critical in Python.',
        },
      ],
    },
  },
  {
    id: 'w1-n4',
    worldId: 'w1',
    title: 'Lists & Dicts',
    emoji: '🗂️',
    summary: 'Store batches of data and labeled info — the structures behind every dataset.',
    watch: {
      videoId: 'HGOBQHFjxTk',
      title: 'Python Lists',
      channel: 'Corey Schafer',
      why: 'Lists hold sequences (like a batch of examples). Dicts come next naturally.',
    },
    try: {
      goal: 'Create a list of three model names and print the second one.',
      starterCode: `# TODO: models = ["gpt", "llama", "gemini"]
# TODO: print the second model (index 1)

`,
      expectedOutput: 'llama',
      hints: [
        'Python indexes start at 0 — second item is index 1.',
        'print(models[1])',
      ],
      solution: `models = ["gpt", "llama", "gemini"]
print(models[1])`,
    },
    build: {
      goal: 'Build a dict describing one ML experiment and print two fields.',
      starterCode: `# TODO: experiment = {"name": "run-01", "lr": 0.001, "epochs": 5}
# TODO: print name and epochs on separate lines

`,
      expectedOutput: 'run-01 and 5',
      hints: [
        'Access dict values: experiment["name"]',
        'Print each with print(...).',
      ],
      solution: `experiment = {"name": "run-01", "lr": 0.001, "epochs": 5}
print(experiment["name"])
print(experiment["epochs"])`,
    },
    check: {
      questions: [
        {
          question: 'What index is the FIRST item in a Python list?',
          options: ['0', '1', '-1', 'Depends on Python version'],
          correctIndex: 0,
          explanation: 'Zero-indexing — models[0] is the first element.',
        },
        {
          question: 'When would you use a dict in AI work?',
          options: ['Storing config like learning rate, batch size, model name', 'Replacing NumPy', 'Only for JSON files on disk', 'Never'],
          correctIndex: 0,
          explanation: 'Configs, metrics, and metadata are almost always dicts.',
        },
        {
          question: 'Can a list hold mixed types?',
          options: ['Yes — Python lists are flexible', 'No — only numbers', 'Only strings', 'Only with pandas'],
          correctIndex: 0,
          explanation: 'But in ML you usually keep batches uniform (all numbers or all strings).',
        },
      ],
    },
  },
  {
    id: 'w1-n5',
    worldId: 'w1',
    title: 'NumPy Basics',
    emoji: '🔢',
    summary: 'Fast number arrays — the language neural networks speak.',
    watch: {
      videoId: 'QUT1VHiLmmI',
      title: 'NumPy in 15 Minutes',
      channel: 'Keith Galli',
      startSeconds: 0,
      endSeconds: 900,
      why: 'Short, practical intro to arrays — skip the long stuff for now.',
    },
    try: {
      goal: 'Create a NumPy array [1,2,3,4] and print its mean.',
      starterCode: `import numpy as np

# TODO: arr = np.array([1, 2, 3, 4])
# TODO: print the mean using arr.mean()

`,
      expectedOutput: '2.5',
      hints: [
        'np.array([...]) creates the array.',
        'arr.mean() gives the average — no loop needed.',
      ],
      solution: `import numpy as np

arr = np.array([1, 2, 3, 4])
print(arr.mean())`,
    },
    build: {
      goal: 'Normalize an array by subtracting the mean (centering data — common ML step).',
      starterCode: `import numpy as np

data = np.array([10.0, 20.0, 30.0, 40.0])
# TODO: centered = data - data.mean()
# TODO: print centered

`,
      expectedOutput: '[-15. -5.  5. 15.] (approximately)',
      hints: [
        'NumPy math works on whole arrays at once — data - data.mean()',
        'This is called "centering" and appears in preprocessing everywhere.',
      ],
      solution: `import numpy as np

data = np.array([10.0, 20.0, 30.0, 40.0])
centered = data - data.mean()
print(centered)`,
    },
    check: {
      questions: [
        {
          question: 'Why does ML use NumPy instead of plain Python lists for numbers?',
          options: ['Speed + math on whole arrays at once', 'NumPy is required by YouTube', 'Lists cannot hold numbers', 'NumPy replaces Python'],
          correctIndex: 0,
          explanation: 'Neural nets need fast matrix math — NumPy (and later PyTorch) provide that.',
        },
        {
          question: 'What does np.array([1,2,3]).mean() return?',
          options: ['2.0', '3', '6', 'An error'],
          correctIndex: 0,
          explanation: '(1+2+3)/3 = 2.0 — simple but you will use mean() constantly.',
        },
        {
          question: 'Normalizing/centering data helps models because...',
          options: ['It puts features on a similar scale so learning is stable', 'It deletes outliers automatically', 'It replaces training', 'It is only for charts'],
          correctIndex: 0,
          explanation: 'Badly scaled data makes training slow or unstable — preprocessing matters.',
        },
      ],
    },
  },
  {
    id: 'w1-n6',
    worldId: 'w1',
    title: 'Pandas Basics',
    emoji: '📊',
    summary: 'Load and explore tabular data — every Kaggle dataset starts here.',
    watch: {
      videoId: 'vmEHCJofslg',
      title: 'Pandas in 10 Minutes',
      channel: 'Keith Galli',
      why: 'Fast tour of DataFrames — the spreadsheet of Python AI work.',
    },
    try: {
      goal: 'Create a tiny DataFrame and print the "score" column.',
      starterCode: `import pandas as pd

# TODO: df = pd.DataFrame({"name": ["A", "B"], "score": [0.8, 0.6]})
# TODO: print df["score"]

`,
      expectedOutput: '0.8 and 0.6',
      hints: [
        'pd.DataFrame({col: [values]}) builds a table.',
        'df["score"] selects one column.',
      ],
      solution: `import pandas as pd

df = pd.DataFrame({"name": ["A", "B"], "score": [0.8, 0.6]})
print(df["score"])`,
    },
    build: {
      goal: 'Filter rows where score >= 0.7 and print the count.',
      starterCode: `import pandas as pd

df = pd.DataFrame({
    "model": ["alpha", "beta", "gamma"],
    "score": [0.9, 0.55, 0.72]
})

# TODO: good = df[df["score"] >= 0.7]
# TODO: print len(good)

`,
      expectedOutput: '2',
      hints: [
        'Boolean filter: df[df["score"] >= 0.7]',
        'len(good) counts rows that passed.',
      ],
      solution: `import pandas as pd

df = pd.DataFrame({
    "model": ["alpha", "beta", "gamma"],
    "score": [0.9, 0.55, 0.72]
})
good = df[df["score"] >= 0.7]
print(len(good))`,
    },
    check: {
      questions: [
        {
          question: 'What is a pandas DataFrame?',
          options: ['A table with named columns and rows', 'A neural network layer', 'A GPU driver', 'A type of Python loop'],
          correctIndex: 0,
          explanation: 'Think Excel sheet in code — perfect for structured datasets.',
        },
        {
          question: 'df["score"] gives you...',
          options: ['One column as a Series', 'The entire file as JSON', 'Only the max value', 'A NumPy GPU tensor'],
          correctIndex: 0,
          explanation: 'Column selection is step one in almost every data exploration.',
        },
        {
          question: 'Why filter rows in ML?',
          options: ['To focus on subsets like high-quality examples', 'To delete the dataset', 'Pandas requires it', 'To avoid using NumPy'],
          correctIndex: 0,
          explanation: 'Filtering = finding the data you actually want to train or evaluate on.',
        },
      ],
    },
  },
  {
    id: 'w1-n7',
    worldId: 'w1',
    title: 'World 1 Project: Mini Data Report',
    emoji: '🏁',
    summary: 'Combine Python + NumPy + Pandas into one small project you can show off.',
    watch: {
      videoId: 'rfscVS0vtbw',
      title: 'Python for Data (overview)',
      channel: 'freeCodeCamp',
      startSeconds: 7200,
      endSeconds: 7800,
      why: 'Optional context on how Python pieces fit together in data work — watch if curious.',
    },
    try: {
      goal: 'Load inline data, compute average score, print a one-line report.',
      starterCode: `import pandas as pd

df = pd.DataFrame({"model": ["A", "B", "C"], "score": [0.7, 0.85, 0.6]})
# TODO: avg = df["score"].mean()
# TODO: print f"Average score: {avg:.2f}"

`,
      expectedOutput: 'Average score: 0.72',
      hints: [
        'df["score"].mean() for the average.',
        ':.2f formats to 2 decimal places.',
      ],
      solution: `import pandas as pd

df = pd.DataFrame({"model": ["A", "B", "C"], "score": [0.7, 0.85, 0.6]})
avg = df["score"].mean()
print(f"Average score: {avg:.2f}")`,
    },
    build: {
      goal: 'Build a full mini report: best model name + average score + count of models above 0.7.',
      starterCode: `import pandas as pd

df = pd.DataFrame({
    "model": ["nova", "pulse", "spark"],
    "score": [0.91, 0.74, 0.68]
})

# TODO: best = row with highest score (use df.loc[df["score"].idxmax()])
# TODO: avg = df["score"].mean()
# TODO: count = number of rows where score >= 0.7
# TODO: print three lines: Best model, Average, Count above 0.7

`,
      expectedOutput: 'Three summary lines about the models',
      hints: [
        'idxmax() finds index of max score: best = df.loc[df["score"].idxmax()]',
        'count = len(df[df["score"] >= 0.7])',
      ],
      solution: `import pandas as pd

df = pd.DataFrame({
    "model": ["nova", "pulse", "spark"],
    "score": [0.91, 0.74, 0.68]
})
best = df.loc[df["score"].idxmax()]
avg = df["score"].mean()
count = len(df[df["score"] >= 0.7])
print("Best model:", best["model"], best["score"])
print("Average:", round(avg, 2))
print("Count above 0.7:", count)`,
    },
    check: {
      questions: [
        {
          question: 'You finished World 1! What is the main skill you gained?',
          options: ['Python data basics for AI work', 'How to deploy Kubernetes', 'Advanced backprop proofs', 'CUDA kernel writing'],
          correctIndex: 0,
          explanation: 'Variables, functions, loops, lists, NumPy, Pandas — your AI foundation.',
        },
        {
          question: 'What should you do after this world?',
          options: ['Build the mini report for real, then start World 2', 'Memorize every pandas function', 'Skip to agents immediately', 'Stop coding and only watch videos'],
          correctIndex: 0,
          explanation: 'Hands-on reps matter — World 2 explains how neural nets actually work.',
        },
        {
          question: 'idxmax() is useful because...',
          options: ['It finds the row with the highest value quickly', 'It trains models', 'It connects to OpenAI', 'It replaces loops entirely'],
          correctIndex: 0,
          explanation: 'Common pattern: find best model, best epoch, best hyperparameter.',
        },
      ],
    },
  },
]
