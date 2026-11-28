import { projects } from "@/data/projects";
import { homeProjects } from "@/data/home";
import ProjectCard from "@/components/projects/ProjectCard";
import PortfolioPage from "@/components/layout/PortfolioPage";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const featuredOrder = new Map(homeProjects.map((project, index) => [project.slug, index]));
  const orderedProjects = [...projects].sort((a, b) =>
    (featuredOrder.get(a.slug) ?? homeProjects.length) - (featuredOrder.get(b.slug) ?? homeProjects.length),
  );

  return (
    <PortfolioPage title="Projects">
      <section className="home-section bg-[#f3f6fa]" aria-label="All projects">
        <ul role="list" className="home-wrap grid gap-3.5">
          {orderedProjects.map((project) => (
            <li key={project.slug} data-reveal>
              <ProjectCard project={project} logo={project.icon ?? homeProjects.find(({ slug }) => slug === project.slug)?.logo} />
            </li>
          ))}
        </ul>
      </section>
    </PortfolioPage>
  );
}
