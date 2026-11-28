import Image from "next/image";
import { aboutContent } from "@/data/about";

export const portraitPath = "/images/dillon-nagar-headshot.png";

export default function AboutBiography() {
  return (
    <div className="grid items-start gap-6 md:grid-cols-[minmax(11rem,0.62fr)_minmax(0,1.38fr)] md:gap-10 lg:gap-16">
      <figure data-reveal className="m-0 w-full max-w-[18rem] overflow-hidden rounded-sm border border-[#d9e2eb] sm:max-w-[22rem]">
        <Image
          src={portraitPath}
          alt="Portrait of Dillon Nagar"
          width={1086}
          height={1448}
          sizes="(max-width: 767px) min(75vw, 352px), (max-width: 1279px) 28vw, 352px"
          className="h-auto w-full"
        />
      </figure>
      <div data-reveal className="home-reveal-later grid max-w-[66ch] gap-4 text-[1rem] leading-[1.75] text-[#45586d] sm:text-[1.04rem]">
        {aboutContent.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </div>
  );
}
