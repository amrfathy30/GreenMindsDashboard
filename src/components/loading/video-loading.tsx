export default function VideoLoading() {
  return (
    <div className="p-6 space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 h-20 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-2xl" />
      ))}
    </div>
  );
}