import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";

const sections = [
  {
    number: "01",
    title: "Quantitative Research",
    detail: "Market questions, methods, and results",
    href: "#research",
  },
  {
    number: "02",
    title: "Software Projects",
    detail: "Tools built to solve practical problems",
    href: "/projects",
  },
  {
    number: "03",
    title: "Experience",
    detail: "Finance, operations, and leadership",
    href: "/experience",
  },
];

export default function Hero() {
  return (
    <section className="hero-shell" id="home">
      <div className="hero-content">
        <div className="hero-copy" data-reveal>
          <p className="availability-line">Student · Quantitative finance · Software</p>
          <h1>Dillon Nagar</h1>
          <p className="hero-description">
            I use data to study financial markets, test ideas, and build tools that make
            complex decisions clearer.
          </p>
          <div className="hero-actions">
            <Link href="#research" className="button-primary">
              Explore my projects <ArrowIcon size={17} />
            </Link>
            <Link href="/about" className="hero-secondary-link">
              About me <ArrowIcon direction="up-right" size={16} />
            </Link>
          </div>
        </div>

        <nav className="hero-index" aria-label="Portfolio sections" data-reveal>
          {sections.map((section) => (
            <Link className="hero-index-item" href={section.href} key={section.number}>
              <span className="hero-index-number">{section.number}</span>
              <span className="hero-index-copy">
                <strong>{section.title}</strong>
                <span>{section.detail}</span>
              </span>
              <ArrowIcon className="link-arrow" size={18} />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
