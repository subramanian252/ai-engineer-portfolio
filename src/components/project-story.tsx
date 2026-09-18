import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Github,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import Link from "next/link";
import { ProjectThemeToggle } from "@/components/project-theme-toggle";
import styles from "@/app/projects/lazychat/page.module.css";

export type StoryFeature = {
  icon: LucideIcon;
  number: string;
  title: string;
  text: string;
  note: string;
};

export type StoryConcept = {
  eyebrow: string;
  title: string;
  body: string;
  steps: { icon: LucideIcon; label: string }[];
  tags?: string[];
};

export type ProjectStory = {
  number: string;
  name: string;
  heroEyebrow: string;
  headline: string;
  lede: string;
  repositoryUrl: string;
  sourceLabel: string;
  futureLabel: string;
  futureNote: string;
  consoleLabel: string;
  consoleStatus: string;
  consolePrompt: string;
  drawingLabel: string;
  drawingDescription: string;
  drawing: ReactNode;
  builderNote: ReactNode;
  builderAside: string;
  featureEyebrow: string;
  featureTitle: string;
  featureIntro: string;
  features: StoryFeature[];
  flowEyebrow: string;
  flowTitle: string;
  flow: [string, string][];
  flowCaption: string;
  concepts: StoryConcept[];
  toolsEyebrow: string;
  toolsTitle: string;
  tools: string[];
  toolsNote: string;
  backendTitle: string;
  backendText: string;
  backendItems: string[];
  frontendTitle: string;
  frontendText: string;
  frontendItems: string[];
  boundaryEyebrow: string;
  boundaryTitle: string;
  boundaryText: string;
  boundaryIcon: LucideIcon;
  finalEyebrow: string;
  finalTitle: string;
  footerLine: string;
};

function FutureButton({
  label,
  compact = false,
}: {
  label: string;
  compact?: boolean;
}) {
  return (
    <span
      className={compact ? styles.futureButtonCompact : styles.futureButton}
      aria-disabled="true"
      title="The public demo will be connected later"
    >
      <Sparkles size={18} />
      <span>{compact ? "Demo coming soon" : label}</span>
      {!compact && <em>COMING SOON</em>}
    </span>
  );
}

export function ProjectStoryPage({ story }: { story: ProjectStory }) {
  const BoundaryIcon = story.boundaryIcon;
  return (
    <main className={styles.page}>
      <header className={styles.siteHeader}>
        <Link href="/projects" className={styles.backLink}>
          <ArrowLeft size={18} /> Back to all projects
        </Link>
        <div className={styles.headerActions}>
          <ProjectThemeToggle />
          <a href={story.repositoryUrl} target="_blank" rel="noreferrer">
            <Github size={18} /> GitHub
          </a>
        </div>
      </header>

      <article>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              PROJECT {story.number} / {story.heroEyebrow}
            </p>
            <h1>
              Meet {story.name}.
              <span>{story.headline}</span>
            </h1>
            <p className={styles.lede}>{story.lede}</p>
            <div className={styles.heroActions}>
              <a
                className={styles.primaryButton}
                href={story.repositoryUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={19} /> {story.sourceLabel}{" "}
                <ArrowRight size={18} />
              </a>
              <FutureButton label={story.futureLabel} />
            </div>
            <p className={styles.futureNote}>
              <Clock3 size={15} /> {story.futureNote}
            </p>
          </div>

          <div className={styles.consoleCard}>
            <div className={styles.consoleTopline}>
              <span>
                <i /> {story.consoleLabel}
              </span>
              <span>{story.consoleStatus}</span>
            </div>
            <svg
              className={styles.heroDrawing}
              viewBox="0 0 720 450"
              role="img"
              aria-labelledby={`${story.name}-drawing-title ${story.name}-drawing-description`}
            >
              <title id={`${story.name}-drawing-title`}>
                {story.drawingLabel}
              </title>
              <desc id={`${story.name}-drawing-description`}>
                {story.drawingDescription}
              </desc>
              {story.drawing}
            </svg>
            <div className={styles.consolePrompt}>
              <Sparkles size={20} />
              <span>{story.consolePrompt}</span>
              <ArrowRight size={19} />
            </div>
          </div>
        </section>

        <section className={styles.openingNote}>
          <p className={styles.noteLabel}>A NOTE FROM THE BUILDER</p>
          <p>{story.builderNote}</p>
          <span className={styles.handNote}>{story.builderAside}</span>
        </section>

        <section
          className={styles.featureSection}
          aria-labelledby={`${story.name}-features`}
        >
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{story.featureEyebrow}</p>
            <h2 id={`${story.name}-features`}>{story.featureTitle}</h2>
            <p>{story.featureIntro}</p>
          </div>
          <div className={styles.featureGrid}>
            {story.features.map((feature) => {
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

        <section className={styles.flowSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>{story.flowEyebrow}</p>
            <h2>{story.flowTitle}</h2>
          </div>
          <div className={styles.flowTrack}>
            {story.flow.map(([name, job], index) => (
              <div className={styles.flowStop} key={name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{name}</strong>
                <small>{job}</small>
                {index < story.flow.length - 1 && (
                  <ArrowRight aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
          <p className={styles.flowCaption}>{story.flowCaption}</p>
        </section>

        {story.concepts.map((concept) => (
          <section className={styles.ragSection} key={concept.title}>
            <div className={styles.ragCopy}>
              <p className={styles.eyebrow}>{concept.eyebrow}</p>
              <h2>{concept.title}</h2>
              <p>{concept.body}</p>
              {concept.tags && (
                <div className={styles.fileTypes}>
                  {concept.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.ragMachine}>
              {concept.steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} style={{ display: "contents" }}>
                    <div>
                      <Icon />
                      <span>{step.label}</span>
                    </div>
                    {index < concept.steps.length - 1 && <ArrowRight />}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <section className={styles.toolsSection}>
          <div>
            <p className={styles.eyebrow}>{story.toolsEyebrow}</p>
            <h2>{story.toolsTitle}</h2>
          </div>
          <div className={styles.toolBelt}>
            {story.tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
          <p className={styles.toolNote}>{story.toolsNote}</p>
        </section>

        <section className={styles.stackSection}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>WHO BUILT WHAT</p>
            <h2>A clear credit line. One connected product.</h2>
          </div>
          <div className={styles.stackColumns}>
            <article className={styles.backendCard}>
              <span className={styles.buildBadge}>BACKEND / BUILT BY ME</span>
              <TerminalSquare size={32} />
              <h3>{story.backendTitle}</h3>
              <p>{story.backendText}</p>
              <ul>
                {story.backendItems.map((item) => (
                  <li key={item}>
                    <Check /> {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className={styles.frontendCard}>
              <span className={styles.buildBadge}>
                FRONTEND / BUILT WITH AI
              </span>
              <Sparkles size={32} />
              <h3>{story.frontendTitle}</h3>
              <p>{story.frontendText}</p>
              <ul>
                {story.frontendItems.map((item) => (
                  <li key={item}>
                    <Check /> {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <p className={styles.authorshipNote}>
            The backend was designed and built entirely by Subramanian. The
            frontend was built with AI and connected to the backend under his
            direction.
          </p>
        </section>

        <section className={styles.boundarySection}>
          <BoundaryIcon />
          <div>
            <p className={styles.eyebrow}>{story.boundaryEyebrow}</p>
            <h2>{story.boundaryTitle}</h2>
            <p>{story.boundaryText}</p>
          </div>
        </section>

        <section className={styles.finalCta}>
          <Sparkles size={42} />
          <div>
            <p className={styles.eyebrow}>{story.finalEyebrow}</p>
            <h2>{story.finalTitle}</h2>
          </div>
          <div className={styles.finalActions}>
            <a href={story.repositoryUrl} target="_blank" rel="noreferrer">
              <Github /> View on GitHub <ArrowRight />
            </a>
            <FutureButton label={story.futureLabel} compact />
          </div>
        </section>
      </article>

      <footer className={styles.footer}>
        <Link href="/#projects">
          <ArrowLeft size={17} /> Back to all projects
        </Link>
        <span>{story.footerLine}</span>
      </footer>
    </main>
  );
}
