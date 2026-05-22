import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Basic resume analysis",
    features: [
      "Rule-based analysis",
      "ATS score",
      "Keyword gaps",
      "5 analyses/day",
    ],
    cta: "Start Free",
    href: "/analyze",
  },
  {
    name: "Pro",
    price: "$0",
    description: "AI-powered career tools",
    features: [
      "OpenRouter AI analysis",
      "Cover letter generator",
      "Unlimited analyses",
      "Resume builder",
    ],
    cta: "Sign Up Free",
    href: "/register",
    featured: true,
  },
  {
    name: "Teams",
    price: "Soon",
    description: "For teams & companies",
    features: [
      "Everything in Pro",
      "Team dashboard",
      "Bulk analysis",
      "Priority support",
    ],
    cta: "Coming Soon",
    href: "#",
  },
];

export default function PricingSection() {
  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Pricing
          </h2>

          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">
            All features free during beta.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`group relative rounded-3xl p-8 border transition duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                p.featured
                  ? "border-black dark:border-white bg-white dark:bg-slate-900"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              }`}
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-b from-transparent via-transparent to-slate-100/40 dark:to-slate-800/30" />

              {/* Badge */}
              {p.featured && (
                <span className="inline-flex mb-4 text-xs font-medium bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {p.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {p.description}
              </p>

              {/* Price */}
              <p className="text-4xl font-bold text-black dark:text-white mt-6">
                {p.price}
              </p>

              {/* Features */}
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-slate-600 dark:text-slate-300"
                  >
                    <span className="text-green-500 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={p.href}
                className={`mt-8 block text-center py-3 rounded-xl font-medium transition ${
                  p.featured
                    ? "bg-black text-white dark:bg-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200"
                    : "border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
