import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PipDrawing } from "@/components/pip";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.note}>
        <span className={styles.stamp}>404 / A SMALL DETOUR</span>
        <div className={styles.pip}>
          <PipDrawing />
        </div>
        <h1>
          Even Pip gets <em>a little lost.</em>
        </h1>
        <p>This page wandered off the map. The workshop is right this way.</p>
        <Link href="/" className="ink-button">
          <ArrowLeft size={19} /> Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
