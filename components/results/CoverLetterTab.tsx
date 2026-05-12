"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";

export default function CoverLetterTab({
  resumeText,
  analysisId,
}: {
  resumeText: string;
  analysisId: string;
}) {
  const { data: session } = useSession();
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  if (!session)
    return (
      <div className="border rounded-lg p-6 text-center">
        <p className="text-sm text-muted-foreground mb-3">
          Cover letter generation requires a free account.
        </p>
        <Link
          href="/register"
          className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm"
        >
          Create Free Account
        </Link>
      </div>
    );

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/cover-letter", {
        resumeText,
        analysisId,
        jobTitle: data.jobTitle,
        company: data.company,
        jobDescription: data.jobDescription,
      });
      setLetter(res.data.content);
      toast.success("Cover letter generated!");
    } catch {
      toast.error("Failed. Check your Gemini API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-6 space-y-4">
      <h2 className="font-medium">Generate Cover Letter</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <input
            {...register("jobTitle")}
            placeholder="Job title *"
            required
            className="border rounded px-3 py-2 text-sm w-full"
          />
          <input
            {...register("company")}
            placeholder="Company name *"
            required
            className="border rounded px-3 py-2 text-sm w-full"
          />
        </div>
        <textarea
          {...register("jobDescription")}
          placeholder="Job description (optional)"
          rows={3}
          className="w-full border rounded px-3 py-2 text-sm resize-none"
        />
        <button
          disabled={loading}
          className="bg-primary text-primary-foreground rounded px-4 py-2 text-sm disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Cover Letter"}
        </button>
      </form>
      {letter && (
        <div className="border rounded p-4 bg-muted/30">
          <div className="flex justify-between mb-2">
            <p className="text-sm font-medium">Cover Letter</p>
            <button
              onClick={() =>
                navigator.clipboard
                  .writeText(letter)
                  .then(() => toast.success("Copied!"))
              }
              className="text-xs text-primary hover:underline"
            >
              Copy
            </button>
          </div>
          <pre className="text-sm whitespace-pre-wrap">{letter}</pre>
        </div>
      )}
    </div>
  );
}
