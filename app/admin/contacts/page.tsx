"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "@/lib/utils";

type Contact = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function AdminContactsPage() {
  const [items, setItems] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/contacts")
      .then((r) => setItems(r.data.items || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading contacts...</p>;
  }

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-2xl font-semibold">Contacts ({items.length})</h1>
        <p className="text-sm text-muted-foreground">Messages from users</p>
      </div>

      {/* list */}
      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No messages found</p>
        ) : (
          items.map((c) => (
            <div key={c._id} className="rounded-xl border p-4 space-y-2">
              {/* top row */}
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">{c.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(c.createdAt)}
                </p>
              </div>

              {/* email */}
              <p className="text-xs text-muted-foreground">{c.email}</p>

              {/* message */}
              <p className="text-sm leading-relaxed">{c.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
