"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import type { User } from "next-auth";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/upload", label: "New Analysis" },
  { href: "/dashboard/analyses", label: "My Analyses" },
  { href: "/dashboard/cover-letters", label: "Cover Letters" },
  { href: "/dashboard/resume-builder", label: "Resume Builder" },
  { href: "/dashboard/profile", label: "Profile" },
];

export default function DashboardSidebar({ user }: { user: User }) {
  const path = usePathname();
  return (
    <aside className="w-56 border-r bg-muted/20 flex flex-col">
      <div className="p-4 border-b">
        <p className="font-medium text-sm">{user.name}</p>
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>
      <nav className="flex-1 p-2 space-y-0.5">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "block px-3 py-2 rounded text-sm transition-colors hover:bg-muted",
              path === l.href && "bg-muted font-medium",
            )}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="p-2 border-t">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full text-left px-3 py-2 rounded text-sm text-red-500 hover:bg-muted"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
