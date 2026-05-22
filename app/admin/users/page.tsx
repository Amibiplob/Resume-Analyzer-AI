"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { formatDate } from "@/lib/utils";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/admin/users").then((r) => setUsers(r.data));
  }, []);

  return (
    <div className="space-y-4">
      {/* header */}
      <div>
        <h1 className="text-2xl font-semibold">Users ({users.length})</h1>
        <p className="text-sm text-muted-foreground">
          Registered platform users
        </p>
      </div>

      {/* table */}
      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {["Name", "Email", "Role", "Provider", "Joined"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-muted/30">
                <td className="px-4 py-3">{u.name}</td>

                <td className="px-4 py-3 text-muted-foreground">{u.email}</td>

                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      u.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>

                <td className="px-4 py-3 text-muted-foreground text-xs">
                  {u.provider || "credentials"}
                </td>

                <td className="px-4 py-3 text-muted-foreground text-xs">
                  {formatDate(u.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
