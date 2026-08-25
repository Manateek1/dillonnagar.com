import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectRunway from "@/components/projects/ProjectRunway";
import ArrowIcon from "@/components/ui/ArrowIcon";

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="featured-projects signal-section" id="projects" data-reveal>
      <div className="section-rail" aria-hidden="true"><span>02</span><i /></div>
      <div className="section-topline" aria-hidden="true" />
      <div className="section-heading-row">
        <div>
          <p className="section-code">SECTION_02</p>
          <h2>Featured Projects</h2>
        </div>
        <Link href="/projects" className="text-link" data-magnetic>
          All projects <ArrowIcon />
        </Link>
      </div>
      <ProjectRunway projects={featured} />
    </section>
  );
}
