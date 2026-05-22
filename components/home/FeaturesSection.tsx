const features = [
  {
    title: "ATS Score",
    desc: "Know exactly how your resume scores against applicant tracking systems.",
  },
  {
    title: "Keyword Analysis",
    desc: "See which keywords are present and which are missing for your target role.",
  },
  {
    title: "Section Feedback",
    desc: "Get per-section scores for summary, skills, experience, and education.",
  },
  {
    title: "Cover Letter Gen",
    desc: "AI generates a tailored cover letter from your resume and job description.",
  },
  {
    title: "Resume Builder",
    desc: "Build a professional resume from scratch using guided forms and templates.",
  },
  {
    title: "No Login Needed",
    desc: "Get instant rule-based analysis without creating an account.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-10 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Powerful Features
          </h2>

          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Everything you need to analyze, improve, and build a job-winning
            resume.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              {/* Number Badge */}
              <div className="w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm mb-5 group-hover:scale-110 transition">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {f.desc}
              </p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-b from-transparent via-transparent to-slate-100/40 dark:to-slate-800/30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
