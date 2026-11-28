import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { homeContent } from "@/data/home";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[82rem] px-(--page-gutter) pb-20 pt-[clamp(4.25rem,10vw,9rem)] sm:pb-28">
      <header id="home">
        <h1 className="font-serif text-[clamp(3.25rem,10vw,9rem)] leading-[0.95] font-normal tracking-[-0.055em]">
          Dillon Nagar
        </h1>

        <div className="mt-9 grid items-start gap-5 border-t border-(--line) pt-7 sm:mt-12 sm:grid-cols-2 sm:gap-12 sm:pt-9">
          <p className="max-w-[20ch] font-serif text-[clamp(1.75rem,3.5vw,3.1rem)] leading-[1.12]">
            {homeContent.headline}
          </p>

          <div>
            <p className="max-w-[42ch] text-[1.05rem] leading-[1.7] text-(--muted)">
              {homeContent.introduction}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/projects" className="text-link min-h-9">
                Explore my projects <ArrowIcon />
              </Link>
              <Link href="/about" className="text-link min-h-9">
                About me <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
