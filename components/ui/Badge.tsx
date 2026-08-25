export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="tech-badge">
      {children}
    </span>
  );
}
