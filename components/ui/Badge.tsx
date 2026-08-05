export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-mono px-2 py-0.5 rounded border border-white/10 text-white/50 bg-white/5">
      {children}
    </span>
  );
}
