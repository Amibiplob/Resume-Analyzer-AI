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
];

export default function AdminSidebar() {
  const path = usePathname();
  return (
    <aside className="w-56 border-r bg-muted/20 flex flex-col">
      <div className="p-4 border-b">
        <p className="font-medium text-sm">Admin Panel</p>
      </div>
      <nav className="flex-1 p-2 space-y-0.5">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "block px-3 py-2 rounded text-sm hover:bg-muted",
              path === l.href && "bg-muted font-medium",
            )}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="p-2 border-t">
        <Link
          href="/dashboard"
          className="block px-3 py-2 text-sm hover:bg-muted rounded"
        >
          ← User Dashboard
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-muted rounded"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
