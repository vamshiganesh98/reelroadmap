import type { NodeContent } from '../types/content'

export const world3Nodes: NodeContent[] = [
  {
    id: 'w3-n1',
    worldId: 'w3',
    title: 'Load a Real Dataset',
    emoji: '📂',
    summary: 'Pull a classic ML dataset into Python — the same first step every sklearn project takes.',
    watch: {
      videoId: '0B5eIE_1vpU',
      title: 'Scikit-learn Crash Course',
      channel: 'Corey Schafer',
      startSeconds: 180,
      endSeconds: 480,
      why: 'Corey shows how sklearn loads built-in datasets — the same pattern works for Iris and beyond.',
    },
    try: {
      goal: 'Load the Iris dataset and print how many samples and features it has.',
      starterCode: `from sklearn.datasets import load_iris

# TODO: data = load_iris()
# TODO: print data.data.shape  (rows, columns)

`,
      expectedOutput: '(150, 4)',
      hints: [
        'load_iris() returns a Bunch object with .data (features) and .target (labels).',
        '.shape on a NumPy array gives (rows, columns) — 150 flowers, 4 measurements.',
      ],
      solution: `from sklearn.datasets import load_iris

data = load_iris()
print(data.data.shape)`,
    },
    build: {
      goal: 'Load Iris into X and y, then print the first feature name and first label.',
      starterCode: `from sklearn.datasets import load_iris

# TODO: X, y = load_iris(return_X_y=True)
# TODO: data = load_iris()  (for feature names)
# TODO: print first feature name and y[0]

`,
      expectedOutput: 'sepal length (cm) and 0',
      hints: [
        'return_X_y=True gives features and labels as separate arrays.',
        'data.feature_names[0] for the first column name.',
      ],
      solution: `from sklearn.datasets import load_iris

X, y = load_iris(return_X_y=True)
data = load_iris()
print(data.feature_names[0])
print(y[0])`,
    },
    check: {
      questions: [
        {
          question: 'What does load_iris() give you?',
          options: ['A ready-made dataset with features and labels', 'A trained neural network', 'A YouTube video ID', 'A GPU driver'],
          correctIndex: 0,
          explanation: 'sklearn ships toy datasets so you can practice ML without hunting for files.',
        },
        {
          question: 'In supervised learning, X usually means...',
          options: ['Input features (measurements)', 'The model name', 'The learning rate', 'Random noise only'],
          correctIndex: 0,
          explanation: 'X = what the model sees. y = what you want it to predict.',
        },
        {
          question: 'Why start with Iris before spam or image data?',
          options: ['Small, clean, and famous — perfect for learning the workflow', 'Iris is the only dataset sklearn has', 'Real AI projects never use CSV files', 'Pandas cannot load other data'],
          correctIndex: 0,
          explanation: 'Master the pipeline on simple data, then swap in your own dataset.',
        },
        {
          question: 'return_X_y=True is handy because...',
          options: ['It splits features and labels in one line', 'It trains the model automatically', 'It deletes missing values', 'It connects to OpenAI'],
          correctIndex: 0,
          explanation: 'Less typing — you get X and y arrays ready for train_test_split.',
        },
      ],
    },
  },
  {
    id: 'w3-n2',
    worldId: 'w3',
    title: 'Train/Test Split',
    emoji: '✂️',
    summary: 'Hold out unseen data so you know if your model actually learned — not just memorized.',
    watch: {
      videoId: 'fwY9Qv96DJY',
      title: 'Training and Testing Data',
      channel: 'Corey Schafer',
      why: 'Corey walks through train_test_split in plain Python — the rule every ML engineer follows.',
    },
    try: {
      goal: 'Split Iris 80/20 and print the training set size.',
      starterCode: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)

# TODO: X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.2, random_state=42)
# TODO: print len(X_train)

`,
      expectedOutput: '120',
      hints: [
        'test_size=0.2 means 20% for testing, 80% for training.',
        'random_state=42 keeps the split the same every run — great for debugging.',
      ],
      solution: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)
print(len(X_train))`,
    },
    build: {
      goal: 'Split data and print both train and test counts — like sizing batches for an AI eval run.',
      starterCode: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)

# TODO: split with test_size=0.25, random_state=7
# TODO: print "train:" and len(X_train), then "test:" and len(X_test)

`,
      expectedOutput: 'train: 112 and test: 38 (approximately)',
      hints: [
        '25% test → 75% train. 150 * 0.75 = 112.5 → 112 train samples.',
        'Use two print() calls or one f-string with both numbers.',
      ],
      solution: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=7)
print("train:", len(X_train))
print("test:", len(X_test))`,
    },
    check: {
      questions: [
        {
          question: 'Why do we split data before training?',
          options: ['To test on examples the model never saw during training', 'To make the dataset smaller for fun', 'Because sklearn requires exactly 50/50', 'To avoid using NumPy'],
          correctIndex: 0,
          explanation: 'Training accuracy can lie. Test accuracy tells you about real-world performance.',
        },
        {
          question: 'What does random_state do?',
          options: ['Makes the random split reproducible', 'Speeds up the GPU', 'Picks the best model', 'Encrypts your data'],
          correctIndex: 0,
          explanation: 'Same seed → same split. Your teammate gets the same numbers.',
        },
        {
          question: 'If test_size=0.2 on 150 samples, about how many test rows?',
          options: ['30', '120', '150', '2'],
          correctIndex: 0,
          explanation: '20% of 150 = 30 held out for honest evaluation.',
        },
        {
          question: 'Training on the test set is bad because...',
          options: ['You cannot measure generalization — it is like grading your own homework with the answer key', 'Python will crash', 'It uses too much RAM', 'sklearn bans it'],
          correctIndex: 0,
          explanation: 'Never tune or train on test data. That is called data leakage.',
        },
      ],
    },
  },
  {
    id: 'w3-n3',
    worldId: 'w3',
    title: 'Your First Model',
    emoji: '🎯',
    summary: 'Fit a classifier in three lines — predict flower species like a tiny image-labeling model.',
    watch: {
      videoId: 'yIYKR4sgzI8',
      title: 'Logistic Regression',
      channel: 'StatQuest',
      startSeconds: 0,
      endSeconds: 600,
      why: 'Josh explains classification intuition first — then sklearn makes it one line of code.',
    },
    try: {
      goal: 'Train LogisticRegression on Iris and print test accuracy.',
      starterCode: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# TODO: model = LogisticRegression(max_iter=200)
# TODO: model.fit(X_train, y_train)
# TODO: print round(model.score(X_test, y_test), 2)

`,
      expectedOutput: '1.0 or 0.97 (high accuracy on Iris)',
      hints: [
        'fit(X_train, y_train) teaches the model from training data.',
        'score(X_test, y_test) returns accuracy — fraction of correct predictions.',
      ],
      solution: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)
print(round(model.score(X_test, y_test), 2))`,
    },
    build: {
      goal: 'Try RandomForestClassifier instead — a classic ensemble model used in many AI pipelines.',
      starterCode: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# TODO: clf = RandomForestClassifier(random_state=42)
# TODO: fit and print test accuracy (round to 2 decimals)

`,
      expectedOutput: '1.0 or high accuracy (e.g. 0.97)',
      hints: [
        'RandomForest API matches LogisticRegression: fit, then score.',
        'random_state=42 on the forest keeps results stable for this exercise.',
      ],
      solution: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)
clf = RandomForestClassifier(random_state=42)
clf.fit(X_train, y_train)
print(round(clf.score(X_test, y_test), 2))`,
    },
    check: {
      questions: [
        {
          question: 'What does model.fit(X_train, y_train) do?',
          options: ['Learns patterns from labeled training examples', 'Downloads weights from the cloud', 'Splits the data again', 'Prints a confusion matrix'],
          correctIndex: 0,
          explanation: 'fit = training phase. The model adjusts to map features → labels.',
        },
        {
          question: 'LogisticRegression is mainly used for...',
          options: ['Classification (predicting categories)', 'Generating images', 'Sorting files on disk', 'Compiling Python'],
          correctIndex: 0,
          explanation: 'Despite the name, it predicts classes — spam vs not spam, species A vs B.',
        },
        {
          question: 'model.score() on test data returns...',
          options: ['Accuracy — fraction of correct predictions', 'The learning rate', 'Number of trees', 'GPU temperature'],
          correctIndex: 0,
          explanation: 'For classifiers, score defaults to accuracy. You will dig deeper in the next node.',
        },
        {
          question: 'RandomForest is popular because...',
          options: ['It combines many decision trees for strong out-of-the-box performance', 'It replaces all deep learning', 'It only works on text', 'It needs no data'],
          correctIndex: 0,
          explanation: 'Ensembles are a workhorse in tabular ML — fast to try, often hard to beat.',
        },
      ],
    },
  },
  {
    id: 'w3-n4',
    worldId: 'w3',
    title: 'Metrics That Matter',
    emoji: '📏',
    summary: 'Accuracy alone can fool you — learn precision and recall for imbalanced AI tasks.',
    watch: {
      videoId: 'Kdsp6soqA7o',
      title: 'The Confusion Matrix',
      channel: 'StatQuest',
      why: 'Josh builds the confusion matrix from scratch — the foundation for accuracy, precision, and recall.',
    },
    try: {
      goal: 'Train a model and print accuracy, precision, and recall (macro average).',
      starterCode: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)
pred = model.predict(X_test)

# TODO: print accuracy_score(y_test, pred)
# TODO: print precision_score(y_test, pred, average="macro")
# TODO: print recall_score(y_test, pred, average="macro")

`,
      expectedOutput: 'Three numbers near 1.0 on Iris',
      hints: [
        'accuracy_score(y_true, y_pred) — overall correct fraction.',
        'For 3-class Iris, use average="macro" for precision and recall.',
      ],
      solution: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)
pred = model.predict(X_test)
print(round(accuracy_score(y_test, pred), 2))
print(round(precision_score(y_test, pred, average="macro"), 2))
print(round(recall_score(y_test, pred, average="macro"), 2))`,
    },
    build: {
      goal: 'Simulate a spam detector: 90% ham, 10% spam — see why accuracy misleads.',
      starterCode: `from sklearn.metrics import accuracy_score, precision_score, recall_score

# True labels: 9 ham (0), 1 spam (1)
y_true = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
# Lazy model: always predicts ham
y_pred = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

# TODO: print accuracy, precision, recall (zero_division=0 for precision/recall)

`,
      expectedOutput: 'accuracy 0.9 but precision/recall 0.0 for spam',
      hints: [
        'accuracy_score(y_true, y_pred) will look great at 0.9.',
        'precision_score(..., zero_division=0) avoids errors when no spam was predicted.',
        'The model caught zero spam — recall for the spam class is 0.',
      ],
      solution: `from sklearn.metrics import accuracy_score, precision_score, recall_score

y_true = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
y_pred = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
print("accuracy:", accuracy_score(y_true, y_pred))
print("precision:", precision_score(y_true, y_pred, zero_division=0))
print("recall:", recall_score(y_true, y_pred, zero_division=0))`,
    },
    check: {
      questions: [
        {
          question: 'Accuracy is...',
          options: ['Correct predictions / total predictions', 'Only true positives', 'The learning rate', 'Training time in seconds'],
          correctIndex: 0,
          explanation: 'Simple and useful — but dangerous when classes are imbalanced.',
        },
        {
          question: 'Precision answers: "Of what we predicted positive, how many were right?"',
          options: ['True', 'False — that is recall', 'False — that is accuracy', 'Only for regression'],
          correctIndex: 0,
          explanation: 'High precision = few false alarms. Important when false positives are costly.',
        },
        {
          question: 'Recall answers: "Of all actual positives, how many did we catch?"',
          options: ['True', 'False — that is precision', 'False — that is F1 only', 'Only for unsupervised learning'],
          correctIndex: 0,
          explanation: 'High recall = you miss fewer real cases. Critical for fraud or disease detection.',
        },
        {
          question: 'A model that always predicts "not spam" on imbalanced mail can have...',
          options: ['High accuracy but useless recall for spam', 'Perfect precision and recall', 'No confusion matrix', 'Better GPU usage'],
          correctIndex: 0,
          explanation: 'This is why AI teams report multiple metrics — not just accuracy.',
        },
      ],
    },
  },
  {
    id: 'w3-n5',
    worldId: 'w3',
    title: 'World 3 Project: Classifier',
    emoji: '🏁',
    summary: 'End-to-end: load data, split, train, evaluate — your first complete sklearn classifier.',
    watch: {
      videoId: 'pqNCD_5r0IU',
      title: 'Machine Learning with Scikit-Learn',
      channel: 'freeCodeCamp',
      startSeconds: 3600,
      endSeconds: 4200,
      why: 'Optional full-course context — jump to where classification and evaluation come together.',
    },
    try: {
      goal: 'Run the full pipeline: load → split → train RandomForest → print accuracy.',
      starterCode: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# TODO: load X, y from Iris
# TODO: split 80/20 with random_state=42
# TODO: train RandomForestClassifier(random_state=42)
# TODO: predict on X_test and print accuracy rounded to 2 decimals

`,
      expectedOutput: '0.97 or 1.0',
      hints: [
        'Chain the steps you practiced in nodes 1–4.',
        'accuracy_score(y_test, predictions) or clf.score(X_test, y_test) both work.',
      ],
      solution: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)
clf = RandomForestClassifier(random_state=42)
clf.fit(X_train, y_train)
pred = clf.predict(X_test)
print(round(accuracy_score(y_test, pred), 2))`,
    },
    build: {
      goal: 'Full mini-project: train a classifier and print a 4-line report (accuracy, precision, recall, samples).',
      starterCode: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# TODO: train RandomForestClassifier(random_state=42)
# TODO: get predictions on X_test
# TODO: print four lines:
#   Accuracy: ...
#   Precision (macro): ...
#   Recall (macro): ...
#   Test samples: ...

`,
      expectedOutput: 'Four-line metrics report',
      hints: [
        'Use round(..., 2) for clean metric lines.',
        'len(X_test) gives the number of test samples.',
        'average="macro" for precision and recall on multi-class Iris.',
      ],
      solution: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)
clf = RandomForestClassifier(random_state=42)
clf.fit(X_train, y_train)
pred = clf.predict(X_test)
print("Accuracy:", round(accuracy_score(y_test, pred), 2))
print("Precision (macro):", round(precision_score(y_test, pred, average="macro"), 2))
print("Recall (macro):", round(recall_score(y_test, pred, average="macro"), 2))
print("Test samples:", len(X_test))`,
    },
    check: {
      questions: [
        {
          question: 'You finished World 3! What is the sklearn workflow order?',
          options: ['Load → split → fit → evaluate', 'Evaluate → fit → split → load', 'fit → load only', 'Deploy → forget training'],
          correctIndex: 0,
          explanation: 'This pipeline repeats for every tabular ML project you will build.',
        },
        {
          question: 'What should you do after this world?',
          options: ['Run the full classifier project, then try your own CSV in World 4+', 'Memorize every sklearn class', 'Skip evaluation forever', 'Only watch videos'],
          correctIndex: 0,
          explanation: 'Swap Iris for your own data — same steps, new problem.',
        },
        {
          question: 'Why report precision AND recall on a project?',
          options: ['They tell different failure stories — together they beat accuracy alone', 'sklearn requires both to run', 'They replace train_test_split', 'They are the same number always'],
          correctIndex: 0,
          explanation: 'Stakeholders care about different mistakes. Good engineers show both.',
        },
        {
          question: 'random_state in split AND model helps because...',
          options: ['Results are reproducible for debugging and demos', 'It guarantees 100% accuracy', 'It removes the need for a test set', 'It trains faster on GPU'],
          correctIndex: 0,
          explanation: 'Reproducibility is professional habit — your portfolio projects should be rerunnable.',
        },
      ],
    },
  },
]
