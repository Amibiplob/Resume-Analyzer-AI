"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Sparkles, TrendingUp, Filter } from "lucide-react";

import AnalysisCard from "@/components/explore/AnalysisCard";
import FilterPanel from "@/components/explore/FilterPanel";
import SkeletonCard from "@/components/explore/SkeletonCard";

import type { Analysis } from "@/lib/types";

export default function ExplorePage() {
  const [items, setItems] = useState<Analysis[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [scoreRange, setScoreRange] = useState([0, 100]);
  const [sort, setSort] = useState("createdAt");

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get("/api/analyses", {
        params: {
          page,
          category,
          minScore: scoreRange[0],
          maxScore: scoreRange[1],
          sort,
        },
      })
      .then((r) => {
        setItems(r.data.items);
        setTotal(r.data.total);
      })
      .finally(() => setLoading(false));
  }, [page, category, scoreRange, sort]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-black dark:via-slate-950 dark:to-slate-900">
      {/* HERO */}
      <section className="relative border-b border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.05),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-4 py-10">
          <div className="max-w-3xl">
            {/* badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur px-4 py-2 text-sm text-slate-600 dark:text-slate-300">
              <Sparkles className="size-4" />
              AI Resume Intelligence Hub
            </div>

            {/* title */}
            <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Explore Resume Insights
            </h1>

            {/* subtitle */}
            <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Discover ATS scores, keyword analysis, formatting feedback, and
              AI-powered resume breakdowns to improve your career profile.
            </p>

            {/* filter toggle (mobile friendly) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="mt-8 md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
            >
              <Filter className="size-4" />
              Filters
            </button>
          </div>

          {/* FILTER PANEL */}
          <div className="mt-10">
            <FilterPanel
              category={category}
              onCategory={setCategory}
              scoreRange={scoreRange}
              onScoreRange={setScoreRange}
              sort={sort}
              onSort={setSort}
            />

            {/* mobile filters */}
            {showFilters && (
              <div className="md:hidden mt-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                <FilterPanel
                  category={category}
                  onCategory={setCategory}
                  scoreRange={scoreRange}
                  onScoreRange={setScoreRange}
                  sort={sort}
                  onSort={setSort}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-5">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Latest Analyses
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {total} results found
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <TrendingUp className="size-4" />
            Live updates enabled
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : items.map((item) => (
                <div
                  key={String(item._id)}
                  className="transition-transform duration-300 hover:-translate-y-1"
                >
                  <AnalysisCard item={item} />
                </div>
              ))}
        </div>

        {/* EMPTY */}
        {!loading && items.length === 0 && (
          <div className="text-center py-24">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              🔍
            </div>

            <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
              No results found
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Try adjusting filters or score range.
            </p>
          </div>
        )}

        {/* PAGINATION */}
        {total > 12 && (
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {Array.from({ length: Math.ceil(total / 12) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`h-11 min-w-11 px-4 rounded-xl text-sm font-medium border transition
                  ${
                    page === i + 1
                      ? "bg-black text-white border-black dark:bg-white dark:text-black"
                      : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
