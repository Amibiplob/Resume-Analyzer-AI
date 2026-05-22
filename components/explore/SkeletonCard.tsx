export default function SkeletonCard() {
  return (
    <div className="relative h-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 overflow-hidden">
      {/* shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />

      {/* TOP BADGES */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-5 w-8 rounded-full bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* TITLE */}
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* DESCRIPTION */}
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-14 rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}
