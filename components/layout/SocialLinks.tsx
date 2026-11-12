import SocialIcon, { type SocialNetwork } from "@/components/ui/SocialIcon";

const profiles: readonly {
  label: string;
  network: SocialNetwork;
  href: string;
}[] = [
  {
    label: "Instagram",
    network: "instagram",
    href: "https://www.instagram.com/dillonnagar",
  },
  {
    label: "X (@dillonnagar)",
    network: "x",
    href: "https://x.com/dillonnagar",
  },
  {
    label: "LinkedIn",
    network: "linkedin",
    href: "https://linkedin.com/in/dillonnagar",
  },
];

export default function SocialLinks({ className = "social-icons" }: { className?: string }) {
  return (
    <div className={className}>
      {profiles.map((profile) => (
        <a
          key={profile.network}
          href={profile.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={profile.label}
          title={profile.label}
        >
          <SocialIcon network={profile.network} />
        </a>
      ))}
    </div>
  );
}
