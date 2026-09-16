export const stations = [
  {
    id: "data",
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
  },
  {
    id: "model",
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
  },
  {
    id: "rag",
    name: "RAG",
    short: "RAG",
    tint: "sage",
    label: "03 / BRING THE RECEIPTS",
    title: "Open-book answers.",
    description:
      "At indexing time, documents become chunks and embeddings. At query time, retrieve relevant chunks and pass that evidence to an LLM. RAG supplies context; it does not retrain the model or guarantee a correct answer.",
    joke: "The model is allowed to look at its notes.",
    run: "Retrieving relevant document chunks and adding source evidence to the model’s context.",
    subtitle: "Find evidence",
  },
  {
    id: "agents",
    name: "AI agents & tool calling",
    short: "Agents",
    tint: "peach",
    label: "04 / THINK. CALL. OBSERVE.",
    title: "Sometimes the right answer is a tool.",
    description:
      "An agent selects an allowed tool, supplies structured arguments, reads the result and decides what comes next. The application enforces permissions, budgets and approvals for sensitive actions.",
    joke: "Four tools. One extremely small supervisor.",
    run: "Selecting an allowed tool, checking its arguments and returning its result to the model.",
    subtitle: "Choose tools",
  },
  {
    id: "guardrails",
    name: "Security & guardrails",
    short: "Guardrails",
    tint: "yellow",
    label: "05 / TRUST HAS BOUNDARIES",
    title: "A helpful assistant. A locked door.",
    description:
      "Apply authorization, least-privilege tools, input validation and output checks at every boundary. Treat retrieved content as untrusted. A prompt alone is not a security boundary; use layered defenses and evaluations.",
    joke: "“Ignore all rules” is not an admin password.",
    run: "Checking tool permissions and filtering sensitive output. These checks also belong at input and retrieval boundaries.",
    subtitle: "Check access",
  },
  {
    id: "api",
    name: "Backend APIs",
    short: "API",
    tint: "lilac",
    label: "06 / MAKE IT USABLE",
    title: "An idea needs a front door.",
    description:
      "Backend APIs validate requests, authenticate callers and expose model workflows to applications. Timeouts, streaming, rate limits and structured errors make that interface reliable.",
    joke: "A 200 response. A small moment of inner peace.",
    run: "Returning a validated API response with an answer, source and request identifier.",
    subtitle: "Serve answers",
  },
  {
    id: "mlops",
    name: "MLOps / Docker / Kubernetes / CI/CD",
    short: "Deploy",
    tint: "sage",
    label: "07 / SHIP IT. SAFELY.",
    title: "Works on my machine. Now yours, too.",
    description:
      "Docker packages the runtime. CI runs tests before delivery; Kubernetes can schedule and scale containers. Version models and data, watch rollouts and keep a rollback path. Small systems may not need a cluster.",
    joke: "The pipeline has one job. Today it has feelings.",
    run: "Simulating a tested container rollout. In a real system deployment precedes serving user traffic.",
    subtitle: "Release safely",
  },
  {
    id: "monitoring",
    name: "Monitoring & observability",
    short: "Monitor",
    tint: "peach",
    label: "08 / KEEP AN EYE ON IT",
    title: "The graph is trying to tell you something.",
    description:
      "Track latency, token usage, errors, traces and answer quality. Alert on meaningful changes and monitor cost. A cache can reduce repeated work, but fresh answers and access controls still matter.",
    joke: "The only hallucination we fear: the cloud invoice.",
    run: "Recording latency, token usage, errors and cost. The system is running; the watch continues.",
    subtitle: "Watch & improve",
  },
] as const;

export type StationId = (typeof stations)[number]["id"];
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
