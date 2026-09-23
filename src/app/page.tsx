import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Plus,
  Asterisk,
} from "lucide-react";
import {
  siPython,
  siLangchain,
  siLanggraph,
  siFastapi,
  siPostgresql,
  siDocker,
  siReact,
  siNextdotjs,
  siTensorflow,
  siHuggingface,
} from "simple-icons";
import { profile, projects } from "@/content/portfolio";
import { MotionControl } from "@/components/animated-type";
import { ChatLauncher } from "@/components/chat-launcher";
import { Reveal } from "@/components/reveal";
import { SceneArt, DriftingLeaves, PaperEdge } from "@/components/scene-art";

import { Pip } from "@/components/pip";
import { ChapterTrail, CloudEdge } from "@/components/chapter-trail";
import { ProjectDoodle } from "@/components/project-doodle";
import { ToolSticker } from "@/components/tool-sticker";
import { LivingHero } from "@/components/living-hero";
import { FieldGuide } from "@/components/field-guide";
import { MissionControl } from "@/components/mission-control";

const stack = [
  { icon: siPython, name: "Python", detail: "The foundation" },
  { icon: siLangchain, name: "LangChain", detail: "LLM applications" },
  { icon: siLanggraph, name: "LangGraph", detail: "Stateful agents" },
  { icon: siFastapi, name: "FastAPI", detail: "Backend systems" },
  { icon: siPostgresql, name: "PostgreSQL", detail: "Data & memory" },
  { icon: siDocker, name: "Docker", detail: "Built to deploy" },
  { icon: siReact, name: "React", detail: "Interfaces" },
  { icon: siNextdotjs, name: "Next.js", detail: "Full-stack apps" },
  { icon: siTensorflow, name: "TensorFlow", detail: "Machine learning" },
  { icon: siHuggingface, name: "Hugging Face", detail: "Models & tooling" },
];

function SocialLinks() {
  return (
    <div className="social-links">
      <a href={profile.githubUrl} target="_blank" rel="noreferrer">
        <Github size={19} /> GitHub <ArrowUpRight size={15} />
      </a>
      <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
        <Linkedin size={19} /> LinkedIn <ArrowUpRight size={15} />
      </a>
      <a href={profile.fiverrUrl} target="_blank" rel="noreferrer">
        <span className="fiverr-icon" aria-hidden="true">
          fi.
        </span>{" "}
        Fiverr <ArrowUpRight size={15} />
      </a>
    </div>
  );
}

const toolHints: Record<string, string> = {
  Python:
    "The home base for retrieval pipelines, model experiments and backend logic.",
  LangChain:
    "Connecting documents, retrievers and language models into useful applications.",
  LangGraph:
    "Agents with state, memory and a human in the loop when it matters.",
  FastAPI: "Turning Python logic into APIs that real interfaces can talk to.",
  PostgreSQL:
    "A reliable home for application data and persistent conversations.",
  Docker:
    "Packing an application and its dependencies for repeatable deployment.",
  React: "The interactive side: conversations, controls and useful interfaces.",
  "Next.js":
    "Bringing React interfaces and server endpoints into one application.",
  TensorFlow:
    "Building and training machine learning models. Certified in 2023.",
  "Hugging Face":
    "Exploring open models, tokenizers and the transformer ecosystem.",
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header anime-header wrap">
        <a href="#main" className="brand" aria-label="Subramanian, home">
          <span className="brand-symbol">
            s<span>m</span>
          </span>
          <span>
            SUBRAMANIAN<span className="brand-role">AI ENGINEER</span>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <Link href="/projects">Projects</Link>
          <a href="#about">About</a>
          <a href="#stack">Stack</a>
        </nav>
        <a href="#contact" className="header-contact">
          Let’s talk <ArrowUpRight size={18} />
        </a>
      </header>
      <main id="main">
        <LivingHero>
          <div className="anime-hero-content wrap">
            <span className="chapter-label">
              <span>01</span> THE ADVENTURE BEGINS
            </span>
            <h1 id="hero-title">
              <span className="hero-ink-line">A curious mind.</span>
              <span className="hero-ink-line">
                A world to <em>build.</em>
              </span>
            </h1>
            <p className="anime-intro">
              Hey, I’m <strong>Subramanian.</strong>
              <br />
              An AI engineer turning wild curiosity
              <br className="desktop-break" /> into real-world systems.
            </p>
            <div className="anime-actions">
              <a className="ink-button" href="#projects">
                Explore my work <ArrowDownRight size={20} />
              </a>
              <a
                className="ink-resume"
                href={profile.resumeUrl}
                download="Subramanian-M-Resume.pdf"
              >
                Résumé <Download size={17} />
              </a>
            </div>
            <FieldGuide />
          </div>
          <div className="scene-caption wrap">
            <span>
              <i />
              COIMBATORE, INDIA · OPEN TO OPPORTUNITIES
            </span>
            <a href="#projects">
              THERE’S MORE BELOW <ArrowDown size={16} />
            </a>
          </div>
          <a href="#projects" className="hero-scroll-sticker">
            <span>Come on in!</span>
            <ArrowDown size={18} />
          </a>
          <CloudEdge />
          <PaperEdge />
        </LivingHero>
        <section
          id="projects"
          className="work-section cartoon-work"
          aria-labelledby="work-title"
        >
          <div className="wrap">
            <Reveal className="work-heading">
              <div>
                <p className="eyebrow">02 / THE IDEA GARDEN</p>
                <h2 id="work-title">
                  A few ideas,
                  <br />
                  <span className="handwritten">coming to life.</span>
                </h2>
                <p className="garden-intro">
                  Little experiments. Big curiosity. Room to grow.
                </p>
                <Link className="text-link garden-directory-link" href="/projects">
                  Browse all projects <ArrowRight size={18} />
                </Link>
              </div>
              <Pip />
            </Reveal>
            <div className="project-grid">
              {projects.map((project, index) => (
                <Reveal
                  className={
                    "project-card " + (index === 0 ? "project-featured" : "")
                  }
                  key={project.id}
                >
                  {project.caseStudyUrl && (
                    <Link
                      className="project-card-hit"
                      href={project.caseStudyUrl}
                      aria-label={"Read the " + project.title + " case study"}
                    >
                      <span className="sr-only">
                        Read the {project.title} case study
                      </span>
                    </Link>
                  )}
                  <div className="project-image">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title + " preview"}
                        fill
                        sizes="(max-width: 700px) 90vw, 60vw"
                      />
                    ) : (
                      <ProjectDoodle variant={project.visual} />
                    )}
                    <span className="project-state">
                      <i />
                      {project.status === "completed"
                        ? "COMPLETED"
                        : "COMING SOON"}
                    </span>
                  </div>
                  <div className="project-info">
                    <div className="project-kicker">
                      <span>0{index + 1}</span>
                      <span>{project.category}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    {project.status === "completed" ? (
                      <div className="project-links">
                        {project.caseStudyUrl && (
                          <Link href={project.caseStudyUrl}>
                            Read the story <ArrowRight size={18} />
                          </Link>
                        )}
                        {project.demoUrl && (
                          <a
                            className="project-demo-link"
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Try it live <ArrowUpRight size={18} />
                          </a>
                        )}
                        {project.repositoryUrl && !project.demoUrl && (
                          <a
                            href={project.repositoryUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View source <Github size={18} />
                          </a>
                        )}
                      </div>
                    ) : (
                      <details className="project-details">
                        <summary>
                          Behind the idea <Plus size={18} />
                        </summary>
                        <p>
                          This project is still taking shape. The live
                          application and technical walkthrough will appear here
                          when they’re ready.
                        </p>
                      </details>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
            <a
              className="work-github text-link"
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              Follow the progress on GitHub <ArrowUpRight size={18} />
            </a>
          </div>
          <ChapterTrail
            caption="Every idea has a little backstory…"
            className="projects-transition"
            steady
          />
        </section>
        <section
          id="about"
          className="about-section anime-about"
          aria-labelledby="about-title"
        >
          <div className="wrap">
            <div className="about-header">
              <span className="eyebrow">03 / THE ORIGIN STORY</span>
              <Asterisk size={56} strokeWidth={1.2} />
            </div>
            <Reveal>
              <h2 id="about-title">
                Every builder has
                <br />
                an <span className="serif-word">origin story.</span>
              </h2>
            </Reveal>
            <div className="story-layout">
              <div className="story-illustration">
                <SceneArt
                  src="/art/anime-workshop.webp"
                  sizes="(max-width: 720px) 100vw, 50vw"
                  nightSrc="/art/mid.png"
                  nightAlt="Subramanian sketching at his lamplit desk with a moonlit mountain town outside"
                  alt="Anime illustration of Subramanian sketching ideas at a sunlit desk"
                />
                <span className="sketch-caption">
                  Somewhere between an idea
                  <br />
                  and one more cup of coffee.
                </span>
              </div>
              <Reveal className="story-copy">
                <p className="story-lead">
                  Before I wrote code,
                  <br />I told stories in pixels.
                </p>
                <p>
                  I started as a freelance video editor and colorist, working
                  with people across the world. Five years of making things,
                  listening closely and caring about the final result.
                </p>
                <p>
                  In 2022, that curiosity found a new outlet: Python. Then
                  full-stack development. Then machine learning. Today, I’m
                  building{" "}
                  <strong>
                    retrieval systems, stateful agents and the backends that
                    make them work.
                  </strong>
                </p>
                <p>
                  I like the whole process. The messy first experiment. The API.
                  The deployment. The production bug that teaches you something
                  the tutorial didn’t.
                </p>
                <a
                  href={profile.resumeUrl}
                  className="story-resume"
                  download="Subramanian-M-Resume.pdf"
                >
                  Get the full story <Download size={19} />
                </a>
              </Reveal>
            </div>
            <div className="creative-proof">
              <div className="proof-intro">
                <span>
                  FROM MY
                  <br />
                  FREELANCE CHAPTER
                </span>
                <a href={profile.fiverrUrl} target="_blank" rel="noreferrer">
                  See it on Fiverr <ArrowUpRight size={15} />
                </a>
              </div>
              <div>
                <strong>
                  5<span>+</span>
                </strong>
                <p>years with remote clients</p>
              </div>
              <div>
                <strong>
                  100<span>+</span>
                </strong>
                <p>five-star Fiverr reviews</p>
              </div>
              <div>
                <strong>
                  500<span>+</span>
                </strong>
                <p>video projects delivered / exported</p>
              </div>
            </div>
            <div className="education-line">
              <span>BCA · IGNOU</span>
              <span>TensorFlow Developer Certificate · 2023</span>
              <span>Diploma in 3D & VFX · 2021</span>
            </div>
          </div>
          <ChapterTrail
            variant="meadow"
            caption="A little curiosity. A few trusty tools."
          />
        </section>
        <section
          id="stack"
          className="stack-section anime-stack wrap"
          aria-labelledby="stack-title"
        >
          <Reveal className="stack-heading">
            <div>
              <span className="eyebrow">04 / THE ADVENTURER’S TOOLKIT</span>
              <h2 id="stack-title">
                Tools for the
                <br />
                <span className="serif-word">possibilities.</span>
              </h2>
            </div>
            <p>
              From the first Python script to a deployed application. These are
              the tools I reach for.
            </p>
          </Reveal>
          <Reveal className="stack-grid">
            {stack.map(({ icon, name, detail }, index) => (
              <ToolSticker
                key={name}
                name={name}
                hint={toolHints[name]}
                index={index}
              >
                <svg viewBox="0 0 24 24" role="img" aria-label={name + " logo"}>
                  <path fill="currentColor" d={icon.path} />
                </svg>
                <strong>{name}</strong>
                <span>{detail}</span>
              </ToolSticker>
            ))}
          </Reveal>
          <div className="stack-practice">
            <p>Under the hood</p>
            <span>Hybrid search & reranking</span>
            <span>Multimodal RAG</span>
            <span>Tool calling & memory</span>
            <span>Human-in-the-loop</span>
          </div>
          <p className="sticker-hint">
            ↑ Pick a tool. There’s a little story on the back.
          </p>
          <p className="learning-note">
            <span className="learning-star">✳</span> Always learning. Currently
            going deeper into MLOps, fine-tuning, inference and AI system
            design.
          </p>
          <ChapterTrail
            variant="sunset"
            caption="Ready to peek under the hood?"
          />
        </section>

        <MissionControl />

        <section
          id="contact"
          className="anime-contact"
          aria-labelledby="contact-title"
        >
          <div className="horizon-scene">
            <SceneArt
              src="/art/anime-horizon.webp"
              nightSrc="/art/end.png"
              nightAlt="A traveler overlooking a mountain valley and town lights beneath a star-filled night sky"
              alt="Anime illustration of a traveler looking over a sunlit mountain valley"
            />
            <DriftingLeaves />
            <div className="horizon-copy wrap">
              <Reveal>
                <span className="chapter-label">
                  <span>06</span> THE NEXT CHAPTER
                </span>
                <h2 id="contact-title">
                  Something good
                  <br />
                  starts with <em>hello.</em>
                </h2>
                <a className="ink-button" href={"mailto:" + profile.email}>
                  Let’s build something <ArrowUpRight size={21} />
                </a>
              </Reveal>
            </div>
            <PaperEdge />
          </div>
          <div className="contact-details wrap">
            <div>
              <p>
                AI engineering. India, remote,
                <br />
                or somewhere new.
              </p>
              <a className="email-link" href={"mailto:" + profile.email}>
                {profile.email}
                <ArrowUpRight size={20} />
              </a>
            </div>
            <div>
              <SocialLinks />
              <a
                className="automation-link"
                href="https://portfolio-subramanian-007.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Visit my automation portfolio <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer wrap">
        <a className="footer-name" href="#main">
          SUBRAMANIAN<span>✳</span>
        </a>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Subramanian M</span>
          <span>Made with curiosity. Always in progress.</span>
          <MotionControl />
          <a href="#main" aria-label="Back to top">
            <ArrowRight className="back-arrow" size={20} />
          </a>
        </div>
      </footer>
      <ChatLauncher />
    </>
  );
}
