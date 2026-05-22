"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/analyses", label: "Analyses" },
  { href: "/admin/blog", label: "Blog CMS" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/contacts", label: "Contacts" },
];

export default function AdminSidebar() {
  const path = usePathname();

  return (
    <aside className="w-60 border-r bg-background flex flex-col ">
      {/* header */}
      <div className="px-4 py-4 border-b">
        <p className="text-sm font-semibold tracking-tight">Admin Panel</p>
        <p className="text-xs text-muted-foreground">Manage platform</p>
      </div>

      {/* nav */}
      <nav className="flex-1 p-2 space-y-1">
        {links.map((l) => {
          const active = path === l.href;

          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm transition",
                "hover:bg-muted",
                active
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      {/* footer */}
      <div className="flex-1 border-t p-2 space-y-1">
        <Link
          href="/dashboard"
          className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
        >
          ← User Dashboard
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-muted"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
