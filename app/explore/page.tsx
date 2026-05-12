"use client";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import Navbar from "@/components/layout/Navbar";
import AnalysisCard from "@/components/explore/AnalysisCard";
import FilterPanel from "@/components/explore/FilterPanel";
import SkeletonCard from "@/components/explore/SkeletonCard";
import axios from "axios";
import type { Analysis } from "@/lib/types";

export default function ExplorePage() {
  const [items, setItems] = useState<Analysis[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [scoreRange, setScoreRange] = useState([0, 100]);
  const [sort, setSort] = useState("createdAt");
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/analyses", {
        params: {
          page,
          search: debouncedSearch,
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
  }, [page, debouncedSearch, category, scoreRange, sort]);

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-6">Explore Analyses</h1>
        <FilterPanel
          search={search}
          onSearch={setSearch}
          category={category}
          onCategory={setCategory}
          scoreRange={scoreRange}
          onScoreRange={setScoreRange}
          sort={sort}
          onSort={setSort}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : items.map((item) => (
                <AnalysisCard key={String(item._id)} item={item} />
              ))}
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(total / 12) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded border text-sm ${page === i + 1 ? "bg-primary text-primary-foreground" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>
    </>
  );
}
