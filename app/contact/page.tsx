import SectionHeader from "@/components/ui/SectionHeader";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { contactPhoneLinkHtml } from "@/data/contact";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="page-shell contact-page">
      <SectionHeader title="Contact" subtitle="Get in touch." />

      <div className="contact-page-surface" data-reveal>
        <p className="section-code">Contact details</p>
        <a href="mailto:dillon.nagar@gmail.com" className="contact-page-email">
          dillon.nagar@gmail.com <ArrowIcon direction="up-right" size={19} />
        </a>
        <div className="contact-phone" dangerouslySetInnerHTML={{ __html: contactPhoneLinkHtml }} />
        <div className="contact-social-links">
          <a href="https://linkedin.com/in/dillonnagar" target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowIcon direction="up-right" size={15} />
          </a>
          <a href="https://github.com/Manateek1" target="_blank" rel="noopener noreferrer">
            GitHub <ArrowIcon direction="up-right" size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
