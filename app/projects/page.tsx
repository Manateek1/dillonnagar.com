import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Projects — Dillon Nagar",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const live = projects.filter((p) => !p.featured && p.status === "live");
  const other = projects.filter((p) => p.status === "prototype" || p.status === "in-development" || p.status === "in-progress");

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <SectionHeader
        title="Projects"
        subtitle="Software I've built — from live SaaS platforms to games, AI tools, and research."
      />

      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {live.length > 0 && (
        <>
          <h2 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-6">Also Live</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {live.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </>
      )}

      {other.length > 0 && (
        <>
          <h2 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-6">In Progress & Prototypes</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {other.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
