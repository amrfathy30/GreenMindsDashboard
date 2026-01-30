export default function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-6 my-6 border rounded-2xl animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <div className="flex flex-col gap-2">
          <div className="w-32 h-3 bg-gray-300 rounded" />
          <div className="w-40 h-3 bg-gray-300 rounded" />
        </div>
      </div>

      <div className="h-px bg-gray-300 my-2" />

      {/* Inputs */}
      <div className="h-10 bg-gray-300 rounded" />
      <div className="h-10 bg-gray-300 rounded" />
      <div className="h-10 bg-gray-300 rounded" />
      <div className="h-10 bg-gray-300 rounded" />

      {/* Button */}
      <div className="h-10 bg-gray-300 rounded mt-2" />
    </div>
  );
}
