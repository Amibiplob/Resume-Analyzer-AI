export default function KeywordGaps({
  found,
  missing,
}: {
  found: string[];
  missing: string[];
}) {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="font-medium mb-4">Keyword Analysis</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-green-600 mb-2">
            ✓ Found ({found.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {found.map((k) => (
              <span
                key={k}
                className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-0.5 rounded"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-red-500 mb-2">
            ✗ Missing ({missing.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {missing.map((k) => (
              <span
                key={k}
                className="text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-0.5 rounded"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
