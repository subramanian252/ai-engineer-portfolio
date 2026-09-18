"use client";

import Image from "next/image";
import { useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "motion/react";

function subscribe(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  window.addEventListener("portfolio-motion-change", callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener("portfolio-motion-change", callback);
  };
}

export function useQuietMotion() {
  return useSyncExternalStore(
    subscribe,
    () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "paused",
    () => true,
  );
}

function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function isNightTheme() {
  return document.documentElement.dataset.theme === "night";
}

export function useNightTheme() {
  return useSyncExternalStore(subscribeTheme, isNightTheme, () => false);
}

export function SceneArt({
  src,
  alt,
  nightSrc,
  nightAlt,
  priority = false,
  sizes = "100vw",
  className = "",
}: {
  src: string;
  alt: string;
  nightSrc?: string;
  nightAlt?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const night = useNightTheme();
  const quiet = useQuietMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  return (
    <div ref={ref} className={"scene-art " + className}>
      <motion.div className="scene-art-layer" style={{ y: quiet ? 0 : y }}>
        <Image
          className={nightSrc ? "scene-image-day" : undefined}
          src={src}
          alt={alt}
          aria-hidden={nightSrc ? night : undefined}
          fill
          preload={priority}
          sizes={sizes}
        />
        {nightSrc && (
          <Image
            className="scene-image-night"
            src={nightSrc}
            alt={nightAlt || alt}
            aria-hidden={!night}
            fill
            loading={priority ? "eager" : "lazy"}
            sizes={sizes}
          />
        )}
      </motion.div>
    </div>
  );
}

export function DriftingLeaves() {
  return (
    <div className="drifting-leaves" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <svg key={i} viewBox="0 0 40 22">
          <path d="M1 18C8-4 27 0 39 2 29 22 11 26 1 18Z" />
          <path
            d="M2 18 34 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}

export function PaperEdge({ className = "" }: { className?: string }) {
  return (
    <svg
      className={"paper-edge " + className}
      aria-hidden="true"
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
    >
      <path
        d="M0 25 28 19 47 24 90 13 131 18 160 12 190 19 215 15 240 23 283 13 321 20 350 11 390 19 421 16 467 26 490 16 528 22 567 10 606 18 647 13 693 24 732 16 766 21 810 10 841 19 881 12 922 23 957 15 992 20 1036 10 1072 21 1118 15 1155 23 1186 13 1225 19 1263 10 1301 20 1346 15 1396 23 1440 15V40H0Z"
        fill="currentColor"
      />
    </svg>
  );
}
