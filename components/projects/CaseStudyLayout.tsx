import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import type { ProjectCaseStudy } from "@/data/project-case-studies";
import { projectStatusLabel, type Project } from "@/data/projects";

export default function CaseStudyLayout({
  project,
  caseStudy,
}: {
  project: Project;
  caseStudy: ProjectCaseStudy;
}) {
  const { sections, images = [] } = caseStudy;
  const hasImagePair = images.length > 1;

  return (
    <article className="page-shell case-study-page">
      <Link href="/projects" className="case-study-back">
        <ArrowIcon direction="left" size={15} /> All projects
      </Link>

      <header className="case-study-hero">
        <div className="case-study-title-row">
          <h1>{project.name}</h1>
          <span className="status-signal">{projectStatusLabel[project.status]}</span>
        </div>
        <p className="case-study-tagline">{project.description}</p>
        <dl className="mt-6 grid gap-3 text-sm leading-relaxed text-[#414c57]">
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-medium text-foreground">Role</dt>
            <dd>{project.role}</dd>
          </div>
          {project.stack.length ? (
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-medium text-foreground">Tools</dt>
              <dd>{project.stack.join(", ")}</dd>
            </div>
          ) : null}
        </dl>
        <div className="case-study-actions">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              {project.liveLabel ?? "Visit site"} <ArrowIcon direction="up-right" size={15} />
            </a>
          ) : null}
          {project.releaseUrl ? (
            <a href={project.releaseUrl} target="_blank" rel="noopener noreferrer">
              Download preview <ArrowIcon direction="up-right" size={15} />
            </a>
          ) : null}
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              View on GitHub <ArrowIcon direction="up-right" size={15} />
            </a>
          ) : null}
        </div>
        {project.releaseNote ? (
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-(--muted)">{project.releaseNote}</p>
        ) : null}
      </header>

      {images.length ? (
        <div className={hasImagePair ? "my-8 grid gap-5 sm:grid-cols-2" : "my-8 max-w-5xl"}>
          {images.map(({ src, width, height, alt, caption }) => (
            <figure key={src}>
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes={hasImagePair ? "(max-width: 639px) 91vw, (max-width: 1312px) 44vw, 575px" : "(max-width: 1135px) 91vw, 1024px"}
                className={hasImagePair ? "aspect-video w-full border border-(--line) object-cover" : "h-auto w-full border border-(--line)"}
              />
              <figcaption className="mt-2 text-sm leading-relaxed text-(--muted)">{caption}</figcaption>
            </figure>
          ))}
        </div>
      ) : null}

      <div className="case-study-sections">
        {sections.map(({ title, content }) => (
          <section key={title}>
            <div className="case-study-section-label"><h2>{title}</h2></div>
            {typeof content === "string" ? (
              <p>{content}</p>
            ) : (
              <ul>
                {content.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
