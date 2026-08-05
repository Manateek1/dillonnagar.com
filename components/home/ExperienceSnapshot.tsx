import Link from "next/link";

const snapshots = [
  {
    category: "Software & Product",
    items: ["Founder & Developer — RentMax AI", "Founder & Developer — VisualCover"],
    accent: "text-blue-400",
  },
  {
    category: "Finance & Operations",
    items: [
      "Private Wealth Management Intern — Clarus Group",
      "Operations Assistant — Acalanes UHSD",
      "Internet Marketing — Lakewood Ace Hardware",
    ],
    accent: "text-purple-400",
  },
  {
    category: "Leadership",
    items: [
      "Treasurer & Fundraising Director — Acalanes Robotics FRC 7686",
      "Founder & Organizer — Voices United",
    ],
    accent: "text-emerald-400",
  },
];

export default function ExperienceSnapshot() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-white">Experience</h2>
        <Link href="/experience" className="text-sm text-white/40 hover:text-white/70 transition-colors">
          Full experience →
        </Link>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {snapshots.map((snap) => (
          <div
            key={snap.category}
            className="border border-white/10 bg-white/[0.03] rounded-xl p-5"
          >
            <p className={`text-xs font-mono font-medium mb-3 ${snap.accent}`}>
              {snap.category}
            </p>
            <ul className="space-y-2">
              {snap.items.map((item) => (
                <li key={item} className="text-sm text-white/60 leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
