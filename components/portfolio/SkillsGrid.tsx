import { skillGroups } from "@/data/skills";

export default function SkillsGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
      {skillGroups.map(({ topic, skills }, index) => (
        <article
          key={topic}
          data-reveal
          className={`portfolio-skill-card ${index % 3 === 1 ? "home-reveal-later" : ""}`}
        >
          <h3 className="home-display text-[1.6rem] leading-tight">{topic}</h3>
          <ul role="list" className="mt-2 flex flex-wrap gap-x-2.5 gap-y-1.5 text-[0.88rem] leading-relaxed text-[#506176]">
            {(compact ? skills.slice(0, 4) : skills).map((skill) => (
              <li key={skill} className="border-b border-[#d6e1eb]">{skill}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
