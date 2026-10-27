import Link from "next/link";
import Badge from "@/components/ui/Badge";
import ArrowIcon from "@/components/ui/ArrowIcon";

type Section = {
  title: string;
  content: string | string[];
};

type CaseStudyProps = {
  name: string;
  tagline: string;
  status: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  sections: Section[];
};

export default function CaseStudyLayout({
  name,
  tagline,
  status,
  stack,
  liveUrl,
  githubUrl,
  sections,
}: CaseStudyProps) {
  return (
    <div className="page-shell case-study-page">
      <Link href="/projects" className="case-study-back">
        <ArrowIcon direction="left" size={15} /> All projects
      </Link>

      <header className="case-study-hero" data-reveal>
        <div className="case-study-title-row">
          <div>
            <p className="section-code">Project / {name}</p>
            <h1>{name}</h1>
          </div>
          <span className="status-signal">{status.replace(/-/g, " ")}</span>
        </div>
        <p className="case-study-tagline">{tagline}</p>
        {stack.length > 0 ? (
          <div className="case-study-stack" aria-label="Technology">
            {stack.map((tech) => <Badge key={tech}>{tech}</Badge>)}
          </div>
        ) : null}
        {liveUrl || githubUrl ? (
          <div className="case-study-actions">
            {liveUrl ? (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                Live site <ArrowIcon direction="up-right" size={15} />
              </a>
            ) : null}
            {githubUrl ? (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub <ArrowIcon direction="up-right" size={15} />
              </a>
            ) : null}
          </div>
        ) : null}
      </header>

      <div className="case-study-sections">
        {sections.map((section, index) => (
          <section key={section.title} data-reveal>
            <div className="case-study-section-label">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.title}</h2>
            </div>
            {Array.isArray(section.content) ? (
              <ul>
                {section.content.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : (
              <p>{section.content}</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
