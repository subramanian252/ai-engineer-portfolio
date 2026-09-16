import type { StationId } from "./mission-control-data";

export function MachineDrawing({ id }: { id: StationId }) {
  return (
    <svg
      className="mc-machine"
      viewBox="0 0 180 140"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse
        cx="90"
        cy="131"
        rx="67"
        ry="5"
        fill="currentColor"
        stroke="none"
        opacity=".09"
      />
      {id === "data" && (
        <>
          <path d="M30 39h119v83H30Z" className="mc-fill" />
          <path d="M30 56h119M41 45h17" />
          <circle cx="139" cy="47" r="3" className="mc-lamp" />
          <circle cx="91" cy="88" r="26" className="mc-paper-fill" />
          <g className="mc-spinner">
            <path d="M76 78q18-18 30 4M107 98q-18 18-30-4" />
            <path d="m99 76 7 6 2-8m-25 26-6-6-1 8" />
          </g>
          <path d="m37 9 28 5-4 29-29-4Z" className="mc-paper-fill" />
          <path d="m42 20 12 2m-13 5 11 2" />
          <path d="M23 121h132v8H23Z" className="mc-fill" />
        </>
      )}
      {id === "model" && (
        <>
          <rect
            x="21"
            y="22"
            width="138"
            height="91"
            rx="16"
            className="mc-fill"
          />
          <rect
            x="32"
            y="33"
            width="116"
            height="65"
            rx="7"
            className="mc-paper-fill"
          />
          <path d="M41 45v48h99" opacity=".4" />
          <path className="mc-ink-trace" d="m46 50 16 17 19 9 16 8 20 3 18 3" />
          <path
            d="m46 53 17 16 18 8 17 3 19-9 18-7"
            className="mc-alert-stroke"
            strokeDasharray="4 5"
          />
          <path d="M47 114v12m86-12v12M39 126h103" />
          <circle cx="137" cy="104" r="3" className="mc-lamp" />
        </>
      )}
      {id === "rag" && (
        <>
          <path d="M31 20h116v104H31Z" className="mc-fill" />
          <path d="M26 20h126" />
          <path
            d="M38 57h103M38 91h103M44 29v21h17V29Zm22 0v21h15V29Zm22 0v21h13V29Zm20 1 8 20 13-5-8-20Z"
            className="mc-paper-fill"
          />
          <path
            d="M45 67h51v16H45Zm67-3h18v19h-18Z"
            className="mc-paper-fill"
          />
          <path d="M57 101h76v37H57Z" className="mc-paper-fill" />
          <path d="M70 112h47m-47 9h35" />
          <circle cx="127" cy="12" r="6" className="mc-lamp" />
        </>
      )}
      {id === "agents" && (
        <>
          <path d="m27 91 19-14h98l13 14v32H27Z" className="mc-fill" />
          <path d="M27 91h130M45 104h23m52 0h20" />
          <rect
            x="54"
            y="26"
            width="76"
            height="61"
            rx="22"
            className="mc-paper-fill"
          />
          <rect
            x="62"
            y="34"
            width="60"
            height="42"
            rx="15"
            className="mc-screen-fill"
          />
          <g className="mc-bot-eyes">
            <path
              d="M79 48v10m26-10v10M87 65q6 6 12 0"
              className="mc-eye-stroke"
            />
          </g>
          <path d="M91 26V14" />
          <circle cx="91" cy="10" r="4" className="mc-lamp" />
          <path className="mc-little-arm" d="m131 68 15-10 7 6" />
          <circle cx="89" cy="110" r="5" className="mc-lamp" />
        </>
      )}
      {id === "guardrails" && (
        <>
          <path
            d="M29 126V35q0-17 17-17h89q17 0 17 17v91h-17V38H46v88Z"
            className="mc-fill"
          />
          <path
            d="m90 48 29 10v24q0 25-29 35-29-10-29-35V58Z"
            className="mc-paper-fill"
          />
          <path className="mc-ink-trace" d="m76 80 10 10 19-24" />
          <circle cx="90" cy="27" r="4" className="mc-lamp" />
          <path d="M23 126h30m78 0h28M36 43v64m108-64v64" opacity=".5" />
        </>
      )}
      {id === "api" && (
        <>
          <path
            d="M30 46q0-25 25-25h75q25 0 25 25v62H30Z"
            className="mc-fill"
          />
          <path d="M55 21q25 0 25 25v62M41 53h25" />
          <path d="M83 108v18h33v-18M77 127h46" />
          <path d="m10 70 46-9 7 35-46 9Z" className="mc-paper-fill" />
          <path d="m13 73 26 12 17-21" />
          <path d="M132 52V9h28v17h-28" className="mc-paper-fill" />
          <circle cx="141" cy="90" r="4" className="mc-lamp" />
        </>
      )}
      {id === "mlops" && (
        <>
          <path d="M20 75h140v47H20Z" className="mc-fill" />
          <path
            d="M30 83v30m13-30v30m13-30v30m13-30v30m13-30v30m13-30v30m13-30v30m13-30v30m13-30v30m13-30v30"
            opacity=".4"
          />
          <path d="M34 74V13h109M42 20h101M112 20v21l-8 9 8 7 8-7" />
          <path d="M80 51h28v23H80Z" className="mc-paper-fill" />
          <path d="m80 51 13-9 28 1-13 8m0 0 13-8v25l-13 6" />
          <path d="M15 124h150" />
          <circle cx="43" cy="128" r="5" className="mc-paper-fill" />
          <circle cx="138" cy="128" r="5" className="mc-paper-fill" />
        </>
      )}
      {id === "monitoring" && (
        <>
          <path d="M29 46h123v76H29Z" className="mc-fill" />
          <path d="M22 46 40 31h96l23 15Z" className="mc-paper-fill" />
          <path d="M47 88a28 28 0 0 1 56 0" className="mc-paper-fill" />
          <path className="mc-gauge-hand" d="m75 86 16-20" />
          <circle cx="75" cy="86" r="4" className="mc-screen-fill" />
          <path d="M45 105h60M117 66h22m-22 10h22m-22 10h22" />
          <circle cx="130" cy="106" r="5" className="mc-lamp" />
          <path d="M85 31V15m-19 0h38" />
          <path d="m59 11 6 4-6 4m52-8-6 4 6 4" />
        </>
      )}
    </svg>
  );
}
