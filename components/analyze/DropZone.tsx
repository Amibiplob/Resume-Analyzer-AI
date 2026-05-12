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
    } catch {
      toast.error("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
      >
        <input {...getInputProps()} />
        {file ? (
          <p className="text-sm font-medium">📄 {file.name}</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            {isDragActive
              ? "Drop it here"
              : "Drag & drop PDF, or click to browse"}
          </p>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-xs text-muted-foreground">
            or paste text
          </span>
        </div>
      </div>

      <textarea
        {...register("text")}
        rows={6}
        placeholder="Paste your resume text here..."
        className="w-full border rounded px-3 py-2 text-sm resize-none"
      />

      <input
        {...register("jobTitle")}
        placeholder="Target job title (optional)"
        className="w-full border rounded px-3 py-2 text-sm"
      />
      <textarea
        {...register("jobDescription")}
        rows={3}
        placeholder="Paste job description for keyword matching (optional)"
        className="w-full border rounded px-3 py-2 text-sm resize-none"
      />

      <div className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("isPublic")} id="public" />
        <label htmlFor="public">
          Make this analysis public on Explore page
        </label>
      </div>

      <button
        disabled={loading}
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
    </form>
  );
}
