import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectRunway from "@/components/projects/ProjectRunway";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { researchTopics } from "@/data/research";

export default function FeaturedProjects() {
  const featured = projects.filter((project) => project.featured);

  return (
    <section className="featured-projects signal-section" id="research" data-reveal>
      <div className="section-rail" aria-hidden="true"><span>02</span><i /></div>
      <div className="section-topline" aria-hidden="true" />
      <div className="section-heading-row">
        <div>
          <p className="section-code">RESEARCH / 02</p>
          <h2>Research &amp; Selected Work</h2>
        </div>
        <Link href="/projects" className="text-link" data-magnetic>
          All work <ArrowIcon />
        </Link>
      </div>
      <div className="research-highlights" aria-label="Independent research">
        <div className="research-highlights-heading">
          <span>Independent research notes</span>
          <span>Methods · Results · Limits</span>
        </div>
        {researchTopics.slice(0, 2).map((topic) => (
          <a key={topic.code} className="research-highlight" href={topic.href} target="_blank" rel="noopener noreferrer">
            <span>{topic.code}</span>
            <strong>{topic.question}</strong>
            <ArrowIcon direction="up-right" />
          </a>
        ))}
      </div>
      <ProjectRunway projects={featured} />
    </section>
  );
}
