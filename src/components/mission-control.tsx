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
  Sparkles,
} from "lucide-react";
import {
  stations,
  initialRun,
  runReducer,
  type StationId,
} from "./mission-control-data";
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
  const [tried, setTried] = useState<StationId[]>([]);
  const [tourVersion, setTourVersion] = useState(0);
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
    const timer = window.setTimeout(() => dispatch({ type: "tick" }), 4000);
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
    } else {
      if (run.status !== "paused") setTourVersion((version) => version + 1);
      dispatch({ type: run.status === "paused" ? "resume" : "start" });
    }
  }
  function stampStation(id: StationId) {
    setTried((previous) =>
      previous.includes(id) ? previous : [...previous, id],
    );
  }
  const nextUntried = stations.findIndex((item) => !tried.includes(item.id));
  const message =
    run.status === "idle"
      ? "Pick a machine. Try its experiment. Collect a little know-how."
      : run.status === "complete"
        ? "All six steps complete. Nothing caught fire. A promising start."
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
            <p className="mc-eyebrow">
              02 / THE CONTROL ROOM · TOUCH THE BUTTONS
            </p>
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
            <span>
              THE ROUTE <ArrowRight size={14} /> FROM MESSY DATA TO SOMETHING
              USEFUL
            </span>
            <span>LOCAL PLAYGROUND · ZERO CLOUD BILL</span>
          </div>
          <div
            className="mc-stage"
            role="group"
            aria-label="Six pipeline steps, left to right"
          >
            {stations.map((item, i) => (
              <button
                key={item.id}
                className="mc-station"
                data-station={item.id}
                data-tint={item.tint}
                data-selected={activeIndex === i}
                data-tried={tried.includes(item.id)}
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
                <span
                  className="mc-station-substeps"
                  aria-label={`${item.short} substeps: ${item.substeps.join(", ")}`}
                >
                  {item.substeps.map((step) => (
                    <small key={step}>{step}</small>
                  ))}
                </span>
                {tried.includes(item.id) && (
                  <span
                    className="mc-station-stamp"
                    aria-label="Experiment tried"
                  >
                    <Check size={13} />
                  </span>
                )}
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
                ? `${stations.length} STEPS`
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
            <div className="mc-detail-toolbar">
              <span className="mc-desk-label">
                <span className="mc-desk-number">
                  {activeIndex === null ? (
                    <Sparkles size={17} />
                  ) : (
                    String(activeIndex + 1).padStart(2, "0")
                  )}
                </span>
                {station
                  ? station.short + " / experiment desk"
                  : "Your mission briefing"}
              </span>
              <div className="mc-desk-actions">
                <span className="mc-passport-count" role="status">
                  {tried.length}/{stations.length} tried
                </span>
                {station && activeIndex !== null && (
                  <>
                    <button
                      onClick={() =>
                        inspect(
                          (activeIndex + stations.length - 1) % stations.length,
                        )
                      }
                      aria-label="Previous station"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() =>
                        inspect((activeIndex + 1) % stations.length)
                      }
                      aria-label="Next station"
                    >
                      <ChevronRight size={18} />
                    </button>
                    <button
                      onClick={closeDetails}
                      aria-label="Close station details"
                    >
                      <X size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
            {station && activeIndex !== null ? (
              <div className="mc-detail-body" key={station.id}>
                <div className="mc-brief">
                  <h3>{station.title}</h3>
                  <p className="mc-explanation">{station.description}</p>
                  <dl className="mc-input-output">
                    <div>
                      <dt>GOES IN</dt>
                      <dd>{station.input}</dd>
                    </div>
                    <ArrowRight aria-hidden="true" />
                    <div>
                      <dt>COMES OUT</dt>
                      <dd>{station.output}</dd>
                    </div>
                  </dl>
                  <p className="mc-aside">{station.joke}</p>
                </div>
                <div
                  className="mc-experiment"
                  key={tourVersion}
                  aria-label={station.name + " experiment"}
                >
                  <div className="mc-experiment-heading">
                    <span>YOUR TURN</span>
                    <strong>{station.challenge}</strong>
                  </div>
                  <div
                    className="mc-experiment-body"
                    data-experiment={station.id}
                    onClick={(event) => {
                      const target = event.target;
                      if (
                        target instanceof Element &&
                        target.closest("button:not(:disabled)")
                      ) {
                        stampStation(station.id);
                        if (run.status === "running") inspect(activeIndex);
                      }
                    }}
                  >
                    <StationExperiment
                      id={station.id}
                      auto={run.status === "running"}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="mc-system-overview"
                aria-labelledby="mc-overview-title"
              >
                <div className="mc-overview-intro">
                  <h3 id="mc-overview-title">
                    Your mission:
                    <br />
                    <em>ship useful AI.</em>
                  </h3>
                  <p>
                    Turn messy data into an answer someone can actually use. Six
                    focused experiments. A few things you’re encouraged to
                    break.
                  </p>
                  <button
                    className="mc-action"
                    onClick={() => inspect(nextUntried < 0 ? 0 : nextUntried)}
                  >
                    {tried.length === 0
                      ? "Accept the mission"
                      : nextUntried < 0
                        ? "Take another lap"
                        : "Try the next station"}{" "}
                    <ArrowRight size={18} />
                  </button>
                  <p className="mc-aside">
                    No GPUs were harmed in the making of this lab.
                  </p>
                </div>
                <div className="mc-overview-route">
                  <dl>
                    <div>
                      <dt>
                        <span>01–02</span> Prepare
                      </dt>
                      <dd>
                        Clean the data.
                        <br />
                        Teach the model.
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <span>03–04</span> Reason
                      </dt>
                      <dd>
                        Find evidence.
                        <br />
                        Use tools safely.
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <span>05–06</span> Deliver
                      </dt>
                      <dd>
                        Serve an answer.
                        <br />
                        Ship it. Watch it.
                      </dd>
                    </div>
                  </dl>
                  <div className="mc-lab-passport">
                    <PipDrawing />
                    <div>
                      <strong>
                        {tried.length === stations.length
                          ? "A full passport. Nicely done."
                          : "A stamp for every experiment you try."}
                      </strong>
                      <div
                        className="mc-passport-stamps"
                        aria-label="Experiments tried"
                      >
                        {stations.map((item, i) => (
                          <span
                            key={item.id}
                            data-stamped={tried.includes(item.id)}
                            aria-label={
                              item.short +
                              (tried.includes(item.id)
                                ? ": tried"
                                : ": not tried")
                            }
                          >
                            {tried.includes(item.id) ? (
                              <Check size={20} />
                            ) : (
                              String(i + 1).padStart(2, "0")
                            )}
                          </span>
                        ))}
                      </div>
                      <p>
                        {tried.length === stations.length
                          ? "Pip is adding “button specialist” to your résumé."
                          : "Choose a station above and give its controls a go."}
                      </p>
                    </div>
                  </div>
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
