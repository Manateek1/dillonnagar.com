import type { ExperienceItem as ExperienceItemType } from "@/data/experience";
import ArrowIcon from "@/components/ui/ArrowIcon";
import PortfolioLogo from "@/components/ui/PortfolioLogo";

export type ExperienceBrand = { logo: string; href: string; wideLogo?: boolean };

export default function ExperienceItem({ item, brand }: { item: ExperienceItemType; brand?: ExperienceBrand }) {
  return (
    <article id={item.id} className="portfolio-directory-row grid scroll-mt-3 gap-x-9 gap-y-4 md:grid-cols-[minmax(12rem,0.95fr)_minmax(0,1.6fr)]">
      <div>
        <div className="flex items-start gap-3.5">
          {brand && <PortfolioLogo src={brand.logo} wide={brand.wideLogo} />}
          <div className="min-w-0">
            <h3 className="home-display text-[clamp(1.5rem,2.65vw,2.05rem)] leading-tight">{item.title}</h3>
            {brand ? (
              <a className="home-link mt-0.5" href={brand.href}>{item.org} <ArrowIcon direction="up-right" size={14} /></a>
            ) : (
              <p className="mt-0.5 text-sm font-medium text-[#506176]">{item.org}</p>
            )}
          </div>
        </div>
        <p className="home-meta mt-2.5 text-[#315b7e]">{item.period}</p>
      </div>
      <ul className="grid list-disc content-start gap-2 pl-4 text-[0.95rem] leading-[1.65] text-[#45586d] marker:text-[#507799]">
        {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
      </ul>
    </article>
  );
}
