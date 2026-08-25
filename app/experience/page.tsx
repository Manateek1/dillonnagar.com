import { experience, leadership } from "@/data/experience";
import ExperienceItem from "@/components/experience/ExperienceItem";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  return (
    <div className="page-shell experience-page">
      <SectionHeader
        title="Experience"
        subtitle="Professional work, independent projects, and leadership roles."
      />

      <section className="experience-track" data-reveal>
        <div className="experience-track-heading"><span>01</span><h2>Professional</h2><i /></div>
        <div className="experience-track-items">
          {experience.map((item) => (
            <ExperienceItem key={`${item.org}-${item.title}`} item={item} />
          ))}
        </div>
      </section>

      <section className="experience-track" data-reveal>
        <div className="experience-track-heading"><span>02</span><h2>Leadership &amp; Community</h2><i /></div>
        <div className="experience-track-items">
          {leadership.map((item) => (
            <ExperienceItem key={`${item.org}-${item.title}`} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
