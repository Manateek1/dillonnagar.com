import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import PortfolioLogo from "@/components/ui/PortfolioLogo";
import { projectCaseStudyPath, projectStatusLabel, type Project } from "@/data/projects";

export default function ProjectCard({ project, logo }: { project: Project; logo?: string }) {
  return (
    <article className="portfolio-directory-row grid gap-x-9 gap-y-3 md:grid-cols-[minmax(11rem,0.92fr)_minmax(0,1.65fr)]">
      <div className="flex items-start gap-3.5">
        {logo && <PortfolioLogo src={logo} />}
        <div>
          <h2 className="home-display text-[clamp(1.75rem,3.1vw,2.45rem)] leading-tight">{project.name}</h2>
          <p className="home-meta mt-1 text-[#315b7e]">{projectStatusLabel[project.status]}</p>
        </div>
      </div>
      <div>
        <p className="max-w-[65ch] leading-[1.7] text-[#45586d]">{project.description}</p>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1">
          {project.caseStudy ? (
            <Link className="home-link" href={projectCaseStudyPath(project.slug)} aria-label={`${project.name} case study`}>
              Case study <ArrowIcon size={15} />
            </Link>
          ) : null}
          {project.liveUrl ? (
            <a className="home-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              {project.liveLabel ?? "Visit site"} <ArrowIcon direction="up-right" size={15} />
            </a>
          ) : null}
          {project.releaseUrl ? (
            <a className="home-link" href={project.releaseUrl} target="_blank" rel="noopener noreferrer" aria-label={`Download preview for ${project.name}`}>
              Download preview <ArrowIcon direction="up-right" size={15} />
            </a>
          ) : null}
          {project.githubUrl ? (
            <a className="home-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} on GitHub`}>
              GitHub <ArrowIcon direction="up-right" size={15} />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
