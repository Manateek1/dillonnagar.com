import { experience, leadership } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import ExperienceItem from "@/components/experience/ExperienceItem";
import ArrowIcon from "@/components/ui/ArrowIcon";

export const metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  return (
    <div className="page-shell experience-page">
      <header className="page-heading flex flex-wrap items-end justify-between gap-5">
        <h1>Experience</h1>
        <a href="/resume.pdf" download="Dillon-Nagar-Resume.pdf" className="text-link min-h-9">
          Résumé (PDF) <ArrowIcon className="rotate-90" />
        </a>
      </header>

      <section className="experience-track" aria-labelledby="professional-experience">
        <div className="experience-track-heading"><h2 id="professional-experience">Professional</h2></div>
        {experience.map((item) => <ExperienceItem key={item.id} item={item} />)}
      </section>

      <section className="experience-track" aria-labelledby="leadership-experience">
        <div className="experience-track-heading"><h2 id="leadership-experience">Leadership &amp; community</h2></div>
        {leadership.map((item) => <ExperienceItem key={item.id} item={item} />)}
      </section>

      <section id="skills" className="experience-track" aria-labelledby="skills-heading">
        <div className="experience-track-heading"><h2 id="skills-heading">Skills</h2></div>
        <div className="grid gap-x-10 gap-y-6 border-b border-(--line) pb-7 sm:grid-cols-2">
          {skillGroups.map(({ topic, skills }) => (
            <div key={topic} className="border-t border-(--line) pt-4">
              <h3 className="font-medium">{topic}</h3>
              <ul role="list" className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm leading-relaxed text-[#414c57]">
                {skills.map((skill) => (
                  <li key={skill} className="inline-flex items-baseline gap-3">
                    <span aria-hidden="true" className="text-(--olive-dark)">·</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
