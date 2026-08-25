import Link from "next/link";
import OrbitalField from "@/components/effects/OrbitalField";
import ScrambleText from "@/components/ui/ScrambleText";
import ArrowIcon from "@/components/ui/ArrowIcon";

export default function Hero() {
  return (
    <section className="hero-shell" id="home" data-reveal>
      <div className="hero-axis" aria-hidden="true"><i /><i /><i /></div>
      <div className="hero-content">
        <div className="hero-copy">
          <p className="availability-line"><span />Available for internships &amp; collaboration</p>
          <h1>
            <ScrambleText text="Dillon" className="hero-name-line" />
            <ScrambleText text="Nagar" className="hero-name-line" />
          </h1>
          <p className="hero-description">
            Student developer building software at the intersection of financial analysis,
            AI-assisted workflows, and practical operations.
          </p>
          <div className="hero-actions">
            <Link href="/projects" className="signal-button signal-button-primary" data-magnetic>
              <span>View Projects</span><ArrowIcon />
            </Link>
            <a href="mailto:dillon.nagar@gmail.com" className="signal-button" data-magnetic>
              <span>Get in touch</span><ArrowIcon />
            </a>
            <a href="https://github.com/Manateek1" target="_blank" rel="noopener noreferrer" className="hero-github" data-magnetic>
              github.com/Manateek1 <ArrowIcon direction="up-right" />
            </a>
          </div>
          <p className="coordinate-readout" data-coordinates aria-hidden="true">X 000.0&nbsp; / &nbsp;Y 000.0</p>
        </div>

        <div className="orbital-field">
          <OrbitalField />
          <div className="field-label field-label-top" aria-hidden="true"><span>DATA FIELD_01</span><i /></div>
          <div className="field-label field-label-node" aria-hidden="true"><span>ORBITAL NODE</span><strong>ACTIVE</strong></div>
        </div>
      </div>
      <div className="hero-bottom-rail" aria-hidden="true"><span>SCROLL TO EXPLORE</span><i /></div>
    </section>
  );
}
