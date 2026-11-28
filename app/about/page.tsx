import type { Metadata } from "next";
import Link from "next/link";
import PortfolioPage from "@/components/layout/PortfolioPage";
import AboutBiography, { portraitPath } from "@/components/portfolio/AboutBiography";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { aboutContent } from "@/data/about";
import { siteUrl, socialProfiles } from "@/data/site";

const profileUrl = new URL("/about", siteUrl).href;

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
    <PortfolioPage
      title="About"
      subtitle={aboutContent.location}
      action={<Link href="/#editorial" className="home-primary">Editorial <ArrowIcon /></Link>}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePage).replace(/</g, "\\u003c"),
        }}
      />
      <section className="home-section bg-white" aria-label="About Dillon Nagar">
        <div className="home-wrap"><AboutBiography /></div>
      </section>
    </PortfolioPage>
  );
}
