"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useQuietMotion } from "./scene-art";
import { useRef, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useQuietMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 58%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [72, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0.45, 1]);
  return (
    <motion.div
      ref={ref}
      className={"scroll-reveal " + className}
      initial={false}
      style={{
        y: reduced ? 0 : y,
        rotate: reduced ? 0 : rotate,
        scale: reduced ? 1 : scale,
        opacity: reduced ? 1 : opacity,
      }}
    >
      {children}
    </motion.div>
  );
}
