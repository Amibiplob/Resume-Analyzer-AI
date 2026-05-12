export default function SkeletonCard() {
  return (
    <div className="border rounded-lg p-4 h-36 animate-pulse">
      <div className="h-5 bg-muted rounded w-16 mb-3" />
      <div className="h-4 bg-muted rounded w-3/4 mb-2" />
      <div className="h-3 bg-muted rounded w-full mb-1" />
      <div className="h-3 bg-muted rounded w-2/3" />
    </div>
  );
}
