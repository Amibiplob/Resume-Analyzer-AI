import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const features = [
  {
    title: "ATS Resume Analysis",
    description:
      "Instantly scan your resume against Applicant Tracking Systems and improve your match score.",
  },
  {
    title: "AI-Powered Insights",
    description:
      "Get smart recommendations, keyword optimization, and tailored improvements using AI.",
  },
  {
    title: "Professional Resume Builder",
    description:
      "Create beautiful, job-ready resumes with modern templates and export options.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100 min-h-screen">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1 text-sm text-slate-600 shadow-sm mb-6">
            🚀 Smart Resume Optimization Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
            About <span className="text-black">ResumeAI</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            ResumeAI helps job seekers build stronger resumes, improve ATS
            compatibility, and generate professional cover letters with the
            power of modern AI.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard/resume-builder"
              className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition"
            >
              Build Resume
            </Link>

            <Link
              href="/analyze"
              className="border border-slate-300 bg-white px-6 py-3 rounded-xl font-medium hover:bg-slate-50 transition"
            >
              Analyze Resume
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-4 pb-20">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center text-2xl mb-6">
                  ✨
                </div>

                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="max-w-5xl mx-auto px-4 pb-24">
          <div className="bg-black text-white rounded-4xl p-10 md:p-16 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>

            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto">
              We believe every job seeker deserves access to professional career
              tools. ResumeAI combines ATS optimization, AI-powered analysis,
              and resume building into one simple platform — helping users stand
              out and land more interviews.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-5xl mx-auto px-4 pb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ["10K+", "Resumes Analyzed"],
              ["95%", "ATS Compatibility"],
              ["Free", "Core Features"],
              ["AI", "Powered Insights"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm"
              >
                <h3 className="text-3xl font-bold text-black">{value}</h3>
                <p className="text-slate-600 mt-2 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 pb-24">
          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Ready to Improve Your Resume?
            </h2>

            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Start building a stronger resume today and increase your chances
              of landing interviews with ResumeAI.
            </p>

            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-800 transition"
            >
              Get Started Free
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
