import Link from "next/link";
import { Project } from "@/data/projects";
import Badge from "@/components/ui/Badge";
import ArrowIcon from "@/components/ui/ArrowIcon";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-index-card" data-tilt data-reveal>
      <div className="tilt-surface">
      <div className="project-card-number" aria-hidden="true">{project.slug.slice(0, 2).toUpperCase()}</div>
      <div className="project-card-heading">
        <div>
          <h3>{project.name}</h3>
          <p>{project.role.split("—")[0].trim()}</p>
        </div>
        <span className={`status-signal status-${project.status}`}><i />{project.status}</span>
      </div>
      <p className="project-card-description">{project.description}</p>
      <div className="project-card-stack">
        {project.stack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
      <div className="project-card-actions">
        {project.caseStudy && (
          <Link href={project.caseStudy} data-magnetic>
            Case Study <ArrowIcon />
          </Link>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-magnetic>
            Live site <ArrowIcon direction="up-right" />
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
  );
}
