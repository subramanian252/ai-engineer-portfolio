"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { X } from "lucide-react";
import { PipDrawing } from "./pip";

const chapters = [
  { selector: ".living-hero", line: "Hi, I’m Pip. Your tiny tour guide." },
  { selector: "#projects", line: "I named the bugs. We’re coworkers now." },
  { selector: "#about", line: "Plot twist: he used to edit videos." },
  { selector: "#stack", line: "He knows too many frameworks." },
  {
    selector: "#mission-control",
    line: "I pushed the big button. For science.",
  },
  { selector: "#contact", line: "You came this far. Just hire him." },
];

export function ScrollCompanion({
  buttonRef,
  open,
  onOpen,
}: {
  buttonRef: RefObject<HTMLButtonElement | null>;
  open: boolean;
  onOpen: () => void;
}) {
  const [chapter, setChapter] = useState({ index: 0, visit: 0 });
  const [dismissedVisit, setDismissedVisit] = useState<number | null>(null);
  const activeIndex = useRef(0);

  useEffect(() => {
    const sections = chapters.map(({ selector }) =>
      document.querySelector<HTMLElement>(selector),
    );
    let frame = 0;

    function readChapter() {
      frame = 0;
      const readingLine = window.innerHeight * 0.55;
      let next = 0;
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= readingLine)
          next = index;
      });
      // Scroll only changes React state when the reader enters another chapter.
      if (next !== activeIndex.current) {
        activeIndex.current = next;
        setChapter((previous) => ({ index: next, visit: previous.visit + 1 }));
      }
    }

    function scheduleRead() {
      if (!frame) frame = window.requestAnimationFrame(readChapter);
    }

    // Also catches deep links, back navigation and artwork/font layout changes.
    scheduleRead();
    window.addEventListener("scroll", scheduleRead, { passive: true });
    window.addEventListener("resize", scheduleRead);
    const resizeObserver = new ResizeObserver(scheduleRead);
    sections.forEach((section) => {
      if (section) resizeObserver.observe(section);
    });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleRead);
      window.removeEventListener("resize", scheduleRead);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <aside
      className="scroll-companion"
      aria-label="Pip, your portfolio guide"
      data-chat-open={open}
      data-section={chapters[chapter.index].selector.replace(/^[.#]/, "")}
      data-lab-active={chapters[chapter.index].selector === "#mission-control"}
    >
      {dismissedVisit !== chapter.visit && (
        <div className="companion-comment" key={chapter.visit}>
          <p>{chapters[chapter.index].line}</p>
          <button
            type="button"
            className="companion-dismiss"
            aria-label="Hide this comment"
            onClick={() => {
              setDismissedVisit(chapter.visit);
              buttonRef.current?.focus();
            }}
          >
            <X size={13} aria-hidden="true" />
          </button>
        </div>
      )}
      <button
        ref={buttonRef}
        type="button"
        className="companion-button"
        aria-label="Ask Pip about Subramanian"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={onOpen}
      >
        <span className="companion-character" key={chapter.visit}>
          <PipDrawing />
        </span>
        <span className="companion-caption" aria-hidden="true">
          Ask Pip ↗
        </span>
      </button>
    </aside>
  );
}
