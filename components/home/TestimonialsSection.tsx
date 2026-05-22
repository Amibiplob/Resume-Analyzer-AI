const items = [
  {
    name: "Arif H.",
    role: "Frontend Developer",
    text: "Got my score from 48 to 82 after following the suggestions. Landed 3 interviews the next week.",
  },
  {
    name: "Priya M.",
    role: "Data Analyst",
    text: "The keyword gap feature showed exactly what I was missing. Super useful for tailoring to each job.",
  },
  {
    name: "James O.",
    role: "Backend Engineer",
    text: "The cover letter generator saved me hours. It actually sounded like me, not a template.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            What Users Say
          </h2>

          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real feedback from developers and job seekers using ResumeAI.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <div
              key={t.name}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              {/* Quote Icon */}
              <div className="text-4xl text-slate-300 dark:text-slate-700 mb-4">
                “
              </div>

              {/* Text */}
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                {t.text}
              </p>

              {/* User */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="font-semibold text-slate-900 dark:text-white text-sm">
                  {t.name}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t.role}
                </p>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-b from-transparent via-transparent to-slate-100/40 dark:to-slate-800/30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
