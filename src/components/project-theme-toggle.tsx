"use client";

import { Moon, Sun } from "lucide-react";

export function ProjectThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    root.dataset.theme = root.dataset.theme === "night" ? "day" : "night";
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
