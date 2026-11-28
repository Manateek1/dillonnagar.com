import PortfolioPage from "@/components/layout/PortfolioPage";
import SkillsGrid from "@/components/portfolio/SkillsGrid";

export const metadata = {
  title: "Skills",
  description: "Skills Dillon Nagar has used in software, finance, robotics, retail, and community projects.",
};

export default function SkillsPage() {
  return (
    <PortfolioPage
      title="Skills"
      subtitle="Tools and skills I’ve used in projects, internships, robotics, retail, and community work."
    >
      <section className="home-section bg-[#f3f6fa]" aria-label="All skills">
        <div className="home-wrap"><SkillsGrid /></div>
      </section>
    </PortfolioPage>
  );
}
