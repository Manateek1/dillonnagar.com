import { experience, leadership } from "@/data/experience";
import ExperienceItem from "@/components/experience/ExperienceItem";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Experience — Dillon Nagar",
};

export default function ExperiencePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <SectionHeader
        title="Experience"
        subtitle="Professional work, independent projects, and leadership roles."
      />

      <div className="mb-14">
        <h2 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-8">
          Professional
        </h2>
        <div>
          {experience.map((item) => (
            <ExperienceItem key={`${item.org}-${item.title}`} item={item} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-8">
          Leadership & Community
        </h2>
        <div>
          {leadership.map((item) => (
            <ExperienceItem key={`${item.org}-${item.title}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
