import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Tạo mảng các trang hiển thị với dấu ...
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    if (totalPages <= maxVisiblePages) {
      // Hiển thị tất cả các trang nếu tổng số trang ít hơn maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Luôn hiển thị trang đầu
      pageNumbers.push(1);

      // Tính toán range hiển thị
      let start = Math.max(2, currentPage - halfVisible);
      let end = Math.min(totalPages - 1, currentPage + halfVisible);

      // Điều chỉnh range nếu ở gần đầu hoặc cuối
      if (currentPage <= halfVisible + 1) {
        end = maxVisiblePages - 1;
      } else if (currentPage >= totalPages - halfVisible) {
        start = totalPages - maxVisiblePages + 2;
      }

      // Thêm dấu ... nếu cần
      if (start > 2) {
        pageNumbers.push('...');
      }

      // Thêm các trang trong range
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      // Thêm dấu ... và trang cuối nếu cần
      if (end < totalPages - 1) {
        pageNumbers.push('...');
      }
      if (end < totalPages) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 ${
          currentPage === 1
            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
            : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
        }`}
        aria-label="Previous page"
      >
        <MdKeyboardArrowLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1.5">
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="w-8 text-center text-slate-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`relative w-9 h-9 text-sm font-medium rounded-lg transition-all duration-200 ${
                currentPage === page
                  ? "bg-blue-900 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {page}
              {currentPage === page && (
                <span className="absolute -bottom-1 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2" />
              )}
            </button>
          )
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 ${
          currentPage === totalPages
            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
            : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
        }`}
        aria-label="Next page"
      >
        <MdKeyboardArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
