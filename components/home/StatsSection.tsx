const stats = [
  { label: "Resumes Analyzed", value: "12,400+" },
  { label: "Avg Score Improvement", value: "34%" },
  { label: "Cover Letters Generated", value: "3,200+" },
  { label: "Job Categories Supported", value: "50+" },
];

export default function StatsSection() {
  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Trusted by Job Seekers
          </h2>

          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real impact from thousands of resumes analyzed and improved.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-b from-transparent via-transparent to-slate-100/40 dark:to-slate-800/30" />

              {/* Value */}
              <p className="text-3xl md:text-4xl font-bold text-black dark:text-white relative">
                {s.value}
              </p>

              {/* Label */}
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 relative">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
