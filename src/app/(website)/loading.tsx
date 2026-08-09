export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="animate-pulse space-y-6">
        {/* Hero skeleton */}
        <div className="h-64 rounded-xl bg-zinc-800/50" />

        {/* Content skeleton */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div className="h-8 w-3/4 rounded bg-zinc-800/50" />
            <div className="h-4 w-full rounded bg-zinc-800/30" />
            <div className="h-4 w-5/6 rounded bg-zinc-800/30" />
            <div className="h-4 w-2/3 rounded bg-zinc-800/30" />
            <div className="h-48 rounded-lg bg-zinc-800/30" />
            <div className="h-4 w-full rounded bg-zinc-800/30" />
            <div className="h-4 w-4/5 rounded bg-zinc-800/30" />
          </div>
          <div className="space-y-4">
            <div className="h-64 rounded-lg bg-zinc-800/30" />
            <div className="h-48 rounded-lg bg-zinc-800/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
