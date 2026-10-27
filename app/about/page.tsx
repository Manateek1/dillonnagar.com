import SectionHeader from "@/components/ui/SectionHeader";
import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { aboutContent } from "@/data/about";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="page-shell about-page">
      <SectionHeader title="About" subtitle={aboutContent.subtitle} />

      <div className="about-layout">
        <aside className="about-signal" data-reveal>
          <span>{aboutContent.asideLabel}</span>
          <p>{aboutContent.hobbies.join(" · ")}</p>
        </aside>
        <div className="about-story" data-reveal>
          {aboutContent.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>
              {paragraph.map((segment, segmentIndex) => {
                const key = `${paragraphIndex}-${segmentIndex}`;

                if (segment.kind === "internal-link") {
                  return (
                    <Link key={key} href={segment.href} className="inline-signal-link">
                      {segment.text}
                    </Link>
                  );
                }

                if (segment.kind === "external-link") {
                  return (
                    <a
                      key={key}
                      href={segment.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-signal-link"
                    >
                      {segment.text}
                    </a>
                  );
                }

                return segment.text;
              })}
            </p>
          ))}
        </div>
      </div>

      <div className="about-facts" data-reveal>
        <div className="about-fact">
          <p>Education</p>
          <strong>Acalanes High School · Lafayette, CA</strong>
          <span>Expected May 2028</span>
        </div>
        <div className="about-fact">
          <p>Published writing</p>
          <a
            href="https://lamorindaweekly.com/articles/2025/letters-to-the-editor-12-17-2025/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rising housing costs and limited housing options in Lamorinda
            <ArrowIcon direction="up-right" size={15} />
          </a>
          <span>Lamorinda Weekly · December 17, 2025</span>
        </div>
        <div className="about-fact">
          <p>Contact</p>
          <div className="about-contact-links">
            <a href="mailto:dillon.nagar@gmail.com">dillon.nagar@gmail.com</a>
            <a href="https://linkedin.com/in/dillonnagar" target="_blank" rel="noopener noreferrer">
              LinkedIn <ArrowIcon direction="up-right" size={14} />
            </a>
            <a href="https://github.com/Manateek1" target="_blank" rel="noopener noreferrer">
              GitHub <ArrowIcon direction="up-right" size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
