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
    <div className="space-y-4 ">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Cover Letters</h1>
        <p className="text-sm text-muted-foreground">
          Generated cover letters history
        </p>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground">No cover letters yet.</p>
      )}

      {/* List */}
      <div className="space-y-2">
        {items.map((item) => {
          const id = String(item._id);
          const isOpen = open === id;

          return (
            <div key={id} className="border rounded-lg">
              {/* Header row */}
              <button
                onClick={() => setOpen(isOpen ? null : id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
              >
                <div>
                  <p className="text-sm font-medium">
                    {item.jobTitle}{" "}
                    <span className="text-muted-foreground">
                      — {item.company}
                    </span>
                  </p>

                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDate(item.createdAt)}
                  </p>
                </div>

                <span className="text-xs text-muted-foreground">
                  {isOpen ? "Hide" : "View"}
                </span>
              </button>

              {/* Content */}
              {isOpen && (
                <div className="border-t px-4 py-3 bg-muted/30">
                  <pre className="text-sm whitespace-pre-wrap leading-relaxed">
                    {item.content}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
