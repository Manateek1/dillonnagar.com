import Link from "next/link";
import ArrowIcon from "@/components/ui/ArrowIcon";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
};

export default function Button({ href, children, variant = "primary", external }: ButtonProps) {
  const base = "signal-button";
  const styles =
    variant === "primary"
      ? `${base} signal-button-primary`
      : base;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles} data-magnetic>
        <span>{children}</span><ArrowIcon direction="up-right" />
      </a>
    );
  }
  return (
    <Link href={href} className={styles} data-magnetic>
      <span>{children}</span><ArrowIcon />
    </Link>
  );
}
