import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="relative py-10 bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-black/10 dark:bg-white/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        {/* Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 md:p-14 shadow-xl">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Ready to improve your resume?
          </h2>

          {/* Subtext */}
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Get instant ATS analysis, keyword optimization, and AI-powered
            suggestions in just a few seconds — completely free to start.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/analyze"
              className="inline-flex items-center justify-center bg-black text-white dark:bg-white dark:text-black px-8 py-4 rounded-2xl font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Analyze My Resume — Free
            </Link>

            <Link
              href="/pricing"
              className="inline-flex items-center justify-center border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-8 py-4 rounded-2xl font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              View Pricing
            </Link>
          </div>

          {/* Small trust text */}
          <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
            No credit card required • Instant results • Trusted by job seekers
          </p>
        </div>
      </div>
    </section>
  );
}
