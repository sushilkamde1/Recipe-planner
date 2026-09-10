export default function Loading() {
  return (
    <main
      className="min-h-screen animate-pulse bg-yellow-300 px-6 py-8"
      aria-label="Loading recipe"
    >
      <div className="mx-auto max-w-7xl">
        <div className="h-5 w-32 rounded bg-white/60" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="h-80 rounded-[1.75rem] bg-white/70" />
          <div className="space-y-4 rounded-[1.75rem] bg-white p-8">
            <div className="h-8 w-3/4 rounded bg-yellow-100" />
            <div className="h-4 w-1/2 rounded bg-yellow-100" />
            <div className="h-24 rounded bg-yellow-100" />
          </div>
        </div>
      </div>
    </main>
  );
}