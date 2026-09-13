"use client";

import { useState, type ReactNode, type CSSProperties } from "react";

export function ToolSticker({
  name,
  hint,
  children,
  index,
}: {
  name: string;
  hint: string;
  children: ReactNode;
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      className="stack-tool tool-sticker"
      aria-label={flipped ? `${name}: ${hint}. Show icon` : `Explore ${name}`}
      aria-pressed={flipped}
      data-flipped={flipped}
      onClick={() => setFlipped((v) => !v)}
      style={{ "--sticker-order": index } as CSSProperties}
    >
      <span className="tool-front" aria-hidden={flipped}>
        {children}
        <small>tap to explore ↗</small>
      </span>
      <span className="tool-back" aria-hidden={!flipped}>
        <strong>{name}</strong>
        <span>{hint}</span>
        <small>↩ back to tools</small>
      </span>
    </button>
  );
}
