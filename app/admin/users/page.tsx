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
      <h1 className="text-2xl font-semibold">Users ({users.length})</h1>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              {["Name", "Email", "Role", "Provider", "Joined"].map((h) => (
                <th key={h} className="px-4 py-2 text-left font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u._id}>
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${u.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-muted"}`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {u.provider || "credentials"}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
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
