import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { skillGroups } from "@/data/skills";

export default function SkillsGrid({ compact = false }: { compact?: boolean }) {
  const groups = compact ? skillGroups.filter((group) => group.onHomepage) : skillGroups;
  const Heading = compact ? "h3" : "h2";

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
      {groups.map(({ topic, skills, example }, index) => (
        <article
          key={topic}
          data-reveal
          className={`portfolio-skill-card ${index % 3 === 1 ? "home-reveal-later" : ""}`}
        >
          <Heading className="home-display text-[1.6rem] leading-tight">{topic}</Heading>
          <ul role="list" className="mt-2 flex flex-wrap gap-x-2.5 gap-y-1.5 text-[0.88rem] leading-relaxed text-[#506176]">
            {(compact ? skills.slice(0, 4) : skills).map((skill) => (
              <li key={skill} className="border-b border-[#d6e1eb]">{skill}</li>
            ))}
          </ul>
          {!compact && example && (
            <Link className="home-link mt-3" href={example.href}>
              {example.label} <ArrowIcon size={14} />
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
