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
      <Link href="/projects" className="case-study-back" data-magnetic>
        <ArrowIcon direction="left" /> All Projects
      </Link>

      <header className="case-study-hero" data-reveal>
        <div className="case-study-title-row">
          <div>
            <p className="section-code">PROJECT FILE / {name.toUpperCase()}</p>
            <h1>{name}</h1>
          </div>
          <span className={`status-signal status-${status}`}><i />{status}</span>
        </div>
        <p className="case-study-tagline">{tagline}</p>
        <div className="case-study-stack">
          {stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <div className="case-study-actions">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" data-magnetic>
              Live site <ArrowIcon direction="up-right" />
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" data-magnetic>
              GitHub <ArrowIcon direction="up-right" />
            </a>
          )}
        </div>
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
                {section.content.map((item, i) => (
                  <li key={i}>
                    <span aria-hidden="true" />{item}
                  </li>
                ))}
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
