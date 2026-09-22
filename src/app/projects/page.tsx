import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  Github,
  Route,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import { PipDrawing } from "@/components/pip";
import { ProjectDoodle } from "@/components/project-doodle";
import { ProjectThemeToggle } from "@/components/project-theme-toggle";
import { projectDirectory, projects } from "@/content/portfolio";
import { getSiteUrl } from "@/lib/site-url";
import styles from "./page.module.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Projects — Subramanian’s Little AI Lab",
  description:
    "Six playful AI engineering projects covering stateful agents, multi-agent planning, agentic writing and three distinct RAG architectures.",
  alternates: siteUrl ? { canonical: siteUrl + "/projects" } : undefined,
  openGraph: {
    type: "website",
    title: "Subramanian’s Little AI Lab — Projects",
    description:
      "Case studies and field notes from six practical AI engineering builds.",
    url: siteUrl ? siteUrl + "/projects" : undefined,
  },
};

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.siteHeader}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandMark}>
            s<span>m</span>
          </span>
          <span>
            SUBRAMANIAN
            <small>AI ENGINEER / PROJECT INDEX</small>
          </span>
        </Link>
        <div className={styles.headerActions}>
          <Link href="/#projects">
            <ArrowLeft size={17} /> Home garden
          </Link>
          <ProjectThemeToggle />
        </div>
      </header>

      <section className={styles.hero} aria-labelledby="projects-title">
        <div className={styles.heroHeading}>
          <div>
            <p className={styles.eyebrow}>THE PROJECT ARCHIVE / SIX MACHINES</p>
            <h1 id="projects-title">
              Things I built.
              <span>Things that almost behaved.</span>
            </h1>
            <p className={styles.heroLede}>
              Three complete product stories, followed by three focused RAG
              experiments. Every card opens a real repository or a deeper
              walkthrough.
            </p>
          </div>
          <aside className={styles.heroPip} aria-label="A note from Pip">
            <div className={styles.heroSpeech}>
              Six projects. I counted twice. Very professional.
            </div>
            <PipDrawing />
          </aside>
        </div>

        <div className={styles.featuredTopline}>
          <span>
            <BookOpenText size={18} /> THE BIG THREE / FULL FIELD NOTES
          </span>
          <span>01—03</span>
        </div>

        <div className={styles.featuredGrid}>
          {projects.map((project, index) => (
            <article className={styles.featuredCard} key={project.id}>
              <div className={styles.featuredVisual}>
                <ProjectDoodle variant={project.visual} />
                <span className={styles.paperLabel}>
                  <i /> COMPLETE
                </span>
              </div>
              <div className={styles.featuredBody}>
                <p className={styles.cardKicker}>
                  0{index + 1} / {project.category}
                </p>
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className={styles.cardLinks}>
                  {project.caseStudyUrl && (
                    <Link href={project.caseStudyUrl}>
                      Read the field notes <ArrowRight size={17} />
                    </Link>
                  )}
                  {project.demoUrl && (
                    <a
                      className={styles.demoLink}
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Try live demo <ArrowUpRight size={17} />
                    </a>
                  )}
                  {project.repositoryUrl && (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={"Open " + project.title + " on GitHub"}
                    >
                      <Github size={17} /> Source
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.directory} aria-labelledby="directory-title">
        <div className={styles.directoryHeading}>
          <div>
            <p className={styles.eyebrow}>THE RAG FIELD CABINET / 04—06</p>
            <h2 id="directory-title">
              Three ways to
              <span>find a useful answer.</span>
            </h2>
          </div>
          <p>
            Same family, different instincts: route the question, review the
            answer, or repair the evidence.
          </p>
        </div>

        <div className={styles.authorshipNote}>
          <TerminalSquare size={26} />
          <p>
            <strong>I designed and built the backend AI architecture</strong>{" "}
            and the original graph workflows. AI helped turn each one into a
            complete application—app infrastructure, frontend and
            documentation—under my direction.
          </p>
          <span>Clear credits. No mystery smoke.</span>
        </div>

        <div className={styles.directoryGrid}>
          {projectDirectory.map((project, index) => (
            <article className={styles.directoryCard} key={project.id}>
              <div className={styles.directoryImage}>
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 720px) 92vw, (max-width: 1100px) 42vw, 31vw"
                />
                <span className={styles.experimentNumber}>0{index + 4}</span>
              </div>
              <div className={styles.directoryBody}>
                <p className={styles.cardKicker}>{project.category}</p>
                <h3>{project.title}</h3>
                <p className={styles.directorySummary}>{project.summary}</p>

                <div className={styles.pipeline} aria-label="Project pipeline">
                  {project.pipeline.map((step, stepIndex) => (
                    <span key={step}>
                      <b>{stepIndex + 1}</b>
                      {step}
                      {stepIndex < project.pipeline.length - 1 && (
                        <ArrowRight aria-hidden="true" />
                      )}
                    </span>
                  ))}
                </div>

                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className={styles.proofLine}>
                  <Route size={17} />
                  <span>{project.proof}</span>
                </div>
                <p className={styles.funnyNote}>{project.note}</p>

                <div className={styles.directoryActions}>
                  <a
                    className={styles.demoLink}
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Try live demo
                    <ArrowUpRight size={18} />
                  </a>
                  <a
                    className={styles.repositoryLink}
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={17} />
                    Inspect repository
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          <Sparkles size={19} />
          <span>More experiments will appear when they stop escaping.</span>
        </div>
        <Link href="/#contact">
          Build something together <ArrowRight size={18} />
        </Link>
      </footer>
    </main>
  );
}
