import { Newsreader } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/layout/SocialLinks";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { capitalInCode, homeContent, homeExperience, homeProjects } from "@/data/home";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-home-serif",
  display: "swap",
});

function HomeLogo({ src }: { src: string }) {
  return (
    <span className="home-logo">
      <Image src={src} alt="" width={60} height={60} unoptimized />
    </span>
  );
}

export default function Home() {
  return (
    <div className={`portfolio-home ${newsreader.variable}`}>
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

          <article className="home-study home-enter home-delay-2 min-w-0" aria-labelledby="home-study-title">
            <div className="flex items-center gap-3">
              <HomeLogo src={capitalInCode.logo} />
              <div>
                <p className="home-meta text-[#315b7e]">{capitalInCode.name}</p>
                <h2 id="home-study-title" className="home-display mt-1 text-[clamp(1.75rem,3.25vw,2.65rem)] leading-tight">
                  {homeContent.featuredStudy.label}
                </h2>
              </div>
            </div>
            <div className="home-chart mt-4 overflow-hidden rounded-sm border border-[#d7e2ec] bg-white">
              <Image
                src="/screenshots/capital-in-code-spy-returns.png"
                alt="Capital in Code chart comparing the growth of one dollar during SPY’s overnight and regular trading sessions, alongside buy and hold."
                width={1969}
                height={1167}
                sizes="(max-width: 767px) 90vw, (max-width: 1240px) 46vw, 545px"
                className="h-auto w-full"
              />
            </div>
            <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <p className="text-[0.8rem] text-[#506176]">Overnight and regular trading sessions</p>
              <a href={homeContent.featuredStudy.href} className="home-link">
                Read the study <ArrowIcon direction="up-right" />
              </a>
            </div>
          </article>
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
                <article className="home-project-card h-full">
                  <div className="flex items-center gap-4">
                    <HomeLogo src={project.logo} />
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
                    {role.logo ? (
                      <HomeLogo src={role.logo} />
                    ) : (
                      <span className="home-logo home-team-number" aria-label={`FTC Team ${role.teamNumber}`}>
                        <span>FTC</span>
                        {role.teamNumber}
                      </span>
                    )}
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

      <section id="about" className="home-section bg-white" aria-labelledby="home-about-title">
        <div className="home-wrap grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_11rem] sm:gap-12 md:grid-cols-[minmax(0,1fr)_13rem]">
          <div data-reveal>
            <h2 id="home-about-title" className="home-heading">About me</h2>
            <p className="mt-4 max-w-[54ch] text-base leading-[1.75] text-[#506176] sm:text-[1.06rem]">{homeContent.about}</p>
            <Link href="/about" className="home-link mt-4">
              More about me <ArrowIcon />
            </Link>
          </div>
          <div data-reveal className="home-reveal-later">
            <Image
              src="/images/dillon-nagar-headshot.png"
              alt="Dillon Nagar"
              width={1086}
              height={1448}
              sizes="(max-width: 639px) 148px, (max-width: 767px) 176px, 208px"
              className="aspect-[1.18] w-37 rounded-sm object-cover object-[center_38%] sm:w-full"
            />
          </div>
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
    </div>
  );
}
