import Link from "next/link";
import Badge from "@/components/ui/Badge";

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
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/projects" className="text-sm text-white/40 hover:text-white/70 transition-colors mb-8 inline-block">
        ← All Projects
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-semibold text-white">{name}</h1>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-mono ${
              status === "live"
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-white/5 text-white/40 border border-white/10"
            }`}
          >
            {status}
          </span>
        </div>
        <p className="text-white/50 text-lg mb-5">{tagline}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <div className="flex gap-4">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              Live site ↗
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white/70 transition-colors">
              GitHub ↗
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-white/8 pt-10 space-y-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-3">
              {section.title}
            </h2>
            {Array.isArray(section.content) ? (
              <ul className="space-y-2">
                {section.content.map((item, i) => (
                  <li key={i} className="text-white/70 text-sm leading-relaxed pl-4 border-l border-white/10">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/70 text-sm leading-relaxed">{section.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
