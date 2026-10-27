import { ExperienceItem as ExperienceItemType } from "@/data/experience";
import Badge from "@/components/ui/Badge";

export default function ExperienceItem({ item }: { item: ExperienceItemType }) {
  return (
    <article className="experience-item" data-reveal>
      <span className="experience-period">{item.period}</span>
      <div className="experience-item-main">
        <div className="experience-item-heading">
          <h3>{item.title}</h3>
          <p className="experience-org">{item.org}</p>
        </div>
        <ul>
          {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
        {item.skills ? (
          <div className="experience-skills" aria-label="Areas of work">
            {item.skills.map((skill) => <Badge key={skill}>{skill}</Badge>)}
          </div>
        ) : null}
      </div>
    </article>
  );
}
