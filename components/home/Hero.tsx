import Link from "next/link";
import ResearchField from "@/components/home/ResearchField";
import ScrambleText from "@/components/ui/ScrambleText";
import ArrowIcon from "@/components/ui/ArrowIcon";

export default function Hero() {
  return (
    <section className="hero-shell" id="home" data-reveal>
      <div className="hero-axis" aria-hidden="true"><i /><i /><i /></div>
      <div className="hero-content">
        <div className="hero-copy">
          <p className="availability-line"><span />Student exploring quantitative finance · Open to internships</p>
          <h1>
            <ScrambleText text="Dillon" className="hero-name-line" />
            <ScrambleText text="Nagar" className="hero-name-line" />
          </h1>
          <p className="hero-description">
            I use data to study financial markets, test ideas, and build tools that make
            complex decisions clearer.
          </p>
          <div className="hero-actions">
            <Link href="/#research" className="signal-button signal-button-primary" data-magnetic>
              <span>See the Research</span><ArrowIcon />
            </Link>
            <Link href="/projects" className="signal-button" data-magnetic>
              <span>Explore My Work</span><ArrowIcon />
            </Link>
          </div>
        </div>

        <ResearchField />
      </div>
      <div className="hero-bottom-rail" aria-hidden="true"><span>SCROLL TO EXPLORE</span><i /></div>
    </section>
  );
}
