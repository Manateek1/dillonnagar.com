export default function ArrowIcon({ direction = "right", size = 16 }: { direction?: "right" | "left" | "up-right"; size?: number }) {
  const transform = direction === "left" ? "rotate(180 12 12)" : direction === "up-right" ? "rotate(-45 12 12)" : undefined;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <g transform={transform}>
        <path d="M5 12h13" />
        <path d="m14 7 5 5-5 5" />
      </g>
    </svg>
  );
}
