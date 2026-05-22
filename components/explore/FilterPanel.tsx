export default function FilterPanel({
  category,
  onCategory,
  scoreRange,
  onScoreRange,
  sort,
  onSort,
}: {
  category: string;
  onCategory: (v: string) => void;
  scoreRange: number[];
  onScoreRange: (v: number[]) => void;
  sort: string;
  onSort: (v: string) => void;
}) {
  const categories = [
    "",
    "Frontend",
    "Backend",
    "Data Science",
    "DevOps",
    "Mobile",
    "Design",
    "Management",
  ];

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur p-5 shadow-sm">
      <div className="grid gap-6 md:grid-cols-3">
        {/* CATEGORY */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => onCategory(e.target.value)}
            className="w-full h-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c || "All Categories"}
              </option>
            ))}
          </select>
        </div>

        {/* SCORE RANGE */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            ATS Score Range
          </label>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="number"
                value={scoreRange[0]}
                min={0}
                max={100}
                onChange={(e) => onScoreRange([+e.target.value, scoreRange[1]])}
                className="w-full h-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              />
            </div>

            <span className="text-slate-400">—</span>

            <div className="flex-1">
              <input
                type="number"
                value={scoreRange[1]}
                min={0}
                max={100}
                onChange={(e) => onScoreRange([scoreRange[0], +e.target.value])}
                className="w-full h-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              />
            </div>
          </div>
        </div>

        {/* SORT */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Sort By
          </label>

          <select
            value={sort}
            onChange={(e) => onSort(e.target.value)}
            className="w-full h-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
          >
            <option value="createdAt">Latest</option>
            <option value="atsScore">Highest Score</option>
          </select>
        </div>
      </div>

      {/* QUICK FILTER TAGS (nice UX upgrade) */}
      <div className="flex flex-wrap gap-2 mt-5">
        {categories.slice(1).map((c) => (
          <button
            key={c}
            onClick={() => onCategory(c)}
            className={`px-3 py-1.5 rounded-full text-xs border transition
              ${
                category === c
                  ? "bg-black text-white border-black dark:bg-white dark:text-black"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
          >
            {c}
          </button>
        ))}

        <button
          onClick={() => onCategory("")}
          className={`px-3 py-1.5 rounded-full text-xs border transition
            ${
              category === ""
                ? "bg-black text-white border-black dark:bg-white dark:text-black"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
        >
          All
        </button>
      </div>
    </div>
  );
}
