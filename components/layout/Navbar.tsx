"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
export default function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = (session?.user as any)?.role === "admin";

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          ResumeAI
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/analyze">Analyze</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/pricing">Pricing</Link>
          {session && <Link href="/dashboard">Dashboard</Link>}
          {isAdmin && <Link href="/admin">Admin</Link>}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-sm border rounded px-2 py-1"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
          {session ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 text-sm border rounded px-3 py-1.5"
              >
                {session.user?.name?.split(" ")[0]} ▾
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-background border rounded-lg shadow-lg py-1 text-sm z-50">
                  <Link
                    href="/dashboard/profile"
                    className="block px-3 py-2 hover:bg-muted"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/analyses"
                    className="block px-3 py-2 hover:bg-muted"
                  >
                    My Analyses
                  </Link>
                  <Link
                    href="/dashboard/cover-letters"
                    className="block px-3 py-2 hover:bg-muted"
                  >
                    Cover Letters
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-3 py-2 hover:bg-muted text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-primary text-primary-foreground px-3 py-1.5 rounded text-sm"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
