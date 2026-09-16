"use client";

import { useEffect, useRef, type CSSProperties } from "react";

// Nine fireflies: half the previous density. Phones display four.
const positions = [
  [8, 22],
  [78, 63],
  [38, 76],
  [92, 34],
  [18, 52],
  [64, 16],
  [48, 43],
  [7, 87],
  [86, 88],
];

export function AmbientFireflies() {
  const field = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function syncVisibility() {
      if (field.current)
        field.current.dataset.sleeping = String(document.hidden);
    }
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () =>
      document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  return (
    <div className="ambient-world" ref={field} aria-hidden="true">
      <div className="ambient-fireflies">
        {positions.map(([x, y], index) => (
          <span
            className="firefly"
            key={index}
            style={
              {
                left: `${x}%`,
                top: `${y}%`,
                "--fly-size": `${2 + (index % 3)}px`,
                "--fly-travel": `${18 + (index % 5) * 4}vw`,
                "--fly-rise": `${14 + (index % 4) * 5}vh`,
                "--fly-duration": `${26 + (index % 7) * 3}s`,
                "--fly-delay": `${-index * 4.7}s`,
                "--glow-duration": `${3.4 + (index % 4) * 0.8}s`,
              } as CSSProperties
            }
          >
            <i className="firefly-light" />
          </span>
        ))}
      </div>
    </div>
  );
}
