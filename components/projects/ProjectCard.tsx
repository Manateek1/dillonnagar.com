import Link from "next/link";
import { Project } from "@/data/projects";
import Badge from "@/components/ui/Badge";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border border-white/10 bg-white/[0.03] rounded-xl p-6 hover:-translate-y-0.5 transition-transform duration-150 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium text-white">{project.name}</h3>
          <p className="text-xs text-white/40 mt-0.5">{project.role.split("—")[0].trim()}</p>
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-mono shrink-0 ${
            project.status === "live"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : project.status === "in-progress" || project.status === "in-development"
              ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
              : "bg-white/5 text-white/40 border border-white/10"
          }`}
        >
          {project.status}
        </span>
      </div>
      <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.stack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        {project.caseStudy && (
          <Link href={project.caseStudy} className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            Case Study →
          </Link>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white/70 transition-colors">
            Live site ↗
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-white/70 transition-colors">
            GitHub ↗
          </a>
        )}
      </div>
    </div>
  );
}
