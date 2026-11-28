import Link from "next/link";
import PortfolioPage from "@/components/layout/PortfolioPage";
import SocialLinks from "@/components/layout/SocialLinks";
import AboutBiography from "@/components/portfolio/AboutBiography";
import SkillsGrid from "@/components/portfolio/SkillsGrid";
import ArrowIcon from "@/components/ui/ArrowIcon";
import PortfolioLogo from "@/components/ui/PortfolioLogo";
import { aboutContent } from "@/data/about";
import { homeContent, homeExperience, homeProjects } from "@/data/home";

export default function Home() {
  return (
    <PortfolioPage className="portfolio-home">
      <section id="home" className="home-hero" aria-labelledby="home-title">
        <div className="home-wrap relative grid items-center gap-9 py-10 sm:py-14 md:grid-cols-[1fr_1.06fr] md:gap-10 lg:gap-18 lg:py-16">
          <div className="min-w-0">
            <p className="home-meta home-enter text-[#c5d9eb]">{homeContent.headline}</p>
            <h1 id="home-title" className="home-display home-enter home-delay-1 mt-4 text-[clamp(3.05rem,6.05vw,5.55rem)] leading-[1.02]">
              Dillon Nagar
            </h1>
            <p className="home-enter home-delay-2 mt-4 max-w-[39ch] text-base leading-[1.7] text-[#dbe6f0] sm:text-[1.14rem]">
              {homeContent.introduction}
            </p>
            <div className="home-enter home-delay-3 mt-6 sm:mt-7">
              <Link href="#projects" className="home-primary">
                Explore projects <ArrowIcon className="home-down-arrow rotate-90" size={17} />
              </Link>
            </div>
          </div>

          <nav className="portfolio-index home-enter home-delay-2 min-w-0" aria-label="Selected projects">
            <h2 className="home-display text-[clamp(1.85rem,3.3vw,2.65rem)] leading-tight">Selected projects</h2>
            <ul role="list" className="mt-3">
              {homeProjects.map((project) => (
                <li key={project.slug}>
                  <Link href={`#${project.slug}`} className="portfolio-index-link">
                    <PortfolioLogo src={project.logo} />
                    <span className="min-w-0 grow">
                      <span className="block font-semibold">{project.name}</span>
                      <span className="mt-0.5 block text-[0.86rem] text-[#506176]">{project.focus}</span>
                    </span>
                    <ArrowIcon size={18} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section id="projects" className="home-section bg-white" aria-labelledby="home-projects-title">
        <div className="home-wrap">
          <div className="home-section-heading" data-reveal>
            <h2 id="home-projects-title" className="home-heading">Projects</h2>
            <Link href="/projects" className="home-link">
              All projects <ArrowIcon />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {homeProjects.map((project, index) => (
              <div key={project.name} data-reveal className={index > 0 ? "home-reveal-later" : undefined}>
                <article id={project.slug} className="home-project-card h-full scroll-mt-4">
                  <div className="flex items-center gap-4">
                    <PortfolioLogo src={project.logo} />
                    <h3 className="home-display text-[clamp(1.85rem,3.3vw,2.85rem)] leading-tight">{project.name}</h3>
                  </div>
                  <p className="mt-4 mb-5 max-w-[53ch] grow text-[0.98rem] leading-relaxed text-[#506176]">{project.description}</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1">
                    <a href={project.href} className="home-link">
                      Visit {project.name} <ArrowIcon direction="up-right" />
                    </a>
                    {project.caseStudy && (
                      <Link href={project.caseStudy} className="home-link">
                        Read case study <ArrowIcon />
                      </Link>
                    )}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="home-section bg-[#f3f6fa]" aria-labelledby="home-experience-title">
        <div className="home-wrap">
          <div className="home-section-heading" data-reveal>
            <h2 id="home-experience-title" className="home-heading">Experience</h2>
            <Link href="/experience" className="home-link">
              All experience <ArrowIcon />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {homeExperience.map((role, index) => (
              <div key={role.id} data-reveal className={index % 2 === 1 ? "home-reveal-later" : undefined}>
                <article className="home-experience-card h-full">
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3.5">
                    <PortfolioLogo src={role.logo} wide={role.wideLogo} />
                    <div>
                      <h3 className="home-display text-[clamp(1.52rem,2.5vw,2.12rem)] leading-tight">
                        <a href={role.href} className="home-role-link">
                          <span>{role.org}</span> <ArrowIcon direction="up-right" size={15} />
                        </a>
                      </h3>
                      <p className="mt-0.5 text-[0.82rem] font-medium text-[#506176]">{role.title}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-[0.94rem] leading-relaxed text-[#506176]">{role.summary}</p>
                  {role.event && (
                    <p className="mt-3 border-t border-[#dbe4ec] pt-3 text-[0.92rem] leading-relaxed text-[#506176]">
                      I hosted <a className="home-inline-link" href={role.event.href}>{role.event.name}</a>, the club’s student data science hackathon at BRIDGEGOOD in Oakland.
                    </p>
                  )}
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="home-section bg-white" aria-labelledby="home-skills-title">
        <div className="home-wrap">
          <div className="home-section-heading" data-reveal>
            <h2 id="home-skills-title" className="home-heading">Skills</h2>
            <Link href="/experience#skills" className="home-link">
              All skills <ArrowIcon />
            </Link>
          </div>
          <SkillsGrid compact />
        </div>
      </section>

      <section id="editorial" className="home-section bg-[#f3f6fa]" aria-labelledby="home-editorial-title">
        <div className="home-wrap">
          <div className="home-section-heading" data-reveal>
            <h2 id="home-editorial-title" className="home-heading">Editorial</h2>
          </div>
          <article data-reveal className="portfolio-editorial grid items-end gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-10">
            <div>
              <p className="home-meta text-[#c5d9eb]">{aboutContent.writing.publication}</p>
              <h3 className="home-display mt-2 text-[clamp(1.75rem,3.8vw,2.9rem)] leading-tight">{aboutContent.writing.title}</h3>
              <p className="mt-2 max-w-[58ch] text-[0.95rem] leading-relaxed text-[#dbe6f0]">{aboutContent.writing.description}</p>
            </div>
            <a href={aboutContent.writing.href} className="home-link">Read the letter <ArrowIcon direction="up-right" /></a>
          </article>
        </div>
      </section>

      <section id="about" className="home-section bg-white" aria-labelledby="home-about-title">
        <div className="home-wrap">
          <div className="home-section-heading" data-reveal>
            <h2 id="home-about-title" className="home-heading">About me</h2>
            <Link href="/about" className="home-link">About page <ArrowIcon /></Link>
          </div>
          <AboutBiography />
        </div>
      </section>

      <section id="contact" className="home-contact" aria-labelledby="home-contact-title">
        <div className="home-wrap flex flex-wrap items-end justify-between gap-x-12 gap-y-5 py-9 sm:py-12">
          <div data-reveal>
            <h2 id="home-contact-title" className="home-heading">Contact</h2>
            <a href={`mailto:${homeContent.email}`} className="home-link mt-3">
              {homeContent.email} <ArrowIcon direction="up-right" />
            </a>
          </div>
          <div data-reveal className="home-reveal-later">
            <SocialLinks className="home-socials" />
          </div>
        </div>
      </section>
    </PortfolioPage>
  );
}
