export default function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-6 my-6 border rounded-2xl animate-pulse border-gray-200 bg-white dark:border-gray-800 dark:bg-[#1e1e1e]">
      <div className="flex items-center gap-4">

        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="flex flex-col gap-2">
          <div className="w-32 h-3 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="w-40 h-3 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>


      <div className="h-px my-2 bg-gray-100 dark:bg-gray-800" />

      <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />

      <div className="h-10 rounded mt-2 bg-gray-300 dark:bg-gray-600" />
    </div>
  );
}