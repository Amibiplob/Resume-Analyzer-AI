"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "@/lib/utils";
import type { CoverLetter } from "@/lib/types";

export default function CoverLettersPage() {
  const [items, setItems] = useState<CoverLetter[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    axios.get("/api/user/cover-letters").then((r) => setItems(r.data));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Cover Letters</h1>
      {items.length === 0 && (
        <p className="text-muted-foreground">No cover letters yet.</p>
      )}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={String(item._id)} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {item.jobTitle} — {item.company}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(item.createdAt)}
                </p>
              </div>
              <button
                onClick={() =>
                  setOpen(open === String(item._id) ? null : String(item._id))
                }
                className="text-sm underline"
              >
                {open === String(item._id) ? "Hide" : "View"}
              </button>
            </div>
            {open === String(item._id) && (
              <pre className="mt-3 text-sm whitespace-pre-wrap bg-muted p-3 rounded">
                {item.content}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
