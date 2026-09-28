import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Work",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const live = projects.filter((p) => !p.featured && p.status === "live");
  const other = projects.filter((p) => p.status === "prototype" || p.status === "in-development" || p.status === "in-progress");

  return (
    <div className="page-shell projects-page">
      <SectionHeader
        title="Work"
        subtitle="Market research, financial tools, and other projects I've built."
      />

      <section className="project-group" data-reveal>
        <div className="project-group-heading"><span>01</span><h2>Featured research &amp; tools</h2><i /></div>
        <div className="project-index-grid">
          {featured.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </section>

      {live.length > 0 && (
        <section className="project-group" data-reveal>
          <div className="project-group-heading"><span>02</span><h2>Also live</h2><i /></div>
          <div className="project-index-grid">
            {live.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </section>
      )}

      {other.length > 0 && (
        <section className="project-group" data-reveal>
          <div className="project-group-heading"><span>03</span><h2>In progress &amp; prototypes</h2><i /></div>
          <div className="project-index-grid">
            {other.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </section>
      )}
    </div>
  );
}
