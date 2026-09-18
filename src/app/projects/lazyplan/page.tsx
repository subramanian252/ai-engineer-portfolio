import type { Metadata } from "next";
import {
  BadgeDollarSign,
  CheckCircle2,
  CloudSun,
  Database,
  FileCheck2,
  GitBranch,
  Hotel,
  MapPinned,
  Plane,
  Route,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  ProjectStoryPage,
  type ProjectStory,
} from "@/components/project-story";
import { getSiteUrl } from "@/lib/site-url";
import styles from "../lazychat/page.module.css";

const repositoryUrl = "https://github.com/subramanian252/travel_agent";
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "LazyPlan — Multi-Agent Travel Planner",
  description:
    "Inside LazyPlan: selective travel agents, live workflow streaming, durable checkpoints, human approval and focused itinerary revisions.",
  alternates: siteUrl
    ? { canonical: siteUrl + "/projects/lazyplan" }
    : undefined,
  openGraph: {
    type: "article",
    title: "LazyPlan — A travel crew inside one graph",
    description:
      "A playful walkthrough of Subramanian’s multi-agent travel planner.",
    url: siteUrl ? siteUrl + "/projects/lazyplan" : undefined,
  },
};

const story: ProjectStory = {
  number: "02",
  name: "LazyPlan",
  heroEyebrow: "THE ITINERARY MACHINE",
  headline: "A tiny travel crew with a very serious clipboard.",
  lede:
    "A multi-agent travel planner that checks the brief, calls only the specialists a trip needs, streams their progress and pauses for approval before the itinerary becomes final.",
  repositoryUrl,
  sourceLabel: "Explore the source",
  futureLabel: "Open LazyPlan",
  futureNote:
    "The public trip desk is being packed. The full workflow is already in the repository.",
  consoleLabel: "LAZYPLAN / TRIP 042",
  consoleStatus: "AWAITING APPROVAL",
  consolePrompt: "Paris, four days, museums, food, and a sensible budget.",
  drawingLabel: "LazyPlan travel workflow illustration",
  drawingDescription:
    "A map route connects a trip brief to flight, hotel, weather, budget and approval stations.",
  drawing: (
    <>
      <path
        className={styles.route}
        d="M82 332C178 207 229 281 300 180s162-97 334-30"
      />
      <path
        className={styles.routeGhost}
        d="M91 112c118 72 163-4 246 55s148 185 292 155"
      />
      <g className={styles.documentDrawing}>
        <path d="M58 70h164v122H58z" />
        <path d="m82 102 40-18 39 18 37-18v76l-37 18-39-18-40 18z" />
        <circle cx="160" cy="111" r="13" />
        <path d="M160 124v22" />
      </g>
      <g className={styles.botDrawing}>
        <path d="M277 155h174v132H277z" />
        <path d="M305 155v-27h118v27M314 199h100M314 229h73" />
        <circle cx="410" cy="251" r="18" />
        <path d="m402 251 7 7 14-19" />
      </g>
      <g className={styles.modelTicket}>
        <path d="M500 60h151v82H500z" />
        <text x="519" y="92">SUPERVISOR</text>
        <text x="519" y="120">4 agents selected</text>
      </g>
      <g className={styles.toolTicket}>
        <path d="M501 286h154v91H501z" />
        <text x="520" y="319">HUMAN REVIEW</text>
        <text x="520" y="349">approve / revise</text>
      </g>
      <g className={styles.sparkDrawing}>
        <path d="M249 80v30m-15-15h30M467 350v28m-14-14h28" />
      </g>
    </>
  ),
  builderNote: (
    <>
      I built the <strong>entire backend</strong>: LangGraph orchestration,
      specialist agents, MCP tools, FastAPI endpoints, streaming, checkpoint
      persistence and the approval loop. The{" "}
      <strong>frontend was built with AI</strong> under my direction and wired
      to the backend’s real workflow events.
    </>
  ),
  builderAside: "The itinerary waits for a human. As it should.",
  featureEyebrow: "WHAT TRAVELS INSIDE",
  featureTitle: "Six moving parts. One trip that stays on track.",
  featureIntro:
    "LazyPlan treats planning as a stateful workflow rather than one heroic prompt.",
  features: [
    {
      icon: ShieldCheck,
      number: "01",
      title: "The guardrail checks the ticket",
      text: "Unsafe or incomplete requests stop early with a useful reason, before research tools spend time or money.",
      note: "No destination? The suitcase stays closed.",
    },
    {
      icon: GitBranch,
      number: "02",
      title: "A supervisor picks the crew",
      text: "The supervisor extracts constraints and selects only the flight, hotel, weather or budget agents the trip needs.",
      note: "Not every meeting needs the whole airport.",
    },
    {
      icon: Search,
      number: "03",
      title: "Specialists research in parallel",
      text: "MCP-backed agents gather focused travel context from Tavily, aviation data and a local weather service.",
      note: "Tiny specialists. Surprisingly good luggage.",
    },
    {
      icon: Route,
      number: "04",
      title: "Progress is real, not theatre",
      text: "FastAPI turns LangGraph updates into SSE events so the interface shows completed nodes and selected agents live.",
      note: "The progress bar has receipts.",
    },
    {
      icon: Users,
      number: "05",
      title: "A person approves the plan",
      text: "LangGraph interrupt pauses on a durable checkpoint. Approval finishes the trip; feedback resumes the same thread.",
      note: "Pip may suggest. You still hold the passport.",
    },
    {
      icon: Database,
      number: "06",
      title: "Trips remember where they were",
      text: "PostgreSQL checkpoints keep the graph resumable, and a confirmed New Trip removes the old thread explicitly.",
      note: "No mystery holiday leftovers.",
    },
  ],
  flowEyebrow: "ONE BRIEF, SIX STOPS",
  flowTitle: "From travel wish to approved itinerary.",
  flow: [
    ["Brief", "states the trip"],
    ["Guardrail", "checks the request"],
    ["Supervisor", "chooses agents"],
    ["Research", "gathers context"],
    ["Draft", "builds itinerary"],
    ["Review", "approves or revises"],
  ],
  flowCaption:
    "The same UUID thread flows through planning, research and review. Revision feedback returns to the supervisor, so the graph can redo the work that changed instead of forgetting the whole trip.",
  concepts: [
    {
      eyebrow: "THE SPECIALIST DEPARTURE BOARD",
      title: "The supervisor calls the right desks.",
      body:
        "Origin, destination, duration, budget, travel style and special requests become structured constraints. The supervisor uses them to activate the smallest useful team, then the itinerary node combines their results into one reviewable plan.",
      tags: ["Selective routing", "Structured output", "Parallel research"],
      steps: [
        { icon: Plane, label: "FLIGHTS" },
        { icon: Hotel, label: "HOTELS" },
        { icon: CloudSun, label: "WEATHER" },
        { icon: BadgeDollarSign, label: "BUDGET" },
      ],
    },
    {
      eyebrow: "THE APPROVAL ROUNDABOUT",
      title: "Pause, inspect, approve—or take another lap.",
      body:
        "The draft is saved at a LangGraph interrupt in PostgreSQL. Approval resumes toward the final response; feedback sends a focused revision through the same persistent trip thread.",
      tags: ["interrupt()", "AsyncPostgresSaver", "Command(resume)"],
      steps: [
        { icon: FileCheck2, label: "DRAFT" },
        { icon: Database, label: "CHECKPOINT" },
        { icon: Users, label: "REVIEW" },
        { icon: CheckCircle2, label: "FINAL" },
      ],
    },
  ],
  toolsEyebrow: "THE TRAVEL TOOL BELT",
  toolsTitle: "Real research, connected through clear contracts.",
  tools: [
    "LangGraph",
    "FastAPI",
    "PostgreSQL",
    "MCP",
    "Tavily",
    "Aviationstack",
    "Weather MCP",
    "OpenRouter",
  ],
  toolsNote:
    "Hotel, flight and weather context arrive through MCP-backed tools. Budget guidance is clearly labeled as an estimate, and the browser receives the graph’s actual SSE events.",
  backendTitle: "The travel engine",
  backendText:
    "Workflow architecture, graph state, agent routing, tool integration, persistence, review commands, thread lifecycle and API behavior were built by me.",
  backendItems: [
    "Python + FastAPI",
    "LangGraph + LangChain",
    "PostgreSQL checkpoints",
    "MCP + SSE",
  ],
  frontendTitle: "The departure lounge",
  frontendText:
    "The responsive interface was built with AI under my direction, then connected to live graph progress, Markdown itineraries and approve/revise controls.",
  frontendItems: [
    "HTML + CSS",
    "Vanilla JavaScript",
    "SSE stream reader",
    "Markdown rendering",
  ],
  boundaryEyebrow: "HONEST EDGES",
  boundaryTitle: "Research helps you plan; it does not book the plane.",
  boundaryText:
    "LazyPlan produces researched travel guidance and estimated budgets. External data can change, so availability, pricing and critical travel details still need verification before booking. The public demo will be connected later.",
  boundaryIcon: MapPinned,
  finalEyebrow: "THE SUITCASE IS PACKED",
  finalTitle: "Read the graph now. Plan a trip here later.",
  footerLine: "LAZYPLAN / MANY AGENTS. ONE HUMAN APPROVAL.",
};

export default function LazyPlanCaseStudy() {
  return <ProjectStoryPage story={story} />;
}
