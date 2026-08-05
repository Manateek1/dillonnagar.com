import { ExperienceItem as ExperienceItemType } from "@/data/experience";
import Badge from "@/components/ui/Badge";

export default function ExperienceItem({ item }: { item: ExperienceItemType }) {
  return (
    <div className="border-l border-white/10 pl-6 pb-8">
      <div className="mb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-0.5">
          <h3 className="font-medium text-white">{item.title}</h3>
          <span className="text-xs font-mono text-white/30">{item.period}</span>
        </div>
        <p className="text-sm text-blue-400">{item.org}</p>
      </div>
      <ul className="space-y-1.5 mb-3">
        {item.bullets.map((bullet, i) => (
          <li key={i} className="text-sm text-white/50 leading-relaxed">
            — {bullet}
          </li>
        ))}
      </ul>
      {item.skills && (
        <div className="flex flex-wrap gap-1.5">
          {item.skills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      )}
    </div>
  );
}
