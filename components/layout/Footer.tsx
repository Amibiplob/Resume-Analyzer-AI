import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-4 gap-6 text-sm text-muted-foreground">
        <div>
          <p className="font-semibold text-foreground mb-2">ResumeAI</p>
          <p>AI-powered resume analyzer and cover letter generator.</p>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">Tools</p>
          <div className="space-y-1">
            <Link href="/analyze" className="block hover:underline">
              Analyze Resume
            </Link>
            <Link href="/explore" className="block hover:underline">
              Explore
            </Link>
            <Link
              href="/dashboard/resume-builder"
              className="block hover:underline"
            >
              Resume Builder
            </Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">Company</p>
          <div className="space-y-1">
            <Link href="/about" className="block hover:underline">
              About
            </Link>
            <Link href="/blog" className="block hover:underline">
              Blog
            </Link>
            <Link href="/contact" className="block hover:underline">
              Contact
            </Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-2">Legal</p>
          <div className="space-y-1">
            <Link href="/faq" className="block hover:underline">
              FAQ
            </Link>
            <Link href="/pricing" className="block hover:underline">
              Pricing
            </Link>
          </div>
          <p className="mt-3 text-xs">biplobwebdesigner@gmail.com</p>
        </div>
      </div>
      <div className="border-t text-center py-4 text-xs text-muted-foreground">
        © {new Date().getFullYear()} ResumeAI · Built by Biplob
      </div>
    </footer>
  );
}
