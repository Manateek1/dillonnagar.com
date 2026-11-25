import SocialIcon from "@/components/ui/SocialIcon";
import { socialProfiles } from "@/data/site";

export default function SocialLinks({ className = "social-icons" }: { className?: string }) {
  return (
    <div className={className}>
      {socialProfiles.map((profile) => (
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
