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
      <section className="contact-band" data-reveal>
        <div className="contact-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div>
          <p className="section-code">CONTACT / 04</p>
          <h2>Let&apos;s explore<br />a question together.</h2>
        </div>
        <div className="contact-actions">
          <a href="mailto:dillon.nagar@gmail.com" className="contact-email" data-magnetic>
            dillon.nagar@gmail.com
          </a>
          <div>
            <a href="https://linkedin.com/in/dillonnagar" target="_blank" rel="noopener noreferrer" data-magnetic>
              LinkedIn <ArrowIcon direction="up-right" />
            </a>
            <a href="https://github.com/Manateek1" target="_blank" rel="noopener noreferrer" data-magnetic>
              GitHub <ArrowIcon direction="up-right" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
