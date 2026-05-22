"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function DropZone() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const onDrop = useCallback((files: File[]) => {
    if (files[0]) setFile(files[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const fd = new FormData();

      if (file) fd.append("file", file);
      else fd.append("text", data.text || "");

      fd.append("jobDescription", data.jobDescription || "");
      fd.append("jobTitle", data.jobTitle || "");
      fd.append("isPublic", data.isPublic ? "true" : "false");

      const res = await axios.post("/api/analyze", fd);
      router.push(`/results/${res.data.id}`);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* UPLOAD CARD */}
      <div
        {...getRootProps()}
        className={`
          relative rounded-3xl border border-dashed p-10 text-center cursor-pointer transition
          bg-white dark:bg-slate-900
          hover:shadow-lg
          ${isDragActive ? "border-black dark:border-white scale-[1.01]" : "border-slate-300 dark:border-slate-700"}
        `}
      >
        <input {...getInputProps()} />

        <div className="space-y-3">
          <div className="text-4xl">📄</div>

          {file ? (
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {file.name}
            </p>
          ) : (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {isDragActive
                ? "Drop your resume here"
                : "Drag & drop your PDF resume here"}
            </p>
          )}

          <p className="text-xs text-slate-500 dark:text-slate-500">
            or click to browse files
          </p>
        </div>
      </div>

      {/* OR DIVIDER */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        <span className="text-xs text-slate-500">OR paste text</span>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* TEXT INPUT CARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
        <textarea
          {...register("text")}
          rows={6}
          placeholder="Paste your resume text here..."
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
        />

        <input
          {...register("jobTitle")}
          placeholder="Target job title (optional)"
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
        />

        <textarea
          {...register("jobDescription")}
          rows={3}
          placeholder="Paste job description (optional)"
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
        />

        {/* CHECKBOX */}
        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <input type="checkbox" {...register("isPublic")} />
          Make this analysis public
        </label>
      </div>

      {/* CTA BUTTON */}
      <button
        disabled={loading}
        className="
          w-full rounded-2xl py-4 font-medium transition
          bg-black text-white
          dark:bg-white dark:text-black
          hover:scale-[1.01] hover:shadow-lg
          disabled:opacity-50
        "
      >
        {loading ? "Analyzing Resume..." : "Analyze Resume"}
      </button>
    </form>
  );
}
