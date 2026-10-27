import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { Project } from "@/data/projects";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const topics = (project.themes ?? project.stack).slice(0, 3).join(" · ");

  return (
    <article className="project-list-item" data-reveal>
      <span className="project-row-index">{String(index).padStart(2, "0")}</span>
      <div className="project-row-title">
        <p className="project-type">{topics || "Software"}</p>
        <h3>{project.name}</h3>
        <p>{project.tagline}</p>
        <span className="status-signal">{project.status.replace(/-/g, " ")}</span>
      </div>
      <p className="project-row-description">{project.description}</p>
      <div className="project-row-links">
        {project.caseStudy ? (
          <Link href={project.caseStudy}>
            Case study <ArrowIcon size={15} />
          </Link>
        ) : null}
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            Live site <ArrowIcon direction="up-right" size={15} />
          </a>
        ) : null}
        {project.githubUrl ? (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub <ArrowIcon direction="up-right" size={15} />
          </a>
        ) : null}
      </div>
    </article>
  );
}
