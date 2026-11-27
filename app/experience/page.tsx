import Link from "next/link";
import { experience, leadership } from "@/data/experience";
import { skills } from "@/data/skills";
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
        <ul className="divide-y divide-(--line) border-b border-(--line)">
          {skills.map(({ name, evidence, href }) => (
            <li key={name} className="grid items-baseline gap-x-8 gap-y-1 py-3.5 sm:grid-cols-[minmax(11rem,1fr)_minmax(0,2fr)]">
              <span className="font-medium">{name}</span>
              <Link href={href} className="inline-flex w-fit items-center gap-2 text-sm leading-relaxed text-(--olive-dark) hover:underline underline-offset-4">
                {evidence} <ArrowIcon size={14} className="shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
