import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ExperienceSnapshot from "@/components/home/ExperienceSnapshot";
import ArrowIcon from "@/components/ui/ArrowIcon";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ExperienceSnapshot />
      <section className="contact-band" id="contact" data-reveal>
        <div>
          <p className="section-code">Contact</p>
          <h2>Let&apos;s connect.</h2>
          <p>For questions about my research, projects, or experience, reach out.</p>
        </div>
        <div className="contact-actions">
          <a className="contact-email" href="mailto:dillon.nagar@gmail.com">
            dillon.nagar@gmail.com <ArrowIcon direction="up-right" size={18} />
          </a>
          <div className="contact-social-links">
            <a href="https://linkedin.com/in/dillonnagar" target="_blank" rel="noopener noreferrer">
              LinkedIn <ArrowIcon direction="up-right" size={15} />
            </a>
            <a href="https://github.com/Manateek1" target="_blank" rel="noopener noreferrer">
              GitHub <ArrowIcon direction="up-right" size={15} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
