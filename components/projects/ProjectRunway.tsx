"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { projectStatusLabel, type Project } from "@/data/projects";
import Badge from "@/components/ui/Badge";
import ArrowIcon from "@/components/ui/ArrowIcon";

export default function ProjectRunway({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const ordered = useMemo(
    () => projects
      .map((project, index) => ({ project, index, depth: (index - activeIndex + projects.length) % projects.length }))
      .sort((a, b) => a.depth - b.depth),
    [activeIndex, projects],
  );

  const move = (direction: number) => {
    setActiveIndex((index) => (index + direction + projects.length) % projects.length);
  };

  return (
    <div
      className="project-runway"
      role="region"
      aria-label="Featured project navigator"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          move(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          move(-1);
        }
      }}
    >
      <span className="sr-only" aria-live="polite">Showing {projects[activeIndex]?.name}</span>

      <div className="runway-stage">
        {ordered.map(({ project, index, depth }) => (
          <article
            key={project.slug}
            className="runway-card"
            data-depth={depth}
            data-tilt
            aria-current={depth === 0 ? "true" : undefined}
            tabIndex={0}
            onFocusCapture={() => setActiveIndex(index)}
            onClick={(event) => {
              if (!(event.target as Element).closest("a")) setActiveIndex(index);
            }}
          >
            <div className="tilt-surface">
              <div className="runway-card-grid" aria-hidden="true" />
              <div className="runway-card-header">
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.role.split("—")[0].trim()}</p>
                </div>
                <span className="status-signal"><i />{projectStatusLabel[project.status]}</span>
              </div>
              <p className="runway-tagline">{project.tagline}</p>
              <div className="runway-stack">
                {(project.themes ?? project.stack).slice(0, 4).map((theme) => <Badge key={theme}>{theme}</Badge>)}
              </div>
              <div className="runway-actions">
                {project.caseStudy && (
                  <Link href={project.caseStudy} data-magnetic>
                    View Case Study <ArrowIcon />
                  </Link>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-magnetic>
                    Visit site <ArrowIcon direction="up-right" />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-magnetic>
                    GitHub <ArrowIcon direction="up-right" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="runway-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous project" data-magnetic>
          <ArrowIcon direction="left" />
        </button>
        <div className="runway-track" aria-hidden="true">
          {projects.map((project, index) => <span key={project.slug} className={index === activeIndex ? "is-active" : ""} />)}
        </div>
        <button type="button" onClick={() => move(1)} aria-label="Next project" data-magnetic>
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
}
