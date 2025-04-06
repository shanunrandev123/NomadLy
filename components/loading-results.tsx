export function LoadingResults() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="h-4 w-3/4 animate-pulse rounded bg-[hsl(var(--muted))]"></div>
      <div className="h-4 w-1/2 animate-pulse rounded bg-[hsl(var(--muted))]"></div>
      <div className="h-4 w-5/6 animate-pulse rounded bg-[hsl(var(--muted))]"></div>
      <div className="h-4 w-2/3 animate-pulse rounded bg-[hsl(var(--muted))]"></div>
      <div className="h-4 w-4/5 animate-pulse rounded bg-[hsl(var(--muted))]"></div>
    </div>
  )
}

