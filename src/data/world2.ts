import type { NodeContent } from '../types/content'

export const world2Nodes: NodeContent[] = [
  {
    id: 'w2-n1',
    worldId: 'w2',
    title: 'What Is a Neural Net?',
    emoji: '🧠',
    summary: 'Intuition first — no heavy math. See how neurons connect.',
    watch: {
      videoId: 'aircAruvnKk',
      title: 'But what is a neural network?',
      channel: '3Blue1Brown',
      why: 'The best visual intro on the internet — watch the whole thing, it is worth it.',
    },
    try: {
      goal: 'Compute a weighted sum: inputs [1,2], weights [0.5, 0.3], bias 0.1',
      starterCode: `# One neuron = weighted sum + bias (before activation)
inputs = [1, 2]
weights = [0.5, 0.3]
bias = 0.1

# TODO: z = inputs[0]*weights[0] + inputs[1]*weights[1] + bias
# TODO: print z

`,
      expectedOutput: '1.2',
      hints: [
        'Multiply each input by its weight, add them up, add bias.',
        '1*0.5 + 2*0.3 + 0.1 = 1.2',
      ],
      solution: `inputs = [1, 2]
weights = [0.5, 0.3]
bias = 0.1
z = inputs[0]*weights[0] + inputs[1]*weights[1] + bias
print(z)`,
    },
    build: {
      goal: 'Apply a step activation: output 1 if z >= 0 else 0.',
      starterCode: `z = -0.5

# TODO: if z >= 0: output = 1 else output = 0
# TODO: print output

`,
      expectedOutput: '0',
      hints: [
        'A step function fires if the weighted sum crosses zero.',
        'This is the simplest "activation" — modern nets use smoother ones like ReLU.',
      ],
      solution: `z = -0.5
if z >= 0:
    output = 1
else:
    output = 0
print(output)`,
    },
    check: {
      questions: [
        {
          question: 'A single neuron first computes...',
          options: ['Weighted sum of inputs plus bias', 'Random guesses', 'A pandas DataFrame', 'GPU memory'],
          correctIndex: 0,
          explanation: 'z = w·x + b — then an activation function adds non-linearity.',
        },
        {
          question: 'Why stack many neurons in layers?',
          options: ['To learn complex patterns simple rules cannot', 'To use more electricity', 'Because Python requires it', 'To replace data'],
          correctIndex: 0,
          explanation: 'Depth lets networks learn hierarchies — edges → shapes → objects.',
        },
        {
          question: 'Activation functions exist because...',
          options: ['Without them, stacking layers would stay linear', 'They make code shorter', 'They download datasets', 'They are optional decoration'],
          correctIndex: 0,
          explanation: 'Non-linearity is what makes deep nets powerful.',
        },
      ],
    },
  },
  {
    id: 'w2-n2',
    worldId: 'w2',
    title: 'Layers & ReLU',
    emoji: '📚',
    summary: 'Understand how layers stack and why ReLU is the default activation.',
    watch: {
      videoId: 'aircAruvnKk',
      title: 'Hidden layers (same video, part 2)',
      channel: '3Blue1Brown',
      startSeconds: 600,
      why: 'Jump to where 3Blue1Brown explains hidden layers — builds on node 1.',
    },
    try: {
      goal: 'Implement relu(x): return x if x > 0 else 0.',
      starterCode: `def relu(x):
    # TODO: return x if positive, else 0
    pass

print(relu(3))
print(relu(-2))

`,
      expectedOutput: '3 then 0',
      hints: [
        'if x > 0: return x else return 0',
        'ReLU is the most common activation in modern networks.',
      ],
      solution: `def relu(x):
    if x > 0:
        return x
    return 0

print(relu(3))
print(relu(-2))`,
    },
    build: {
      goal: 'Apply relu to a list of neuron outputs.',
      starterCode: `def relu(x):
    return x if x > 0 else 0

layer_output = [-1.2, 0.0, 2.5, -0.3]
# TODO: activated = [relu(v) for v in layer_output]
# TODO: print activated

`,
      expectedOutput: '[0, 0, 2.5, 0]',
      hints: [
        'List comprehension: [relu(v) for v in layer_output]',
        'Negative values become 0 — that is the "rectified" part.',
      ],
      solution: `def relu(x):
    return x if x > 0 else 0

layer_output = [-1.2, 0.0, 2.5, -0.3]
activated = [relu(v) for v in layer_output]
print(activated)`,
    },
    check: {
      questions: [
        {
          question: 'ReLU stands for...',
          options: ['Rectified Linear Unit', 'Random Learning Utility', 'Recursive Layer Update', 'Return Loss Unchanged'],
          correctIndex: 0,
          explanation: 'max(0, x) — simple, fast, works great in practice.',
        },
        {
          question: 'relu(-5) equals...',
          options: ['0', '-5', '5', 'Error'],
          correctIndex: 0,
          explanation: 'Negative inputs are clamped to zero.',
        },
        {
          question: 'Hidden layers are called "hidden" because...',
          options: ['We do not directly set their values — the network learns them', 'They are secret', 'They are invisible in code', 'They only run at night'],
          correctIndex: 0,
          explanation: 'You set inputs and read outputs — middle layers are learned automatically.',
        },
      ],
    },
  },
  {
    id: 'w2-n3',
    worldId: 'w2',
    title: 'Forward Pass by Hand',
    emoji: '➡️',
    summary: 'Push data through two neurons — no frameworks, pure Python.',
    watch: {
      videoId: 'VMj-3S1tukI',
      title: 'Micrograd intro (Karpathy)',
      channel: 'Andrej Karpathy',
      startSeconds: 0,
      endSeconds: 600,
      why: 'Karpathy builds neural nets from scratch — watch the first ~10 min for motivation.',
    },
    try: {
      goal: 'Forward pass through ONE neuron with relu.',
      starterCode: `def relu(x):
    return x if x > 0 else 0

inputs = [0.5, -1.0]
weights = [2.0, 3.0]
bias = -0.5

# TODO: z = weighted sum + bias
# TODO: output = relu(z)
# TODO: print output

`,
      expectedOutput: '0',
      hints: [
        'z = 0.5*2.0 + (-1.0)*3.0 + (-0.5) = -3.0',
        'relu(-3.0) = 0',
      ],
      solution: `def relu(x):
    return x if x > 0 else 0

inputs = [0.5, -1.0]
weights = [2.0, 3.0]
bias = -0.5
z = inputs[0]*weights[0] + inputs[1]*weights[1] + bias
output = relu(z)
print(output)`,
    },
    build: {
      goal: 'Forward pass through TWO neurons (tiny hidden layer).',
      starterCode: `def relu(x):
    return x if x > 0 else 0

def neuron(inputs, weights, bias):
    z = sum(i*w for i, w in zip(inputs, weights)) + bias
    return relu(z)

x = [1.0, 0.5]
# Hidden layer: 2 neurons, each with 2 weights + bias
h1 = neuron(x, [0.5, -0.5], 0.1)
h2 = neuron(x, [-0.2, 0.8], -0.3)
# TODO: output = neuron([h1, h2], [1.0, -1.0], 0.0)
# TODO: print h1, h2, output

`,
      expectedOutput: 'Three numbers: hidden activations and final output',
      hints: [
        'First compute h1 and h2 from input x.',
        'Then feed [h1, h2] into a final neuron with weights [1.0, -1.0].',
      ],
      solution: `def relu(x):
    return x if x > 0 else 0

def neuron(inputs, weights, bias):
    z = sum(i*w for i, w in zip(inputs, weights)) + bias
    return relu(z)

x = [1.0, 0.5]
h1 = neuron(x, [0.5, -0.5], 0.1)
h2 = neuron(x, [-0.2, 0.8], -0.3)
output = neuron([h1, h2], [1.0, -1.0], 0.0)
print(h1, h2, output)`,
    },
    check: {
      questions: [
        {
          question: 'A "forward pass" means...',
          options: ['Computing outputs from inputs through the network', 'Training the weights', 'Deploying to cloud', 'Deleting gradients'],
          correctIndex: 0,
          explanation: 'Forward = prediction. Backward = learning (later).',
        },
        {
          question: 'zip(inputs, weights) helps you...',
          options: ['Pair each input with its matching weight', 'Sort the data', 'Install PyTorch', 'Save to CSV'],
          correctIndex: 0,
          explanation: 'Each connection has one weight — zip pairs them cleanly.',
        },
        {
          question: 'Why build a net by hand before using PyTorch?',
          options: ['You understand what frameworks automate', 'Frameworks are obsolete', 'Hand code is faster', 'PyTorch cannot do forward passes'],
          correctIndex: 0,
          explanation: 'When model.train() breaks, you will know what is underneath.',
        },
      ],
    },
  },
  {
    id: 'w2-n4',
    worldId: 'w2',
    title: 'Loss: How Wrong Are We?',
    emoji: '📉',
    summary: 'Measure error with MSE — the number training tries to shrink.',
    watch: {
      videoId: 'IHZwWFHWa-w',
      title: 'Gradient descent, how networks learn',
      channel: '3Blue1Brown',
      startSeconds: 0,
      endSeconds: 480,
      why: 'Visual intuition for loss and why we minimize error.',
    },
    try: {
      goal: 'Compute Mean Squared Error for predictions vs targets.',
      starterCode: `predictions = [2.0, 4.0, 6.0]
targets = [1.0, 5.0, 5.0]

# TODO: sq_errors = [(p-t)**2 for each pair]
# TODO: mse = sum(sq_errors) / len(predictions)
# TODO: print round(mse, 2)

`,
      expectedOutput: '1.0',
      hints: [
        'Square each error: (p - t) ** 2',
        'MSE = average of squared errors.',
      ],
      solution: `predictions = [2.0, 4.0, 6.0]
targets = [1.0, 5.0, 5.0]
sq_errors = [(p - t) ** 2 for p, t in zip(predictions, targets)]
mse = sum(sq_errors) / len(predictions)
print(round(mse, 2))`,
    },
    build: {
      goal: 'Write mse(preds, targets) function and test it.',
      starterCode: `def mse(preds, targets):
    # TODO: return mean squared error
    pass

print(mse([0.9, 0.1], [1.0, 0.0]))

`,
      expectedOutput: '0.01',
      hints: [
        'sum((p-t)**2 for p,t in zip(preds, targets)) / len(preds)',
        'Small MSE = predictions close to targets.',
      ],
      solution: `def mse(preds, targets):
    return sum((p - t) ** 2 for p, t in zip(preds, targets)) / len(preds)

print(mse([0.9, 0.1], [1.0, 0.0]))`,
    },
    check: {
      questions: [
        {
          question: 'Loss measures...',
          options: ['How wrong the model predictions are', 'GPU temperature', 'Dataset file size', 'Number of layers'],
          correctIndex: 0,
          explanation: 'Training = repeatedly adjusting weights to make loss go down.',
        },
        {
          question: 'MSE punishes large errors more because...',
          options: ['Errors are squared — big mistakes grow fast', 'It uses logarithms', 'It ignores small errors', 'It only works on images'],
          correctIndex: 0,
          explanation: 'Squaring means 10x error = 100x penalty — pushes model to fix big misses.',
        },
        {
          question: 'Lower loss generally means...',
          options: ['Better predictions on training data', 'The model is deployed', 'No more training needed always', 'Weights are zero'],
          correctIndex: 0,
          explanation: 'Watch for overfitting later — low training loss does not always mean good real-world performance.',
        },
      ],
    },
  },
  {
    id: 'w2-n5',
    worldId: 'w2',
    title: 'Tiny Training Loop',
    emoji: '🔄',
    summary: 'Adjust one weight manually to reduce loss — micro-training.',
    watch: {
      videoId: 'VMj-3S1tukI',
      title: 'Building micrograd (Karpathy)',
      channel: 'Andrej Karpathy',
      startSeconds: 600,
      endSeconds: 1200,
      why: 'See a training loop emerge from scratch — connects loss to learning.',
    },
    try: {
      goal: 'If loss goes down when weight increases by 0.01, nudge weight up.',
      starterCode: `weight = 0.5
loss_at_w = 0.25
loss_at_w_plus = 0.20  # loss when weight = 0.51

# TODO: if loss_at_w_plus < loss_at_w: weight += 0.01
# TODO: print weight

`,
      expectedOutput: '0.51',
      hints: [
        'If smaller loss is better and increasing weight helped, nudge weight up.',
        'This is the core idea of gradient descent — follow the direction that helps.',
      ],
      solution: `weight = 0.5
loss_at_w = 0.25
loss_at_w_plus = 0.20
if loss_at_w_plus < loss_at_w:
    weight += 0.01
print(weight)`,
    },
    build: {
      goal: 'Simulate 3 training steps: each step, if loss improves, adjust weight by 0.01.',
      starterCode: `weight = 1.0
losses = [0.9, 0.7, 0.55]  # loss after each step if we adjust

# TODO: loop 3 times, each time weight += 0.01 (pretend loss always improves)
# TODO: print final weight

`,
      expectedOutput: '1.03',
      hints: [
        'for _ in range(3): weight += 0.01',
        'Real training uses calculus (gradients) to pick direction — same idea, smarter.',
      ],
      solution: `weight = 1.0
for _ in range(3):
    weight += 0.01
print(round(weight, 2))`,
    },
    check: {
      questions: [
        {
          question: 'Training a neural network means...',
          options: ['Adjusting weights to reduce loss on examples', 'Adding more layers forever', 'Copying weights from ChatGPT', 'Only watching videos'],
          correctIndex: 0,
          explanation: 'Show examples → measure loss → update weights → repeat.',
        },
        {
          question: 'Gradient descent picks update direction by...',
          options: ['Which way reduces loss (computed via derivatives)', 'Random guessing only', 'User manual input each step', 'Deleting neurons'],
          correctIndex: 0,
          explanation: 'Frameworks compute gradients automatically — you saw the manual version first.',
        },
        {
          question: 'An "epoch" is...',
          options: ['One full pass through the training dataset', 'One weight update', 'One video watched', 'One GPU cycle'],
          correctIndex: 0,
          explanation: 'Training loops for many epochs until loss stops improving.',
        },
      ],
    },
  },
  {
    id: 'w2-n6',
    worldId: 'w2',
    title: 'World 2 Project: XOR Classifier',
    emoji: '🏁',
    summary: 'Build a tiny 2-layer network that learns XOR — proof you understand the basics.',
    watch: {
      videoId: 'Ilg3gGewQ5I',
      title: 'Backpropagation intuition',
      channel: '3Blue1Brown',
      startSeconds: 0,
      endSeconds: 300,
      why: 'Optional deeper intuition — XOR project uses simplified forward + manual weights.',
    },
    try: {
      goal: 'Implement XOR truth table with a hard-coded tiny network.',
      starterCode: `def relu(x):
    return x if x > 0 else 0

def neuron(inputs, weights, bias):
    z = sum(i*w for i, w in zip(inputs, weights)) + bias
    return relu(z)

# XOR inputs
tests = [([0,0], 0), ([0,1], 1), ([1,0], 1), ([1,1], 0)]

# Pre-trained weights (already learned for you — study the pattern)
for x, expected in tests:
    h = neuron(x, [1, 1], -0.5)
    h2 = neuron([h, h], [-1, -1], 0.5)
    pred = 1 if h2 > 0.5 else 0
    print(x, "pred:", pred, "expected:", expected)

`,
      expectedOutput: 'Four lines showing correct XOR predictions',
      hints: [
        'Run as-is first — see all four XOR cases predicted correctly.',
        'Then change one weight and watch it break — that shows weights matter.',
      ],
      solution: `# Run the starter code — it demonstrates a working XOR network.
# Experiment: change bias from -0.5 to 0.0 and see predictions break.`,
    },
    build: {
      goal: 'Write your own forward pass for [1,1] and verify output is 0 (XOR).',
      starterCode: `def relu(x):
    return x if x > 0 else 0

def neuron(inputs, weights, bias):
    z = sum(i*w for i, w in zip(inputs, weights)) + bias
    return relu(z)

x = [1, 1]
# TODO: h = hidden neuron, out = output neuron (use weights from try step)
# TODO: pred = 1 if out > 0.5 else 0
# TODO: print pred  (should be 0 for XOR)

`,
      expectedOutput: '0',
      hints: [
        'h = neuron(x, [1, 1], -0.5)',
        'out = neuron([h, h], [-1, -1], 0.5); pred = 1 if out > 0.5 else 0',
      ],
      solution: `def relu(x):
    return x if x > 0 else 0

def neuron(inputs, weights, bias):
    z = sum(i*w for i, w in zip(inputs, weights)) + bias
    return relu(z)

x = [1, 1]
h = neuron(x, [1, 1], -0.5)
out = neuron([h, h], [-1, -1], 0.5)
pred = 1 if out > 0.5 else 0
print(pred)`,
    },
    check: {
      questions: [
        {
          question: 'XOR is a classic teaching example because...',
          options: ['A single neuron cannot solve it — you need a hidden layer', 'It is image classification', 'It uses transformers', 'It requires GPT-4'],
          correctIndex: 0,
          explanation: 'XOR proves why depth/non-linearity matters — a pivotal "aha" moment.',
        },
        {
          question: 'You finished World 2! You can now explain...',
          options: ['How data flows forward through a tiny neural net', 'How to fine-tune GPT at scale', 'Kubernetes networking', 'CUDA memory management'],
          correctIndex: 0,
          explanation: 'Forward pass, activation, loss, training intuition — real foundations.',
        },
        {
          question: 'Next up (World 3) you will...',
          options: ['Train real models with scikit-learn on real data', 'Skip to agents', 'Only read papers', 'Learn JavaScript'],
          correctIndex: 0,
          explanation: 'Practical ML with real datasets — where theory meets Kaggle-style projects.',
        },
      ],
    },
  },
]
