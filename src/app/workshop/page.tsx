import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FolderKanban } from "lucide-react";
import { MissionControl } from "@/components/mission-control";
import { ProjectThemeToggle } from "@/components/project-theme-toggle";
import { getSiteUrl } from "@/lib/site-url";
import { WorkshopIntro } from "./workshop-intro";
import styles from "./page.module.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Pip’s Workshop — AI Mission Control",
  description:
    "Play through six hands-on AI engineering stations, try the controls, and fill Pip’s lab passport.",
  alternates: siteUrl ? { canonical: siteUrl + "/workshop" } : undefined,
  openGraph: {
    type: "website",
    title: "Pip’s Workshop — AI Mission Control",
    description:
      "A playful six-station tour through data, models, retrieval, agents, APIs, and deployment.",
    url: siteUrl ? siteUrl + "/workshop" : undefined,
  },
};

export default function WorkshopPage() {
  return (
    <>
      <a className={styles.skipLink} href="#workshop-main">
        Skip to the workshop
      </a>
      <main id="workshop-main" className={styles.page}>
        <header className={styles.siteHeader}>
          <Link href="/" className={styles.brand}>
            <span className={styles.brandMark}>
              s<span>m</span>
            </span>
            <span>
              SUBRAMANIAN
              <small>AI ENGINEER / PIP’S WORKSHOP</small>
            </span>
          </Link>
          <nav className={styles.headerActions} aria-label="Workshop navigation">
            <Link href="/">
              <ArrowLeft size={17} /> Home garden
            </Link>
            <Link href="/projects">
              <FolderKanban size={17} /> Projects
            </Link>
            <ProjectThemeToggle />
          </nav>
        </header>

        <WorkshopIntro />

        <div className={styles.controlRoomBridge} aria-hidden="true">
          <span>CONTROL ROOM / SAFETY THIRD</span>
          <i />
          <span>SCROLL TO CLOCK IN ↓</span>
        </div>

        <MissionControl />

        <section className={styles.afterShift} aria-labelledby="after-shift-title">
          <div>
            <p className={styles.eyebrow}>SHIFT COMPLETE / PROBABLY</p>
            <h2 id="after-shift-title">
              Keyboard intact?
              <span>Excellent work.</span>
            </h2>
          </div>
          <div className={styles.afterShiftCopy}>
            <p>
              The machines are playful simulations, but the ideas behind them
              are real. See where those ideas became working applications.
            </p>
            <Link href="/projects">
              Browse all projects <ArrowRight size={19} />
            </Link>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Subramanian M</span>
          <span>Pip is now pretending to do inventory.</span>
          <Link href="/">Return to the garden ↑</Link>
        </footer>
      </main>
    </>
  );
}
