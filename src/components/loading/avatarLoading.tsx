const AvatarSkeleton = () => {
  return (
    <div className="relative animate-pulse flex gap-4 justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#1e1e1e]">
      

      <div className="relative h-[90px] w-[90px] overflow-hidden rounded-xl flex items-center justify-center border dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
        <div className="h-full w-full rounded-xl bg-gray-200 dark:bg-gray-600" />
      </div>


      <div className="space-y-2 flex flex-col justify-between items-start w-[calc(100%-123px)] flex-1">
        <div className="flex items-center w-full justify-between">
          <div className="h-4 w-[40%] rounded bg-gray-200 dark:bg-gray-600" />
          <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-600" />
        </div>
        <div className="flex flex-col items-start w-full justify-between">
          <div className="h-4 w-[30%] rounded bg-gray-200 dark:bg-gray-600 mb-1" />
          <div className="h-4 w-[40%] rounded bg-gray-200 dark:bg-gray-600" />
        </div>
      </div>
      
    </div>
  );
};

export default AvatarSkeleton;