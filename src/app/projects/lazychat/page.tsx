import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  CircleDollarSign,
  Cloud,
  Code2,
  Database,
  FileText,
  Github,
  GitFork,
  LockKeyhole,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Wrench,
} from "lucide-react";
import { ProjectThemeToggle } from "@/components/project-theme-toggle";
import { getSiteUrl } from "@/lib/site-url";
import styles from "./page.module.css";

const repositoryUrl = "https://github.com/subramanian252/full-rag-chatbot";
const demoUrl = "https://full-rag-chatbot.vercel.app/";
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "LazyChat — Stateful AI Workspace",
  description:
    "Inside LazyChat: Pinecone document RAG, selectable models, visible tools, RDS persistence, human approval and a Vercel deployment.",
  alternates: siteUrl
    ? { canonical: siteUrl + "/projects/lazychat" }
    : undefined,
  openGraph: {
    type: "article",
    title: "LazyChat — Big questions. Tiny robot energy.",
    description:
      "A playful walkthrough of Subramanian’s live, stateful LLM workspace.",
    url: siteUrl ? siteUrl + "/projects/lazychat" : undefined,
  },
};

const features = [
  {
    icon: MessageSquareText,
    number: "01",
    title: "Answers arrive live",
    text: "Token streaming keeps the conversation moving while Markdown, code, tables and links render cleanly.",
    note: "No dramatic loading spinner monologue.",
  },
  {
    icon: GitFork,
    number: "02",
    title: "Choose the right brain",
    text: "A backend allowlist lets each conversation switch between supported OpenRouter models without changing the workspace.",
    note: "Different models. Same tiny desk.",
  },
  {
    icon: FileText,
    number: "03",
    title: "Bring your own documents",
    text: "PDF, TXT, Markdown, CSV and DOCX files become conversation-scoped chunks, embeddings and Pinecone search results.",
    note: "The PDF has entered the chat.",
  },
  {
    icon: Wrench,
    number: "04",
    title: "Tools stay visible",
    text: "Search, weather, calculator, time, stocks, retrieval and memory show their arguments, status and results as they run.",
    note: "The assistant shows its homework.",
  },
  {
    icon: ShieldCheck,
    number: "05",
    title: "A human keeps the keys",
    text: "Sensitive simulated actions pause at an RDS-backed LangGraph checkpoint, survive a reload and wait for a matching approval.",
    note: "Pip cannot impulse-buy stocks.",
  },
  {
    icon: CircleDollarSign,
    number: "06",
    title: "Usage without guesswork",
    text: "Provider-reported tokens and cost roll up by response segment, message, conversation and the whole workspace.",
    note: "The bill gets a name tag.",
  },
];

const flow = [
  ["React", "asks"],
  ["FastAPI", "validates"],
  ["Graph + RDS", "remembers"],
  ["Model", "reasons"],
  ["Tools + Pinecone", "find evidence"],
  ["SSE", "streams back"],
];

const tools = [
  "Web search",
  "Weather",
  "Calculator",
  "Date & time",
  "Stock price",
  "Document retriever",
  "Save memory",
  "Search memory",
];

function LazyBotConsole() {
  return (
    <div className={styles.consoleCard}>
      <div className={styles.consoleTopline}>
        <span>
          <i /> LAZYCHAT / SESSION 007
        </span>
        <span>STATEFUL</span>
      </div>
      <svg
        className={styles.heroDrawing}
        viewBox="0 0 720 450"
        role="img"
        aria-labelledby="lazybot-title lazybot-description"
      >
        <title id="lazybot-title">LazyChat workspace illustration</title>
        <desc id="lazybot-description">
          A small assistant connects a document, language model and tool result
          inside a playful chat console.
        </desc>
        <path
          className={styles.route}
          d="M105 106 C205 35 278 98 345 167 S514 292 620 210"
        />
        <path
          className={styles.routeGhost}
          d="M108 310 C211 376 309 337 377 274 S521 96 626 135"
        />
        <g className={styles.documentDrawing}>
          <path d="M64 56h126v164H64z" />
          <path d="M160 56v38h30" />
          <path d="M88 126h75M88 151h61M88 176h67" />
          <circle cx="174" cy="201" r="23" />
          <path d="m190 217 20 20" />
        </g>
        <g className={styles.botDrawing}>
          <path d="M288 159c0-33 27-60 60-60h28c33 0 60 27 60 60v66c0 33-27 60-60 60h-28c-33 0-60-27-60-60z" />
          <path d="M361 99V69m-14 0h28M288 200l-39 29m187-29 39 29" />
          <circle cx="335" cy="180" r="8" />
          <circle cx="389" cy="180" r="8" />
          <path d="M329 223c20 17 47 17 67 0" />
          <path d="m309 286-15 53m121-53 15 53M323 314h79" />
        </g>
        <g className={styles.modelTicket}>
          <path d="M502 65h150v80H502z" />
          <text x="521" y="95">
            MODEL ROUTER
          </text>
          <text x="521" y="124">
            GPT-4o-mini ▾
          </text>
        </g>
        <g className={styles.toolTicket}>
          <path d="M505 277h154v105H505z" />
          <text x="523" y="309">
            TOOL RESULT
          </text>
          <text x="523" y="339">
            retriever ✓
          </text>
          <text x="523" y="362">
            3 useful chunks
          </text>
        </g>
        <g className={styles.sparkDrawing}>
          <path d="M232 66v30M217 81h30M469 356v31M454 371h30" />
        </g>
      </svg>
      <div className={styles.consolePrompt}>
        <Bot size={20} />
        <span>Ask something difficult. I brought tools.</span>
        <ArrowRight size={19} />
      </div>
    </div>
  );
}

export default function LazyChatCaseStudy() {
  return (
    <main className={styles.page}>
      <header className={styles.siteHeader}>
        <Link href="/projects" className={styles.backLink}>
          <ArrowLeft size={18} /> Back to all projects
        </Link>
        <div className={styles.headerActions}>
          <ProjectThemeToggle />
          <a href={repositoryUrl} target="_blank" rel="noreferrer">
            <Github size={18} /> GitHub
          </a>
        </div>
      </header>

      <article>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              PROJECT 01 / THE TALKATIVE WORKBENCH
            </p>
            <h1>
              Meet LazyChat.
              <span>A chat that shows its work.</span>
            </h1>
            <p className={styles.lede}>
              A stateful LLM workspace where documents become evidence, tools
              stay visible, risky actions wait for a human and every token keeps
              its receipt—now running as a public Vercel application.
            </p>
            <div className={styles.heroActions}>
              <a
                className={styles.primaryButton}
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
              >
                <MessageSquareText size={19} /> Open the live chat{" "}
                <ArrowUpRight size={18} />
              </a>
              <a
                className={styles.secondaryButton}
                href={repositoryUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={19} /> Explore the source <ArrowRight size={18} />
              </a>
            </div>
            <p className={styles.futureNote}>
              <Check size={15} /> The public chat is live, with its React build
              bundled into the FastAPI deployment.
            </p>
          </div>
          <LazyBotConsole />
        </section>

        <section className={styles.openingNote}>
          <p className={styles.noteLabel}>A NOTE FROM THE BUILDER</p>
          <p>
            I built the <strong>backend and system design</strong>: the graph,
            retrieval path, storage, tools, approval flow and API behavior. The
            <strong> frontend was built with AI</strong> under my direction and
            supervision, then connected to the backend as one product.
          </p>
          <span className={styles.handNote}>
            Good software can show its seams.
          </span>
        </section>

        <section
          className={styles.featureSection}
          aria-labelledby="feature-title"
        >
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>WHAT LIVES INSIDE</p>
            <h2 id="feature-title">Six useful tricks. Zero mystery smoke.</h2>
            <p>
              Each feature solves a real product problem, with one small joke
              left in the machinery.
            </p>
          </div>
          <div className={styles.featureGrid}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article className={styles.featureCard} key={feature.number}>
                  <div className={styles.cardTopline}>
                    <span>{feature.number}</span>
                    <Icon size={25} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                  <em>{feature.note}</em>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.flowSection} aria-labelledby="flow-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>ONE REQUEST, SIX STOPS</p>
            <h2 id="flow-title">From question to useful answer.</h2>
          </div>
          <div className={styles.flowTrack}>
            {flow.map(([name, job], index) => (
              <div className={styles.flowStop} key={name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{name}</strong>
                <small>{job}</small>
                {index < flow.length - 1 && <ArrowRight aria-hidden="true" />}
              </div>
            ))}
          </div>
          <p className={styles.flowCaption}>
            The graph restores its PostgreSQL checkpoint before the model
            decides whether to answer, retrieve Pinecone context or call a tool.
            Results stream back as server-sent events and are saved with their
            provider-reported usage.
          </p>
        </section>

        <section className={styles.ragSection}>
          <div className={styles.ragCopy}>
            <p className={styles.eyebrow}>THE DOCUMENT DETOUR</p>
            <h2>RAG, explained with a paper trail.</h2>
            <p>
              Every uploaded file belongs to one conversation. Up to 4 MB is
              parsed from request bytes, split into 1,000-character chunks with
              overlap, embedded through OpenRouter and stored in a Pinecone
              namespace matching the thread ID. A query retrieves the three most
              relevant pieces before the model writes its answer.
            </p>
            <div className={styles.fileTypes}>
              {["PDF", "TXT", "MD", "CSV", "DOCX"].map((type) => (
                <span key={type}>{type}</span>
              ))}
            </div>
          </div>
          <div
            className={styles.ragMachine}
            aria-label="Document retrieval pipeline"
          >
            <div>
              <FileText />
              <span>DOCUMENT</span>
            </div>
            <ArrowRight />
            <div>
              <Code2 />
              <span>CHUNKS</span>
            </div>
            <ArrowRight />
            <div>
              <Database />
              <span>PINECONE</span>
            </div>
            <ArrowRight />
            <div>
              <Search />
              <span>TOP 3</span>
            </div>
          </div>
        </section>

        <section className={styles.ragSection}>
          <div className={styles.ragCopy}>
            <p className={styles.eyebrow}>THE VERCEL SUITCASE</p>
            <h2>One deployment carries both halves.</h2>
            <p>
              Vite compiles the React interface into the public directory.
              Vercel bundles those assets with the FastAPI Function, installs
              the locked Python environment and promotes the result to the live
              production alias. RDS and Pinecone keep durable state outside the
              serverless runtime.
            </p>
            <div className={styles.fileTypes}>
              {["React 19", "FastAPI", "Fluid compute", "TLS to RDS"].map(
                (type) => (
                  <span key={type}>{type}</span>
                ),
              )}
            </div>
          </div>
          <div
            className={styles.ragMachine}
            aria-label="LazyChat Vercel deployment pipeline"
          >
            <div>
              <Code2 />
              <span>REACT BUILD</span>
            </div>
            <ArrowRight />
            <div>
              <Cloud />
              <span>VERCEL</span>
            </div>
            <ArrowRight />
            <div>
              <TerminalSquare />
              <span>FASTAPI</span>
            </div>
            <ArrowRight />
            <div>
              <Database />
              <span>DURABLE DATA</span>
            </div>
          </div>
        </section>

        <section className={styles.toolsSection}>
          <div>
            <p className={styles.eyebrow}>THE TINY TOOL SHED</p>
            <h2>A useful assistant knows when to ask for help.</h2>
          </div>
          <div className={styles.toolBelt}>
            {tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
          <p className={styles.toolNote}>
            Tool names, JSON arguments, status and results stay visible in the
            conversation. Sensitive simulated actions pause for approval.
          </p>
        </section>

        <section className={styles.stackSection} aria-labelledby="stack-title">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>WHO BUILT WHAT</p>
            <h2 id="stack-title">A clear split. One connected product.</h2>
          </div>
          <div className={styles.stackColumns}>
            <article className={styles.backendCard}>
              <span className={styles.buildBadge}>BACKEND / BUILT BY ME</span>
              <TerminalSquare size={32} />
              <h3>The engine room</h3>
              <p>
                System conception, API behavior, LangGraph orchestration,
                persistence, RAG, tool calling, approvals and integration.
              </p>
              <ul>
                <li>
                  <Check /> Python + FastAPI
                </li>
                <li>
                  <Check /> LangGraph + LangChain
                </li>
                <li>
                  <Check /> Amazon RDS + SQLAlchemy
                </li>
                <li>
                  <Check /> Pinecone + OpenRouter
                </li>
                <li>
                  <Check /> Vercel FastAPI runtime
                </li>
              </ul>
            </article>
            <article className={styles.frontendCard}>
              <span className={styles.buildBadge}>
                FRONTEND / BUILT WITH AI
              </span>
              <Sparkles size={32} />
              <h3>The friendly window</h3>
              <p>
                The interface was built with AI under my direction and
                supervision, then shaped around the backend’s real states and
                events.
              </p>
              <ul>
                <li>
                  <Check /> React 19 + TypeScript
                </li>
                <li>
                  <Check /> Vite
                </li>
                <li>
                  <Check /> React Markdown + GFM
                </li>
                <li>
                  <Check /> Lucide + custom CSS
                </li>
              </ul>
            </article>
          </div>
          <p className={styles.authorshipNote}>
            AI also assisted with documented backend integration fixes and usage
            instrumentation. The architecture, decisions and supervision are
            mine.
          </p>
        </section>

        <section className={styles.boundarySection}>
          <LockKeyhole />
          <div>
            <p className={styles.eyebrow}>HONEST EDGES</p>
            <h2>Built as a personal workspace.</h2>
            <p>
              The live app is a single-user-oriented demonstration. Conversation
              IDs are application identifiers, not authorization boundaries, and
              its overlapping-request guard is process-local. A multi-tenant
              release still needs identity, ownership, rate limits, distributed
              coordination and retention controls. The stock purchase tool is a
              simulation; no real trade is placed.
            </p>
          </div>
        </section>

        <section className={styles.finalCta}>
          <Bot size={42} />
          <div>
            <p className={styles.eyebrow}>THE CHAT DOOR IS OPEN</p>
            <h2>Ask a question live. Then inspect how the answer travelled.</h2>
          </div>
          <div className={styles.finalActions}>
            <a
              className={styles.liveDemoButton}
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MessageSquareText /> Open LazyChat <ArrowUpRight />
            </a>
            <a href={repositoryUrl} target="_blank" rel="noreferrer">
              <Github /> View on GitHub <ArrowRight />
            </a>
          </div>
        </section>
      </article>

      <footer className={styles.footer}>
        <Link href="/#projects">
          <ArrowLeft size={17} /> Back to all projects
        </Link>
        <span>LAZYCHAT / BIG QUESTIONS. TINY ROBOT ENERGY. LIVE ON VERCEL.</span>
      </footer>
    </main>
  );
}
