"use client";

import { Moon, Sun } from "lucide-react";

export function ProjectThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const theme = root.dataset.theme === "night" ? "day" : "night";
    root.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {}
  }

  return (
    <button
      type="button"
      className="project-theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
    >
      <span className="project-theme-day">
        <Moon size={17} />
        <span>Night shift</span>
      </span>
      <span className="project-theme-night">
        <Sun size={17} />
        <span>Day shift</span>
      </span>
    </button>
  );
}
