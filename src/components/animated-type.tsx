"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";

export function MotionControl() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "on";
    window.dispatchEvent(new Event("portfolio-motion-change"));
  }, [paused]);
  return (
    <button
      type="button"
      className="motion-control"
      onClick={() => setPaused(!paused)}
      aria-pressed={paused}
      aria-label={paused ? "Enable animation" : "Pause animation"}
    >
      {paused ? <Play size={13} /> : <Pause size={13} />}
      <span>Motion {paused ? "off" : "on"}</span>
    </button>
  );
}
