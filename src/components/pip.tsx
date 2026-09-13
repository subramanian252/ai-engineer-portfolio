"use client";

import { useState } from "react";

export function PipDrawing({ className = "" }: { className?: string }) {
  return (
    <svg
      className={"pip-drawing " + className}
      viewBox="0 0 180 200"
      fill="none"
      aria-hidden="true"
    >
      <ellipse
        className="pip-shadow"
        cx="90"
        cy="186"
        rx="43"
        ry="7"
        fill="#2c4535"
        opacity=".14"
      />
      <g
        className="pip-body"
        stroke="#304332"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M62 144C53 161 48 177 66 179 78 180 79 166 80 161M108 157C109 174 115 183 129 175 139 168 126 153 124 148"
          fill="#eddbb6"
        />
        <rect x="52" y="115" width="76" height="54" rx="26" fill="#f7ead0" />
        <path
          d="M47 125C27 124 18 141 29 149 37 155 49 146 55 138"
          fill="#eddbb6"
        />
        <g className="pip-arm">
          <path
            d="M128 131C145 134 161 119 153 108 147 99 133 112 126 117"
            fill="#eddbb6"
          />
        </g>
        <g className="pip-sprout">
          <path d="M90 44C92 23 84 17 75 13" />
          <path d="M85 29C60 30 51 13 54 5 75 3 89 15 85 29Z" fill="#9eb669" />
          <path
            d="M91 34C92 15 115 8 126 14 120 32 103 38 91 34Z"
            fill="#bccf89"
          />
        </g>
        <rect x="30" y="38" width="120" height="96" rx="43" fill="#fff1d7" />
        <path
          d="M42 75C45 50 68 47 91 48 128 47 140 64 140 86 141 113 122 121 90 120 53 120 40 104 42 75Z"
          fill="#304a38"
        />
        <g className="pip-eyes" stroke="none">
          <ellipse cx="70" cy="81" rx="7" ry="12" fill="#ffe6a3" />
          <ellipse cx="111" cy="81" rx="7" ry="12" fill="#ffe6a3" />
        </g>
        <ellipse cx="56" cy="99" rx="8" ry="4" fill="#ef986b" stroke="none" />
        <ellipse cx="125" cy="99" rx="8" ry="4" fill="#ef986b" stroke="none" />
        <path d="M82 99Q91 111 101 99" stroke="#ffe6a3" strokeWidth="3" />
        <path
          d="M80 145C80 134 92 135 92 143 92 135 105 135 104 144 103 151 92 157 92 157S81 151 80 145Z"
          fill="#db9d6e"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

const greetings = [
  "Hi, I’m Pip! Give me a boop.",
  "Boop received. Curiosity +1!",
  "Tiny robot. Very big ideas.",
  "Currently powered by sunshine.",
  "One more experiment? Always.",
];

export function Pip({ className = "" }: { className?: string }) {
  const [boops, setBoops] = useState(0);
  return (
    <div className={"pip-companion " + className}>
      <span className="pip-speech" role="status">
        {greetings[boops % greetings.length]}
      </span>
      <button
        type="button"
        className="pip-button"
        aria-label="Boop Pip the robot"
        onClick={() => setBoops((v) => v + 1)}
      >
        <span key={boops} className={boops ? "pip-booped" : ""}>
          <PipDrawing />
          {boops > 0 && (
            <span className="pip-sparks" aria-hidden="true">
              <i>✦</i>
              <i>✦</i>
              <i>✧</i>
              <i>♡</i>
            </span>
          )}
        </span>
      </button>
    </div>
  );
}
