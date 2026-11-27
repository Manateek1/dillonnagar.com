import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="page-shell projects-page">
      <SectionHeader title="Projects" />

      <ul>
        {projects.map((project) => (
          <li key={project.slug}><ProjectCard project={project} /></li>
        ))}
      </ul>
    </div>
  );
}
