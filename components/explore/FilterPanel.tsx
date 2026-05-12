export default function FilterPanel({
  search,
  onSearch,
  category,
  onCategory,
  scoreRange,
  onScoreRange,
  sort,
  onSort,
}: {
  search: string;
  onSearch: (v: string) => void;
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
    <div className="flex flex-wrap gap-3 text-sm">
      <input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search job title..."
        className="border rounded px-3 py-1.5 w-48"
      />
      <select
        value={category}
        onChange={(e) => onCategory(e.target.value)}
        className="border rounded px-3 py-1.5"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c || "All categories"}
          </option>
        ))}
      </select>
      <div className="flex items-center gap-2">
        <label className="text-muted-foreground">Score:</label>
        <input
          type="number"
          value={scoreRange[0]}
          min={0}
          max={100}
          onChange={(e) => onScoreRange([+e.target.value, scoreRange[1]])}
          className="border rounded px-2 py-1.5 w-16"
        />
        <span>–</span>
        <input
          type="number"
          value={scoreRange[1]}
          min={0}
          max={100}
          onChange={(e) => onScoreRange([scoreRange[0], +e.target.value])}
          className="border rounded px-2 py-1.5 w-16"
        />
      </div>
      <select
        value={sort}
        onChange={(e) => onSort(e.target.value)}
        className="border rounded px-3 py-1.5"
      >
        <option value="createdAt">Latest</option>
        <option value="atsScore">Highest Score</option>
      </select>
    </div>
  );
}
