import React from "react";

const AvatarSkeleton = () => {
  return (
    <div className="relative animate-pulse flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#1e1e1e]">
      

      <div className="relative mb-4 h-[120px] w-full overflow-hidden rounded-xl flex items-center justify-center border dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
        <div className="h-[100px] w-[100px] rounded-full bg-gray-200 dark:bg-gray-600" />
      </div>


      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-600" />
          <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-600" />
        </div>
      </div>
      
    </div>
  );
};

export default AvatarSkeleton;