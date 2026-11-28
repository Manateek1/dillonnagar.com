import type { Metadata } from "next";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { aboutContent } from "@/data/about";
import { siteUrl, socialProfiles } from "@/data/site";

const profileUrl = new URL("/about", siteUrl).href;
const portraitPath = "/images/dillon-nagar-headshot.png";

export const metadata: Metadata = {
  title: "About",
  description: "About Dillon Nagar, based in the San Francisco Bay Area.",
};

const profilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: profileUrl,
  mainEntity: {
    "@type": "Person",
    "@id": profileUrl + "#person",
    name: "Dillon Nagar",
    url: profileUrl,
    image: new URL(portraitPath, siteUrl).href,
    sameAs: socialProfiles.map(({ href }) => href),
  },
};

export default function AboutPage() {
  return (
    <div className="page-shell about-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePage).replace(/</g, "\\u003c"),
        }}
      />
      <SectionHeader title="About" subtitle={aboutContent.location} />

      <div className="about-layout">
        <figure className="about-portrait">
          <Image
            src={portraitPath}
            alt="Portrait of Dillon Nagar"
            width={1086}
            height={1440}
            sizes="(max-width: 704px) min(72vw, 256px), (max-width: 1024px) 30vw, 384px"
          />
        </figure>

        <div className="grid max-w-prose gap-5 text-[1.05rem] leading-[1.75] text-[#414c57]">
          <p>{aboutContent.bio}</p>
          <div className="mt-4 border-t border-(--line) pt-5">
            <a className="inline-signal-link" href={aboutContent.writing.href} target="_blank" rel="noopener noreferrer">
              {aboutContent.writing.title} <ArrowIcon className="inline align-middle" direction="up-right" size={15} />
            </a>
            <p className="mt-1 text-sm text-(--muted)">{aboutContent.writing.publication}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
