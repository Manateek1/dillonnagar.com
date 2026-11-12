export type SocialNetwork = "instagram" | "x" | "linkedin";

export default function SocialIcon({
  network,
  size = 16,
}: {
  network: SocialNetwork;
  size?: number;
}) {
  if (network === "instagram") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (network === "x") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.901 1.153h3.68l-8.04 9.189L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.473l8.6-9.825L0 1.153h7.594l5.243 6.932 6.064-6.932zm-1.29 19.493h2.039L6.486 3.24H4.298z" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.44-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.89 1.63-1.83 3.35-1.83 3.58 0 4.24 2.35 4.24 5.41v6.31ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.78C.8 0 0 .8 0 1.78v20.44C0 23.2.8 24 1.78 24h20.44C23.2 24 24 23.2 24 22.22V1.78C24 .8 23.2 0 22.22 0Z" />
    </svg>
  );
}
