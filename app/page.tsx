import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { homeHighlights, homeIntroduction } from "@/data/home";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[82rem] px-(--page-gutter) pb-16 pt-[clamp(3.4rem,5.1vw,5.25rem)] sm:pb-24">
      <header id="home" className="pb-[clamp(2.35rem,4.3vw,3.7rem)]">
        <h1 className="font-serif text-[clamp(3.55rem,7.6vw,6.4rem)] leading-none font-normal">
          Dillon Nagar
        </h1>
        <p className="mt-5 max-w-[39ch] text-[clamp(1.05rem,1.7vw,1.3rem)] leading-[1.55] text-(--muted)">
          {homeIntroduction}
        </p>
      </header>

      <ul id="projects" aria-label="Featured work" className="border-t border-(--line)">
        {homeHighlights.map(({ id, title, label, href, description }) => (
          <li
            id={id}
            key={href}
            className="grid items-baseline gap-3 border-b border-(--line) py-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-10"
          >
            <div>
              <h2 className="font-serif text-[clamp(1.65rem,3vw,2.35rem)] leading-tight font-normal">
                <Link
                  href={href}
                  className="group inline-flex items-center gap-3 transition-colors hover:text-(--olive-dark)"
                >
                  {title}
                  <ArrowIcon
                    className="shrink-0 text-(--olive-dark) motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
                    size={20}
                  />
                </Link>
              </h2>
              {label ? <p className="mt-1 text-sm leading-relaxed text-(--muted)">{label}</p> : null}
            </div>
            <p className="max-w-[62ch] leading-[1.7] text-[#414c57]">{description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
