"use client";

import { useEffect, useRef, useState } from "react";
import { Map, X, ArrowUpRight } from "lucide-react";

const stops = [
  {
    id: "projects",
    name: "The idea garden",
    note: "Things I’m building",
    kind: "garden",
    x: 26,
    y: 28,
  },
  {
    id: "about",
    name: "The story studio",
    note: "How I got here",
    kind: "studio",
    x: 73,
    y: 23,
  },
  {
    id: "stack",
    name: "The tool shed",
    note: "My everyday companions",
    kind: "tools",
    x: 32,
    y: 72,
  },
  {
    id: "contact",
    name: "The next chapter",
    note: "Say a little hello",
    kind: "post",
    x: 79,
    y: 69,
  },
];

function Landmark({ kind }: { kind: string }) {
  return (
    <svg
      viewBox="0 0 110 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse
        cx="55"
        cy="89"
        rx="42"
        ry="7"
        fill="#43563b"
        opacity=".1"
        stroke="none"
      />
      {kind === "garden" && (
        <>
          <path d="M21 52 53 18 87 51v35H21Z" fill="#f1e6c6" />
          <path d="M16 53 53 13 93 52M53 21v65M24 54h61" />
          <path d="M32 85V67h42v18" fill="#b8ce93" />
          <path
            d="M55 66V48m0 10c-18 0-20-12-20-12 16-4 21 8 20 12Zm0-6c1-12 17-13 17-13-1 12-17 13-17 13Z"
            fill="#83a66a"
          />
          <path d="M25 73h9m39 0h9" opacity=".4" />
        </>
      )}
      {kind === "studio" && (
        <>
          <path d="M23 45h65v42H23Z" fill="#e9c6a4" />
          <path d="m17 46 38-26h58L88 46Z" fill="#9aaf86" />
          <path d="M35 87V62h21v25" fill="#fff6dc" />
          <path d="M67 59h13v13H67Z" fill="#fff1c6" />
          <path d="M75 31V15h9v16" fill="#e9c6a4" />
          <path className="map-chimney" d="M77 8c10-8-6-12 3-20" opacity=".4" />
          <circle cx="50" cy="74" r="1" fill="currentColor" />
        </>
      )}
      {kind === "tools" && (
        <>
          <path
            d="M18 48Q18 43 24 43h61q7 0 7 7v33q0 5-7 5H24q-6 0-6-5Z"
            fill="#d8ac78"
          />
          <path d="M37 43V30q0-5 5-5h28q5 0 5 5v13h-9V35H46v8" fill="#f5e1bc" />
          <path d="M18 60q39 15 74 0" />
          <path d="M49 61h14v15H49Z" fill="#fff5db" />
          <path d="m32 31-7-15m-3-5 5 9m1-11 1 8M81 32l9-18m-4-3 8 4" />
          <path d="M33 77h7m35 0h7" opacity=".4" />
        </>
      )}
      {kind === "post" && (
        <>
          <path d="M53 60h10v30H53Z" fill="#c89d72" />
          <path d="M23 34q0-17 16-17h36q17 0 17 17v30H23Z" fill="#dda079" />
          <path d="M23 34q0-17 16-17t16 17v30M31 40h17" />
          <path d="M82 29V8h15v12H82" fill="#839c69" />
          <path
            className="map-letter"
            d="m11 47 21-7 6 20-21 7Z"
            fill="#fff8e3"
          />
          <path d="m12 48 14 6 7-13" />
        </>
      )}
    </svg>
  );
}

export function FieldGuide() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const navigating = useRef(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  function close() {
    dialog.current?.close();
  }
  return (
    <>
      <button
        className="field-guide-trigger"
        ref={trigger}
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Map size={19} />
        <span>Open my field guide</span>
        <ArrowUpRight size={17} />
      </button>
      <dialog
        className="field-guide"
        ref={dialog}
        aria-labelledby="guide-title"
        onClose={() => {
          setOpen(false);
          if (!navigating.current) trigger.current?.focus();
          navigating.current = false;
        }}
        onPointerDown={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="guide-book">
          <button
            className="guide-close dialog-close"
            onClick={close}
            aria-label="Close field guide"
          >
            <X size={22} />
          </button>
          <div className="guide-intro">
            <span className="guide-edition">FIELD NOTES / VOL. 01</span>
            <span className="guide-compass" aria-hidden="true">
              ✳
            </span>
            <h2 id="guide-title">
              Take the
              <br />
              <em>scenic route.</em>
            </h2>
            <p>
              A few places to explore. <br />A little bit of me in each.
            </p>
            <span className="guide-signature">Subramanian</span>
            <span className="guide-origin">
              Made of curiosity.
              <br />
              Rooted in Coimbatore, India.
            </span>
          </div>
          <div className="guide-map-page">
            <span className="map-handnote">
              Pick a place. I’ll meet you there. ↘
            </span>
            <div className="guide-map">
              <svg
                className="map-terrain"
                viewBox="0 0 600 480"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M49 144C5 68 122 15 207 30S381-2 469 50s126 112 94 176 45 147-60 183-88 42-191 32S141 482 83 416-1 294 37 248s25-63 12-104Z"
                  fill="#e6e9d0"
                  stroke="#97a477"
                  strokeWidth="1.5"
                />
                <path
                  d="M23 295c105 51 169-13 202-81S361 190 338 87 403 49 423 15"
                  stroke="#b7d0c5"
                  strokeWidth="25"
                />
                <path
                  d="M146 123C189 11 395 14 440 125S310 185 210 214 95 296 169 347s209 63 312-7"
                  stroke="#c59164"
                  strokeWidth="4"
                  strokeDasharray="2 10"
                  strokeLinecap="round"
                />
                <g stroke="#7e9166" strokeWidth="1.5">
                  <path
                    d="m264 89 21-40 25 40Zm30 0 16-31 17 31Z"
                    fill="#d4ddbf"
                  />
                  <path
                    d="m49 363 11-25 12 25Zm14 7 11-26 13 26Zm434-174 12-24 11 24Zm17 8 13-28 14 28Z"
                    fill="#a4bc87"
                  />
                  <path d="m104 240 8-7 8 7m367 154 8-7 8 7" />
                  <path d="M266 388v19m-7-11 7-8 7 8M347 248v15m-6-9 6-6 6 6" />
                </g>
                <g
                  transform="translate(515 60)"
                  stroke="#859367"
                  strokeWidth="1.5"
                >
                  <circle r="21" />
                  <path
                    d="M0-28v56M-28 0h56m-5-16L5 5-16 16-5-5Z"
                    fill="#d1af7c"
                  />
                </g>
              </svg>
              {stops.map((stop, index) => (
                <a
                  key={stop.id}
                  href={"#" + stop.id}
                  onClick={() => {
                    navigating.current = true;
                    close();
                  }}
                  className={"map-stop map-stop-" + stop.kind}
                  style={{ left: stop.x + "%", top: stop.y + "%" }}
                >
                  <Landmark kind={stop.kind} />
                  <span className="map-stop-name">
                    <small>0{index + 1}</small>
                    {stop.name}
                  </span>
                  <span className="map-stop-note">{stop.note}</span>
                </a>
              ))}
            </div>
            <span className="map-footnote">
              Not to scale. Very much to heart.
            </span>
          </div>
        </div>
      </dialog>
    </>
  );
}
