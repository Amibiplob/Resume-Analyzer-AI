export default function SuggestionsList({
  suggestions,
  tone,
  bulletStrength,
}: {
  suggestions: string[];
  tone: string;
  bulletStrength: number;
}) {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <h2 className="font-medium">Suggestions</h2>
      <div className="flex gap-4 text-sm">
        <div className="flex-1 border rounded p-3">
          <p className="text-xs text-muted-foreground">Tone</p>
          <p className="font-medium mt-0.5">{tone}</p>
        </div>
        <div className="flex-1 border rounded p-3">
          <p className="text-xs text-muted-foreground">Bullet Strength</p>
          <p className="font-medium mt-0.5">{bulletStrength}/100</p>
        </div>
      </div>
      {suggestions.length === 0 ? (
        <p className="text-sm text-green-600">
          Great job! No major issues found.
        </p>
      ) : (
        <ul className="space-y-2">
          {suggestions.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <span className="text-amber-500 mt-0.5">⚠</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
