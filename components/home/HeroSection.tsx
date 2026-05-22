import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      {/* Background Blur Effects */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-125 h-125 bg-slate-300/30 dark:bg-slate-700/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur px-4 py-1.5 text-sm text-slate-600 dark:text-slate-300 shadow-sm mb-8">
          🚀 Free · No account required for basic analysis
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
          Get Your Resume
          <br />
          <span className="bg-gradient-to-r from-black to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            ATS Score Instantly
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Upload your resume and receive a detailed ATS compatibility score,
          keyword gap analysis, and AI-powered recommendations to improve your
          chances of landing interviews.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            href="/analyze"
            className="inline-flex items-center justify-center bg-black dark:bg-white dark:text-black text-white px-8 py-4 rounded-2xl font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition shadow-lg hover:shadow-xl"
          >
            Analyze My Resume
          </Link>

          <Link
            href="/explore"
            className="inline-flex items-center justify-center border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-8 py-4 rounded-2xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            See Examples
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
          {[
            ["10K+", "Resumes Analyzed"],
            ["95%", "ATS Accuracy"],
            ["AI", "Powered Insights"],
            ["Free", "Basic Analysis"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-3xl font-bold text-black dark:text-white">
                {value}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
