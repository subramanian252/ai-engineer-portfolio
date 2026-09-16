"use client";

import {
  useEffect,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { stations, initialRun, runReducer } from "./mission-control-data";
import { MachineDrawing } from "./mission-machines";
import { StationExperiment } from "./mission-experiments";
import { useQuietMotion } from "./scene-art";
import { PipDrawing } from "./pip";

function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

export function MissionControl() {
  const [run, dispatch] = useReducer(runReducer, initialRun);
  const [inspected, setInspected] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const hidden = useSyncExternalStore(
    subscribeVisibility,
    () => document.hidden,
    () => false,
  );
  const quiet = useQuietMotion();
  const section = useRef<HTMLElement>(null);
  const activeIndex =
    run.status === "running" || run.status === "complete"
      ? run.step
      : inspected;
  const station = activeIndex === null ? null : stations[activeIndex];
  const operating = run.status === "running" && inView && !hidden && !quiet;

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!operating) return;
    const timer = window.setTimeout(() => dispatch({ type: "tick" }), 2300);
    return () => window.clearTimeout(timer);
  }, [operating, run.step]);

  function inspect(index: number) {
    if (run.status === "running") dispatch({ type: "pause" });
    if (run.status === "complete") dispatch({ type: "reset" });
    setInspected(index);
  }
  function closeDetails() {
    if (run.status === "running") dispatch({ type: "pause" });
    if (run.status === "complete") dispatch({ type: "reset" });
    section.current
      ?.querySelector<HTMLButtonElement>(`[data-station="${station?.id}"]`)
      ?.focus();
    setInspected(null);
  }
  function runButton() {
    if (run.status === "running") {
      if (quiet) dispatch({ type: "tick" });
      else {
        setInspected(run.step);
        dispatch({ type: "pause" });
      }
    } else dispatch({ type: run.status === "paused" ? "resume" : "start" });
  }
  const message =
    run.status === "idle"
      ? "Data to production. Select a step to open its experiment."
      : run.status === "complete"
        ? "All eight steps complete. Nothing caught fire. A promising start."
        : run.status === "paused"
          ? "Pipeline paused. Explore a step or resume the run."
          : stations[run.step].run;

  return (
    <section
      ref={section}
      id="mission-control"
      className="mission-control"
      aria-labelledby="mission-title"
      data-operating={operating}
      data-visible={inView && !hidden}
      data-details={!!station}
    >
      <div className="mc-wrap">
        <header className="mc-heading">
          <div>
            <p className="mc-eyebrow">05 / THE LITTLE AI LAB</p>
            <h2 id="mission-title">
              <span>AI Engineer</span> <em>Mission Control.</em>
            </h2>
          </div>
          <div className="mc-main-controls">
            {run.status !== "idle" && (
              <button
                className="mc-reset"
                aria-label="Reset system tour"
                onClick={() => {
                  dispatch({ type: "reset" });
                  setInspected(null);
                }}
              >
                <RotateCcw size={17} />
              </button>
            )}
            <button className="mc-run-button" onClick={runButton}>
              {run.status === "running" && !quiet ? (
                <Pause size={17} />
              ) : (
                <Play size={17} fill="currentColor" />
              )}
              {run.status === "running"
                ? quiet
                  ? "NEXT STEP"
                  : "PAUSE SYSTEM"
                : run.status === "paused"
                  ? "RESUME SYSTEM"
                  : run.status === "complete"
                    ? "RUN IT AGAIN"
                    : "RUN THE SYSTEM"}
            </button>
          </div>
        </header>
        <div className="mc-room">
          <div className="mc-room-topline">
            <span>INPUT → INTELLIGENCE → PRODUCTION</span>
            <span>LOCAL SIMULATION · NO CLOUD BILL</span>
          </div>
          <div
            className="mc-stage"
            role="group"
            aria-label="Eight pipeline steps, left to right"
          >
            {stations.map((item, i) => (
              <button
                key={item.id}
                className="mc-station"
                data-station={item.id}
                data-tint={item.tint}
                data-selected={activeIndex === i}
                data-passed={
                  run.status === "complete" ||
                  (run.status !== "idle" && i < run.step)
                }
                aria-pressed={activeIndex === i}
                aria-controls="mc-workbench"
                aria-label={`Explore ${item.name}`}
                onClick={() => inspect(i)}
              >
                <span className="mc-station-number">
                  {run.status === "complete" ||
                  (run.status !== "idle" && i < run.step) ? (
                    <Check size={12} />
                  ) : (
                    String(i + 1).padStart(2, "0")
                  )}
                </span>
                <MachineDrawing id={item.id} />
                <span className="mc-station-label">{item.short}</span>
                <span className="mc-station-subtitle">{item.subtitle}</span>
                {i < stations.length - 1 && (
                  <ArrowRight
                    className="mc-flow-arrow"
                    size={15}
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>
          <div className="mc-tour-track" aria-hidden="true">
            {stations.map((item, i) => (
              <i
                key={item.id}
                data-done={
                  run.status === "complete" ||
                  (run.status !== "idle" && i <= run.step)
                }
              />
            ))}
          </div>
          <div className="mc-transmission">
            <span
              className="mc-status-light"
              data-on={run.status === "running" || run.status === "complete"}
            />
            <p role="status">{message}</p>
            <span className="mc-run-count">
              {run.status === "idle"
                ? "8 STEPS"
                : `${run.status === "complete" ? stations.length : run.step + 1} / ${stations.length}`}
            </span>
          </div>
          <div
            id="mc-workbench"
            className={
              station ? "mc-workbench" : "mc-workbench mc-workbench-closed"
            }
            data-tint={station?.tint}
            onKeyDown={(event) => {
              if (event.key === "Escape" && station) closeDetails();
            }}
          >
            {station && activeIndex !== null ? (
              <>
                <div className="mc-detail-toolbar">
                  <span>
                    {String(activeIndex + 1).padStart(2, "0")} / {station.name}
                  </span>
                  <div>
                    <button
                      onClick={() =>
                        inspect(
                          (activeIndex + stations.length - 1) % stations.length,
                        )
                      }
                      aria-label="Previous station"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() =>
                        inspect((activeIndex + 1) % stations.length)
                      }
                      aria-label="Next station"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <button
                      onClick={closeDetails}
                      aria-label="Close station details"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                <div className="mc-detail-body">
                  <div className="mc-brief" key={`${station.id}-brief`}>
                    <h3>{station.title}</h3>
                    <p className="mc-explanation">{station.description}</p>
                    <p className="mc-aside">{station.joke}</p>
                  </div>
                  <div
                    className="mc-experiment"
                    key={`${station.id}-${run.status === "idle" ? "idle" : "tour"}`}
                    aria-label={`${station.name} experiment`}
                  >
                    <div
                      className="mc-experiment-body"
                      data-experiment={station.id}
                    >
                      <StationExperiment
                        id={station.id}
                        auto={run.status === "running"}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div
                className="mc-system-overview"
                aria-labelledby="mc-overview-title"
              >
                <div className="mc-overview-intro">
                  <p className="mc-eyebrow">SYSTEM OVERVIEW</p>
                  <h3 id="mc-overview-title">
                    Eight small jobs.
                    <br />
                    One useful system.
                  </h3>
                  <p>
                    Prepare the inputs, build the intelligence, then make it
                    reliable enough to use.
                  </p>
                  <button className="mc-action" onClick={() => inspect(0)}>
                    Try the data laundry <ArrowRight size={14} />
                  </button>
                </div>
                <div className="mc-overview-route">
                  <dl>
                    <div>
                      <dt>
                        <span>01–02</span> Prepare
                      </dt>
                      <dd>
                        Clean data. Evaluate a model. Adapt it when needed.
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <span>03–05</span> Reason
                      </dt>
                      <dd>
                        Retrieve evidence, choose tools and check permissions.
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <span>06–08</span> Deliver
                      </dt>
                      <dd>
                        Expose an API, deploy the service and watch its
                        behavior.
                      </dd>
                    </div>
                  </dl>
                  <p className="mc-overview-note">
                    <PipDrawing />
                    <span>
                      All systems nominal.
                      <br />
                      Pip has a clipboard.
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
          <footer className="mc-room-footer">
            <span>
              Train & deploy before serving. Security and evaluation apply
              throughout.
            </span>
            <span>Illustrative results, real concepts.</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
