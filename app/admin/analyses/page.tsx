"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { formatDate, scoreBg } from "@/lib/utils";
import type { Analysis } from "@/lib/types";

export default function AdminAnalysesPage() {
  const [items, setItems] = useState<Analysis[]>([]);
  useEffect(() => {
    axios
      .get("/api/analyses", { params: { limit: 50 } })
      .then((r) => setItems(r.data.items));
  }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">All Analyses</h1>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              {["Job Title", "Score", "Mode", "Public", "Date", "Link"].map(
                (h) => (
                  <th key={h} className="px-4 py-2 text-left font-medium">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((item) => (
              <tr key={String(item._id)}>
                <td className="px-4 py-3">{item.jobTitle || "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${scoreBg(item.atsScore)}`}
                  >
                    {item.atsScore}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {item.aiMode}
                </td>
                <td className="px-4 py-3 text-xs">
                  {item.isPublic ? "Yes" : "No"}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {formatDate(item.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/results/${item._id}`}
                    className="text-primary text-xs hover:underline"
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
