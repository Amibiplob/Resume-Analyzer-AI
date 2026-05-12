import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <span className="text-xs font-medium border rounded-full px-3 py-1 mb-6">
        Free · No account required for basic analysis
      </span>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
        Get Your Resume
        <br />
        <span className="text-primary">ATS Score Instantly</span>
      </h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-xl">
        Upload your resume, get a detailed ATS compatibility score, keyword gap
        analysis, and AI-powered suggestions.
      </p>
      <div className="flex gap-3 mt-8">
        <Link
          href="/analyze"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium"
        >
          Analyze My Resume
        </Link>
        <Link
          href="/explore"
          className="border px-6 py-3 rounded-lg font-medium hover:bg-muted"
        >
          See Examples
        </Link>
      </div>
    </section>
  );
}
