import SectionHeader from "@/components/ui/SectionHeader";
import ArrowIcon from "@/components/ui/ArrowIcon";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="page-shell contact-page">
      <SectionHeader title="Contact" subtitle="Get in touch." />

      <div className="contact-page-surface" data-reveal>
        <p>OPEN CHANNEL / 01</p>
        <a href="mailto:dillon.nagar@gmail.com" className="contact-page-email" data-magnetic>
          dillon.nagar@gmail.com <ArrowIcon direction="up-right" />
        </a>
        <div>
          <a href="https://linkedin.com/in/dillonnagar" target="_blank" rel="noopener noreferrer" data-magnetic>
            LinkedIn <ArrowIcon direction="up-right" />
          </a>
          <a href="https://github.com/Manateek1" target="_blank" rel="noopener noreferrer" data-magnetic>
            GitHub <ArrowIcon direction="up-right" />
          </a>
        </div>
        <p className="contact-command-hint">
          Press ⌘K anywhere to navigate.
        </p>
      </div>
    </div>
  );
}
