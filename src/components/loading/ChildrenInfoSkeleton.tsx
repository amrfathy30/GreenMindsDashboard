
export default function ChildrenInfoSkeleton() {
  return (
    <div className="md:px-8 md:py-4 animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <div className="h-6 w-40 bg-gray-300 rounded" />
      </div>

      {/* Child Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="border dark:border-gray-700 shadow drop-shadow-xl rounded-xl p-3"
          >
            <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
            <div className="h-5 w-28 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Points Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border shadow p-5 dark:border-gray-700"
          >
            <div className="h-3 w-24 bg-gray-300 rounded mb-2"></div>
            <div className="h-8 w-20 bg-gray-300 rounded mb-1"></div>
            <div className="h-4 w-16 bg-gray-300 rounded mb-1"></div>
            <div className="h-3 w-32 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Taps Section Skeleton */}
      <div className="mt-8 h-40 bg-gray-200 rounded-xl dark:bg-gray-700"></div>
    </div>
  );
}
