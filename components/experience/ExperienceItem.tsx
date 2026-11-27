import type { ExperienceItem as ExperienceItemType } from "@/data/experience";

export default function ExperienceItem({ item }: { item: ExperienceItemType }) {
  return (
    <article id={item.id} className="experience-item scroll-mt-3">
      <span className="experience-period">{item.period}</span>
      <div className="experience-item-main">
        <div className="experience-item-heading">
          <h3>{item.title}</h3>
          <p className="experience-org">{item.org}</p>
        </div>
        <ul>
          {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
      </div>
    </article>
  );
}
