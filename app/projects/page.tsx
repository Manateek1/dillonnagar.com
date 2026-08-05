import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Projects — Dillon Nagar",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const secondary = projects.filter((p) => !p.featured);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <SectionHeader
        title="Projects"
        subtitle="Software I've built — from live SaaS platforms to desktop apps and prototypes."
      />

      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <h2 className="text-sm font-mono text-white/30 uppercase tracking-widest mb-6">Prototypes</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {secondary.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
