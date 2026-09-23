"use client";

import { useState } from "react";
import {
  ArrowDown,
  CheckCircle2,
  Dices,
  Sparkles,
  Trophy,
  Wrench,
} from "lucide-react";
import { PipDrawing } from "@/components/pip";
import styles from "./page.module.css";

const missions = [
  {
    title: "The Curious Human",
    brief:
      "Open every machine, try one control in each, and collect all six passport stamps.",
    reward: "Reward: one extremely official Pip sticker",
  },
  {
    title: "The Button Gremlin",
    brief:
      "Run the whole system, pause it halfway, then poke around until the pipeline forgives you.",
    reward: "Reward: permission to say ‘works on my machine’ once",
  },
  {
    title: "The Safety Goblin",
    brief:
      "Visit Agents and Deploy. Check the permissions, test the gate, and keep chaos below 42%.",
    reward: "Reward: zero surprise cloud invoices",
  },
];

export function WorkshopIntro() {
  const [mission, setMission] = useState(0);
  const active = missions[mission];

  function shuffleMission() {
    setMission((current) => (current + 1) % missions.length);
  }

  return (
    <section className={styles.hero} aria-labelledby="workshop-title">
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>
          <Wrench size={16} /> 01 / PIP’S HIGHLY REGULATED PLAYGROUND
        </p>
        <h1 id="workshop-title">
          Welcome to
          <em>Pip’s Workshop.</em>
        </h1>
        <p className={styles.lede}>
          Six tiny machines explain how an AI system goes from messy data to a
          useful answer. Touch the buttons, break the safe simulations, and
          earn a stamp for every experiment.
        </p>
        <div className={styles.heroActions}>
          <a href="#mission-control">
            Start the shift <ArrowDown size={19} />
          </a>
          <button type="button" onClick={shuffleMission}>
            New silly mission <Dices size={18} />
          </button>
        </div>
        <ul className={styles.rules} aria-label="Workshop rules">
          <li>
            <CheckCircle2 size={17} /> Six playable stations
          </li>
          <li>
            <Trophy size={17} /> One stamp per experiment
          </li>
          <li>
            <Sparkles size={17} /> No real infrastructure harmed
          </li>
        </ul>
      </div>

      <aside className={styles.missionDeck} aria-label="Your workshop mission">
        <span className={styles.deckTape}>TODAY’S VERY SERIOUS ASSIGNMENT</span>
        <div className={styles.missionPip}>
          <PipDrawing />
          <span>Safety officer*</span>
          <small>*self-appointed</small>
        </div>
        <div className={styles.missionCard} aria-live="polite">
          <p>MISSION 0{mission + 1}</p>
          <h2>{active.title}</h2>
          <p>{active.brief}</p>
          <strong>{active.reward}</strong>
        </div>
        <div className={styles.missionTabs} aria-label="Choose a mission">
          {missions.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-pressed={mission === index}
              aria-label={`Choose mission ${index + 1}: ${item.title}`}
              onClick={() => setMission(index)}
            >
              0{index + 1}
            </button>
          ))}
        </div>
      </aside>
    </section>
  );
}
