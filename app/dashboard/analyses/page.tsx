"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { formatDate, scoreBg } from "@/lib/utils";
import type { Analysis } from "@/lib/types";

export default function MyAnalysesPage() {
  const [items, setItems] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/user/analyses")
      .then((r) => setItems(r.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Analyses</h1>
        <Link
          href="/analyze"
          className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm"
        >
          New Analysis
        </Link>
      </div>
      {items.length === 0 && (
        <p className="text-muted-foreground">
          No analyses yet.
          <Link href="/analyze" className="underline">
            Analyze your resume
          </Link>
          .
        </p>
      )}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              {["Job Title", "ATS Score", "Mode", "Date", "Action"].map((h) => (
                <th key={h} className="px-4 py-2 text-left font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((item) => (
              <tr key={String(item._id)}>
                <td className="px-4 py-3">{item.jobTitle || "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${scoreBg(item.atsScore)}`}
                  >
                    {item.atsScore}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {item.aiMode}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {formatDate(item.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/results/${item._id}`}
                    className="text-primary hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
