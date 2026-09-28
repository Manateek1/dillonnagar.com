"use client";

import Link from "next/link";
import { useState } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";

const lanes = [
  {
    category: "Finance & Research",
    items: [
      "Independent Research — Capital in Code",
      "Private Wealth Management Intern — Clarus Wealth Group",
      "Founder & Developer — RentMax AI",
    ],
  },
  {
    category: "Products & Operations",
    items: [
      "Founder & Developer — VisualCover",
      "Digital Operations — Ace Hardware",
      "Athletic Assistant — Acalanes UHSD",
    ],
  },
  {
    category: "Leadership",
    items: [
      "Founder & President — Acalanes Data Science Club",
      "Logistics Lead — 24689 - Acabots",
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
          <p className="section-code">EXPERIENCE / 03</p>
          <h2>Experience</h2>
        </div>
        <Link href="/experience" className="text-link" data-magnetic>
          Full experience <ArrowIcon />
        </Link>
      </div>

      <div className="experience-map" data-pulse={pulse}>
        <div className="time-axis" aria-hidden="true">AREAS OF WORK <ArrowIcon /></div>
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

    </section>
  );
}
