import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "../../locales/LanguageContext";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number; 
  onPageSizeChange?: (size: number) => void;
}

const generatePages = (current: number, total: number): (number | string)[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | string)[] = [1];
  if (current > 3) pages.push("...");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    if (!pages.includes(i)) pages.push(i);
  }
  if (current < total - 2) pages.push("...");
  if (!pages.includes(total)) pages.push(total);
  return pages;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange
}) => {
  const { t, isRTL } = useLanguage();
  const [localPageSize, setLocalPageSize] = useState(pageSize || 6);
  const [error, setError] = useState("");
  const handleChange = (e:any) => {
    const val = Number(e.target.value);
    setLocalPageSize(val);
  
    // Validation Logic
    if (val < 4) {
      setError("Min: 4");
    } else if (val > 20) {
      setError("Max: 20");
    } else {
      setError("");
    }
  };
  useEffect(() => {
    setLocalPageSize(pageSize || 6);
  }, [pageSize]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onPageSizeChange && localPageSize !== pageSize) {
        if (localPageSize >= 4 && localPageSize <= 20) {
          onPageSizeChange(localPageSize);
        }
      }
    }, 800); 
    return () => clearTimeout(handler);
  }, [localPageSize, onPageSizeChange, pageSize]);

  const navButtonClass = "flex items-center gap-2 px-2 py-1 text-sm font-medium transition-colors disabled:opacity-20 disabled:cursor-not-allowed";
  const numberButtonClass = "w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-300";
  const activeColor = "#949fae";

  return (
    <div className="relative flex flex-col px-2 md:px-4 lg:flex-row justify-center items-center gap-4 md:gap-6 w-full py-0 my-3">

        <div className="absolute end-2 md:end-4 flex flex-col items-start order-2 lg:order-1">
        <p className="text-xs text-red-600">{error}</p>
          <div className="flex items-center bg-white dark:bg-neutral-700 px-3 py-1 h-10 rounded-lg border border-gray-100 dark:border-gray-600 gap-2">
            <span className="text-xs font-medium text-gray-400 dark:text-gray-300">{t("Show_per_page")}:</span>
          <input
            type="number"
            min="4"
            max="20"
            value={localPageSize}
            onChange={(e) => handleChange(e)}
            className="w-10 text-center text-sm font-bold bg-transparent border border-[#D9D9D9] rounded-md dark:border-gray-800 focus:ring-0 focus:outline-0 dark:text-white p-0"
          />
          </div>

         
        </div>


      <div className="flex items-center justify-center gap-2 md:gap-4 order-1 lg:order-2 w-full lg:w-auto">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${navButtonClass} text-[${activeColor}] dark:text-white hover:text-[#2196F3]`}
        >
          {isRTL ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          <span className="hidden sm:inline">{t("Previous")}</span>
        </button>

        <div className="flex items-center gap-1 md:gap-2">
          {generatePages(currentPage, totalPages).map((page, idx) =>
            page === "..." ? (
              <span key={`ellipsis-${idx}`} className="text-[#BDBDBD] px-1">...</span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`${numberButtonClass} ${
                  currentPage === page
                    ? "bg-gradient-to-br from-[#00A7E1] to-[#00CC99] text-white shadow-lg"
                    : "text-[#BDBDBD] hover:bg-gray-50 dark:hover:bg-neutral-600"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${navButtonClass} text-[${activeColor}] dark:text-white hover:text-[#00CC99]`}
        >
          <span className="hidden sm:inline">{t("Next")}</span>
          {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
};

export default Pagination;