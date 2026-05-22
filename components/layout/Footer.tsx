import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-7">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-black"
            >
              ResumeAI
            </Link>

            <p className="mt-4 text-slate-600 leading-relaxed max-w-md">
              AI-powered resume analysis, ATS optimization, and professional
              cover letter generation to help job seekers land more interviews.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {[
                ["GitHub", "https://github.com/amibiplob"],
                ["LinkedIn", "https://linkedin.com/in/amibiplob/"],
              ].map(([name, href]) => (
                <Link
                  key={name}
                  href={href}
                  className="text-sm text-slate-500 hover:text-black transition"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Tools</h3>

            <div className="space-y-3 text-sm">
              <Link
                href="/analyze"
                className="block text-slate-600 hover:text-black transition"
              >
                Analyze Resume
              </Link>

              <Link
                href="/explore"
                className="block text-slate-600 hover:text-black transition"
              >
                Explore
              </Link>

              <Link
                href="/dashboard/resume-builder"
                className="block text-slate-600 hover:text-black transition"
              >
                Resume Builder
              </Link>

              <Link
                href="/dashboard/cover-letters"
                className="block text-slate-600 hover:text-black transition"
              >
                Cover Letter AI
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Company</h3>

            <div className="space-y-3 text-sm">
              <Link
                href="/about"
                className="block text-slate-600 hover:text-black transition"
              >
                About
              </Link>

              <Link
                href="/blog"
                className="block text-slate-600 hover:text-black transition"
              >
                Blog
              </Link>

              <Link
                href="/contact"
                className="block text-slate-600 hover:text-black transition"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>

            <div className="space-y-3 text-sm">
              <Link
                href="/faq"
                className="block text-slate-600 hover:text-black transition"
              >
                FAQ
              </Link>

              <Link
                href="/pricing"
                className="block text-slate-600 hover:text-black transition"
              >
                Pricing
              </Link>
            </div>

            <div className="mt-6">
              <p className="text-sm text-slate-500">Contact</p>

              <a
                href="mailto:biplobwebdesigner@gmail.com"
                className="text-sm text-black hover:underline"
              >
                biplobwebdesigner@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <h1 className="border-t border-slate-200 text-sm text-slate-500 text-center py-3">
          © {new Date().getFullYear()} ResumeAI. All rights reserved.
        </h1>
      </div>
    </footer>
  );
}
