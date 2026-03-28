export default function AppLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-20 bg-surface-container-high rounded-full" />
        <div className="h-10 w-64 bg-surface-container-high rounded-xl" />
        <div className="h-4 w-48 bg-surface-container-low rounded-full" />
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-surface-container-lowest rounded-xl p-6 h-40 border border-outline-variant/10">
            <div className="h-3 w-16 bg-surface-container-high rounded-full mb-4" />
            <div className="h-8 w-12 bg-surface-container-high rounded-lg mb-2" />
            <div className="h-3 w-24 bg-surface-container-low rounded-full" />
          </div>
        ))}
      </div>

      {/* List skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-surface-container-lowest rounded-xl p-4 flex items-center gap-4 border border-outline-variant/10">
            <div className="w-12 h-12 bg-surface-container-high rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 bg-surface-container-high rounded-full" />
              <div className="h-3 w-28 bg-surface-container-low rounded-full" />
            </div>
            <div className="h-6 w-20 bg-surface-container-low rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
