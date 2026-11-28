import { experience, leadership } from "@/data/experience";
import { homeExperience, homeProjects } from "@/data/home";
import ExperienceItem, { type ExperienceBrand } from "@/components/experience/ExperienceItem";
import PortfolioPage from "@/components/layout/PortfolioPage";

export const metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  const brands = new Map<string, ExperienceBrand>([
    ...homeExperience.map((role) => [role.id, role] as const),
    ...homeProjects.map((project) => [project.slug, project] as const),
  ]);

  return (
    <PortfolioPage title="Experience">
      <section className="home-section bg-white" aria-labelledby="professional-experience">
        <div className="home-wrap">
          <div data-reveal className="home-section-heading"><h2 id="professional-experience" className="home-heading">Professional</h2></div>
          <ul role="list" className="grid gap-3.5">
            {experience.map((item) => (
              <li key={item.id} data-reveal><ExperienceItem item={item} brand={brands.get(item.id)} /></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-section bg-[#f3f6fa]" aria-labelledby="leadership-experience">
        <div className="home-wrap">
          <div data-reveal className="home-section-heading"><h2 id="leadership-experience" className="home-heading">Leadership &amp; community</h2></div>
          <ul role="list" className="grid gap-3.5">
            {leadership.map((item) => (
              <li key={item.id} data-reveal><ExperienceItem item={item} brand={brands.get(item.id)} /></li>
            ))}
          </ul>
        </div>
      </section>
    </PortfolioPage>
  );
}
