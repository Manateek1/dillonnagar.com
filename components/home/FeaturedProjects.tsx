import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { projects } from "@/data/projects";

export default function FeaturedProjects() {
  const featured = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <section className="home-section selected-work-section" id="research" data-reveal>
      <div className="section-heading-row">
        <div>
          <p className="section-code">Selected work</p>
          <h2>Research, software, and practical tools.</h2>
        </div>
        <Link href="/projects" className="text-link">
          View all projects <ArrowIcon size={16} />
        </Link>
      </div>

      <div className="featured-project-grid" id="projects">
        {featured.map((project, index) => {
          const destination = project.caseStudy ?? project.liveUrl ?? project.githubUrl;
          const external = !project.caseStudy;

          return (
            <article className="featured-project" key={project.slug}>
              <div className="featured-project-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{project.status.replace(/-/g, " ")}</span>
              </div>
              <h3>{project.name}</h3>
              <p className="project-type">{project.themes?.[0] ?? project.stack[0] ?? "Software"}</p>
              <p className="featured-project-description">{project.tagline}</p>
              {destination ? (
                external ? (
                  <a className="text-link project-view-link" href={destination} target="_blank" rel="noopener noreferrer">
                    View project <ArrowIcon className="link-arrow" direction="up-right" size={16} />
                  </a>
                ) : (
                  <Link className="text-link project-view-link" href={destination}>
                    View project <ArrowIcon className="link-arrow" size={16} />
                  </Link>
                )
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
