export default function StatsCards({
  total,
  avgScore,
}: {
  total: number;
  avgScore: number;
}) {
  const cards = [
    { label: "Total Analyses", value: total },
    { label: "Avg ATS Score", value: `${avgScore}/100` },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="border rounded-lg p-4 bg-muted/20">
          <p className="text-sm text-muted-foreground">{c.label}</p>
          <p className="text-2xl font-semibold mt-1">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
