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
        <span>01 / FOCUS</span>
        <p>Markets × Data × Practical Tools</p>
        <i aria-hidden="true" />
      </aside>
      <div className="about-story" data-reveal>
        <p>
          I&apos;m a student at Acalanes High School in Lafayette, California (expected graduation
          May 2028). I use data to ask questions about markets and build tools that make financial
          decisions easier to understand.
        </p>
        <p>
          Through{" "}
          <a href="https://capitalincode.com" target="_blank" rel="noopener noreferrer" className="inline-signal-link">
            Capital in Code
          </a>
          , I publish independent market research. One study compares historical SPY overnight
          and regular-session returns. CycleQuant is a Bitcoin paper-trading experiment. I share
          the methods and limits alongside the results.
        </p>
        <p>
          In Summer 2026 I completed a private wealth management internship at Clarus Wealth
          Group in Houston, gaining exposure to commercial real estate, estate planning, and
          retirement planning.
        </p>
        <p>
          Rental-property analysis led me to build{" "}
          <Link href="/projects/rentmax-ai" className="inline-signal-link">
            RentMax AI
          </Link>
          , a live platform that helps investors compare rent ranges, cash flow, and returns. I
          built it and manage its ongoing operation.
        </p>
        <p>
          I&apos;ve also built other tools, including{" "}
          <Link href="/projects/visualcover" className="inline-signal-link">
            VisualCover
          </Link>
          , a privacy curtain for Windows and macOS, and{" "}
          <Link href="/projects/larpchat-ai" className="inline-signal-link">
            LarpChat AI
          </Link>
          , a live AI chat and image-generation demo in active development.
        </p>
        <p>
          Outside of software, I serve as Logistics Lead for 24689 - Acabots, Acalanes High School
          Robotics. The role covers partnerships, operations, outreach, and social media, along with
          mentoring younger students. I founded Acalanes Data Science Club, a beginner-friendly, project-driven group
          exploring questions with data, AI, and code. I also founded Voices United, a
          beginner-friendly English conversation program for young English learners.
        </p>
        <p>
          I&apos;m interested in quantitative finance: asking precise questions, checking them
          against data, and making the findings useful to other people.
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
