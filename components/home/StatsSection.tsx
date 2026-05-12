const stats = [
  { label: "Resumes Analyzed", value: "12,400+" },
  { label: "Avg Score Improvement", value: "34%" },
  { label: "Cover Letters Generated", value: "3,200+" },
  { label: "Job Categories Supported", value: "50+" },
];

export default function StatsSection() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
