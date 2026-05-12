"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";
import Link from "next/link";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
  };
  return (
    <>
      <Navbar />
      <main className="max-w-xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-semibold mb-8">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Your name"
            className="w-full border rounded px-3 py-2"
          />
          <input
            required
            placeholder="Email"
            className="w-full border rounded px-3 py-2"
            type="email"
          />
          <textarea
            required
            placeholder="Message"
            rows={5}
            className="w-full border rounded px-3 py-2 resize-none"
          />
          <button className="bg-primary text-primary-foreground rounded px-6 py-2">
            Send Message
          </button>
        </form>
        <div className="flex flex-col mt-8 text-sm text-muted-foreground space-y-1">
          <Link href="mailto:biplobwebdesigner@gmail.com">
            Email: biplobwebdesigner@gmail.com
          </Link>
          <Link href="github.com/Amibiplob">GitHub: github.com/Amibiplob</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
