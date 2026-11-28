import Image from "next/image";

export default function PortfolioLogo({ src, wide }: { src: string; wide?: boolean }) {
  return (
    <span className={wide ? "home-logo portfolio-logo-wide" : "home-logo"}>
      <Image src={src} alt="" width={wide ? 128 : 60} height={wide ? 39 : 60} unoptimized />
    </span>
  );
}
