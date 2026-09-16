"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent,
} from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { SceneArt, DriftingLeaves, useQuietMotion } from "./scene-art";

// User-supplied night landscape; the original daytime portrait stays unchanged.
const NIGHT_SCENE = "/art/hero.png";
let artworkReady: Promise<void> | undefined;

function prepareNightArtwork() {
  artworkReady ??= Promise.all(
    Array.from(
      document.querySelectorAll<HTMLImageElement>(".scene-image-night"),
    ).map((image) => {
      // Decode the same responsive asset the browser will display, rather than
      // downloading the original PNG again. Keep the crossfade fully loaded.
      image.loading = "eager";
      return image.decode();
    }),
  )
    .then(() => undefined)
    .catch((error) => {
      artworkReady = undefined;
      throw error;
    });
  return artworkReady;
}

export function LivingHero({ children }: { children: ReactNode }) {
  const [night, setNight] = useState(false);
  const quiet = useQuietMotion();
  const changing = useRef(false);
  const [preparing, setPreparing] = useState(false);
  const [themeError, setThemeError] = useState("");

  async function toggleTheme() {
    if (changing.current) return;
    changing.current = true;
    setThemeError("");
    try {
      if (!night) {
        setPreparing(true);
        await prepareNightArtwork();
      }
      document.documentElement.dataset.theme = night ? "day" : "night";
      setNight(!night);
    } catch {
      setThemeError("The night artwork could not load. Please try again.");
    } finally {
      changing.current = false;
      setPreparing(false);
    }
  }

  function warmArtwork() {
    if (!night) void prepareNightArtwork().catch(() => {});
  }
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const x = useSpring(cursorX, { stiffness: 70, damping: 24 });
  const y = useSpring(cursorY, { stiffness: 70, damping: 24 });
  useEffect(() => {
    document.documentElement.dataset.theme = night ? "night" : "day";
  }, [night]);
  function move(event: PointerEvent<HTMLElement>) {
    if (quiet || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    cursorX.set((event.clientX - bounds.left - bounds.width / 2) * -0.012);
    cursorY.set((event.clientY - bounds.top - bounds.height / 2) * -0.012);
  }
  return (
    <section
      className="anime-hero living-hero"
      data-night={night}
      aria-labelledby="hero-title"
      onPointerMove={move}
      onPointerLeave={() => {
        cursorX.set(0);
        cursorY.set(0);
      }}
    >
      <motion.div
        className="hero-depth"
        style={{ x: quiet ? 0 : x, y: quiet ? 0 : y }}
      >
        <SceneArt
          src="/art/anime-rooftop.webp"
          alt="Anime illustration of Subramanian with a laptop overlooking the mountains near his hometown"
          nightSrc={NIGHT_SCENE}
          nightAlt="The same rooftop and mountain landscape at night, without people or a robot"
          priority
        />
      </motion.div>
      <div className="hero-atmosphere hero-atmosphere-day" aria-hidden="true" />
      <div
        className="hero-atmosphere hero-atmosphere-night"
        aria-hidden="true"
      />
      <DriftingLeaves />
      <button
        className="sky-switch"
        onClick={() => void toggleTheme()}
        onPointerEnter={warmArtwork}
        onFocus={warmArtwork}
        aria-busy={preparing}
        aria-label={night ? "Switch to day mode" : "Switch to dark mode"}
        aria-pressed={night}
      >
        <span className="sky-switch-cord" aria-hidden="true" />
        <span className="sky-switch-coin">
          <Sun
            className="theme-icon theme-icon-sun"
            size={33}
            strokeWidth={1.4}
          />
          <Moon
            className="theme-icon theme-icon-moon"
            size={31}
            strokeWidth={1.4}
          />
        </span>
        <span className="sky-switch-note">
          {night ? "a little moonlight…" : "try after hours"}
          <span aria-hidden="true">↖</span>
        </span>
      </button>
      {children}
      <span className="scene-time-note" aria-live="polite">
        {themeError ||
          (preparing
            ? "Preparing the night artwork."
            : night
              ? "Moonlight over the mountains. Night mode."
              : "Golden hour in my little corner of the world.")}
      </span>
    </section>
  );
}
