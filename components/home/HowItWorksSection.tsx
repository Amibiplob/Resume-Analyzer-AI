const steps = [
  {
    n: "1",
    title: "Upload or Paste",
    desc: "Upload your PDF resume or paste the text directly. No account needed.",
  },
  {
    n: "2",
    title: "Get Analyzed",
    desc: "Our engine checks ATS compatibility, keywords, structure, and tone.",
  },
  {
    n: "3",
    title: "Improve",
    desc: "Follow specific suggestions to boost your score and land more interviews.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            How It Works
          </h2>

          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Simple 3-step process to improve your resume and increase interview
            chances.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              {/* Step Number */}
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-110 transition">
                {s.n}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {s.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                {s.desc}
              </p>

              {/* subtle glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-b from-transparent via-transparent to-slate-100/40 dark:to-slate-800/30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
