export function GenderChartSkeleton() {
  return (
    <div className="rounded-xl h-full bg-white dark:bg-[#1e1e1e] dark:border-gray-800 mt-4">
      <div className="px-4 pt-5">
        <div className="w-16 h-4 rounded bg-gray-200 animate-pulse mb-4"></div>

        <div className="flex justify-center items-center h-[260px]">
          <div className="w-[260px] h-[260px] rounded-full bg-gray-200 animate-pulse"></div>
        </div>

        <div className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gray-200 animate-pulse"></div>
              <div className="w-16 h-4 rounded bg-gray-200 animate-pulse"></div>
            </div>
            <div className="w-16 h-4 rounded bg-gray-200 animate-pulse"></div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gray-200 animate-pulse"></div>
              <div className="w-16 h-4 rounded bg-gray-200 animate-pulse"></div>
            </div>
            <div className="w-16 h-4 rounded bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BarChartOneSkeleton() {
  return (
    <div className="rounded-xl h-full bg-white dark:bg-[#1e1e1e] dark:border-gray-800 mt-4">
      <div className="px-4 pt-5">
        <div className="w-16 h-4 rounded bg-gray-200 animate-pulse mb-4"></div>
        <div className="space-y-4">
          <div className="flex gap-4 items-end h-64">
            <div className="w-12 bg-gray-200 rounded animate-pulse h-40"></div>
            <div className="w-12 bg-gray-200 rounded animate-pulse h-60"></div>
            <div className="w-12 bg-gray-200 rounded animate-pulse h-30"></div>
            <div className="w-12 bg-gray-200 rounded animate-pulse h-50"></div>
          </div>

          <div className="flex justify-between mt-2">
            <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TopRankedSkeleton() {
  return (
    <div className="rounded-xl h-full bg-white dark:bg-[#1e1e1e] dark:border-gray-800 mt-4">
      <div className="px-4 pt-5">
        <div className="w-16 h-4 rounded bg-gray-200 animate-pulse mb-4"></div>
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex justify-between items-center gap-1 mb-6 animate-pulse"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div className="flex flex-col gap-1">
                <div className="w-20 h-3 bg-gray-300 rounded"></div>
                <div className="w-16 h-3 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
          </div>
        ))}

        <div className="flex justify-end mt-2">
          <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export function TotalSkeleton() {
  return (
    <div className="rounded-xl h-full bg-white dark:bg-[#1e1e1e] dark:border-gray-800 mt-4">
      <div className="px-4 pt-5">
        <div className="w-16 h-4 rounded bg-gray-200 animate-pulse mb-4"></div>
        <div className="flex flex-col items-center justify-center gap-4 animate-pulse">
          <div className="flex flex-col items-center justify-center">
            <div className="w-32 h-20 bg-gray-300 rounded mb-2"></div>
            <div className="w-20 h-6 bg-gray-300 rounded"></div>
          </div>

          <div className="border border-[#0000000D] w-full"></div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-32 h-20 bg-gray-300 rounded mb-2"></div>
            <div className="w-20 h-6 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PointsDistributionSkeleton() {
  return (
    <div className="rounded-xl h-full bg-white dark:bg-[#1e1e1e] dark:border-gray-800 mt-4">
      <div className="px-4 pt-5">
        <div className="w-16 h-4 rounded bg-gray-200 animate-pulse mb-4"></div>
        <div className="relative w-full h-[400px] flex items-center justify-center animate-pulse">
          {/* Donut Placeholder */}
          <div className="w-64 h-64 rounded-full border-8 border-gray-300"></div>

          {/* Center Icon Placeholder */}
          <div className="absolute w-14 h-14 bg-gray-300 rounded-full"></div>

          {/* Example HTML Labels */}
          <div className="absolute top-4 left-4 flex flex-col items-center gap-1">
            <div className="w-16 h-4 bg-gray-300 rounded"></div>
            <div className="w-12 h-[2px] bg-gray-300 rounded"></div>
            <div className="w-10 h-3 bg-gray-300 rounded"></div>
          </div>
          <div className="absolute top-4 right-4 flex flex-col items-center gap-1">
            <div className="w-16 h-4 bg-gray-300 rounded"></div>
            <div className="w-12 h-[2px] bg-gray-300 rounded"></div>
            <div className="w-10 h-3 bg-gray-300 rounded"></div>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1">
            <div className="w-16 h-4 bg-gray-300 rounded"></div>
            <div className="w-12 h-[2px] bg-gray-300 rounded"></div>
            <div className="w-10 h-3 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
