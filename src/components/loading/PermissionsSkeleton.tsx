export default function PermissionsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {Array.from({ length: 70 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 animate-pulse">
          <div className="h-4 w-4 rounded border border-gray-300 bg-gray-300 dark:bg-gray-700" />
          <div className="h-3 w-36 rounded bg-gray-300 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  );
}
