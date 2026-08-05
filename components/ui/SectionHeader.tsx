export default function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
      {subtitle && <p className="mt-2 text-white/50 text-sm">{subtitle}</p>}
    </div>
  );
}
