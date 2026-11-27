import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { projectCaseStudyPath, projectStatusLabel, type Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid gap-x-10 gap-y-3 border-b border-(--line) py-6 sm:grid-cols-[minmax(10rem,2fr)_minmax(0,3fr)] sm:py-8">
      <div>
        <h2 className="font-serif text-[clamp(1.65rem,3.3vw,2.3rem)] leading-tight">
          {project.name}
        </h2>
        <span className="status-signal mt-2">{projectStatusLabel[project.status]}</span>
      </div>
      <div>
        <p className="max-w-[65ch] leading-[1.7] text-[#414c57]">{project.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
          {project.caseStudy ? (
            <Link className="text-link min-h-8" href={projectCaseStudyPath(project.slug)} aria-label={`${project.name} case study`}>
              Case study <ArrowIcon size={15} />
            </Link>
          ) : null}
          {project.liveUrl ? (
            <a className="text-link min-h-8" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              {project.liveLabel ?? "Visit site"} <ArrowIcon direction="up-right" size={15} />
            </a>
          ) : null}
          {project.releaseUrl ? (
            <a className="text-link min-h-8" href={project.releaseUrl} target="_blank" rel="noopener noreferrer" aria-label={`Download preview for ${project.name}`}>
              Download preview <ArrowIcon direction="up-right" size={15} />
            </a>
          ) : null}
          {project.githubUrl ? (
            <a className="text-link min-h-8" href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} on GitHub`}>
              GitHub <ArrowIcon direction="up-right" size={15} />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
