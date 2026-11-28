import { Newsreader } from "next/font/google";
import type { ReactNode } from "react";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-home-serif",
  display: "swap",
});

export default function PortfolioPage({
  children,
  title,
  subtitle,
  action,
  className = "",
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`portfolio-page ${newsreader.variable} ${className}`}>
      {title && (
        <header className="home-hero">
          <div className="home-wrap relative flex flex-wrap items-end justify-between gap-5 py-11 sm:py-15">
            <div>
              <h1 className="home-display home-enter text-[clamp(3.15rem,7.1vw,5.45rem)] leading-none">{title}</h1>
              {subtitle && (
                <p className="home-enter home-delay-1 mt-2.5 max-w-[55ch] leading-relaxed text-[#dbe6f0]">{subtitle}</p>
              )}
            </div>
            {action && <div className="home-enter home-delay-2">{action}</div>}
          </div>
        </header>
      )}
      {children}
    </div>
  );
}
