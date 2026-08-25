"use client";

import Link from "next/link";
import { useState } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";

const lanes = [
  {
    category: "Software & Product",
    items: ["Founder & Developer — RentMax AI", "Founder & Developer — VisualCover"],
  },
  {
    category: "Finance & Operations",
    items: [
      "Private Wealth Management Intern — Clarus Group",
      "Operations Assistant — Acalanes UHSD",
      "Internet Marketing — Lakewood Ace Hardware",
    ],
  },
  {
    category: "Leadership",
    items: [
      "Treasurer & Fundraising Director — Acalanes Robotics FRC 7686",
      "Founder & Organizer — Voices United",
    ],
  },
];

export default function ExperienceMap() {
  const [activeLane, setActiveLane] = useState(0);
  const [pulse, setPulse] = useState(0);

  const activate = (index: number) => {
    setActiveLane(index);
    setPulse((value) => value + 1);
  };

  return (
    <section className="experience-map-section signal-section" id="experience" data-reveal>
      <div className="section-rail" aria-hidden="true"><span>03</span><i /></div>
      <div className="section-topline" aria-hidden="true" />
      <div className="section-heading-row">
        <div>
          <p className="section-code">SECTION_03</p>
          <h2>Experience</h2>
        </div>
        <Link href="/experience" className="text-link" data-magnetic>
          Full experience <ArrowIcon />
        </Link>
      </div>

      <div className="experience-map" data-pulse={pulse}>
        <div className="time-axis" aria-hidden="true">TIME <ArrowIcon /></div>
        {lanes.map((lane, index) => (
          <div
            className={`experience-lane ${activeLane === index ? "is-active" : ""}`}
            key={lane.category}
            onPointerEnter={() => activate(index)}
          >
            <button type="button" onClick={() => activate(index)} aria-pressed={activeLane === index}>
              <span className="lane-node" />
              {lane.category}
            </button>
            <div className="lane-signal" aria-hidden="true">
              <i /><i /><i />
            </div>
            <ul>
              {lane.items.map((item, itemIndex) => (
                <li key={item}>
                  <span aria-hidden="true" />
                  <strong>{item}</strong>
                  {activeLane === index && itemIndex === 0 && <i className="signal-wave" aria-hidden="true" />}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="terminal-tease"
        onClick={() => window.dispatchEvent(new CustomEvent("dn:open-command", { detail: { terminal: true } }))}
      >
        &gt; type help and press enter
      </button>
    </section>
  );
}
