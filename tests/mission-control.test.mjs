import test from "node:test";
import assert from "node:assert/strict";
import {
  stations,
  initialRun,
  runReducer,
} from "../src/components/mission-control-data.ts";

const act = (state, type) => runReducer(state, { type });

test("tour visits every station once, completes, and ignores late timer ticks", () => {
  let state = act(initialRun, "start");
  const visited = [];
  while (state.status === "running") {
    visited.push(stations[state.step].id);
    state = act(state, "tick");
  }
  assert.deepEqual(visited, [
    "data",
    "model",
    "rag",
    "agents",
    "guardrails",
    "api",
    "mlops",
    "monitoring",
  ]);
  assert.equal(new Set(visited).size, 8);
  assert.deepEqual(state, { status: "complete", step: 7 });
  assert.deepEqual(act(state, "tick"), state);
  assert.deepEqual(act(state, "resume"), state);
});

test("pausing blocks progression and resumes at the same station", () => {
  const running = act(act(initialRun, "start"), "tick");
  const paused = act(running, "pause");
  assert.equal(paused.status, "paused");
  assert.equal(paused.step, 1);
  assert.deepEqual(act(paused, "tick"), paused);
  assert.deepEqual(act(act(paused, "resume"), "tick"), {
    status: "running",
    step: 2,
  });
});

test("reset cancels the tour; replay always starts from data", () => {
  let state = act(initialRun, "start");
  for (let i = 0; i < 5; i++) state = act(state, "tick");
  assert.deepEqual(act(state, "reset"), initialRun);
  assert.deepEqual(act(act(state, "reset"), "tick"), initialRun);
  assert.deepEqual(act(state, "start"), { status: "running", step: 0 });
  assert.deepEqual(initialRun, { status: "idle", step: 0 });
});
