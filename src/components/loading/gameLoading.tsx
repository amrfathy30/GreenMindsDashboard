const GameCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#1e1e1e] animate-pulse h-full min-h-[250px]">
      
      <div className="relative mb-4 h-[68%] w-full rounded-xl bg-gray-200 dark:bg-gray-700"></div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="h-5 w-2/3 rounded bg-gray-200 dark:bg-gray-700"></div>
          
          <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>

        <div className="space-y-2 mt-2">
          <div className="h-2 w-full rounded bg-gray-100 dark:bg-gray-800"></div>
        </div>
      </div>
    </div>
  );
};

export default GameCardSkeleton;