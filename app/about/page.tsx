import SectionHeader from "@/components/ui/SectionHeader";
import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="page-shell about-page">
      <SectionHeader title="About" />

      <div className="about-layout">
      <aside className="about-signal" data-reveal>
        <span>01 / ORIGIN</span>
        <p>Software × Finance × Operations</p>
        <i aria-hidden="true" />
      </aside>
      <div className="about-story" data-reveal>
        <p>
          I&apos;m a student developer at Acalanes High School (Lafayette, CA — expected graduation
          May 2028) building software at the intersection of financial analysis, AI-assisted
          workflows, and practical operations.
        </p>
        <p>
          My work started with a real problem: landlords and property investors lack accessible
          tools for rental market analysis. That led me to build{" "}
          <Link href="/projects/rentmax-ai" className="inline-signal-link">
            RentMax AI
          </Link>
          , a live SaaS platform that combines property analysis calculations with AI-generated
          explanations. I designed it, built the full stack, and handle ongoing production
          operations — sole engineer.
        </p>
        <p>
          I&apos;ve also built{" "}
          <Link href="/projects/visualcover" className="inline-signal-link">
            VisualCover
          </Link>
          , a desktop privacy curtain for Windows and macOS written in Rust and TypeScript with
          Tauri, and{" "}
          <Link href="/projects/larpchat-ai" className="inline-signal-link">
            LarpChat AI
          </Link>
          , a live AI chat and image-generation demo that I&apos;m continuing to develop.
        </p>
        <p>
          Outside of software, I serve as Logistics Lead for Aquabot, Acalanes Robotics&apos; FTC
          Team 26567. The role covers partnerships, operations, outreach, and social media, along with
          mentoring younger students. I founded Acalanes Data Science Club, a beginner-friendly, project-driven group
          exploring questions with data, AI, and code. I also founded Voices United, a
          beginner-friendly English conversation program for young English learners.
        </p>
        <p>
          In Summer 2026 I completed a private wealth management internship at Clarus
          Wealth Group in Houston, gaining exposure to commercial real estate, estate planning,
          and retirement planning.
        </p>
        <p>
          I&apos;m interested in how software, finance, and data intersect — building tools that make
          real processes faster, smarter, or more accessible.
        </p>
      </div>
      </div>

      <div className="about-facts" data-reveal>
        <div className="about-fact">
          <p>Education</p>
          <strong>Acalanes High School · Lafayette, CA</strong>
          <span>Expected May 2028</span>
        </div>
        <div className="about-fact">
          <p>Published Writing</p>
          <a
            href="https://lamorindaweekly.com/articles/2025/letters-to-the-editor-12-17-2025/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rising housing costs and limited housing options in Lamorinda <ArrowIcon direction="up-right" />
          </a>
          <span>Lamorinda Weekly · December 17, 2025</span>
        </div>
        <div className="about-fact">
          <p>Contact</p>
          <div className="about-contact-links">
            <a href="mailto:dillon.nagar@gmail.com">
              dillon.nagar@gmail.com
            </a>
            <a href="https://linkedin.com/in/dillonnagar" target="_blank" rel="noopener noreferrer">
              LinkedIn <ArrowIcon direction="up-right" />
            </a>
            <a href="https://github.com/Manateek1" target="_blank" rel="noopener noreferrer">
              GitHub <ArrowIcon direction="up-right" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
