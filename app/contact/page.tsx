"use client";

import { toast } from "sonner";
import Link from "next/link";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Contact Us
          </h1>

          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">
            Have questions or feedback? We’d love to hear from you.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <input
              required
              placeholder="Your name"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            />

            {/* Email */}
            <input
              required
              type="email"
              placeholder="Email address"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-3 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            />

            {/* Message */}
            <textarea
              required
              placeholder="Your message..."
              rows={6}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-3 text-sm text-slate-900 dark:text-white resize-none outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            />

            {/* Button */}
            <button className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition">
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400 space-y-2">
            <p>
              Email:
              <Link
                href="mailto:biplobwebdesigner@gmail.com"
                className="text-black dark:text-white hover:underline"
              >
                biplobwebdesigner@gmail.com
              </Link>
            </p>

            <p>
              GitHub:
              <Link
                href="https://github.com/Amibiplob"
                target="_blank"
                className="text-black dark:text-white hover:underline"
              >
                github.com/Amibiplob
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
