import { useLanguage } from "../../api/locales/LanguageContext";

export  function TableLoading() {
  return (
    <div className="space-y-3 p-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`h-10 w-full rounded-md animate-pulse ${
            i === 0 ? "bg-[#25B16F] h-14" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
export const VideoTableSkeleton = ({ rows = 5 }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col w-full">
           <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#D9D9D940] dark:bg-white/[0.02]">
                  <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">{t("Thumbnail")}</th>
                  <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">{t("title")}</th>
                  <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">{t("points")}</th>
                  <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">{t("age group")}</th>
                  <th className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">{t("actions")}</th>
                </tr>
              </thead>
      {[...Array(rows)].map((_, index) => (
        <tr 
          key={index} 
          className={`border-b border-gray-50 dark:border-gray-800/50 w-full ${
            index % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-[#D9D9D940] dark:bg-white/[0.01]"
          }`}
        >
          {/* Thumbnail Skeleton */}
          <td className="px-4 py-3">
            <div className="animate-pulse aspect-[16/9] h-[55px] rounded-xl bg-gray-200 dark:bg-gray-700" />
          </td>

          {/* Title Skeleton */}
          <td className="px-4 py-3">
            <div className="animate-pulse h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded-md" />
          </td>

          {/* Points Skeleton */}
          <td className="px-4 py-3">
            <div className="flex items-center justify-center gap-2">
              <div className="animate-pulse h-6 w-8 bg-gray-200 dark:bg-gray-700 rounded-md" />
              <div className="animate-pulse h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
          </td>

          {/* Age Group Skeleton */}
          <td className="px-4 py-3 text-center">
            <div className="flex justify-center">
              <div className="animate-pulse h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-md" />
            </div>
          </td>

          {/* Actions Skeleton */}
          <td className="px-4 py-3">
            <div className="flex justify-center gap-3">
              <div className="animate-pulse h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-md" />
              <div className="animate-pulse h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-md" />
            </div>
          </td>
        </tr>
      ))}
      </table>
    </div>
  );
};