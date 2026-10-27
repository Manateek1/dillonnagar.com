import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { experience, leadership } from "@/data/experience";

const highlights = [experience[0], experience[1], leadership[0]];

export default function ExperienceSnapshot() {
  return (
    <section className="home-section experience-preview" id="experience" data-reveal>
      <div className="section-heading-row">
        <div>
          <p className="section-code">Experience</p>
          <h2>Selected roles</h2>
        </div>
        <Link href="/experience" className="text-link">
          Full experience <ArrowIcon size={16} />
        </Link>
      </div>

      <div className="experience-preview-list">
        {highlights.map((item) => (
          <article className="experience-preview-row" key={`${item.org}-${item.title}`}>
            <span className="experience-preview-period">{item.period}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.org}</p>
            </div>
            <p className="experience-preview-detail">{item.bullets[0]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
