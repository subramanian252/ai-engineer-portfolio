"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useQuietMotion } from "./scene-art";
import { PipDrawing } from "./pip";

function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 500 180"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M-20 180V95Q-1 60 43 78C34 19 116-3 149 52 177 13 246 30 245 79 289 35 357 65 355 105 398 70 456 94 470 128Q499 117 525 143V180Z"
        fill="currentColor"
      />
      <path
        d="M40 95q-1-16 7-24M148 67q4-8 3-15M238 95q0-11 7-16M347 116q2-9 8-11"
        stroke="#6b8052"
        strokeWidth="2"
        opacity=".22"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChapterTrail({
  caption,
  className = "",
  variant = "cloud",
}: {
  caption: string;
  className?: string;
  variant?: "cloud" | "meadow" | "sunset";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const quiet = useQuietMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const left = useTransform(scrollYProgress, [0.1, 0.9], ["8%", "88%"]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [18, -24, 12, -32],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [-12, 9, -9, 3],
  );
  const leftCloud = useTransform(scrollYProgress, [0, 1], [65, -120]);
  const rightCloud = useTransform(scrollYProgress, [0, 1], [-65, 120]);
  const pathLength = useTransform(scrollYProgress, [0.05, 0.9], [0, 1]);
  const sunY = useTransform(scrollYProgress, [0, 1], [55, -18]);
  return (
    <div
      ref={ref}
      className={`chapter-trail chapter-theme-${variant} ${className}`}
    >
      <div className="chapter-stage" aria-hidden="true">
        <motion.div className="chapter-sun" style={{ y: quiet ? 0 : sunY }}>
          <span>⌣</span>
        </motion.div>
        <svg
          className="chapter-route"
          viewBox="0 0 1200 180"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M20 135C210 190 230 5 435 85S625 181 773 102 1040 43 1180 70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeDasharray="4 9"
            style={{ pathLength: quiet ? 1 : pathLength }}
          />
        </svg>
        <motion.div
          className="chapter-cloud chapter-cloud-left"
          style={{ x: quiet ? 0 : leftCloud }}
        >
          <Cloud />
        </motion.div>
        <motion.div
          className="chapter-cloud chapter-cloud-right"
          style={{ x: quiet ? 0 : rightCloud }}
        >
          <Cloud />
        </motion.div>
        <motion.div
          className="chapter-rider"
          style={{
            left: quiet ? "50%" : left,
            y: quiet ? 0 : y,
            rotate: quiet ? 0 : rotate,
          }}
        >
          <div className="rider-bob">
            <PipDrawing />
            <svg className="rider-plane" viewBox="0 0 160 70">
              <path
                d="m5 9 150 24-98 33 5-26Z"
                fill="#f0bf88"
                stroke="#4a5f40"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="m62 40 93-7-98 33"
                fill="#fff4d4"
                stroke="#4a5f40"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
        <span className="chapter-spark spark-one">✦</span>
        <span className="chapter-spark spark-two">✧</span>
        {variant === "meadow" && (
          <div className="chapter-sprouts">
            <span>✳</span>
            <span>✳</span>
            <span>✳</span>
          </div>
        )}
      </div>
      <span className="chapter-caption">{caption}</span>
    </div>
  );
}

export function CloudEdge() {
  const ref = useRef<HTMLDivElement>(null);
  const quiet = useQuietMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const opposite = useTransform(x, (v) => -v);
  return (
    <div ref={ref} className="cloud-edge" aria-hidden="true">
      <motion.div style={{ x: quiet ? 0 : x }}>
        <Cloud />
      </motion.div>
      <motion.div style={{ x: quiet ? 0 : opposite }}>
        <Cloud />
      </motion.div>
    </div>
  );
}
