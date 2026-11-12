import SectionHeader from "@/components/ui/SectionHeader";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { contactPhoneLinkHtml } from "@/data/contact";
import SocialLinks from "@/components/layout/SocialLinks";

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
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
