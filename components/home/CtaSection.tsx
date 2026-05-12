import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-20 text-center bg-muted/30">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-3">
          Ready to improve your resume?
        </h2>
        <p className="text-muted-foreground mb-6 text-sm">
          Free analysis in seconds. No account needed to get started.
        </p>
        <Link
          href="/analyze"
          className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium"
        >
          Analyze My Resume — Free
        </Link>
      </div>
    </section>
  );
}
