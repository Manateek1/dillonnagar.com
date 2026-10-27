import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const featured = projects.filter((project) => project.featured);
  const live = projects.filter((project) => !project.featured && project.status === "live");
  const other = projects.filter((project) => project.status === "prototype" || project.status === "in-development" || project.status === "in-progress");
  const projectNumber = (slug: string) => projects.findIndex((project) => project.slug === slug) + 1;

  return (
    <div className="page-shell projects-page">
      <SectionHeader title="Projects" subtitle="Market research, financial tools, and other projects I've built." />

      <section className="project-group" data-reveal>
        <div className="project-group-heading"><span>01</span><h2>Featured research &amp; tools</h2></div>
        <div className="project-index-grid">
          {featured.map((project) => <ProjectCard key={project.slug} project={project} index={projectNumber(project.slug)} />)}
        </div>
      </section>

      {live.length > 0 ? (
        <section className="project-group" data-reveal>
          <div className="project-group-heading"><span>02</span><h2>Also live</h2></div>
          <div className="project-index-grid">
            {live.map((project) => <ProjectCard key={project.slug} project={project} index={projectNumber(project.slug)} />)}
          </div>
        </section>
      ) : null}

      {other.length > 0 ? (
        <section className="project-group" data-reveal>
          <div className="project-group-heading"><span>03</span><h2>In progress &amp; prototypes</h2></div>
          <div className="project-index-grid">
            {other.map((project) => <ProjectCard key={project.slug} project={project} index={projectNumber(project.slug)} />)}
          </div>
        </section>
      ) : null}
    </div>
  );
}
