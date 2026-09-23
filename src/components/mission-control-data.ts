export const stations = [
  {
    id: "data",
    input: "Messy rows",
    output: "Validated training data",
    challenge: "Rescue the dataset.",
    name: "Data & preprocessing",
    short: "Data prep",
    tint: "sage",
    label: "01 / GOOD INPUTS, PLEASE",
    title: "First, sort the laundry.",
    description:
      "Validate schemas, remove duplicates and handle missing values before training. Split your data before fitting transforms to avoid leaking information from the test set.",
    joke: "Garbage in. Very confident garbage out.",
    run: "Validating the data: duplicates removed, missing values flagged, splits kept separate.",
    subtitle: "Clean & validate",
    substeps: ["Validate", "Split"],
  },
  {
    id: "model",
    input: "Examples & context",
    output: "Evaluated predictions",
    challenge: "Teach it. Then check its homework.",
    name: "Models & training",
    tint: "lilac",
    label: "02 / LEARN. ATTEND. ADAPT.",
    title: "One model. A few ways to teach it.",
    description:
      "Learn patterns with machine learning, build context with transformer attention, or adapt an LLM with fine-tuning. Compare training and validation performance before putting a model to work.",
    joke: "Memorizing the exam is still cheating.",
    run: "Preparing a model: evaluate its predictions, represent context and load an optional task adapter.",
    short: "Model",
    subtitle: "Learn & adapt",
    substeps: ["Evaluate", "Adapt"],
  },
  {
    id: "rag",
    input: "A question & documents",
    output: "An answer with evidence",
    challenge: "Give the answer a paper trail.",
    name: "RAG",
    short: "RAG",
    tint: "sage",
    label: "03 / BRING THE RECEIPTS",
    title: "Open-book answers.",
    description:
      "At indexing time, documents become chunks and embeddings. At query time, retrieve relevant chunks and pass that evidence to an LLM. RAG supplies context; it does not retrain the model or guarantee a correct answer.",
    joke: "The model is allowed to look at its notes.",
    run: "Retrieving relevant document chunks and adding source evidence to the model's context.",
    subtitle: "Find evidence",
    substeps: ["Index", "Retrieve"],
  },
  {
    id: "agents",
    input: "A task & allowed tools",
    output: "A checked action with a result",
    challenge: "Pick the right tool. Check the permission.",
    name: "AI agents, tools & guardrails",
    short: "Agents",
    tint: "peach",
    label: "04 / THINK. CHECK. ACT.",
    title: "Sometimes the right answer is a tool.",
    description:
      "An agent selects an allowed tool, supplies structured arguments and reads the result. The application checks permissions, budgets and approvals at every boundary before an action is allowed.",
    joke: "Four tools. One extremely small security supervisor.",
    run: "Selecting an allowed tool, validating its arguments and checking permissions before returning the result.",
    subtitle: "Tools & safety",
    substeps: ["Call tools", "Check access"],
  },
  {
    id: "api",
    input: "An application request",
    output: "A structured response",
    challenge: "Deliver an answer. Reject the chaos.",
    name: "Backend APIs",
    short: "API",
    tint: "lilac",
    label: "05 / MAKE IT USABLE",
    title: "An idea needs a front door.",
    description:
      "Backend APIs validate requests, authenticate callers and expose model workflows to applications. Timeouts, streaming, rate limits and structured errors make that interface reliable.",
    joke: "A 200 response. A small moment of inner peace.",
    run: "Returning a validated API response with an answer, source and request identifier.",
    subtitle: "Serve answers",
    substeps: ["Validate", "Respond"],
  },
  {
    id: "mlops",
    input: "Code, a model & live signals",
    output: "A versioned, watched service",
    challenge: "Ship it safely. Then keep watch.",
    name: "Deployment & observability",
    short: "Deploy",
    tint: "sage",
    label: "06 / SHIP IT. WATCH IT.",
    title: "Works on my machine. Watched on yours.",
    description:
      "Docker packages the runtime and CI checks it before delivery. Version releases, keep a rollback path, then watch latency, errors, traces, answer quality and cost once the service is live.",
    joke: "Ship the model. Keep the graphs and cloud bill calm.",
    run: "Rolling out a tested service, then recording latency, errors, quality signals and cost.",
    subtitle: "Ship & observe",
    substeps: ["Deploy", "Monitor"],
  },
] as const;

// The drawings and experiment modules retain the two absorbed concepts so they
// can be reused independently, while the guided route stays at six stages.
export type StationId =
  (typeof stations)[number]["id"] | "guardrails" | "monitoring";
export type RunState = {
  status: "idle" | "running" | "paused" | "complete";
  step: number;
};
export type RunAction = {
  type: "start" | "tick" | "pause" | "resume" | "reset";
};
export const initialRun: RunState = { status: "idle", step: 0 };

// This is a guided tour of the lifecycle, not a live deployment or inference trace.
export function runReducer(state: RunState, action: RunAction): RunState {
  switch (action.type) {
    case "start":
      return { status: "running", step: 0 };
    case "tick":
      if (state.status !== "running") return state;
      return state.step === stations.length - 1
        ? { status: "complete", step: state.step }
        : { ...state, step: state.step + 1 };
    case "pause":
      return state.status === "running"
        ? { ...state, status: "paused" }
        : state;
    case "resume":
      return state.status === "paused"
        ? { ...state, status: "running" }
        : state;
    case "reset":
      return initialRun;
  }
}
