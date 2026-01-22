import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react'; 

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const generatePages = (current: number, total: number): (number | string)[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | string)[] = [1];
  if (current > 3) pages.push('...');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    if (!pages.includes(i)) pages.push(i);
  }
  if (current < total - 2) pages.push('...');
  if (!pages.includes(total)) pages.push(total);
  return pages;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const navButtonClass = "flex items-center gap-2 px-2 py-1 text-sm font-medium transition-colors disabled:opacity-20 disabled:cursor-not-allowed";
  const numberButtonClass = "w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-300";

  return (
    <div className="flex justify-center items-center gap-4 py-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${navButtonClass} text-[#BDBDBD] hover:text-[#2196F3]`}
      >
        <ArrowLeft size={16} strokeWidth={3} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-2">
        {generatePages(currentPage, totalPages).map((page, idx) => 
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="text-[#BDBDBD] px-1">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`${numberButtonClass} ${
                currentPage === page 
                  ? 'bg-gradient-to-br from-[#00A7E1] to-[#00CC99] text-white shadow-lg'
                  : 'text-[#BDBDBD] hover:bg-gray-50'
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
        className={`${navButtonClass} text-[#616161] hover:text-[#00CC99] font-semibold`}
      >
        <span className="hidden sm:inline">Next</span>
        <ArrowRight size={16} strokeWidth={3} />
      </button>
    </div>
  );
};

export default Pagination;