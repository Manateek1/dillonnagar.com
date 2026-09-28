"use client";

import { useState } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";
import OrbitalField from "@/components/effects/OrbitalField";
import { researchTopics } from "@/data/research";

export default function ResearchField() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTopic = researchTopics[activeIndex];

  return (
    <div className="orbital-field research-field">
      <OrbitalField />
      <div className="research-field-interface">
        <div className="research-field-heading">
          <span>Explore the research</span>
          <i />
        </div>

        <div className="research-nodes" role="group" aria-label="Research topics">
          {researchTopics.map((topic, index) => (
            <button
              type="button"
              key={topic.code}
              className={`research-node${activeIndex === index ? " is-active" : ""}`}
              data-index={index}
              aria-pressed={activeIndex === index}
              onPointerEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{topic.label}</strong>
            </button>
          ))}
        </div>

        <div className="research-readout" aria-live="polite">
          <p>{activeTopic.code} / QUESTION {String(activeIndex + 1).padStart(2, "0")}</p>
          <h2>{activeTopic.question}</h2>
          <span>{activeTopic.context}</span>
          <a href={activeTopic.href} target="_blank" rel="noopener noreferrer" data-magnetic>
            {activeTopic.action} <ArrowIcon direction="up-right" />
          </a>
        </div>

        <p className="research-axis-label">Illustrative field · No live prices</p>
      </div>
    </div>
  );
}
