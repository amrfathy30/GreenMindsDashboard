import { useLanguage } from "../../api/locales/LanguageContext";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";


interface TableSkeletonProps {
  columnCount: number;
  rowCount?: number;
}

export const TableLoading = ({ columnCount=8, rowCount = 5 }: TableSkeletonProps) => {

  return (
    <div className="overflow-hidden rounded-xl border dark:border-gray-600">
      <div className="max-w-full overflow-x-auto">
        <Table className="border-0">
          {/* Mock Header */}
          <TableHeader className="border-b dark:border-gray-600 bg-linear-to-r from-primary to-secondary  capitalize py-6">
           <TableRow>
              {Array.from({ length: columnCount }).map((_, i) => (
                <TableCell key={i} isHeader className="px-5 py-3 text-start text-lg text-white">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-600 my-1" />
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Mock Body */}
          <TableBody>
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-white dark:bg-[#262626]" : "bg-[#D9D9D940] dark:bg-[#323333]"}
              >
                {Array.from({ length: columnCount }).map((_, colIndex) => (
                  <TableCell key={colIndex} className="px-5 py-4">
                    <div 
                      className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" 
                      style={{ width: `${Math.floor(Math.random() * (90 - 40 + 1) + 40)}%` }} 
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
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