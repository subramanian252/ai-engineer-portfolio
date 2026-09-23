export type Project = {
  id: string;
  title: string;
  category: string;
  summary: string;
  status: "coming-soon" | "completed";
  tags: string[];
  visual: "chat" | "travel" | "writer";
  image?: string;
  repositoryUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
};

export type PortfolioProfile = {
  name: string;
  role: string;
  introduction: string;
  about: string;
  focusAreas: string[];
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  fiverrUrl?: string;
  resumeUrl?: string;
};

export type DirectoryProject = {
  id: string;
  title: string;
  category: string;
  summary: string;
  image: string;
  imageAlt: string;
  repositoryUrl: string;
  demoUrl: string;
  tags: string[];
  pipeline: [string, string, string];
  proof: string;
  note: string;
};

// Public profile details. Empty optional links stay hidden.
export const profile: PortfolioProfile = {
  name: "Subramanian M",
  role: "AI Engineer",
  introduction:
    "I’m Subramanian, an AI engineer in Coimbatore, India. I build RAG systems, AI agents and the backends that turn language models into useful products.",
  about:
    "My career started in 2020 with video editing and color grading for international clients. In 2022, curiosity pulled me toward Python and full-stack development, then machine learning and AI. Today, I bring that same attention to detail to retrieval systems, stateful agents and production backends.",
  focusAreas: [
    "RAG & retrieval",
    "Agents & orchestration",
    "Backend & deployment",
  ],
  email: "suryasubramanian252@gmail.com",
  githubUrl: "https://github.com/subramanian252",
  linkedinUrl: "https://www.linkedin.com/in/subramanian-m-9aa117227/",
  fiverrUrl: "https://www.fiverr.com/subramanian007",
  resumeUrl: "/subramanian-resume.pdf",
};

// Add another record here to add a project. Nothing else needs to change.
export const projects: Project[] = [
  {
    id: "full-llm-chat",
    title: "LazyChat",
    category: "STATEFUL LLM AGENT",
    summary:
      "A stateful agent workspace with document RAG, model selection, visible tool calls, human approval and honest usage tracking.",
    status: "completed",
    tags: ["RAG", "LangGraph", "FastAPI", "Tool calling"],
    visual: "chat",
    repositoryUrl: "https://github.com/subramanian252/full-rag-chatbot",
    caseStudyUrl: "/projects/lazychat",
  },
  {
    id: "travel-planner",
    title: "LazyPlan",
    category: "DEPLOYED MULTI-AGENT TRAVEL PLANNER",
    summary:
      "A live travel crew with selective agents, streamed progress, human approval and a production path through AWS ECS.",
    status: "completed",
    tags: ["LangGraph", "HITL", "MCP", "AWS ECS"],
    visual: "travel",
    repositoryUrl: "https://github.com/subramanian252/travel_agent",
    caseStudyUrl: "/projects/lazyplan",
    demoUrl:
      "http://travel-agent-lb-1346259227.eu-north-1.elb.amazonaws.com/",
  },
  {
    id: "agentic-writer",
    title: "LazyWriter",
    category: "AGENTIC WORKFLOWS",
    summary:
      "A research-aware writing graph with structured plans, parallel section workers, generated diagrams and downloadable Markdown.",
    status: "completed",
    tags: ["LangGraph", "Tavily", "Parallel agents", "Images"],
    visual: "writer",
    repositoryUrl: "https://github.com/subramanian252/ai-agent-writer",
    demoUrl: "https://ai-agent-writer.vercel.app/",
    caseStudyUrl: "/projects/lazywriter",
  },
];

export const projectDirectory: DirectoryProject[] = [
  {
    id: "agentic-rag",
    title: "Agentic RAG",
    category: "THREE-WAY RETRIEVAL ROUTER",
    summary:
      "A question router that chooses a Pinecone knowledge base, live web search or a direct answer, then grades weak evidence before it reaches the final response.",
    image: "/projects/agentic-rag.webp",
    imageAlt:
      "Cartoon railway switch routing a question toward a library, web telescope or direct answer lightbulb",
    repositoryUrl: "https://github.com/subramanian252/agentic-rag",
    demoUrl: "https://agentic-rag-two-rouge.vercel.app/",
    tags: ["LangGraph", "Pinecone", "Tavily", "OpenRouter"],
    pipeline: ["Route", "Grade evidence", "Rewrite or answer"],
    proof: "Pinecone docs · web search · direct path",
    note: "One question. Three doors. The router has the keys.",
  },
  {
    id: "self-rag",
    title: "Self-RAG",
    category: "SELF-CHECKING BOOKISH ASSISTANT",
    summary:
      "A document-grounded assistant that studies two machine-learning books, filters irrelevant chunks and revises answers that are unsupported or not useful enough.",
    image: "/projects/self-rag.webp",
    imageAlt:
      "Cartoon pencil inspector checking evidence pages through a looping self-review ribbon",
    repositoryUrl: "https://github.com/subramanian252/self-rag",
    demoUrl: "https://self-rag-ashy.vercel.app/",
    tags: ["LangGraph", "FAISS", "Self grading", "OpenRouter"],
    pipeline: ["Retrieve books", "Check support", "Revise if needed"],
    proof: "Two ML books · relevance and support checks",
    note: "It checks its homework before raising its hand.",
  },
  {
    id: "corrective-rag",
    title: "Corrective RAG",
    category: "EVIDENCE REPAIR WORKFLOW",
    summary:
      "A corrective retrieval graph that grades FAISS results, rewrites weak questions, brings in Tavily evidence and filters useful sentences before answering.",
    image: "/projects/corrective-rag.webp",
    imageAlt:
      "Cartoon proofreader routing weak evidence through web research and a filtering sieve",
    repositoryUrl: "https://github.com/subramanian252/corrective-rag",
    demoUrl: "https://corrective-rag-kappa.vercel.app/",
    tags: ["LangGraph", "FAISS", "Tavily", "Corrective RAG"],
    pipeline: ["Grade local context", "Repair with web", "Filter and answer"],
    proof: "Local PDF · corrective web path · sentence filter",
    note: "Bad context goes to the repair desk, not the answer box.",
  },
];
