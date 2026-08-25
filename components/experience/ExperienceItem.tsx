import { ExperienceItem as ExperienceItemType } from "@/data/experience";
import Badge from "@/components/ui/Badge";

export default function ExperienceItem({ item }: { item: ExperienceItemType }) {
  return (
    <article className="experience-item" data-reveal>
      <span className="experience-node" aria-hidden="true" />
      <div>
        <div className="experience-item-heading">
          <h3>{item.title}</h3>
          <span>{item.period}</span>
        </div>
        <p className="experience-org">{item.org}</p>
      </div>
      <ul>
        {item.bullets.map((bullet, i) => (
          <li key={i}>
            <span aria-hidden="true" />{bullet}
          </li>
        ))}
      </ul>
      {item.skills && (
        <div className="experience-skills">
          {item.skills.map((skill) => (
            <Badge key={skill}>{skill}</Badge>
          ))}
        </div>
      )}
    </article>
  );
}
