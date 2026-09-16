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
    title: "Full LLM Chat",
    category: "CONVERSATIONAL AI",
    summary:
      "A space for better conversations. Exploring a complete chat experience powered by large language models.",
    status: "coming-soon",
    tags: ["Language models", "Chat experience"],
    visual: "chat",
  },
  {
    id: "travel-planner",
    title: "Travel Planner",
    category: "AI-POWERED EXPLORATION",
    summary:
      "Less planning. More possibility. An intelligent approach to turning travel ideas into personal itineraries.",
    status: "coming-soon",
    tags: ["Personalization", "Trip planning"],
    visual: "travel",
  },
  {
    id: "agentic-writer",
    title: "Agentic Writer",
    category: "AGENTIC WORKFLOWS",
    summary:
      "From a blank page to a clearer story. Exploring agents that help ideas find their words.",
    status: "coming-soon",
    tags: ["AI agents", "Writing workflows"],
    visual: "writer",
  },
];
