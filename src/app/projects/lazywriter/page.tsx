import type { Metadata } from "next";
import {
  BookOpenText,
  BrainCircuit,
  FileDown,
  FileImage,
  FileText,
  GitFork,
  Image,
  Layers3,
  ListTree,
  PenTool,
  Search,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import {
  ProjectStoryPage,
  type ProjectStory,
} from "@/components/project-story";
import { getSiteUrl } from "@/lib/site-url";
import styles from "../lazychat/page.module.css";

const repositoryUrl = "https://github.com/subramanian252/ai-agent-writer";
const demoUrl = "https://ai-agent-writer.vercel.app/";
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "LazyWriter — Agentic Technical Writing System",
  description:
    "Inside LazyWriter: research-aware routing, structured plans, parallel section workers, diagram generation and saved Markdown articles.",
  alternates: siteUrl
    ? { canonical: siteUrl + "/projects/lazywriter" }
    : undefined,
  openGraph: {
    type: "article",
    title: "LazyWriter — One topic, a tiny editorial room",
    description:
      "A playful walkthrough of Subramanian’s agentic technical writing system.",
    url: siteUrl ? siteUrl + "/projects/lazywriter" : undefined,
  },
};

const story: ProjectStory = {
  number: "03",
  name: "LazyWriter",
  heroEyebrow: "THE TINY EDITORIAL ROOM",
  headline: "A tiny editorial room that knows when to research.",
  lede:
    "An end-to-end technical writing system that routes each topic, gathers evidence when needed, plans the article, writes sections in parallel and places generated diagrams where they actually help.",
  repositoryUrl,
  demoUrl,
  sourceLabel: "Explore the source",
  futureLabel: "Open LazyWriter",
  futureNote:
    "The public writing desk is live. Give it a topic and watch the editorial crew get to work.",
  consoleLabel: "LAZYWRITER / DRAFT 019",
  consoleStatus: "5 WORKERS WRITING",
  consolePrompt: "Explain how LangGraph coordinates parallel AI agents.",
  drawingLabel: "LazyWriter editorial workflow illustration",
  drawingDescription:
    "A topic card branches into parallel article sections before merging into a document with diagrams.",
  drawing: (
    <>
      <path
        className={styles.route}
        d="M82 224C170 224 174 98 284 98s116 126 185 126 91-97 172-97"
      />
      <path
        className={styles.routeGhost}
        d="M85 284c115 0 105 87 216 87s111-90 190-90 81 65 154 65"
      />
      <g className={styles.documentDrawing}>
        <path d="M52 79h163v112H52z" />
        <text x="78" y="117">TOPIC</text>
        <path d="M79 144h108M79 166h74" />
      </g>
      <g className={styles.botDrawing}>
        <path d="M277 63h169v92H277zM277 179h169v92H277zM277 295h169v92H277z" />
        <path d="M302 91h116M302 113h77M302 207h116M302 229h89M302 323h116M302 345h71" />
      </g>
      <g className={styles.modelTicket}>
        <path d="M505 63h151v91H505z" />
        <text x="523" y="96">IMAGE PLAN</text>
        <text x="523" y="126">diagram → H2</text>
      </g>
      <g className={styles.toolTicket}>
        <path d="M505 281h153v101H505z" />
        <text x="523" y="314">ARTICLE.MD</text>
        <text x="523" y="344">saved + ready</text>
        <text x="523" y="366">↓ download</text>
      </g>
      <g className={styles.sparkDrawing}>
        <path d="M236 205v32m-16-16h32M472 187v30m-15-15h30" />
      </g>
    </>
  ),
  builderNote: (
    <>
      I built the <strong>entire backend</strong>: LangGraph state and routing,
      research, planning, parallel workers, reducers, image generation,
      persistence and FastAPI delivery. The{" "}
      <strong>frontend was built with AI</strong> under my direction and
      connected to the workflow’s real progress and outputs.
    </>
  ),
  builderAside: "The blank page has been politely outnumbered.",
  featureEyebrow: "WHAT LIVES IN THE EDITORIAL ROOM",
  featureTitle: "Six careful decisions before the download button.",
  featureIntro:
    "LazyWriter separates research, planning, writing and illustration so each stage can do one job well.",
  features: [
    {
      icon: BrainCircuit,
      number: "01",
      title: "Research only when needed",
      text: "The router classifies a topic as closed-book, hybrid or open-book instead of searching the web by reflex.",
      note: "Not every paragraph needs a field trip.",
    },
    {
      icon: Search,
      number: "02",
      title: "Queries stay focused",
      text: "Current topics become targeted Tavily searches, then useful evidence is normalized, filtered and deduplicated.",
      note: "Less search confetti. More signal.",
    },
    {
      icon: ListTree,
      number: "03",
      title: "The plan has a schema",
      text: "Every section gets a goal, type, bullet points and word target in a validated structure before drafting begins.",
      note: "Even creativity gets a clipboard.",
    },
    {
      icon: GitFork,
      number: "04",
      title: "Sections write in parallel",
      text: "LangGraph Send fans section tasks to workers; task IDs let the reducer restore the planned order afterward.",
      note: "Many pens. One table of contents.",
    },
    {
      icon: FileImage,
      number: "05",
      title: "Pictures earn their place",
      text: "An image planner reviews the full article, chooses up to three useful diagrams and attaches each to an exact H2.",
      note: "No decorative stock-photo handshake.",
    },
    {
      icon: FileDown,
      number: "06",
      title: "The article leaves with luggage",
      text: "Final Markdown and generated images are saved locally, previewed in the browser and offered as a download.",
      note: "The draft remembers its coat.",
    },
  ],
  flowEyebrow: "ONE TOPIC, SIX STOPS",
  flowTitle: "From blank page to illustrated Markdown.",
  flow: [
    ["Router", "judges freshness"],
    ["Researcher", "collects evidence"],
    ["Planner", "maps sections"],
    ["Workers", "write in parallel"],
    ["Image planner", "places diagrams"],
    ["Saver", "delivers Markdown"],
  ],
  flowCaption:
    "Stable topics can skip research. Current topics gather evidence first. Either path reaches the same structured plan, fans out into section workers and rejoins before image planning and persistence.",
  concepts: [
    {
      eyebrow: "THE PARALLEL WRITING DESK",
      title: "Fan out the work. Keep the article in order.",
      body:
        "The orchestrator creates five to seven typed section tasks. LangGraph Send dispatches them to the same worker node in parallel, while an additive reducer collects task IDs and Markdown so the merge step can restore the intended sequence.",
      tags: ["LangGraph Send", "operator.add", "Structured plans"],
      steps: [
        { icon: ListTree, label: "PLAN" },
        { icon: GitFork, label: "FAN OUT" },
        { icon: PenTool, label: "WORKERS" },
        { icon: Layers3, label: "MERGE" },
      ],
    },
    {
      eyebrow: "THE ILLUSTRATION DESK",
      title: "Diagrams go where the explanation needs them.",
      body:
        "The image planner sees the completed article and its H2 headings. Each requested diagram targets an exact heading; generated files replace placeholders there, while failures become readable Markdown notices instead of breaking the whole article.",
      tags: ["OpenRouter images", "H2-aware placement", "Graceful failure"],
      steps: [
        { icon: BookOpenText, label: "ARTICLE" },
        { icon: Image, label: "IMAGE PLAN" },
        { icon: Sparkles, label: "GENERATE" },
        { icon: FileText, label: "MARKDOWN" },
      ],
    },
  ],
  toolsEyebrow: "THE WRITER’S TOOLBOX",
  toolsTitle: "A workflow built from explicit, inspectable parts.",
  tools: [
    "Python 3.13",
    "FastAPI",
    "LangGraph",
    "LangChain",
    "Pydantic",
    "Tavily",
    "OpenRouter",
    "PostgreSQL",
  ],
  toolsNote:
    "PostgreSQL enables durable checkpoints in production; local development falls back to MemorySaver. Every browser request receives a fresh thread so reducer state cannot leak between articles.",
  backendTitle: "The editorial engine",
  backendText:
    "Routing, evidence handling, structured planning, parallel worker execution, reducer ordering, image placement, persistence and API behavior were built by me.",
  backendItems: [
    "Python + FastAPI",
    "LangGraph + LangChain",
    "Tavily research",
    "OpenRouter image API",
  ],
  frontendTitle: "The writing desk",
  frontendText:
    "The responsive interface was built with AI under my direction, then connected to workflow progress, Markdown preview, generated images, errors and downloads.",
  frontendItems: [
    "Jinja2 templates",
    "HTML + CSS",
    "JavaScript",
    "Markdown preview",
  ],
  boundaryEyebrow: "HONEST EDGES",
  boundaryTitle: "Generated writing still needs an editor.",
  boundaryText:
    "Research can be incomplete, models can misunderstand evidence and generated diagrams can fail. LazyWriter preserves sources and converts image failures into visible notices, but a human should still review facts, voice and final publication choices.",
  boundaryIcon: ShieldAlert,
  finalEyebrow: "THE DRAFT IS ON THE DESK",
  finalTitle: "Read the workflow now. Write with it here later.",
  footerLine: "LAZYWRITER / MANY PENS. ONE ORDERED ARTICLE.",
};

export default function LazyWriterCaseStudy() {
  return <ProjectStoryPage story={story} />;
}
