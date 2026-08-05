import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
};

export default function Button({ href, children, variant = "primary", external }: ButtonProps) {
  const base =
    "inline-block text-sm font-medium px-4 py-2 rounded transition-all duration-150";
  const styles =
    variant === "primary"
      ? `${base} bg-blue-500 text-white hover:bg-blue-400`
      : `${base} border border-white/15 text-white/70 hover:border-white/30 hover:text-white`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
}
