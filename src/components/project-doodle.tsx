"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { useQuietMotion } from "./scene-art";

export function ProjectDoodle({
  variant,
}: {
  variant: "chat" | "travel" | "writer";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "80px" });
  const quiet = useQuietMotion();
  return (
    <div
      ref={ref}
      className={`project-doodle doodle-${variant}`}
      data-playing={visible && !quiet}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 360 280"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {variant === "chat" && (
          <>
            <ellipse
              cx="180"
              cy="236"
              rx="64"
              ry="7"
              fill="currentColor"
              opacity=".08"
              stroke="none"
            />
            <g className="doodle-float">
              <path
                d="M88 95Q84 75 108 75H251Q275 75 273 99L269 166Q268 189 245 190H157L118 215 121 188H109Q86 188 87 166Z"
                fill="#fff8e9"
              />
              <path d="M121 111Q127 103 133 111M228 111Q234 103 240 111" />
              <path d="M164 112Q179 128 193 112" strokeWidth="2.5" />
              <g fill="#c28157" stroke="none">
                <circle className="typing-dot" cx="155" cy="151" r="5" />
                <circle className="typing-dot" cx="180" cy="151" r="5" />
                <circle className="typing-dot" cx="205" cy="151" r="5" />
              </g>
            </g>
            <path
              className="doodle-twinkle"
              d="m288 49 3 10 10 3-10 3-3 10-3-10-10-3 10-3Z"
              strokeWidth="2"
            />
          </>
        )}
        {variant === "travel" && (
          <>
            <g className="doodle-map">
              <path
                d="m91 101 60-18 57 19 59-18-1 122-59 17-57-18-61 17Z"
                fill="#fff9e9"
              />
              <path d="m151 83-1 122m58-103-1 121" opacity=".3" />
              <path
                d="M112 181C148 131 155 209 192 160S242 167 245 126"
                strokeDasharray="3 8"
                strokeWidth="2"
                opacity=".55"
              />
              <g className="doodle-pin" fill="#db9973">
                <path d="M177 89C177 58 221 58 221 89 221 107 199 123 199 123S177 107 177 89Z" />
                <circle cx="199" cy="87" r="7" fill="#fff9e9" />
              </g>
            </g>
            <g className="doodle-plane">
              <path d="m261 50 44 12-32 21-1-16Z" fill="#f2d49e" />
              <path d="m272 67 33-5" strokeWidth="1.7" />
            </g>
          </>
        )}
        {variant === "writer" && (
          <>
            <g transform="rotate(-7 177 145)">
              <rect
                x="105"
                y="65"
                width="143"
                height="158"
                rx="10"
                fill="#fff9ed"
              />
              <path d="M126 66v156" opacity=".3" />
              {[87, 112, 137, 162, 187, 211].map((y) => (
                <path key={y} d={`M97 ${y}h14`} />
              ))}
              <g className="doodle-writing" strokeWidth="3">
                <path d="M145 109h65" />
                <path d="M145 132h78" />
                <path d="M145 155h57" />
              </g>
              <path d="M154 189q7-10 14 0t14 0" opacity=".4" strokeWidth="2" />
            </g>
            <g className="doodle-pencil">
              <path d="m218 72 15-10 58 89-16 10Z" fill="#e4bb7c" />
              <path d="m275 161 16-10 3 22Z" fill="#fff6e3" />
              <path d="m289 166 5 7-1-9" fill="currentColor" />
              <path d="m221 77 15-10" />
            </g>
            <path
              className="doodle-twinkle"
              d="m78 60 3 10 10 3-10 3-3 10-3-10-10-3 10-3Z"
              strokeWidth="2"
            />
          </>
        )}
      </svg>
      <span>
        {variant === "chat"
          ? "a little hello goes a long way"
          : variant === "travel"
            ? "oh, the places we could go"
            : "it starts with a tiny idea"}
      </span>
    </div>
  );
}
