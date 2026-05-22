"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState } from "react";

import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isAdmin = (session?.user as any)?.role === "admin";

  const navLinks = [
    { href: "/analyze", label: "Analyze" },
    { href: "/explore", label: "Explore" },
    { href: "/blog", label: "Blog" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:bg-slate-950/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-black dark:text-white"
          >
            ResumeAI
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-black dark:text-slate-300 dark:hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}

            {session && (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-slate-600 hover:text-black dark:text-slate-300 dark:hover:text-white transition"
              >
                Dashboard
              </Link>
            )}

            {isAdmin && (
              <Link
                href="/admin"
                className="text-sm font-medium text-slate-600 hover:text-black dark:text-slate-300 dark:hover:text-white transition"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Auth */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                    {session.user?.name?.charAt(0)}
                  </div>

                  <span className="hidden sm:block text-sm font-medium">
                    {session.user?.name?.split(" ")[0]}
                  </span>

                  <ChevronDown size={16} />
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                      <p className="font-medium text-sm">
                        {session.user?.name}
                      </p>

                      <p className="text-xs text-slate-500 truncate mt-1">
                        {session.user?.email}
                      </p>
                    </div>

                    <div className="p-2">
                      <Link
                        href="/dashboard/profile"
                        className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        Profile
                      </Link>

                      <Link
                        href="/dashboard/analyses"
                        className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        My Analyses
                      </Link>

                      <Link
                        href="/dashboard/cover-letters"
                        className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        Cover Letters
                      </Link>

                      <button
                        onClick={() =>
                          signOut({
                            callbackUrl: "/",
                          })
                        }
                        className="w-full text-left rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                {link.label}
              </Link>
            ))}

            {session && (
              <Link
                href="/dashboard"
                className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Dashboard
              </Link>
            )}

            {isAdmin && (
              <Link
                href="/admin"
                className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Admin
              </Link>
            )}

            {!session && (
              <Link
                href="/login"
                className="block rounded-xl bg-black text-white px-4 py-3 text-center text-sm font-medium hover:bg-slate-800 transition"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
