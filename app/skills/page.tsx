import { skills } from "@/data/skills";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Skills — Dillon Nagar",
};

export default function SkillsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <SectionHeader
        title="Skills"
        subtitle="Each skill is linked to a project or role that demonstrates it."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((cat) => (
          <div key={cat.category} className="border border-white/10 bg-white/[0.03] rounded-xl p-5">
            <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">
              {cat.category}
            </p>
            <ul className="space-y-2">
              {cat.skills.map((skill) => (
                <li key={skill.name} className="flex items-center justify-between gap-2">
                  <span className="text-sm text-white/80">{skill.name}</span>
                  {skill.proofProject && skill.proofSlug ? (
                    <Link
                      href={`/projects/${skill.proofSlug}`}
                      className="text-xs text-white/30 hover:text-blue-400 transition-colors shrink-0"
                    >
                      {skill.proofProject} →
                    </Link>
                  ) : skill.proofProject ? (
                    <span className="text-xs text-white/25 shrink-0">{skill.proofProject}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
