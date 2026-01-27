export function PermissionsSkeletonList({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-8 px-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border p-4 bg-white rounded-xl animate-pulse">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}
